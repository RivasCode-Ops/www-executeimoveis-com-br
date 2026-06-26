import { useState, type FormEvent } from "react";
import {
  submitContactForm,
  SERVICE_OPTIONS,
  type ContactPayload,
} from "../lib/submit-contact";

const INITIAL_STATE: ContactPayload = {
  nome: "",
  telefone: "",
  email: "",
  servico: "",
  mensagem: "",
  origem: "contato",
  website: "", // honeypot
};

export default function ContactSection() {
  const [form, setForm] = useState<ContactPayload>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const result = await submitContactForm(form);

    if (result.ok) {
      setStatus("success");
      setMessage(
        "Recebemos seu contato! Retornaremos em ate 24 horas uteis. Se for urgente, fale conosco pelo WhatsApp.",
      );
      setForm(INITIAL_STATE);
    } else {
      setStatus("error");
      setMessage(result.message ?? "Erro ao enviar. Tente novamente.");
    }
  }

  return (
    <section id="contato" aria-label="Secao de contato">
      <div className="contact-header">
        <h2>Entre em contato</h2>
        <p>
          Preencha o formulario ou fale diretamente pelo WhatsApp. Respondemos em
          ate <strong>24 horas uteis</strong>.
        </p>
      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulario de contato"
      >
        {/* Honeypot - oculto para usuarios */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-nome">Nome *</label>
            <input
              id="contact-nome"
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-telefone">WhatsApp / Telefone *</label>
            <input
              id="contact-telefone"
              name="telefone"
              type="tel"
              value={form.telefone}
              onChange={handleChange}
              required
              autoComplete="tel"
              placeholder="(86) 9 9999-9999"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-email">E-mail</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-servico">Qual servico voce precisa?</label>
            <select
              id="contact-servico"
              name="servico"
              value={form.servico}
              onChange={handleChange}
            >
              <option value="">Selecione um servico</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contact-mensagem">Mensagem</label>
          <textarea
            id="contact-mensagem"
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            rows={4}
            placeholder="Descreva sua situacao: tipo de imovel, cidade, pendencia documental..."
          />
        </div>

        <p className="form-lgpd">
          Ao enviar, voce concorda com o tratamento dos dados conforme nossa
          Politica de Privacidade. Versao: 2026-05-14-v1.
        </p>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Enviar mensagem"}
        </button>

        {status !== "idle" && status !== "loading" && (
          <p
            role="status"
            className={status === "success" ? "form-success" : "form-error"}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
