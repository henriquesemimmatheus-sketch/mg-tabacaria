import type { Metadata } from "next";
import { ItemCatalog } from "@/components/ItemCatalog";
import { acessorios } from "@/lib/acessorios";

export const metadata: Metadata = {
  title: "Tabacaria e acessórios | MG Bebidas & Tabacaria",
  description: "Acessórios de narguilé, isqueiros e cinzeiros em Cascavel - PR.",
};

export default function AcessoriosPage() {
  return (
    <ItemCatalog
      eyebrow="Tabacaria"
      titulo="Acessórios"
      descricao="Tudo pra montar o narguilé. Toque em Consultar para saber disponibilidade e preço no WhatsApp."
      itens={acessorios}
      assunto="acessórios"
    />
  );
}
