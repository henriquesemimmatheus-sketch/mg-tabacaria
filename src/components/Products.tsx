import Image from "next/image";
import { Container, SectionHeading } from "./Container";
import { HookahIcon, LeafIcon, GlassIcon, BeerMugIcon, GiftIcon, SparkleIcon } from "./icons";
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
    icon: BeerMugIcon,
    title: "Cerveja geladinha",
    text: "Sempre na régua certa de temperatura — pega e já abre, sem enrolação.",
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

      <div className="pointer-events-none absolute -top-8 right-4 z-10 hidden sm:-top-10 sm:right-10 sm:block">
        <div className="relative w-32 rotate-[5deg] bg-[#f4efe4] p-2.5 pb-8 shadow-2xl sm:w-44 sm:p-3 sm:pb-10">
          <div className="absolute -top-2.5 left-1/2 h-6 w-14 -translate-x-1/2 -rotate-2 bg-[rgba(201,162,75,0.35)] backdrop-blur-[1px] sm:-top-3 sm:h-7 sm:w-16" />
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src="/heineken.jpg"
              alt="Heineken gelada na MG Tabacaria"
              fill
              sizes="224px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
