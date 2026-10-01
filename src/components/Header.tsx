"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Container } from "./Container";
import { WhatsAppIcon, CartIcon } from "./icons";
import { business, whatsappLink } from "@/lib/business";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "Início" },
  { href: "/essencias", label: "Essências" },
  { href: "/carvoes", label: "Carvões" },
  { href: "/bebidas", label: "Bebidas" },
  { href: "/acessorios", label: "Tabacaria" },
  { href: "/presentes", label: "Presentes" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#localizacao", label: "Localização" },
];

export function Header() {
  const pathname = usePathname();
  const cart = useCart();
  const lista = useRef<HTMLUListElement>(null);

  // No celular o menu rola de lado: deixa a página atual à vista.
  useEffect(() => {
    const el = lista.current;
    const atual = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (el && atual) el.scrollTo({ left: atual.offsetLeft - el.clientWidth / 2 + atual.clientWidth / 2 });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ground/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-3 py-2 sm:py-3">
        <Link href="/" className="font-display text-base tracking-wide text-ink sm:text-xl">
          <span className="text-gold-bright">MG</span> Bebidas & Tabacaria
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chamar no WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ground transition-colors hover:bg-gold-bright sm:w-auto sm:gap-2 sm:px-4 sm:text-sm sm:font-medium"
          >
            <WhatsAppIcon className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{business.whatsappDisplay}</span>
          </a>
          <button
            onClick={cart.open}
            aria-label={`Abrir carrinho${cart.count ? `, ${cart.count} itens` : ""}`}
            className="relative flex h-11 w-11 items-center justify-center text-ink hover:text-gold-bright"
          >
            <CartIcon className="h-6 w-6" />
            {cart.count > 0 && (
              <span className="absolute right-0 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-medium text-ground">
                {cart.count}
              </span>
            )}
          </button>
        </div>
      </Container>

      <nav aria-label="Principal" className="border-t border-line/60">
        <Container className="px-0 sm:px-6">
          <ul ref={lista} className="relative flex gap-1 overflow-x-auto px-4 py-1.5 [scrollbar-width:none] sm:px-0 [&::-webkit-scrollbar]:hidden">
            {links.map((l) => {
              const atual = pathname === l.href;
              return (
                <li key={l.href} className="shrink-0">
                  <Link
                    href={l.href}
                    aria-current={atual ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                      atual ? "bg-gold text-ground" : "text-ink-muted hover:text-gold-bright"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
