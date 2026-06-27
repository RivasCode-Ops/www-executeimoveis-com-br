import type { VercelRequest, VercelResponse } from '@vercel/node';

type Body = {
  nome?: string;
  telefone?: string;
  email?: string;
  servico?: string;
  mensagem?: string;
  origem?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  website?: string;
};

async function sendViaResend(body: Body, to: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@executeimoveis.com.br';
  const text = [
    `Nome: ${body.nome ?? ''}`,
    `Telefone: ${body.telefone ?? ''}`,
    `E-mail: ${body.email || '—'}`,
    `Serviço: ${body.servico || '—'}`,
    `Mensagem: ${body.mensagem || '—'}`,
    `Origem: ${body.origem || '—'}`,
    body.utm_source
      ? `UTM: ${body.utm_source}/${body.utm_medium ?? ''}/${body.utm_campaign ?? ''}`
      : null,
  ]
    .filter(Boolean)
    .join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[Execute Imóveis] Novo contato: ${body.nome}`,
      text,
    }),
  });
  return res.ok;
}

async function sendViaFormSubmit(body: Body, to: string): Promise<boolean> {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: body.nome,
      phone: body.telefone,
      email: body.email || 'nao-informado@executeimoveis.com.br',
      service: body.servico,
      message: body.mensagem,
      origem: body.origem,
      _subject: 'Lead Execute Imóveis — site',
      _template: 'table',
    }),
  });
  return res.ok;
}

async function pushLeadToCrm(body: Body): Promise<boolean> {
  const crmUrl = process.env.CRM_LEADS_WEBHOOK_URL;
  const secret = process.env.CRM_LEADS_WEBHOOK_SECRET;
  if (!crmUrl || !secret) return false;

  try {
    const res = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (err) {
    console.error('[api/contact] CRM push failed:', err);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Método não permitido.' });
  }

  const body = (req.body ?? {}) as Body;

  if (body.website?.trim()) {
    return res.status(200).json({ ok: true });
  }

  if (!body.nome?.trim() || !body.telefone?.trim()) {
    return res.status(400).json({ ok: false, message: 'Nome e telefone são obrigatórios.' });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? 'contato@executeimoveis.com.br';

  const emailSent =
    (await sendViaResend(body, to)) || (await sendViaFormSubmit(body, to));
  const crmSaved = await pushLeadToCrm(body);

  if (!emailSent && !crmSaved) {
    console.error('[api/contact] Ambos os canais falharam', { emailSent, crmSaved });
    return res.status(503).json({
      ok: false,
      message: 'Não foi possível processar o contato. Tente pelo WhatsApp.',
    });
  }

  return res.status(200).json({ ok: true, crm: crmSaved, email: emailSent });
}
