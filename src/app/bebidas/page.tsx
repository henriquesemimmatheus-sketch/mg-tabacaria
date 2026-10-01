import type { Metadata } from "next";
import { WhiskyCatalog } from "@/components/WhiskyCatalog";
import { Beverages } from "@/components/Products";

export const metadata: Metadata = {
  title: "Bebidas | MG Bebidas & Tabacaria",
  description: "Whisky, cerveja gelada e destilados selecionados em Cascavel - PR.",
};

export default function BebidasPage() {
  return (
    <>
      <WhiskyCatalog />
      <Beverages />
    </>
  );
}
