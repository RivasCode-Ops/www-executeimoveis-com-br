export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Início', id: 'inicio' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Como Funciona', id: 'como-funciona' },
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contato', id: 'contato' },
  ];

  const services = [
    'Regularização Urbana e Rural',
    'Inventário e Partilha',
    'Usucapião Judicial e Extrajudicial',
    'Retificação de Matrícula',
    'Adjudicação Compulsória',
    'Consultoria Documental',
  ];

  const contacts = [
    { icon: 'ri-map-pin-2-line', label: 'Localização', text: 'Picos – Piauí' },
    { icon: 'ri-phone-line', label: 'Telefone', text: '(86) 9 9463-3075' },
    { icon: 'ri-mail-line', label: 'E-mail', text: 'executeregularizacao@gmail.com' },
    { icon: 'ri-time-line', label: 'Horário', text: 'Seg–Sex: 8h às 18h' },
  ];

  return (
    <footer className="bg-text-primary relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pt-16 pb-12">
          <div className="lg:col-span-4">
            <div className="mb-6 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 inline-block">
              <img
                src="/images/logo.png"
                alt="Execute Imóveis"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-7 max-w-xs">
              Especialista em regularização e consultoria imobiliária no Piauí. Transformamos burocracia
              em segurança patrimonial para você e sua família.
            </p>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 mb-7">
              <i className="ri-verified-badge-line text-gold text-sm"></i>
              <span className="text-gold-light text-xs font-medium whitespace-nowrap">CRECI/PI 1638 • Rivaldo Alexandre</span>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: 'ri-whatsapp-line', href: 'https://wa.me/5586994633075', label: 'WhatsApp' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border border-white/15 rounded-full text-white/50 hover:text-gold hover:border-gold/40 transition-all cursor-pointer"
                >
                  <i className={`${s.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-[2px] mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gold inline-block"></span>
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/55 hover:text-gold text-sm transition-colors cursor-pointer text-left flex items-center gap-2 group"
                  >
                    <i className="ri-arrow-right-s-line text-xs text-gold/0 group-hover:text-gold transition-all"></i>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-[2px] mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gold inline-block"></span>
              Serviços
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('servicos')}
                    className="text-white/55 hover:text-gold text-sm transition-colors cursor-pointer text-left flex items-center gap-2 group"
                  >
                    <i className="ri-arrow-right-s-line text-xs text-gold/0 group-hover:text-gold transition-all"></i>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-[2px] mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gold inline-block"></span>
              Contato
            </h4>
            <ul className="space-y-5">
              {contacts.map((c) => (
                <li key={c.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold/10 border border-gold/15 flex-shrink-0 mt-0.5">
                    <i className={`${c.icon} text-gold text-sm`}></i>
                  </div>
                  <div>
                    <p className="text-white/35 text-xs uppercase tracking-wide mb-0.5">{c.label}</p>
                    <p className="text-white/75 text-sm">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/5586994633075"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-2 bg-success hover:bg-success/90 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all whitespace-nowrap cursor-pointer w-full justify-center"
            >
              <i className="ri-whatsapp-line text-base"></i>
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-sm">
            © {new Date().getFullYear()} Execute Imóveis • Todos os direitos reservados.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => scrollTo('privacidade')}
              className="text-white/45 hover:text-gold text-xs transition-colors cursor-pointer"
            >
              Política de privacidade
            </button>
            <p className="text-white/25 text-xs">
              Regularização imobiliária com segurança jurídica no Piauí
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}