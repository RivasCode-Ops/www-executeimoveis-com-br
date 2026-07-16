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

const FIELD_LIMITS: Record<keyof Body, number> = {
  nome: 120,
  telefone: 40,
  email: 160,
  servico: 80,
  mensagem: 500,
  origem: 40,
  utm_source: 100,
  utm_medium: 100,
  utm_campaign: 100,
  website: 200,
};

/** Coage para string, remove espaços das pontas e corta no limite do campo. */
export function sanitizeBody(raw: unknown): Body {
  const source = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>;
  const clean: Body = {};
  for (const key of Object.keys(FIELD_LIMITS) as (keyof Body)[]) {
    const value = source[key];
    if (typeof value === 'string') {
      clean[key] = value.trim().slice(0, FIELD_LIMITS[key]);
    }
  }
  return clean;
}

async function sendViaResend(body: Body, to: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  // "||" (e não "??") para tratar env var definida como string vazia.
  const from = process.env.RESEND_FROM_EMAIL || 'noreply@executeimoveis.com.br';
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
      reply_to: body.email || undefined,
      subject: `[Execute Imóveis] Novo contato: ${body.nome}`,
      text,
    }),
  });
  return res.ok;
}

async function sendViaFormSubmit(body: Body, to: string): Promise<boolean> {
  try {
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
    if (!res.ok) {
      console.error('[api/contact] FormSubmit HTTP', res.status, await res.text().catch(() => ''));
    }
    return res.ok;
  } catch (err) {
    console.error('[api/contact] FormSubmit failed:', err);
    return false;
  }
}

/** Resend quando configurado; senão (ou se falhar) FormSubmit. */
async function sendEmailNotification(body: Body, to: string): Promise<boolean> {
  if (process.env.RESEND_API_KEY) {
    const viaResend = await sendViaResend(body, to);
    if (viaResend) return true;
    console.warn('[api/contact] Resend falhou; tentando FormSubmit.');
  }
  return sendViaFormSubmit(body, to);
}

/** Alerta instantâneo no Telegram (cai no celular na hora). Best-effort. */
async function sendTelegramAlert(body: Body): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text = [
    '🏠 Novo lead — Execute Imóveis',
    `👤 ${body.nome ?? ''}`,
    `📞 ${body.telefone ?? ''}`,
    body.email ? `✉️ ${body.email}` : null,
    body.servico ? `🔧 ${body.servico}` : null,
    body.mensagem ? `💬 ${body.mensagem}` : null,
    body.origem ? `📍 ${body.origem}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    if (!res.ok) {
      console.error('[api/contact] Telegram HTTP', res.status, await res.text().catch(() => ''));
    }
    return res.ok;
  } catch (err) {
    console.error('[api/contact] Telegram failed:', err);
    return false;
  }
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

  const body = sanitizeBody(req.body);

  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  if (!body.nome || !body.telefone) {
    return res.status(400).json({ ok: false, message: 'Nome e telefone são obrigatórios.' });
  }

  // "||" (e não "??") para tratar env var definida como string vazia.
  const to = process.env.CONTACT_TO_EMAIL || 'executeregularizacao@gmail.com';

  const [emailSent, crmSaved, telegramSent] = await Promise.all([
    sendEmailNotification(body, to),
    pushLeadToCrm(body),
    sendTelegramAlert(body),
  ]);

  if (!emailSent && !crmSaved && !telegramSent) {
    console.error('[api/contact] Todos os canais falharam', { emailSent, crmSaved, telegramSent });
    return res.status(503).json({
      ok: false,
      message: 'Não foi possível processar o contato. Tente pelo WhatsApp.',
    });
  }

  return res.status(200).json({ ok: true, crm: crmSaved, email: emailSent, telegram: telegramSent });
}
