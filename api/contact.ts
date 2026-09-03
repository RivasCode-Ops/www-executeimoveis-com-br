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

/* ------------------------------------------------------------------ *
 * Limite de taxa
 *
 * O endereço é público e sem autenticação, e cada chamada aceita dispara
 * Telegram, CRM e e-mail. Sem trava, uma única pessoa inunda os três.
 *
 * A contagem vive na memória da instância. Serverless escala em várias
 * instâncias, então um ataque distribuído passa mais que o teto abaixo —
 * isto corta o caso comum (um script, um IP), não substitui um contador
 * central. Trocar por Vercel KV / Upstash quando houver motivo.
 * ------------------------------------------------------------------ */

export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, number[]>();

/** Só a borda da Vercel escreve estes cabeçalhos; o cliente não os controla. */
export function clientIp(req: VercelRequest): string | null {
  const headers = (req.headers ?? {}) as Record<string, string | string[] | undefined>;

  const real = headers['x-real-ip'];
  if (typeof real === 'string' && real.trim()) return real.trim();

  const fwd = headers['x-forwarded-for'];
  const raw = Array.isArray(fwd) ? fwd[0] : fwd;
  if (typeof raw === 'string' && raw.trim()) {
    const first = raw.split(',')[0]?.trim();
    if (first) return first;
  }
  return null;
}

/** true = estourou a cota. Registra a tentativa quando ela é aceita. */
export function rateLimited(ip: string, now: number = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Poda: sem isto o Map cresce sem teto na instância quente.
  if (hits.size > 5_000) {
    for (const [key, stamps] of hits) {
      if (stamps.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

/** Só para os testes: zera o contador entre casos. */
export function resetRateLimit(): void {
  hits.clear();
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

/**
 * E-mail só pelo Resend, que é conta nossa e entrega direto.
 *
 * Não há reserva de propósito. A anterior era o formsubmit.co — terceiro
 * gratuito, sem contrato, por onde passavam nome, telefone, e-mail e mensagem
 * de quem procura regularização de imóvel. Dado de lead não sai daqui para
 * serviço de graça. E ela não estava nem entregando: em 03/09/2026 um lead de
 * teste em produção devolveu `email:false` com `crm:true` e `telegram:true`.
 *
 * Sem RESEND_API_KEY, o canal de e-mail fica desligado — declaradamente, no
 * log e no corpo da resposta (`email:false`). CRM e Telegram seguem avisando,
 * e são os dois canais provados.
 */
async function sendEmailNotification(body: Body, to: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.warn(
      '[api/contact] RESEND_API_KEY ausente: canal de e-mail desligado. ' +
        'Lead segue por CRM e Telegram.',
    );
    return false;
  }
  return sendViaResend(body, to);
}

/** Monta um link wa.me a partir do telefone informado pelo lead. */
export function waLink(phone?: string): string | null {
  if (!phone) return null;
  let d = phone.replace(/\D/g, '');
  if (!d) return null;
  // Adiciona o código do Brasil quando vier só com DDD + número (10 ou 11 dígitos).
  if (!d.startsWith('55') && (d.length === 10 || d.length === 11)) d = `55${d}`;
  return `https://wa.me/${d}`;
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

  // Botão de 1 toque para responder o lead direto no WhatsApp.
  const wa = waLink(body.telefone);
  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
  };
  if (wa) {
    payload.reply_markup = {
      inline_keyboard: [[{ text: '💬 Responder no WhatsApp', url: wa }]],
    };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

  // Antes de qualquer trabalho: enxurrada tem de sair barata.
  const ip = clientIp(req);
  if (ip && rateLimited(ip)) {
    res.setHeader('Retry-After', String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
    return res.status(429).json({
      ok: false,
      message: 'Muitas tentativas seguidas. Aguarde alguns minutos ou fale pelo WhatsApp.',
    });
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
