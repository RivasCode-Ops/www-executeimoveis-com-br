import AnimateIn from '../../../components/feature/AnimateIn';

const stats = [
  { value: '500+', label: 'imóveis regularizados', icon: 'ri-home-smile-line' },
  { value: '10+', label: 'anos de experiência', icon: 'ri-time-line' },
  { value: '98%', label: 'taxa de sucesso', icon: 'ri-bar-chart-grouped-line' },
  { value: '30+', label: 'cartórios e órgãos parceiros', icon: 'ri-building-line' },
];

const testimonials = [
  {
    name: 'Maria José S.',
    location: 'Picos, PI',
    text: 'Minha casa tinha mais de 20 anos sem escritura. A Execute resolveu tudo em menos de 6 meses. Profissionalismo impecável.',
    service: 'Regularização Urbana',
  },
  {
    name: 'Antônio Ferreira',
    location: 'Oeiras, PI',
    text: 'Inventário de um terreno rural que parecia impossível. Rivaldo conduziu todo o processo com clareza e paciência. Recomendo demais.',
    service: 'Inventário e Partilha',
  },
  {
    name: 'Sônia Lima',
    location: 'Teresina, PI',
    text: 'Fiz a consultoria antes de comprar um imóvel. Descobriu uma pendência que eu jamais teria visto sozinha. Economizou minha vida.',
    service: 'Consultoria Documental',
  },
];

export default function AuthoritySection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-text-secondary mb-4 block">
              CONFIANÇA E RESULTADOS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
              Autoridade comprovada em regularização imobiliária
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Números e depoimentos que demonstram nossa capacidade de resolver casos complexos com segurança.
            </p>
          </div>
        </AnimateIn>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((stat, idx) => (
            <AnimateIn key={stat.label} delay={idx * 80} direction="up">
              <div className="bg-surface rounded-2xl p-8 text-center border border-border/60 shadow-[0_2px_16px_-2px_rgba(15,23,42,0.05)] hover:border-gold/25 hover:shadow-[0_8px_28px_-4px_rgba(15,23,42,0.09)] transition-all">
                <div className="w-12 h-12 flex items-center justify-center mx-auto rounded-xl bg-gold/8 border border-gold/10 mb-4">
                  <i className={`${stat.icon} text-2xl text-gold`}></i>
                </div>
                <p className="text-3xl font-extrabold text-text-primary mb-1">{stat.value}</p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Testimonials */}
        <AnimateIn delay={200}>
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-xs font-bold tracking-[3px] uppercase text-text-secondary px-4">
              DEPOIMENTOS DE CLIENTES
            </span>
            <div className="h-px flex-1 bg-border"></div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <AnimateIn key={t.name} delay={idx * 100} direction="up">
              <div className="bg-surface rounded-2xl p-8 border border-border/60 shadow-[0_2px_16px_-2px_rgba(15,23,42,0.05)] hover:border-gold/25 hover:shadow-[0_8px_28px_-4px_rgba(15,23,42,0.09)] transition-all h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className="ri-star-fill text-gold text-sm"></i>
                  ))}
                </div>
                <p className="text-text-primary text-sm leading-relaxed mb-6 flex-grow">
                  "{t.text}"
                </p>
                <div className="pt-5 border-t border-border">
                  <p className="font-bold text-text-primary text-sm">{t.name}</p>
                  <p className="text-text-secondary text-xs mt-0.5">{t.location} — {t.service}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}