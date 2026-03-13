"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { FaTooth, FaStar } from "react-icons/fa";
import { HiArrowDown, HiCheck } from "react-icons/hi";
import Image from "next/image";

const floatingItems = [
  { icon: "🦷", top: "18%", left: "8%", delay: 0 },
  { icon: "✨", top: "65%", left: "5%", delay: 0.8 },
  { icon: "🦷", top: "25%", right: "6%", delay: 1.2 },
  { icon: "💎", top: "70%", right: "8%", delay: 0.4 },
];

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(bgRef.current, { scale: 1.08, duration: 1.4, ease: "power3.out" })
      .from(badgeRef.current, { y: -30, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.8")
      .from(headingRef.current?.querySelectorAll("span") ?? [], { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power4.out" }, "-=0.4")
      .from(subRef.current, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.2");
  }, []);

  return (
    <section
      id="inicio"
      style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "#0d1b3e" }}
    >
      <div ref={bgRef} style={{ position: "absolute", inset: "-5%", zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&q=80"
          alt="Consultorio dental moderno"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,27,62,0.95) 0%, rgba(13,27,62,0.75) 60%, rgba(6,182,212,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,27,62,1) 0%, transparent 50%)" }} />
      </div>

      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3.5 + i * 0.5, delay: item.delay }}
          style={{
            position: "absolute",
            top: item.top,
            left: (item as { left?: string }).left,
            right: (item as { right?: string }).right,
            zIndex: 1,
            fontSize: "2rem",
            opacity: 0.25,
            filter: "blur(0.5px)",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div style={{ position: "absolute", top: "10%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "8rem 2rem 4rem", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
        <div>
          <div ref={badgeRef} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", padding: "0.35rem 1rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.75rem" }}>
            <FaStar style={{ color: "#f59e0b", fontSize: "0.7rem" }} />
            4.5 estrellas · Clínica recomendada en Comas
          </div>

          <h1 ref={headingRef} style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            <span style={{ display: "block", color: "#f8fafc" }}>Tu sonrisa</span>
            <span style={{ display: "block", background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>perfecta</span>
            <span style={{ display: "block", color: "#f8fafc" }}>está aquí</span>
          </h1>

          <p ref={subRef} style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "#94a3b8", maxWidth: "480px", lineHeight: 1.75, marginBottom: "2.5rem" }}>
            Ortodoncia, implantes, blanqueamiento y más. Atendemos con calidez y tecnología moderna en el corazón de Comas, Lima.
          </p>

          <div ref={ctaRef} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2.5rem" }}>
            <a
              href="#cita"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #2563eb, #06b6d4)", color: "#fff", padding: "0.95rem 2.2rem", borderRadius: "999px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(37,99,235,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              <FaTooth />
              Agendar cita gratis
            </a>
            <a
              href="#servicios"
              style={{ border: "1px solid rgba(248,250,252,0.2)", color: "#f8fafc", padding: "0.95rem 2rem", borderRadius: "999px", fontWeight: 600, fontSize: "1rem", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#06b6d4"; (e.currentTarget as HTMLAnchorElement).style.color = "#06b6d4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(248,250,252,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f8fafc"; }}
            >
              Ver servicios
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {["Primera consulta gratuita", "Sin tiempos de espera largos", "Atención para niños y adultos"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HiCheck style={{ color: "#10b981", fontSize: "0.75rem" }} />
                </div>
                <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: "relative" }}
          className="hidden md:block"
        >
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} style={{ position: "relative", borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", cursor: "pointer" }}>
            <Image
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
              alt="Doctora Dentimax sonriendo"
              fill
              style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,27,62,0.5) 0%, transparent 50%)" }} />
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ position: "absolute", top: "1.5rem", left: "-2rem", backgroundColor: "rgba(13,27,62,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "14px", padding: "1rem 1.4rem" }}
          >
            <div style={{ color: "#06b6d4", fontWeight: 900, fontSize: "1.8rem" }}>+1,200</div>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pacientes felices</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
            style={{ position: "absolute", bottom: "2rem", right: "-1.5rem", backgroundColor: "rgba(13,27,62,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: "14px", padding: "1rem 1.4rem" }}
          >
            <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: "1.8rem" }}>10+</div>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Años de experiencia</div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#nosotros"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 2, color: "#06b6d4", fontSize: "1.5rem" }}
      >
        <HiArrowDown />
      </motion.a>
    </section>
  );
}
