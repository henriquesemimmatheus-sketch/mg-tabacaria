export type TamanhoCarvao = {
  /** Rótulo do tamanho, como aparece no botão. Ex.: "250 g", "500 g", "1 kg". */
  peso: string;
  /** Preço em reais. Sem preço, o site mostra "Consultar preço" e leva ao WhatsApp. */
  preco?: number;
};

export type Carvao = {
  id: string;
  marca: string;
  nome: string;
  descricao?: string;
  /** Foto do pacote em /public (fundo transparente). Sem foto, aparece o nome da marca. */
  foto?: string;
  /** Proporção da foto (largura / altura), pra moldura acompanhar o formato e a foto preencher quase tudo. */
  fotoProporcao?: number;
  tamanhos: TamanhoCarvao[];
};

// Para incluir outra marca ou produto, basta acrescentar um item aqui.
export const carvoes: Carvao[] = [
  {
    id: "chacal",
    marca: "Chacal",
    nome: "Carvão Chacal",
    foto: "/carvoes/chacal.webp",
    fotoProporcao: 704 / 464,
    descricao: "Carvão de fibra de coco ecológico, em três tamanhos de pacote.",
    tamanhos: [
      { peso: "250 g", preco: 12.99 },
      { peso: "500 g", preco: 21.99 },
      { peso: "1 kg", preco: 31.99 },
    ],
  },
  {
    id: "rari",
    marca: "Rari",
    nome: "Carvão Rari",
    foto: "/carvoes/rari.webp",
    fotoProporcao: 465 / 704,
    descricao: "Carvão de coco em formato hexagonal, em dois tamanhos de pacote.",
    tamanhos: [
      { peso: "500 g", preco: 17.99 },
      { peso: "1 kg", preco: 33.99 },
    ],
  },
  {
    id: "unyt",
    marca: "Unyt",
    nome: "Carvão Unyt",
    foto: "/carvoes/unyt.webp",
    fotoProporcao: 704 / 493,
    descricao: "Carvão de coco 100% natural para narguilé, em formato hexagonal.",
    tamanhos: [{ peso: "1 kg", preco: 32.99 }],
  },
];
