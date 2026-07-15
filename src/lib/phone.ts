/** Formata dígitos como telefone brasileiro: (86) 9999-9999 ou (86) 99999-9999. */
export function formatPhoneBR(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Padrão para validação nativa do navegador (10 ou 11 dígitos com DDD). */
export const PHONE_PATTERN = '\\(\\d{2}\\) \\d{4,5}-\\d{4}';

export const PHONE_TITLE = 'Informe um telefone válido com DDD, ex.: (86) 99999-9999';
