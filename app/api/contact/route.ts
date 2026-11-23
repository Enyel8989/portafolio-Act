import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: unknown = await request.json().catch(() => null);
  if (!data || typeof data !== "object" || !("name" in data) || !("email" in data) || !("message" in data)) {
    return NextResponse.json({ message: "Envía nombre, correo y mensaje en formato JSON." }, { status: 400 });
  }
  if (typeof data.name !== "string" || typeof data.email !== "string" || typeof data.message !== "string") {
    return NextResponse.json({ message: "Los tres campos deben contener texto." }, { status: 400 });
  }
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();
  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ message: "El nombre debe tener entre 2 y 100 caracteres." }, { status: 422 });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email)) {
    return NextResponse.json({ message: "Escribe un correo electrónico válido." }, { status: 422 });
  }
  if (message.length < 10 || message.length > 2000) {
    return NextResponse.json({ message: "El mensaje debe tener entre 10 y 2000 caracteres." }, { status: 422 });
  }
  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
    return NextResponse.json({ message: "El envío por correo aún está en configuración." }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: "Nuevo mensaje del portafolio",
        text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) return NextResponse.json({ message: "¡Mensaje enviado! Gracias por escribir." });
  } catch {
    return NextResponse.json({ message: "El envío se interrumpió. Vuelve a intentarlo." }, { status: 502 });
  }
  return NextResponse.json({ message: "No se pudo enviar el mensaje. Vuelve a intentarlo más tarde." }, { status: 502 });
}
