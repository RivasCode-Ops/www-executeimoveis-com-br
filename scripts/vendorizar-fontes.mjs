#!/usr/bin/env node
/**
 * vendorizar-fontes.mjs — baixa Inter e Remix Icon para dentro de public/fonts.
 *
 * Por que existe: a regra-zero destes projetos é não ter dependência externa em
 * tempo de execução. Antes, toda página buscava a fonte em fonts.googleapis.com
 * e os ícones em cdn.jsdelivr.net — cada visitante entregando IP, agente e
 * referência a dois terceiros, e o site dependendo de servidor alheio estar de
 * pé. Com os arquivos aqui, a CSP fecha em style-src/font-src 'self'.
 *
 * Este script é a única coisa que toca esses arquivos. Rode-o quando quiser
 * atualizar a fonte ou a versão dos ícones — nunca edite public/fonts à mão,
 * porque o cabeçalho de cada CSS declara a origem e a data, e essa declaração
 * é o que permite auditar de onde veio o binário.
 *
 * Uso:  node scripts/vendorizar-fontes.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = path.dirname(fileURLToPath(import.meta.url))
const DESTINO = path.resolve(AQUI, '..', 'public', 'fonts')

// Agente de Chrome moderno: o Google serve woff2 para agente novo e formatos
// antigos e maiores para agente que nao reconhece.
const AGENTE =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'

const INTER_CSS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
const REMIX_VERSAO = '3.5.0'
const REMIX_BASE = `https://cdn.jsdelivr.net/npm/remixicon@${REMIX_VERSAO}/fonts`

// Um site em portugues nao usa cirilico, grego nem vietnamita. Os cinco
// subconjuntos descartados somariam cerca de 600 kB sem servir a ninguem.
const SUBCONJUNTOS = new Set(['latin', 'latin-ext'])

const hoje = new Date().toISOString().slice(0, 10)

async function baixar(url, cabecalhos = {}) {
  const r = await fetch(url, { headers: cabecalhos })
  if (!r.ok) throw new Error(`ABORTA: ${url} respondeu ${r.status}`)
  return r
}

function limparPasta(dir) {
  fs.mkdirSync(dir, { recursive: true })
  // Apaga arquivo a arquivo em vez de remover a pasta: no Windows, remover
  // diretorio recem-criado ou observado por outro processo devolve EPERM.
  for (const f of fs.readdirSync(dir)) fs.unlinkSync(path.join(dir, f))
}

async function inter() {
  const css = await (await baixar(INTER_CSS, { 'User-Agent': AGENTE })).text()
  const dir = path.join(DESTINO, 'inter')
  limparPasta(dir)

  const blocos = [...css.matchAll(/\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)]
  if (blocos.length === 0) throw new Error('ABORTA: nenhum @font-face no CSS do Google')

  const porUrl = new Map()
  const saida = []
  for (const [, subconjunto, regra] of blocos) {
    if (!SUBCONJUNTOS.has(subconjunto)) continue
    const url = regra.match(/url\(([^)]+)\)/)[1]
    if (!porUrl.has(url)) {
      const nome = `inter-${subconjunto}.woff2`
      const buf = Buffer.from(await (await baixar(url)).arrayBuffer())
      fs.writeFileSync(path.join(dir, nome), buf)
      porUrl.set(url, nome)
      console.log(`  inter/${nome}  ${buf.length} bytes`)
    }
    saida.push(
      `/* ${subconjunto} */\n` +
        regra.replace(/url\([^)]+\)/, `url(/fonts/inter/${porUrl.get(url)})`)
    )
  }
  if (saida.length === 0) throw new Error('ABORTA: nenhum subconjunto latino encontrado')

  const nota = `/* Inter, auto-hospedado - nada e buscado em servidor de terceiro em execucao.
   Origem: ${INTER_CSS}
   Baixado em ${hoje} com agente de Chrome moderno.

   ${porUrl.size} arquivo(s) servem ${saida.length} blocos porque o Google entrega Inter como
   fonte VARIAVEL: os cinco pesos apontam para o mesmo woff2 por subconjunto. Os
   blocos foram mantidos um por peso, como o Google os escreve, para a semantica
   ficar identica a de antes.

   Subconjuntos: ${[...SUBCONJUNTOS].join(', ')}. Nao gerado a mao - veja scripts/vendorizar-fontes.mjs */\n\n`

  fs.writeFileSync(path.join(DESTINO, 'inter.css'), nota + saida.join('\n') + '\n')
  console.log(`  inter.css  ${saida.length} blocos, ${porUrl.size} arquivo(s)`)
}

async function remixicon() {
  const css = await (await baixar(`${REMIX_BASE}/remixicon.css`)).text()
  const dir = path.join(DESTINO, 'remixicon')
  limparPasta(dir)

  // Só woff2 e woff. Os originais eot, ttf e svg cobriam IE6-9 e iOS 4.1.
  for (const nome of ['remixicon.woff2', 'remixicon.woff']) {
    const buf = Buffer.from(await (await baixar(`${REMIX_BASE}/${nome}`)).arrayBuffer())
    fs.writeFileSync(path.join(dir, nome), buf)
    console.log(`  remixicon/${nome}  ${buf.length} bytes`)
  }

  const antigo = css.match(/@font-face \{[\s\S]*?\}/)
  if (!antigo) throw new Error('ABORTA: nenhum @font-face no CSS do Remix Icon')
  const novo = `@font-face {
  font-family: "remixicon";
  src: url(/fonts/remixicon/remixicon.woff2) format("woff2"),
       url(/fonts/remixicon/remixicon.woff) format("woff");
  font-display: swap;
}`

  const nota = `/* Remix Icon v${REMIX_VERSAO}, auto-hospedado - nada e buscado em servidor de
   terceiro em execucao. Origem: ${REMIX_BASE}/remixicon.css
   Baixado em ${hoje}. Apache License 2.0.

   Formatos: woff2 e woff. Os originais eot, ttf e svg cobriam IE6-9 e iOS 4.1,
   que nao existem no publico deste site.

   O CSS define ${(css.match(/^\.ri-/gm) || []).length} classes e o site usa umas 50. Ficou inteiro de
   proposito: recortar exigiria regerar a cada icone novo, e o ganho e de CSS
   comprimido, nao de fonte - o woff2 traz todos os glifos de qualquer jeito.

   Nao gerado a mao - veja scripts/vendorizar-fontes.mjs */\n`

  fs.writeFileSync(path.join(DESTINO, 'remixicon.css'), nota + css.replace(antigo[0], novo))
  console.log(`  remixicon.css  ${(css.match(/^\.ri-/gm) || []).length} classes`)
}

console.log(`vendorizando para ${DESTINO}`)
await inter()
await remixicon()

// Trava final: se sobrou URL externa dentro de um src de @font-face, a
// vendorizacao nao serviu para nada e o silencio nao pode passar por sucesso.
for (const arquivo of ['inter.css', 'remixicon.css']) {
  const texto = fs.readFileSync(path.join(DESTINO, arquivo), 'utf8')
  const fora = [...texto.matchAll(/url\(\s*['"]?(https?:)?\/\//g)]
  if (fora.length > 0) {
    console.error(`ABORTA: ${arquivo} ainda tem ${fora.length} url() externa(s)`)
    process.exit(1)
  }
}
console.log('conferido: nenhuma url() externa nos CSS gerados')
