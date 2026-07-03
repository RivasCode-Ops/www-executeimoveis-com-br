import { useState } from 'react'

const contactInfo = [
  { icon: 'ri-whatsapp-line', label: 'WhatsApp', value: '(86) 99463-3075', href: 'https://wa.me/5586994633075' },
  { icon: 'ri-mail-line', label: 'E-mail', value: 'contato@executeimoveis.com.br', href: 'mailto:contato@executeimoveis.com.br' },
  { icon: 'ri-map-pin-line', label: 'Base', value: 'Picos, PI' },
  { icon: 'ri-time-line', label: 'Atendimento', value: 'Seg–Sex, 08h–18h' },
]

const initialForm = { nome: '', email: '', telefone: '', mensagem: '' }

export default function Contato() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Olá, me chamo ${form.nome}.%0A${form.mensagem}%0A%0ATelefone: ${form.telefone}%0AE-mail: ${form.email}`
    window.open(`https://wa.me/5586994633075?text=${text}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contato" className="py-24 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-4">
            Contato
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-5">
            Vamos <span className="text-gold">Conversar</span>
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Solicite uma consulta inicial gratuita e descubra como podemos ajudar
            a regularizar o seu imóvel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-background border border-border rounded-2xl p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <input
                type="tel"
                name="telefone"
                placeholder="Seu telefone"
                required
                value={form.telefone}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/50 transition-colors mb-4"
              />
              <textarea
                name="mensagem"
                placeholder="Como podemos ajudar?"
                rows={4}
                required
                value={form.mensagem}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-gold/50 transition-colors resize-none mb-5"
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all cursor-pointer border-none flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>
                    <i className="ri-check-line"></i>
                    Mensagem Enviada!
                  </>
                ) : (
                  <>
                    <i className="ri-whatsapp-line"></i>
                    Enviar pelo WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-background border border-border rounded-2xl p-6 lg:p-8 h-full">
              <h3 className="font-bold text-text-primary mb-6">Informações de Contato</h3>
              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <div key={i}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 group no-underline"
                      >
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors">
                          <i className={`${item.icon} text-primary group-hover:text-gold transition-colors`}></i>
                        </div>
                        <div>
                          <p className="text-xs text-text-secondary/60 font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                          <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className={`${item.icon} text-primary`}></i>
                        </div>
                        <div>
                          <p className="text-xs text-text-secondary/60 font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                          <p className="text-sm font-semibold text-text-primary">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href="https://wa.me/5586994633075"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-50 border border-emerald-100 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-100 transition-all no-underline"
                >
                  <i className="ri-whatsapp-line text-lg"></i>
                  Fale Direto pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
