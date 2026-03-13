"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Milagros Torres",
    gender: "female",
    initials: "MT",
    rating: 5,
    treatment: "Diseño de Sonrisa",
    text: "Vine muy nerviosa porque tenía años sin ir al dentista, pero el Dr. Rodrigo y su equipo me hicieron sentir súper cómoda desde el primer momento. El resultado de mi diseño de sonrisa superó mis expectativas. ¡Ahora no paro de sonreír!",
    date: "Marzo 2025",
  },
  {
    name: "Carlos Mendoza",
    gender: "male",
    initials: "CM",
    rating: 4.5,
    treatment: "Ortodoncia",
    text: "Llevo 8 meses con los brackets y el avance es increíble. La Dra. Carmen es muy profesional y siempre explica cada paso del tratamiento. El consultorio es moderno, limpio y en un segundo piso muy bien ubicado en Comas.",
    date: "Febrero 2025",
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {Array(full).fill(0).map((_, i) => <BsStarFill key={`f${i}`} style={{ color: "#f59e0b", fontSize: "0.9rem" }} />)}
      {half && <BsStarHalf style={{ color: "#f59e0b", fontSize: "0.9rem" }} />}
      {Array(empty).fill(0).map((_, i) => <BsStarFill key={`e${i}`} style={{ color: "#1e3a6e", fontSize: "0.9rem" }} />)}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonios" ref={ref} style={{ backgroundColor: "#111d3d", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ color: "#06b6d4", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}
          >
            Lo que dicen nuestros pacientes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em" }}
          >
            Testimonios <span style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>reales</span>
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              style={{ background: "#1a2f5e", borderRadius: "20px", padding: "2.5rem", position: "relative", border: "1px solid rgba(37,99,235,0.15)", display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <FaQuoteLeft style={{ position: "absolute", top: "1.5rem", right: "1.5rem", color: "#2563eb", opacity: 0.2, fontSize: "3rem" }} />
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%", flexShrink: 0,
                  background: t.gender === "female" ? "linear-gradient(135deg, #ec4899, #f472b6)" : "linear-gradient(135deg, #2563eb, #3b82f6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 800, fontSize: "1.1rem"
                }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#f8fafc", marginBottom: "2px" }}>{t.name}</p>
                  <span style={{ fontSize: "0.75rem", color: "#06b6d4", fontWeight: 600 }}>{t.treatment}</span>
                </div>
              </div>
              <Stars rating={t.rating} />
              <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.95rem" }}>{t.text}</p>
              <span style={{ fontSize: "0.75rem", color: "#475569", marginTop: "auto" }}>{t.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
