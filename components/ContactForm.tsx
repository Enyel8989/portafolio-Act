"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ error: boolean; message: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      setFeedback({ error: !response.ok, message: result.message });
      if (response.ok) form.reset();
    } catch {
      setFeedback({ error: true, message: "No se pudo conectar. Vuelve a intentarlo." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form grid gap-4" onSubmit={submit}>
      <label>Nombre<input name="name" required autoComplete="name" minLength={2} maxLength={100} /></label>
      <label>Correo electrónico<input name="email" required autoComplete="email" type="email" maxLength={254} /></label>
      <label>Mensaje<textarea name="message" required minLength={10} maxLength={2000} rows={5} /></label>
      <button className="button justify-self-start" disabled={sending} type="submit">{sending ? "Enviando…" : "Enviar mensaje"}</button>
      {feedback && <p role={feedback.error ? "alert" : "status"} className={feedback.error ? "error" : "success"}>{feedback.message}</p>}
    </form>
  );
}
