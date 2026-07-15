import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#0F172A] overflow-hidden">
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10rem] md:text-[16rem] font-extrabold text-white/[0.04] select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        404
      </span>

      <div className="relative z-10 max-w-md">
        <img
          src="/images/logo.png"
          alt="Execute Imóveis"
          className="h-12 w-auto object-contain mx-auto mb-10 brightness-110"
        />

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
          Página não encontrada
        </h1>
        <p className="text-white/60 text-base leading-relaxed mb-10">
          O endereço que você acessou não existe ou foi movido. Que tal voltar
          para a página inicial ou falar direto com a gente?
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap"
          >
            <i className="ri-home-4-line text-base"></i>
            Voltar ao início
          </Link>
          <a
            href="https://wa.me/5586994633075"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/25 hover:border-white/50 text-white hover:bg-white/[0.05] px-7 py-3.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap"
          >
            <i className="ri-whatsapp-line text-base"></i>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
