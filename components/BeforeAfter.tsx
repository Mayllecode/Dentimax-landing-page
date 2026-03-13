"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiCheck } from "react-icons/hi";

const cases = [
  {
    label: "Blanqueamiento",
    before: "/blanqueamiento-despues.png",
    after: "/blanqueamiento-antes.png",
    color: "#f59e0b",
    stats: [
      { value: "8", label: "tonos más claro" },
      { value: "60m", label: "por sesión" },
      { value: "1", label: "visita al total" },
    ],
    benefits: [
      "Tecnología LED de última generación",
      "Resultado visible desde el primer día",
      "Gel blanqueador certificado",
      "Kit de mantenimiento incluido",
    ],
    quote: "Salí de la clínica con una sonrisa completamente nueva.",
  },
  {
    label: "Ortodoncia",
    before: "/ortodoncia-despues.png",
    after: "/ortodoncia-antes.png",
    color: "#2563eb",
    stats: [
      { value: "12", label: "meses promedio" },
      { value: "3", label: "tipos de brackets" },
      { value: "98%", label: "de casos exitosos" },
    ],
    benefits: [
      "Brackets metálicos, cerámicos y zafiro",
      "Seguimiento mensual personalizado",
      "Corrección de mordida incluida",
      "Retenedores al terminar el tratamiento",
    ],
    quote: "Nunca pensé que mis dientes quedarían tan perfectos.",
  },
  {
    label: "Diseño de Sonrisa",
    before: "/diseño-de-sonrisa-despues.png",
    after: "/diseño-de-sonrisa-antes.png",
    color: "#ec4899",
    stats: [
      { value: "2", label: "sesiones en total" },
      { value: "20", label: "años de durabilidad" },
      { value: "360°", label: "transformación" },
    ],
    benefits: [
      "Diseño digital previo al tratamiento",
      "Carillas de porcelana o resina",
      "Aspecto 100% natural",
      "Intervención mínima al diente sano",
    ],
    quote: "Mi sonrisa se ve exactamente como lo diseñamos juntos.",
  },
];

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPos(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
      style={{ position: "relative", aspectRatio: "4/3", borderRadius: "16px", overflow: "hidden", cursor: "col-resize", userSelect: "none" }}
    >
      <Image key={before} src={before} alt="Antes" fill style={{ objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image key={after} src={after} alt="Después" fill style={{ objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "2px", backgroundColor: "#fff", transform: "translateX(-50%)", zIndex: 10 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          <span style={{ color: "#2563eb", fontSize: "0.9rem", fontWeight: 900, letterSpacing: "-2px" }}>⟨⟩</span>
        </div>
      </div>
      <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#f8fafc", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", zIndex: 5 }}>Antes</div>
      <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "linear-gradient(135deg, #2563eb, #06b6d4)", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", zIndex: 5 }}>Después</div>
    </div>
  );
}

export default function BeforeAfter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const current = cases[active];

  return (
    <section ref={ref} style={{ backgroundColor: "#0d1b3e", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ color: "#06b6d4", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}
          >
            Resultados reales
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em" }}
          >
            Antes y <span style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>después</span>
          </motion.h2>
        </div>

        <div style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "4rem" }}>
          {cases.map((c, i) => (
            <motion.button
              key={c.label}
              onClick={() => setActive(i)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ position: "relative", padding: "0 2rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "center" }}
            >
              <span style={{ display: "block", color: active === i ? c.color : "rgba(255,255,255,0.2)", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.2em", marginBottom: "0.35rem", transition: "color 0.3s" }}>
                0{i + 1}
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1rem, 2.2vw, 1.55rem)",
                  fontWeight: 900,
                  color: active === i ? "#f8fafc" : "#3d5577",
                  transition: "color 0.3s",
                  letterSpacing: "-0.01em",
                }}
              >
                {c.label}
              </span>
              {active === i && (
                <motion.div
                  layoutId="tab-bar"
                  style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${c.color}88, ${c.color})`, borderRadius: "2px 2px 0 0" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr_1fr] gap-8 items-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${active}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45 }}
              className="hidden lg:flex flex-col gap-3"
            >
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: "0.5rem" }}>
                Datos clave
              </p>
              {current.stats.map((stat, j) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: j * 0.1 }}
                  style={{ background: "#1a2f5e", borderRadius: "14px", padding: "1.1rem 1.3rem", borderLeft: `3px solid ${current.color}`, display: "flex", flexDirection: "column", gap: "0.15rem" }}
                >
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: current.color, lineHeight: 1, fontFamily: "var(--font-playfair)" }}>{stat.value}</span>
                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <BeforeAfterSlider before={current.before} after={current.after} />
            </motion.div>
            <p style={{ textAlign: "center", marginTop: "0.65rem", color: "#2d4a6a", fontSize: "0.78rem", letterSpacing: "0.05em" }}>
              ← arrastra para comparar →
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${active}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.45 }}
              className="hidden lg:flex flex-col gap-3"
            >
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: "0.5rem" }}>
                ¿Qué incluye?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {current.benefits.map((b, j) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.1 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
                  >
                    <span style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: `${current.color}20`, border: `1px solid ${current.color}44`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                      <HiCheck style={{ color: current.color, fontSize: "0.68rem" }} />
                    </span>
                    <span style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.6 }}>{b}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                style={{ marginTop: "0.5rem", background: "#1a2f5e", borderRadius: "14px", padding: "1.1rem 1.3rem", borderTop: `2px solid ${current.color}33`, position: "relative", overflow: "hidden" }}
              >
                <span style={{ position: "absolute", top: "0.4rem", left: "0.8rem", fontSize: "2.5rem", color: current.color, opacity: 0.18, lineHeight: 1, fontFamily: "serif", pointerEvents: "none" }}>"</span>
                <p style={{ color: "#8ba3c0", fontSize: "0.83rem", lineHeight: 1.75, fontStyle: "italic", paddingLeft: "1rem" }}>
                  {current.quote}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
