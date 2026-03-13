import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsAndMarquee from "@/components/StatsAndMarquee";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import Doctors from "@/components/Doctors";
import Testimonials from "@/components/Testimonials";
import Schedule from "@/components/Schedule";
import Pricing from "@/components/Pricing";
import AppointmentForm from "@/components/AppointmentForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsAndMarquee />
        <Services />
        <BeforeAfter />
        <Doctors />
        <Testimonials />
        <Schedule />
        <Pricing />
        <AppointmentForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
