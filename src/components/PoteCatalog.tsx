"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { Container } from "./Container";
import { potes, type Pote } from "@/lib/potes";
import { useCart, formatBRL } from "@/lib/cart";

export function PoteCatalog({ topo }: { topo?: ReactNode }) {
  const { add } = useCart();
  const [adicionadoId, setAdicionadoId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const adicionar = (p: Pote) => {
    add({ id: p.id, name: `${p.marca} ${p.nome} (pote)`, price: p.preco, image: p.foto });
    setAdicionadoId(p.id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdicionadoId(null), 1400);
  };

  return (
    <section id="potes" className="relative border-b border-line py-12 sm:py-24">
      <Container>
        {topo}
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Tabacaria</span>
            <h1 className="mt-1 font-condensed text-5xl uppercase leading-none tracking-tight text-ink sm:text-6xl">Essências em pote</h1>
          </div>
          <p className="text-sm text-ink-muted">{potes.length} sabores importados</p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
          {potes.map((p) => (
            <li key={p.id}>
              <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-gold/60">
                <div className="relative flex aspect-[5/4] items-center justify-center border-b border-line bg-[radial-gradient(circle_at_50%_40%,#2b2620,#171412)]">
                  <Image
                    src={p.foto}
                    alt={`Pote de essência ${p.marca} ${p.nome}`}
                    fill
                    sizes="(min-width: 1280px) 240px, (min-width: 640px) 30vw, 45vw"
                    className="object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)]"
                  />
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gold" />
                  <span className="absolute right-2 top-3 rounded-full bg-ground/85 px-2 py-0.5 text-xs text-gold-bright">Pote</span>
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <p className="text-xs text-gold">{p.marca}</p>
                  <h2 className="mt-0.5 text-sm font-medium leading-snug text-ink sm:text-base">{p.nome}</h2>
                  <p className="mt-1 text-xs leading-snug text-ink-muted">{p.descricao}</p>
                  <p className="mt-auto pt-2 text-sm font-medium text-gold-bright">{formatBRL(p.preco)}</p>
                </div>
                <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <button
                    onClick={() => adicionar(p)}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold text-sm font-semibold text-ground transition-colors hover:bg-gold-bright"
                  >
                    {adicionadoId === p.id ? "Adicionado" : "Adicionar"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
