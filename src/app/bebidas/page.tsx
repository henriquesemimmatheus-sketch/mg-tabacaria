import type { Metadata } from "next";
import { WhiskyCatalog } from "@/components/WhiskyCatalog";
import { ItemCatalog } from "@/components/ItemCatalog";
import { licores } from "@/lib/licores";
import { Beverages } from "@/components/Products";
import { CategoryAbout } from "@/components/CategoryAbout";

export const metadata: Metadata = {
  title: "Whisky, licores e cerveja gelada em Cascavel | MG Bebidas, Guarujá",
  description:
    "Whisky, licores, destilados, vinhos e cerveja gelada em Cascavel - PR, no Guarujá. Jack Daniel's, Johnnie Walker, Chivas Regal e mais. Venda proibida para menores de 18 anos.",
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
      <CategoryAbout titulo="Bebidas em Cascavel">
        A MG Bebidas & Tabacaria, no bairro Guarujá, em Cascavel - PR, tem whiskies como Jack Daniel&apos;s, Johnnie
        Walker, Chivas Regal, Buchanan&apos;s e Passport; licores e destilados como Jägermeister, Campari, Licor 43,
        Sheridan&apos;s, Smirnoff e a linha Eternity Gin; vinhos Reservado e cerveja gelada. Venda proibida para
        menores de 18 anos. Se beber, não dirija.
      </CategoryAbout>
    </>
  );
}
