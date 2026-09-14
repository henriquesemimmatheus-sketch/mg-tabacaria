import Image from "next/image";
import { Container } from "./Container";
import { WhatsAppIcon } from "./icons";
import { business, whatsappLink } from "@/lib/business";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(201,162,75,0.16), transparent 60%), radial-gradient(45% 40% at 10% 100%, rgba(201,162,75,0.1), transparent 60%)",
        }}
      />
      <Container className="relative py-24 sm:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold">
              Narguilé · Destilados · Rolê de fim de semana
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold text-ink text-balance">
              Tudo pronto pra iniciar o fim de semana
            </h1>
            <p className="mt-6 max-w-lg text-ink-muted leading-relaxed">
              Narguilé montado, essência boa, aquele destilado que não pode faltar e um
              presente pra quem também merece. A {business.name} resolve tudo pra você.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-ground transition-colors hover:bg-gold-bright"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
                Chamar no WhatsApp
              </a>
              <a
                href="#produtos"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-gold hover:text-gold-bright"
              >
                Ver produtos
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
            <div className="absolute inset-0 rounded-full border border-gold/30" />
            <div className="absolute inset-6 rounded-full border border-gold/20" />
            <div
              className="absolute inset-12 overflow-hidden rounded-full border border-line"
              style={{
                boxShadow: "inset 0 0 40px 10px rgba(11,10,9,0.85)",
              }}
            >
              <Image
                src="/narguile-hero.jpg"
                alt="Narguilé montado na MG Tabacaria"
                fill
                sizes="(min-width: 640px) 320px, 256px"
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-6 -left-4 z-10 sm:-bottom-8 sm:-left-8">
              <div className="relative w-28 rotate-[-6deg] bg-[#f4efe4] p-2.5 pb-8 shadow-2xl sm:w-40 sm:p-3 sm:pb-10">
                <div className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 rotate-3 bg-[rgba(201,162,75,0.35)] backdrop-blur-[1px] sm:h-7 sm:w-16" />
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/woody-jack.jpg"
                    alt="Cliente brindando com Jack Daniel's na MG Tabacaria"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
