import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => setMobileOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="ri-home-4-line text-white text-sm"></i>
            </div>
            <span className={`font-bold text-lg tracking-tight ${scrolled ? 'text-text-primary' : 'text-white'}`}>
              Execute <span className="text-gold">Imóveis</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  scrolled
                    ? 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className={`ml-3 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all no-underline ${
                scrolled
                  ? 'bg-primary text-white hover:bg-primary-hover'
                  : 'bg-gold text-[#1a2b4a] hover:bg-gold-dark'
              }`}
            >
              Consultoria Gratuita
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-text-primary hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Abrir menu"
          >
            <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-white border-t border-border px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleClick}
              className="block px-4 py-2.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 font-medium text-sm no-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={handleClick}
            className="block px-4 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm text-center no-underline hover:bg-primary-hover transition-colors"
          >
            Consultoria Gratuita
          </a>
        </div>
      </div>
    </nav>
  )
}
