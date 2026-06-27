export default function CTAFinal() {
  return (
    <section className="py-24 bg-text-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C8A96E 0, #C8A96E 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div className="w-12 h-0.5 bg-gold mx-auto mb-8"></div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
          Descubra o caminho para regularizar seu imóvel
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          A primeira análise do seu caso é gratuita. Envie seus documentos e receba um diagnóstico claro com as melhores opções para regularizar seu patrimônio.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-text-primary px-8 py-4 rounded-lg font-semibold text-base transition-all whitespace-nowrap cursor-pointer"
          >
            Solicitar análise
            <i className="ri-arrow-right-line"></i>
          </button>
          <a
            href="https://wa.me/5586994633075"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-gold/40 hover:border-gold text-white hover:bg-gold/10 px-8 py-4 rounded-lg font-semibold text-base transition-all whitespace-nowrap cursor-pointer"
          >
            <i className="ri-whatsapp-line text-lg"></i>
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}