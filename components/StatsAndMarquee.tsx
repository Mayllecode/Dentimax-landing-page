"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 1200, suffix: "+", label: "Pacientes atendidos" },
  { value: 10, suffix: "+", label: "Años de experiencia" },
  { value: 3, suffix: "", label: "Sedes en Lima" },
  { value: 100, suffix: "%", label: "Pacientes satisfechos" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const services = [
  "LIMPIEZA DENTAL", "ORTODONCIA", "BRACKETS", "IMPLANTES",
  "BLANQUEAMIENTO", "RADIOGRAFÍAS", "ENDODONCIA", "DISEÑO DE SONRISA",
  "LIMPIEZA DENTAL", "ORTODONCIA", "BRACKETS", "IMPLANTES",
  "BLANQUEAMIENTO", "RADIOGRAFÍAS", "ENDODONCIA", "DISEÑO DE SONRISA",
];

export default function StatsAndMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <div ref={ref} style={{ backgroundColor: "#0d1b3e", padding: "4rem 2rem", borderTop: "1px solid rgba(37,99,235,0.15)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div style={{ fontSize: "3rem", fontWeight: 900, background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
                {inView ? <Counter target={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.3rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(6,182,212,1)", overflow: "hidden", padding: "0.9rem 0", borderTop: "1px solid rgba(0,0,0,0.1)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
        <div className="marquee-track">
          {services.map((s, i) => (
            <span
              key={i}
              style={{ color: "#0d1b3e", fontWeight: 900, fontSize: "0.82rem", letterSpacing: "0.15em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}
            >
              {s}
              <span style={{ color: "rgba(0,0,0,0.25)", fontSize: "1.1rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
