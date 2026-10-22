import { business } from "@/lib/business";

const link =
  "inline-flex min-h-11 items-center text-sm uppercase tracking-[0.12em] text-gold hover:text-gold-bright";

// Liga o site à ficha da loja no Google (avaliações e mapa).
export function GoogleFicha() {
  return (
    <div className="mt-4 rounded-2xl border border-line bg-surface p-5">
      <h3 className="font-display text-lg text-ink">A loja no Google</h3>
      <p className="mt-1 text-sm text-ink-muted">
        Mais de 5 mil avaliações de clientes na ficha da {business.name}, no {business.neighborhood}, em Cascavel.
      </p>
      <div className="mt-2 flex flex-wrap gap-x-6">
        <a href={business.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={link}>
          Ver avaliações →
        </a>
        <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
          Abrir no Google Maps →
        </a>
        <a href={business.googleWriteReviewUrl} target="_blank" rel="noopener noreferrer" className={link}>
          Avaliar a loja →
        </a>
      </div>
    </div>
  );
}
