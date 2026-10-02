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
  },
  {
    id: "pote-social-smoke-dulce-de-leche",
    marca: "Social Smoke",
    nome: "Dulce de Leche",
    descricao: "Doce de leite com notas de caramelo, de textura úmida.",
    foto: "/essencias/potes/social-smoke-dulce-de-leche.webp",
    preco: 105,
  },
  {
    id: "pote-fml-pure-tobacco",
    marca: "FML Pure Tobacco",
    nome: "FML",
    descricao: "Linha mentolada da Pure Tobacco, de sabor único.",
    foto: "/essencias/potes/fml-pure-tobacco.webp",
    preco: 119.99,
  },
];
