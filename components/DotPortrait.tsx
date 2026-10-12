"use client";

import { useEffect, useRef } from "react";

// dark -> light; dot colour and size both follow the photo's luminance
const PALETTE = ["#6e2c14", "#a8421a", "#d9642a", "#f2a33c", "#f6c877", "#fbe9c4"];
const INTRO_MS = 320;
const SCAN_PERIOD_MS = 5200;
const SCAN_BAND = 22;
const REPEL_RADIUS = 170;
const REPEL_PUSH = 30;

type Dot = { x: number; y: number; size: number; delay: number; phase: number; ox: number; oy: number };

function buildDots(img: HTMLImageElement, width: number, height: number) {
  const cell = Math.max(3, width / 165);
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const sampler = document.createElement("canvas");
  sampler.width = cols;
  sampler.height = rows;
  const sctx = sampler.getContext("2d", { willReadFrequently: true });
  const groups: Dot[][] = PALETTE.map(() => []);
  if (!sctx || cols < 2 || rows < 2) return groups;

  sctx.imageSmoothingQuality = "high";
  sctx.drawImage(img, 0, 0, cols, rows);
  const { data } = sctx.getImageData(0, 0, cols, rows);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = (row * cols + col) * 4;
      if (data[i + 3] < 110) continue; // outside the cutout
      const raw = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
      // dim toward the bottom so the torso recedes and the face carries the highlights
      const v = row / rows;
      const falloff = v < 0.45 ? 1 : Math.max(0.28, 1 - (v - 0.45) * 1.5);
      const lum = Math.min(1, Math.max(0, (raw - 0.08) / 0.8)) * falloff;
      const bucket = Math.min(PALETTE.length - 1, Math.floor(lum * PALETTE.length));
      groups[bucket].push({
        x: (col + 0.5) * cell,
        y: (row + 0.5) * cell,
        size: cell * (0.4 + 0.5 * lum),
        delay: (row / rows) * 900 + Math.random() * 500,
        phase: col * 0.18 + row * 0.11,
        ox: 0,
        oy: 0,
      });
    }
  }
  return groups;
}

type Props = { src: string; alt: string; className?: string; style?: React.CSSProperties };

// Portrait rendered as a dot matrix. Dots scatter away from the cursor and the real photo
// shows through a soft circle under it; a scan beam sweeps down on a loop.
export default function DotPortrait({ src, alt, className = "", style }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const photo = photoRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !photo || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // phones get half the frame rate
    const frameMs = window.matchMedia("(pointer: coarse)").matches ? 1000 / 30 : 1000 / 60;
    let groups: Dot[][] = [];
    let width = 0;
    let height = 0;
    let startedAt = document.documentElement.classList.contains("booted") ? performance.now() : -1;
    let visible = true;
    let inside = false;
    let lastPaint = 0;
    let raf = 0;

    const target = { x: -999, y: -999 };
    const pos = { x: -999, y: -999 };

    const rebuild = () => {
      width = wrap.offsetWidth;
      height = wrap.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (photo.complete && photo.naturalWidth) groups = buildDots(photo, width, height);
      lastPaint = 0;
    };

    const paint = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      if (startedAt < 0) return;
      const t = now - startedAt;
      const scanY = reduce || t < 1800 ? -999 : ((t % SCAN_PERIOD_MS) / SCAN_PERIOD_MS) * (height + 300) - 150;
      const r2 = REPEL_RADIUS * REPEL_RADIUS;

      groups.forEach((dots, c) => {
        ctx.fillStyle = PALETTE[c];
        for (const d of dots) {
          const k = reduce ? 1 : Math.min(1, (t - d.delay) / INTRO_MS);
          if (k <= 0) continue;

          // push away from the cursor, ease back when it leaves
          let tx = 0;
          let ty = 0;
          if (inside && !reduce) {
            const dx = d.x - pos.x;
            const dy = d.y - pos.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < r2) {
              const dist = Math.sqrt(dist2) || 1;
              const f = 1 - dist / REPEL_RADIUS;
              tx = (dx / dist) * f * f * REPEL_PUSH;
              ty = (dy / dist) * f * f * REPEL_PUSH;
            }
          }
          d.ox += (tx - d.ox) * 0.18;
          d.oy += (ty - d.oy) * 0.18;

          const wave = reduce ? 1 : 1 + 0.14 * Math.sin(now * 0.0022 + d.phase);
          const scan = Math.max(0, 1 - Math.abs(d.y - scanY) / SCAN_BAND);
          const s = d.size * k * wave * (1 + scan * 0.9);
          // dots drop into place as the intro scan passes
          ctx.fillRect(d.x + d.ox - s / 2, d.y + d.oy - s / 2 - (1 - k) * 10, s, s);
        }
      });

      // tint the dots under the scan beam
      if (scanY > -SCAN_BAND) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = "rgba(251, 233, 196, 0.38)";
        ctx.fillRect(0, scanY - SCAN_BAND / 2, width, SCAN_BAND);
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      // the hero is sticky, so "on screen" isn't enough: stop once later sections cover it
      if (!visible || window.scrollY > window.innerHeight) return;
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      photo.style.setProperty("--mx", `${pos.x}px`);
      photo.style.setProperty("--my", `${pos.y}px`);
      if (now - lastPaint < frameMs - 2 || (reduce && lastPaint)) return;
      lastPaint = now;
      paint(now);
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nowInside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (nowInside) {
        // snap instead of sliding in from wherever the cursor last was
        if (!inside) Object.assign(pos, { x, y });
        Object.assign(target, { x, y });
      }
      inside = nowInside;
      photo.style.opacity = inside ? "1" : "0";
    };
    // a lifted finger has no hover position, so let the dots close back up
    const onRelease = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      inside = false;
      photo.style.opacity = "0";
    };
    const onEnter = () => {
      startedAt = performance.now();
    };

    const ro = new ResizeObserver(rebuild);
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);
    photo.addEventListener("load", rebuild);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("pointerup", onRelease);
    window.addEventListener("pointercancel", onRelease);
    window.addEventListener("os:enter", onEnter);
    rebuild();
    raf = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      io.disconnect();
      photo.removeEventListener("load", rebuild);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
      window.removeEventListener("os:enter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`touch-pan-y ${className}`} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element -- needs the raw element as a canvas source */}
      <img
        ref={photoRef}
        src={src}
        alt={alt}
        className="spotlight absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300"
        draggable={false}
      />
    </div>
  );
}
