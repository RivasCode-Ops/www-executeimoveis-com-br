#!/usr/bin/env node
/**
 * verifica-lacunas.mjs — impede que texto de preenchimento vá ao ar.
 *
 * Roda como último passo do build. Existe porque a página do curso nasceu com
 * fatos que só o Rivas tem — preço, carga horária, prazo de acesso — e página
 * de venda com "PREENCHER" no lugar do preço é pior que página nenhuma: ela
 * publica, indexa, e quem chega vê um rascunho.
 *
 * A trava é no build de propósito, e não num teste: teste reprova depois, o
 * build impede o artefato de existir.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SAIDA = path.join(RAIZ, 'out')
const MARCA = 'PREENCHER'

function varre(dir) {
  const achados = []
  for (const nome of fs.readdirSync(dir)) {
    const p = path.join(dir, nome)
    if (fs.statSync(p).isDirectory()) { achados.push(...varre(p)); continue }
    if (!/\.(html|css|xml|txt|json)$/i.test(nome)) continue
    const texto = fs.readFileSync(p, 'utf8')
    if (!texto.includes(MARCA)) continue
    const linhas = texto.split('\n')
      .map((l, i) => [i + 1, l])
      .filter(([, l]) => l.includes(MARCA))
    achados.push({ arquivo: path.relative(SAIDA, p), linhas })
  }
  return achados
}

if (!fs.existsSync(SAIDA)) {
  console.error(`ABORTA (lacunas): ${SAIDA} não existe — rode o build antes`)
  process.exit(1)
}

const achados = varre(SAIDA)
if (achados.length) {
  console.error(`\nABORTA (lacunas): ${achados.length} arquivo(s) com "${MARCA}" no que seria publicado.\n`)
  for (const a of achados) {
    console.error(`  ${a.arquivo}`)
    for (const [n, l] of a.linhas) console.error(`    linha ${n}: ${l.trim().slice(0, 110)}`)
  }
  console.error(`\nPreencha os dados reais ou tire a página do build. Página de venda`)
  console.error(`com texto de preenchimento no lugar do preço indexa como rascunho.\n`)
  process.exit(1)
}

console.log('lacunas: nenhum texto de preenchimento no build')
