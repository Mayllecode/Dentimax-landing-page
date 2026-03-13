"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const photos = [
  { src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80", label: "Recepción Dentimax" },
  { src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80", label: "Sala de tratamiento" },
  { src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80", label: "Equipos modernos" },
  { src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80", label: "Ortodoncia" },
  { src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80", label: "Área de espera" },
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", label: "Laboratorio dental" },
  { src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80", label: "Radiografías digitales" },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80", label: "Consulta general" },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : 0));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % photos.length : 0));

  return (
    <section id="galeria" ref={ref} style={{ backgroundColor: "#0d1b3e", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ color: "#06b6d4", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}
          >
            Nuestras instalaciones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em" }}
          >
            Conoce nuestra <span style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>clínica</span>
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              onClick={() => setLightbox(i)}
              style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: i === 0 || i === 5 ? "1/1.3" : "1/1", cursor: "pointer" }}
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.08)")}
                onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
              />
              <div
                style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,27,62,0.8) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0")}
              >
                <span style={{ position: "absolute", bottom: "1rem", left: "1rem", color: "#f8fafc", fontWeight: 600, fontSize: "0.85rem" }}>{photo.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", width: "min(90vw, 900px)", aspectRatio: "16/10", borderRadius: "16px", overflow: "hidden" }}
            >
              <Image src={photos[lightbox].src} alt={photos[lightbox].label} fill style={{ objectFit: "cover" }} />
            </motion.div>
            {[{ fn: prev, side: "left", icon: <HiChevronLeft /> }, { fn: next, side: "right", icon: <HiChevronRight /> }].map((btn) => (
              <button key={btn.side} onClick={btn.fn} style={{ position: "fixed", [btn.side]: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "50%", width: "48px", height: "48px", cursor: "pointer", fontSize: "1.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{btn.icon}</button>
            ))}
            <button onClick={() => setLightbox(null)} style={{ position: "fixed", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "50%", width: "42px", height: "42px", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
