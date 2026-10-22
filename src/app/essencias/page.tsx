import type { Metadata } from "next";
import { EssenciasTabs } from "@/components/EssenciasTabs";
import { CategoryAbout } from "@/components/CategoryAbout";

export const metadata: Metadata = {
  title: "Essências para narguilé em Cascavel | MG Tabacaria, Guarujá",
  description:
    "Essências para narguilé em Cascavel - PR, no Guarujá: Zomo, Ziggy, Ônix, Nay, Smyrna, Adalya e mais de 100 sabores. Filtre por perfil e marca.",
};

export default function EssenciasPage() {
  return (
    <>
      <EssenciasTabs />
      <CategoryAbout titulo="Essências para narguilé em Cascavel">
        A MG Bebidas & Tabacaria, no bairro Guarujá, em Cascavel - PR, reúne mais de cem sabores de essência para
        narguilé das marcas Zomo, Ziggy, Ônix, Nay, Smyrna, FM, Adalya, Primal e Sense, além de potes de 100 g das
        marcas FML Pure Tobacco e Social Smoke. Os sabores estão organizados por perfil (frutados, cítricos,
        mentolados, doces e especiais), com filtro por marca e por sabores gelados. Disponibilidade e preço
        atualizado são confirmados com a loja pelo WhatsApp.
      </CategoryAbout>
    </>
  );
}
