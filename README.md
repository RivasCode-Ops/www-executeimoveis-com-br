# Execute Imóveis — Site institucional

Landing page da **Execute Imóveis** (regularização imobiliária em Picos e todo o Piauí), com captação de leads integrada a e-mail e CRM.

**Produção:** https://executeimoveis.com.br

## Stack

- [React 19](https://react.dev) + [Vite 7](https://vitejs.dev) + TypeScript
- [Tailwind CSS 3](https://tailwindcss.com)
- [React Router 7](https://reactrouter.com)
- Ícones via [Remix Icon](https://remixicon.com) (CDN)
- Deploy na [Vercel](https://vercel.com) com função serverless em `api/`

## Desenvolvimento

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção (gera ./out)
npm run preview    # serve o build localmente
npm run lint       # ESLint
npm run type-check # tsc --noEmit
npm test           # Vitest (testes da API de leads)
```

## Captação de leads

Os formulários (hero e seção de contato) enviam POST para `/api/contact`
([api/contact.ts](api/contact.ts)), que processa o lead por dois canais em paralelo:

1. **E-mail** — via [Resend](https://resend.com) quando `RESEND_API_KEY` está
   configurada; caso contrário (ou se o Resend falhar), usa
   [FormSubmit](https://formsubmit.co) como fallback.
2. **CRM** — POST para o webhook configurado em `CRM_LEADS_WEBHOOK_URL`.

O endpoint retorna `503` apenas se **ambos** os canais falharem. Há um campo
honeypot (`website`) para descartar spam de bots.

### Variáveis de ambiente (Vercel)

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `CONTACT_TO_EMAIL` | não | Destinatário dos leads (padrão: `executeregularizacao@gmail.com`) |
| `RESEND_API_KEY` | não | Chave da API do Resend; sem ela, usa FormSubmit |
| `RESEND_FROM_EMAIL` | não | Remetente do Resend (padrão: `noreply@executeimoveis.com.br`) |
| `CRM_LEADS_WEBHOOK_URL` | não | URL do webhook de leads do CRM |
| `CRM_LEADS_WEBHOOK_SECRET` | não | Secret enviado como `Authorization: Bearer` ao CRM |

## Estrutura

```
api/contact.ts          # função serverless (Vercel) de captação de leads
src/pages/home/         # página única com as seções da landing
src/lib/submit-contact.ts  # client do formulário + SERVICE_OPTIONS
public/images/          # logo, foto do consultor, og image
scripts/                # testes manuais dos endpoints (PowerShell)
vercel.json             # build Vite (saída ./out) + rewrites SPA/API
```

## Testes manuais dos endpoints

Os scripts em [scripts/](scripts/) exercitam o endpoint de contato:

```powershell
./scripts/test-contact-endpoints.ps1   # ambiente local/preview
./scripts/test-contact-production.ps1  # produção
```
