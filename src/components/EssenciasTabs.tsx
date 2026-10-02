"use client";

import { useState } from "react";
import { EssenceCatalog } from "./EssenceCatalog";
import { PoteCatalog } from "./PoteCatalog";

type Aba = "caixinhas" | "potes";

const ABAS: [Aba, string][] = [
  ["caixinhas", "Caixinhas"],
  ["potes", "Potes"],
];

export function EssenciasTabs() {
  const [aba, setAba] = useState<Aba>("caixinhas");

  const seletor = (
    <div className="mb-6 inline-flex overflow-hidden rounded-full border border-line" role="tablist" aria-label="Tipo de embalagem">
      {ABAS.map(([id, rotulo]) => (
        <button
          key={id}
          role="tab"
          aria-selected={aba === id}
          onClick={() => setAba(id)}
          className={`min-h-11 px-5 text-sm font-medium transition-colors ${aba === id ? "bg-gold text-ground" : "text-ink hover:bg-surface-2"}`}
        >
          {rotulo}
        </button>
      ))}
    </div>
  );

  return aba === "potes" ? <PoteCatalog topo={seletor} /> : <EssenceCatalog topo={seletor} />;
}
