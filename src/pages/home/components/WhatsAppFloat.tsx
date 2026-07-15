import { useState, useEffect } from 'react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setShowTooltip(true), 800);
    const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-xl px-4 py-3 relative whitespace-nowrap shadow-lg border border-border">
          <p className="text-text-primary text-sm font-semibold leading-tight">Fale com um especialista</p>
          <p className="text-text-secondary text-xs mt-0.5">Resposta rápida pelo WhatsApp</p>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0"
            style={{ borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '6px solid white' }}
          />
        </div>
      </div>

      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-30" />
        <span className="absolute inset-[-4px] rounded-full bg-success/20 animate-pulse" />

        <a
          href="https://wa.me/5586994633075?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+regulariza%C3%A7%C3%A3o+imobili%C3%A1ria."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          onClick={() => trackWhatsAppClick('float')}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-14 h-14 flex items-center justify-center rounded-full bg-success hover:bg-success/90 text-white transition-all duration-200 hover:scale-110 cursor-pointer"
        >
          <i className="ri-whatsapp-line text-2xl"></i>
        </a>
      </div>
    </div>
  );
}