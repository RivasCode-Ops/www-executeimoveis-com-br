import AnimateIn from '../../../components/feature/AnimateIn';

export default function CoverageSection() {
  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateIn direction="left">
            <div>
              <span className="text-xs font-semibold tracking-[3px] uppercase text-white/60 mb-4 block">
                ÁREA DE ATUAÇÃO
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
                Atendimento em Picos e em todo o Piauí
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Nossa base operacional fica em Picos, mas atuamos em todo o estado do Piauí. Desde Teresina até os municípios mais distantes, oferecemos suporte presencial e remoto conforme a necessidade de cada caso.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  'Picos',
                  'Teresina',
                  'Oeiras',
                  'Floriano',
                  'Parnaíba',
                  'Campo Maior',
                  'São Raimundo Nonato',
                ].map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 bg-white/10 border border-gold/20 rounded-full px-4 py-2 text-white text-sm font-medium"
                  >
                    <i className="ri-map-pin-2-line text-gold text-xs"></i>
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={150}>
            <div className="rounded-2xl overflow-hidden h-80 lg:h-96">
              <img
                src="/images/hero.jpg"
                alt="Piauí – área de atuação"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}