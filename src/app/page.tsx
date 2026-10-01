import { AgeGate } from "@/components/AgeGate";
import { PromoBar } from "@/components/PromoBar";
import { Marquee } from "@/components/Marquee";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Promotions } from "@/components/Promotions";
import { Beverages, Tobacco } from "@/components/Products";
import { WhiskyCatalog } from "@/components/WhiskyCatalog";
import { EssenceCatalog } from "@/components/EssenceCatalog";
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
        <WhiskyCatalog />
        <Marquee phrases={["Whisky", "Cerveja gelada", "Narguilé", "Essências", "Acessórios"]} />
        <Tobacco />
        <EssenceCatalog />
        <About />
        <Location />
        <Beverages />
      </main>
      <Footer />
      <CartBar />
      <CartDrawer />
      <WhatsAppFab />
    </>
  );
}
