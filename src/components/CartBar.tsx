"use client";

import { useCart, formatBRL } from "@/lib/cart";
import { CartIcon } from "./icons";

export function CartBar() {
  const { count, total, isOpen, open } = useCart();
  if (count === 0 || isOpen) return null;

  return (
    <button
      onClick={open}
      className="fixed bottom-6 left-4 right-24 z-40 flex min-h-14 items-center justify-between rounded-full bg-gold px-5 text-ground shadow-lg shadow-black/40 transition-colors hover:bg-gold-bright md:left-auto md:w-80"
    >
      <span className="flex items-center gap-2 text-sm font-medium">
        <CartIcon className="h-5 w-5" />
        Ver carrinho · {count} {count === 1 ? "item" : "itens"}
      </span>
      <span className="text-sm font-medium">{formatBRL(total)}</span>
    </button>
  );
}
