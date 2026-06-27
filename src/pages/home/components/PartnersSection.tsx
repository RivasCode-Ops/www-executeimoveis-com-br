import AnimateIn from '../../../components/feature/AnimateIn';

const institutions = [
  {
    icon: 'ri-scales-3-line',
    name: 'OAB – PI',
    label: 'Ordem dos Advogados do Brasil',
    badge: 'Regulamentado',
    url: 'https://www.oabpi.org.br',
  },
  {
    icon: 'ri-medal-2-line',
    name: 'CRECI – PI',
    label: 'Conselho Regional de Corretores de Imóveis',
    badge: 'Credenciado',
    url: 'https://www.creci-pi.gov.br',
  },
  {
    icon: 'ri-government-line',
    name: 'INCRA',
    label: 'Instituto Nacional de Colonização e Reforma Agrária',
    badge: 'Habilitado',
    url: 'https://www.gov.br/incra/pt-br',
  },
  {
    icon: 'ri-building-4-line',
    name: 'TCE – PI',
    label: 'Tribunal de Contas do Estado do Piauí',
    badge: 'Reconhecido',
    url: 'https://www.tce.pi.gov.br',
  },
  {
    icon: 'ri-bank-line',
    name: 'DETRAN – PI',
    label: 'Departamento Estadual de Trânsito do Piauí',
    badge: 'Parceiro',
    url: 'https://www.detran.pi.gov.br',
  },
  {
    icon: 'ri-map-2-line',
    name: 'SEPLAN – PI',
    label: 'Secretaria de Planejamento do Piauí',
    badge: 'Integrado',
    url: 'https://www.seplan.pi.gov.br',
  },
];

const cartorios = [
  {
    icon: 'ri-file-paper-2-line',
    name: '1º Ofício – Notas e Registro de Imóveis',
    address: 'Av. Getúlio Vargas, 549, Centro',
    phone: '(89) 3422-1242',
    specialty: 'Notas, Imóveis, Títulos e PJ',
  },
  {
    icon: 'ri-home-office-line',
    name: '2º Ofício – Notas e Registro de Imóveis',
    address: 'Av. Getúlio Vargas, 549, Centro',
    phone: '(89) 3422-5959',
    specialty: 'Notas, Imóveis e Títulos',
  },
  {
    icon: 'ri-quill-pen-line',
    name: '3º Ofício – Registro Civil',
    address: 'Rua Santo Antônio, 269, Centro',
    phone: '(89) 3422-2905',
    specialty: 'Registro Civil e Notas',
  },
  {
    icon: 'ri-archive-2-line',
    name: '4º Ofício – Registro Civil',
    address: 'Trav. Firmino Rodrigues, 311, Centro',
    phone: '(89) 3422-1041',
    specialty: 'Registro Civil, Notas e Tutelas',
  },
];

export default function PartnersSection() {
  return (
    <section id="parceiros" className="py-28 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <AnimateIn>
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-[#5a6c7d] mb-4 block">
              AUTORIDADE & CONFIANÇA
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1a2b4a] mb-5 leading-tight">
              Parceiros e Cartórios{' '}
              <span className="text-emerald-500">de Confiança</span>
            </h2>
            <p className="text-[#5a6c7d] text-lg max-w-2xl mx-auto leading-relaxed">
              Atuamos em estreita colaboração com os principais órgãos reguladores e
              cartórios do Piauí, garantindo processos 100% seguros e reconhecidos juridicamente.
            </p>
          </div>
        </AnimateIn>

        {/* Institutions Grid */}
        <div className="mb-20">
          <AnimateIn delay={60}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-xs font-bold tracking-[3px] uppercase text-[#5a6c7d] px-4">
                ÓRGÃOS REGULADORES E INSTITUIÇÕES
              </span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {institutions.map((item, idx) => (
              <AnimateIn key={item.name} delay={idx * 80} direction="up">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:border-[#1a2b4a]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full no-underline"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#1a2b4a]/6 mb-4 group-hover:bg-[#1a2b4a] transition-colors duration-300">
                    <i className={`${item.icon} text-2xl text-[#1a2b4a] group-hover:text-white transition-colors duration-300`}></i>
                  </div>
                  <p className="text-sm font-extrabold text-[#1a2b4a] leading-tight mb-1">{item.name}</p>
                  <p className="text-[10px] text-[#5a6c7d] leading-snug mb-3">{item.label}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full mb-3">
                    {item.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[#1a2b4a]/50 group-hover:text-[#1a2b4a] transition-colors mt-auto">
                    <i className="ri-external-link-line"></i>
                    Acessar site
                  </span>
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Cartorios */}
        <div>
          <AnimateIn delay={60}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-xs font-bold tracking-[3px] uppercase text-[#5a6c7d] px-4">
                CARTÓRIOS PARCEIROS NO PIAUÍ
              </span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cartorios.map((cartorio, idx) => (
              <AnimateIn key={cartorio.name} delay={idx * 90} direction="up">
                <div className="rounded-2xl p-6 flex flex-col gap-3 border bg-[#1a2b4a] border-[#1a2b4a] transition-all duration-300 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/10">
                      <i className={`${cartorio.icon} text-lg text-emerald-400`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold leading-snug mb-1 text-white">
                        {cartorio.name}
                      </p>
                      <div className="flex items-start gap-1.5 mb-1">
                        <i className="ri-map-pin-2-line text-xs mt-0.5 flex-shrink-0 text-white/50"></i>
                        <span className="text-xs leading-snug text-white/50">
                          {cartorio.address} — Picos/PI
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="ri-phone-line text-xs flex-shrink-0 text-white/50"></i>
                        <span className="text-xs text-white/50">{cartorio.phone}</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold rounded-full px-2.5 py-0.5 w-fit bg-emerald-500/20 text-emerald-300">
                    <i className="ri-shield-check-line"></i>
                    {cartorio.specialty}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <AnimateIn delay={200} direction="up">
          <div className="mt-16 rounded-2xl bg-[#1a2b4a] px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {[
                { icon: 'ri-verified-badge-line', value: '100%', label: 'Processos regularizados juridicamente' },
                { icon: 'ri-time-line', value: '+8 anos', label: 'de experiência em regularização no Piauí' },
                { icon: 'ri-shake-hands-line', value: '+30', label: 'cartórios e órgãos parceiros ativos' },
              ].map((stat) => (
                <div key={stat.value} className="flex items-center gap-3 text-center md:text-left">
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-xl bg-white/8">
                    <i className={`${stat.icon} text-xl text-emerald-400`}></i>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-white leading-none">{stat.value}</p>
                    <p className="text-xs text-white/55 mt-0.5 max-w-[160px] leading-snug">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/5586994633075"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap cursor-pointer flex-shrink-0"
            >
              <i className="ri-whatsapp-line text-lg"></i>
              Consulta Gratuita
            </a>
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}
