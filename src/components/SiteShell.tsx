import { AgeGate } from "@/components/AgeGate";
import { PromoBar } from "@/components/PromoBar";
import { Header } from "@/components/Header";
import { BackBar } from "@/components/BackBar";
import { Footer } from "@/components/Footer";
import { CartBar } from "@/components/CartBar";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

// Estrutura comum a todas as páginas: portão 18+, faixa de promoções, menu fixo, carrinho e WhatsApp.
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AgeGate />
      <PromoBar />
      <Header />
      <BackBar />
      <main>{children}</main>
      <Footer />
      <CartBar />
      <CartDrawer />
      <WhatsAppFab />
    </>
  );
}
