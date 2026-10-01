import type { Metadata } from "next";
import { EssenceCatalog } from "@/components/EssenceCatalog";

export const metadata: Metadata = {
  title: "Essências | MG Bebidas & Tabacaria",
  description: "Essências para narguilé em Cascavel - PR. Filtre por perfil de sabor e marca.",
};

export default function EssenciasPage() {
  return <EssenceCatalog />;
}
