import type { Metadata } from "next";
import { WhiskyCatalog } from "@/components/WhiskyCatalog";
import { ItemCatalog } from "@/components/ItemCatalog";
import { licores } from "@/lib/licores";
import { Beverages } from "@/components/Products";

export const metadata: Metadata = {
  title: "Bebidas | MG Bebidas & Tabacaria",
  description: "Whisky, cerveja gelada e destilados selecionados em Cascavel - PR.",
};

export default function BebidasPage() {
  return (
    <>
      <WhiskyCatalog />
      <ItemCatalog
        secundario
        eyebrow="Licores e destilados"
        titulo="Pra beber gelado"
        descricao="Rótulos da casa com preço. Adicione ao carrinho e finalize pelo WhatsApp."
        itens={licores}
        assunto="licores"
      />
      <Beverages />
    </>
  );
}
