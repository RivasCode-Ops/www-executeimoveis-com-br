export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0a1020]/30 to-text-primary">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 -left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 right-14 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium tracking-wider uppercase text-emerald-300">
              Consulta Inicial Gratuita
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-[1.12] tracking-tight text-white mb-6">
            Regularização Imobiliária
            <br />
            <span className="text-gold-light">com Segurança Jurídica</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mb-10">
            Especialistas em regularização de imóveis urbanos e rurais em Picos e todo o Piauí.
            Usucapião, inventário, retificação de matrícula e consultoria personalizada.
            <strong className="text-white/90"> Mais de 500 imóveis regularizados.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-4">
            <a
              href="#contato"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold text-[#1a2b4a] font-bold rounded-xl hover:bg-gold-dark transition-all no-underline shadow-[0_32px_80px_-20px_rgba(0,0,0,0.3)]"
            >
              <i className="ri-whatsapp-line text-xl"></i>
              Fale Conosco
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all no-underline"
            >
              Nossos Serviços
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#servicos" className="text-white/40 hover:text-white/70 transition-colors">
          <i className="ri-arrow-down-line text-2xl animate-pulse"></i>
        </a>
      </div>
    </section>
  )
}
