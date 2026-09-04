import { useCallback, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Services from "./components/Services";
import Vip from "./components/Vip";
import Gallery from "./components/Gallery";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import { ContactFab, ContactModal } from "./components/Contact";
import { Cursor, Marquee, NoiseOverlay, Preloader } from "./components/ui";
import { MARQUEE, MARQUEE_VIP } from "./data";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [service, setService] = useState("rhinoplasty");

  const reserve = useCallback((id: string) => {
    setService(id);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <div className="min-h-screen bg-white text-ink">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <Cursor />
      <NoiseOverlay />

      <Header onContact={openContact} />

      <main>
        <Hero />
        <Marquee items={MARQUEE} />
        <Story />
        <Services onReserve={reserve} />
        <Marquee items={MARQUEE_VIP} dark />
        <Vip onReserve={reserve} />
        <Gallery />
        <Booking service={service} onServiceChange={setService} onContact={openContact} />
      </main>

      <Footer onContact={openContact} />

      <ContactFab onClick={openContact} />
      <ContactModal open={contactOpen} onClose={closeContact} />
    </div>
  );
}
