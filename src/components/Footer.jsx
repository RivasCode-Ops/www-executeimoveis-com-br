export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="ri-home-4-line text-white text-sm"></i>
              </div>
              <span className="font-bold text-lg text-white">
                Execute <span className="text-gold">Imóveis</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Especialistas em regularização imobiliária em Picos e todo o Piauí.
              Segurança jurídica para o seu imóvel.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Início', href: '#hero' },
                { label: 'Serviços', href: '#servicos' },
                { label: 'Sobre', href: '#sobre' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contato', href: '#contato' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5586994633075"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors no-underline"
                >
                  <i className="ri-whatsapp-line"></i>
                  (86) 99463-3075
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@executeimoveis.com.br"
                  className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors no-underline"
                >
                  <i className="ri-mail-line"></i>
                  contato@executeimoveis.com.br
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <i className="ri-map-pin-line"></i>
                Picos, PI
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs">
            &copy; {year} Execute Imóveis. Todos os direitos reservados.
          </p>
          <p className="text-white/35 text-xs">
            CRECI/PI 1638 &mdash; Rivaldo Alexandre
          </p>
        </div>
      </div>
    </footer>
  )
}
