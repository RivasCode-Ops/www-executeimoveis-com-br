---
name: site-execute
description: Regras, contratos e armadilhas do site Execute Regularização Imobiliária (executeimoveis.com.br) — onde cada arquivo mora, o contrato do formulário, o que a CSP proíbe, o que não pode ser escrito e a bateria de verificação obrigatória. Leia ANTES de criar página, mexer em estilo, tocar no formulário ou escrever qualquer texto deste site. Vale para www.executeimoveis.com.br e para o repositório www-executeimoveis-com-br.
---

# Site Execute — o que você precisa saber antes de tocar

Este arquivo existe porque cada regra abaixo foi paga com um defeito real, a
maioria em 03/09/2026. Ler leva três minutos; repetir qualquer um deles custa
uma sessão.

O histórico completo, com as medições, está no registro deste projeto em
`d:/PROJETOS/scripts/docs/PROJETOS-METODO.html`, seção 06.

---

## 1. O que este site é — e o que ele deixou de ser

**É HTML e CSS estáticos. Não executa JavaScript nenhum.**

Até 03/09/2026 era uma aplicação React + Vite + TypeScript. O aplicativo inteiro
foi removido: 17 componentes, roteador, pré-renderização, Vercel Analytics, e 98
pacotes de `node_modules`. **Não existe `src/`.** Se você foi instruído a mexer
em componente, hook ou rota, a instrução está desatualizada — pare e diga isso.

O Vite ficou por dois motivos apenas: copiar `public/` para `out/` e servir com
recarga no desenvolvimento. Não há framework, plugin nem transformação.

```
build     vite build          →  out/
lint      eslint api scripts
type-check tsc --noEmit --project tsconfig.app.json   (cobre api/)
test      vitest run          (28 casos, todos em api/contact.test.ts)
```

Dependências de produção: **nenhuma**. Se você precisar adicionar uma, a resposta
quase certa é não — veja a seção 5.

---

## 2. Onde as coisas moram — esta é a armadilha número um

**`public/` é a raiz servida. A raiz do repositório não é.**

Isso já derrubou duas entregas seguidas, ambas vindas de análises externas que
mandavam criar `/styles.css` e `/pagina/index.html` na raiz do projeto.

| O que você quer publicar | Onde vai |
|---|---|
| a home | `index.html` na raiz — **única exceção**, é a entrada do Vite |
| qualquer outra página | `public/<rota>/index.html` |
| a folha de estilo | `public/styles.css` (servida em `/styles.css`) |
| imagem, fonte, robots, sitemap | `public/...` |

Arquivo posto na raiz do repositório **não é publicado** e dá 404. Pior: até
03/09 havia um curinga de reescrita que devolvia 200 com a home para qualquer
caminho, então o 404 se disfarçava de sucesso. O curinga foi removido; hoje
caminho inexistente responde 404 de verdade — mas a lição fica.

Páginas hoje: `/`, `/consultas-oficiais/`, `/politica-de-privacidade/`,
`/obrigado/`, `/nao-enviado/`, `/guias/` e as 4 guias abaixo dela.

---

## 3. O contrato do formulário

Endpoint real: **`/api/contact`** — não `/api/contato`, que não existe.

```
campos aceitos   nome, telefone, email, cidade, tipo, servico, mensagem,
                 origem, utm_source, utm_medium, utm_campaign, website
obrigatórios     nome, telefone
armadilha        website  (preenchido = robô; devolve sucesso sem tocar canal)
limites          nome 120, telefone 40, email 160, cidade 80, tipo 20,
                 servico 80, mensagem 500
```

**Campo com nome fora dessa lista é descartado em silêncio.** O lead chega pela
metade e ninguém percebe. Se um layout vier com `whatsapp` ou `assunto`,
renomeie para `telefone` e `servico`.

**A resposta depende de quem perguntou** — e isso existe porque o site não tem
JavaScript:

- `Accept: text/html` (navegação de formulário) → **303** com `Location` para
  `/obrigado/` ou `/nao-enviado/`;
- qualquer outro → JSON com o status de sempre (200, 400, 429, 503).

Se você mexer no handler, mantenha os dois caminhos. Sem o 303, o visitante vê
JSON cru na tela logo depois de entregar nome e telefone.

Os canais de saída são Telegram, webhook do CRM e Resend. **O e-mail está
desligado** por falta de `RESEND_API_KEY`; os outros dois funcionam. A página de
privacidade descreve os três — se você mudar canal, mude a página junto.

---

## 4. A CSP proíbe mais do que você imagina

```
default-src 'none'; base-uri 'none'; object-src 'none'; frame-src 'none';
frame-ancestors 'self'; form-action 'self'; script-src 'none';
style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self';
connect-src 'none'; manifest-src 'none'; upgrade-insecure-requests
```

**`script-src 'none'` significa que nenhum script executa — nem inline, nem do
próprio domínio.** Não adianta pôr o arquivo em `public/`. Se a tarefa pede
menu que abre, carrossel, contador, chat, checkout embutido, área de aluno ou
analytics, ela é incompatível com a política atual. Diga isso antes de começar.

`connect-src 'none'` derruba `fetch`, XHR e beacon. `img-src 'self'` derruba
`data:` URI e imagem de outro domínio. `frame-src 'none'` derruba iframe e
embed — incluindo mapa do Google e vídeo do YouTube.

O que **não** é restringido: link `<a href>` para fora. Link externo funciona
normalmente e não precisa de mudança na CSP.

`style-src` mantém `'unsafe-inline'` só porque as 5 guias têm bloco `<style>` e
atributo `style=` e são editadas à mão. Não é convite para escrever estilo
inline em página nova.

---

## 5. Nenhuma dependência externa em execução

Regra-zero deste projeto, e ela já foi violada: até 03/09 o site buscava fontes
do Google e ícones do jsDelivr, entregando IP e agente de cada visitante a dois
terceiros. Antes disso, os leads passavam por um serviço gratuito de formulário.

**Não acrescente:** biblioteca, CDN, fonte remota, framework, plugin, script,
widget, embed, imagem de outro domínio, logo de terceiro, tag de analytics.

Fontes: títulos em Georgia, corpo em Arial — de sistema, nada baixado. As guias
usam Inter e Remix Icon **auto-hospedados** em `public/fonts/`; esses arquivos
ficam. Cuidado: o token `--font-body` diz `Inter,Arial,...`, mas a home não
carrega Inter, então lá quem desenha é o Arial. Não "conserte" isso sem decidir
a tipografia de propósito.

---

## 6. O que não pode ser escrito

O site já publicou, e teve de remover, cada um destes:

- **número não comprovado** — havia "mais de 500 imóveis regularizados";
- **órgão público como parceiro** — havia DETRAN–PI e TCE–PI numa seção de
  "parceiros e cartórios de confiança", sem vínculo nenhum;
- **escassez fabricada** — havia "apenas 4 vagas esta semana" com cronômetro;
- **promessa absoluta** — havia "100% processos regularizados juridicamente" e
  "segurança jurídica garantida".

Regras que valem para qualquer texto novo:

1. **Não prometa resultado.** O que se resolve depende da documentação, da via
   aplicável e das exigências dos órgãos. Essa frase está no site; respeite-a.
2. **Não use "parceiro", "credenciado", "habilitado", "integrado" ou
   "reconhecido"** para instituição sem vínculo formal e verificável.
3. **Não invente prazo, preço, depoimento, certificação nem número.** Se o dado
   não existe, marque com `PREENCHER` e não publique. *(Há uma trava de build
   que aborta ao encontrar essa marca — `scripts/verifica-lacunas.mjs` —, mas
   ela vive no branch do PR #12 e **ainda não está no `main`**. Enquanto o PR
   não for mergeado, a marca depende de você não publicar por cima dela.)*
4. **Sem nome de pessoa, foto pessoal, biografia ou primeira pessoa** na home e
   nas páginas novas. A marca é institucional: *Execute Regularização
   Imobiliária*. **Exceção decidida pelo Rivas:** as 4 guias mantêm a assinatura
   "Por Rivaldo Alexandre — CRECI/PI 1638" como autoria de artigo. Não mexa.
5. **Diga os limites antes, não depois.** Alguns caminhos exigem advogado por
   lei — usucapião extrajudicial é feita em cartório com assistência de
   advogado. Material informativo não é consultoria jurídica.
6. Ao vender qualquer coisa, o **direito de arrependimento de 7 dias** (CDC,
   art. 49) é fato verificável e deve estar escrito.

---

## 7. A bateria de verificação — obrigatória, e ela precisa poder reprovar

Nenhuma mudança de conteúdo ou estilo entra sem isto. Sirva o build e meça; não
deduza do CSS.

```bash
npm run build && cd out && python -m http.server 8140 --bind 127.0.0.1 &
```

| # | O que medir | Como reprova |
|---|---|---|
| 1 | **Sem rolagem horizontal** em 1440, 390 e 320px | `documentElement.scrollWidth − clientWidth` ≠ 0 |
| 2 | **Contraste ≥ 4,5:1** para texto abaixo de 24px | cor computada vs. fundo computado |
| 3 | **Âncora não fica sob o cabeçalho** | `scrollIntoView()` e medir o título vs. altura do header |
| 4 | **Âncora aponta para id que existe na página de destino** | cruzar `href="/#x"` com os ids de `/` |
| 5 | **Alvo de toque ≥ 44px** no celular | altura do retângulo de cada link e botão |
| 6 | **Zero `<script>` executável** e zero dependência externa | `<link rel>` que busca e `src=` apontando para fora |
| 7 | **Conteúdo essencial sem JavaScript** | `curl` na página e contar palavras, h1, form |
| 8 | **Nenhum link interno morto** | cada `href="/..."` resolve para arquivo existente |

Três armadilhas de bancada que já custaram caro aqui:

- **`--window-size` do Chrome sem cabeça não é respeitado** para 390 e 320 —
  os dois caem em 500. Meça dentro de um `<iframe>` da largura exata.
- **Carregar cópia por `file://` quebra caminho absoluto.** `/styles.css` vai
  para a raiz do disco e a página mede sem estilo nenhum. O sinal é
  `h1.left = 8`, que é a margem padrão do navegador. Sirva por HTTP.
- **`--dump-dom` no Windows volta vazio** se o processo se destacar. Use
  `Start-Process ... -RedirectStandardOutput -Wait`, e trate dump vazio como
  **aborta**, nunca como sucesso. E o salto por fragmento (`/#secao`) não
  acontece com `--virtual-time-budget`: use `scrollIntoView()`.

---

## 8. Decisões já tomadas — não reabra sem falar

- **Sem JavaScript** é escolha, não limitação. Menu sem hambúrguer, conteúdo
  sem animação obrigatória, formulário nativo.
- **CRECI fora da home**, mantido nas guias.
- **As guias continuam como estão** — cabeçalho próprio, marca antiga, fora do
  menu novo. Levantado e mantido pelo Rivas em 03/09. É a pendência de maior
  efeito comercial da lista, porque são as páginas que rankeiam, mas a decisão
  é dele.
- **Cobrança, se houver, por link externo.** Checkout embutido exigiria abrir a
  CSP e mudar a política de privacidade.

## 9. Em aberto — cheque antes de dizer que está tudo certo

O domínio **não tem SPF, DKIM nem DMARC**, e não tem MX. Qualquer um pode forjar
e-mail `@executeimoveis.com.br`. Nenhum cabeçalho, nenhuma CSP e nenhum scanner
de aplicação encosta nisso. É o maior risco isolado do negócio e o conserto é no
painel do Registro.br — dois registros TXT.

A lista completa de pendências está no registro do projeto, seção 06 do caderno.
