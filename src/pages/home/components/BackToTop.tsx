import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setScrollPct(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dash = (scrollPct / 100) * circumference;

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo"
      className="fixed bottom-24 right-6 z-50 cursor-pointer group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg
          className="absolute inset-0 -rotate-90"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2.5"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="#C8A96E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            style={{ transition: 'stroke-dasharray 0.2s ease' }}
          />
        </svg>

        <div className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-text-primary group-hover:bg-gold transition-colors duration-200">
          <i className="ri-arrow-up-line text-white text-base"></i>
        </div>
      </div>

      <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-text-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg pointer-events-none opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        Voltar ao topo
        <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-l-[5px] border-t-transparent border-b-transparent border-l-text-primary"></span>
      </span>
    </button>
  );
}