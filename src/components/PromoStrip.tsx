"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import { WhatsAppIcon } from "./icons";
import { usePromocoesAtivas, type Promocao } from "@/lib/promocoes";
import { useCart, formatBRL } from "@/lib/cart";
import { whatsappLink } from "@/lib/business";

type Item = Promocao & { card: NonNullable<Promocao["card"]> };

const botao =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-gold px-4 text-sm font-semibold text-ground transition-colors hover:bg-gold-bright";

// Banner único e compacto com os combos ativos. Os dados continuam em src/lib/promocoes.ts.
export function PromoStrip() {
  const lista = usePromocoesAtivas().filter((p): p is Item => !!p.card);
  const { add } = useCart();
  const [adicionado, setAdicionado] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (lista.length === 0) return null;

  function adicionar(p: Item) {
    if (p.card.preco === undefined) return;
    add({ id: `promo-${p.id}`, name: p.card.titulo, price: p.card.preco, image: p.card.imagem });
    setAdicionado(p.id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdicionado(null), 1600);
  }

  return (
    <section id="promocoes" className="scroll-mt-32 border-b border-line py-6 sm:py-8">
      <Container>
        <div className="overflow-hidden rounded-2xl border-2 border-gold-bright bg-surface shadow-[0_0_30px_rgba(201,162,75,0.25)]">
          <p className="bg-gold px-4 py-2 font-condensed text-xl uppercase tracking-wide text-ground">
            Promos da casa! <span className="hidden text-sm normal-case tracking-normal opacity-80 sm:inline">· disponibilidade no WhatsApp</span>
          </p>
          <ul className="divide-y divide-line sm:grid sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {lista.map((p) => {
              const { card } = p;
              const noCarrinho = card.preco !== undefined && card.acao !== "whatsapp";
              return (
                <li key={p.id} className="flex items-center gap-3 p-3">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black">
                    <Image src={card.imagem} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-tight text-ink">{card.titulo}</span>
                    {card.preco !== undefined && (
                      <span className="mt-0.5 block font-condensed text-2xl leading-none text-gold-bright">
                        {formatBRL(card.preco)}
                      </span>
                    )}
                  </span>
                  {noCarrinho ? (
                    <button onClick={() => adicionar(p)} className={botao}>
                      {adicionado === p.id ? "Adicionado" : "Adicionar"}
                    </button>
                  ) : (
                    <a
                      href={whatsappLink(`Olá! Quero saber mais sobre a promoção: ${card.titulo}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={botao}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
