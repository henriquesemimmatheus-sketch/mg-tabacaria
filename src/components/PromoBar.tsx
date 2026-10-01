"use client";

import { usePromocoesAtivas } from "@/lib/promocoes";

// Cada metade da faixa precisa ser mais larga que a tela, senão aparece um vão na volta.
const MIN_ITENS = 10;

export function PromoBar() {
  const ativas = usePromocoesAtivas();
  if (ativas.length === 0) return null;

  const copias = Math.ceil(MIN_ITENS / ativas.length);
  const metade = Array.from({ length: copias }, () => ativas).flat();

  return (
    <div className="overflow-hidden border-b border-gold/40 bg-gold py-2 text-ground">
      <div className="marquee-track" style={{ "--marquee-dur": "40s" } as React.CSSProperties}>
        {[0, 1].map((k) => (
          <ul
            key={k}
            className="flex shrink-0 items-center"
            aria-hidden={k === 1}
            aria-label={k === 0 ? "Promoções" : undefined}
          >
            {metade.map((p, i) => (
              <li key={`${p.id}-${i}`} className="flex items-center text-sm font-medium">
                <span className="whitespace-nowrap px-6">
                  {p.link ? (
                    <a href={p.link} tabIndex={k === 1 ? -1 : undefined} className="underline-offset-4 hover:underline">
                      {p.texto}
                    </a>
                  ) : (
                    p.texto
                  )}
                </span>
                <span aria-hidden="true" className="text-xs opacity-70">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
