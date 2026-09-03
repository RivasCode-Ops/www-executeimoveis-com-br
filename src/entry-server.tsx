/**
 * Entrada de renderização no servidor — usada só no build, nunca no navegador.
 *
 * Por que existe: o site é uma aplicação de página única, então o HTML que sai
 * do build tem o corpo vazio. Uma auditoria de 03/09/2026 mediu 7 palavras de
 * texto visível e nenhum H1 no HTML cru da home. Quem não executa JavaScript —
 * rastreador de buscador secundário, rastreador de IA — vê uma casca.
 *
 * Este arquivo renderiza a mesma árvore de componentes com renderToString, no
 * Node, sem navegador. O scripts/prerender.mjs pega essa saída e a injeta no
 * <div id="root"> do out/index.html depois do build.
 *
 * O que este arquivo NÃO faz, de propósito:
 *   - não chama inject() do @vercel/analytics: é coisa de navegador;
 *   - não importa index.css: quem carrega o CSS é o main.tsx, no cliente;
 *   - não mexe no main.tsx. O cliente continua usando createRoot, que descarta
 *     o conteúdo pré-renderizado e monta do zero. Isso é escolha, não descuido:
 *     hydrateRoot seria mais rápido, mas exige que servidor e cliente rendam
 *     exatamente igual, e divergência ali quebra a página de um jeito difícil
 *     de ver. Aqui o pré-renderizado serve para quem lê HTML e para a primeira
 *     pintura; o comportamento em execução fica idêntico ao de antes.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './router'

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url} basename={__BASE_PATH__}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  )
}
