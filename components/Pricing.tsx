"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const plans = [
  {
    name: "Básico",
    tagline: "Mantenimiento y prevención",
    color: "#06b6d4",
    price: "S/ 80",
    priceNote: "por sesión",
    items: ["Limpieza dental completa", "Examen bucal", "Detección de caries", "Radiografía periapical", "Orientación de higiene"],
    cta: "Agendar limpieza",
    popular: false,
  },
  {
    name: "Ortodoncia",
    tagline: "Brackets y alineadores",
    color: "#2563eb",
    price: "S/ 2,800",
    priceNote: "tratamiento completo",
    items: ["Brackets metálicos o estéticos", "Controles mensuales incluidos", "Radiografías panorámicas", "Retención final", "Plan de pago disponible"],
    cta: "Consulta gratuita",
    popular: true,
  },
  {
    name: "Estética",
    tagline: "Diseño de sonrisa premium",
    color: "#f59e0b",
    price: "S/ 150",
    priceNote: "por tratamiento",
    items: ["Blanqueamiento LED", "Carillas dentales", "Diseño digital de sonrisa", "Implantes desde S/ 1,200", "Garantía de resultados"],
    cta: "Ver opciones",
    popular: false,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="precios" ref={ref} style={{ backgroundColor: "#0d1b3e", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ color: "#06b6d4", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}
          >
            Inversión en tu salud
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em" }}
          >
            Precios <span style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>transparentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            style={{ color: "#94a3b8", marginTop: "1rem", maxWidth: "500px", margin: "1rem auto 0", lineHeight: 1.7 }}
          >
            Sin sorpresas. Sin letras pequeñas. Te decimos el precio antes de empezar.
          </motion.p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", alignItems: "end" }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: plan.popular ? -16 : 0 } : {}}
              whileHover={{ y: plan.popular ? -22 : -8, boxShadow: `0 24px 48px ${plan.color}30`, transition: { type: "spring", stiffness: 280, damping: 22 } }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
              style={{
                background: plan.popular ? `linear-gradient(160deg, #152a5a, #1a3370)` : "#1a2f5e",
                borderRadius: "24px",
                padding: plan.popular ? "3rem 2rem" : "2.5rem 2rem",
                border: plan.popular ? `2px solid ${plan.color}` : "1px solid rgba(37,99,235,0.15)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {plan.popular && (
                <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #2563eb, #06b6d4)", borderRadius: "99px", padding: "4px 16px", display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
                  <FaStar style={{ color: "#f59e0b", fontSize: "0.7rem" }} />
                  <span style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Más solicitado</span>
                </div>
              )}
              <div>
                <span style={{ display: "inline-block", background: `${plan.color}22`, color: plan.color, borderRadius: "8px", padding: "4px 10px", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
                  {plan.name}
                </span>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{plan.tagline}</p>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: 900, color: plan.color }}>{plan.price}</span>
                </div>
                <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{plan.priceNote}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {plan.items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <FaCheckCircle style={{ color: plan.color, marginTop: "2px", flexShrink: 0, fontSize: "0.85rem" }} />
                    <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cita"
                style={{
                  background: plan.popular ? `linear-gradient(135deg, ${plan.color}, #06b6d4)` : "transparent",
                  border: `2px solid ${plan.color}`,
                  color: plan.popular ? "#fff" : plan.color,
                  borderRadius: "12px", padding: "0.85rem", textAlign: "center",
                  fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  transition: "all 0.25s",
                  marginTop: "auto",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `linear-gradient(135deg, ${plan.color}, #06b6d4)`;
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  if (!plan.popular) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = plan.color;
                  }
                }}
              >
                {plan.popular && <HiSparkles />}
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
