import AnimateIn from '../../../components/feature/AnimateIn';

const services = [
  {
    icon: 'ri-building-2-line',
    title: 'Regularização imobiliária urbana e rural',
    desc: 'Regularizamos imóveis com escritura, registro em cartório e documentação junto aos órgãos competentes, tanto na cidade quanto no campo.',
    contactValue: 'Regularização de Imóvel Urbano',
  },
  {
    icon: 'ri-scales-3-line',
    title: 'Inventário e partilha',
    desc: 'Conduzimos inventários judiciais e extrajudiciais com agilidade, respeitando a lei e protegendo os direitos de todos os herdeiros.',
    contactValue: 'Inventário e Partilha',
  },
  {
    icon: 'ri-auction-line',
    title: 'Usucapião judicial e extrajudicial',
    desc: 'Avaliamos o tempo de posse e escolhemos a modalidade mais adequada para transformar seu direito de posse em propriedade registrada.',
    contactValue: 'Usucapião Judicial',
  },
  {
    icon: 'ri-file-edit-line',
    title: 'Retificação de matrícula',
    desc: 'Corrigimos dados incorretos no registro de imóveis — área, localização, confrontantes e informações cadastrais desatualizadas.',
    contactValue: 'Retificação de Matrícula',
  },
  {
    icon: 'ri-home-gear-line',
    title: 'Adjudicação compulsória',
    desc: 'Quando o vendedor não cumpre o contrato, auxiliamos na transferência judicial do imóvel para garantir seu direito de propriedade.',
    contactValue: 'Adjudicação Compulsória',
  },
  {
    icon: 'ri-search-eye-line',
    title: 'Consultoria documental para compra e venda',
    desc: 'Analisamos toda a documentação antes da negociação para evitar surpresas e proteger seu investimento imobiliário.',
    contactValue: 'Consultoria para Compra e Venda',
  },
];

function scrollToServiceContact(serviceValue: string) {
  const contactSection = document.getElementById('contato');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const selectEl = contactSection.querySelector<HTMLSelectElement>('select[name="servico"]');
      if (selectEl) {
        selectEl.value = serviceValue;
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 700);
  }
}

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-24 bg-primary-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-text-secondary mb-4 block">
              NOSSOS SERVIÇOS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
              Soluções completas em regularização imobiliária
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Cada caso é único. Nossa equipe analisa sua situação e define a melhor estratégia para resolver sua pendência documental.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, idx) => (
            <AnimateIn key={service.title} delay={idx * 90} direction="up">
              <div className="bg-surface rounded-2xl p-8 group transition-all duration-300 hover:-translate-y-1 border border-border/60 shadow-[0_2px_16px_-2px_rgba(15,23,42,0.05)] hover:border-gold/25 hover:shadow-[0_8px_28px_-4px_rgba(15,23,42,0.09)] h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gold/8 border border-gold/10 mb-6 group-hover:bg-gold/12 transition-colors">
                  <i className={`${service.icon} text-2xl text-gold`}></i>
                </div>
                <h3 className="text-xl font-bold text-text-primary leading-snug mb-3">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>
                <button
                  type="button"
                  onClick={() => scrollToServiceContact(service.contactValue)}
                  className="flex items-center gap-1.5 text-gold text-sm font-semibold tracking-wide group-hover:gap-2.5 transition-all cursor-pointer mt-auto w-fit bg-transparent border-none p-0 whitespace-nowrap"
                >
                  <span>Solicitar serviço</span>
                  <i className="ri-arrow-right-line text-sm"></i>
                </button>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}