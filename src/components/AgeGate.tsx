"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/business";

const STORAGE_KEY = "mg-tabacaria-age-confirmed";

export function AgeGate() {
  const [status, setStatus] = useState<"checking" | "gate" | "blocked" | "ok">("checking");

  useEffect(() => {
    // localStorage only exists client-side, so this can't be read during the initial render.
    try {
      const confirmed = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus(confirmed === "true" ? "ok" : "gate");
    } catch {
      setStatus("gate");
    }
  }, []);

  function confirm() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setStatus("ok");
  }

  if (status === "checking" || status === "ok") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ground p-6">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 text-center">
        <p className="font-display text-2xl text-ink">
          <span className="text-gold-bright">MG</span> Tabacaria
        </p>

        {status === "gate" && (
          <>
            <p className="mt-5 text-ink-muted leading-relaxed">
              Este site apresenta bebidas alcoólicas e produtos para narguilé. Confirme que você
              é maior de 18 anos para continuar.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <button
                onClick={confirm}
                className="rounded-full bg-gold px-6 py-2.5 font-medium text-ground transition-colors hover:bg-gold-bright"
              >
                Sou maior de 18 anos
              </button>
              <button
                onClick={() => setStatus("blocked")}
                className="rounded-full border border-line px-6 py-2.5 text-ink-muted transition-colors hover:border-gold/40"
              >
                Sou menor
              </button>
            </div>
          </>
        )}

        {status === "blocked" && (
          <p className="mt-5 text-ink-muted leading-relaxed">
            O conteúdo da {business.name} é destinado apenas a maiores de 18 anos. Volte quando
            atingir a idade permitida.
          </p>
        )}
      </div>
    </div>
  );
}
