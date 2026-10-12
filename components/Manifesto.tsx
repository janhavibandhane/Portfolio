import { stats } from "@/lib/data";

const TEXT =
  "I turn complex requirements into clean, fast, responsive interfaces — from ERP dashboards to company websites — and I care about every pixel on the way.";
const ACCENT = new Set(["interfaces", "pixel"]);

const vars = (v: Record<string, string | number>) => v as React.CSSProperties;

// Pinned statement: words light up one by one as the section scrolls (see .word in globals.css).
export default function Manifesto() {
  const words = TEXT.split(" ");

  return (
    <section data-scroll="pin" className="relative z-10 h-[220vh] bg-ink-950">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden px-5 pt-12 md:px-20">
        {/* dial that fills with scroll */}
        <svg
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -right-16 top-24 h-64 w-64 -rotate-90 opacity-60 md:right-10 md:h-80 md:w-80"
          fill="none"
          aria-hidden
        >
          <circle cx="100" cy="100" r="92" stroke="rgba(242,163,60,0.15)" strokeWidth="2" strokeDasharray="2 8" />
          <circle className="scroll-draw" pathLength={1} cx="100" cy="100" r="92" stroke="#f2a33c" strokeWidth="3" />
          <circle className="scroll-draw" pathLength={1} cx="100" cy="100" r="74" stroke="#c8501e" strokeWidth="10" />
        </svg>

        <p className="text-sm uppercase tracking-[0.3em] text-phosphor">
          01 <span className="text-cream/40">/</span> whoami
        </p>
        {/* sized from both width and height so the statement and the stats always fit one screen */}
        <p className="relative mt-6 max-w-6xl text-[clamp(1.5rem,min(9.5vw,6.5dvh),2.5rem)] leading-[1.08] text-cream md:text-[clamp(1.75rem,min(5.2vw,7.5dvh),4.75rem)]">
          {words.map((word, i) => (
            <span
              key={i}
              className={`word ${ACCENT.has(word.replace(/[^a-z]/gi, "")) ? "font-display text-phosphor" : ""}`}
              style={vars({ "--i": i, "--n": words.length })}
            >
              {word}{" "}
            </span>
          ))}
        </p>

        <dl className="relative mt-10 flex gap-5 sm:gap-10 md:gap-16">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-5xl leading-none text-cream md:text-6xl">{s.value}</dd>
              <dt className="mt-1 text-xs uppercase tracking-widest text-phosphor/60 sm:tracking-[0.15em]">{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="absolute bottom-6 left-5 right-5 h-0.5 bg-phosphor/15 md:left-20 md:right-20" aria-hidden>
          <div className="scale-x-p h-full bg-phosphor" />
        </div>
      </div>
    </section>
  );
}
