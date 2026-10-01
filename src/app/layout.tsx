import type { Metadata } from "next";
import { Anton, Cinzel, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { SiteShell } from "@/components/SiteShell";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MG Bebidas & Tabacaria",
  description:
    "Narguilé, essência boa, destilado e presente pra quem também merece. MG Bebidas & Tabacaria, em Cascavel - PR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${jost.variable} ${anton.variable}`}>
      <body className="bg-ground text-ink font-sans antialiased"><CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider></body>
    </html>
  );
}
