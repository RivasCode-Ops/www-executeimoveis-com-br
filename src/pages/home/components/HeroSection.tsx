import { useState, FormEvent } from 'react';
import { SERVICE_OPTIONS, submitContactForm } from '@/lib/submit-contact';

export default function HeroSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus('sending');
    try {
      const result = await submitContactForm({
        nome: String(formData.get('nome') ?? ''),
        telefone: String(formData.get('telefone') ?? ''),
        email: String(formData.get('email') ?? ''),
        servico: String(formData.get('servico') ?? ''),
        mensagem: String(formData.get('mensagem') ?? ''),
        origem: 'hero',
        website: String(formData.get('website') ?? ''),
      });
      if (result.ok) {
        setStatus('success');
        form.reset();
        setCharCount(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const miniProofs = [
    { icon: 'ri-map-pin-line', text: 'Atendimento em Picos e todo o Piauí' },
    { icon: 'ri-stethoscope-line', text: 'Diagnóstico inicial do caso' },
    { icon: 'ri-award-line', text: 'Mais de 10 anos de experiência' },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Regularização Imobiliária"
          className="w-full h-full object-cover object-top"
        />
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120]/95 via-[#0F172A]/82 to-[#0F172A]/58" />
        {/* Extra darkening on the left text area for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d1a]/70 via-[#0a1020]/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-start gap-14 lg:gap-20">
          <div className="flex-1 min-w-0 pt-6">
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 mb-10">
              <i className="ri-map-pin-2-fill text-gold text-xs"></i>
              <span className="text-white/80 text-xs font-medium tracking-[0.12em] uppercase">Picos, Piauí</span>
              <span className="w-1 h-1 rounded-full bg-white/30"></span>
              <span className="text-white/55 text-xs tracking-wide">Atendimento em todo o estado</span>
            </div>

            <h1 className="text-[2rem] sm:text-4xl lg:text-[3.25rem] font-bold text-white leading-[1.12] tracking-tight mb-10">
              Regularize seu imóvel no Piauí com{' '}
              <span className="text-gold">segurança jurídica</span> e acompanhamento completo
            </h1>

            <p className="text-white/[0.82] text-base sm:text-lg leading-[1.75] mb-14 max-w-lg">
              Análise especializada de pendências documentais com acompanhamento técnico até a regularização do seu imóvel.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2.5 bg-primary hover:bg-primary-hover text-white px-9 py-4 rounded-xl font-semibold text-sm transition-all whitespace-nowrap cursor-pointer shadow-xl shadow-primary/20 tracking-wide"
              >
                Analisar meu caso
                <i className="ri-arrow-right-line text-base"></i>
              </button>
              <a
                href="https://wa.me/5586994633075"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 border border-white/25 hover:border-white/50 text-white hover:bg-white/[0.05] px-9 py-4 rounded-xl font-semibold text-sm transition-all whitespace-nowrap cursor-pointer backdrop-blur-sm tracking-wide"
              >
                <i className="ri-whatsapp-line text-base"></i>
                Falar no WhatsApp
              </a>
            </div>

            {/* Proof points with subtle glass badges */}
            <div className="flex flex-wrap gap-x-3 gap-y-3">
              {miniProofs.map((p) => (
                <div
                  key={p.text}
                  className="flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5"
                >
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gold/15">
                    <i className={`${p.icon} text-gold text-sm`}></i>
                  </div>
                  <span className="text-white/80 text-sm font-medium tracking-wide">{p.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="relative bg-white/[0.97] backdrop-blur-xl rounded-2xl shadow-[0_32px_80px_-20px_rgba(0,0,0,0.3)] border border-white/15 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
              
              <div className="p-8">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-14 h-14 flex items-center justify-center bg-success/10 rounded-full mb-5">
                      <i className="ri-check-line text-2xl text-success"></i>
                    </div>
                    <h4 className="text-lg font-bold text-text-primary mb-2">Mensagem Enviada</h4>
                    <p className="text-text-secondary text-sm leading-relaxed max-w-[260px]">
                      Recebemos seu contato! Retornaremos em até 24 horas úteis. Se for urgente, fale conosco pelo WhatsApp.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-7 text-primary text-sm font-semibold hover:underline cursor-pointer"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-text-primary tracking-tight">Análise gratuita do seu caso</h3>
                        <p className="text-text-secondary text-[13px] mt-0.5">Receba um diagnóstico especializado em até 24h</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 bg-gold/10 border border-gold/20 rounded-full px-3 py-1">
                        <i className="ri-shield-check-line text-gold text-xs"></i>
                        <span className="text-gold text-[11px] font-semibold tracking-wide">Sem compromisso</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                      />
                      <div>
                        <label htmlFor="hero-nome" className="block text-[11px] font-semibold text-text-primary mb-1.5 uppercase tracking-[0.08em]">
                          Nome Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="hero-nome"
                          name="nome"
                          type="text"
                          required
                          placeholder="Seu nome"
                          className="w-full border border-border/70 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/8 transition-all bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="hero-telefone" className="block text-[11px] font-semibold text-text-primary mb-1.5 uppercase tracking-[0.08em]">
                            WhatsApp <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="hero-telefone"
                            name="telefone"
                            type="tel"
                            required
                            placeholder="(86) 99999-9999"
                            className="w-full border border-border/70 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/8 transition-all bg-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="hero-email" className="block text-[11px] font-semibold text-text-primary mb-1.5 uppercase tracking-[0.08em]">E-mail</label>
                          <input
                            id="hero-email"
                            name="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full border border-border/70 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/8 transition-all bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="hero-servico" className="block text-[11px] font-semibold text-text-primary mb-1.5 uppercase tracking-[0.08em]">Interesse</label>
                        <select
                          id="hero-servico"
                          name="servico"
                          className="w-full border border-border/70 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/8 transition-all bg-white cursor-pointer appearance-none"
                        >
                          <option value="">Selecione o serviço...</option>
                          {SERVICE_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="hero-mensagem" className="block text-[11px] font-semibold text-text-primary uppercase tracking-[0.08em]">Mensagem (opcional)</label>
                          <span className={`text-[11px] ${charCount > 450 ? 'text-red-500' : 'text-text-secondary/50'}`}>{charCount}/500</span>
                        </div>
                        <textarea
                          id="hero-mensagem"
                          name="mensagem"
                          rows={3}
                          maxLength={500}
                          placeholder="Descreva brevemente o que precisa..."
                          onChange={(e) => setCharCount(e.target.value.length)}
                          className="w-full border border-border/70 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/8 transition-all resize-none bg-white"
                        ></textarea>
                      </div>

                      {status === 'error' && (
                        <p className="text-red-500 text-xs">Erro ao enviar. Tente novamente.</p>
                      )}

                      <p className="text-[11px] text-text-secondary/70 leading-relaxed">
                        Ao enviar, você concorda com o tratamento dos dados conforme a{' '}
                        <button
                          type="button"
                          onClick={() => document.getElementById('privacidade')?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-primary hover:underline cursor-pointer"
                        >
                          política de privacidade
                        </button>
                        . Versão: 2026-05-14-v1.
                      </p>

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-semibold text-sm transition-all whitespace-nowrap cursor-pointer disabled:opacity-60 shadow-lg shadow-primary/15 mt-1"
                      >
                        {status === 'sending' ? (
                          <>
                            <i className="ri-loader-4-line animate-spin"></i>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <i className="ri-send-plane-2-line"></i>
                            Enviar
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-5 pt-5 border-t border-border/40 flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1.5 text-text-secondary/60">
                        <i className="ri-time-line text-xs"></i>
                        <span className="text-[11px]">Resposta em até 24h</span>
                      </div>
                      <span className="w-px h-3 bg-border/60"></span>
                      <div className="flex items-center gap-1.5 text-text-secondary/60">
                        <i className="ri-lock-line text-xs"></i>
                        <span className="text-[11px]">Dados protegidos</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}