import type { Metadata } from "next";
import { Anton, Cinzel, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { SiteShell } from "@/components/SiteShell";
import { business } from "@/lib/business";

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

const description =
  "Narguilé, essência boa, destilado e presente pra quem também merece. MG Bebidas & Tabacaria, em Cascavel - PR.";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: "MG Bebidas & Tabacaria | Narguilé, essências e bebidas em Cascavel - PR",
    template: "%s",
  },
  description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: business.name,
    title: "MG Bebidas & Tabacaria | Cascavel - PR",
    description,
  },
  twitter: { card: "summary_large_image" },
};

// Dados estruturados para o Google entender a loja (endereço, horário, contato).
const lojaJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: business.name,
  url: business.url,
  telephone: "+" + business.whatsappNumber,
  image: `${business.url}/logo-mg-tabacaria.webp`,
  sameAs: [business.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address,
    addressLocality: "Cascavel",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "14:00",
    closes: "01:00",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${jost.variable} ${anton.variable}`}>
      <body className="bg-ground text-ink font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lojaJsonLd) }}
        />
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider></body>
    </html>
  );
}
