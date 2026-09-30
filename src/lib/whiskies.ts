export type Whisky = {
  id: string;
  name: string;
  kind: string;
  origin: string;
  age?: string;
  price?: number; // em reais; sem preço, o card só convida a consultar
  notes: string[];
  blurb: string;
  image: string;
  photo?: string; // foto real da loja; quando existe, o slide mostra a foto no lugar do recorte
  glow: string; // cor do brilho atrás da garrafa
};

export const whiskies: Whisky[] = [
  {
    id: "jack-daniels-no7",
    name: "Jack Daniel's Old No. 7",
    kind: "Tennessee Whiskey",
    origin: "Estados Unidos",
    price: 159.9,
    notes: ["Baunilha", "Caramelo", "Toque defumado"],
    blurb: "Filtrado em carvão de bordo antes de envelhecer. O clássico pra tomar puro, com gelo ou com cola.",
    image: "/whisky/jack7.webp",
    glow: "#b8651b",
  },
  {
    id: "jack-daniels-honey",
    name: "Jack Daniel's Honey",
    kind: "Whiskey com mel",
    origin: "Estados Unidos",
    price: 159.9,
    notes: ["Mel", "Baunilha", "Suave"],
    blurb: "O Tennessee Whiskey com mel. Doce na medida, bom pra quem tá começando no whisky.",
    image: "/whisky/honey.webp",
    glow: "#c98a2b",
  },
  {
    id: "jack-daniels-fire",
    name: "Jack Daniel's Fire",
    kind: "Whiskey com canela",
    origin: "Estados Unidos",
    price: 159.9,
    notes: ["Canela", "Calor", "Doce picante"],
    blurb: "Tennessee Whiskey com licor de canela. Esquenta a garganta e pede uma dose gelada.",
    image: "/whisky/fire.webp",
    glow: "#c2321c",
  },
  {
    id: "jack-daniels-blackberry",
    name: "Jack Daniel's Blackberry",
    kind: "Whiskey com amora",
    origin: "Estados Unidos",
    price: 159.9,
    notes: ["Amora", "Doce", "Suave"],
    blurb: "Tennessee Whiskey com licor de amora. Frutado, fácil de beber e ótimo em drinks.",
    image: "/whisky/blackberry.webp",
    glow: "#7a3a9a",
  },
  {
    id: "jack-daniels-apple",
    name: "Jack Daniel's Maçã Verde",
    kind: "Whiskey com maçã",
    origin: "Estados Unidos",
    price: 159.9,
    notes: ["Maçã verde", "Fresco", "Levemente ácido"],
    blurb: "Tennessee Whiskey com licor de maçã verde. Refrescante, combina com gelo e limão.",
    image: "/whisky/apple.webp",
    glow: "#4a9a3e",
  },
  {
    id: "johnnie-walker-red",
    name: "Johnnie Walker Red Label",
    kind: "Blended Scotch",
    origin: "Escócia",
    price: 109.9,
    notes: ["Frutas", "Especiarias", "Fumaça leve"],
    blurb: "Escocês vivo e de corpo firme. Aguenta gelo e mistura bem em drinks.",
    image: "/whisky/jw-red.webp",
    glow: "#a8301f",
  },
  {
    id: "johnnie-walker-gold",
    name: "Johnnie Walker Gold Label Reserve",
    kind: "Blended Scotch",
    origin: "Escócia",
    price: 299,
    notes: ["Mel", "Cremoso", "Frutas secas"],
    blurb: "Escocês macio e sedoso, dos que se toma devagar. Presente que impressiona.",
    image: "/whisky/jw-gold.webp",
    glow: "#c99a3b",
  },
  {
    id: "chivas-12",
    name: "Chivas Regal 12",
    kind: "Blended Scotch",
    origin: "Escócia",
    age: "12 anos",
    price: 189.9,
    notes: ["Mel", "Frutas maduras", "Cremoso"],
    blurb: "Macio e arredondado. Dos que agradam até quem não é de whisky.",
    image: "/whisky/chivas.webp",
    glow: "#b5762a",
  },
  {
    id: "buchanans-12",
    name: "Buchanan's De Luxe 12",
    kind: "Blended Scotch",
    origin: "Escócia",
    age: "12 anos",
    price: 199.9,
    notes: ["Mel", "Baunilha", "Frutas secas"],
    blurb: "Escocês suave e encorpado na garrafa verde inconfundível. Um dos preferidos pra presentear.",
    image: "/whisky/buchanans.webp",
    glow: "#5a8f3a",
  },
  {
    id: "passport-scotch",
    name: "Passport Scotch",
    kind: "Blended Scotch",
    origin: "Escócia",
    price: 55.9,
    notes: ["Suave", "Malte", "Toque frutado"],
    blurb: "Escocês leve e fácil de beber, bom pra quem tá começando. Vai bem com gelo e em drinks.",
    image: "/whisky/passport.webp",
    glow: "#6aa83a",
  },
  {
    id: "white-horse",
    name: "White Horse",
    kind: "Blended Scotch",
    origin: "Escócia",
    price: 89.9,
    notes: ["Malte", "Mel", "Fumaça leve"],
    blurb: "Escocês clássico, leve e equilibrado, com um toque sutil de fumaça. Bom pra tomar com gelo ou misturar.",
    image: "/whisky/whitehorse.webp",
    glow: "#e0b020",
  },
];
