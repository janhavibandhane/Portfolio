"use client";

import { useEffect, useRef } from "react";

const GRID = 28;
const FRAME_MS = 1000 / 30;
const GLOW_RADIUS = 180;

// Rippling dot grid behind the hero. Also publishes the pointer position to the parent
// section as --px / --py (-1..1) so `.parallax` layers can shift with it.
export default function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let lastPaint = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };
    const par = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      w = section.clientWidth;
      h = section.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastPaint = 0;
    };

    const paint = (now: number) => {
      const t = reduce ? 0 : now * 0.0006;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f2a33c";
      for (let y = GRID / 2; y < h; y += GRID) {
        for (let x = GRID / 2; x < w; x += GRID) {
          const wave = Math.max(0, Math.sin(x * 0.011 + t * 2.1) * Math.cos(y * 0.016 - t * 1.4));
          const near = Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / GLOW_RADIUS);
          const s = 1 + wave * 2.2 + near * 4;
          ctx.globalAlpha = 0.08 + wave * 0.2 + near * 0.55;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      // the hero is sticky, so "on screen" isn't enough: stop once later sections cover it
      if (!visible || window.scrollY > window.innerHeight) return;
      par.x += (par.tx - par.x) * 0.06;
      par.y += (par.ty - par.y) * 0.06;
      section.style.setProperty("--px", par.x.toFixed(3));
      section.style.setProperty("--py", par.y.toFixed(3));
      if (now - lastPaint < FRAME_MS || (reduce && lastPaint)) return;
      lastPaint = now;
      paint(now);
    };

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (reduce || e.pointerType === "touch") return;
      par.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      par.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(section);
    window.addEventListener("pointermove", onMove);
    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
