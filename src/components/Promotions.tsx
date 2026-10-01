"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container, SectionHeading } from "./Container";
import { WhatsAppIcon } from "./icons";
import { usePromocoesAtivas } from "@/lib/promocoes";
import { useCart, formatBRL } from "@/lib/cart";
import { whatsappLink } from "@/lib/business";

import type { Promocao } from "@/lib/promocoes";

type Item = Promocao & { card: NonNullable<Promocao["card"]> };

function selo(card: Item["card"]) {
  if (card.preco !== undefined && card.precoAntigo !== undefined && card.precoAntigo > card.preco) {
    return `-${Math.round((1 - card.preco / card.precoAntigo) * 100)}%`;
  }
  return "Oferta";
}

export function Promotions() {
  const lista = usePromocoesAtivas().filter((p): p is Item => !!p.card);
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (lista.length === 0) return null;

  const unica = lista.length === 1;

  function addToCart(p: Item) {
    if (p.card.preco === undefined) return;
    add({ id: `promo-${p.id}`, name: p.card.titulo, price: p.card.preco, image: p.card.imagem });
    setJustAdded(p.id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(null), 1600);
  }

  const acao = (p: Item) => {
    const { card } = p;
    if (card.preco !== undefined && card.acao !== "whatsapp") {
      return (
        <button
          onClick={() => addToCart(p)}
          className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-xl border-2 border-ink bg-gold px-8 font-condensed text-xl uppercase tracking-wide text-ground shadow-[5px_5px_0_var(--color-ink)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_var(--color-ink)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none sm:w-auto"
        >
          {justAdded === p.id ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
        </button>
      );
    }
    return (
      <a
        href={whatsappLink(`Olá! Quero saber mais sobre a promoção: ${card.titulo}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-ink bg-gold px-8 font-condensed text-xl uppercase tracking-wide text-ground shadow-[5px_5px_0_var(--color-ink)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_var(--color-ink)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none sm:w-auto"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Falar no WhatsApp
      </a>
    );
  }

  // `fixa`: vários cartões lado a lado usam a MESMA proporção de imagem, pra tudo ficar alinhado.
  const arte = (p: Item, priority?: boolean, fixa?: boolean) => {
    const { card } = p;
    return (
      <div className="relative">
        <div
          className={`overflow-hidden rounded-2xl border-[3px] border-gold bg-black shadow-[8px_8px_0_var(--color-gold)] sm:-rotate-1 ${
            fixa ? "relative aspect-[4/5]" : ""
          }`}
        >
          {fixa ? (
            <Image
              src={card.imagem}
              alt={card.titulo}
              fill
              priority={priority}
              sizes="(min-width: 640px) 384px, 88vw"
              className="object-contain"
            />
          ) : (
            <Image
              src={card.imagem}
              alt={card.titulo}
              width={card.largura}
              height={card.altura}
              priority={priority}
              sizes="(min-width: 1024px) 416px, (min-width: 640px) 384px, 88vw"
              className="h-auto w-full"
            />
          )}
        </div>
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-7 flex h-14 w-14 rotate-12 items-center justify-center rounded-full border-[3px] border-ground bg-gold-bright text-center font-condensed text-lg uppercase leading-none text-ground shadow-[3px_3px_0_var(--color-ink)] sm:-right-5 sm:-top-5 sm:h-24 sm:w-24 sm:text-3xl"
        >
          {selo(card)}
        </span>
      </div>
    );
  }

  const preco = (p: Item) => {
    const { card } = p;
    if (card.preco === undefined) return null;
    return (
      <p className="mt-5 flex items-baseline gap-3">
        {card.precoAntigo !== undefined && (
          <span className="text-lg text-ink-muted line-through">{formatBRL(card.precoAntigo)}</span>
        )}
        <span className="font-condensed text-6xl leading-none text-gold-bright sm:text-7xl">{formatBRL(card.preco)}</span>
      </p>
    );
  }

  const validade = (ate?: string) => {
    if (!ate) return null;
    return (
      <p className="mt-3 inline-block border border-gold px-2 py-0.5 text-sm text-gold">
        Até {ate.split("-").reverse().slice(0, 2).join("/")}
      </p>
    );
  }

  return (
    <section id="promocoes" className="relative overflow-hidden border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Ofertas"
          title="Promoções"
          description="Condições especiais por tempo limitado. Disponibilidade a gente confirma no WhatsApp."
        />

        {unica ? (
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
            <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              {arte(lista[0], true)}
            </div>
            <div>
              <h3 className="font-condensed text-4xl uppercase leading-[1.02] tracking-tight text-ink sm:text-6xl">
                {lista[0].card.titulo}
              </h3>
              {lista[0].card.descricao && (
                <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{lista[0].card.descricao}</p>
              )}
              {validade(lista[0].ate)}
              {preco(lista[0])}
              {acao(lista[0])}
            </div>
          </div>
        ) : (
          <ul className="mt-14 flex snap-x snap-mandatory items-stretch gap-8 overflow-x-auto px-1 pb-8 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {lista.map((p) => (
              <li key={p.id} className="flex w-[84%] shrink-0 snap-center flex-col sm:w-[24rem]">
                {arte(p, false, true)}
                <h3 className="mt-6 line-clamp-2 min-h-[2.5em] font-condensed text-3xl uppercase leading-tight tracking-tight text-ink">
                  {p.card.titulo}
                </h3>
                <div className="min-h-9">{validade(p.ate)}</div>
                <div className="mt-auto">
                  <div className="min-h-[5.25rem]">{preco(p)}</div>
                  {acao(p)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
