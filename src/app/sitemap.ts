import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

const paginas = [
  { caminho: "", prioridade: 1 },
  { caminho: "/essencias", prioridade: 0.9 },
  { caminho: "/bebidas", prioridade: 0.9 },
  { caminho: "/carvoes", prioridade: 0.8 },
  { caminho: "/acessorios", prioridade: 0.8 },
  { caminho: "/presentes", prioridade: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paginas.map((p) => ({
    url: `${business.url}${p.caminho}`,
    changeFrequency: "weekly",
    priority: p.prioridade,
  }));
}
