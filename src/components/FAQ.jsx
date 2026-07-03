import { useState } from 'react'

const faqs = [
  {
    q: 'Quanto custa regularizar um imóvel?',
    a: 'O custo varia conforme o tipo de serviço e a complexidade do caso. Após o diagnóstico inicial gratuito, apresentamos uma proposta transparente com todos os valores envolvidos, sem surpresas.',
  },
  {
    q: 'Quanto tempo leva para regularizar um imóvel?',
    a: 'O prazo varia conforme o tipo de serviço. Uma retificação de matrícula simples pode ser concluída em 30 a 60 dias. Um processo de usucapião extrajudicial costuma levar de 3 a 8 meses. Inventários variam entre 2 e 6 meses.',
  },
  {
    q: 'Quais documentos são necessários?',
    a: 'Depende do caso, mas geralmente pedimos comprovante de posse ou ocupação, documentos de identidade dos titulares, certidões de óbito quando há herança, e dados cadastrais do imóvel. Fazemos a lista completa na primeira reunião.',
  },
  {
    q: 'Dá para resolver sem ação judicial?',
    a: 'Sim, em muitos casos. Retificações de matrícula, usucapião extrajudicial e partilhas amigáveis podem ser resolvidos em cartório, sem necessidade de processo judicial, o que agiliza e reduz custos.',
  },
  {
    q: 'Atendem imóveis rurais?',
    a: 'Sim. Regularizamos imóveis urbanos e rurais em todo o Piauí, incluindo regularização junto ao INCRA quando necessário.',
  },
  {
    q: 'Atendem todo o Piauí?',
    a: 'Sim. Embora nossa base seja em Picos, atendemos clientes em todo o estado do Piauí, com suporte presencial e remoto conforme a necessidade de cada caso.',
  },
  {
    q: 'Posso regularizar imóvel herdado?',
    a: 'Sim. O inventário e a partilha são etapas comuns para regularizar imóveis herdados. Trabalhamos para que o processo seja o mais ágil e tranquilo possível para os herdeiros.',
  },
  {
    q: 'Quem só tem contrato pode regularizar?',
    a: 'Sim. A partir do contrato de compra e venda, é possível iniciar o processo de regularização. Avaliamos o contrato e definimos a melhor estratégia para levar o imóvel até o registro definitivo.',
  },
]

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-surface hover:bg-gray-50 transition-colors cursor-pointer border-none"
      >
        <span className="font-semibold text-text-primary flex-1 text-sm sm:text-base">{faq.q}</span>
        <i
          className={`ri-arrow-down-s-line text-xl text-text-secondary transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        ></i>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 text-text-secondary leading-relaxed text-sm border-t border-border pt-4">
          {faq.a}
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="py-24 lg:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-5">
            Perguntas <span className="text-gold">Frequentes</span>
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Tire as principais dúvidas sobre regularização imobiliária.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} isOpen={openIndex === i} onClick={() => toggle(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
