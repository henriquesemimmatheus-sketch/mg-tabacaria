import Image from "next/image";
import { Container } from "./Container";

// Só no computador: as garrafas e o narguilé que no celular flutuam no hero ficam lado a lado, sem sobrepor.
const itens = [
  { src: "/whisky/jack7.webp", w: 360, h: 1000, alt: "Jack Daniel's Old No. 7" },
  { src: "/whisky/jw-red.webp", w: 264, h: 1000, alt: "Johnnie Walker Red Label" },
  { src: "/narguile-flutuante.webp", w: 340, h: 1000, alt: "Narguilé" },
  { src: "/whisky/buchanans.webp", w: 514, h: 1000, alt: "Buchanan's" },
  { src: "/whisky/chivas.webp", w: 388, h: 1000, alt: "Chivas Regal" },
];

export function HomeShowcase() {
  return (
    <section aria-label="Destaques da casa" className="hidden border-t border-line py-14 lg:block">
      <Container>
        <ul className="flex items-end justify-center gap-14 xl:gap-20">
          {itens.map((i) => (
            <li key={i.src}>
              <Image
                src={i.src}
                alt={i.alt}
                width={i.w}
                height={i.h}
                className="h-80 w-auto drop-shadow-[0_18px_24px_rgba(0,0,0,0.6)]"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
