export function Marquee({ phrases }: { phrases: string[] }) {
  // O conteúdo aparece duas vezes: a faixa anda metade do caminho e recomeça sem pulo.
  const row = [...phrases, ...phrases, ...phrases];

  return (
    <div
      className="overflow-hidden border-y border-gold/40 bg-surface py-3"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((p, i) => (
              <span
                key={`${k}-${i}`}
                className="flex items-center font-condensed text-2xl uppercase tracking-wide text-gold-bright sm:text-3xl"
              >
                <span className="px-5">{p}</span>
                <span className="text-lg text-gold/70">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
