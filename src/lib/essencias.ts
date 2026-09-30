export type Familia =
  | "frutas"
  | "mentolado"
  | "doces_sobremesas"
  | "citricos"
  | "especiais_misturas"
  | "bebidas";

export type Essencia = {
  id: string;
  marca: string;
  nome: string;
  familia: Familia;
  gelado: boolean;
  /** Preço por unidade, em reais (vem da coluna preco_interno da planilha; conferir antes de divulgar). */
  preco: number;
  /** Observação interna da planilha. Nunca aparece no site. */
  revisar?: string;
};

export const familias: { id: Familia; label: string }[] = [
  { id: "frutas", label: "Frutas" },
  { id: "mentolado", label: "Mentolado" },
  { id: "doces_sobremesas", label: "Doces e sobremesas" },
  { id: "citricos", label: "Cítricos" },
  { id: "especiais_misturas", label: "Especiais e misturas" },
  { id: "bebidas", label: "Bebidas" },
];

// marca;nome;família;gelado;preço;observação
const RAW = `
Zomo;Mint (Strong Mint);mentolado;sim;10,00;
Zomo;Hype;especiais_misturas;nao;10,00;conferir descricao do sabor
Zomo;Stone;especiais_misturas;nao;10,00;conferir descricao do sabor
Zomo;Swiss Alps;mentolado;sim;10,00;conferir descricao do sabor
Zomo;Milkshake de Banana;doces_sobremesas;nao;10,00;
Zomo;Chiclete Tutti Frutti;doces_sobremesas;nao;10,00;
Zomo;Melão;frutas;nao;10,00;
Zomo;Maracujá;frutas;nao;10,00;
Zomo;Abacaxi;frutas;nao;10,00;
Zomo;Mint;mentolado;sim;10,00;possivel duplicado de Mint (Strong Mint)
Zomo;Melancia;frutas;nao;10,00;
Zomo;Uva;frutas;nao;10,00;
Zomo;Cereja;frutas;nao;10,00;
Zomo;Ice Gum;doces_sobremesas;sim;10,00;
Zomo;Blueberry;frutas;nao;10,00;
Zomo;Uva (Max);frutas;nao;10,00;possivel variacao de Uva
Zomo;Bala de Morango;doces_sobremesas;nao;10,00;
Zomo;Gum Mint;doces_sobremesas;sim;10,00;
Nay;Pineapple Grape;frutas;nao;12,00;
Nay;Melão e Melancia;frutas;nao;12,00;
Nay;Maracujá Blend;frutas;nao;12,00;
Nay;Red Blend;frutas;nao;12,00;
Nay;Chiclete de Canela;doces_sobremesas;nao;12,00;
Nay;Snow;mentolado;sim;12,00;
Nay;Blueberry Mint;frutas;sim;12,00;
Nay;Melancia;frutas;nao;12,00;
Nay;Bubble Grape;doces_sobremesas;nao;12,00;
Nay;66;especiais_misturas;sim;12,00;conferir descricao do sabor
Nay;Mythos;especiais_misturas;nao;12,00;conferir descricao do sabor
Nay;Néctar Blend;frutas;nao;12,00;
Nay;Mint;mentolado;sim;12,00;
Nay;Melon Blend;frutas;nao;12,00;
Ônix;Apple;frutas;nao;12,00;
Ônix;Pear;frutas;nao;12,00;
Ônix;Strawberry Ice;frutas;sim;12,00;
Ônix;Mango;frutas;nao;12,00;
Ônix;Danon;doces_sobremesas;nao;12,00;
Ônix;Drops;doces_sobremesas;nao;12,00;
Ônix;Melancia;frutas;nao;12,00;
Ônix;Coco e Limão;citricos;nao;12,00;
Ônix;High Cherry;frutas;nao;12,00;
Ônix;High Tutti;frutas;nao;12,00;
Ônix;High Lemon;citricos;nao;12,00;
Ônix;Ice Mint;mentolado;sim;12,00;
Ônix;Goiaba Maracujá;frutas;nao;12,00;
Ônix;Yellow Drops;doces_sobremesas;nao;12,00;
Ônix;Grape;frutas;nao;12,00;
Ônix;Banana e Açaí;frutas;nao;12,00;
Ônix;Star Coffee;doces_sobremesas;nao;12,00;
Ônix;Orange;citricos;nao;12,00;
Ônix;X Mint;mentolado;sim;12,00;
Ônix;Blue Uva;frutas;nao;12,00;
Ônix;Melão;frutas;nao;12,00;
Ônix;High Fusion;especiais_misturas;nao;12,00;conferir descricao do sabor
Ônix;Uruguai (Yogurt);doces_sobremesas;nao;12,00;
Ônix;França (Ruby Crush);frutas;nao;12,00;
Ônix;Argentina (Morango e Laranja);frutas;nao;12,00;
Ônix;Brasil (Chocomenta);doces_sobremesas;sim;12,00;
Ônix;Espanha (Uva Verde);frutas;nao;12,00;
Ônix;Itália (Uva Roxa);frutas;nao;12,00;
Ônix;Inglaterra (Pera e Limão);frutas;nao;12,00;
Ônix;Alemanha (Kiwi e Morango);frutas;nao;12,00;
Sense;Pera Ice;frutas;sim;12,00;
Sense;Melancia e Framboesa;frutas;nao;12,00;
Sense;Kiwi Melão Ice;frutas;sim;12,00;
Sense;Candy Strawberry Ice;doces_sobremesas;sim;12,00;
Sense;Baunilha Mix;doces_sobremesas;nao;12,00;
Sense;Absolut Mint;mentolado;sim;12,00;
Sense;Uva Ice;frutas;sim;12,00;
Sense;Banana;frutas;nao;12,00;
Sense;Tutti Frutti Ice;frutas;sim;12,00;
Sense;Mexerica Ice;citricos;sim;12,00;
Sense;Hortelã Ice;mentolado;sim;12,00;
Sense;Green Lemon Ice;citricos;sim;12,00;
Sense;Maracujá Ice;frutas;sim;12,00;
Sense;Morango e Melancia;frutas;nao;12,00;
Sense;Cereja Ice;frutas;sim;12,00;
Sense;Melancia Ice;frutas;sim;12,00;
Ziggy;Duas Goiabas;frutas;nao;12,00;
Ziggy;Morango e Laranja;frutas;nao;12,00;
Ziggy;Frutas Roxas;frutas;nao;12,00;
Ziggy;Frutas Amarelas;frutas;nao;12,00;
Ziggy;Duas Maçãs Verdes;frutas;nao;12,00;
Ziggy;Manga Tropical;frutas;nao;12,00;
Ziggy;Yogurt;doces_sobremesas;nao;12,00;
Ziggy;Berry;frutas;nao;12,00;
Ziggy;Red Lemonade;bebidas;nao;12,00;
Ziggy;Burley Mint;mentolado;sim;12,00;
Ziggy;Hapocalyx Mint;mentolado;sim;12,00;
Ziggy;Frutti;frutas;nao;12,00;
Ziggy;Tropical;frutas;nao;12,00;
Ziggy;Fresh Lemon;citricos;sim;12,00;
Ziggy;Morango Tropical;frutas;nao;12,00;
Ziggy;Banana Tropical;frutas;nao;12,00;
Ziggy;Fresh Melon;frutas;nao;12,00;
Ziggy;Abacaxi Tropical;frutas;nao;12,00;
Ziggy;Cherry;frutas;nao;12,00;
Ziggy;Edição da Copa (Laranja e Limão);citricos;nao;12,00;edicao limitada, conferir disponibilidade
Ziggy;Fresh 66;especiais_misturas;sim;12,00;conferir descricao do sabor
Ziggy;Grape;frutas;nao;12,00;
Ziggy;Watermelon Bomb;frutas;nao;12,00;
Ziggy;Yellow;frutas;nao;12,00;
Ziggy;Chocomenta;doces_sobremesas;sim;12,00;
Ziggy;Coffee Cream;doces_sobremesas;nao;12,00;
Ziggy;Pink Lemonade;bebidas;nao;12,00;
Smyrna;Melancia e Morango;frutas;nao;13,00;
Smyrna;Uva Menta;frutas;sim;13,00;
Smyrna;Abacaxi Limão;citricos;nao;13,00;
Smyrna;Melancia Kiwi;frutas;nao;13,00;
Smyrna;Menta Suprema;mentolado;sim;13,00;
Smyrna;True Love;especiais_misturas;nao;15,00;preco diferente (R$ 15,00); conferir descricao
Primal;Melão com Uva;frutas;nao;12,00;
Primal;Laranja com Manga;frutas;nao;12,00;
Primal;Blueberry Ice;frutas;sim;12,00;
Primal;Menta;mentolado;sim;12,00;
Adalya;Love 66;especiais_misturas;sim;18,00;preco R$ 18,00; conferir descricao do sabor
FM;Menta Vermelha;mentolado;sim;11,00;
FM;Menta Verde;mentolado;sim;11,00;
`;

function slug(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const vistos = new Map<string, number>();

export const essencias: Essencia[] = RAW.split("\n")
  .map((l) => l.trim())
  .filter(Boolean)
  .map((linha) => {
    const [marca, nome, familia, gelado, preco, ...obs] = linha.split(";");
    let id = `essencia-${slug(marca)}-${slug(nome)}`;
    const n = (vistos.get(id) ?? 0) + 1;
    vistos.set(id, n);
    if (n > 1) id += `-${n}`;
    const observacao = obs.join(";").trim();
    return {
      id,
      marca,
      nome,
      familia: familia as Familia,
      gelado: gelado === "sim",
      preco: Number(preco.replace(",", ".")),
      ...(observacao ? { revisar: observacao } : {}),
    };
  });

export const marcas = Array.from(new Set(essencias.map((e) => e.marca)));
