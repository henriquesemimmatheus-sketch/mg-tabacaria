import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { WhatsAppIcon } from "./icons";
import { HeroFloaters } from "./HeroFloaters";
import { HeroSmoke } from "./HeroSmoke";
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
      <HeroFloaters />
      <HeroSmoke />
      <Container className="relative pb-24 pt-6 sm:pb-32 sm:pt-10">
        <div className="mb-10 flex items-start justify-between sm:mb-14">
          <Link href="/bebidas" aria-label="Ver MG Bebidas" className="-ml-2 block sm:-ml-4">
            <Image
              src="/logo-mg-bebidas.webp"
              alt="MG Bebidas"
              width={740}
              height={550}
              priority
              className="h-auto w-36 sm:w-56 lg:w-64"
            />
          </Link>
          <Link href="/acessorios" aria-label="Ver MG Tabacaria" className="-mr-2 block sm:-mr-4">
            <Image
              src="/logo-mg-tabacaria.webp"
              alt="MG Tabacaria"
              width={740}
              height={550}
              priority
              className="h-auto w-36 sm:w-56 lg:w-64"
            />
          </Link>
        </div>
        <div>
          <div className="lg:w-[58%]">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold">
              Narguilé · Essências · Destilados · Cervejas · Escolhas com bom gosto
            </span>
            <h1 className="mt-5 font-condensed text-5xl uppercase leading-[0.98] tracking-tight text-ink text-balance sm:text-7xl lg:text-[5.25rem]">
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
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-ground"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
                Chamar no WhatsApp
              </a>
              <Link
                href="/bebidas"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-gold hover:text-gold-bright"
              >
                Ver bebidas
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
