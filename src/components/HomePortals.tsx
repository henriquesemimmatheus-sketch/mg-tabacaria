import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { essencias } from "@/lib/essencias";

type Portal = {
  href: string;
  titulo: string;
  legenda: string;
  /** Foto de fundo (cobre o bloco todo). */
  foto?: string;
  posicao?: string;
  /** Recortes de produto sobre um fundo colorido, quando não há foto de loja. */
  recortes?: { src: string; className: string }[];
  fundo: string;
  grande?: boolean;
};

const portais: Portal[] = [
  {
    href: "/essencias",
    titulo: "Essências",
    legenda: `${essencias.length} sabores, de frutados a mentolados`,
    fundo: "radial-gradient(80% 90% at 50% 30%, #6b2a3a, #1c1218 80%)",
    recortes: [
      { src: "/essencias/essencia-onix-strawberry-ice.webp", className: "left-[8%] top-[6%] w-[26%] -rotate-6" },
      { src: "/essencias/essencia-ziggy-watermelon-bomb.webp", className: "left-[36%] top-[0%] w-[30%] z-10" },
      { src: "/essencias/essencia-sense-maracuja-ice.webp", className: "right-[8%] top-[6%] w-[26%] rotate-6" },
    ],
    grande: true,
  },
  {
    href: "/carvoes",
    titulo: "Carvões",
    legenda: "Chacal, Rari e Unyt",
    fundo: "radial-gradient(80% 80% at 50% 30%, #6e3b14, #191412 80%)",
    recortes: [
      { src: "/carvoes/chacal.webp", className: "left-[6%] top-[12%] w-[62%] -rotate-3" },
      { src: "/carvoes/rari.webp", className: "right-[4%] top-[28%] w-[30%] rotate-6 z-10" },
    ],
  },
  {
    href: "/acessorios",
    titulo: "Acessórios",
    legenda: "Narguilé e tudo pra montar",
    foto: "/narguile-hero.jpg",
    posicao: "50% 35%",
    fundo: "#171412",
  },
  {
    href: "/bebidas",
    titulo: "Bebidas",
    legenda: "Whisky, cerveja e destilados",
    foto: "/jack-redbull.jpg",
    posicao: "50% 55%",
    fundo: "#171412",
  },
  {
    href: "/presentes",
    titulo: "Presentes",
    legenda: "Kits pra presentear",
    fundo: "radial-gradient(80% 80% at 50% 30%, #5b2a63, #17121a 80%)",
    recortes: [
      { src: "/whisky/honey.webp", className: "left-[8%] top-[10%] w-[24%] -rotate-6" },
      { src: "/whisky/jack7.webp", className: "left-[38%] top-[5%] w-[24%] z-10" },
      { src: "/whisky/apple.webp", className: "right-[8%] top-[10%] w-[24%] rotate-6" },
    ],
  },
];

export function HomePortals() {
  return (
    <section id="categorias" className="scroll-mt-32 py-8 sm:py-14">
      <Container>
        <h2 className="font-condensed text-4xl uppercase leading-none tracking-tight text-ink sm:text-6xl">
          O que você <span className="text-gold-bright">procura?</span>
        </h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-6">
          {portais.map((p, i) => (
            <li key={p.href} className={i === 0 ? "col-span-2 lg:col-span-3" : i === 1 ? "lg:col-span-3" : "lg:col-span-2"}>
              <Link
                href={p.href}
                className={`group relative block overflow-hidden rounded-2xl border border-gold/40 transition-colors hover:border-gold-bright ${
                  i === 0 ? "aspect-[16/10] lg:aspect-[16/9]" : i === 1 ? "aspect-[4/5] lg:aspect-[16/9]" : "aspect-[4/5] lg:aspect-square"
                }`}
                style={{ background: p.fundo }}
              >
                {p.foto && (
                  <Image
                    src={p.foto}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 380px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: p.posicao }}
                  />
                )}
                {p.recortes?.map((r) => (
                  <Image
                    key={r.src}
                    src={r.src}
                    alt=""
                    width={300}
                    height={450}
                    sizes="200px"
                    className={`absolute h-auto object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.55)] ${r.className}`}
                  />
                ))}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <span className="block font-condensed text-3xl uppercase leading-none tracking-wide text-ink sm:text-4xl">
                    {p.titulo}
                  </span>
                  <span className="mt-1 flex items-center justify-between gap-2 text-xs leading-tight text-ink/85 sm:text-sm">
                    {p.legenda}
                    <span aria-hidden="true" className="text-lg text-gold-bright transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
