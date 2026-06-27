import { useState, useEffect, useCallback } from 'react';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [animating, setAnimating] = useState(false);

  const show = useCallback(() => {
    if (dismissed) return;
    setVisible(true);
    setTimeout(() => setAnimating(true), 10);
  }, [dismissed]);

  const hide = () => {
    setAnimating(false);
    setTimeout(() => {
      setVisible(false);
      setDismissed(true);
      sessionStorage.setItem('exitPopupSeen', '1');
    }, 350);
  };

  useEffect(() => {
    if (sessionStorage.getItem('exitPopupSeen')) {
      setDismissed(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) show();
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backgroundColor: animating ? 'rgba(15,23,42,0.72)' : 'rgba(15,23,42,0)', transition: 'background-color 0.35s ease' }}
      onClick={(e) => { if (e.target === e.currentTarget) hide(); }}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        style={{
          opacity: animating ? 1 : 0,
          transform: animating ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(24px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <div className="h-1 bg-gold" />

        <button
          onClick={hide}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-text-secondary hover:text-text-primary transition-all cursor-pointer z-10"
        >
          <i className="ri-close-line text-base"></i>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-5/12 bg-text-primary relative flex flex-col justify-between p-8 min-h-[260px]">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-gold/20" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border border-gold/15" />

            <div className="relative z-10">
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gold/20 mb-5">
                <i className="ri-gift-2-line text-2xl text-gold"></i>
              </div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-[3px] mb-2">Oferta especial</p>
              <h3 className="text-2xl font-extrabold text-white leading-tight mb-3">
                Antes de sair,<br />aproveite isso!
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Uma conversa rápida pode mudar o futuro do seu imóvel.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3">
              {[
                { icon: 'ri-timer-line', value: '15 min', label: 'de consulta' },
                { icon: 'ri-price-tag-3-line', value: 'Grátis', label: 'sem compromisso' },
              ].map((s) => (
                <div key={s.value} className="flex items-center gap-2">
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-lg bg-white/8">
                    <i className={`${s.icon} text-sm text-gold`}></i>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">{s.value}</p>
                    <p className="text-white/45 text-[10px] mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-7/12 p-8 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold bg-gold/8 rounded-full px-3 py-1 w-fit mb-4">
              <i className="ri-shield-check-line text-xs"></i>
              Consulta 100% gratuita
            </span>

            <h2 className="text-2xl font-extrabold text-text-primary leading-tight mb-2">
              Seu imóvel pode estar em risco sem você saber.
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Descubra gratuitamente se há pendências, irregularidades ou riscos na documentação do
              seu imóvel. Fale agora com Rivaldo Alexandre, especialista CRECI/PI.
            </p>

            <ul className="space-y-2.5 mb-7">
              {[
                'Análise documental sem custo',
                'Resposta rápida pelo WhatsApp',
                'Sem burocracia, direto ao ponto',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full bg-success/10">
                    <i className="ri-check-line text-[11px] text-success font-bold"></i>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/5586994633075?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20consulta%20gratuita%20sobre%20regulariza%C3%A7%C3%A3o%20do%20meu%20im%C3%B3vel."
                target="_blank"
                rel="noopener noreferrer"
                onClick={hide}
                className="flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer flex-1"
              >
                <i className="ri-whatsapp-line text-lg"></i>
                Quero minha consulta grátis
              </a>
              <button
                onClick={hide}
                className="flex items-center justify-center gap-1.5 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors cursor-pointer whitespace-nowrap px-4"
              >
                Não, obrigado
                <i className="ri-arrow-right-line text-xs"></i>
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
              <div className="flex -space-x-2">
                {['M', 'A', 'S'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white flex-shrink-0 bg-primary/90 text-white text-[10px] font-bold flex items-center justify-center"
                    aria-hidden
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary">
                <strong className="text-text-primary">+500 clientes</strong> já regularizaram seus imóveis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}