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
  origem: "hero",
  website: "", // honeypot — nunca preencher
};

export default function HeroSection() {
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
        "Recebemos seu contato! Retornaremos em até 24 horas úteis. Se for urgente, fale conosco pelo WhatsApp.",
      );
      setForm(INITIAL_STATE);
    } else {
      setStatus("error");
      setMessage(result.message ?? "Erro ao enviar. Tente novamente.");
    }
  }

  return (
    <section id="hero" aria-label="Hero — Diagnóstico gratuito">
      <div className="hero-content">
        <h1>Imóvel de herança sem escritura? Existe caminho legal.</h1>
        <p>
          Escritório especializado em regularização fundiária e imobiliária em
          Picos e todo o Piauí. Diagnóstico em até 24 horas — sem compromisso.
        </p>
        <ul className="hero-bullets">
          <li>Inventário, usucapião, retificação e adjudicação</li>
          <li>Atendimento presencial em Picos e online para todo o PI</li>
          <li>Mais de 500 imóveis regularizados · CRECI/PI 1638</li>
        </ul>
      </div>

      <form
        className="hero-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulário de contato rápido"
      >
        {/* Honeypot — oculto para usuários */}
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

        <div className="form-group">
          <label htmlFor="hero-nome">Nome *</label>
          <input
            id="hero-nome"
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
          <label htmlFor="hero-telefone">WhatsApp / Telefone *</label>
          <input
            id="hero-telefone"
            name="telefone"
            type="tel"
            value={form.telefone}
            onChange={handleChange}
            required
            autoComplete="tel"
            placeholder="(86) 9 9999-9999"
          />
        </div>

        <div className="form-group">
          <label htmlFor="hero-servico">Qual serviço você precisa?</label>
          <select
            id="hero-servico"
            name="servico"
            value={form.servico}
            onChange={handleChange}
          >
            <option value="">Selecione um serviço</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hero-mensagem">Mensagem</label>
          <textarea
            id="hero-mensagem"
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            rows={3}
            placeholder="Ex.: imóvel herdado em Picos, sem escritura, 3 herdeiros…"
          />
        </div>

        <p className="form-lgpd">
          Ao enviar, você concorda com o tratamento dos dados conforme nossa
          Política de Privacidade. Versão: 2026-05-14-v1.
        </p>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando…" : "Solicitar diagnóstico gratuito"}
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
