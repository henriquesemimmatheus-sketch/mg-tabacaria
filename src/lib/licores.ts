import type { Acessorio } from "./acessorios";

// Licores e destilados com foto real da loja. Preço = botão de carrinho.
const lista: Acessorio[] = [
  { id: "dreher", nome: "Dreher", descricao: "Tradição centenária, desde 1910. 700ml.", foto: "/licores/dreher.webp", preco: 27.99 },
  { id: "bob-pinga", nome: "Bob Pinga", descricao: "Sabor agave, rum e ervas. 975ml.", foto: "/licores/bob-pinga.webp", preco: 29.99 },
  { id: "baianinha-maracuja", nome: "Baianinha Maracujá", descricao: "Coquetel alcoólico, servir gelado. 900ml.", foto: "/licores/baianinha-maracuja.webp", preco: 20.99 },
  { id: "baianinha-amendoim", nome: "Baianinha Amendoim", descricao: "Coquetel alcoólico, servir gelado. 900ml.", foto: "/licores/baianinha-amendoim.webp", preco: 20.99 },
  { id: "licor-1985", nome: "Licor 1985", descricao: "O licor dos copão, cítrico. Beba gelado. 750ml.", foto: "/licores/licor-1985.webp", preco: 69.99 },
  { id: "busca-brisa", nome: "Busca Brisa", descricao: "Psico Spirit com rum, cogumelos, agave e botânicos. 1L.", foto: "/licores/busca-brisa.webp", preco: 45 },
  { id: "campari", nome: "Campari", descricao: "Bitter italiano de Milão. 748ml.", foto: "/licores/campari.webp", preco: 59.99 },
  { id: "jagermeister", nome: "Jägermeister", descricao: "Licor de ervas com 56 botânicos. 1L.", foto: "/licores/jagermeister.webp", preco: 159.99 },
  { id: "ballena", nome: "Ballena Morango", descricao: "Cream tequila de morango, beba bem gelado. 750ml.", foto: "/licores/ballena.webp", preco: 109.9, precoAntigo: 149.99 },
];

// Exibição: itens em promoção (com precoAntigo) primeiro; dentro de cada grupo, do mais caro para o mais barato.
export const licores: Acessorio[] = [...lista].sort(
  (a, b) => Number(b.precoAntigo !== undefined) - Number(a.precoAntigo !== undefined) || (b.preco ?? 0) - (a.preco ?? 0),
);
