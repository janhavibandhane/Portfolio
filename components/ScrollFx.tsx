"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Publishes scroll progress as CSS variables so animation stays in CSS:
//   [data-scroll="top"]  --p = how far the first screen has been scrolled away
//   [data-scroll="pin"]  --p = progress through a tall section with a sticky child
//   [data-scroll="view"] --p = progress of the element across the viewport
// Variables are written only when their value changes, and only on the element that uses
// them: a custom property set on <html> would restyle the whole document every frame.
export default function ScrollFx() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    const last = new Map<HTMLElement, string>();
    const bar = barRef.current;
    let lastPage = "";
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const mode = el.dataset.scroll;
        let p: number;
        if (mode === "top") {
          p = window.scrollY / vh;
        } else {
          const r = el.getBoundingClientRect();
          p = mode === "pin" ? -r.top / (r.height - vh) : (vh - r.top) / (vh + r.height);
        }
        const value = clamp(p).toFixed(3);
        if (last.get(el) === value) continue;
        last.set(el, value);
        el.style.setProperty("--p", value);
        // lets CSS stop rendering a fully covered first screen
        if (mode === "top") el.toggleAttribute("data-covered", value === "1.000");
      }
      const page = clamp(window.scrollY / (document.documentElement.scrollHeight - vh || 1)).toFixed(3);
      if (bar && page !== lastPage) {
        lastPage = page;
        bar.style.transform = `scaleX(${page})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 top-12 z-[101] h-0.5 origin-left bg-phosphor"
      style={{ transform: "scaleX(0)" }}
      aria-hidden
    />
  );
}
