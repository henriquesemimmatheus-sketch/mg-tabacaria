import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { WhatsAppIcon } from "./icons";
import { HeroSmoke } from "./HeroSmoke";
import { whatsappLink } from "@/lib/business";

function Polaroid({
  src,
  alt,
  rotate,
  className = "",
  contain,
}: {
  src: string;
  alt: string;
  rotate: string;
  className?: string;
  contain?: boolean;
}) {
  return (
    <div
      className={`relative w-[5.5rem] shrink-0 bg-[#f4efe4] p-1.5 pb-6 shadow-2xl shadow-black/60 sm:w-40 sm:p-2 sm:pb-8 ${className}`}
      style={{ rotate }}
    >
      <div className="absolute -top-2 left-1/2 h-4 w-10 -translate-x-1/2 -rotate-2 bg-[rgba(201,162,75,0.45)]" />
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden ${
          contain ? "bg-[radial-gradient(circle_at_50%_40%,#3a2f22,#171412)]" : ""
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 640px) 150px, 100px"
          className={contain ? "object-contain p-2" : "object-cover"}
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-8rem)] flex-col overflow-hidden border-b border-line">
      <Image
        src="/narguile-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_35%] opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 45% at 85% 0%, rgba(231,138,60,0.28), transparent 65%), radial-gradient(60% 40% at 5% 55%, rgba(155,60,120,0.22), transparent 65%), linear-gradient(to bottom, rgba(19,17,16,0.55), rgba(19,17,16,0.92) 85%)",
        }}
      />
      <HeroSmoke />
      <Container className="relative flex flex-1 flex-col justify-center gap-4 py-5 sm:gap-6 sm:py-14">
        <div>
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold-bright">
            MG Bebidas & Tabacaria · Cascavel
          </span>
          <h1 className="mt-3 font-condensed text-5xl uppercase leading-[0.95] tracking-tight text-ink text-balance sm:text-8xl">
            A loja da <span className="text-gold-bright">noite boa</span>
          </h1>
          <p className="mt-3 max-w-md text-base leading-snug sm:text-lg text-ink/85">
            Essências, carvão, bebidas e presentes num só lugar. Bom papo, boa companhia e fim de semana começando.
          </p>
        </div>

        <div className="relative -mx-2 flex items-center justify-center py-2 sm:justify-start" role="group" aria-label="Momentos na loja">
          <Polaroid src="/woody-jack.jpg" alt="Boneco Woody entre garrafas de Jack Daniel's" rotate="-8deg" className="translate-y-2" />
          <Polaroid src="/essencias/essencia-ziggy-watermelon-bomb.webp" alt="Essência Ziggy Watermelon Bomb" rotate="4deg" className="z-10 -ml-5 -translate-y-1" contain />
          <Polaroid src="/jack-redbull.jpg" alt="Garrafa de Jack Daniel's com latas geladas" rotate="-3deg" className="z-20 -ml-5 translate-y-2" />
          <Polaroid src="/woody-narguile.jpg" alt="Boneco Woody com um narguilé" rotate="9deg" className="-ml-5 hidden sm:block" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/essencias"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-gold-bright px-8 text-lg font-semibold text-ground shadow-[0_0_28px_rgba(231,200,119,0.45)] transition-colors hover:bg-gold"
          >
            Ver essências
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-gold px-8 text-lg font-medium text-ink transition-colors hover:border-gold-bright hover:text-gold-bright"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Falar no WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
