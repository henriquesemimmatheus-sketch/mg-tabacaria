import { fotos } from "./essencias-fotos";

export type Familia =
  | "vermelhas"
  | "tropicais"
  | "uvas"
  | "frutas_outras"
  | "citricos"
  | "mentolado"
  | "doces"
  | "especiais";

export type Essencia = {
  id: string;
  marca: string;
  nome: string;
  familia: Familia;
  gelado: boolean;
  /** true = mistura de sabores; false = sabor único. */
  mistura: boolean;
  /** Preço interno da planilha. NÃO é exibido no site. */
  preco: number;
  /** Foto da embalagem, quando existe. */
  foto?: string;
  /** Intensidade, se um dia a planilha trouxer essa informação (hoje não existe, então o guia não pergunta). */
  forca?: "suave" | "forte";
  /** Observação interna da planilha. Nunca aparece no site. */
  revisar?: string;
};

export const familias: { id: Familia; label: string }[] = [
  { id: "vermelhas", label: "Frutas vermelhas" },
  { id: "tropicais", label: "Tropicais" },
  { id: "uvas", label: "Uvas e melões" },
  { id: "frutas_outras", label: "Maçã, pera e outras" },
  { id: "citricos", label: "Cítricos" },
  { id: "mentolado", label: "Mentolados" },
  { id: "doces", label: "Doces" },
  { id: "especiais", label: "Especiais e misturas" },
];

// marca;nome;perfil;gelado;preço;mistura(1=mistura, 0=sabor único);observação
const RAW = `
Zomo;Mint (Strong Mint);mentolado;sim;10,00;1;
Zomo;Hype;especiais;nao;10,00;0;conferir descricao do sabor
Zomo;Stone;especiais;nao;10,00;0;conferir descricao do sabor
Zomo;Swiss Alps;mentolado;sim;10,00;0;conferir descricao do sabor
Zomo;Milkshake de Banana;doces;nao;10,00;0;
Zomo;Chiclete Tutti Frutti;doces;nao;10,00;0;
Zomo;Melão;uvas;nao;10,00;0;
Zomo;Maracujá;tropicais;nao;10,00;0;
Zomo;Abacaxi;tropicais;nao;10,00;0;
Zomo;Mint;mentolado;sim;10,00;0;possivel duplicado de Mint (Strong Mint)
Zomo;Melancia;uvas;nao;10,00;0;
Zomo;Uva;uvas;nao;10,00;0;
Zomo;Cereja;vermelhas;nao;10,00;0;
Zomo;Ice Gum;doces;sim;10,00;0;
Zomo;Blueberry;vermelhas;nao;10,00;0;
Zomo;Uva (Max);uvas;nao;10,00;1;possivel variacao de Uva
Zomo;Bala de Morango;doces;nao;10,00;0;
Zomo;Gum Mint;doces;sim;10,00;0;
Nay;Pineapple Grape;tropicais;nao;12,00;0;
Nay;Melão e Melancia;uvas;nao;12,00;1;
Nay;Maracujá Blend;tropicais;nao;12,00;1;
Nay;Red Blend;vermelhas;nao;12,00;1;
Nay;Chiclete de Canela;doces;nao;12,00;0;
Nay;Snow;mentolado;sim;12,00;0;
Nay;Blueberry Mint;vermelhas;sim;12,00;0;
Nay;Melancia;uvas;nao;12,00;0;
Nay;Bubble Grape;doces;nao;12,00;0;
Nay;66;especiais;sim;12,00;0;conferir descricao do sabor
Nay;Mythos;especiais;nao;12,00;0;conferir descricao do sabor
Nay;Néctar Blend;frutas_outras;nao;12,00;1;
Nay;Mint;mentolado;sim;12,00;0;
Nay;Melon Blend;uvas;nao;12,00;1;
Nay;Maracujá Goiaba;tropicais;nao;12,00;1;item novo adicionado com a foto enviada; conferir perfil e gelado
Ônix;Apple;frutas_outras;nao;12,00;0;
Ônix;Pear;frutas_outras;nao;12,00;0;
Ônix;Strawberry Ice;vermelhas;sim;12,00;0;
Ônix;Mango;tropicais;nao;12,00;0;
Ônix;Danon;doces;nao;12,00;0;
Ônix;Drops;doces;nao;12,00;0;
Ônix;Melancia;uvas;nao;12,00;0;
Ônix;Coco e Limão;citricos;nao;12,00;1;
Ônix;High Cherry;vermelhas;nao;12,00;0;
Ônix;High Tutti;frutas_outras;nao;12,00;0;
Ônix;High Lemon;citricos;nao;12,00;0;
Ônix;Ice Mint;mentolado;sim;12,00;0;
Ônix;Goiaba Maracujá;tropicais;nao;12,00;0;
Ônix;Yellow Drops;doces;nao;12,00;0;
Ônix;Grape;uvas;nao;12,00;0;
Ônix;Banana e Açaí;tropicais;nao;12,00;1;
Ônix;Star Coffee;doces;nao;12,00;0;
Ônix;Orange;citricos;nao;12,00;0;
Ônix;X Mint;mentolado;sim;12,00;0;
Ônix;Blue Uva;uvas;nao;12,00;0;
Ônix;Melão;uvas;nao;12,00;0;
Ônix;High Fusion;especiais;nao;12,00;0;conferir descricao do sabor
Ônix;Uruguai (Yogurt);doces;nao;12,00;1;
Ônix;França (Ruby Crush);vermelhas;nao;12,00;1;
Ônix;Argentina (Morango e Laranja);vermelhas;nao;12,00;1;
Ônix;Brasil (Chocomenta);doces;sim;12,00;1;
Ônix;Espanha (Uva Verde);uvas;nao;12,00;1;
Ônix;Itália (Uva Roxa);uvas;nao;12,00;1;
Ônix;Inglaterra (Pera e Limão);frutas_outras;nao;12,00;1;
Ônix;Alemanha (Kiwi e Morango);vermelhas;nao;12,00;1;
Sense;Pera Ice;frutas_outras;sim;12,00;0;
Sense;Melancia e Framboesa;vermelhas;nao;12,00;1;
Sense;Kiwi Melão Ice;uvas;sim;12,00;0;
Sense;Candy Strawberry Ice;doces;sim;12,00;0;
Sense;Baunilha Mix;doces;nao;12,00;1;
Sense;Absolut Mint;mentolado;sim;12,00;0;
Sense;Uva Ice;uvas;sim;12,00;0;
Sense;Banana;tropicais;nao;12,00;0;
Sense;Tutti Frutti Ice;frutas_outras;sim;12,00;0;
Sense;Mexerica Ice;citricos;sim;12,00;0;
Sense;Hortelã Ice;mentolado;sim;12,00;0;
Sense;Green Lemon Ice;citricos;sim;12,00;0;
Sense;Maracujá Ice;tropicais;sim;12,00;0;
Sense;Morango e Melancia;vermelhas;nao;12,00;1;
Sense;Cereja Ice;vermelhas;sim;12,00;0;
Sense;Melancia Ice;uvas;sim;12,00;0;
Ziggy;Duas Goiabas;tropicais;nao;12,00;1;
Ziggy;Morango e Laranja;vermelhas;nao;12,00;1;
Ziggy;Frutas Roxas;uvas;nao;12,00;1;
Ziggy;Frutas Amarelas;frutas_outras;nao;12,00;1;
Ziggy;Duas Maçãs Verdes;frutas_outras;nao;12,00;1;
Ziggy;Manga Tropical;tropicais;nao;12,00;1;
Ziggy;Yogurt;doces;nao;12,00;0;
Ziggy;Berry;vermelhas;nao;12,00;0;
Ziggy;Red Lemonade;citricos;nao;12,00;0;
Ziggy;Burley Mint;mentolado;sim;12,00;0;
Ziggy;Hapocalyx Mint;mentolado;sim;12,00;0;
Ziggy;Frutti;frutas_outras;nao;12,00;0;
Ziggy;Tropical;tropicais;nao;12,00;1;
Ziggy;Fresh Lemon;citricos;sim;12,00;0;
Ziggy;Morango Tropical;tropicais;nao;12,00;1;
Ziggy;Banana Tropical;tropicais;nao;12,00;1;
Ziggy;Fresh Melon;uvas;nao;12,00;0;
Ziggy;Abacaxi Tropical;tropicais;nao;12,00;1;
Ziggy;Cherry;vermelhas;nao;12,00;0;
Ziggy;Edição da Copa (Laranja e Limão);citricos;nao;12,00;1;edicao limitada, conferir disponibilidade
Ziggy;Fresh 66;especiais;sim;12,00;0;conferir descricao do sabor
Ziggy;Grape;uvas;nao;12,00;0;
Ziggy;Watermelon Bomb;uvas;nao;12,00;0;
Ziggy;Yellow;frutas_outras;nao;12,00;0;
Ziggy;Chocomenta;doces;sim;12,00;0;
Ziggy;Coffee Cream;doces;nao;12,00;0;
Ziggy;Pink Lemonade;citricos;nao;12,00;0;
Smyrna;Melancia e Morango;vermelhas;nao;13,00;1;
Smyrna;Uva Menta;uvas;sim;13,00;0;
Smyrna;Abacaxi Limão;citricos;nao;13,00;0;
Smyrna;Melancia Kiwi;uvas;nao;13,00;0;
Smyrna;Menta Suprema;mentolado;sim;13,00;0;
Smyrna;True Love;especiais;nao;15,00;0;preco diferente (R$ 15,00); conferir descricao
Primal;Melão com Uva;uvas;nao;12,00;1;
Primal;Laranja com Manga;tropicais;nao;12,00;1;
Primal;Blueberry Ice;vermelhas;sim;12,00;0;
Primal;Menta;mentolado;sim;12,00;0;
Adalya;Love 66;especiais;sim;18,00;0;preco R$ 18,00; conferir descricao do sabor
FM;Menta Vermelha;mentolado;sim;11,00;0;
FM;Menta Verde;mentolado;sim;11,00;0;
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
    const [marca, nome, familia, gelado, preco, mistura, ...obs] = linha.split(";");
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
      mistura: mistura === "1",
      preco: Number(preco.replace(",", ".")),
      ...(fotos[id] ? { foto: fotos[id] } : {}),
      ...(observacao ? { revisar: observacao } : {}),
    };
  });

export const marcas = Array.from(new Set(essencias.map((e) => e.marca)));
