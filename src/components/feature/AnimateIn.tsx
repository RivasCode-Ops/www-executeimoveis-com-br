import { useRef, useState, useEffect, ReactNode } from 'react';

/**
 * AnimateIn — entrada suave por scroll, sem esconder conteúdo de quem não executa JavaScript.
 *
 * O ponto delicado deste componente é o estado inicial, e ele já custou caro. Antes,
 * `inView` começava `false` sempre, então cada bloco embrulhado saía do servidor com
 * `style="opacity:0"`. Medido no HTML de produção em 03/09/2026: **1.322 das 1.599 palavras
 * da home — 82% — chegavam invisíveis**, o que anulava boa parte do pré-render, que existe
 * justamente para quem lê HTML cru. O número que eu tinha registrado como ganho ("7 palavras
 * viraram 1606") media presença no documento; o que valia era visibilidade.
 *
 * Agora o estado inicial depende de onde o componente renderiza:
 *
 *   - no servidor (`window` indefinido) nasce VISÍVEL, e sem estilo inline nenhum — o HTML
 *     cru não carrega sequer o atributo `style`, então não há o que interpretar errado;
 *   - no navegador nasce oculto e o IntersectionObserver revela, exatamente como antes.
 *
 * Isso só é seguro porque o cliente monta com `createRoot`, não `hydrateRoot`: o React
 * descarta o HTML injetado e renderiza do zero, então a diferença entre servidor e cliente
 * não é divergência de hidratação, é a montagem normal. **Se um dia o `main.tsx` passar a
 * hidratar, este componente precisa mudar junto** — ver o comentário no topo de
 * `scripts/prerender.mjs`, que depende da mesma decisão.
 *
 * Duas travas contra o conteúdo depender de JavaScript para existir:
 *
 *   - `prefers-reduced-motion` desliga a animação inteira em vez de atenuá-la. Quem pede
 *     menos movimento recebe o conteúdo posto, não uma versão mais lenta do mesmo efeito.
 *   - sem `IntersectionObserver` no navegador, o conteúdo aparece de uma vez. Antes, um
 *     navegador sem a API deixava o bloco oculto para sempre.
 */

const NO_SERVIDOR = typeof window === 'undefined';

function prefereMenosMovimento(): boolean {
  return (
    !NO_SERVIDOR &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  className?: string;
  threshold?: number;
}

export default function AnimateIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  className = '',
  threshold = 0.12,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Só é oculto no início quem está num navegador que vai mesmo animar.
  const [semAnimacao] = useState(
    () => NO_SERVIDOR || prefereMenosMovimento() || typeof IntersectionObserver === 'undefined'
  );
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (semAnimacao) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, semAnimacao]);

  // Sem animação: nenhum estilo inline. O que sai daqui é o conteúdo, e nada mais.
  if (semAnimacao) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const getInitialTransform = (): string => {
    switch (direction) {
      case 'up':    return `translateY(${distance}px)`;
      case 'down':  return `translateY(-${distance}px)`;
      case 'left':  return `translateX(-${distance}px)`;
      case 'right': return `translateX(${distance}px)`;
      default:      return 'translateY(0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : getInitialTransform(),
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
