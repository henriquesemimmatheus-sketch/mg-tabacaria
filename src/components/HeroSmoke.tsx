"use client";

import { useEffect, useRef } from "react";

// Fumaça só como atmosfera no hero: partículas translúcidas subindo, sem imagem de cigarro ou de pessoa.
type Particle = { x: number; y: number; r: number; vy: number; drift: number; seed: number; a: number };

const BASE_OPACITY = 0.5;

export function HeroSmoke() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const count = mobile ? 40 : 120;

    // Bolinha de fumaça pré-desenhada: desenhar a imagem é bem mais barato que um gradiente por partícula.
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 128;
    const sctx = sprite.getContext("2d");
    if (!sctx) return;
    const g = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(238,230,216,0.55)");
    g.addColorStop(0.45, "rgba(238,230,216,0.16)");
    g.addColorStop(1, "rgba(238,230,216,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 128, 128);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const make = (randomY: boolean): Particle => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 60 + Math.random() * 120,
      r: (mobile ? 50 : 70) + Math.random() * (mobile ? 70 : 110),
      vy: 14 + Math.random() * 26,
      drift: 10 + Math.random() * 26,
      seed: Math.random() * Math.PI * 2,
      a: 0.25 + Math.random() * 0.55,
    });

    const resize = () => {
      const r = el.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) particles = Array.from({ length: count }, () => make(true));
    };

    // 0 no topo do hero, 1 quando o hero já saiu da tela.
    const progress = () => {
      const r = el.getBoundingClientRect();
      return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    };

    let t = 0;
    const draw = (dt: number) => {
      const p = progress();
      ctx.clearRect(0, 0, w, h);
      const fade = (1 - p) * BASE_OPACITY;
      if (fade <= 0.003) return;
      // A fumaça acelera e sobe mais rápido que o conteúdo conforme o hero vai embora.
      const boost = 1 + p * 4;
      const lift = p * h * 0.55;
      for (const q of particles) {
        q.y -= q.vy * boost * dt;
        if (q.y + q.r < 0) Object.assign(q, make(false));
        const x = q.x + Math.sin(t * 0.00035 + q.seed) * q.drift;
        const y = q.y - lift;
        if (y + q.r < 0 || y - q.r > h) continue;
        ctx.globalAlpha = q.a * fade;
        ctx.drawImage(sprite, x - q.r, y - q.r, q.r * 2, q.r * 2);
      }
      ctx.globalAlpha = 1;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(0);
    });
    ro.observe(el);

    if (reduce) {
      // Sem movimento: um quadro estático e suave.
      draw(0);
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    let running = false;
    const frame = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      t = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Só anima enquanto o hero aparece na tela e a aba está ativa.
    let visible = true;
    const sync = () => (visible && !document.hidden ? start() : stop());
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    draw(0);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvas} className="h-full w-full mix-blend-screen" />
    </div>
  );
}
