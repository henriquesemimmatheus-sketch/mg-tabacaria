import Image from "next/image";
import type { ComponentType } from "react";
import { Container } from "./Container";
import { GlassIcon, BeerMugIcon, GiftIcon } from "./icons";
import { whatsappLink } from "@/lib/business";

type Category = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
};

const beverages: Category[] = [
  {
    icon: BeerMugIcon,
    title: "Cerveja geladinha",
    text: "Sempre na régua certa de temperatura, pega e já abre, sem enrolação.",
  },
  {
    icon: GlassIcon,
    title: "Destilados selecionados",
    text: "Whisky, licor e rótulo especial pra qualquer ocasião, com novidade sempre chegando.",
  },
  {
    icon: GiftIcon,
    title: "Kits para presentear",
    text: "Combo pronto pra presentear com estilo, sem enrolação.",
  },
];

function Polaroid({
  src,
  alt,
  className,
  tape,
}: {
  src: string;
  alt: string;
  className: string;
  tape: string;
}) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className="relative w-20 bg-[#f4efe4] p-1.5 pb-5 shadow-2xl sm:w-24 sm:p-2 sm:pb-6" style={{ rotate: tape }}>
        <div className="absolute -top-2 left-1/2 h-5 w-10 -translate-x-1/2 -rotate-2 bg-[rgba(201,162,75,0.35)] backdrop-blur-[1px]" />
        <div className="relative aspect-square w-full overflow-hidden">
          <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

function Block({
  id,
  logo,
  logoAlt,
  description,
  items,
  message,
  cta,
  children,
}: {
  id: string;
  logo: string;
  logoAlt: string;
  description: string;
  items: Category[];
  message: string;
  cta?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="relative overflow-hidden border-b border-line py-20 sm:py-24">
      <Container>
        <div className="relative flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-8">
          <Image
            src={logo}
            alt={logoAlt}
            width={740}
            height={550}
            className="-ml-3 h-auto w-48 shrink-0 sm:w-60"
          />
          {items.length === 0 ? (
            <div>
              <p className="max-w-md font-condensed text-3xl uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">{description}</p>
              {cta && (
                <a
                  href={cta.href}
                  className="mt-5 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-medium text-ground transition-colors hover:bg-gold-bright"
                >
                  {cta.label}
                </a>
              )}
            </div>
          ) : (
            <p className="max-w-md leading-relaxed text-ink-muted">{description}</p>
          )}
          {children}
        </div>

        {items.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <a
              key={title}
              href={whatsappLink(`Olá! ${message} ${title.toLowerCase()}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-gold/40"
            >
              <Icon className="h-8 w-8 text-gold-bright" />
              <h3 className="mt-5 font-display text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
              <span className="mt-5 text-xs uppercase tracking-[0.15em] text-gold transition-colors group-hover:text-gold-bright">
                Chamar no WhatsApp →
              </span>
            </a>
          ))}
        </div>
        )}
      </Container>
    </section>
  );
}

export function Beverages() {
  return (
    <Block
      id="bebidas"
      logo="/logo-mg-bebidas.webp"
      logoAlt="MG Bebidas"
      description="Cerveja, destilados e kits. Sempre rolando novidade. Chama no WhatsApp pra saber o que tá disponível e o preço."
      items={beverages}
      message="Gostaria de saber mais sobre"
    >
      <Polaroid
        src="/heineken.jpg"
        alt="Heineken gelada"
        tape="6deg"
        className="right-2 top-0 z-10 hidden sm:block lg:right-6"
      />
      <Polaroid
        src="/jack-redbull.jpg"
        alt="Jack Daniel's com Red Bull"
        tape="-8deg"
        className="right-24 top-0 z-10 hidden lg:block"
      />
    </Block>
  );
}
