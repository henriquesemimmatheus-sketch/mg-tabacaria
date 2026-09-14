import Image from "next/image";
import { Container, SectionHeading } from "./Container";
import { PinIcon, ClockIcon, WhatsAppIcon } from "./icons";
import { business, whatsappLink } from "@/lib/business";

export function Location() {
  const mapsQuery = encodeURIComponent(`${business.name}, ${business.address}, ${business.city}`);

  return (
    <section id="localizacao" className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Bora visitar" title="Onde a gente tá" />
        <div className="relative mt-12 grid gap-6 sm:grid-cols-2">
          <div className="relative rounded-2xl border border-line bg-surface p-7">
            <PinIcon className="h-6 w-6 text-gold-bright" />
            <h3 className="mt-4 font-display text-lg text-ink">Endereço</h3>
            <p className="mt-2 text-ink-muted">{business.address}</p>
            <p className="text-ink-muted">{business.city}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-xs uppercase tracking-[0.15em] text-gold hover:text-gold-bright"
            >
              Como chegar →
            </a>

            <div className="pointer-events-none absolute -top-6 right-4 z-10 sm:-top-20 sm:right-0">
              <div className="relative w-28 rotate-[-6deg] bg-[#f4efe4] p-2.5 pb-8 shadow-2xl sm:w-40 sm:p-3 sm:pb-10">
                <div className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 rotate-3 bg-[rgba(201,162,75,0.35)] backdrop-blur-[1px] sm:h-7 sm:w-16" />
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/woody-narguile.jpg"
                    alt="Cliente satisfeito com o narguilé da MG Tabacaria"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-7">
            <ClockIcon className="h-6 w-6 text-gold-bright" />
            <h3 className="mt-4 font-display text-lg text-ink">Horário de funcionamento</h3>
            <dl className="mt-3 space-y-1.5">
              {business.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink-muted">{h.day}</dt>
                  <dd className="text-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-ink-muted">
              Horário pode variar em feriados e datas especiais — confirme com a gente no WhatsApp antes de vir.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gold hover:text-gold-bright"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Falar antes de vir →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
