import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = [
    { label: 'Início', id: 'inicio' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Como Funciona', id: 'como-funciona' },
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contato', id: 'contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); scrollTo('inicio'); }}
          className="flex items-center cursor-pointer group"
        >
          <div
            className={`transition-all duration-500 ${
              scrolled
                ? 'bg-surface border border-gold/20 rounded-xl px-2.5 py-1.5 shadow-sm'
                : ''
            }`}
          >
            <img
              src="/images/logo.png"
              alt="Execute Imóveis"
              className={`object-contain transition-all duration-500 ${
                scrolled
                  ? 'h-8 brightness-100'
                  : 'h-9 brightness-110 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]'
              }`}
            />
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer tracking-wide ${
                scrolled
                  ? 'text-text-secondary hover:text-primary'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo('contato')}
          className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer tracking-wide ${
            scrolled
              ? 'bg-primary text-white hover:bg-primary-hover shadow-sm'
              : 'bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/18 hover:border-white/40'
          }`}
        >
          Analisar meu caso
        </button>

        <button
          className="lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i
            className={`text-2xl ${scrolled ? 'text-text-primary' : 'text-white'} ${
              menuOpen ? 'ri-close-line' : 'ri-menu-line'
            }`}
          ></i>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-border px-6 py-5 flex flex-col gap-4 shadow-lg">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-left text-text-primary font-medium text-sm py-1 cursor-pointer tracking-wide"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contato')}
            className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer mt-2"
          >
            Analisar meu caso
          </button>
        </div>
      )}
    </header>
  );
}