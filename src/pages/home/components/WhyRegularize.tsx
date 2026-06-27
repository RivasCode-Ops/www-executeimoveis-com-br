import AnimateIn from '../../../components/feature/AnimateIn';

const benefits = [
  { icon: 'ri-shield-check-line', title: 'Segurança jurídica total', desc: 'Imóvel regularizado protege você, sua família e seu patrimônio de disputas, fraudes e problemas legais.' },
  { icon: 'ri-bank-line', title: 'Acesso a crédito e financiamento', desc: 'Imóveis com documentação em dia são aceitos como garantia em financiamentos e empréstimos bancários.' },
  { icon: 'ri-line-chart-line', title: 'Valorização do imóvel', desc: 'Um imóvel regularizado vale significativamente mais no mercado do que um imóvel com pendências documentais.' },
  { icon: 'ri-hand-coin-line', title: 'Facilita venda e transferência', desc: 'Negociações rápidas e sem surpresas. Compradores exigem documentação regular antes de fechar qualquer negócio.' },
  { icon: 'ri-group-line', title: 'Protege herdeiros e família', desc: 'Evite conflitos futuros entre herdeiros. A regularização antecipada garante uma partilha tranquila e organizada.' },
  { icon: 'ri-file-certificate-line', title: 'Regularidade perante o governo', desc: 'Cumpra as obrigações legais, evite multas, embargos e problemas com órgãos públicos municipais e estaduais.' },
  { icon: 'ri-home-heart-line', title: 'Tranquilidade e paz de espírito', desc: 'Durma tranquilo sabendo que seu imóvel está em ordem. Elimine a insegurança de ter um bem sem escritura.' },
  { icon: 'ri-auction-line', title: 'Regularização extrajudicial ágil', desc: 'Em muitos casos, o processo pode ser feito em cartório, sem necessidade de ação judicial, com muito mais rapidez.' },
];

export default function WhyRegularize() {
  return (
    <section id="porque" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateIn direction="left" className="flex flex-col">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-[#5a6c7d] mb-4 block">
              POR QUE REGULARIZAR
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1a2b4a] leading-tight mb-6">
              Por Que Regularizar<br />
              <span className="text-[#5a6c7d] font-normal">Seu Imóvel?</span>
            </h2>
            <p className="text-[#5a6c7d] text-lg leading-relaxed mb-8">
              No Brasil, milhões de imóveis estão sem escritura, com matrícula desatualizada ou com alguma
              irregularidade documental. Isso representa um risco enorme para o proprietário e seus familiares.
            </p>
            <p className="text-[#5a6c7d] text-lg leading-relaxed mb-10">
              Regularizar é proteger o que é seu de verdade — garantindo que ninguém possa questionar
              a sua propriedade e que você possa usufruir de todos os benefícios legais e financeiros.
            </p>
            <div className="rounded-2xl overflow-hidden h-64">
              <img
                src="https://readdy.ai/api/search-image?query=Brazilian%20real%20estate%20property%20documents%20and%20registration%20papers%20on%20a%20clean%20white%20desk%2C%20professional%20legal%20paperwork%2C%20property%20deed%20and%20title%20documents%2C%20pen%20and%20glasses%2C%20minimalist%20office%20environment%2C%20neutral%20tones%2C%20organized%20and%20professional%20setting%2C%20natural%20light&width=700&height=400&seq=why001&orientation=landscape"
                alt="Regularização Imobiliária"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={120} className="flex flex-col">
            <div className="bg-[#f8f9fa] rounded-2xl p-10">
              <h3 className="text-lg font-bold text-[#1a2b4a] mb-8">Principais Benefícios da Regularização:</h3>
              <div className="flex flex-col gap-6">
                {benefits.map((b, idx) => (
                  <AnimateIn key={b.title} delay={idx * 60} direction="up" threshold={0.05}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-full bg-emerald-100">
                        <i className={`${b.icon} text-emerald-600 text-base`}></i>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a2b4a] text-sm mb-0.5">{b.title}</p>
                        <p className="text-[#5a6c7d] text-sm leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
