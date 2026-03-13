import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: "Clínica Dental Dentimax | Comas, Lima",
  description:
    "Clínica Dental Dentimax en Comas, Lima. Ortodoncia, implantes, blanqueamiento, limpieza y más. Agenda tu cita hoy.",
  keywords: "dentista comas, clinica dental comas, brackets lima, implantes dentales, dentimax",
  openGraph: {
    title: "Clínica Dental Dentimax | Comas, Lima",
    description: "Tu sonrisa, nuestra pasión. Agenda tu cita en Dentimax.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>{children}</body>
    </html>
  );
}
