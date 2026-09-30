export type Promocao = {
  id: string;
  /** Texto curto que aparece na barra do topo. */
  texto: string;
  /** Link opcional (âncora da página ou URL). */
  link?: string;
  /** Último dia da promoção, no formato AAAA-MM-DD. Depois dessa data a barra some sozinha. */
  ate?: string;
};

// Lista vazia = a barra do topo não aparece.
export const promocoes: Promocao[] = [{ id: "cerveja-quente", texto: "cerveja quente, muié gelada!" }];

export function promocoesAtivas(hoje: Date = new Date()): Promocao[] {
  const dia = hoje.toISOString().slice(0, 10);
  return promocoes.filter((p) => !p.ate || p.ate >= dia);
}
