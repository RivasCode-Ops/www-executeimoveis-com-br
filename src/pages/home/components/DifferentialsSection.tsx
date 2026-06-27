import AnimateIn from '../../../components/feature/AnimateIn';

const differentials = [
  {
    icon: 'ri-user-star-line',
    title: 'Atendimento especializado',
    desc: 'Cada caso é analisado individualmente por um profissional com mais de 10 anos de experiência em regularização imobiliária no Piauí.',
  },
  {
    icon: 'ri-map-pin-range-line',
    title: 'Atuação em imóveis urbanos e rurais',
    desc: 'Regularizamos propriedades na cidade e no campo, incluindo regularização junto ao INCRA quando necessário.',
  },
  {
    icon: 'ri-stack-line',
    title: 'Acompanhamento técnico e documental',
    desc: 'Acompanhamos cada etapa do processo — cartórios, órgãos públicos e judicial — com relatórios claros e transparentes.',
  },
  {
    icon: 'ri-translate-2',
    title: 'Linguagem clara',
    desc: 'Explicamos cada passo sem juridiquês pesado. Você entende exatamente o que está acontecendo com seu imóvel.',
  },
  {
    icon: 'ri-medal-line',
    title: 'Experiência de mercado',
    desc: 'Centenas de imóveis regularizados em todo o Piauí, com processos concluídos em prazos competitivos.',
  },
  {
    icon: 'ri-shield-star-line',
    title: 'Foco em segurança e agilidade',
    desc: 'Nosso objetivo é proteger seu patrimônio com a maior rapidez possível, sem abrir mão da segurança jurídica.',
  },
];

export default function DifferentialsSection() {
  return (
    <section id="diferenciais" className="py-24 bg-text-primary relative overflow-hidden">
      {/* Textura sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-gold/60 mb-4 block">
              POR QUE ESCOLHER A EXECUTE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Diferenciais que fazem a diferença
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Mais do que um serviço, oferecemos tranquilidade. Conheça o que nos diferencia no mercado de regularização imobiliária.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {differentials.map((item, idx) => (
            <AnimateIn key={item.title} delay={idx * 80} direction="up">
              <div className="bg-white/[0.03] rounded-2xl p-8 border border-white/[0.08] hover:border-gold/30 hover:bg-white/[0.05] hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.25)] transition-all duration-300 group h-full relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/15 mb-5 group-hover:bg-gold/15 transition-colors">
                  <i className={`${item.icon} text-2xl text-gold`}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}