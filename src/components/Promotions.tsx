"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container, SectionHeading } from "./Container";
import { WhatsAppIcon } from "./icons";
import { promocoesComCard } from "@/lib/promocoes";
import { useCart, formatBRL } from "@/lib/cart";
import { whatsappLink } from "@/lib/business";

export function Promotions() {
  const lista = promocoesComCard();
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (lista.length === 0) return null;

  function addToCart(id: string, nome: string, preco: number, imagem: string) {
    add({ id: `promo-${id}`, name: nome, price: preco, image: imagem });
    setJustAdded(id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(null), 1600);
  }

  return (
    <section id="promocoes" className="relative overflow-hidden border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Ofertas"
          title="Promoções"
          description="Condições especiais por tempo limitado. Disponibilidade a gente confirma no WhatsApp."
        />

        <ul
          className={`mt-10 flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            lista.length === 1 ? "lg:justify-start" : "snap-x snap-mandatory"
          }`}
        >
          {lista.map(({ id, card, ate }) => (
            <li
              key={id}
              className="w-[88%] shrink-0 snap-center overflow-hidden rounded-2xl border border-line bg-surface sm:w-[24rem]"
            >
              <Image
                src={card.imagem}
                alt={card.titulo}
                width={card.largura}
                height={card.altura}
                sizes="(min-width: 640px) 384px, 88vw"
                className="h-auto w-full"
              />
              <div className="p-5">
                <h3 className="font-display text-xl text-ink">{card.titulo}</h3>
                {card.descricao && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.descricao}</p>}
                {ate && (
                  <p className="mt-2 text-sm text-gold">
                    Até {ate.split("-").reverse().slice(0, 2).join("/")}
                  </p>
                )}

                {card.preco !== undefined ? (
                  <>
                    <p className="mt-4 flex items-baseline gap-3">
                      {card.precoAntigo !== undefined && (
                        <span className="text-sm text-ink-muted line-through">{formatBRL(card.precoAntigo)}</span>
                      )}
                      <span className="font-display text-3xl text-gold-bright">{formatBRL(card.preco)}</span>
                    </p>
                    <button
                      onClick={() => addToCart(id, card.titulo, card.preco!, card.imagem)}
                      className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-6 font-medium text-ground transition-colors hover:bg-gold-bright"
                    >
                      {justAdded === id ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
                    </button>
                  </>
                ) : (
                  <a
                    href={whatsappLink(`Olá! Quero saber mais sobre a promoção: ${card.titulo}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-gold px-6 text-gold hover:text-gold-bright"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Falar no WhatsApp
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
