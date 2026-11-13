"use client";

import { useState } from "react";
import { Container } from "./Container";
import { ItemCatalog } from "./ItemCatalog";
import { WhiskyCatalog } from "./WhiskyCatalog";
import { cervejas } from "@/lib/cervejas";
import { destilados, drinksProntos, type SubDestilado } from "@/lib/licores";

type Tipo = "todos" | "destilados" | "cervejas" | "drinks";
type Sub = "todos" | "whisky" | SubDestilado;

const TIPOS: [Tipo, string][] = [
  ["todos", "Todos"],
  ["destilados", "Destilados"],
  ["cervejas", "Cervejas"],
  ["drinks", "Drinks prontos"],
];

const SUBS: [Sub, string][] = [
  ["todos", "Todos"],
  ["whisky", "Whisky"],
  ["licor", "Licor"],
  ["gin", "Gin"],
  ["vodka", "Vodka"],
  ["diversos", "Diversos"],
];

const GRUPOS: SubDestilado[] = ["licor", "gin", "vodka", "diversos"];

const SUB_TITULO: Record<SubDestilado, string> = {
  licor: "Licores",
  gin: "Gin",
  vodka: "Vodka",
  diversos: "Diversos",
};

function Chips<T extends string>({
  opcoes,
  valor,
  onChange,
  rotulo,
  pequeno = false,
}: {
  opcoes: [T, string][];
  valor: T;
  onChange: (v: T) => void;
  rotulo: string;
  pequeno?: boolean;
}) {
  return (
    <div role="tablist" aria-label={rotulo} className="-mx-6 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {opcoes.map(([id, texto]) => (
        <button
          key={id}
          role="tab"
          aria-selected={valor === id}
          onClick={() => onChange(id)}
          className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors ${
            valor === id
              ? "border-gold bg-gold text-ground"
              : pequeno
                ? "border-line text-ink-muted hover:border-gold hover:text-ink"
                : "border-line text-ink hover:border-gold"
          }`}
        >
          {texto}
        </button>
      ))}
    </div>
  );
}

export function BebidasCatalog() {
  const [tipo, setTipo] = useState<Tipo>("todos");
  const [sub, setSub] = useState<Sub>("todos");

  const mostraDestilados = tipo === "todos" || tipo === "destilados";
  const todosSub = tipo === "todos" || sub === "todos";
  const mostraWhisky = mostraDestilados && (todosSub || sub === "whisky");
  const grupos = GRUPOS.filter((g) => mostraDestilados && (todosSub || sub === g));

  function escolherTipo(t: Tipo) {
    setTipo(t);
    setSub("todos");
  }

  return (
    <>
      <section className="border-b border-line pt-8 pb-5 sm:pt-12">
        <Container>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Bebidas</span>
          <h1 className="mt-1 mb-5 font-condensed text-5xl uppercase leading-none tracking-tight text-ink sm:text-6xl">
            Escolha o que vai gelar
          </h1>
          <Chips opcoes={TIPOS} valor={tipo} onChange={escolherTipo} rotulo="Tipo de bebida" />
          {tipo === "destilados" && (
            <div className="mt-3">
              <Chips opcoes={SUBS} valor={sub} onChange={setSub} rotulo="Tipo de destilado" pequeno />
            </div>
          )}
        </Container>
      </section>

      {mostraWhisky && <WhiskyCatalog />}

      {grupos.map((g, i) => (
        <div key={g} className={i === 0 && !mostraWhisky ? "pt-8 sm:pt-10" : "pt-10"}>
          <ItemCatalog
            secundario
            eyebrow="Destilados"
            titulo={SUB_TITULO[g]}
            descricao="Rótulos da casa com preço. Adicione ao carrinho e finalize pelo WhatsApp."
            itens={destilados.filter((d) => d.sub === g)}
            assunto="destilados"
          />
        </div>
      ))}

      {(tipo === "todos" || tipo === "cervejas") && (
        <div className={tipo === "cervejas" ? "pt-8 sm:pt-10" : "pt-10"}>
          <ItemCatalog
            secundario
            eyebrow="Cervejas"
            titulo="Packs gelados"
            descricao="Packs de latas e long neck. Adicione ao carrinho e finalize pelo WhatsApp."
            itens={cervejas}
            assunto="cervejas"
          />
        </div>
      )}

      {(tipo === "todos" || tipo === "drinks") && (
        <div className={tipo === "drinks" ? "pt-8 sm:pt-10" : "pt-10"}>
          <ItemCatalog
            secundario
            eyebrow="Drinks prontos"
            titulo="Pra servir gelado"
            descricao="Coquetéis prontos para beber. Adicione ao carrinho e finalize pelo WhatsApp."
            itens={drinksProntos}
            assunto="drinks prontos"
          />
        </div>
      )}
    </>
  );
}
