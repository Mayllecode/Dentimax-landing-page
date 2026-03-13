import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  let body: Record<string, string>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const { name, phone, email, service, date, message } = body;

  if (!name?.trim() || !phone?.trim() || !service?.trim() || !date?.trim()) {
    return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
  }

  const fullMessage = [
    `Servicio: ${service}`,
    message?.trim() ? message.trim() : null,
  ]
    .filter(Boolean)
    .join("\n");

  const { error } = await supabase.from("appointments").insert({
    patient_name: name.trim(),
    patient_phone: phone.trim(),
    patient_email: email?.trim() || null,
    preferred_date: date,
    message: fullMessage,
    source: "web",
    status: "pending",
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json({ error: "No se pudo guardar la cita" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
