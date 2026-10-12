"use client";

import { useCallback, useEffect, useState } from "react";

const TICKS = 48;
const TICK_MS = 55;
const BLOCKS = 40;
const VOLUMES = 5;

const LINES = [
  { tag: "OK", label: "frontend memory", value: "since 2023" },
  { tag: "OK", label: "react.sys, next.sys", value: "ready" },
  { tag: "OK", label: "tailwind.drv", value: "ready" },
  { tag: "OK", label: "express.sys, mongodb.sys", value: "ready" },
  { tag: "OK", label: "react-native.drv", value: "basics loaded" },
  { tag: "!!", label: "chai.sys", value: "running low" },
];

const pad = (label: string, value: string) =>
  `${label} ${".".repeat(Math.max(3, 40 - label.length - value.length))} ${value}`;

export default function BootScreen() {
  const [tick, setTick] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  const done = tick >= TICKS;
  const progress = tick / TICKS;
  const shown = Math.min(LINES.length, Math.floor(progress * (LINES.length + 1)));

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(TICKS);
      return;
    }
    const id = setInterval(() => {
      setTick((t) => {
        if (t >= TICKS) clearInterval(id);
        return Math.min(TICKS, t + 1);
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const enter = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    document.documentElement.style.overflow = "";
    document.documentElement.classList.add("booted");
    window.dispatchEvent(new Event("os:enter"));
    setTimeout(() => setGone(true), 700);
  }, [leaving]);

  useEffect(() => {
    window.addEventListener("keydown", enter);
    return () => window.removeEventListener("keydown", enter);
  }, [enter]);

  if (gone) return null;

  return (
    <div
      role="dialog"
      aria-label="Boot screen. Press any key to enter."
      onClick={enter}
      className={`fixed inset-0 z-[300] grid cursor-pointer place-items-center bg-ink-950 px-4 ${
        leaving ? "crt-off" : ""
      }`}
    >
      <div className="hero-glow absolute inset-0" aria-hidden />

      <div className="relative w-full max-w-xl text-phosphor">
        <div className="relative border-2 border-phosphor bg-ink-900 px-6 py-7 text-center shadow-[6px_6px_0_var(--color-rust)]">
          <svg className="pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]" fill="none" aria-hidden>
            <rect
              className="draw-load"
              pathLength={1}
              x="1"
              y="1"
              style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
              stroke="rgba(242,163,60,0.45)"
              strokeWidth="1"
            />
          </svg>
          <p className="font-display text-5xl leading-none text-cream sm:text-6xl">Janhavi-OS</p>
          <p className="mt-3 text-sm uppercase tracking-[0.25em]">Version 2.0 — Mumbai, IN</p>
          <div className="mt-5 flex h-3" aria-hidden>
            <span className="flex-1 bg-[#8c3b1a]" />
            <span className="flex-1 bg-rust" />
            <span className="flex-1 bg-phosphor" />
            <span className="flex-1 bg-cream" />
            <span className="flex-1 bg-ink-600" />
          </div>
        </div>

        <div className="mt-5 border-2 border-phosphor bg-ink-900 px-5 py-4">
          <pre className="min-h-[11.5rem] overflow-hidden whitespace-pre font-mono text-[13px] leading-6 sm:text-base">
            {LINES.slice(0, shown).map((l) => (
              <span key={l.label} className={`block ${l.tag === "!!" ? "text-rust" : ""}`}>
                [ {l.tag} ] {pad(l.label, l.value)}
              </span>
            ))}
            {shown >= LINES.length && (
              <span className="block">
                [ {done ? "OK" : ".."} ]{" "}
                {pad("mounting volumes", `${Math.round(progress * VOLUMES)} / ${VOLUMES}`)}
              </span>
            )}
          </pre>
          <div className="mt-3 flex gap-[3px] border-2 border-phosphor p-[3px]" aria-hidden>
            {Array.from({ length: BLOCKS }, (_, i) => (
              <span
                key={i}
                className={`h-3 flex-1 ${i < Math.round(progress * BLOCKS) ? "bg-phosphor" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>

        <p
          className={`mt-6 text-center text-sm uppercase tracking-[0.3em] ${
            done ? "blink text-cream" : "text-phosphor/30"
          }`}
        >
          ■ <span className="hidden sm:inline">Press any key</span>
          <span className="sm:hidden">Tap</span> to enter ■
        </p>
      </div>
    </div>
  );
}
