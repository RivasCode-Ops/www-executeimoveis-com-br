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
            {/* Painel de cobertura: radar com base em Picos */}
            <div className="relative rounded-2xl overflow-hidden h-80 lg:h-96 bg-[#0B1120] border border-white/10">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
                  backgroundSize: '22px 22px',
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(200,169,110,0.10),transparent)]" />

              {/* Círculos concêntricos */}
              {[140, 240, 340, 440].map((size) => (
                <div
                  key={size}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15"
                  style={{ width: size, height: size }}
                />
              ))}

              {/* Pontos de cidades ao redor da base */}
              {[
                { top: '18%', left: '30%' },
                { top: '26%', left: '64%' },
                { top: '42%', left: '18%' },
                { top: '58%', left: '76%' },
                { top: '72%', left: '34%' },
                { top: '66%', left: '56%' },
              ].map((pos, i) => (
                <span
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gold/50"
                  style={pos}
                  aria-hidden="true"
                />
              ))}

              {/* Base: Picos */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="absolute w-16 h-16 rounded-full bg-gold/20 animate-ping" aria-hidden="true" />
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gold shadow-[0_0_40px_rgba(200,169,110,0.45)]">
                  <i className="ri-map-pin-2-fill text-[#0B1120] text-xl"></i>
                </div>
                <span className="mt-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-white text-xs font-semibold tracking-wide whitespace-nowrap">
                  Base em Picos – PI
                </span>
              </div>

              {/* Selo inferior */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0B1120]/80 backdrop-blur-sm border border-gold/20 rounded-full px-5 py-2 whitespace-nowrap">
                <i className="ri-road-map-line text-gold text-sm"></i>
                <span className="text-white/85 text-xs font-medium">Suporte presencial e remoto nos 224 municípios do Piauí</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}