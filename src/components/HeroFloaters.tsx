"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Garrafas cortadas pelas bordas. No celular ficam discretas pra não brigar com o texto.
// `speed`: quanto a garrafa desce em relação à rolagem (px por px rolado; negativo sobe).
// `spin`: quanto ela gira por px rolado (graus).
const floaters = [
  {
    src: "/whisky/jack7.webp",
    w: 360,
    h: 1000,
    className:
      "-left-5 top-[34%] w-20 opacity-50 sm:hidden lg:left-auto lg:right-[26%] lg:top-[30%] lg:block lg:w-32 lg:opacity-95",
    rotate: "-12deg",
    dur: "8s",
    delay: "0s",
    speed: 0.28,
    spin: -0.05,
  },
  {
    src: "/whisky/jw-red.webp",
    w: 264,
    h: 1000,
    className:
      "-right-4 top-[14%] w-16 opacity-50 sm:-right-5 sm:top-[16%] sm:w-20 sm:opacity-90 lg:right-[7%] lg:top-[16%] lg:w-28 lg:opacity-95",
    rotate: "-16deg",
    dur: "9.5s",
    delay: "-3s",
    speed: -0.12,
    spin: -0.06,
  },
  {
    src: "/whisky/buchanans.webp",
    w: 514,
    h: 1000,
    className: "hidden lg:right-[15%] lg:bottom-[8%] lg:block lg:w-40",
    rotate: "8deg",
    dur: "10s",
    delay: "-5s",
    speed: 0.45,
    spin: 0.04,
  },
  {
    src: "/whisky/chivas.webp",
    w: 388,
    h: 1000,
    className: "hidden lg:-right-4 lg:bottom-[22%] lg:block lg:w-32",
    rotate: "-10deg",
    dur: "8.5s",
    delay: "-1.5s",
    speed: 0.18,
    spin: -0.07,
  },
  {
    src: "/narguile-flutuante.webp",
    w: 340,
    h: 1000,
    className:
      "-right-1 top-[50%] w-24 opacity-70 sm:right-6 sm:top-[34%] sm:w-28 sm:opacity-90 lg:right-[1%] lg:top-[24%] lg:w-44 lg:opacity-100",
    rotate: "6deg",
    dur: "9s",
    delay: "-2s",
    speed: -0.35,
    spin: 0.03,
  },
];

export function HeroFloaters() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      // Só importa enquanto o hero está na tela; depois disso o valor fica travado.
      const y = Math.min(window.scrollY, 900);
      el.style.setProperty("--hp", `${y}px`);
      el.style.setProperty("--hn", String(y));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {floaters.map((f) => (
        <div
          key={f.src}
          className={`absolute ${f.className}`}
          style={{
            translate: `0 calc(var(--hp, 0px) * ${f.speed})`,
            rotate: `calc(var(--hn, 0) * ${f.spin}deg)`,
          }}
        >
          <div
            className="float-bottle"
            style={{ "--r": f.rotate, "--dur": f.dur, "--delay": f.delay } as React.CSSProperties}
          >
            <Image
              src={f.src}
              alt=""
              width={f.w}
              height={f.h}
              className="h-auto w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
