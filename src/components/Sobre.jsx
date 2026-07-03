export default function Sobre() {
  return (
    <section id="sobre" className="py-24 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-4">
              Sobre Nós
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-6">
              Executando soluções imobiliárias <span className="text-gold">com excelência</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              A <strong className="text-text-primary">Execute Imóveis</strong> nasceu da necessidade de oferecer
              um serviço especializado em regularização imobiliária em Picos e em todo o estado do Piauí.
              Sabemos que a falta de documentação adequada pode impedir a venda, o financiamento e até
              gerar disputas judiciais. Por isso, atuamos com rigor técnico e compromisso com o resultado.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Já ajudamos centenas de famílias e empresas a regularizarem seus imóveis, transformando
              situações de incerteza em segurança jurídica. Cada caso é tratado de forma única, com
              diagnóstico gratuito e plano de ação personalizado.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-light rounded-2xl p-6 text-center">
                <span className="block text-3xl font-black text-primary mb-1">500+</span>
                <span className="text-sm text-text-secondary">Imóveis Regularizados</span>
              </div>
              <div className="bg-primary-light rounded-2xl p-6 text-center">
                <span className="block text-3xl font-black text-primary mb-1">98%</span>
                <span className="text-sm text-text-secondary">Casos de Sucesso</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-8 lg:p-10 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]">
                <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-team-line text-3xl text-gold-light"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Rivaldo Alexandre</h3>
                <p className="text-white/75 leading-relaxed mb-4">
                  Consultor e Especialista em Regularização Imobiliária
                </p>
                <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                  <i className="ri-award-line"></i>
                  <span>CRECI/PI 1638</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <i className="ri-map-pin-line"></i>
                  <span>Picos, Piauí</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
