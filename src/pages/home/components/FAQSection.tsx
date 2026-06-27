import { useState } from 'react';
import AnimateIn from '../../../components/feature/AnimateIn';

const faqs = [
  {
    question: 'Quanto custa regularizar um imóvel?',
    answer: 'O custo varia conforme o tipo de serviço e a complexidade do caso. Após o diagnóstico inicial gratuito, apresentamos uma proposta transparente com todos os valores envolvidos, sem surpresas.',
  },
  {
    question: 'Quanto tempo leva?',
    answer: 'O prazo varia conforme o tipo de serviço. Uma retificação de matrícula simples pode ser concluída em 30 a 60 dias. Um processo de usucapião extrajudicial costuma levar de 3 a 8 meses. Inventários variam entre 2 e 6 meses.',
  },
  {
    question: 'Quais documentos são necessários?',
    answer: 'Depende do caso, mas geralmente pedimos comprovante de posse ou ocupação, documentos de identidade dos titulares, certidões de óbito quando há herança, e dados cadastrais do imóvel. Fazemos a lista completa na primeira reunião.',
  },
  {
    question: 'Dá para resolver sem ação judicial?',
    answer: 'Sim, em muitos casos. Retificações de matrícula, usucapião extrajudicial e partilhas amigáveis podem ser resolvidos em cartório, sem necessidade de processo judicial, o que agiliza e reduz custos.',
  },
  {
    question: 'Atendem imóveis rurais?',
    answer: 'Sim. Regularizamos imóveis urbanos e rurais em todo o Piauí, incluindo regularização junto ao INCRA quando necessário.',
  },
  {
    question: 'Atendem todo o Piauí?',
    answer: 'Sim. Embora nossa base seja em Picos, atendemos clientes em todo o estado do Piauí, com suporte presencial e remoto conforme a necessidade de cada caso.',
  },
  {
    question: 'Posso regularizar imóvel herdado?',
    answer: 'Sim. O inventário e a partilha são etapas comuns para regularizar imóveis herdados. Trabalhamos para que o processo seja o mais ágil e tranquilo possível para os herdeiros.',
  },
  {
    question: 'Quem só tem contrato pode regularizar?',
    answer: 'Sim. A partir do contrato de compra e venda, é possível iniciar o processo de regularização. Avaliamos o contrato e definimos a melhor estratégia para levar o imóvel até o registro definitivo.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[3px] uppercase text-text-secondary mb-4 block">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
              Tire suas dúvidas
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Respostas claras sobre os serviços de regularização imobiliária no Piauí.
            </p>
          </div>
        </AnimateIn>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <AnimateIn key={idx} delay={idx * 50} direction="up">
              <div className="bg-surface rounded-xl border border-border/60 shadow-[0_2px_16px_-2px_rgba(15,23,42,0.05)] hover:border-gold/25 overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <span className="font-semibold text-text-primary text-sm">{faq.question}</span>
                  <i
                    className={`ri-arrow-down-s-line text-gold text-lg flex-shrink-0 transition-transform duration-300 ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === idx ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-text-secondary text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}