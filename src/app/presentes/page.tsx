import type { Metadata } from "next";
import { ItemCatalog } from "@/components/ItemCatalog";
import { presentes } from "@/lib/presentes";

export const metadata: Metadata = {
  title: "Presentes | MG Bebidas & Tabacaria",
  description: "Kits para presentear, montados pela MG Bebidas & Tabacaria em Cascavel - PR.",
};

export default function PresentesPage() {
  return (
    <ItemCatalog
      eyebrow="Presentes"
      titulo="Kits para presentear"
      descricao="Combos prontos ou montados sob medida. Toque em Consultar para combinar com a loja no WhatsApp."
      itens={presentes}
      assunto="presentes"
    />
  );
}
