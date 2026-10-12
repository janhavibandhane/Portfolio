"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "█▓▒░<>/\\_#01";
const DURATION_MS = 450;

// Text that decodes from noise when its link is hovered, and once after the boot screen.
export default function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = el.closest("a, button") ?? el;
    let raf = 0;
    let timer = 0;

    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION_MS);
        const settled = Math.floor(p * text.length);
        el.textContent =
          text.slice(0, settled) +
          Array.from(text.slice(settled), (c) =>
            c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          ).join("");
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const onBoot = () => {
      timer = window.setTimeout(run, 1000);
    };

    host.addEventListener("pointerenter", run);
    window.addEventListener("os:enter", onBoot);
    return () => {
      host.removeEventListener("pointerenter", run);
      window.removeEventListener("os:enter", onBoot);
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      el.textContent = text;
    };
  }, [text]);

  return <span ref={ref}>{text}</span>;
}
