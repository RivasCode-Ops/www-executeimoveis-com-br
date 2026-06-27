import { useState, useEffect } from 'react';

const SPOTS_LEFT = 4;

function useCountdown() {
  const getTarget = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return end.getTime() - now.getTime();
  };

  const [ms, setMs] = useState(getTarget());

  useEffect(() => {
    const interval = setInterval(() => {
      setMs((prev) => {
        if (prev <= 1000) return getTarget();
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');

  return { hours, minutes, seconds };
}

export default function ConsultaBanner() {
  const { hours, minutes, seconds } = useCountdown();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <section className="bg-[#1a2b4a] relative overflow-hidden">
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Emerald accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Left: offer info */}
          <div className="flex items-center gap-5 flex-wrap justify-center lg:justify-start">
            {/* Badge */}
            <div className="flex-shrink-0 bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap">
              100% Gratuita
            </div>

            {/* Text */}
            <div>
              <p className="text-white font-extrabold text-lg leading-tight">
                Primeira consulta de diagnóstico sem nenhum custo
              </p>
              <p className="text-white/60 text-sm mt-0.5">
                Descubra exatamente o que precisa para regularizar seu imóvel — sem compromisso.
              </p>
            </div>
          </div>

          {/* Center: urgency signals */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {/* Spots left */}
            <div className="flex items-center gap-2.5 bg-white/8 rounded-xl px-4 py-2.5 border border-white/10">
              <div className="relative w-2.5 h-2.5 flex-shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="absolute inset-0 rounded-full bg-emerald-400" />
              </div>
              <span className="text-white text-sm font-semibold whitespace-nowrap">
                Apenas <span className="text-emerald-400 font-extrabold">{SPOTS_LEFT} vagas</span> esta semana
              </span>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-xs uppercase tracking-wider whitespace-nowrap">Oferta expira em</span>
              <div className="flex items-center gap-1">
                {[hours, minutes, seconds].map((unit, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="bg-white/10 border border-white/10 text-white font-extrabold text-sm rounded-md w-9 h-9 flex items-center justify-center tabular-nums">
                      {unit}
                    </span>
                    {i < 2 && <span className="text-white/40 font-bold text-sm">:</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: CTA + dismiss */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/5586994633075?text=Ol%C3%A1%21+Gostaria+de+agendar+minha+consulta+gratuita+de+diagn%C3%B3stico+imobili%C3%A1rio."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <i className="ri-calendar-check-line text-base"></i>
              Agendar Consulta Grátis
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex-shrink-0"
              aria-label="Fechar banner"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Emerald accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  );
}
