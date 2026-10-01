import type { Metadata } from "next";
import { CharcoalCatalog } from "@/components/CharcoalCatalog";

export const metadata: Metadata = {
  title: "Carvões | MG Bebidas & Tabacaria",
  description: "Carvão para narguilé em pacotes de 250 g, 500 g e 1 kg.",
};

export default function CarvoesPage() {
  return <CharcoalCatalog />;
}
