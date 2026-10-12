"use client";

import { ArrowUpRight, Braces, Mail } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  type AppId,
  apps,
  bio,
  experience,
  levelValue,
  profile,
  projects,
  skills,
  stats,
} from "@/lib/data";
import ContactForm from "./ContactForm";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { ProjectArt } from "./Projects";

const delay = (s: number) => ({ ["--d" as string]: `${s}s` });

const readHash = (): AppId | null => {
  const id = window.location.hash.slice(1);
  return apps.some((a) => a.id === id) ? (id as AppId) : null;
};

// Adds `.in` one frame after mount so .draw / .ring children animate from their start state.
function DrawIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => ref.current?.classList.add("in"));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <p className="line-in mb-6 text-phosphor/70">
      <span className="text-rust">janhavi@os</span>:~$ {children}
      <span className="blink"> ▍</span>
    </p>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="border border-phosphor/40 px-2.5 py-0.5 text-sm text-phosphor">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectsApp() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <>
      <Prompt>ls projects.vol</Prompt>
      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <ul className="flex flex-col gap-2">
          {projects.map((p, i) => (
            <li key={p.file} className="line-in" style={delay(0.15 + i * 0.1)}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={i === selected}
                className={`flex w-full items-baseline gap-3 border px-3 py-2.5 text-left transition-colors ${
                  i === selected
                    ? "border-phosphor bg-phosphor text-ink-950"
                    : "border-phosphor/30 text-phosphor hover:border-phosphor hover:bg-phosphor/10"
                }`}
              >
                <span className="font-display text-xl leading-none">0{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-lg leading-tight">{p.file}</span>
                  <span className="block text-xs uppercase tracking-[0.15em] opacity-70">{p.kind}</span>
                </span>
                <span aria-hidden>{i === selected ? "▶" : "·"}</span>
              </button>
            </li>
          ))}
          <li className="line-in mt-2" style={delay(0.5)}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-phosphor/70 transition-colors hover:text-cream"
            >
              <GithubIcon className="h-4 w-4" />
              more on github
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </li>
        </ul>

        {/* keyed so art redraws and text re-staggers on every switch */}
        <DrawIn key={project.file} className="border border-phosphor/30">
          <div className="fade-in aspect-[5/3] border-b border-phosphor/30 bg-ink-950">
            <ProjectArt variant={selected} />
          </div>
          <div className="p-5">
            <h3 className="line-in text-2xl text-cream sm:text-3xl" style={delay(0.1)}>
              {project.title}
            </h3>
            <p className="line-in mt-2 text-lg leading-snug text-cream/70" style={delay(0.2)}>
              {project.description}
            </p>
            <div className="line-in mt-4 flex flex-wrap items-center justify-between gap-4" style={delay(0.3)}>
              <Chips items={project.tech} />
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-phosphor px-3 py-1 text-ink-950 transition-colors hover:bg-cream"
                >
                  open source <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <span className="text-sm uppercase tracking-[0.15em] text-phosphor/50">company project</span>
              )}
            </div>
          </div>
        </DrawIn>
      </div>
    </>
  );
}

function ExperienceApp() {
  return (
    <>
      <Prompt>cat career.log</Prompt>
      <DrawIn>
        <ol className="relative pl-9">
          <div className="absolute bottom-6 left-[5px] top-2 w-0.5" aria-hidden>
            <svg className="h-full w-full overflow-visible">
              <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(242,163,60,0.2)" strokeWidth="2" />
              <line
                className="draw"
                pathLength={1}
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#f2a33c"
                strokeWidth="2"
                style={delay(0.3)}
              />
            </svg>
          </div>
          {experience.map((job, i) => (
            <li key={job.company} className="line-in relative pb-10 last:pb-2" style={delay(0.25 + i * 0.22)}>
              <svg viewBox="0 0 16 16" className="absolute -left-9 top-1 h-3.5 w-3.5 overflow-visible" aria-hidden>
                {job.current && <rect className="pulse-dot" width="16" height="16" fill="#f2a33c" />}
                <rect
                  x="1"
                  y="1"
                  width="14"
                  height="14"
                  fill={job.current ? "#f2a33c" : "#17100b"}
                  stroke="#f2a33c"
                  strokeWidth="2"
                />
              </svg>
              <p className="flex flex-wrap items-center gap-x-3 text-sm uppercase tracking-[0.15em] text-phosphor/70">
                [{job.period}] <span className="text-phosphor/40">{job.meta}</span>
                {job.current && <span className="blink bg-phosphor px-1.5 text-ink-950">now</span>}
              </p>
              <h3 className="mt-1 text-2xl leading-tight text-cream sm:text-3xl">
                {job.role} <span className="text-phosphor">@ {job.company}</span>
              </h3>
              <ul className="mt-3 space-y-1">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2 text-lg leading-snug text-cream/70">
                    <span className="text-rust" aria-hidden>
                      &gt;
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Chips items={job.tech} />
              </div>
            </li>
          ))}
        </ol>
      </DrawIn>
    </>
  );
}

function ProfileApp() {
  return (
    <>
      <Prompt>whoami</Prompt>
      <DrawIn>
        {bio.map((line, i) => (
          <p key={line} className="line-in mb-3 max-w-2xl text-xl leading-snug text-cream/80" style={delay(0.15 + i * 0.1)}>
            {line}
          </p>
        ))}
        <dl className="line-in my-6 grid max-w-xl grid-cols-3 gap-2 border-y border-phosphor/30 py-4 sm:gap-4" style={delay(0.35)}>
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-5xl leading-none text-cream">{s.value}</dd>
              <dt className="mt-1 text-xs uppercase tracking-wider text-phosphor/60 sm:tracking-[0.15em]">{s.label}</dt>
            </div>
          ))}
        </dl>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-2">
          {skills.map((skill, i) => (
            <li
              key={skill.name}
              className="line-in flex items-center gap-3 border border-phosphor/30 p-3"
              style={delay(0.45 + i * 0.05)}
            >
              <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0 -rotate-90" fill="none" aria-hidden>
                <circle cx="32" cy="32" r="26" stroke="rgba(242,163,60,0.15)" strokeWidth="6" />
                <circle
                  className="ring"
                  pathLength={100}
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#f2a33c"
                  strokeWidth="6"
                  style={{ ["--v" as string]: levelValue[skill.level], ...delay(0.6 + i * 0.06) }}
                />
              </svg>
              <span className="min-w-0">
                <span className="block truncate text-lg leading-tight text-cream">{skill.name}</span>
                <span className="block text-xs uppercase tracking-widest text-phosphor/60">{skill.level}</span>
              </span>
            </li>
          ))}
        </ul>
      </DrawIn>
    </>
  );
}

function ContactApp() {
  const socials = [
    { label: "GitHub", href: profile.github, icon: <GithubIcon className="h-5 w-5" /> },
    { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinIcon className="h-5 w-5" /> },
    { label: "LeetCode", href: profile.leetcode, icon: <Braces className="h-5 w-5" /> },
  ];
  return (
    <>
      <Prompt>mail --compose</Prompt>
      <h3 className="line-in font-display text-5xl leading-[0.9] text-cream sm:text-6xl" style={delay(0.1)}>
        Let&apos;s build something together.
      </h3>
      <p className="line-in mb-6 mt-3 max-w-xl text-lg leading-snug text-cream/70" style={delay(0.15)}>
        Have a project, a role or just want to talk shop? I usually reply within 24–48 hours.
      </p>
      <ContactForm />
      <ul className="mt-8 flex flex-wrap items-center gap-2 border-t border-phosphor/30 pt-5">
        <li className="line-in" style={delay(0.6)}>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 px-1 py-2 text-phosphor/80 transition-colors hover:text-cream"
          >
            <Mail className="h-5 w-5 shrink-0" />
            {profile.email}
          </a>
        </li>
        {socials.map((s, i) => (
          <li key={s.label} className="line-in" style={delay(0.65 + i * 0.06)}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-phosphor/40 px-3 py-2 text-phosphor transition-colors hover:bg-phosphor hover:text-ink-950"
            >
              {s.icon}
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

const CONTENT: Record<AppId, () => React.ReactNode> = {
  projects: ProjectsApp,
  experience: ExperienceApp,
  profile: ProfileApp,
  contact: ContactApp,
};

// One window at a time, driven by the URL hash (#projects, #experience, ...) so links and Back both work.
export default function Windows() {
  const [open, setOpen] = useState<AppId | null>(null);

  const close = useCallback(() => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setOpen(null);
  }, []);

  useEffect(() => {
    const sync = () => setOpen(readHash());
    const onKey = (e: KeyboardEvent) => {
      if (!document.documentElement.classList.contains("booted")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") return close();
      // digits typed into the contact form are not shortcuts
      if (e.target instanceof Element && e.target.closest("input, textarea, select")) return;
      const app = apps.find((a) => a.key === e.key);
      if (app) window.location.hash = app.id;
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  // the page behind must not scroll while a window is open
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  const app = apps.find((a) => a.id === open)!;
  const Content = CONTENT[open];

  // one fixed-size grid cell: without it the row grows with the window and max-h-full never bites
  return (
    <div className="fixed inset-0 z-[150] grid grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] place-items-center p-3 pt-16 sm:p-8 sm:pt-20">
      <button
        type="button"
        aria-label="Close window"
        onClick={close}
        className="fade-in absolute inset-0 cursor-default bg-ink-950/75"
      />
      <section
        key={open}
        role="dialog"
        aria-modal="true"
        aria-label={app.label}
        className="win-open relative flex max-h-full w-full max-w-5xl flex-col border-2 border-phosphor bg-ink-900 shadow-[8px_8px_0_var(--color-rust)]"
      >
        <header className="flex items-stretch border-b-2 border-phosphor">
          <span className="flex items-center gap-2 bg-phosphor px-4 py-1.5 text-xl text-ink-950">
            <span className="font-display text-2xl leading-none">{app.n}</span>
            {app.file}
          </span>
          <span className="title-stripes flex-1" aria-hidden />
          <span className="hidden items-center px-3 text-sm uppercase tracking-[0.2em] text-phosphor/50 sm:flex">
            esc
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="border-l-2 border-phosphor px-4 text-2xl leading-none text-phosphor transition-colors hover:bg-phosphor hover:text-ink-950"
          >
            ×
          </button>
        </header>
        <div className="min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-8">
          <Content />
        </div>
        <footer className="flex justify-between border-t border-phosphor/40 px-4 py-1 text-xs uppercase tracking-[0.2em] text-phosphor/50">
          <span>{app.desc}</span>
          <span className="hidden sm:inline">keys 1–4 switch files</span>
        </footer>
      </section>
    </div>
  );
}
