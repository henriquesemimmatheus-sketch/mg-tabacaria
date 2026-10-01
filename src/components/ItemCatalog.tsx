"use client";

import Image from "next/image";
import { Container } from "./Container";
import { WhatsAppIcon } from "./icons";
import { useCart, formatBRL } from "@/lib/cart";
import { whatsappLink } from "@/lib/business";
import type { Acessorio } from "@/lib/acessorios";

// Página de categoria simples: cards compactos, 2 colunas no celular.
// Com preço o card adiciona ao carrinho; sem preço leva ao WhatsApp.
export function ItemCatalog({
  eyebrow,
  titulo,
  descricao,
  itens,
  assunto,
}: {
  eyebrow: string;
  titulo: string;
  descricao: string;
  itens: Acessorio[];
  assunto: string;
}) {
  const { add } = useCart();

  return (
    <section className="py-10 sm:py-16">
      <Container>
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</span>
        <h1 className="mt-1 font-condensed text-5xl uppercase leading-none tracking-tight text-ink sm:text-6xl">{titulo}</h1>
        <p className="mt-3 max-w-xl text-sm text-ink-muted">{descricao}</p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {itens.map((a) => (
            <li key={a.id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="relative flex aspect-square items-center justify-center border-b border-line bg-[radial-gradient(circle_at_50%_40%,#2b2620,#171412)]">
                {a.foto ? (
                  <Image src={a.foto} alt="" fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover" />
                ) : (
                  <span className="px-3 text-center font-condensed text-2xl uppercase leading-none tracking-wide text-gold-bright">
                    {a.nome}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <h2 className="text-sm font-medium leading-snug text-ink sm:text-base">{a.nome}</h2>
                <p className="mt-1 text-xs leading-snug text-ink-muted">{a.descricao}</p>
                <div className="mt-auto pt-3">
                  {a.preco !== undefined ? (
                    <>
                      <p className="text-sm font-medium text-gold-bright">{formatBRL(a.preco)}</p>
                      <button
                        onClick={() => add({ id: a.id, name: a.nome, price: a.preco!, image: a.foto ?? "/logo-mg-tabacaria.webp" })}
                        className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold text-sm font-semibold text-ground hover:bg-gold-bright"
                      >
                        Adicionar
                      </button>
                    </>
                  ) : (
                    <a
                      href={whatsappLink(`Olá! Gostaria de saber mais sobre ${assunto}: ${a.nome}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full border border-gold text-sm font-medium text-gold-bright hover:bg-gold/10"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Consultar
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
