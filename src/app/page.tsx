import { AgeGate } from "@/components/AgeGate";
import { PromoBar } from "@/components/PromoBar";
import { Marquee } from "@/components/Marquee";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Promotions } from "@/components/Promotions";
import { Differentials } from "@/components/Differentials";
import { Beverages, Tobacco } from "@/components/Products";
import { WhiskyCatalog } from "@/components/WhiskyCatalog";
import { About } from "@/components/About";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";
import { CartBar } from "@/components/CartBar";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <AgeGate />
      <div className="sticky top-0 z-40">
        <PromoBar />
        <Header />
      </div>
      <main>
        <Hero />
        <Marquee phrases={["MG Bebidas", "MG Tabacaria", "Presentes", "Bom papo", "A loja da noite boa"]} />
        <Promotions />
        <Beverages />
        <WhiskyCatalog />
        <Marquee phrases={["Whisky", "Cerveja gelada", "Narguilé", "Essências", "Acessórios"]} />
        <Tobacco />
        <About />
        <Location />
        <Differentials />
      </main>
      <Footer />
      <CartBar />
      <CartDrawer />
      <WhatsAppFab />
    </>
  );
}
