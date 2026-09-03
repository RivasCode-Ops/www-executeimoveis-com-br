#!/usr/bin/env node
/**
 * prerender.mjs — injeta a home já renderizada dentro do out/index.html.
 *
 * Roda depois dos dois builds do Vite (cliente e servidor), como último passo
 * do "npm run build". Sem ele, o HTML que sai do build tem o corpo vazio: uma
 * auditoria de 03/09/2026 mediu 7 palavras de texto visível e nenhum H1 no HTML
 * cru da home, num site cuja razão de existir é ser achado na busca.
 *
 * O que muda e o que não muda:
 *   - MUDA: o <div id="root"> passa a chegar preenchido, então quem lê HTML sem
 *     executar JavaScript vê a página inteira, e a primeira pintura acontece
 *     antes de o pacote de JavaScript baixar.
 *   - NÃO MUDA: o main.tsx segue igual, com createRoot, que descarta o conteúdo
 *     injetado e monta do zero. Nenhuma hidratação, nenhum risco de divergência
 *     entre servidor e cliente. O comportamento em execução é o de antes.
 *
 * As travas abaixo existem porque verificação que não pode reprovar não é
 * verificação: se o marcador sumir, se a renderização vier curta ou sem H1, o
 * build para. Silêncio aqui produziria um deploy com a mesma casca vazia e a
 * impressão de que o problema foi resolvido.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const AQUI = path.dirname(fileURLToPath(import.meta.url))
const RAIZ = path.resolve(AQUI, '..')
const HTML = path.join(RAIZ, 'out', 'index.html')
const SERVIDOR = path.join(RAIZ, 'out-ssr', 'entry-server.js')

const MARCADOR = '<div id="root"></div>'
const MINIMO_PALAVRAS = 500   // a home rende ~1600; 500 pega regressão sem ser frágil

function aborta(motivo) {
  console.error(`ABORTA (prerender): ${motivo}`)
  process.exit(1)
}

if (!fs.existsSync(HTML)) aborta(`${HTML} não existe — rode o build do cliente antes`)
if (!fs.existsSync(SERVIDOR)) aborta(`${SERVIDOR} não existe — rode o build de servidor antes`)

const original = fs.readFileSync(HTML, 'utf8')
if (!original.includes(MARCADOR)) {
  aborta(
    `marcador ${MARCADOR} não encontrado em out/index.html. ` +
    `Se o index.html mudou, ajuste MARCADOR aqui — não deixe passar calado.`
  )
}

const { render } = await import(pathToFileURL(SERVIDOR).href)
const corpo = render('/')

const texto = corpo.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
const palavras = texto ? texto.split(' ').length : 0
if (palavras < MINIMO_PALAVRAS) {
  aborta(`a renderização saiu com ${palavras} palavras, abaixo do mínimo de ${MINIMO_PALAVRAS}`)
}
if (!/<h1[\s>]/.test(corpo)) aborta('a renderização saiu sem <h1>')

fs.writeFileSync(HTML, original.replace(MARCADOR, `<div id="root">${corpo}</div>`))

const antes = Buffer.byteLength(original)
const depois = fs.statSync(HTML).size
console.log(
  `prerender: home injetada — ${palavras} palavras, ` +
  `index.html de ${(antes / 1024).toFixed(1)} kB para ${(depois / 1024).toFixed(1)} kB`
)
