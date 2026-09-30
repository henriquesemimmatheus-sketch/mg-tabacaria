"use client";

import { useMemo, useState } from "react";
import { Container, SectionHeading } from "./Container";
import { essencias, familias, marcas, type Familia } from "@/lib/essencias";
import { useCart, formatBRL } from "@/lib/cart";

const PASSO = 24;

function chip(ativo: boolean) {
  return `inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm transition-colors ${
    ativo ? "border-gold bg-gold text-ground" : "border-line text-ink hover:border-gold/60"
  }`;
}

export function EssenceCatalog() {
  const [busca, setBusca] = useState("");
  const [marca, setMarca] = useState<string | null>(null);
  const [familia, setFamilia] = useState<Familia | null>(null);
  const [soGelados, setSoGelados] = useState(false);
  const [visiveis, setVisiveis] = useState(PASSO);
  const { add, setQty, items } = useCart();

  const lista = useMemo(() => {
    const q = busca
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
    return essencias.filter((e) => {
      if (marca && e.marca !== marca) return false;
      if (familia && e.familia !== familia) return false;
      if (soGelados && !e.gelado) return false;
      if (!q) return true;
      const alvo = `${e.marca} ${e.nome}`
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase();
      return alvo.includes(q);
    });
  }, [busca, marca, familia, soGelados]);

  const rotuloFamilia = (f: Familia) => familias.find((x) => x.id === f)?.label ?? f;
  const qtdNoCarrinho = (id: string) => items.find((i) => i.id === id)?.qty ?? 0;
  const filtrando = !!(busca || marca || familia || soGelados);

  function limpar() {
    setBusca("");
    setMarca(null);
    setFamilia(null);
    setSoGelados(false);
    setVisiveis(PASSO);
  }

  return (
    <section id="essencias" className="relative border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Tabacaria"
          title="Essências"
          description="Escolha a marca e o sabor. O preço é por unidade e a disponibilidade a gente confirma no WhatsApp."
        />

        <div className="mt-10 space-y-4">
          <div>
            <label htmlFor="busca-essencia" className="sr-only">
              Buscar essência
            </label>
            <input
              id="busca-essencia"
              type="search"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setVisiveis(PASSO);
              }}
              placeholder="Buscar por marca ou sabor"
              className="min-h-12 w-full rounded-full border border-line bg-surface px-5 text-ink placeholder:text-ink-muted focus:border-gold focus:outline-none"
            />
          </div>

          <div
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filtrar por marca"
          >
            <button
              className={chip(marca === null)}
              onClick={() => {
                setMarca(null);
                setVisiveis(PASSO);
              }}
            >
              Todas as marcas
            </button>
            {marcas.map((m) => (
              <button
                key={m}
                className={chip(marca === m)}
                aria-pressed={marca === m}
                onClick={() => {
                  setMarca(marca === m ? null : m);
                  setVisiveis(PASSO);
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <div
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filtrar por tipo de sabor"
          >
            <button
              className={chip(soGelados)}
              aria-pressed={soGelados}
              onClick={() => {
                setSoGelados((v) => !v);
                setVisiveis(PASSO);
              }}
            >
              Só gelados
            </button>
            {familias.map((f) => (
              <button
                key={f.id}
                className={chip(familia === f.id)}
                aria-pressed={familia === f.id}
                onClick={() => {
                  setFamilia(familia === f.id ? null : f.id);
                  setVisiveis(PASSO);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-ink-muted" aria-live="polite">
            {lista.length} {lista.length === 1 ? "essência" : "essências"}
            {filtrando && (
              <button onClick={limpar} className="ml-3 min-h-11 px-1 text-gold underline hover:text-gold-bright">
                Limpar filtros
              </button>
            )}
          </p>
        </div>

        {lista.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-line bg-surface p-8 text-center">
            <p className="font-display text-lg text-ink">Nenhuma essência encontrada</p>
            <p className="mt-2 text-sm text-ink-muted">Tente outra marca ou tire um filtro.</p>
            <button
              onClick={limpar}
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-gold px-6 text-sm font-medium text-ground hover:bg-gold-bright"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {lista.slice(0, visiveis).map((e) => {
              const qtd = qtdNoCarrinho(e.id);
              return (
                <li key={e.id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                  <div className="flex aspect-[4/3] items-center justify-center border-b border-line bg-surface-2 px-3 text-center">
                    <span className="font-condensed text-2xl uppercase leading-none tracking-wide text-gold-bright sm:text-3xl">
                      {e.marca}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="text-sm font-medium leading-snug text-ink sm:text-base">{e.nome}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
                      <span>{rotuloFamilia(e.familia)}</span>
                      {e.gelado && (
                        <span className="rounded-full border border-gold/50 px-2 py-0.5 text-gold">Gelado</span>
                      )}
                    </p>
                    <p className="mt-3 font-display text-lg text-gold-bright">{formatBRL(e.preco)}</p>

                    <div className="mt-3 flex-1" />
                    {qtd === 0 ? (
                      <button
                        onClick={() =>
                          add({
                            id: e.id,
                            name: `${e.marca} ${e.nome}`,
                            price: e.preco,
                            image: "/essencia.svg",
                          })
                        }
                        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold px-3 text-sm font-medium text-ground transition-colors hover:bg-gold-bright"
                      >
                        Adicionar
                      </button>
                    ) : (
                      <div className="flex items-center justify-between rounded-full border border-gold">
                        <button
                          onClick={() => setQty(e.id, qtd - 1)}
                          aria-label={`Diminuir quantidade de ${e.marca} ${e.nome}`}
                          className="flex h-11 w-11 items-center justify-center text-lg text-ink"
                        >
                          −
                        </button>
                        <span className="text-sm text-ink" aria-live="polite">
                          {qtd}
                        </span>
                        <button
                          onClick={() => setQty(e.id, qtd + 1)}
                          aria-label={`Aumentar quantidade de ${e.marca} ${e.nome}`}
                          className="flex h-11 w-11 items-center justify-center text-lg text-ink"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {lista.length > visiveis && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisiveis((v) => v + PASSO)}
              className="inline-flex min-h-12 items-center rounded-full border border-gold px-8 text-gold transition-colors hover:text-gold-bright"
            >
              Mostrar mais essências
            </button>
            <p className="mt-2 text-xs text-ink-muted">
              Mostrando {visiveis} de {lista.length}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
