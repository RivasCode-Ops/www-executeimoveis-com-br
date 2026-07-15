import { useState, FormEvent } from 'react';
import AnimateIn from '../../../components/feature/AnimateIn';
import { SERVICE_OPTIONS, submitContactForm } from '@/lib/submit-contact';
import { formatPhoneBR, PHONE_PATTERN, PHONE_TITLE } from '@/lib/phone';
import { trackLeadSubmit, trackWhatsAppClick } from '@/lib/analytics';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);
  const [phone, setPhone] = useState('');

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
        origem: 'contato',
        website: String(formData.get('website') ?? ''),
      });
      if (result.ok) {
        setStatus('success');
        form.reset();
        setCharCount(0);
        setPhone('');
        trackLeadSubmit('contato');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-text-secondary mb-4 block">
              CONTATO
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
              Vamos regularizar seu imóvel?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Entre em contato agora mesmo. Atendimento rápido, sem burocracia e sem compromisso.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <AnimateIn direction="left" delay={100} className="lg:col-span-2 flex flex-col gap-6">
            <a
              href="https://wa.me/5586994633075"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('contato')}
              className="flex items-center gap-5 bg-success hover:bg-success/90 transition-colors rounded-2xl p-7 cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-xl flex-shrink-0">
                <i className="ri-whatsapp-line text-4xl text-white"></i>
              </div>
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Atendimento Imediato</p>
                <p className="text-white text-2xl font-extrabold">(86) 9 9463-3075</p>
                <p className="text-white/80 text-sm mt-1">Clique para iniciar uma conversa</p>
              </div>
            </a>

            {[
              { icon: 'ri-map-pin-2-line', label: 'Localização', value: 'Picos – PI\nAtendemos todo o estado do Piauí' },
              { icon: 'ri-mail-line', label: 'E-mail', value: 'executeregularizacao@gmail.com' },
              { icon: 'ri-time-line', label: 'Horário', value: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h' },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-4 bg-surface rounded-xl p-5 border border-border/60 shadow-[0_2px_16px_-2px_rgba(15,23,42,0.05)]">
                <div className="w-10 h-10 flex items-center justify-center bg-gold/8 border border-gold/10 rounded-lg flex-shrink-0">
                  <i className={`${info.icon} text-gold text-base`}></i>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">{info.label}</p>
                  <p className="text-text-primary text-sm font-medium whitespace-pre-line">{info.value}</p>
                </div>
              </div>
            ))}
          </AnimateIn>

          <AnimateIn direction="right" delay={200} className="lg:col-span-3">
            <div className="bg-surface rounded-2xl p-10 border border-border/60 shadow-[0_2px_16px_-2px_rgba(15,23,42,0.05)]">
              <h3 className="text-2xl font-bold text-text-primary mb-2">Ou preencha o formulário</h3>
              <p className="text-text-secondary text-sm mb-8">Respondemos em até 24 horas úteis.</p>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-gold/10 rounded-full mb-4">
                    <i className="ri-check-line text-3xl text-gold"></i>
                  </div>
                  <h4 className="text-xl font-bold text-text-primary mb-2">Mensagem Enviada!</h4>
                  <p className="text-text-secondary text-sm">
                    Recebemos seu contato! Retornaremos em até 24 horas úteis.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-gold text-sm font-semibold underline cursor-pointer"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contato-nome" className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wide">Nome Completo *</label>
                      <input
                        id="contato-nome"
                        name="nome"
                        type="text"
                        required
                        placeholder="Seu nome completo"
                        className="w-full border border-border rounded-lg px-4 py-3.5 text-sm text-text-primary focus:outline-none focus:border-gold transition-colors bg-background"
                      />
                    </div>
                    <div>
                      <label htmlFor="contato-email" className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wide">E-mail</label>
                      <input
                        id="contato-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full border border-border rounded-lg px-4 py-3.5 text-sm text-text-primary focus:outline-none focus:border-gold transition-colors bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contato-telefone" className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wide">Telefone / WhatsApp *</label>
                      <input
                        id="contato-telefone"
                        name="telefone"
                        type="tel"
                        required
                        inputMode="tel"
                        pattern={PHONE_PATTERN}
                        title={PHONE_TITLE}
                        value={phone}
                        onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                        placeholder="(86) 9 9999-9999"
                        className="w-full border border-border rounded-lg px-4 py-3.5 text-sm text-text-primary focus:outline-none focus:border-gold transition-colors bg-background"
                      />
                    </div>
                    <div>
                      <label htmlFor="contato-servico" className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wide">Tipo de Serviço</label>
                      <select
                        id="contato-servico"
                        name="servico"
                        className="w-full border border-border rounded-lg px-4 py-3.5 text-sm text-text-primary focus:outline-none focus:border-gold transition-colors bg-background"
                      >
                        <option value="">Selecione um serviço</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="contato-mensagem" className="block text-xs font-semibold text-text-primary uppercase tracking-wide">Mensagem</label>
                      <span className={`text-xs ${charCount > 450 ? 'text-red-500' : 'text-text-secondary'}`}>{charCount}/500</span>
                    </div>
                    <textarea
                      id="contato-mensagem"
                      name="mensagem"
                      rows={4}
                      maxLength={500}
                      placeholder="Descreva sua situação: tipo de imóvel, localização, qual é a pendência documental..."
                      onChange={(e) => setCharCount(e.target.value.length)}
                      className="w-full border border-border rounded-lg px-4 py-3.5 text-sm text-text-primary focus:outline-none focus:border-gold transition-colors resize-none bg-background"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm">Ocorreu um erro ao enviar. Tente novamente.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-lg font-semibold text-base transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-2-line"></i>
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}