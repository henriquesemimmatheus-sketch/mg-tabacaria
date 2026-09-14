import type { Metadata } from "next";
import { Cinzel, Jost } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MG Tabacaria",
  description:
    "Narguilé, essência boa, destilado e presente pra quem também merece. MG Tabacaria, em Cascavel - PR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${jost.variable}`}>
      <body className="bg-ground text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
