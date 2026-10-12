import { apps, marquee, profile } from "@/lib/data";
import DotPortrait from "./DotPortrait";
import HeroBackdrop from "./HeroBackdrop";
import Scramble from "./Scramble";

// one desktop corner per app, in `apps` order
const cornerPos = [
  "left-5 top-24 md:left-16 md:top-28",
  "right-5 top-24 text-right md:right-16 md:top-28",
  "bottom-8 left-5 md:bottom-12 md:left-16",
  "bottom-8 right-5 text-right md:bottom-12 md:right-16",
];

const vars = (v: Record<string, string | number>) => v as React.CSSProperties;

type IconKind = "window" | "image" | "code" | "chart";

// Little UI cards drawn with dot-pattern fills (patterns defined once in <Hero>).
function PixelIcon({ kind }: { kind: IconKind }) {
  const light = "url(#px-light)";
  const mid = "url(#px-mid)";
  const dark = "url(#px-dark)";
  return (
    <svg viewBox="0 0 120 92" className="h-full w-full" aria-hidden>
      <rect x="2" y="2" width="116" height="88" fill={kind === "code" ? dark : light} />
      {kind === "window" && (
        <>
          <rect x="2" y="2" width="116" height="16" fill={mid} />
          <rect x="14" y="30" width="52" height="46" fill={dark} />
          <circle cx="92" cy="53" r="14" fill={dark} />
        </>
      )}
      {kind === "image" && (
        <>
          <path d="M10 80 40 42l20 22 18-16 32 32z" fill={dark} />
          <circle cx="90" cy="28" r="10" fill={dark} />
        </>
      )}
      {kind === "code" && (
        <g fill="none" stroke={light} strokeWidth="9">
          <path d="M44 26 22 46l22 20M76 26l22 20-22 20M66 20 54 72" />
        </g>
      )}
      {kind === "chart" && (
        <>
          <rect x="16" y="54" width="18" height="26" fill={dark} />
          <rect x="42" y="38" width="18" height="42" fill={dark} />
          <rect x="68" y="46" width="18" height="34" fill={dark} />
          <rect x="94" y="20" width="14" height="60" fill={mid} />
        </>
      )}
    </svg>
  );
}

const floaters: { kind: IconKind; pos: string; depth: number; rot: string; dur: string; delay: number }[] = [
  { kind: "window", pos: "left-[24%] top-[20%] w-32 hidden md:block", depth: 38, rot: "-8deg", dur: "7s", delay: 1.1 },
  { kind: "image", pos: "right-[27%] top-[17%] w-28 hidden md:block xl:right-[23%]", depth: 52, rot: "9deg", dur: "8.5s", delay: 1.25 },
  { kind: "code", pos: "left-[4%] top-[38%] w-16 md:left-[27%] md:top-[46%]", depth: 26, rot: "12deg", dur: "6s", delay: 1.4 },
  { kind: "chart", pos: "right-[4%] top-[40%] w-20 md:right-[21%] md:top-[44%] md:w-32", depth: 44, rot: "-6deg", dur: "9s", delay: 1.55 },
];

export default function Hero() {
  const words = profile.name.split(" ");
  let letter = 0;

  return (
    <section
      id="top"
      data-scroll="top"
      className="sticky top-0 min-h-[620px] w-full overflow-hidden bg-ink-950"
      style={{ height: "100dvh" }}
    >
     <div className="hero-exit absolute inset-0">
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          {[
            ["px-light", "#f6c877"],
            ["px-mid", "#f2a33c"],
            ["px-dark", "#c8501e"],
          ].map(([id, fill]) => (
            <pattern key={id} id={id} width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="2.8" height="2.8" fill={fill} />
            </pattern>
          ))}
        </defs>
      </svg>

      <div className="hero-glow absolute inset-0" aria-hidden />
      <HeroBackdrop />

      <div
        className="absolute inset-x-0 top-12 z-30 overflow-hidden border-b border-phosphor/30 bg-ink-950/70 py-1 text-sm uppercase tracking-[0.3em] text-phosphor/70"
        aria-hidden
      >
        <div className="marquee flex w-max">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((item, i) => (
            <span key={i} className="whitespace-nowrap px-5">
              <span className="text-rust">✦</span> {item}
            </span>
          ))}
        </div>
      </div>

      {apps.map((app, i) => (
        <a
          key={app.id}
          href={`#${app.id}`}
          className={`hero-anim hero-fade group absolute z-30 ${cornerPos[i]}`}
          style={{ animationDelay: `${0.9 + i * 0.12}s` }}
        >
          <span className="block font-display text-3xl leading-none text-rust transition-transform duration-300 group-hover:-translate-y-1 md:text-4xl">
            {app.n}
          </span>
          <span className="mt-2 block text-xs text-phosphor/50">{app.file}</span>
          <span className="block text-3xl text-phosphor transition-colors group-hover:text-cream md:text-4xl">
            <Scramble text={app.label} />
            <span className="blink opacity-0 group-hover:opacity-100">_</span>
          </span>
        </a>
      ))}

      {floaters.map((f) => (
        <div
          key={f.kind}
          className={`hero-anim hero-fade pointer-events-none absolute z-10 ${f.pos}`}
          style={{ animationDelay: `${f.delay}s` }}
        >
          <div className="parallax" style={vars({ "--depth": f.depth })}>
            <div className="drift" style={vars({ "--rot": f.rot, "--dur": f.dur })}>
              <PixelIcon kind={f.kind} />
            </div>
          </div>
        </div>
      ))}

      <DotPortrait
        src="/images/janhavi-hero-2.webp"
        alt={`Portrait of ${profile.name}`}
        className="parallax absolute bottom-0 left-1/2 z-10 aspect-[3/4] -translate-x-1/2"
        // tall phones: let the shoulders crop off-screen rather than shrink the face
        style={vars({ width: "min(max(96vw, calc(72dvh * 0.75)), calc(94dvh * 0.75))", "--depth": -12 })}
      />

      <div
        className="parallax pointer-events-none absolute inset-x-0 bottom-[17%] z-20 px-3 text-center md:bottom-[15%]"
        style={vars({ "--depth": 16 })}
      >
        <p
          className="hero-anim hero-fade text-xs uppercase tracking-[0.45em] text-phosphor sm:text-sm"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="bg-ink-950/80 py-0.5 pl-3 pr-1">{profile.role}</span>
        </p>
        <h1
          aria-label={profile.name}
          className="glitch mt-2 font-display leading-[0.8] text-cream"
          style={{ fontSize: "clamp(3.6rem, 11.5vw, 12rem)" }}
        >
          {words.map((word, w) => (
            <span key={w} className="inline-block whitespace-nowrap" aria-hidden>
              {Array.from(word, (ch, i) => (
                <span
                  key={i}
                  className="hero-anim hero-letter inline-block"
                  style={{ animationDelay: `${0.3 + letter++ * 0.055}s` }}
                >
                  {ch}
                </span>
              ))}
              {w < words.length - 1 && <span className="inline-block w-[0.25em]" />}
            </span>
          ))}
        </h1>
      </div>

      <p
        className="hero-anim hero-fade pointer-events-none absolute inset-x-0 bottom-3 z-30 text-center text-[11px] uppercase tracking-[0.3em] text-phosphor/50"
        style={{ animationDelay: "1.8s" }}
      >
        <span className="hidden md:inline">▚ move cursor over portrait to decode · scroll ↓ ▚</span>
        <span className="md:hidden">▚ touch portrait to decode · scroll ↓ ▚</span>
      </p>
     </div>
    </section>
  );
}
