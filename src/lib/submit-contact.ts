// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
export type ContactPayload = {
  nome: string;
  telefone: string;
  email?: string;
  servico?: string;
  mensagem?: string;
  /** Identifica de onde o formulário foi submetido */
  origem?: "hero" | "contato";
  /** Honeypot — nunca preencher */
  website?: string;
};

export type ContactResult = {
  ok: boolean;
  crm?: boolean;
  email?: boolean;
  message?: string;
};

// ---------------------------------------------------------------------------
// Opções unificadas do <select> (Hero + Contato)
// ---------------------------------------------------------------------------
export const SERVICE_OPTIONS = [
  "Regularização de Imóvel Urbano",
  "Regularização de Imóvel Rural",
  "Inventário e Partilha",
  "Usucapião Judicial",
  "Usucapião Extrajudicial",
  "Retificação de Matrícula",
  "Adjudicação Compulsória",
  "Consultoria para Compra e Venda",
  "Outro",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

// ---------------------------------------------------------------------------
// Função principal
// ---------------------------------------------------------------------------
export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResult> {
  // Captura UTMs da URL atual (só no browser)
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      origem: payload.origem ? `site:${payload.origem}` : "site",
      utm_source: params.get("utm_source") ?? undefined,
      utm_medium: params.get("utm_medium") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      ok: false,
      message: (data as { message?: string }).message ?? "Erro ao enviar.",
    };
  }

  const data = (await res.json()) as ContactResult;
  return { ok: Boolean(data.ok), crm: data.crm, email: data.email };
}
