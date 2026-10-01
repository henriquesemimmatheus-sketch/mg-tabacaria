export type Promocao = {
  id: string;
  /** Texto curto que aparece na barra do topo. */
  texto: string;
  /** Link opcional da barra (âncora da página ou URL). */
  link?: string;
  /** Último dia da promoção, no formato AAAA-MM-DD. Depois dessa data ela some sozinha. */
  ate?: string;
  /**
   * Se existir, a promoção também vira um card na seção "Promoções".
   * Só `texto` = aparece apenas na barra do topo.
   */
  card?: {
    titulo: string;
    descricao?: string;
    /** Arte da promoção, em /public. */
    imagem: string;
    /** Proporção da arte, pra reservar o espaço antes de carregar. */
    largura: number;
    altura: number;
    /** Preço promocional em reais. Sem preço, o card só mostra o botão do WhatsApp. */
    preco?: number;
    precoAntigo?: number;
  };
};

// Lista vazia = a barra do topo e a seção de promoções não aparecem.
export const promocoes: Promocao[] = [
  {
    id: "rari-2-essencias",
    texto: "2 essências + 500g de carvão Rari por R$ 37,99",
    link: "#promocoes",
    card: {
      titulo: "2 essências + 500g de carvão Rari",
      descricao: "Promoção da MG Tabacaria: duas essências e meio quilo de carvão Rari de coco.",
      imagem: "/promo-rari.webp",
      largura: 663,
      altura: 726,
      preco: 37.99,
    },
  },
];

export function promocoesAtivas(hoje: Date = new Date()): Promocao[] {
  const dia = hoje.toISOString().slice(0, 10);
  return promocoes.filter((p) => !p.ate || p.ate >= dia);
}

export function promocoesComCard(hoje: Date = new Date()) {
  return promocoesAtivas(hoje).filter((p): p is Promocao & { card: NonNullable<Promocao["card"]> } => !!p.card);
}
