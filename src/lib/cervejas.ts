import type { Acessorio } from "./acessorios";

// Cervejas em pack. Todas as fotos em /public/cervejas são quadradas (800x800), recortadas e centralizadas,
// pra aparecerem no mesmo tamanho no card. Sem preço, o card leva ao WhatsApp.
const pack = (id: string, nome: string, descricao: string, preco?: number): Acessorio => ({
  id: `cerveja-${id}`,
  nome,
  descricao,
  foto: `/cervejas/${id}.webp`,
  recorte: true,
  preco,
});

export const cervejas: Acessorio[] = [
  pack("colonia-12x350", "Colônia, 12 latas", "Cerveja pilsen. Pack com 12 latas de 350 ml.", 32.9),
  pack("heineken-8x269", "Heineken, 8 latas", "Lager puro malte. Pack com 8 latas de 269 ml.", 34.9),
  pack("heineken-long-neck-6", "Heineken Long Neck, 6 garrafas", "Lager puro malte. Pack com 6 garrafas de 330 ml.", 40.99),
  pack("amstel-12x350", "Amstel Lager, 12 latas", "Cerveja leve lager. Pack com 12 latas de 350 ml.", 41.9),
  pack("skol-12x350", "Skol Pilsen, 12 latas", "Pack com 12 latas de 350 ml.", 43.9),
  pack("skol-15x269", "Skol Pilsen, 15 latas", "Pack com 15 latas de 269 ml.", 44.9),
  pack("brahma-15x269", "Brahma Chopp, 15 latas", "Cerveja pilsen. Pack com 15 latas de 269 ml.", 44.9),
  pack("budweiser-12x350", "Budweiser, 12 latas", "Lager. Pack com 12 latas de 350 ml.", 51.9),
  pack("original-12x350", "Original, 12 latas", "Antarctica Original pilsen. Pack com 12 latas de 350 ml.", 54.9),
  pack("heineken-12x350", "Heineken, 12 latas", "Lager puro malte. Pack com 12 latas de 350 ml.", 63.9),
  pack("original-8x269", "Original, 8 latas", "Antarctica Original pilsen. Pack com 8 latas de 269 ml."),
];
