import type { Metadata } from "next";
import { CharcoalCatalog } from "@/components/CharcoalCatalog";
import { CategoryAbout } from "@/components/CategoryAbout";

export const metadata: Metadata = {
  title: "Carvão para narguilé em Cascavel | MG Tabacaria, Guarujá",
  description:
    "Carvão de coco para narguilé em Cascavel - PR, no Guarujá: Chacal, Rari e Unyt, em pacotes de 250 g, 500 g e 1 kg.",
};

export default function CarvoesPage() {
  return (
    <>
      <CharcoalCatalog />
      <CategoryAbout titulo="Carvão para narguilé em Cascavel">
        Na MG Bebidas & Tabacaria, no Guarujá, em Cascavel - PR, o carvão de coco para narguilé está disponível nas
        marcas Chacal, Rari e Unyt, em pacotes de 250 g, 500 g e 1 kg, conforme a marca. O catálogo mostra o formato,
        o tamanho e o preço de cada opção.
      </CategoryAbout>
    </>
  );
}
