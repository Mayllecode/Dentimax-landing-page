"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiX } from "react-icons/hi";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}
        >
          <AnimatePresence>
            {tooltipOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                style={{ background: "#1a2f5e", border: "1px solid rgba(37,199,235,0.2)", borderRadius: "14px", padding: "1rem 1.25rem", maxWidth: "240px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                <button
                  onClick={() => setTooltipOpen(false)}
                  style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: "2px" }}
                  aria-label="Cerrar"
                >
                  <HiX />
                </button>
                <p style={{ color: "#f8fafc", fontWeight: 700, fontSize: "0.85rem", marginBottom: "4px" }}>¡Hola! 👋</p>
                <p style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.5 }}>¿Tienes dudas o quieres agendar? Escríbenos directamente.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ position: "relative" }}>
            <motion.span
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#25d366", pointerEvents: "none" }}
            />
            <motion.a
              href="https://wa.me/51998542754?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20en%20Dentimax"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTooltipOpen((v) => !v)}
              style={{ width: "58px", height: "58px", borderRadius: "50%", background: "#25d366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", position: "relative" }}
              aria-label="Contactar por WhatsApp"
            >
              <FaWhatsapp />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
