import type { Metadata } from "next";
import { ItemCatalog } from "@/components/ItemCatalog";
import { CategoryAbout } from "@/components/CategoryAbout";
import { acessorios } from "@/lib/acessorios";

export const metadata: Metadata = {
  title: "Acessórios de narguilé e tabacaria em Cascavel | MG Tabacaria",
  description:
    "Narguilés, mangueiras, piteiras, fornilhos, pratos, pinças, isqueiros e cinzeiros em Cascavel - PR, no Guarujá.",
};

export default function AcessoriosPage() {
  return (
    <>
      <ItemCatalog
        eyebrow="Tabacaria"
        titulo="Acessórios"
        descricao="Tudo pra montar o narguilé. Toque em Consultar para saber disponibilidade e preço no WhatsApp."
        itens={acessorios}
        assunto="acessórios"
      />
      <CategoryAbout titulo="Acessórios de narguilé e tabacaria em Cascavel">
        A MG Bebidas & Tabacaria, no Guarujá, em Cascavel - PR, tem narguilés, mangueiras, piteiras, o Kaloud Luxx,
        fornilhos Rosh e Muka Bowl, pratos, pinças, acendedores, isqueiros e cinzeiros. Disponibilidade e preço são
        confirmados com a loja pelo WhatsApp.
      </CategoryAbout>
    </>
  );
}
