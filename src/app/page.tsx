import { AgeGate } from "@/components/AgeGate";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Differentials } from "@/components/Differentials";
import { Products } from "@/components/Products";
import { About } from "@/components/About";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <AgeGate />
      <Header />
      <main>
        <Hero />
        <Differentials />
        <Products />
        <About />
        <Location />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
