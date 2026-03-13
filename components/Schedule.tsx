"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiClock, HiLocationMarker, HiPhone } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";

const schedule = [
  { day: "Lunes", hours: "9:00 AM – 8:00 PM", open: true },
  { day: "Martes", hours: "9:00 AM – 8:00 PM", open: true },
  { day: "Miércoles", hours: "9:00 AM – 8:00 PM", open: true },
  { day: "Jueves", hours: "9:00 AM – 8:00 PM", open: true },
  { day: "Viernes", hours: "9:00 AM – 8:00 PM", open: true },
  { day: "Sábado", hours: "9:00 AM – 2:00 PM", open: true },
  { day: "Domingo", hours: "Cerrado", open: false },
];

function getTodayName() {
  return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][new Date().getDay()];
}

export default function Schedule() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const today = getTodayName();

  return (
    <section id="horarios" ref={ref} style={{ backgroundColor: "#0d1b3e", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ color: "#06b6d4", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}
          >
            ¿Cuándo atendemos?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em", marginBottom: "2rem", lineHeight: 1.2 }}
          >
            Horarios de <span style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>atención</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "2.5rem" }}
          >
            Contamos con amplia disponibilidad para que puedas visitarnos sin interrumpir tu rutina. Agenda tu cita con anticipación para asegurar tu horario preferido.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              { icon: <HiLocationMarker />, text: "Av. El Retablo 1084, Oficina 202, Comas" },
              { icon: <HiPhone />, text: "998 542 754" },
              { icon: <HiClock />, text: "Atención de lunes a sábado" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#2563eb", fontSize: "1.1rem", marginTop: "2px", flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: "#94a3b8" }}>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ background: "#1a2f5e", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(37,99,235,0.15)" }}
        >
          <div style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", padding: "1.5rem 2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <HiClock style={{ color: "#fff", fontSize: "1.3rem" }} />
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>Horario semanal</span>
            </div>
          </div>
          <div style={{ padding: "0.5rem 0" }}>
            {schedule.map((item, i) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "1rem 2rem",
                  backgroundColor: item.day === today ? "rgba(37,99,235,0.15)" : "transparent",
                  borderLeft: item.day === today ? "3px solid #2563eb" : "3px solid transparent",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  {item.day === today && <FaCheckCircle style={{ color: "#10b981", fontSize: "0.8rem" }} />}
                  <span style={{ fontWeight: item.day === today ? 700 : 400, color: item.day === today ? "#f8fafc" : "#94a3b8" }}>{item.day}</span>
                  {item.day === today && <span style={{ fontSize: "0.65rem", backgroundColor: "#10b981", color: "#fff", padding: "0 6px", borderRadius: "99px", fontWeight: 700 }}>HOY</span>}
                </div>
                <span style={{ fontSize: "0.9rem", color: item.open ? (item.day === today ? "#06b6d4" : "#64748b") : "#ef4444", fontWeight: item.day === today ? 600 : 400 }}>
                  {item.hours}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
