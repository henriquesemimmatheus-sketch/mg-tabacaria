import type { Metadata } from "next";
import { EssenciasTabs } from "@/components/EssenciasTabs";

export const metadata: Metadata = {
  title: "Essências | MG Bebidas & Tabacaria",
  description: "Essências para narguilé em Cascavel - PR. Filtre por perfil de sabor e marca.",
};

export default function EssenciasPage() {
  return <EssenciasTabs />;
}
