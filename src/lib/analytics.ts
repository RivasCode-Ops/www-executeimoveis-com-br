import { track } from '@vercel/analytics';

/** Lead enviado com sucesso por um dos formulários. */
export function trackLeadSubmit(origem: 'hero' | 'contato') {
  track('lead_submit', { origem });
}

/** Clique em qualquer CTA de WhatsApp. */
export function trackWhatsAppClick(origem: string) {
  track('whatsapp_click', { origem });
}
