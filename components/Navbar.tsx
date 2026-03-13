"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaTooth } from "react-icons/fa";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Doctores", href: "#doctores" },
  { label: "Galería", href: "#galeria" },
  { label: "Precios", href: "#precios" },
  { label: "Citas", href: "#citas" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.from(logoRef.current, { x: -40, opacity: 0, duration: 0.8, ease: "power3.out" });
    gsap.from(".nav-link-dm", {
      y: -20, opacity: 0, stagger: 0.07, duration: 0.6, delay: 0.3, ease: "power2.out",
    });
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? "rgba(13,27,62,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      duration: 0.4,
    });
  }, [scrolled]);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "1.1rem 2rem",
        borderBottom: scrolled ? "1px solid rgba(37,99,235,0.2)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div ref={logoRef} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #2563eb, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaTooth style={{ color: "#fff", fontSize: "1rem" }} />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#f8fafc", letterSpacing: "-0.01em" }}>DENTIMAX</div>
            <div style={{ fontSize: "0.6rem", color: "#06b6d4", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Clínica Dental</div>
          </div>
        </div>

        <ul style={{ display: "flex", gap: "1.8rem", listStyle: "none", alignItems: "center" }} className="hidden md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link-dm"
                style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", transition: "color 0.2s", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#06b6d4")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#94a3b8")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#citas"
          className="hidden md:flex"
          style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)", color: "#fff", padding: "0.6rem 1.4rem", borderRadius: "999px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(37,99,235,0.5)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
        >
          Agendar cita
        </a>

        <button onClick={() => setOpen(!open)} className="flex md:hidden" style={{ background: "none", border: "none", color: "#f8fafc", cursor: "pointer", fontSize: "1.6rem" }}>
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: "rgba(13,27,62,0.98)", backdropFilter: "blur(20px)", overflow: "hidden" }}
          >
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem 2rem", listStyle: "none" }}>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} style={{ color: "#f8fafc", fontSize: "1.1rem", fontWeight: 600, textDecoration: "none" }}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
