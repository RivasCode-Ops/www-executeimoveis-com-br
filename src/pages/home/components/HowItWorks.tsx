import AnimateIn from '../../../components/feature/AnimateIn';

const steps = [
  {
    number: '01',
    icon: 'ri-message-3-line',
    title: 'Você envia seu caso',
    desc: 'Entre em contato via formulário ou WhatsApp. Conte sua situação e envie os documentos que tiver disponíveis.',
  },
  {
    number: '02',
    icon: 'ri-archive-line',
    title: 'Analisamos documentos e pendências',
    desc: 'Fazemos um diagnóstico completo da situação do seu imóvel, identificando todos os obstáculos e oportunidades.',
  },
  {
    number: '03',
    icon: 'ri-lightbulb-flash-line',
    title: 'Definimos a melhor estratégia',
    desc: 'Apresentamos um plano de ação claro, com prazos, etapas e custos estimados para a regularização.',
  },
  {
    number: '04',
    icon: 'ri-settings-3-line',
    title: 'Cuidamos do processo e acompanhamentos',
    desc: 'Conduzimos todo o trâmite junto a cartórios, órgãos públicos e, se necessário, via judicial. Você acompanha cada etapa.',
  },
  {
    number: '05',
    icon: 'ri-shield-check-line',
    title: 'Você avança com mais segurança documental',
    desc: 'Imóvel regularizado, documentação em ordem e patrimônio protegido com segurança jurídica completa.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-text-secondary mb-4 block">
              PROCESSO
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
              Como funciona
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Um processo simples, transparente e sem surpresas. Você acompanha cada etapa e sabe exatamente o que está acontecendo com o seu imóvel.
            </p>
          </div>
        </AnimateIn>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gold/10 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <AnimateIn key={step.number} delay={idx * 110} direction="up" className="relative z-10">
                <div className="flex flex-col items-center text-center group h-full">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-border bg-white group-hover:border-gold group-hover:bg-gold transition-colors duration-300 mb-6 flex-shrink-0 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)]">
                    <span className="text-2xl font-extrabold text-text-primary group-hover:text-text-primary transition-colors">
                      {step.number}
                    </span>
                  </div>
                  <div className="bg-surface rounded-2xl p-6 w-full border border-border/60 shadow-[0_2px_16px_-2px_rgba(15,23,42,0.05)] group-hover:border-gold/20 group-hover:shadow-[0_8px_28px_-4px_rgba(15,23,42,0.09)] transition-all">
                    <div className="w-10 h-10 flex items-center justify-center mx-auto mb-4 text-gold">
                      <i className={`${step.icon} text-xl`}></i>
                    </div>
                    <h3 className="font-bold text-text-primary text-base mb-3">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden w-0.5 h-8 bg-gold/20 my-2"></div>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}