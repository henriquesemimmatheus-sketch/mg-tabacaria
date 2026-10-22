import { Container } from "./Container";

// Texto curto no fim de cada categoria: dá ao Google (e a quem lê) o contexto da seção, sem imperativo de consumo.
export function CategoryAbout({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10 sm:py-12">
      <Container>
        <div className="max-w-3xl">
          <h2 className="font-display text-xl text-ink sm:text-2xl">{titulo}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{children}</p>
        </div>
      </Container>
    </section>
  );
}
