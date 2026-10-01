"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "qty">) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "mg-cart-v1";
const MAX_QTY = 99;

const CartContext = createContext<CartContextValue | null>(null);

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function isItem(x: unknown): x is CartItem {
  if (!x || typeof x !== "object") return false;
  const i = x as Record<string, unknown>;
  return (
    typeof i.id === "string" &&
    typeof i.name === "string" &&
    typeof i.image === "string" &&
    typeof i.price === "number" &&
    typeof i.qty === "number" &&
    i.qty > 0
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // localStorage só existe no cliente, então o carrinho salvo não pode ser lido na renderização inicial.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setItems(parsed.filter(isItem));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: Math.min(MAX_QTY, p.qty + 1) } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, qty: Math.min(MAX_QTY, qty) } : p)),
    );
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((p) => p.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
      isOpen,
      open,
      close,
      add,
      setQty,
      remove,
      clear,
    }),
    [items, isOpen, open, close, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de CartProvider");
  return ctx;
}

export type DadosEntrega = {
  nome: string;
  /** "entrega": vai por motoboy, com o valor cotado na hora. "retirada": a pessoa busca na loja. */
  modo: "entrega" | "retirada";
  endereco?: string;
  telefone?: string;
  /** Formas de pagamento escolhidas (uma ou mais). */
  pagamentos: string[];
  /** Só quando Dinheiro está entre as formas: troco para quanto. */
  troco?: string;
  /** Só quando há duas formas: como dividir o valor. */
  divisao?: string;
};

/** Texto do pedido pronto, para abrir no WhatsApp da loja. */
export function mensagemPedido(items: CartItem[], total: number, dados?: DadosEntrega) {
  const linhas = items.map((i) => `• ${i.qty}x ${i.name} - ${formatBRL(i.price * i.qty)}`);
  const telefone = dados?.telefone?.trim() ? [`Telefone: ${dados.telefone.trim()}`] : [];
  const pagamento: string[] = [];
  if (dados && dados.pagamentos.length > 0) {
    pagamento.push(`Pagamento: ${dados.pagamentos.join(" + ")}`);
    if (dados.pagamentos.includes("Dinheiro") && dados.troco?.trim()) pagamento.push(`Troco para: ${dados.troco.trim()}`);
    if (dados.pagamentos.length > 1 && dados.divisao?.trim()) pagamento.push(`Divisão: ${dados.divisao.trim()}`);
  }
  let cliente: string[];
  if (!dados) {
    cliente = ["", "Pode confirmar a disponibilidade e como faço a retirada ou o pagamento?"];
  } else if (dados.modo === "retirada") {
    cliente = [
      "",
      `Nome: ${dados.nome.trim()}`,
      ...telefone,
      "Forma de recebimento: retirar na loja",
      ...pagamento,
      "",
      "Podem confirmar a disponibilidade dos produtos e quando posso retirar?",
    ];
  } else {
    const endereco = (dados.endereco ?? "")
      .split(/[\r\n]+/)
      .map((l) => l.trim())
      .filter(Boolean)
      .join(", ");
    cliente = [
      "",
      `Nome: ${dados.nome.trim()}`,
      `Endereço: ${endereco}`,
      ...telefone,
      "Forma de recebimento: entrega por motoboy",
      ...pagamento,
      "",
      "Vocês conseguem entregar neste endereço? Podem confirmar também a disponibilidade dos produtos e o valor da entrega?",
    ];
  }
  return [
    "Olá! Quero fazer este pedido pelo site:",
    "",
    ...linhas,
    "",
    `Total dos produtos: ${formatBRL(total)}`,
    ...cliente,
  ].join(String.fromCharCode(10));
}
