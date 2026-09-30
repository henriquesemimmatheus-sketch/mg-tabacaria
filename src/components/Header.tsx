"use client";

import { useState } from "react";
import { Container } from "./Container";
import { MenuIcon, CloseIcon, WhatsAppIcon, CartIcon } from "./icons";
import { business, whatsappLink } from "@/lib/business";
import { useCart } from "@/lib/cart";

const links = [
  { href: "#bebidas", label: "Bebidas" },
  { href: "#tabacaria", label: "Tabacaria" },
  { href: "#sobre", label: "Sobre" },
  { href: "#localizacao", label: "Localização" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ground/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <a href="#" className="font-display text-xl tracking-wide text-ink">
          <span className="text-gold-bright">MG</span> Bebidas & Tabacaria
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-gold-bright"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-ground transition-colors hover:bg-gold-bright"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {business.whatsappDisplay}
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
          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-ink p-2 -mr-2"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="md:hidden border-t border-line bg-ground">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-ink-muted hover:text-gold-bright"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-medium text-ground"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chamar no WhatsApp
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
