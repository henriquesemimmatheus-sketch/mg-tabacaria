"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container, SectionHeading } from "./Container";
import { WhatsAppIcon } from "./icons";
import { carvoes, type Carvao } from "@/lib/carvoes";
import { useCart, formatBRL } from "@/lib/cart";
import { whatsappLink } from "@/lib/business";

export function CharcoalCatalog() {
  const { add, items } = useCart();
  const [escolhido, setEscolhido] = useState<Record<string, number>>({});
  const [adicionado, setAdicionado] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (carvoes.length === 0) return null;

  function adicionar(c: Carvao, indice: number) {
    const t = c.tamanhos[indice];
    if (t.preco === undefined) return;
    add({
      id: `carvao-${c.id}-${t.peso.replace(/\s/g, "").toLowerCase()}`,
      name: `${c.nome} ${t.peso}`,
      price: t.preco,
      image: c.foto ?? "/carvao.svg",
    });
    setAdicionado(c.id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdicionado(null), 1600);
  }

  return (
    <section id="carvoes" className="relative border-b border-line py-12 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Tabacaria"
          title="Carvões"
          description="Escolha a marca e o tamanho do pacote. O preço muda conforme o tamanho."
        />

        <div className="mt-8 space-y-8 sm:mt-12 sm:space-y-12">
          {carvoes.map((c) => {
            const i = escolhido[c.id] ?? 0;
            const t = c.tamanhos[i];
            const idCarrinho = `carvao-${c.id}-${t.peso.replace(/\s/g, "").toLowerCase()}`;
            const qtd = items.find((x) => x.id === idCarrinho)?.qty ?? 0;
            return (
              <article key={c.id}>
                <h3 className="border-b-2 border-gold pb-2 font-condensed text-5xl uppercase leading-none tracking-wide text-ink sm:text-6xl">
                  {c.marca}
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-10 lg:grid-cols-[minmax(0,20rem)_1fr]">
                  <div className="relative mx-auto flex h-44 w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_50%_40%,#2b2620,#171412)] sm:h-auto sm:aspect-square sm:max-w-none">
                    {c.foto ? (
                      <Image src={c.foto} alt={c.nome} fill sizes="(min-width: 1024px) 320px, 256px" className="object-contain p-4" />
                    ) : (
                      <span className="px-4 text-center font-condensed text-4xl uppercase leading-none tracking-wide text-gold-bright sm:text-5xl">
                        {c.marca}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-display text-2xl text-ink sm:text-3xl">{c.nome}</h4>
                    {c.descricao && <p className="mt-2 max-w-md leading-relaxed text-ink-muted">{c.descricao}</p>}

                    <p className="mt-4 text-sm font-medium text-ink">Tamanho do pacote</p>
                    <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label={`Tamanho do ${c.nome}`}>
                      {c.tamanhos.map((tam, k) => (
                        <button
                          key={tam.peso}
                          aria-pressed={k === i}
                          onClick={() => setEscolhido((e) => ({ ...e, [c.id]: k }))}
                          className={`min-h-12 rounded-xl border px-2 text-base font-medium transition-colors ${
                            k === i ? "border-gold bg-gold text-ground" : "border-line text-ink hover:border-gold/60"
                          }`}
                        >
                          {tam.peso}
                          {tam.preco !== undefined && (
                            <span className={`block text-xs font-normal ${k === i ? "text-ground/80" : "text-ink-muted"}`}>
                              {formatBRL(tam.preco)}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 sm:mt-6 sm:justify-start sm:gap-8">
                      {t.preco !== undefined ? (
                        <>
                          <p className="font-display text-3xl text-gold-bright sm:text-4xl">{formatBRL(t.preco)}</p>
                          <button
                            onClick={() => adicionar(c, i)}
                            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-gold px-5 text-base font-medium text-ground transition-colors hover:bg-gold-bright sm:px-8"
                          >
                            {adicionado === c.id ? "Adicionado" : "Adicionar ao carrinho"}
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="font-display text-xl text-ink-muted sm:text-2xl">Consultar preço</p>
                          <a
                            href={whatsappLink(`Olá! Quero saber o preço do ${c.nome} de ${t.peso}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-gold px-5 text-gold hover:text-gold-bright"
                          >
                            <WhatsAppIcon className="h-4 w-4" />
                            Perguntar
                          </a>
                        </>
                      )}
                    </div>
                    <p className="mt-1 min-h-5 text-sm text-ink-muted" aria-live="polite">
                      {qtd > 0 ? `${qtd} no carrinho` : ""}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
