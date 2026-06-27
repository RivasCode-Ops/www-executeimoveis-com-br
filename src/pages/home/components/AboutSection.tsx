import AnimateIn from '../../../components/feature/AnimateIn';

export default function AboutSection() {
  return (
    <section id="quem" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <AnimateIn direction="left" className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-72 h-96 rounded-2xl overflow-hidden border-4 border-gold/20">
                <img
                  src="/images/about.jpg"
                  alt="Rivaldo Alexandre - Consultor Imobiliário"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-gold rounded-xl px-5 py-4 text-text-primary text-center shadow-lg">
                <p className="text-3xl font-extrabold leading-none">10+</p>
                <p className="text-xs font-medium mt-1 whitespace-nowrap">Anos de Experiência</p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={150} className="lg:col-span-3">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-white/50 mb-4 block">
              SOBRE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
              Rivaldo Alexandre
            </h2>
            <p className="text-gold font-medium text-base mb-8">
              CRECI/PI 1638 • Consultor e Especialista em Regularização Imobiliária
            </p>
            <div className="w-16 h-0.5 bg-gold/30 mb-8"></div>

            <div className="space-y-5 text-white/80 text-lg leading-relaxed">
              <p>
                Com mais de <strong className="text-white">10 anos de atuação</strong> no mercado imobiliário
                piauiense, me especializei em resolver as situações mais complexas de regularização de
                imóveis urbanos e rurais em todo o estado do Piauí.
              </p>
              <p>
                Já auxiliei <strong className="text-white">centenas de famílias</strong> a garantirem a
                segurança jurídica de seus imóveis, desde a análise documental até o registro definitivo
                no cartório. Cada caso é tratado de forma personalizada, com transparência e dedicação.
              </p>
              <p>
                Minha missão é <strong className="text-white">descomplicar a burocracia</strong> e entregar
                a você a tranquilidade de ter seu patrimônio protegido por lei.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              {[
                { icon: 'ri-award-line', label: 'CRECI Ativo' },
                { icon: 'ri-verified-badge-line', label: 'Especialista em Regularização' },
                { icon: 'ri-map-pin-line', label: 'Atua em todo o Piauí' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <i className={`${c.icon} text-gold text-sm`}></i>
                  <span className="text-white text-sm font-medium whitespace-nowrap">{c.label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/5586994633075"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 bg-white text-text-primary px-7 py-3.5 rounded-lg font-semibold text-base hover:bg-white/90 transition-all whitespace-nowrap cursor-pointer"
            >
              <i className="ri-whatsapp-line text-success text-lg"></i>
              Fale Comigo Agora
            </a>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}