import { promocoesAtivas } from "@/lib/promocoes";

export function PromoBar() {
  const ativas = promocoesAtivas();
  if (ativas.length === 0) return null;

  return (
    <div className="border-b border-gold/40 bg-gold text-ground">
      <ul className="mx-auto flex max-w-6xl items-center justify-center gap-x-8 gap-y-1 overflow-x-auto px-6 py-2 text-center text-sm font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ativas.map((p) => (
          <li key={p.id} className="shrink-0">
            {p.link ? (
              <a href={p.link} className="underline-offset-4 hover:underline">
                {p.texto}
              </a>
            ) : (
              p.texto
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
