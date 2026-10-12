"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/data";
import Reveal from "./Reveal";
import { skillIcons } from "./SkillIcons";

const vars = (v: Record<string, string | number>) => v as React.CSSProperties;

// where each screen sits on large viewports, as [left, top] in % of the scatter area
const SPOTS = [
  [4, 8],
  [22, 38],
  [41, 2],
  [58, 40],
  [75, 4],
  [86, 44],
  [9, 62],
  [40, 60],
];
// registration marks between the screens
const MARKS = [
  [33, 22],
  [52, 86],
  [68, 30],
  [95, 16],
  [1, 50],
  [80, 88],
];

// ms each screen stays tuned in while the section cycles on its own
const DWELL = 600;

// Skills scattered as small CRT screens: amber and dithered at rest, tuned in to the skill's
// real brand colour (see .skill-* in globals.css). While the section is on screen the screens
// tune in one after another; hovering, focusing or tapping one holds it instead.
export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [auto, setAuto] = useState<number | null>(null);
  const [held, setHeld] = useState<number | null>(null);
  const on = held ?? auto;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (!entry.isIntersecting) return setAuto(null);
        // starts from the first screen on every visit; the first tick leaves time for power-on
        let i = -1;
        timer = window.setInterval(() => setAuto((i = (i + 1) % skills.length)), DWELL);
      },
      { threshold: 0.4 },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="stack" className="relative z-10 flex min-h-dvh items-center overflow-hidden bg-ink-950 pt-12">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative w-full px-5 py-12 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-phosphor">
              02 <span className="text-cream/40">/</span> stack
            </p>
            <h2 className="mt-1 text-3xl leading-none text-cream sm:text-5xl">
              The stack I <span className="font-display text-phosphor">reach for</span>.
            </h2>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-phosphor/60" aria-hidden>
            ▚ <span className="hidden sm:inline">hover</span>
            <span className="sm:hidden">tap</span> a screen to hold it ▚
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <ul className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 sm:grid-cols-4 lg:relative lg:block lg:h-[max(540px,64dvh)]">
            {MARKS.map(([x, y], i) => (
              <li
                key={`mark-${x}`}
                className="absolute hidden text-sm text-phosphor/40 lg:block"
                style={{ left: `${x}%`, top: `${y}%` }}
                aria-hidden
              >
                {i % 2 ? `0${i + 2}` : "+"}
              </li>
            ))}
            {skills.map((s, i) => {
              const { Icon, color } = skillIcons[s.name];
              return (
                <li
                  key={s.name}
                  className="floaty lg:absolute lg:left-(--x) lg:top-(--y)"
                  style={vars({ "--x": `${SPOTS[i][0]}%`, "--y": `${SPOTS[i][1]}%`, animationDelay: `${i * -0.8}s` })}
                >
                  <button
                    type="button"
                    data-on={i === on}
                    onMouseEnter={() => setHeld(i)}
                    onMouseLeave={() => setHeld(null)}
                    onFocus={() => setHeld(i)}
                    onBlur={() => setHeld(null)}
                    onClick={() => setHeld(i)}
                    style={vars({ "--c": color, "--d": `${0.15 + i * 0.09}s`, "--roll": `${i * -0.6}s` })}
                    className="skill-tv flex flex-col items-center text-center lg:block lg:text-left"
                  >
                    <span className="skill-set relative block aspect-square w-[clamp(104px,min(9vw,17dvh),190px)]">
                      <span className="skill-brackets" aria-hidden>
                        <span className="left-0 top-0 border-l-2 border-t-2" />
                        <span className="right-0 top-0 border-r-2 border-t-2" />
                        <span className="bottom-0 left-0 border-b-2 border-l-2" />
                        <span className="bottom-0 right-0 border-b-2 border-r-2" />
                      </span>
                      <span className="skill-glass" aria-hidden>
                        <span className="skill-tint" />
                        <Icon className="skill-dither" />
                        <Icon className="skill-color" color={color} />
                        <span className="skill-lines" />
                        <span className="skill-static" />
                      </span>
                    </span>
                    <span className="mt-3 block whitespace-nowrap font-display text-2xl leading-none text-cream sm:text-3xl">
                      {s.name}
                    </span>
                    <span className="skill-meta mt-1.5 block whitespace-nowrap text-xs uppercase leading-relaxed tracking-[0.2em]">
                      02.{i + 1} <span className="opacity-50">/</span> {s.group}
                      <span className="block">{s.level}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
