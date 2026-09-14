import Image from "next/image";
import { Container, SectionHeading } from "./Container";
import { HookahIcon, LeafIcon, GlassIcon, GiftIcon, SparkleIcon } from "./icons";
import { whatsappLink } from "@/lib/business";

const categories = [
  {
    icon: HookahIcon,
    title: "Narguilés e acessórios",
    text: "Aparelho, mangueira, rosh e reposição pra manter o narguilé sempre no ponto.",
  },
  {
    icon: LeafIcon,
    title: "Essências e carvões",
    text: "Sabor pra todo gosto e carvão que aguenta o rolê inteiro.",
  },
  {
    icon: GlassIcon,
    title: "Destilados selecionados",
    text: "Whisky, licor e rótulo especial pra qualquer ocasião — ou pra nenhuma.",
  },
  {
    icon: GiftIcon,
    title: "Kits para presentear",
    text: "Combo pronto pra presentear com estilo, sem enrolação.",
  },
  {
    icon: SparkleIcon,
    title: "E mais",
    text: "Isqueiro, acessório e mais um monte de coisa — só chamar no WhatsApp.",
  },
];

export function Products() {
  return (
    <section id="produtos" className="relative border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Catálogo"
          title="O que tem pra você aqui"
          description="Sempre rolando novidade. Chama no WhatsApp pra saber o que tá disponível e o preço."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, title, text }) => (
            <a
              key={title}
              href={whatsappLink(`Olá! Gostaria de saber mais sobre ${title.toLowerCase()}.`)}
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
      </Container>

      <div className="pointer-events-none absolute -bottom-12 right-4 z-10 hidden sm:-bottom-16 sm:right-8 sm:block">
        <div
          className="relative h-32 w-32 overflow-hidden rounded-full border border-gold/30 sm:h-44 sm:w-44"
          style={{ boxShadow: "inset 0 0 40px 12px rgba(11,10,9,0.85)" }}
        >
          <Image
            src="/budweiser.png"
            alt="Destilados e bebidas geladas na MG Tabacaria"
            fill
            sizes="176px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
