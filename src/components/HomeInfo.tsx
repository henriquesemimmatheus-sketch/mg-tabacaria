import Image from "next/image";
import { Container } from "./Container";
import { PinIcon, ClockIcon, WhatsAppIcon } from "./icons";
import { business, whatsappLink } from "@/lib/business";

// Rodapé da home: sobre a loja, localização, horário e WhatsApp.
export function HomeInfo() {
  const mapsQuery = encodeURIComponent(`${business.name}, ${business.address}, ${business.city}`);

  return (
    <section className="border-t border-line bg-surface/60 py-10 sm:py-14">
      <Container>
        <div id="sobre" className="scroll-mt-32 max-w-2xl">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Sobre a loja</span>
          <h2 className="mt-2 font-condensed text-3xl uppercase leading-none tracking-tight text-ink sm:text-5xl">
            O point de quem sabe curtir o fim de semana
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Aqui a galera se reúne, escolhe a essência certa pro narguilé e abre um rótulo especial pra comemorar. Sem
            enrolação: você chega e a gente ajuda a montar.
          </p>
        </div>

        <div id="localizacao" className="mt-8 grid scroll-mt-32 gap-4 sm:grid-cols-2">
          <div className="relative rounded-2xl border border-line bg-surface p-5">
            <div className="pointer-events-none absolute -top-10 right-3 z-10 w-24 rotate-6 rounded-sm bg-white p-1 shadow-2xl sm:-top-14 sm:w-32">
              <Image
                src="/placa-narguileiros.webp"
                alt="Placa de humor: atenção, área restrita, somente narguileiros"
                width={600}
                height={876}
                sizes="128px"
                className="h-auto w-full"
              />
            </div>
            <PinIcon className="h-6 w-6 text-gold-bright" />
            <h3 className="mt-3 font-display text-lg text-ink">Onde a gente tá</h3>
            <p className="mt-1 text-ink-muted">{business.address}</p>
            <p className="text-ink-muted">{business.city}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-sm uppercase tracking-[0.12em] text-gold hover:text-gold-bright"
            >
              Como chegar →
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5">
            <ClockIcon className="h-6 w-6 text-gold-bright" />
            <h3 className="mt-3 font-display text-lg text-ink">Horário de funcionamento</h3>
            <dl className="mt-1">
              {business.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink-muted">{h.day}</dt>
                  <dd className="text-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs text-ink-muted">Em feriados pode mudar. Confirme no WhatsApp antes de vir.</p>
          </div>
        </div>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold-bright px-6 text-base font-semibold text-ground transition-colors hover:bg-gold sm:text-lg"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp {business.whatsappDisplay}
        </a>
      </Container>
    </section>
  );
}
