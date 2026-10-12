import { Braces, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import ContactForm from "./ContactForm";
import { GithubIcon, LinkedinIcon, SectionLabel } from "./Icons";
import Reveal from "./Reveal";

const FLIGHT = "M-20 250C160 60 330 330 520 180S860 20 1060 150s230 70 180 -10";

const socials = [
  { label: "GitHub", href: profile.github, icon: <GithubIcon className="h-5 w-5" /> },
  { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinIcon className="h-5 w-5" /> },
  { label: "LeetCode", href: profile.leetcode, icon: <Braces className="h-5 w-5" /> },
];

export default function ContactSection() {
  return (
    <section data-scroll="view" className="relative z-10 overflow-hidden bg-ink-950 px-5 pb-8 pt-28 md:px-20 md:pt-40">
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,var(--color-ink-600)_0%,transparent_70%)]"
        aria-hidden
      />

      {/* paper plane flying a dashed route */}
      <svg
        viewBox="0 0 1200 320"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-x-0 top-4 h-64 w-full md:h-80"
        fill="none"
        aria-hidden
      >
        <path className="dash-flow" d={FLIGHT} stroke="rgba(242,163,60,0.35)" strokeWidth="1.5" />
        <g>
          <path d="M-14 -9 16 0-14 9-7 0z" fill="#f7e3b5" />
          <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" path={FLIGHT} />
        </g>
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <SectionLabel index="05">Contact</SectionLabel>
          <h2 className="font-display text-6xl leading-[0.85] text-cream sm:text-8xl">
            Let&apos;s build something <span className="text-phosphor">together.</span>
          </h2>
          <p className="mt-6 max-w-md text-xl leading-snug text-cream/70">
            Have a project, a role or just want to talk shop? Fill in the form — I usually reply within 24–48
            hours.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
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
        </Reveal>

        <Reveal delay={150} className="border-2 border-phosphor bg-ink-900 shadow-[8px_8px_0_var(--color-rust)]">
          <header className="flex items-stretch border-b-2 border-phosphor">
            <span className="bg-phosphor px-4 py-1.5 text-xl text-ink-950">new-message.txt</span>
            <span className="title-stripes flex-1" aria-hidden />
          </header>
          <div className="p-5 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-phosphor/25 pt-5 text-sm text-phosphor/60 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </p>
        <a href="#top" className="transition-colors hover:text-cream">
          back to top ↑
        </a>
      </footer>
    </section>
  );
}
