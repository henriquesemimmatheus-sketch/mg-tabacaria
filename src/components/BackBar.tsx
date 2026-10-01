"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";

// Botão de voltar visível em todas as páginas de catálogo (na home não aparece).
export function BackBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="border-b border-line bg-surface/60">
      <Container className="py-2">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold px-5 text-sm font-semibold text-gold-bright transition-colors hover:bg-gold hover:text-ground"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ←
          </span>
          Voltar para o início
        </Link>
      </Container>
    </div>
  );
}
