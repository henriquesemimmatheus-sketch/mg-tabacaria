"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart, formatBRL, mensagemPedido } from "@/lib/cart";
import { CloseIcon, CartIcon, WhatsAppIcon } from "./icons";
import { business, whatsappLink } from "@/lib/business";

type Passo = "carrinho" | "dados";
type Modo = "entrega" | "retirada";
type Erros = { nome?: string; endereco?: string; pagamento?: string };

const FORMAS = ["Pix", "Cartão", "Dinheiro"] as const;

const campo =
  "min-h-12 w-full rounded-xl border bg-surface-2 px-4 text-ink placeholder:text-ink-muted focus:border-gold focus:outline-none";

export function CartDrawer() {
  const { items, count, total, isOpen, close, setQty, remove, clear } = useCart();
  const [passo, setPasso] = useState<Passo>("carrinho");
  const [modo, setModo] = useState<Modo>("entrega");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pagamentos, setPagamentos] = useState<string[]>([]);
  const [troco, setTroco] = useState("");
  const [divisao, setDivisao] = useState("");
  const [erros, setErros] = useState<Erros>({});

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

  // Sem itens não há o que preencher: volta pro primeiro passo.
  useEffect(() => {
    if (items.length === 0 && passo !== "carrinho") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPasso("carrinho");
    }
  }, [items.length, passo]);

  if (!isOpen) return null;

  function enviar(ev: React.FormEvent) {
    ev.preventDefault();
    const novos: Erros = {};
    if (nome.trim().length < 2) novos.nome = "Informe seu nome.";
    if (modo === "entrega" && endereco.trim().length < 6) novos.endereco = "Informe o endereço completo, com rua, número e bairro.";
    if (pagamentos.length === 0) novos.pagamento = "Escolha ao menos uma forma de pagamento.";
    setErros(novos);
    if (novos.nome || novos.endereco || novos.pagamento) return;

    const url = whatsappLink(mensagemPedido(items, total, {
        nome,
        modo,
        endereco,
        telefone,
        pagamentos: FORMAS.filter((f) => pagamentos.includes(f)),
        troco,
        divisao,
      }));
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const titulo = passo === "carrinho" ? "Seu carrinho" : "Seus dados";

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrinho">
      <button aria-label="Fechar carrinho" onClick={close} className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-2xl border-t border-line bg-surface md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[26rem] md:rounded-none md:border-l md:border-t-0">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-xl text-ink">
            <CartIcon className="h-5 w-5 text-gold-bright" />
            {titulo}
            {passo === "carrinho" && count > 0 && <span className="text-sm text-ink-muted">({count})</span>}
          </h2>
          <button onClick={close} aria-label="Fechar carrinho" className="-mr-2 p-2 text-ink-muted hover:text-ink">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="font-display text-lg text-ink">Seu carrinho está vazio</p>
            <p className="mt-2 text-sm text-ink-muted">Escolha um produto e toque em adicionar.</p>
            <Link
              href="/essencias"
              onClick={close}
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-ground hover:bg-gold-bright"
            >
              Ver essências
            </Link>
          </div>
        ) : (
          <>
            <p className="border-b border-line px-5 py-2 text-xs text-ink-muted">
              <span className={passo === "carrinho" ? "font-medium text-gold-bright" : ""}>1. Carrinho</span>
              {"  ›  "}
              <span className={passo === "dados" ? "font-medium text-gold-bright" : ""}>2. Seus dados e envio</span>
            </p>

            {passo === "carrinho" ? (
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
                    <span className="text-ink-muted">Total dos produtos</span>
                    <span className="font-display text-2xl text-ink">{formatBRL(total)}</span>
                  </div>
                  <button
                    onClick={() => setPasso("dados")}
                    className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gold text-lg font-semibold text-ground transition-colors hover:bg-gold-bright"
                  >
                    Continuar
                  </button>
                  <p className="mt-2 text-center text-xs leading-relaxed text-ink-muted">
                    A disponibilidade dos produtos e a entrega são confirmadas pela loja no WhatsApp.
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
            ) : (
              <form onSubmit={enviar} noValidate className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-ink">Como você quer receber?</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          ["entrega", "Entrega", "Por motoboy"],
                          ["retirada", "Retirar na loja", "Sem endereço"],
                        ] as [Modo, string, string][]
                      ).map(([v, l, d]) => (
                        <button
                          key={v}
                          type="button"
                          aria-pressed={modo === v}
                          onClick={() => {
                            setModo(v);
                            setErros({});
                          }}
                          className={`min-h-14 rounded-xl border px-3 py-2 text-left transition-colors ${
                            modo === v ? "border-gold bg-gold text-ground" : "border-line text-ink hover:border-gold/60"
                          }`}
                        >
                          <span className="block text-base font-medium leading-tight">{l}</span>
                          <span className={`block text-xs ${modo === v ? "text-ground/80" : "text-ink-muted"}`}>{d}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <p className="rounded-xl border border-gold/40 bg-gold/10 p-3 text-sm leading-relaxed text-ink">
                    {modo === "entrega"
                      ? "Lembrete: a loja vai conferir se os produtos estão disponíveis e se dá para entregar no seu endereço. A entrega é feita por motoboy e o valor é cotado na hora, na conversa."
                      : `Lembrete: a loja vai conferir se os produtos estão disponíveis e combinar a retirada. Endereço da loja: ${business.address}, ${business.city}.`}
                  </p>

                  <div>
                    <label htmlFor="ck-nome" className="mb-1.5 block text-sm font-medium text-ink">
                      Seu nome
                    </label>
                    <input
                      id="ck-nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      autoComplete="name"
                      placeholder="Como podemos te chamar"
                      aria-invalid={!!erros.nome}
                      aria-describedby={erros.nome ? "ck-nome-erro" : undefined}
                      className={`${campo} ${erros.nome ? "border-red-400" : "border-line"}`}
                    />
                    {erros.nome && (
                      <p id="ck-nome-erro" className="mt-1 text-sm text-red-300">
                        {erros.nome}
                      </p>
                    )}
                  </div>

                  {modo === "entrega" && (
                  <div>
                    <label htmlFor="ck-endereco" className="mb-1.5 block text-sm font-medium text-ink">
                      Endereço para entrega
                    </label>
                    <textarea
                      id="ck-endereco"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      autoComplete="street-address"
                      rows={3}
                      placeholder="Rua, número, bairro e complemento"
                      aria-invalid={!!erros.endereco}
                      aria-describedby={erros.endereco ? "ck-endereco-erro" : undefined}
                      className={`${campo} resize-none py-3 ${erros.endereco ? "border-red-400" : "border-line"}`}
                    />
                    {erros.endereco && (
                      <p id="ck-endereco-erro" className="mt-1 text-sm text-red-300">
                        {erros.endereco}
                      </p>
                    )}
                  </div>
                  )}

                  <fieldset>
                    <legend className="text-sm font-medium text-ink">Como você vai pagar?</legend>
                    <p className="mb-2 text-xs text-ink-muted">
                      Marque uma ou duas formas. O pagamento é combinado com a loja na conversa.
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {FORMAS.map((f) => {
                        const marcada = pagamentos.includes(f);
                        return (
                          <button
                            key={f}
                            type="button"
                            aria-pressed={marcada}
                            onClick={() => {
                              setPagamentos((atual) => (marcada ? atual.filter((x) => x !== f) : [...atual, f]));
                              setErros((e) => ({ ...e, pagamento: undefined }));
                            }}
                            className={`min-h-12 rounded-xl border px-2 text-base font-medium transition-colors ${
                              marcada ? "border-gold bg-gold text-ground" : "border-line text-ink hover:border-gold/60"
                            }`}
                          >
                            {marcada ? "✓ " : ""}
                            {f}
                          </button>
                        );
                      })}
                    </div>
                    {erros.pagamento && <p className="mt-1 text-sm text-red-300">{erros.pagamento}</p>}

                    {pagamentos.includes("Dinheiro") && (
                      <div className="mt-3">
                        <label htmlFor="ck-troco" className="mb-1.5 block text-sm font-medium text-ink">
                          Precisa de troco? <span className="font-normal text-ink-muted">(opcional)</span>
                        </label>
                        <input
                          id="ck-troco"
                          inputMode="decimal"
                          value={troco}
                          onChange={(e) => setTroco(e.target.value)}
                          placeholder="Troco para quanto? Ex.: R$ 100"
                          className={`${campo} border-line`}
                        />
                      </div>
                    )}

                    {pagamentos.length > 1 && (
                      <div className="mt-3">
                        <label htmlFor="ck-divisao" className="mb-1.5 block text-sm font-medium text-ink">
                          Como quer dividir? <span className="font-normal text-ink-muted">(opcional)</span>
                        </label>
                        <input
                          id="ck-divisao"
                          value={divisao}
                          onChange={(e) => setDivisao(e.target.value)}
                          placeholder="Ex.: R$ 30 no Pix e o resto em dinheiro"
                          className={`${campo} border-line`}
                        />
                      </div>
                    )}
                  </fieldset>

                  <div>
                    <label htmlFor="ck-telefone" className="mb-1.5 block text-sm font-medium text-ink">
                      Telefone <span className="font-normal text-ink-muted">(opcional)</span>
                    </label>
                    <input
                      id="ck-telefone"
                      type="tel"
                      inputMode="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      autoComplete="tel"
                      placeholder="(45) 90000-0000"
                      className={`${campo} border-line`}
                    />
                  </div>

                  <p className="text-xs leading-relaxed text-ink-muted">
                    Seus dados ficam só neste aparelho e vão apenas na mensagem que você enviar à loja.
                  </p>
                </div>

                <div className="border-t border-line px-5 py-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-ink-muted">Total dos produtos</span>
                    <span className="font-display text-2xl text-ink">{formatBRL(total)}</span>
                  </div>
                  {modo === "entrega" && (
                    <p className="mt-1 text-xs text-ink-muted">Sem o valor da entrega, que o motoboy cota na hora.</p>
                  )}
                  <button
                    type="submit"
                    className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-lg font-semibold text-ground transition-colors hover:bg-gold-bright"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Enviar pedido pelo WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setPasso("carrinho")}
                    className="mt-1 min-h-11 w-full text-sm text-gold underline hover:text-gold-bright"
                  >
                    Voltar ao carrinho
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
