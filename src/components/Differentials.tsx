import { Container, SectionHeading } from "./Container";
import { ShieldCheckIcon, SparkleIcon, LeafIcon, GiftIcon, WhatsAppIcon } from "./icons";

const items = [
  {
    icon: ShieldCheckIcon,
    title: "Original de verdade, sem historinha",
    text: "Muito lugar por aí vende bebida e essência falsificada. Aqui é tudo original, com procedência garantida.",
  },
  {
    icon: SparkleIcon,
    title: "Seleção boa de verdade",
    text: "Marca e essência escolhidas pra quem já manja — e pra quem tá começando a explorar.",
  },
  {
    icon: LeafIcon,
    title: "Atendimento que entende do rolê",
    text: "Equipe manja de narguilé e destilado e te ajuda a montar a combinação certa.",
  },
  {
    icon: GiftIcon,
    title: "Presente que impressiona",
    text: "Kits e itens avulsos pra presentear quem também curte um bom narguilé ou um rótulo especial.",
  },
  {
    icon: WhatsAppIcon,
    title: "Compra rápida no WhatsApp",
    text: "Fala com a gente, tira as dúvidas e já combina a retirada, tudo numa conversa só.",
  },
];

export function Differentials() {
  return (
    <section className="border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Por que a MG"
          title="A gente entende do assunto"
          description="Cada coisa que vende aqui foi escolhida a dedo — pra você acertar de primeira, sem perrengue."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-gold/40"
            >
              <Icon className="h-7 w-7 text-gold-bright" />
              <h3 className="mt-5 font-display text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
