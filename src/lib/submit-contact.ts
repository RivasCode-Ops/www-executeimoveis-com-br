export type ContactPayload = {
  nome: string;
  telefone: string;
  email?: string;
  servico?: string;
  mensagem?: string;
  origem?: 'hero' | 'contato';
  website?: string;
};

export type ContactResult = {
  ok: boolean;
  crm?: boolean;
  email?: boolean;
  message?: string;
};

export const SERVICE_OPTIONS = [
  'Regularização de Imóvel Urbano',
  'Regularização de Imóvel Rural',
  'Inventário e Partilha',
  'Usucapião Judicial',
  'Usucapião Extrajudicial',
  'Retificação de Matrícula',
  'Adjudicação Compulsória',
  'Consultoria para Compra e Venda',
  'Outro',
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export async function submitContactForm(payload: ContactPayload): Promise<ContactResult> {
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...payload,
      origem: payload.origem ? `site:${payload.origem}` : 'site',
      utm_source: params.get('utm_source') ?? undefined,
      utm_medium: params.get('utm_medium') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      ok: false,
      message: (data as { message?: string }).message ?? 'Erro ao enviar.',
    };
  }

  const data = (await res.json()) as ContactResult;
  return { ok: Boolean(data.ok), crm: data.crm, email: data.email };
}
