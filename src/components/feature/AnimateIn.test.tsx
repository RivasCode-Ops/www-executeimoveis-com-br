/**
 * Trava contra o conteúdo voltar a nascer invisível.
 *
 * Em 03/09/2026 a home foi pré-renderizada para que quem lê HTML sem executar
 * JavaScript visse a página. O número comemorado foi "7 palavras viraram 1606".
 * Medido depois dentro das tags, no HTML de produção: 1.322 dessas palavras — 82% —
 * chegavam dentro de elemento com `style="opacity:0"`, porque o AnimateIn começava
 * com `inView = false` e no servidor não existe IntersectionObserver. O leitor sem
 * JavaScript via 277 palavras, não 1.599.
 *
 * Estes testes existem porque aquele defeito era invisível em toda verificação que
 * contava presença no documento. Eles contam VISIBILIDADE, que é a coisa que decide.
 */
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import AnimateIn from './AnimateIn';

/**
 * A mesma trava, na página inteira, mora no scripts/prerender.mjs, que ABORTA o build
 * se o HTML gerado passar do teto de blocos ocultos. Ela não está aqui porque sob o
 * vitest o StaticRouter e o useRoutes caem em instâncias diferentes de react-router, e
 * um teste que não roda é pior que teste nenhum. Abortar o build é trava mais forte
 * que asserção: impede o artefato de existir, não só reprova depois.
 */
describe('AnimateIn no servidor', () => {
  it('não emite estilo inline nenhum, então o conteúdo chega visível', () => {
    const html = renderToString(
      <AnimateIn>
        <p>texto que precisa ser lido sem JavaScript</p>
      </AnimateIn>
    );

    expect(html).toContain('texto que precisa ser lido sem JavaScript');
    expect(html).not.toContain('opacity:0');
    expect(html).not.toContain('style=');
  });

  it('mantém a className recebida, para o layout não mudar', () => {
    const html = renderToString(<AnimateIn className="mb-10"><span>x</span></AnimateIn>);
    expect(html).toContain('class="mb-10"');
  });
});
