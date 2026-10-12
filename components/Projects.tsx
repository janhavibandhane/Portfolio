import { ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/lib/data";
import { GithubIcon, SectionLabel } from "./Icons";
import Reveal from "./Reveal";

const delay = (s: number) => ({ ["--d" as string]: `${s}s` });

// Line-art cover per project; strokes draw in when the card scrolls into view.
export function ProjectArt({ variant }: { variant: number }) {
  const common = {
    viewBox: "0 0 400 240",
    className: "h-full w-full",
    fill: "none",
    stroke: "#f7e3b5",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (variant === 0) {
    return (
      <svg {...common}>
        <rect className="draw" pathLength={1} x="60" y="36" width="280" height="172" rx="12" />
        <path className="draw" pathLength={1} style={delay(0.5)} d="M60 66h280" />
        <g fill="#f2a33c" stroke="none">
          <circle cx="78" cy="51" r="4" />
          <circle cx="92" cy="51" r="4" opacity=".6" />
          <circle cx="106" cy="51" r="4" opacity=".3" />
        </g>
        <path className="draw" pathLength={1} style={delay(0.8)} d="M84 96h110M84 112h80" strokeWidth="5" />
        <path className="draw" pathLength={1} style={delay(1.1)} d="M84 140h130M84 152h100" opacity=".5" />
        <rect className="draw" pathLength={1} style={delay(1.3)} x="84" y="170" width="62" height="20" rx="10" stroke="#f2a33c" />
        <g className="floaty">
          <rect x="236" y="88" width="84" height="96" rx="10" fill="#f2a33c" fillOpacity=".14" stroke="#f2a33c" />
          <path d="M250 160l16-22 12 14 10-10 18 18" stroke="#f2a33c" />
          <circle cx="262" cy="110" r="7" stroke="#c8501e" />
        </g>
      </svg>
    );
  }

  if (variant === 1) {
    return (
      <svg {...common}>
        {[52, 102, 152].map((y, i) => (
          <g key={y}>
            <rect className="draw" pathLength={1} style={delay(0.2 + i * 0.35)} x="90" y={y} width="220" height="34" rx="8" />
            <path className="draw" pathLength={1} style={delay(0.5 + i * 0.35)} d={`M104 ${y + 17}h${90 - i * 22}`} opacity=".5" />
            <path
              className="draw"
              pathLength={1}
              style={delay(0.9 + i * 0.35)}
              d={`m284 ${y + 17} 5 5 9-10`}
              stroke="#f2a33c"
              strokeWidth="2"
            />
          </g>
        ))}
        <rect x="90" y="202" width="96" height="24" rx="12" fill="#f2a33c" stroke="none" />
        <path d="M118 214h40" stroke="#17100b" strokeWidth="2" />
        <path className="blink" d="M200 114v12" stroke="#f2a33c" strokeWidth="2" />
        <g className="floaty" stroke="#c8501e">
          <path d="M338 64v16M330 72h16" />
          <path d="M58 176v12M52 182h12" />
        </g>
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path className="dash-flow" d="M30 206h340" stroke="#f2a33c" />
      <path className="draw" pathLength={1} d="M70 206V118h54v88" />
      <path className="draw" pathLength={1} style={delay(0.4)} d="M144 206V70h70v136" />
      <path className="draw" pathLength={1} style={delay(0.8)} d="M234 206V134h60v72" />
      <path
        className="draw"
        pathLength={1}
        style={delay(1.1)}
        d="M84 136h26M84 156h26M84 176h26M160 92h38M160 114h38M160 136h38M160 158h38M160 180h38M248 152h32M248 174h32"
        opacity=".45"
      />
      <path className="draw" pathLength={1} style={delay(1.4)} d="M330 206V44M306 44h64M330 44l-22 26M364 44v30" stroke="#c8501e" />
      <g className="floaty">
        <rect x="354" y="74" width="20" height="14" rx="2" fill="#f2a33c" stroke="none" />
      </g>
      <circle className="pulse-dot" cx="179" cy="70" r="5" fill="#f2a33c" stroke="none" />
      <circle cx="179" cy="70" r="4" fill="#f2a33c" stroke="none" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative bg-ink-900 px-5 py-28 md:px-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="04">Selected work</SectionLabel>
            <h2 className="max-w-2xl text-4xl leading-[1.05] tracking-normal text-cream sm:text-5xl md:text-6xl">
              Things I&apos;ve <span className="font-display text-phosphor">shipped</span>.
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-none border border-phosphor/40 px-5 py-2.5 text-sm text-cream/80 transition-colors hover:border-phosphor hover:bg-phosphor hover:text-ink-950"
          >
            <GithubIcon className="h-4 w-4" />
            More on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {projects.map((project, i) => {
            const Card = project.href ? "a" : "div";
            return (
              <Reveal key={project.title} delay={i * 120}>
                <Card
                  {...(project.href
                    ? { href: project.href, target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group flex h-full flex-col overflow-hidden rounded-none border border-phosphor/25 bg-ink-950/60 transition-all duration-500 hover:-translate-y-2 hover:border-phosphor/50"
                >
                  <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-ink-700 to-ink-950">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <ProjectArt variant={i} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-phosphor">
                      {project.kind}
                    </p>
                    <h3 className="mt-2 flex items-start justify-between gap-3 text-xl font-medium text-cream">
                      {project.title}
                      {project.href && (
                        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-cream/50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-phosphor" />
                      )}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/60">
                      {project.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-none bg-cream/[0.06] px-3 py-1 font-mono text-xs text-cream/70"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
