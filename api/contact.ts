import type { VercelRequest, VercelResponse } from "@vercel/node";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
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
  website?: string; // honeypot
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Envia e-mail via Resend. Retorna true se OK. */
async function sendViaResend(body: Body, to: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@executeimoveis.com.br";
  if (!apiKey) return false;

  const text = [
    `Nome: ${body.nome}`,
    `Telefone: ${body.telefone}`,
    `E-mail: ${body.email || "—"}`,
    `Serviço: ${body.servico || "—"}`,
    `Mensagem: ${body.mensagem || "—"}`,
    `Origem: ${body.origem || "—"}`,
    body.utm_source ? `UTM: ${body.utm_source}/${body.utm_medium ?? ""}/${body.utm_campaign ?? ""}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject: `[Execute Imóveis] Novo contato: ${body.nome}`,
      text,
    }),
  });
  return res.ok;
}

/** Envia lead para o CRM via webhook. Retorna true se OK. */
async function pushLeadToCrm(body: Body): Promise<boolean> {
  const crmUrl = process.env.CRM_LEADS_WEBHOOK_URL;
  const secret = process.env.CRM_LEADS_WEBHOOK_SECRET;
  if (!crmUrl || !secret) return false;

  try {
    const res = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (err) {
    console.error("[api/contact] CRM push failed:", err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Método não permitido." });
  }

  const body = req.body as Body;

  // Honeypot
  if (body.website?.trim()) {
    return res.status(200).json({ ok: true });
  }

  // Validação
  if (!body.nome?.trim() || !body.telefone?.trim()) {
    return res
      .status(400)
      .json({ ok: false, message: "Nome e telefone são obrigatórios." });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "contato@executeimoveis.com.br";

  const [emailSent, crmSaved] = await Promise.all([
    sendViaResend(body, to),
    pushLeadToCrm(body),
  ]);

  // Sucesso se pelo menos um canal funcionou
  if (!emailSent && !crmSaved) {
    console.error("[api/contact] Ambos os canais falharam", { emailSent, crmSaved });
    return res.status(503).json({
      ok: false,
      message: "Não foi possível processar o contato. Tente pelo WhatsApp.",
    });
  }

  return res.status(200).json({ ok: true, crm: crmSaved, email: emailSent });
}
