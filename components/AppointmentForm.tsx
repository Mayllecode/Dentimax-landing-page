"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HiCalendar, HiUser, HiPhone, HiMail, HiChevronDown, HiCheckCircle } from "react-icons/hi";

const services = ["Limpieza dental", "Ortodoncia / Brackets", "Implantes dentales", "Blanqueamiento dental", "Radiografías", "Diseño de Sonrisa"];

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  message: string;
}

export default function AppointmentForm() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", service: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      setForm((prev) => ({ ...prev, service }));
    };
    window.addEventListener("serviceSelected", handler);
    return () => window.removeEventListener("serviceSelected", handler);
  }, []);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error desconocido");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#0d1b3e", border: "1px solid rgba(37,99,235,0.3)",
    borderRadius: "10px", padding: "0.85rem 1rem 0.85rem 3rem", color: "#f8fafc",
    fontSize: "0.95rem", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  const fields = [
    { name: "name", label: "Nombre completo", type: "text", icon: <HiUser />, placeholder: "Tu nombre" },
    { name: "phone", label: "Teléfono / Celular", type: "tel", icon: <HiPhone />, placeholder: "9XX XXX XXX" },
    { name: "email", label: "Correo electrónico", type: "email", icon: <HiMail />, placeholder: "correo@ejemplo.com" },
    { name: "date", label: "Fecha preferida", type: "date", icon: <HiCalendar />, placeholder: "" },
  ];

  return (
    <section id="cita" ref={ref} style={{ backgroundColor: "#111d3d", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ color: "#06b6d4", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}
          >
            Reserva tu espacio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em" }}
          >
            Agenda tu <span style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>cita</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          style={{ background: "#1a2f5e", borderRadius: "24px", padding: "3rem", border: "1px solid rgba(37,99,235,0.15)", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
                  {fields.map((f) => (
                    <div key={f.name} style={{ position: "relative" }}>
                      <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", marginBottom: "6px", fontWeight: 600 }}>{f.label}</label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "#2563eb", fontSize: "1rem", pointerEvents: "none" }}>{f.icon}</span>
                        <input
                          required
                          type={f.type}
                          name={f.name}
                          placeholder={f.placeholder}
                          value={form[f.name as keyof FormData]}
                          onChange={handle}
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(37,99,235,0.3)")}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ position: "relative" }}>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", marginBottom: "6px", fontWeight: 600 }}>Servicio de interés</label>
                  <div style={{ position: "relative" }}>
                    <select
                      required
                      name="service"
                      value={form.service}
                      onChange={handle}
                      style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                      onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(37,99,235,0.3)")}
                    >
                      <option value="" disabled>Selecciona un servicio...</option>
                      {services.map((s) => <option key={s} value={s} style={{ background: "#1a2f5e" }}>{s}</option>)}
                    </select>
                    <HiChevronDown style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "#2563eb", pointerEvents: "none" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", marginBottom: "6px", fontWeight: 600 }}>Mensaje adicional (opcional)</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Cuéntanos brevemente tu consulta o inquietud..."
                    value={form.message}
                    onChange={handle}
                    style={{ ...inputStyle, padding: "0.85rem 1rem", resize: "none" }}
                    onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(37,99,235,0.3)")}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  style={{ background: loading ? "#1e3a6e" : "linear-gradient(135deg, #2563eb, #06b6d4)", color: "#fff", border: "none", borderRadius: "12px", padding: "1rem 2rem", fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  {loading ? (
                    <><span style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> Enviando...</>
                  ) : "Agendar mi cita"}
                </motion.button>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: "#f87171", fontSize: "0.85rem", textAlign: "center", marginTop: "-0.5rem" }}
                  >
                    {error}
                  </motion.p>
                )}
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "3rem 0" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}>
                  <HiCheckCircle style={{ fontSize: "5rem", color: "#10b981", margin: "0 auto 1.5rem" }} />
                </motion.div>
                <h3 style={{ color: "#f8fafc", fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.75rem" }}>¡Solicitud enviada!</h3>
                <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>Nos pondremos en contacto contigo a la brevedad para confirmar tu cita. También puedes escribirnos por WhatsApp al <strong style={{ color: "#06b6d4" }}>998 542 754</strong>.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
