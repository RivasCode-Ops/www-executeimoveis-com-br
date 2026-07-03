const services = [
  {
    icon: 'ri-building-line',
    title: 'Regularização Urbana e Rural',
    desc: 'Regularizamos imóveis urbanos e rurais em todo o Piauí, com suporte junto ao INCRA quando necessário.',
  },
  {
    icon: 'ri-file-search-line',
    title: 'Usucapião Judicial e Extrajudicial',
    desc: 'Processo de usucapião pela via judicial ou extrajudicial (em cartório), mais rápida e econômica.',
  },
  {
    icon: 'ri-file-list-3-line',
    title: 'Inventário e Partilha',
    desc: 'Assessoria completa em inventário e partilha de bens imóveis, com agilidade e tranquilidade para os herdeiros.',
  },
  {
    icon: 'ri-file-edit-line',
    title: 'Retificação de Matrícula',
    desc: 'Correção de área, metragem, confrontações e dados cadastrais na matrícula do imóvel.',
  },
  {
    icon: 'ri-key-line',
    title: 'Adjudicação Compulsória',
    desc: 'Regularização forçada da transferência de propriedade quando o vendedor se recusa a formalizar a escritura.',
  },
  {
    icon: 'ri-contract-line',
    title: 'Consultoria para Compra e Venda',
    desc: 'Análise de documentos, due diligence imobiliária e assessoria completa em transações de compra e venda.',
  },
]

export default function Servicos() {
  return (
    <section id="servicos" className="py-24 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-5">
            Soluções Completas em <span className="text-gold">Regularização Imobiliária</span>
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Da análise documental ao registro definitivo, oferecemos todo o suporte
            jurídico e administrativo para regularizar o seu imóvel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              className="group relative bg-surface border border-border rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_8px_28px_-4px_rgba(15,23,42,0.09)] hover:border-gold/25"
            >
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                <i className={`${svc.icon} text-2xl text-primary group-hover:text-gold transition-colors`}></i>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{svc.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm">{svc.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/30 via-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
