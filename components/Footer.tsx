"use client";

import { FaTooth, FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HiLocationMarker, HiPhone, HiMail, HiClock } from "react-icons/hi";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Antes y Después", href: "#antes-despues" },
  { label: "Doctores", href: "#doctores" },
  { label: "Galería", href: "#galeria" },
  { label: "Precios", href: "#precios" },
  { label: "Agendar Cita", href: "#cita" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#060f26", borderTop: "1px solid rgba(37,99,235,0.15)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <FaTooth style={{ color: "#2563eb", fontSize: "1.5rem" }} />
              <span style={{ fontWeight: 900, fontSize: "1.3rem", background: "linear-gradient(135deg, #2563eb, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Dentimax
              </span>
            </div>
            <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Tu sonrisa es nuestra especialidad. Tecnología de vanguardia y trato humano en el corazón de Comas.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: <FaFacebook />, href: "https://www.facebook.com/Clinicadentaldentimaxperu/", color: "#1877f2" },
                { icon: <FaWhatsapp />, href: "https://wa.me/51998542754", color: "#25d366" },
                { icon: <FaInstagram />, href: "#", color: "#e1306c" },
              ].map((soc, i) => (
                <a
                  key={i}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: soc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", transition: "all 0.2s", textDecoration: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${soc.color}22`; (e.currentTarget as HTMLAnchorElement).style.borderColor = soc.color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#f8fafc", fontWeight: 700, marginBottom: "1.25rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Navegación</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#06b6d4")}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#64748b")}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#f8fafc", fontWeight: 700, marginBottom: "1.25rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Contacto</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: <HiLocationMarker />, text: "Av. El Retablo 1084, Oficina 202 (2do Piso), Comas, Lima" },
                { icon: <HiPhone />, text: "998 542 754" },
                { icon: <HiMail />, text: "contacto@dentimax.pe" },
                { icon: <HiClock />, text: "Lun–Vie 9AM–8PM · Sáb 9AM–2PM" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#2563eb", marginTop: "2px", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#f8fafc", fontWeight: 700, marginBottom: "1.25rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Cómo llegar</h4>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(37,99,235,0.2)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.234!2d-77.0640911!3d-11.9291218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91efa7bc6c0fea7d%3A0x!2sCl%C3%ADnica+Dental+Dentimax!5e0!3m2!1ses!2spe!4v1620000000000"
                width="100%"
                height="180"
                style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) saturate(0.85)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Clínica Dental Dentimax"
              />
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "#334155", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Clínica Dental Dentimax. Todos los derechos reservados.
          </p>
          <p style={{ color: "#334155", fontSize: "0.8rem" }}>
            Av. El Retablo 1084 Of. 202, Comas, Lima – Perú
          </p>
        </div>
      </div>
    </footer>
  );
}
