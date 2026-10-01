"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCart, formatBRL, mensagemPedido } from "@/lib/cart";
import { CloseIcon, CartIcon, WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/business";

export function CartDrawer() {
  const { items, count, total, isOpen, close, setQty, remove, clear } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrinho">
      <button aria-label="Fechar carrinho" onClick={close} className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-2xl border-t border-line bg-surface md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[26rem] md:rounded-none md:border-l md:border-t-0">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-xl text-ink">
            <CartIcon className="h-5 w-5 text-gold-bright" />
            Seu carrinho
            {count > 0 && <span className="text-sm text-ink-muted">({count})</span>}
          </h2>
          <button onClick={close} aria-label="Fechar carrinho" className="-mr-2 p-2 text-ink-muted hover:text-ink">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="font-display text-lg text-ink">Seu carrinho está vazio</p>
            <p className="mt-2 text-sm text-ink-muted">Escolha um whisky e toque em adicionar.</p>
            <a
              href="#whiskies"
              onClick={close}
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-ground hover:bg-gold-bright"
            >
              Ver whiskies
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <div className="relative h-20 w-14 shrink-0 rounded-lg bg-surface-2">
                    <Image src={item.image} alt="" fill sizes="56px" className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-ink">{item.name}</p>
                    <p className="mt-0.5 text-sm text-ink-muted">{formatBRL(item.price)}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg text-ink hover:border-gold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm text-ink" aria-live="polite">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg text-ink hover:border-gold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-6 self-stretch">
                    <p className="text-sm font-medium text-gold-bright">{formatBRL(item.price * item.qty)}</p>
                    <button
                      onClick={() => remove(item.id)}
                      className="min-h-11 px-1 text-xs text-ink-muted underline hover:text-ink"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-ink-muted">Total</span>
                <span className="font-display text-2xl text-ink">{formatBRL(total)}</span>
              </div>
              <a
                href={whatsappLink(mensagemPedido(items, total))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-lg font-semibold text-ground transition-colors hover:bg-gold-bright"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enviar pedido pelo WhatsApp
              </a>
              <p className="mt-2 text-center text-xs leading-relaxed text-ink-muted">
                O pedido vai pronto na conversa, com os itens e o total. A loja confirma a disponibilidade.
              </p>
              <div className="mt-1 flex items-center justify-between">
                <button onClick={clear} className="min-h-11 text-sm text-ink-muted underline hover:text-ink">
                  Esvaziar carrinho
                </button>
                <a
                  href={whatsappLink("Olá! Tenho uma dúvida sobre os produtos do site.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-sm text-gold hover:text-gold-bright"
                >
                  Tirar dúvidas
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
