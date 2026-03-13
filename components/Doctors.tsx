"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MdOutlineSchool } from "react-icons/md";
import Image from "next/image";

const doctors = [
  {
    name: "Dra. Carmen Quispe",
    role: "Directora · Ortodoncia",
    bio: "Especialista en ortodoncia y brackets con más de 10 años de experiencia. Egresada de la UNMSM. Apasionada por transformar sonrisas.",
    color: "#ec4899",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    specialties: ["Ortodoncia", "Brackets", "Retención"],
    education: "UNMSM · Especialista en Ortodoncia",
  },
  {
    name: "Dr. Rodrigo Vega",
    role: "Implantología & Cirugía",
    bio: "Cirujano oral e implantólogo con formación en la UPCH. Especialista en implantes de carga inmediata y cirugías de mínima invasión.",
    color: "#2563eb",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    specialties: ["Implantes", "Cirugía oral", "Endodoncia"],
    education: "UPCH · Implantología Oral",
  },
  {
    name: "Dra. Sofía Llanos",
    role: "Estética Dental",
    bio: "Especialista en diseño de sonrisa, carillas y blanqueamiento. Combina arte y ciencia para lograr resultados naturales y duraderos.",
    color: "#06b6d4",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
    specialties: ["Blanqueamiento", "Carillas", "Diseño de sonrisa"],
    education: "UPC · Odontología Estética",
  },
];

function DoctorPhoto({ photo, name, color }: { photo: string; name: string; color: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
      <Image src={photo} alt={name} fill style={{ objectFit: "cover", objectPosition: "top" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, #1a2f5e 0%, transparent 55%)` }} />
      <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: `${color}33`, border: `1px solid ${color}66`, borderRadius: "999px", padding: "0.25rem 0.7rem", backdropFilter: "blur(10px)" }}>
        <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>Demo</span>
      </div>
    </div>
  );
}

export default function Doctors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="doctores" ref={ref} style={{ backgroundColor: "#111d3d", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ color: "#06b6d4", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}
          >
            Nuestro equipo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em" }}
          >
            Nuestros <span style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>doctores</span>
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              style={{ backgroundColor: "#1a2f5e", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}
            >
              <DoctorPhoto photo={doc.photo} name={doc.name} color={doc.color} />

              <div style={{ padding: "1.75rem 2rem 2rem" }}>
                <h3 style={{ fontWeight: 800, color: "#f8fafc", fontSize: "1.15rem", marginBottom: "0.25rem" }}>{doc.name}</h3>
                <p style={{ color: doc.color, fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>{doc.role}</p>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{doc.bio}</p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", padding: "0.6rem 1rem", backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                  <MdOutlineSchool style={{ color: "#f59e0b", flexShrink: 0 }} />
                  <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{doc.education}</span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {doc.specialties.map((s) => (
                    <span key={s} style={{ backgroundColor: `${doc.color}15`, border: `1px solid ${doc.color}30`, color: doc.color, padding: "0.2rem 0.75rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
