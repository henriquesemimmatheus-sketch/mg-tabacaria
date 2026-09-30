"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container, SectionHeading } from "./Container";
import { ChevronIcon, WhatsAppIcon } from "./icons";
import { whiskies } from "@/lib/whiskies";
import { whatsappLink } from "@/lib/business";
import { useCart, formatBRL } from "@/lib/cart";

export function WhiskyCatalog() {
  const [index, setIndex] = useState(0);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { add, items } = useCart();
  const whisky = whiskies[index];
  const inCart = items.find((i) => i.id === whisky.id)?.qty ?? 0;

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex(Math.min(whiskies.length - 1, Math.max(0, i)));
  }

  function goTo(i: number) {
    const el = scroller.current;
    if (!el) return;
    const next = Math.min(whiskies.length - 1, Math.max(0, i));
    setIndex(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  }

  function addToCart() {
    if (whisky.price === undefined) return;
    add({ id: whisky.id, name: whisky.name, price: whisky.price, image: whisky.image });
    setJustAdded(whisky.id);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setJustAdded(null), 1600);
  }

  return (
    <section id="whiskies" className="relative overflow-hidden border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Catálogo"
          title="Whiskies"
          description="Deslize para o lado e escolha o rótulo. Adicione ao carrinho o que quiser levar."
        />

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md">
            <div
              ref={scroller}
              onScroll={onScroll}
              onKeyDown={onKeyDown}
              tabIndex={0}
              role="group"
              aria-roledescription="carrossel"
              aria-label="Whiskies"
              className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright [&::-webkit-scrollbar]:hidden"
            >
              {whiskies.map((w, i) => (
                <div
                  key={w.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${whiskies.length}: ${w.name}`}
                  className="relative flex h-[24rem] min-w-full snap-center items-end justify-center sm:h-[32rem]"
                >
                  {w.photo ? (
                    <div className="relative mb-2 h-[96%] w-[88%] overflow-hidden rounded-2xl border border-line">
                      <Image
                        src={w.photo}
                        alt={`${w.name} na MG Bebidas & Tabacaria`}
                        fill
                        priority={i === 0}
                        sizes="(min-width: 1024px) 28rem, 90vw"
                        draggable={false}
                        className="object-cover object-[50%_45%]"
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className="pointer-events-none absolute inset-x-4 top-[6%] bottom-[6%] rounded-full opacity-50"
                        style={{ background: `radial-gradient(closest-side, ${w.glow}, transparent 75%)` }}
                      />
                      <div className="pointer-events-none absolute bottom-[3%] left-1/2 h-4 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl" />
                      <div className="relative h-[92%] w-full">
                        <Image
                          src={w.image}
                          alt={`Garrafa de ${w.name}`}
                          fill
                          priority={i === 0}
                          sizes="(min-width: 1024px) 28rem, 90vw"
                          draggable={false}
                          className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)]"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => goTo(index - 1)}
              aria-label="Whisky anterior"
              className={`absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ground/80 text-ink backdrop-blur transition-opacity hover:border-gold ${index === 0 ? "pointer-events-none opacity-0" : ""}`}
            >
              <ChevronIcon dir="left" className="h-5 w-5" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Próximo whisky"
              className={`absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ground/80 text-ink backdrop-blur transition-opacity hover:border-gold ${index === whiskies.length - 1 ? "pointer-events-none opacity-0" : ""}`}
            >
              <ChevronIcon className="h-5 w-5" />
            </button>

            <div className="mt-2 flex justify-center">
              {whiskies.map((w, i) => (
                <button
                  key={w.id}
                  onClick={() => goTo(i)}
                  aria-label={`Ir para ${w.name}`}
                  aria-current={i === index}
                  className="flex h-11 w-7 items-center justify-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-gold-bright" : "w-2 bg-line"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div key={whisky.id} className="whisky-info">
            <p className="text-sm text-ink-muted">
              {whisky.kind} · {whisky.origin}
              {whisky.age ? ` · ${whisky.age}` : ""}
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-ink text-balance sm:text-4xl">
              {whisky.name}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{whisky.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {whisky.notes.map((n) => (
                <li key={n} className="rounded-full border border-line px-3 py-1 text-sm text-ink">
                  {n}
                </li>
              ))}
            </ul>

            {whisky.price !== undefined ? (
              <>
                <p className="mt-6 font-display text-3xl text-gold-bright">{formatBRL(whisky.price)}</p>
                <button
                  onClick={addToCart}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-8 text-base font-medium text-ground transition-colors hover:bg-gold-bright sm:w-auto"
                >
                  {justAdded === whisky.id ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
                </button>
                <p className="mt-2 min-h-5 text-sm text-ink-muted" aria-live="polite">
                  {inCart > 0 ? `${inCart} no carrinho` : ""}
                </p>
              </>
            ) : (
              <a
                href={whatsappLink(`Olá! Quero saber o preço e a disponibilidade do ${whisky.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-gold px-6 text-gold hover:text-gold-bright"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Consultar preço
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
