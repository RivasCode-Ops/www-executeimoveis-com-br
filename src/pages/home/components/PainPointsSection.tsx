import AnimateIn from '../../../components/feature/AnimateIn';

const painPoints = [
  {
    icon: 'ri-file-damage-line',
    title: 'Imóvel sem escritura',
    desc: 'Compra informal, loteamento irregular ou documentação nunca finalizada.',
  },
  {
    icon: 'ri-user-unfollow-line',
    title: 'Inventário travado',
    desc: 'Herança emperrada por desentendimento entre herdeiros ou falta de registro.',
  },
  {
    icon: 'ri-draft-line',
    title: 'Matrícula desatualizada',
    desc: 'Informações do cartório não refletem a situação real do imóvel.',
  },
  {
    icon: 'ri-file-paper-2-line',
    title: 'Compra só por contrato',
    desc: 'Posse de anos sem escritura definitiva, gerando risco jurídico constante.',
  },
  {
    icon: 'ri-time-line',
    title: 'Posse antiga sem regularização',
    desc: 'Morador de longa data sem reconhecimento legal da propriedade.',
  },
  {
    icon: 'ri-auction-line',
    title: 'Pendências em cartório',
    desc: 'Protestos, ônus, dívidas ou registros incompletos bloqueando negociações.',
  },
];

export default function PainPointsSection() {
  return (
    <section id="pendencias" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-text-secondary mb-4 block">
              DIAGNÓSTICO
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
              Seu imóvel tem alguma dessas pendências?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Essas são as situações mais comuns que resolvemos com segurança e clareza.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item, idx) => (
            <AnimateIn key={item.title} delay={idx * 80} direction="up">
              <div className="bg-surface rounded-xl p-7 border border-border/60 shadow-[0_2px_16px_-2px_rgba(15,23,42,0.05)] hover:border-gold/25 hover:shadow-[0_8px_28px_-4px_rgba(15,23,42,0.09)] transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gold/8 border border-gold/10 mb-5 group-hover:bg-gold/12 transition-colors">
                  <i className={`${item.icon} text-2xl text-gold`}></i>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={300}>
          <div className="mt-12 text-center">
            <button
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-lg font-semibold text-sm transition-all whitespace-nowrap cursor-pointer"
            >
              Solicitar diagnóstico gratuito
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}