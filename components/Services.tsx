"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaTooth, FaXRay } from "react-icons/fa";
import { GiToothbrush } from "react-icons/gi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";

const services = [
  {
    icon: <GiToothbrush style={{ fontSize: "1.8rem" }} />,
    title: "Limpieza Dental",
    formKey: "Limpieza dental",
    desc: "Profilaxis profesional con ultrasonido. Eliminamos sarro, manchas y bacterias para mantener encías y dientes sanos.",
    price: "Desde S/ 80",
    color: "#06b6d4",
    popular: false,
  },
  {
    icon: <FaTooth style={{ fontSize: "1.8rem" }} />,
    title: "Ortodoncia & Brackets",
    formKey: "Ortodoncia / Brackets",
    desc: "Brackets metálicos, cerámicos o zafiro. Corregimos la alineación de tu mordida con seguimiento personalizado.",
    price: "Desde S/ 1,800",
    color: "#2563eb",
    popular: true,
  },
  {
    icon: <MdOutlineHealthAndSafety style={{ fontSize: "1.8rem" }} />,
    title: "Implantes Dentales",
    formKey: "Implantes dentales",
    desc: "Implantes de titanio de alta duración. Reemplazamos piezas perdidas con resultados naturales y permanentes.",
    price: "Desde S/ 2,500",
    color: "#10b981",
    popular: false,
  },
  {
    icon: <BsFillBrightnessHighFill style={{ fontSize: "1.8rem" }} />,
    title: "Blanqueamiento",
    formKey: "Blanqueamiento dental",
    desc: "Blanqueamiento LED profesional en consultorio. Resultados visibles desde la primera sesión, hasta 8 tonos más blanco.",
    price: "Desde S/ 350",
    color: "#f59e0b",
    popular: false,
  },
  {
    icon: <FaXRay style={{ fontSize: "1.8rem" }} />,
    title: "Radiografías",
    formKey: "Radiografías",
    desc: "Radiografías panorámicas y periapicales de mandíbula completa. Diagnóstico exacto con equipos digitales de última generación.",
    price: "Desde S/ 60",
    color: "#8b5cf6",
    popular: false,
  },
  {
    icon: <HiSparkles style={{ fontSize: "1.8rem" }} />,
    title: "Diseño de Sonrisa",
    formKey: "Diseño de Sonrisa",
    desc: "Carillas, resinas y estética dental personalizada. Transformamos tu sonrisa con resultados dignos de revista.",
    price: "Desde S/ 500",
    color: "#ec4899",
    popular: false,
  },
];

const handleBook = (formKey: string) => {
  window.dispatchEvent(new CustomEvent("serviceSelected", { detail: formKey }));
  const el = document.getElementById("cita");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicios" ref={ref} style={{ backgroundColor: "#111d3d", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ color: "#06b6d4", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}
          >
            Lo que ofrecemos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em" }}
          >
            Nuestros <span style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>servicios</span>
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover="cardHover"
              variants={{ cardHover: { scale: 1.04, y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } } }}
              style={{ backgroundColor: "#1a2f5e", borderRadius: "18px", padding: "2rem", border: `1px solid ${svc.popular ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.06)"}`, position: "relative", cursor: "default", boxShadow: "0 0 0 rgba(0,0,0,0)" }}
            >
              {svc.popular && (
                <div style={{ position: "absolute", top: "-12px", right: "1.5rem", background: "linear-gradient(135deg, #2563eb, #06b6d4)", color: "#fff", fontSize: "0.7rem", fontWeight: 800, padding: "0.25rem 0.9rem", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Más solicitado
                </div>
              )}

              <motion.div
                variants={{ cardHover: { scale: 1.18, transition: { type: "spring", stiffness: 400, damping: 15 } } }}
                style={{ width: "56px", height: "56px", borderRadius: "14px", backgroundColor: `${svc.color}18`, border: `1px solid ${svc.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: svc.color, marginBottom: "1.25rem" }}
              >
                {svc.icon}
              </motion.div>

              <h3 style={{ fontWeight: 900, color: "#f8fafc", fontSize: "1.3rem", marginBottom: "0.6rem", letterSpacing: "-0.01em", fontFamily: "var(--font-playfair)" }}>{svc.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>{svc.desc}</p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: svc.color, fontWeight: 900, fontSize: "1.1rem", fontFamily: "var(--font-playfair)" }}>{svc.price}</span>
                <button
                  onClick={() => handleBook(svc.formKey)}
                  style={{ backgroundColor: `${svc.color}18`, border: `1px solid ${svc.color}40`, color: svc.color, padding: "0.4rem 1rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = `${svc.color}30`)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = `${svc.color}18`)}
                >
                  Agendar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
