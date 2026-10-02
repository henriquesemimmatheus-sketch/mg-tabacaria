export type Pote = {
  id: string;
  marca: string;
  nome: string;
  /** Texto curto de apresentação do sabor/linha. Sem apelo de consumo nem de saúde. */
  descricao: string;
  /** Foto recortada em /public/essencias/potes. */
  foto: string;
  /** Preço em reais. */
  preco: number;
  /** Peso do pote (todos os da loja são de 100 g). */
  tamanho?: string;
};

// Essências de pote (importadas). Preços informados pelo dono em 02/10/2026.
export const potes: Pote[] = [
  {
    id: "pote-social-smoke-absolute-zero",
    marca: "Social Smoke",
    nome: "Absolute Zero",
    descricao: "Combinação de mentas geladas, com um toque adocicado.",
    foto: "/essencias/potes/social-smoke-absolute-zero.webp",
    preco: 105,
    tamanho: "100 g",
  },
  {
    id: "pote-social-smoke-dulce-de-leche",
    marca: "Social Smoke",
    nome: "Dulce de Leche",
    descricao: "Doce de leite com notas de caramelo, de textura úmida.",
    foto: "/essencias/potes/social-smoke-dulce-de-leche.webp",
    preco: 105,
    tamanho: "100 g",
  },
  {
    id: "pote-fml-pure-tobacco",
    marca: "FML Pure Tobacco",
    nome: "FML Red",
    descricao: "Menta gelada com toque de hortelã-pimenta, da linha mentolada da Pure Tobacco.",
    foto: "/essencias/potes/fml-pure-tobacco.webp",
    preco: 119.99,
    tamanho: "100 g",
  },
  {
    id: "pote-fml-green",
    marca: "FML Pure Tobacco",
    nome: "FML Green",
    descricao: "Menta intensa, da linha mentolada da Pure Tobacco.",
    foto: "/essencias/potes/fml-green.webp",
    preco: 119.99,
    tamanho: "100 g",
  },
];
