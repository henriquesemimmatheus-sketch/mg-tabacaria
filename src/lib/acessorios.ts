export type Acessorio = {
  id: string;
  nome: string;
  descricao: string;
  /** Foto em /public. Sem foto, o card mostra o nome em destaque. */
  foto?: string;
  /** Foto recortada (fundo transparente): aparece inteira, sem cortar nas bordas. */
  recorte?: boolean;
  /** Preço em reais. Sem preço, o card leva ao WhatsApp para consultar. */
  preco?: number;
  /** Em promoção: aparece riscado ao lado do preço. */
  precoAntigo?: number;
};

// Lista provisória: só categorias da vitrine aprovada (acessórios de narguilé, isqueiros e cinzeiros).
// Para incluir um item com foto e preço, basta acrescentar aqui; com preço ele ganha botão de carrinho.
export const acessorios: Acessorio[] = [
  { id: "narguiles", nome: "Narguilés", descricao: "Modelos montados e completos, em vários tamanhos.", foto: "/narguile-hero.jpg" },
  { id: "mangueiras", nome: "Mangueiras", descricao: "Mangueiras para narguilé, de vários comprimentos e cores." },
  { id: "piteiras", nome: "Piteiras", descricao: "Piteiras individuais para o narguilé." },
  {
    id: "kaloud-luxx",
    nome: "Kaloud Luxx",
    descricao: "Controlador de calor em alumínio, com cabo, para usar sobre o fornilho.",
    foto: "/acessorios/kaloud-luxx.webp",
    preco: 19.99,
  },
  ...[
    ["dourado", "Dourado"],
    ["dourado-branco", "Dourado e branco"],
    ["roxo", "Roxo"],
    ["cobre", "Cobre"],
    ["grafite", "Grafite"],
    ["azul-marinho", "Azul-marinho e dourado"],
    ["verde", "Verde"],
    ["azul", "Azul"],
  ].map(([slug, cor]) => ({
    id: `rosh-seven-${slug}`,
    nome: `Rosh Seven Hookah ${cor}`,
    descricao: "Rosh de cerâmica esmaltada, da Seven Hookah.",
    foto: `/acessorios/rosh-seven-${slug}.webp`,
    preco: 69.99,
  })),
  ...[
    ["vermelho", "Vermelho"],
    ["azul-escuro", "Azul escuro"],
    ["azul-claro", "Azul claro"],
    ["branco", "Branco"],
    ["azul-royal", "Azul royal"],
    ["rosa", "Rosa"],
  ].map(([slug, cor]) => ({
    id: `rosh-seven-${slug}`,
    nome: `Rosh Seven Hookah ${cor}`,
    descricao: "Rosh de cerâmica esmaltada, da Seven Hookah.",
    foto: `/acessorios/rosh-seven-${slug}.webp`,
    preco: 55,
  })),
  ...[
    ["rosa", "Rosa"],
    ["azul-royal", "Azul royal"],
    ["cinza-azulado", "Cinza-azulado"],
    ["branco", "Branco"],
    ["azul-claro", "Azul claro"],
  ].map(([slug, cor]) => ({
    id: `rosh-simples-${slug}`,
    nome: `Rosh de cerâmica ${cor}`,
    descricao: "Rosh de cerâmica esmaltada, modelo simples.",
    foto: `/acessorios/rosh-simples-${slug}.webp`,
    preco: 19.99,
  })),
  {
    id: "rosh-muka-bowl-preto",
    nome: "Rosh Muka Bowl Preto",
    descricao: "Rosh de cerâmica da Muka Bowl, esmaltado em preto.",
    foto: "/acessorios/rosh-muka-bowl-preto.webp",
    preco: 59.99,
  },
  {
    id: "rosh-muka-bowl-branco",
    nome: "Rosh Muka Bowl Branco",
    descricao: "Rosh de cerâmica da Muka Bowl, esmaltado em branco.",
    foto: "/acessorios/rosh-muka-bowl-branco.webp",
    preco: 59.99,
  },
  {
    id: "acendedor-pequeno",
    nome: "Acendedor pequeno",
    descricao: "Acendedor elétrico de carvão, tamanho pequeno. Há versões 110v e 220v: informe a voltagem no pedido.",
    foto: "/acessorios/acendedor-pequeno.webp",
    preco: 29.99,
  },
  {
    id: "acendedor-grande",
    nome: "Acendedor grande",
    descricao: "Acendedor elétrico de carvão, tamanho grande. Há versões 110v e 220v: informe a voltagem no pedido.",
    foto: "/acessorios/acendedor-grande.webp",
    preco: 35,
  },
  { id: "fornilhos", nome: "Outros fornilhos", descricao: "Outros modelos de fornilho e rosh. Consulte as opções." },
  { id: "pratos", nome: "Pratos para narguilé", descricao: "Vários modelos e cores de pratos, como o Sultan Curvyzz da foto. Consulte as opções disponíveis.", foto: "/acessorios/prato-sultan-curvyzz.webp", recorte: true },
  { id: "pincas", nome: "Pinças", descricao: "Pinças para manusear o carvão." },
  { id: "isqueiros", nome: "Isqueiros", descricao: "Isqueiros de vários modelos." },
  { id: "cinzeiros", nome: "Cinzeiros", descricao: "Cinzeiros para casa ou para a mesa." },
];
