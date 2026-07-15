import AnimateIn from '../../../components/feature/AnimateIn';

export default function PrivacySection() {
  return (
    <section id="privacidade" className="py-16 bg-background border-t border-border/60">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <h2 className="text-xl font-bold text-text-primary mb-4">Política de privacidade</h2>
          <div className="text-text-secondary text-sm leading-relaxed space-y-3">
            <p>
              A Execute Imóveis trata seus dados (nome, telefone, e-mail e mensagem) apenas para responder
              solicitações de contato, agendar consultas e prestar informações sobre regularização imobiliária.
            </p>
            <p>
              Os dados enviados pelo formulário são processados pelo servidor do site (Vercel) e encaminhados
              por e-mail; não são vendidos a terceiros. Você pode solicitar correção ou exclusão entrando em contato pelo
              e-mail{' '}
              <a href="mailto:executeregularizacao@gmail.com" className="text-primary hover:underline">
                executeregularizacao@gmail.com
              </a>
              .
            </p>
            <p>
              Para dúvidas urgentes, prefira o WhatsApp oficial. Não envie senhas ou dados bancários por formulário.
            </p>
            <p className="text-xs text-text-secondary/70">Última atualização: maio de 2026.</p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
