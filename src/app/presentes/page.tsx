import type { Metadata } from "next";
import { ItemCatalog } from "@/components/ItemCatalog";
import { CategoryAbout } from "@/components/CategoryAbout";
import { presentes } from "@/lib/presentes";

export const metadata: Metadata = {
  title: "Kits para presentear em Cascavel | MG Bebidas & Tabacaria",
  description:
    "Kit narguilé, kit destilado e kits personalizados em Cascavel - PR, montados pela MG Bebidas & Tabacaria, no Guarujá.",
};

export default function PresentesPage() {
  return (
    <>
      <ItemCatalog
        eyebrow="Presentes"
        titulo="Kits para presentear"
        descricao="Combos prontos ou montados sob medida. Toque em Consultar para combinar com a loja no WhatsApp."
        itens={presentes}
        assunto="presentes"
      />
      <CategoryAbout titulo="Kits para presentear em Cascavel">
        A MG Bebidas & Tabacaria, no bairro Guarujá, em Cascavel - PR, monta o kit narguilé, o kit destilado e kits
        personalizados, prontos ou sob medida. Os detalhes de cada kit são combinados com a loja pelo WhatsApp.
      </CategoryAbout>
    </>
  );
}
