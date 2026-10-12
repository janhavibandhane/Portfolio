"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile, projects } from "@/lib/data";
import { GithubIcon, SectionLabel } from "./Icons";
import { ProjectArt } from "./Projects";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

// Three panels side by side: the active one opens wide onto a CRT screen with the project's
// details, the others fold down to a numbered spine. A timer bar on the open panel moves on to
// the next project when it fills (see .proj-* in globals.css); it waits while the pointer or
// focus is inside the panels, and while the section is off screen. Clicking a spine opens it.
// Below lg every panel is simply shown open, stacked.
export default function ProjectStack() {
  const panelsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const panels = panelsRef.current;
    if (!panels) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(panels);
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="relative z-10 flex min-h-dvh items-center bg-ink-900 px-5 py-24 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="04">Selected work</SectionLabel>
            <h2 className="text-4xl leading-[1.05] text-cream sm:text-5xl md:text-6xl">
              Things I&apos;ve <span className="font-display text-phosphor">shipped</span>.
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <p className="hidden text-sm uppercase tracking-[0.2em] text-phosphor/70 lg:block" role="status">
              now showing {pad(active + 1)}/{pad(projects.length)}
            </p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-phosphor/40 px-4 py-2 text-phosphor transition-colors hover:bg-phosphor hover:text-ink-950"
            >
              <GithubIcon className="h-4 w-4" />
              more on github
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={120}>
          <div
            ref={panelsRef}
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocus={() => setHeld(true)}
            onBlur={() => setHeld(false)}
            className="flex flex-col gap-4 lg:h-[62dvh] lg:min-h-[480px] lg:flex-row lg:gap-3"
          >
            {projects.map((project, i) => {
              const on = i === active;
              return (
                <article
                  key={project.file}
                  data-on={on}
                  className="proj-panel group relative overflow-hidden border-2 border-phosphor bg-ink-950"
                >
                  {/* spine: what a folded panel shows */}
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show project ${i + 1}: ${project.title}`}
                    className="proj-spine absolute inset-0 hidden flex-col items-center justify-between py-5 text-phosphor transition-colors duration-300 hover:bg-phosphor/10 group-data-[on=true]:invisible group-data-[on=true]:opacity-0 lg:flex"
                  >
                    <span className="font-display text-6xl leading-none">{pad(i + 1)}</span>
                    <span className="rotate-180 whitespace-nowrap text-2xl text-cream/80 [writing-mode:vertical-rl]">
                      {project.title}
                    </span>
                    <span className="text-sm uppercase tracking-[0.2em] text-phosphor/70">open ▶</span>
                  </button>

                  <div className="relative grid h-full gap-0 lg:invisible lg:absolute lg:inset-0 lg:grid-cols-[1.1fr_1fr] lg:opacity-0 lg:transition-opacity lg:duration-200 lg:group-data-[on=true]:visible lg:group-data-[on=true]:opacity-100 lg:group-data-[on=true]:delay-300">
                    <span
                      className="pointer-events-none absolute -top-4 right-3 font-display text-[9rem] leading-none text-phosphor/10 lg:text-[13rem]"
                      aria-hidden
                    >
                      {pad(i + 1)}
                    </span>

                    {/* the screen: line art draws in each time the panel opens */}
                    <div className="relative p-4 sm:p-5">
                      <div className="relative aspect-5/3 h-auto overflow-hidden rounded-[18px] border border-phosphor/40 bg-ink-900 shadow-[inset_0_0_40px_rgba(0,0,0,0.85)] lg:aspect-auto lg:h-full">
                        <div className={`proj-art absolute inset-0 ${on ? "in" : ""}`}>
                          <ProjectArt variant={i} />
                        </div>
                        <span className="skill-lines" aria-hidden />
                        <span className="skill-static" aria-hidden />
                        <span className="absolute left-3 top-2 text-xs uppercase tracking-[0.2em] text-phosphor/70">
                          <span className="blink">●</span> ch {pad(i + 1)}
                        </span>
                      </div>
                    </div>

                    <div className="relative flex flex-col justify-center p-5 pt-1 sm:p-6 lg:p-8 lg:pl-3">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm uppercase tracking-[0.2em] text-phosphor/70">
                        <span className="bg-phosphor px-2 py-0.5 normal-case tracking-normal text-ink-950">{project.file}</span>
                        {project.kind}
                      </p>
                      <h3 className="mt-3 text-3xl leading-[1.05] text-cream sm:text-4xl lg:text-3xl xl:text-5xl">{project.title}</h3>
                      <p className="mt-3 text-lg leading-snug text-cream/70 sm:text-xl">{project.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <li key={t} className="border border-phosphor/40 px-2.5 py-0.5 text-sm text-phosphor">
                            {t}
                          </li>
                        ))}
                      </ul>
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 flex w-max items-center gap-2 bg-phosphor px-4 py-1.5 text-lg text-ink-950 shadow-[4px_4px_0_var(--color-rust)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-cream hover:shadow-[2px_2px_0_var(--color-rust)]"
                        >
                          open source <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <p className="mt-6 text-sm uppercase tracking-[0.15em] text-phosphor/50">company project</p>
                      )}
                    </div>
                  </div>

                  {on && (
                    <span className="absolute inset-x-0 bottom-0 hidden h-1 bg-phosphor/15 lg:block" aria-hidden>
                      <span
                        className="proj-timer block h-full bg-phosphor"
                        style={{ animationPlayState: visible && !held ? "running" : "paused" }}
                        onAnimationEnd={() => setActive((i + 1) % projects.length)}
                      />
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
