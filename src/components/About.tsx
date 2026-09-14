import Image from "next/image";
import { Container } from "./Container";
import { business } from "@/lib/business";

export function About() {
  return (
    <section id="sobre" className="border-b border-line py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold">
              Sobre a loja
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink text-balance">
              O point de quem sabe curtir o fim de semana
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed">
              A {business.name} é aquele point de quem gosta de reunir a galera, escolher a
              essência certa pro narguilé e abrir um rótulo especial pra comemorar. Sem
              enrolação: você chega, a gente te ajuda a montar a parada certa, e o resto é só
              curtir.
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Venda de bebidas alcoólicas proibida para menores de 18 anos.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm rounded-full border border-gold/25">
            <div className="absolute inset-8 rounded-full border border-gold/15" />
            <div
              className="absolute inset-16 overflow-hidden rounded-full border border-line"
              style={{ boxShadow: "inset 0 0 40px 10px rgba(11,10,9,0.85)" }}
            >
              <Image
                src="/bebida-icon.jpg"
                alt="Destilados selecionados na MG Tabacaria"
                fill
                sizes="(min-width: 640px) 224px, 192px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
