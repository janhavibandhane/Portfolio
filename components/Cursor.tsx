"use client";

import { useEffect, useRef } from "react";

// Pixel cursor: a dot on the pointer and a square that trails it and opens up over anything clickable.
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot || !window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const clickable = e.target instanceof Element && e.target.closest("a, button, [role='dialog'].cursor-pointer");
      ring.style.scale = clickable ? "2.2" : "1";
      ring.style.rotate = clickable ? "45deg" : "0deg";
      ring.style.opacity = dot.style.opacity = "1";
    };
    const onLeave = () => {
      ring.style.opacity = dot.style.opacity = "0";
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };

    window.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const base = "pointer-events-none fixed left-0 top-0 z-[500] opacity-0";
  return (
    <>
      <div
        ref={ringRef}
        className={`${base} -ml-3 -mt-3 h-6 w-6 border border-cream transition-[scale,rotate,opacity] duration-200`}
        aria-hidden
      />
      <div ref={dotRef} className={`${base} -ml-[3px] -mt-[3px] h-1.5 w-1.5 bg-cream`} aria-hidden />
    </>
  );
}
