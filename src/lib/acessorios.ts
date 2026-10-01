export type Acessorio = {
  id: string;
  nome: string;
  descricao: string;
  /** Foto em /public. Sem foto, o card mostra o nome em destaque. */
  foto?: string;
  /** Preço em reais. Sem preço, o card leva ao WhatsApp para consultar. */
  preco?: number;
};

// Lista provisória: só categorias da vitrine aprovada (acessórios de narguilé, isqueiros e cinzeiros).
// Para incluir um item com foto e preço, basta acrescentar aqui; com preço ele ganha botão de carrinho.
export const acessorios: Acessorio[] = [
  { id: "narguiles", nome: "Narguilés", descricao: "Modelos montados e completos, em vários tamanhos.", foto: "/narguile-hero.jpg" },
  { id: "mangueiras", nome: "Mangueiras", descricao: "Mangueiras para narguilé, de vários comprimentos e cores." },
  { id: "piteiras", nome: "Piteiras", descricao: "Piteiras individuais para o narguilé." },
  { id: "fornilhos", nome: "Fornilhos", descricao: "Fornilhos e rosh para colocar a essência." },
  { id: "pratos", nome: "Pratos e bases", descricao: "Pratos e bases para apoiar o fornilho." },
  { id: "pincas", nome: "Pinças", descricao: "Pinças para manusear o carvão." },
  { id: "isqueiros", nome: "Isqueiros", descricao: "Isqueiros de vários modelos." },
  { id: "cinzeiros", nome: "Cinzeiros", descricao: "Cinzeiros para casa ou para a mesa." },
];
