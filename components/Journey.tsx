"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { experience } from "@/lib/data";

// oldest first: the road runs left to right through time
const stops = [...experience].reverse();

// World is 400vw wide and the camera pans 300vw over the section, keeping the traveller at
// 30vw on screen. A station at world x is reached at progress (x - 30) / 300.
const STATION_X = [70, 200, 330];
const STOP_P = STATION_X.map((x) => (x - 30) / 300);
const ARRIVE_EARLY = 0.06;

const delay = (s: number) => ({ ["--d" as string]: `${s}s` });
const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Pixel auto-rickshaw. Wheels turn with scroll progress (--p); `.moving` on the svg adds
// the engine shake and exhaust puffs (see globals.css).
function Rickshaw() {
  const wheel = (cx: number) => (
    <g className="journey-wheel">
      <circle cx={cx} cy="22" r="3.6" fill="#100a07" stroke="#f7e3b5" strokeWidth="1.2" />
      <path d={`M${cx - 3} 22h6M${cx} 19v6`} stroke="#f7e3b5" strokeWidth="0.8" />
    </g>
  );
  return (
    <>
      {[0, 1, 2].map((i) => (
        <rect key={i} className="journey-puff" style={delay(i * 0.2)} x="0" y="17" width="2.4" height="2.4" fill="#f7e3b5" />
      ))}
      <g className="journey-body">
        {/* canopy */}
        <rect x="6" y="2" width="23" height="3" fill="#f7e3b5" />
        <rect x="6" y="5" width="3" height="10" fill="#f7e3b5" />
        <rect x="26" y="5" width="2" height="6" fill="#f7e3b5" />
        <rect x="28" y="7" width="2" height="5" fill="#fbe9c4" opacity="0.5" />
        {/* driver */}
        <rect x="18" y="7" width="4" height="4" fill="#c8501e" />
        <rect x="17" y="11" width="6" height="4" fill="#c8501e" />
        {/* body + nose + headlight */}
        <rect x="4" y="14" width="30" height="7" fill="#f2a33c" />
        <rect x="34" y="16" width="3" height="5" fill="#f2a33c" />
        <rect x="4" y="17" width="30" height="1" fill="#100a07" opacity="0.35" />
        <rect x="37" y="17" width="1.5" height="2" fill="#fbe9c4" />
        <path d="M38.5 17 48 14v8l-9.5-3z" fill="#fbe9c4" opacity="0.18" />
      </g>
      {wheel(11)}
      {wheel(30)}
    </>
  );
}

// roadside scenery, in world vw; kept clear of the signposts and stations
const LAMPS = [48, 112, 170, 262, 305, 385];
const TREES = [58, 120, 182, 192, 270, 318];
const CLOUDS = [
  [8, 30],
  [34, 20],
  [62, 36],
  [95, 24],
  [128, 33],
  [160, 21],
  [190, 35],
];

function Tree() {
  return (
    <svg viewBox="0 0 24 40" className="h-full w-auto" aria-hidden>
      <rect x="10" y="26" width="4" height="14" fill="#6b3a16" />
      <rect x="6" y="2" width="12" height="8" fill="url(#px-mid)" />
      <rect x="2" y="10" width="20" height="10" fill="url(#px-dark)" />
      <rect x="5" y="20" width="14" height="8" fill="url(#px-mid)" />
    </svg>
  );
}

// Pixel office for each company, in the hero's dot-pattern fills (patterns are defined in
// <Hero>). The company name is on a sign that flickers on at arrival, along with the windows.
function Building({ variant, name }: { variant: number; name: string }) {
  const windows = (xs: number[], ys: number[], w = 14, h = 14) =>
    ys.flatMap((y, r) =>
      xs.map((x, c) => (
        <rect key={`${x}-${y}`} className="journey-window" style={delay(0.25 + (r + c) * 0.07)} x={x} y={y} width={w} height={h} fill="#fbe9c4" />
      )),
    );
  // first word large, the rest as a second line
  const [head, ...rest] = name.toUpperCase().split(" ");
  const sub = rest.join(" ");
  const sign = (x: number, y: number, w: number) => (
    <g className="journey-sign">
      <rect x={x} y={y} width={w} height={sub ? 30 : 22} fill="#100a07" stroke="#f2a33c" strokeWidth="2" />
      <text x={x + w / 2} y={y + (sub ? 15 : 16)} textAnchor="middle" fontSize="15" fill="#fbe9c4">
        {head}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 25} textAnchor="middle" fontSize="8" fill="#f2a33c">
          {sub}
        </text>
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 160 200" className="h-full w-auto overflow-visible" aria-hidden>
      {/* low, wide office with a rooftop sign and a shopfront */}
      {variant === 0 && (
        <>
          <rect x="44" y="78" width="3" height="12" fill="#f2a33c" />
          <rect x="113" y="78" width="3" height="12" fill="#f2a33c" />
          {sign(30, 48, 100)}
          <rect x="16" y="96" width="128" height="104" fill="url(#px-dark)" />
          <rect x="10" y="88" width="140" height="8" fill="url(#px-mid)" />
          {windows([28, 56, 90, 118], [106, 132])}
          {windows([26, 102], [164], 32, 20)}
          <rect x="62" y="156" width="36" height="6" fill="url(#px-mid)" />
          <rect x="70" y="162" width="20" height="38" fill="url(#px-light)" />
        </>
      )}
      {/* two wings: a low block with a water tank, and a taller one carrying the sign */}
      {variant === 1 && (
        <>
          <rect x="22" y="100" width="3" height="10" fill="#f2a33c" />
          <rect x="39" y="100" width="3" height="10" fill="#f2a33c" />
          <rect x="18" y="86" width="28" height="14" fill="url(#px-mid)" />
          <rect x="6" y="110" width="62" height="90" fill="url(#px-dark)" />
          <rect x="2" y="104" width="70" height="6" fill="url(#px-mid)" />
          {windows([14, 40], [120, 146, 172])}
          <rect x="68" y="64" width="86" height="136" fill="url(#px-dark)" />
          <rect x="64" y="56" width="94" height="8" fill="url(#px-mid)" />
          {sign(74, 70, 74)}
          {windows([78, 104, 130], [108, 130, 152])}
          <rect x="101" y="174" width="20" height="26" fill="url(#px-light)" />
        </>
      )}
      {/* tower with a beacon, flanked by two annexes */}
      {variant === 2 && (
        <>
          <rect x="78" y="0" width="4" height="26" fill="#f2a33c" />
          <circle className="pulse-dot" cx="80" cy="2" r="5" fill="#f2a33c" />
          <circle cx="80" cy="2" r="4" fill="#fbe9c4" />
          <rect x="22" y="140" width="28" height="60" fill="url(#px-mid)" />
          {windows([29], [150, 174])}
          <rect x="110" y="120" width="28" height="80" fill="url(#px-mid)" />
          {windows([117], [130, 152, 174])}
          <rect x="50" y="32" width="60" height="168" fill="url(#px-dark)" />
          <rect x="44" y="24" width="72" height="8" fill="url(#px-mid)" />
          {sign(42, 40, 76)}
          {windows([60, 86], [72, 94, 116, 138])}
          <rect x="60" y="160" width="40" height="6" fill="url(#px-mid)" />
          <rect x="70" y="166" width="20" height="34" fill="url(#px-light)" />
        </>
      )}
    </svg>
  );
}

// The card and the stations share the screen: globals.css sizes .journey-card to stay clear of
// the building (above it on narrow screens, beside it from lg), so keep the heights here and
// the numbers there in step.
// Pinned side-scroller: scrolling drives the rickshaw down a road through each job in order.
// Next/Prev, the stop markers and the arrow keys scroll to the same positions.
export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const runnerRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(-1); // -1 = before the first station

  const go = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    if (index >= stops.length) return section.nextElementSibling?.scrollIntoView();
    const p = index < 0 ? 0 : STOP_P[index];
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + p * (section.offsetHeight - window.innerHeight) });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const runner = runnerRef.current;
    if (!section || !runner) return;
    let lastP = -1;
    let current = -1;
    let raf = 0;
    let idle = 0;

    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - window.innerHeight));
      if (Math.abs(p - lastP) > 0.0004) {
        // engine runs while the road is moving, then settles when scrolling stops
        runner.classList.add("moving");
        clearTimeout(idle);
        idle = window.setTimeout(() => runner.classList.remove("moving"), 160);
        lastP = p;
      }
      const index = STOP_P.filter((s) => p >= s - ARRIVE_EARLY).length - 1;
      if (index !== current) {
        if (index > current) {
          runner.classList.remove("hop");
          void runner.getBoundingClientRect(); // restart the animation
          runner.classList.add("hop");
        }
        current = index;
        setActive(index);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const r = section.getBoundingClientRect();
      if (r.top > 1 || r.bottom < window.innerHeight - 1) return; // only while pinned
      if (document.querySelector("[aria-modal='true']")) return;
      if (e.target instanceof Element && e.target.closest("input, textarea")) return;
      e.preventDefault();
      go(current + (e.key === "ArrowRight" ? 1 : -1));
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      clearTimeout(idle);
    };
  }, [go]);

  const job = active >= 0 ? stops[active] : null;
  const navButton =
    "border-2 border-phosphor px-4 py-1.5 text-lg transition-all disabled:opacity-30 enabled:hover:bg-phosphor enabled:hover:text-ink-950";

  return (
    <section ref={sectionRef} id="career" data-scroll="pin" className="relative z-10 h-[400vh] bg-ink-950">
      <div className="sticky top-0 h-[100dvh] overflow-hidden pt-12">
        <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />

        {/* sky: stars, a shooting star, the moon, clouds, then a skyline; each pans slower than the road */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[5, 12, 20, 27, 34, 41, 49, 58, 66, 73, 81, 88, 95].map((x, i) => (
            <span
              key={x}
              className="blink absolute h-1 w-1 bg-cream/60"
              style={{ left: `${x}%`, top: `${12 + ((i * 29) % 38)}%`, animationDelay: `${i * 0.37}s` }}
            />
          ))}
          <span className="journey-shoot absolute right-[18%] top-[14%] h-0.5 w-20 bg-linear-to-r from-cream to-transparent" />
          <div className="journey-moon absolute left-[46vw] top-[19%] h-16 w-16 rounded-full bg-cream sm:h-24 sm:w-24">
            <span className="absolute left-[22%] top-[26%] h-[18%] w-[18%] rounded-full bg-ink-500/25" />
            <span className="absolute left-[56%] top-[48%] h-[26%] w-[26%] rounded-full bg-ink-500/25" />
            <span className="absolute left-[30%] top-[66%] h-[12%] w-[12%] rounded-full bg-ink-500/25" />
          </div>
        </div>
        <div className="journey-clouds pointer-events-none absolute inset-y-0 left-0 w-[220vw]" aria-hidden>
          {CLOUDS.map(([x, y], i) => (
            <div key={x} className="floaty absolute h-6 w-24" style={{ left: `${x}vw`, top: `${y}%`, animationDelay: `${i * -0.9}s` }}>
              <span className="absolute inset-x-0 bottom-0 h-2 bg-cream/15" />
              <span className="absolute bottom-2 left-4 h-2 w-14 bg-cream/15" />
              <span className="absolute bottom-4 left-9 h-2 w-6 bg-cream/15" />
            </div>
          ))}
        </div>
        <div className="journey-far pointer-events-none absolute bottom-[22%] left-0 h-[26vh] w-[200vw]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-linear-to-b from-ink-800 to-ink-950" aria-hidden />

        {/* the world: road, scenery, signposts and stations */}
        <div className="journey-world absolute inset-y-0 left-0 w-[400vw]">
          {TREES.map((x, i) => (
            <div key={x} className="absolute bottom-[22%]" style={{ left: `${x}vw`, height: `${i % 2 ? 9 : 12}vh` }}>
              <Tree />
            </div>
          ))}
          {LAMPS.map((x) => (
            <div key={x} className="absolute bottom-[22%] h-[15vh] w-1 bg-phosphor/45" style={{ left: `${x}vw` }} aria-hidden>
              <span className="absolute left-0 top-0 h-1 w-6 bg-phosphor/45" />
              <span className="journey-lamp absolute left-4 top-1 h-2 w-3 bg-cream" />
              <span className="journey-cone absolute -left-2.5 top-3 h-[calc(15vh-12px)] w-16" />
            </div>
          ))}
          <div className="absolute bottom-[22%] left-0 h-0.5 w-full bg-phosphor/25" aria-hidden />
          <div className="journey-trail absolute bottom-[22%] left-0 h-1 bg-phosphor shadow-[0_0_14px_rgba(242,163,60,0.7)]" aria-hidden />
          <div className="journey-dashes absolute bottom-[calc(22%-22px)] left-0 h-0.5 w-full" aria-hidden />

          {[
            { x: 22, label: "start" },
            { x: 135, label: "2025" },
          ].map((m) => (
            <div key={m.label} className="absolute bottom-[22%] flex flex-col items-center" style={{ left: `${m.x}vw` }} aria-hidden>
              <span className="border border-phosphor/50 bg-ink-950 px-2 text-sm uppercase tracking-[0.2em] text-phosphor/70">
                {m.label}
              </span>
              <span className="h-10 w-0.5 bg-phosphor/40" />
            </div>
          ))}

          {stops.map((stop, i) => (
            <div
              key={stop.company}
              data-reached={i <= active}
              className="journey-station group absolute bottom-[22%] flex items-end gap-2"
              style={{ left: `${STATION_X[i] + 7}vw` }}
            >
              {/* flag runs up the pole on arrival */}
              <div className="relative h-[27vh] w-1 bg-phosphor/60 sm:h-[35vh] xl:h-[43vh]">
                <div className="journey-flag absolute left-1 top-0 hidden whitespace-nowrap sm:block bg-phosphor px-2 py-0.5 text-sm uppercase tracking-[0.15em] text-ink-950 sm:text-base">
                  {stop.role}
                </div>
              </div>
              <div className="journey-building h-[22vh] sm:h-[30vh] xl:h-[38vh]">
                <Building variant={i} name={stop.company} />
              </div>
              <button
                type="button"
                onClick={() => go(i)}
                className="absolute -bottom-9 left-0 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-phosphor/70 transition-colors hover:text-cream"
              >
                {stop.period}
              </button>
            </div>
          ))}
        </div>

        {/* the traveller stays put on screen while the world pans */}
        <svg
          ref={runnerRef}
          viewBox="0 0 48 26"
          className="journey-rider pointer-events-none absolute bottom-[22%] left-[30vw] w-32 -translate-x-1/2 overflow-visible sm:w-48"
          aria-hidden
        >
          <Rickshaw />
        </svg>

        <div className="pointer-events-none absolute inset-x-0 top-12 flex items-start justify-between px-5 pt-5 md:px-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-phosphor">
              03 <span className="text-cream/40">/</span> journey
            </p>
            <h2 className="mt-1 text-3xl leading-none text-cream sm:text-5xl">
              The road <span className="font-display text-phosphor">so far</span>.
            </h2>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-phosphor" role="status">
            stop {Math.max(0, active + 1)}/{stops.length}
          </p>
        </div>

        {/* card for the current stop; keyed so it re-opens on every arrival */}
        <div className="journey-card-wrap absolute inset-x-3 top-36 sm:inset-x-10 sm:top-40">
          <article
            key={active}
            className="journey-card win-open overflow-y-auto border-2 border-phosphor bg-ink-900 shadow-[8px_8px_0_var(--color-rust)]"
          >
            <header className="sticky top-0 flex items-stretch border-b-2 border-phosphor bg-ink-900">
              <span className="bg-phosphor px-3 py-1 text-lg text-ink-950">
                {job ? `stop-0${active + 1}.log` : "journey.map"}
              </span>
              <span className="title-stripes flex-1" aria-hidden />
              {job?.current && <span className="blink flex items-center bg-phosphor px-2 text-sm uppercase text-ink-950">now</span>}
            </header>
            {job ? (
              <div className="p-4 sm:p-5">
                <p className="line-in text-sm uppercase tracking-[0.15em] text-phosphor/70" style={delay(0.3)}>
                  [{job.period}] <span className="text-phosphor/40">{job.meta}</span>
                </p>
                <h3 className="line-in mt-1 text-2xl leading-tight text-cream sm:text-3xl" style={delay(0.38)}>
                  {job.role} <span className="text-phosphor">@ {job.company}</span>
                </h3>
                <ul className="mt-3 space-y-1">
                  {job.points.map((point, i) => (
                    <li key={point} className="line-in flex gap-2 text-lg leading-snug text-cream/70" style={delay(0.46 + i * 0.07)}>
                      <span className="text-rust" aria-hidden>
                        &gt;
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <ul className="line-in mt-4 flex flex-wrap gap-2" style={delay(0.85)}>
                  {job.tech.map((t) => (
                    <li key={t} className="border border-phosphor/40 px-2.5 py-0.5 text-sm text-phosphor">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-4 sm:p-5">
                <p className="line-in text-2xl leading-tight text-cream sm:text-3xl" style={delay(0.3)}>
                  {stops.length} stops. {stops[0].period.split(" — ")[0]} → now.
                </p>
                <p className="line-in mt-2 text-lg leading-snug text-cream/70" style={delay(0.4)}>
                  Scroll to drive the road, or press <span className="text-phosphor">next ▶</span>.
                </p>
              </div>
            )}
          </article>
        </div>

        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 px-4 text-phosphor sm:bottom-6 sm:gap-5">
          <button type="button" onClick={() => go(active - 1)} disabled={active < 0} className={navButton} aria-label="Previous stop">
            ◀<span className="hidden sm:inline"> prev</span>
          </button>
          <ol className="flex items-center gap-2">
            {stops.map((stop, i) => (
              <li key={stop.company}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${stop.company}, ${stop.period}`}
                  aria-current={i === active}
                  className={`block h-3.5 border-2 border-phosphor transition-all duration-300 ${
                    i === active ? "w-10 bg-phosphor" : i < active ? "w-3.5 bg-phosphor/60" : "w-3.5"
                  }`}
                />
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => go(active + 1)}
            className={`${navButton} bg-phosphor text-ink-950 shadow-[4px_4px_0_var(--color-rust)] enabled:hover:bg-cream`}
          >
            {active >= stops.length - 1 ? "continue ↓" : "next ▶"}
          </button>
        </div>
      </div>
    </section>
  );
}
