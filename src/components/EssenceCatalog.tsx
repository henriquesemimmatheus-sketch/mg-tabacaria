"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container, SectionHeading } from "./Container";
import { CloseIcon, WhatsAppIcon } from "./icons";
import { essencias, familias, marcas, type Essencia, type Familia } from "@/lib/essencias";
import { whatsappLink } from "@/lib/business";

const PASSO = 24;

type Gelado = "todos" | "sim" | "nao";
type Ordem = "az" | "marca";
type Vista = "grade" | "lista" | "marca";
type Filtros = { busca: string; familias: Familia[]; marcas: string[]; gelado: Gelado };

const VAZIO: Filtros = { busca: "", familias: [], marcas: [], gelado: "todos" };

const semAcento = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

function passa(e: Essencia, f: Filtros, ignorar?: "familia" | "marca" | "gelado") {
  if (ignorar !== "familia" && f.familias.length && !f.familias.includes(e.familia)) return false;
  if (ignorar !== "marca" && f.marcas.length && !f.marcas.includes(e.marca)) return false;
  if (ignorar !== "gelado" && f.gelado !== "todos" && e.gelado !== (f.gelado === "sim")) return false;
  const q = semAcento(f.busca);
  if (q && !semAcento(`${e.marca} ${e.nome}`).includes(q)) return false;
  return true;
}

const rotulo = (f: Familia) => familias.find((x) => x.id === f)?.label ?? f;
const alternar = <T,>(lista: T[], item: T) => (lista.includes(item) ? lista.filter((x) => x !== item) : [...lista, item]);

function Opcao({
  ativo,
  onClick,
  children,
  contagem,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
  contagem: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={ativo}
      className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm transition-colors ${
        ativo ? "bg-gold/15 text-gold-bright" : contagem === 0 ? "text-ink-muted/60 hover:bg-surface-2" : "text-ink hover:bg-surface-2"
      }`}
    >
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${ativo ? "border-gold bg-gold text-ground" : "border-line"}`}
        >
          {ativo ? "✓" : ""}
        </span>
        {children}
      </span>
      <span className="text-xs text-ink-muted">{contagem}</span>
    </button>
  );
}

// ---- Guia "Me ajude a escolher" ----
type Respostas = { gel: "sim" | "nao" | "any" | null; perfil: string | null; mix: "unico" | "mix" | "any" | null };

const PERGUNTAS: { k: keyof Respostas; t: string; o: [string, string][] }[] = [
  { k: "gel", t: "Você prefere sabor gelado?", o: [["sim", "Sim, gelado"], ["nao", "Sem gelo"], ["any", "Tanto faz"]] },
  {
    k: "perfil",
    t: "Qual perfil combina mais?",
    o: [["fruta", "Frutas"], ["doce", "Doces"], ["menta", "Mentolado"], ["citrico", "Cítricos"], ["any", "Surpreenda"]],
  },
  { k: "mix", t: "Um sabor só ou uma mistura?", o: [["unico", "Sabor único"], ["mix", "Mistura"], ["any", "Tanto faz"]] },
];

const PERFIL_FAMILIAS: Record<string, Familia[]> = {
  fruta: ["vermelhas", "tropicais", "uvas", "frutas_outras"],
  doce: ["doces"],
  menta: ["mentolado"],
  citrico: ["citricos"],
};

function perfilOk(e: Essencia, p: string | null) {
  return !p || p === "any" || (PERFIL_FAMILIAS[p] ?? []).includes(e.familia);
}

function embaralhar<T>(lista: T[], semente: number) {
  const r = [...lista];
  let x = semente + 7;
  for (let i = r.length - 1; i > 0; i--) {
    x = (x * 9301 + 49297) % 233280;
    const j = Math.floor((x / 233280) * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function EssenceCatalog() {
  const [f, setF] = useState<Filtros>(VAZIO);
  const [ordem, setOrdem] = useState<Ordem>("az");
  const [vista, setVista] = useState<Vista>("grade");
  const [visiveis, setVisiveis] = useState(PASSO);
  const [gaveta, setGaveta] = useState(false);
  const [produto, setProduto] = useState<Essencia | null>(null);
  const [guiaPasso, setGuiaPasso] = useState<number | null>(null); // null = fechado; 0..2 = perguntas; 3 = resultado
  const [resp, setResp] = useState<Respostas>({ gel: null, perfil: null, mix: null });
  const [semente, setSemente] = useState(0);
  const [naTela, setNaTela] = useState(false);
  const secao = useRef<HTMLElement>(null);
  const topoLista = useRef<HTMLDivElement>(null);
  const foco = useRef<HTMLElement | null>(null);

  const mudar = (novo: Partial<Filtros>) => {
    setF((atual) => ({ ...atual, ...novo }));
    setVisiveis(PASSO);
  };
  const limpar = () => {
    setF(VAZIO);
    setVisiveis(PASSO);
  };
  const abrirProduto = (e: Essencia, el: HTMLElement) => {
    foco.current = el;
    setProduto(e);
  };
  const irParaLista = () => topoLista.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const lista = useMemo(() => {
    const r = essencias.filter((e) => passa(e, f));
    return r.sort((a, b) =>
      ordem === "marca"
        ? marcas.indexOf(a.marca) - marcas.indexOf(b.marca) || a.nome.localeCompare(b.nome, "pt-BR")
        : a.nome.localeCompare(b.nome, "pt-BR") || a.marca.localeCompare(b.marca, "pt-BR"),
    );
  }, [f, ordem]);

  // Cada contagem ignora o próprio filtro, pra mostrar quantos resultados a opção traria.
  const contFamilia = useMemo(() => {
    const m = new Map<Familia, number>();
    for (const e of essencias) if (passa(e, f, "familia")) m.set(e.familia, (m.get(e.familia) ?? 0) + 1);
    return m;
  }, [f]);
  const contMarca = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of essencias) if (passa(e, f, "marca")) m.set(e.marca, (m.get(e.marca) ?? 0) + 1);
    return m;
  }, [f]);
  const contGelado = useMemo(() => {
    const r = { todos: 0, sim: 0, nao: 0 };
    for (const e of essencias)
      if (passa(e, f, "gelado")) {
        r.todos++;
        if (e.gelado) r.sim++;
        else r.nao++;
      }
    return r;
  }, [f]);
  const totalPorFamilia = useMemo(() => {
    const m = new Map<Familia, number>();
    for (const e of essencias) m.set(e.familia, (m.get(e.familia) ?? 0) + 1);
    return m;
  }, []);

  const filtrando = !!(f.busca || f.familias.length || f.marcas.length || f.gelado !== "todos");

  // Resultado do guia: até 6 opções, abrindo um critério de cada vez se houver poucas.
  const sugestoes = useMemo(() => {
    if (guiaPasso !== 3) return { itens: [] as Essencia[], ampliou: false };
    const pick = (relax: number) =>
      essencias.filter(
        (e) =>
          perfilOk(e, resp.perfil) &&
          (relax >= 2 || resp.gel === "any" || !resp.gel || e.gelado === (resp.gel === "sim")) &&
          (relax >= 1 || resp.mix === "any" || !resp.mix || e.mistura === (resp.mix === "mix")),
      );
    let relax = 0;
    let itens = pick(0);
    while (itens.length < 3 && relax < 2) {
      relax++;
      itens = pick(relax);
    }
    return { itens: embaralhar(itens, semente).slice(0, 6), ampliou: relax > 0 };
  }, [guiaPasso, resp, semente]);

  function aplicarGuiaNaLista() {
    setF({
      ...VAZIO,
      familias: resp.perfil && resp.perfil !== "any" ? PERFIL_FAMILIAS[resp.perfil] : [],
      gelado: resp.gel === "sim" || resp.gel === "nao" ? resp.gel : "todos",
    });
    setVisiveis(PASSO);
    setGuiaPasso(null);
    setTimeout(irParaLista, 50);
  }

  useEffect(() => {
    const el = secao.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setNaTela(en.isIntersecting), { rootMargin: "-20% 0px -20% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const aberto = gaveta || !!produto || guiaPasso !== null;
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      setGaveta(false);
      setProduto(null);
      setGuiaPasso(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  // Ao fechar o modal, devolve o foco ao card de onde ele saiu, sem mexer na rolagem.
  useEffect(() => {
    if (!aberto && foco.current) {
      foco.current.focus({ preventScroll: true });
      foco.current = null;
    }
  }, [aberto]);

  const painelFiltros = (
    <div className="space-y-6">
      <div>
        <label htmlFor="busca-essencia" className="mb-2 block text-sm font-medium text-ink">
          Buscar
        </label>
        <input
          id="busca-essencia"
          type="search"
          value={f.busca}
          onChange={(e) => mudar({ busca: e.target.value })}
          placeholder="Sabor ou marca"
          className="min-h-11 w-full rounded-full border border-line bg-surface px-4 text-ink placeholder:text-ink-muted focus:border-gold focus:outline-none"
        />
      </div>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-ink">Perfil de sabor</legend>
        {familias.map((fa) => (
          <Opcao key={fa.id} ativo={f.familias.includes(fa.id)} contagem={contFamilia.get(fa.id) ?? 0} onClick={() => mudar({ familias: alternar(f.familias, fa.id) })}>
            {fa.label}
          </Opcao>
        ))}
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-ink">Marca</legend>
        {marcas.map((m) => (
          <Opcao key={m} ativo={f.marcas.includes(m)} contagem={contMarca.get(m) ?? 0} onClick={() => mudar({ marcas: alternar(f.marcas, m) })}>
            {m}
          </Opcao>
        ))}
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-ink">Gelado</legend>
        {(
          [
            ["todos", "Todos"],
            ["sim", "Só gelados"],
            ["nao", "Sem gelo"],
          ] as [Gelado, string][]
        ).map(([v, label]) => (
          <Opcao key={v} ativo={f.gelado === v} contagem={contGelado[v]} onClick={() => mudar({ gelado: v })}>
            {label}
          </Opcao>
        ))}
      </fieldset>

      <div>
        <label htmlFor="ordem-essencia" className="mb-2 block text-sm font-medium text-ink">
          Ordenar
        </label>
        <select
          id="ordem-essencia"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value as Ordem)}
          className="min-h-11 w-full rounded-full border border-line bg-surface px-4 text-ink focus:border-gold focus:outline-none"
        >
          <option value="az">A a Z</option>
          <option value="marca">Por marca</option>
        </select>
      </div>
    </div>
  );

  const chipsAplicados: { chave: string; texto: string; remover: () => void }[] = [
    ...(f.busca ? [{ chave: "busca", texto: `Busca: ${f.busca}`, remover: () => mudar({ busca: "" }) }] : []),
    ...f.familias.map((x) => ({ chave: `f-${x}`, texto: rotulo(x), remover: () => mudar({ familias: f.familias.filter((y) => y !== x) }) })),
    ...f.marcas.map((x) => ({ chave: `m-${x}`, texto: x, remover: () => mudar({ marcas: f.marcas.filter((y) => y !== x) }) })),
    ...(f.gelado !== "todos"
      ? [{ chave: "gelado", texto: f.gelado === "sim" ? "Só gelados" : "Sem gelo", remover: () => mudar({ gelado: "todos" }) }]
      : []),
  ];

  const cartao = (e: Essencia) => (
    <button
      onClick={(ev) => abrirProduto(e, ev.currentTarget)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left transition-colors hover:border-gold/60"
    >
      <div className="relative flex aspect-square items-center justify-center border-b border-line bg-[radial-gradient(circle_at_50%_40%,#2b2620,#171412)]">
        {e.foto ? (
          <Image src={e.foto} alt="" fill sizes="(min-width: 1280px) 200px, (min-width: 640px) 30vw, 45vw" className="object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)]" />
        ) : (
          <span className="px-3 text-center font-condensed text-2xl uppercase leading-none tracking-wide text-gold-bright">{e.marca}</span>
        )}
        {e.gelado && <span className="absolute right-2 top-2 rounded-full bg-ground/85 px-2 py-0.5 text-xs text-gold-bright">Gelado</span>}
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-xs text-gold">{e.marca}</p>
        <h3 className="mt-0.5 text-sm font-medium leading-snug text-ink sm:text-base">{e.nome}</h3>
        <p className="mt-1 text-xs text-ink-muted">{rotulo(e.familia)}</p>
      </div>
    </button>
  );

  const linha = (e: Essencia) => (
    <button
      onClick={(ev) => abrirProduto(e, ev.currentTarget)}
      className="flex min-h-14 w-full items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2 text-left transition-colors hover:border-gold/60"
    >
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surface-2">
        {e.foto && <Image src={e.foto} alt="" fill sizes="40px" className="object-contain" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-ink">{e.nome}</span>
        <span className="block truncate text-xs text-ink-muted">
          {e.marca} · {rotulo(e.familia)}
        </span>
      </span>
      {e.gelado && <span className="shrink-0 rounded-full border border-gold/50 px-2 py-0.5 text-xs text-gold">Gelado</span>}
    </button>
  );

  const corpoLista = () => {
    if (vista === "marca") {
      const porMarca = new Map<string, Essencia[]>();
      for (const e of lista) porMarca.set(e.marca, [...(porMarca.get(e.marca) ?? []), e]);
      return (
        <div className="mt-5 space-y-10">
          {marcas
            .filter((m) => porMarca.has(m))
            .map((m) => (
              <div key={m}>
                <h3 className="mb-4 flex items-baseline gap-3 border-b border-line pb-2 font-condensed text-3xl uppercase tracking-wide text-ink">
                  {m}
                  <small className="font-sans text-sm normal-case tracking-normal text-gold">{porMarca.get(m)!.length} sabores</small>
                </h3>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
                  {porMarca.get(m)!.map((e) => (
                    <li key={e.id}>{cartao(e)}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      );
    }
    const parte = lista.slice(0, visiveis);
    return vista === "lista" ? (
      <ul className="mt-5 space-y-2">
        {parte.map((e) => (
          <li key={e.id}>{linha(e)}</li>
        ))}
      </ul>
    ) : (
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
        {parte.map((e) => (
          <li key={e.id}>{cartao(e)}</li>
        ))}
      </ul>
    );
  };

  const pergunta = guiaPasso !== null && guiaPasso < 3 ? PERGUNTAS[guiaPasso] : null;

  return (
    <section id="essencias" ref={secao} className="relative border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Tabacaria"
          title="Essências"
          description={`${essencias.length} sabores de ${marcas.length} marcas. Escolha pelo perfil, filtre por marca ou deixe o guia sugerir algumas opções.`}
        />

        {/* Me ajude a escolher */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold/40 bg-surface p-5">
          <div>
            <p className="font-condensed text-3xl uppercase leading-none text-ink">Me ajude a escolher</p>
            <p className="mt-2 max-w-md text-sm text-ink-muted">Três perguntas rápidas e o guia mostra até 6 sabores da lista.</p>
          </div>
          <button
            onClick={() => {
              setResp({ gel: null, perfil: null, mix: null });
              setSemente(0);
              setGuiaPasso(0);
            }}
            className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 font-medium text-ground hover:bg-gold-bright"
          >
            Começar o guia
          </button>
        </div>

        {/* Entradas rápidas por perfil */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" role="group" aria-label="Explorar por perfil">
          {familias.map((fa) => {
            const ativo = f.familias.length === 1 && f.familias[0] === fa.id;
            return (
              <button
                key={fa.id}
                aria-pressed={ativo}
                onClick={() => {
                  mudar({ familias: ativo ? [] : [fa.id] });
                  if (!ativo) setTimeout(irParaLista, 50);
                }}
                className={`flex min-h-20 flex-col justify-between rounded-2xl border p-3 text-left transition-colors ${
                  ativo ? "border-gold bg-gold/15" : "border-line bg-surface hover:border-gold/60"
                }`}
              >
                <span className="font-condensed text-xl uppercase leading-none tracking-wide text-ink">{fa.label}</span>
                <span className="mt-2 text-xs text-ink-muted">{totalPorFamilia.get(fa.id) ?? 0} sabores</span>
              </button>
            );
          })}
        </div>

        <div ref={topoLista} className="mt-10 scroll-mt-36 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">{painelFiltros}</div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="lg:hidden">
                <label htmlFor="busca-rapida" className="sr-only">
                  Buscar sabor ou marca
                </label>
                <input
                  id="busca-rapida"
                  type="search"
                  value={f.busca}
                  onChange={(e) => mudar({ busca: e.target.value })}
                  placeholder="Buscar sabor ou marca"
                  className="min-h-12 w-[calc(100vw-3rem)] max-w-full rounded-full border border-line bg-surface px-5 text-ink placeholder:text-ink-muted focus:border-gold focus:outline-none sm:w-80"
                />
              </div>
              <div className="inline-flex overflow-hidden rounded-full border border-line" role="group" aria-label="Forma de ver a lista">
                {(
                  [
                    ["grade", "Grade"],
                    ["lista", "Lista"],
                    ["marca", "Por marca"],
                  ] as [Vista, string][]
                ).map(([v, l]) => (
                  <button
                    key={v}
                    aria-pressed={vista === v}
                    onClick={() => setVista(v)}
                    className={`min-h-11 px-4 text-sm transition-colors ${vista === v ? "bg-gold text-ground" : "text-ink hover:bg-surface-2"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <p className="mr-2 text-sm text-ink-muted" aria-live="polite">
                {lista.length} {lista.length === 1 ? "sabor" : "sabores"}
              </p>
              {chipsAplicados.map((c) => (
                <button
                  key={c.chave}
                  onClick={c.remover}
                  aria-label={`Remover filtro ${c.texto}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-4 text-sm text-gold-bright"
                >
                  {c.texto}
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              ))}
              {filtrando && (
                <button onClick={limpar} className="min-h-11 px-2 text-sm text-gold underline hover:text-gold-bright">
                  Limpar filtros
                </button>
              )}
            </div>

            {lista.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
                <p className="font-condensed text-3xl uppercase text-ink">Nenhum sabor com esses filtros</p>
                <p className="mt-2 text-sm text-ink-muted">Tente remover algum filtro ou limpe todos para ver a lista completa.</p>
                <button
                  onClick={limpar}
                  className="mt-5 inline-flex min-h-11 items-center rounded-full bg-gold px-6 text-sm font-medium text-ground hover:bg-gold-bright"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              corpoLista()
            )}

            {vista !== "marca" && lista.length > visiveis && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisiveis((v) => v + PASSO)}
                  className="inline-flex min-h-12 items-center rounded-full border border-gold px-8 text-gold transition-colors hover:text-gold-bright"
                >
                  Ver mais ({lista.length - visiveis})
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Botão fixo de filtros (celular) */}
      {naTela && !aberto && (
        <button
          onClick={() => setGaveta(true)}
          className="fixed bottom-24 left-1/2 z-30 inline-flex min-h-12 -translate-x-1/2 items-center gap-2 rounded-full border border-gold bg-ground px-6 text-sm font-medium text-gold-bright shadow-lg shadow-black/50 lg:hidden"
        >
          Filtrar e ordenar
          {chipsAplicados.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] text-ground">{chipsAplicados.length}</span>
          )}
        </button>
      )}

      {/* Gaveta de filtros (celular) */}
      {gaveta && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtrar e ordenar">
          <button aria-label="Fechar filtros" onClick={() => setGaveta(false)} className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[90vh] flex-col rounded-t-2xl border-t border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <h3 className="font-condensed text-2xl uppercase tracking-wide text-ink">Filtrar e ordenar</h3>
              <div className="flex items-center gap-1">
                {filtrando && (
                  <button onClick={limpar} className="min-h-11 px-3 text-sm text-gold underline">
                    Limpar
                  </button>
                )}
                <button onClick={() => setGaveta(false)} aria-label="Fechar filtros" className="flex h-11 w-11 items-center justify-center text-ink-muted">
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{painelFiltros}</div>
            <div className="border-t border-line p-4">
              <button
                onClick={() => setGaveta(false)}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-medium text-ground hover:bg-gold-bright"
              >
                Mostrar {lista.length} {lista.length === 1 ? "resultado" : "resultados"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guia: Me ajude a escolher */}
      {guiaPasso !== null && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Me ajude a escolher">
          <button aria-label="Fechar guia" onClick={() => setGuiaPasso(null)} className="absolute inset-0 bg-black/75" />
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-line bg-surface p-6 sm:rounded-2xl">
            <button
              onClick={() => setGuiaPasso(null)}
              aria-label="Fechar guia"
              className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-ink-muted"
            >
              <CloseIcon className="h-6 w-6" />
            </button>

            {pergunta ? (
              <div className="pt-4">
                <p className="text-sm text-gold">
                  Pergunta {guiaPasso! + 1} de {PERGUNTAS.length}
                </p>
                <h3 className="mt-2 font-condensed text-4xl uppercase leading-none text-ink">{pergunta.t}</h3>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {pergunta.o.map(([v, l]) => (
                    <button
                      key={v}
                      onClick={() => {
                        setResp((r) => ({ ...r, [pergunta.k]: v }) as Respostas);
                        setGuiaPasso((p) => (p ?? 0) + 1);
                      }}
                      className="min-h-14 rounded-xl border border-line bg-surface-2 px-3 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold-bright"
                    >
                      {l}
                    </button>
                  ))}
                </div>
                {guiaPasso! > 0 && (
                  <button onClick={() => setGuiaPasso((p) => (p ?? 1) - 1)} className="mt-5 min-h-11 text-sm text-gold underline">
                    Voltar
                  </button>
                )}
              </div>
            ) : (
              <div className="pt-4">
                <p className="text-sm text-gold">Resultado</p>
                <h3 className="mt-2 font-condensed text-4xl uppercase leading-none text-ink">
                  {sugestoes.itens.length ? "Sugestões para você" : "Sem sugestões"}
                </h3>
                {sugestoes.ampliou && <p className="mt-3 text-sm text-ink-muted">Poucas opções exatas, então ampliei um critério.</p>}
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {sugestoes.itens.map((e) => (
                    <li key={e.id}>
                      <button
                        onClick={(ev) => {
                          foco.current = ev.currentTarget;
                          setGuiaPasso(null);
                          setProduto(e);
                        }}
                        className="h-full w-full rounded-xl border border-line bg-surface-2 p-3 text-left hover:border-gold/60"
                      >
                        <span className="block text-xs text-gold">{e.marca}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-ink">{e.nome}</span>
                        <span className="mt-1 block text-xs text-ink-muted">{rotulo(e.familia)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => setSemente((s) => s + 1)} className="min-h-11 rounded-full border border-gold px-5 text-sm text-gold hover:text-gold-bright">
                    Ver outras opções
                  </button>
                  <button onClick={() => setGuiaPasso(0)} className="min-h-11 rounded-full border border-line px-5 text-sm text-ink hover:border-gold/60">
                    Refazer o guia
                  </button>
                  <button onClick={aplicarGuiaNaLista} className="min-h-11 rounded-full bg-gold px-5 text-sm font-medium text-ground hover:bg-gold-bright">
                    Ver na lista com filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detalhes da essência: fica por cima da lista, então filtros e rolagem continuam onde estavam */}
      {produto && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={`${produto.marca} ${produto.nome}`}>
          <button aria-label="Fechar detalhes" onClick={() => setProduto(null)} className="absolute inset-0 bg-black/75" />
          <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-line bg-surface sm:rounded-2xl">
            <button
              autoFocus
              onClick={() => setProduto(null)}
              aria-label="Fechar detalhes"
              className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ground/80 text-ink"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
            <div className="relative flex aspect-square w-full items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#2b2620,#171412)]">
              {produto.foto ? (
                <Image src={produto.foto} alt={`${produto.marca} ${produto.nome}`} fill sizes="448px" className="object-contain" />
              ) : (
                <span className="px-6 text-center font-condensed text-5xl uppercase leading-none tracking-wide text-gold-bright">{produto.marca}</span>
              )}
            </div>
            <div className="p-5">
              <p className="text-sm text-gold">{produto.marca}</p>
              <h3 className="mt-1 font-condensed text-4xl uppercase leading-none text-ink">{produto.nome}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Essência de narguilé sabor {produto.nome}, da marca {produto.marca}.
              </p>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
                <dt className="text-ink-muted">Marca</dt>
                <dd className="text-ink">{produto.marca}</dd>
                <dt className="text-ink-muted">Perfil</dt>
                <dd className="text-ink">{rotulo(produto.familia)}</dd>
                <dt className="text-ink-muted">Gelado</dt>
                <dd className="text-ink">{produto.gelado ? "Sim" : "Não"}</dd>
                <dt className="text-ink-muted">Composição</dt>
                <dd className="text-ink">{produto.mistura ? "Mistura de sabores" : "Sabor único"}</dd>
              </dl>
              <a
                href={whatsappLink(`Olá! Quero saber sobre a essência ${produto.marca} ${produto.nome}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold font-medium text-ground hover:bg-gold-bright"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
