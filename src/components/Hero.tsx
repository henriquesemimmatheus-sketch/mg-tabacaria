import Image from "next/image";
import { Container } from "./Container";
import { WhatsAppIcon } from "./icons";
import { business, whatsappLink } from "@/lib/business";

// Garrafas cortadas pelas bordas. No celular ficam discretas pra não brigar com o texto.
const floaters = [
  {
    src: "/whisky/jack7.webp",
    w: 360,
    h: 1000,
    className: "-left-5 top-[34%] w-20 opacity-50 sm:hidden lg:left-auto lg:right-[26%] lg:top-[30%] lg:block lg:w-32 lg:opacity-95",
    rotate: "-12deg",
    dur: "8s",
    delay: "0s",
  },
  {
    src: "/whisky/jw-red.webp",
    w: 264,
    h: 1000,
    className: "-right-4 top-[26%] w-16 opacity-50 sm:-right-5 sm:w-20 sm:opacity-90 lg:right-[7%] lg:top-[24%] lg:w-28 lg:opacity-95",
    rotate: "14deg",
    dur: "9.5s",
    delay: "-3s",
  },
  {
    src: "/whisky/buchanans.webp",
    w: 514,
    h: 1000,
    className: "hidden lg:right-[15%] lg:bottom-[8%] lg:block lg:w-40",
    rotate: "8deg",
    dur: "10s",
    delay: "-5s",
  },
  {
    src: "/whisky/chivas.webp",
    w: 388,
    h: 1000,
    className: "hidden lg:-right-4 lg:bottom-[22%] lg:block lg:w-32",
    rotate: "-10deg",
    dur: "8.5s",
    delay: "-1.5s",
  },
];

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
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {floaters.map((f) => (
          <div key={f.src} className={`absolute ${f.className}`}>
            <div
              className="float-bottle"
              style={{ "--r": f.rotate, "--dur": f.dur, "--delay": f.delay } as React.CSSProperties}
            >
              <Image src={f.src} alt="" width={f.w} height={f.h} className="h-auto w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        ))}
      </div>
      <Container className="relative pb-24 pt-6 sm:pb-32 sm:pt-10">
        <div className="mb-10 flex items-start justify-between sm:mb-14">
          <a href="#bebidas" aria-label="Ver MG Bebidas" className="-ml-2 block sm:-ml-4">
            <Image
              src="/logo-mg-bebidas.webp"
              alt="MG Bebidas"
              width={740}
              height={550}
              priority
              className="h-auto w-36 sm:w-56 lg:w-64"
            />
          </a>
          <a href="#tabacaria" aria-label="Ver MG Tabacaria" className="-mr-2 block sm:-mr-4">
            <Image
              src="/logo-mg-tabacaria.webp"
              alt="MG Tabacaria"
              width={740}
              height={550}
              priority
              className="h-auto w-36 sm:w-56 lg:w-64"
            />
          </a>
        </div>
        <div>
          <div className="lg:w-[58%]">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold">
              Narguilé · Destilados · Rolê de fim de semana
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
              <a
                href="#bebidas"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-gold hover:text-gold-bright"
              >
                Ver produtos
              </a>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
