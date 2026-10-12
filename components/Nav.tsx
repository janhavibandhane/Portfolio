"use client";

import { useEffect, useState } from "react";
import { apps, profile } from "@/lib/data";

const links = [
  { label: "github", href: profile.github },
  { label: "linkedin", href: profile.linkedin },
  { label: "leetcode", href: profile.leetcode },
];

type MenuId = "file" | "links";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span className="w-24" />;
  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return (
    <span>
      {day} {now.getDate()} · {time}
    </span>
  );
}

function FileItems({ onPick }: { onPick: () => void }) {
  return (
    <>
      {apps.map((app, i) => (
        <a
          key={app.id}
          href={`#${app.id}`}
          onClick={onPick}
          className="line-in group flex items-center gap-4 px-4 py-2.5 text-lg transition-colors hover:bg-phosphor hover:text-ink-950"
          style={{ ["--d" as string]: `${0.05 + i * 0.05}s` }}
        >
          <span className="text-sm text-rust group-hover:text-ink-950">{app.n}</span>
          <span className="flex-1">
            {app.file} <span className="opacity-60">— {app.desc}</span>
          </span>
          <kbd className="hidden border border-current px-1.5 text-sm opacity-70 sm:inline">{app.key}</kbd>
        </a>
      ))}
    </>
  );
}

function LinkItems({ onPick }: { onPick: () => void }) {
  return (
    <>
      {links.map((link, i) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          onClick={onPick}
          className="line-in flex items-center justify-between gap-6 px-4 py-2.5 text-lg transition-colors hover:bg-phosphor hover:text-ink-950"
          style={{ ["--d" as string]: `${0.05 + i * 0.05}s` }}
        >
          {link.label}.url <span aria-hidden>↗</span>
        </a>
      ))}
    </>
  );
}

export default function Nav() {
  const [menu, setMenu] = useState<MenuId | "mobile" | null>(null);
  const close = () => setMenu(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cell = "flex items-center border-phosphor/60 px-4";
  const panel =
    "menu-drop absolute top-full z-10 border border-phosphor bg-ink-900 py-2 shadow-[5px_5px_0_var(--color-rust)]";

  const trigger = (id: MenuId, label: string) => (
    <div className="relative flex" onMouseEnter={() => menu && menu !== "mobile" && setMenu(id)}>
      <button
        type="button"
        aria-expanded={menu === id}
        onClick={() => setMenu(menu === id ? null : id)}
        className={`flex items-center px-4 text-lg transition-colors ${
          menu === id ? "text-cream" : "hover:bg-phosphor/15 hover:text-cream"
        }`}
      >
        <span className={menu === id ? "" : "invisible"}>[</span>
        {label}
        <span className={menu === id ? "" : "invisible"}>]</span>
      </button>
      {menu === id && (
        <div className={`${panel} left-0 w-max min-w-64`}>
          {id === "file" ? <FileItems onPick={close} /> : <LinkItems onPick={close} />}
        </div>
      )}
    </div>
  );

  return (
    <>
      {menu && <button type="button" aria-label="Close menu" onClick={close} className="fixed inset-0 z-[99] cursor-default" />}
      <nav className="fixed inset-x-0 top-0 z-[100] flex h-12 items-stretch border-b border-phosphor/60 bg-ink-950 text-phosphor">
        <a href="#top" onClick={close} className={`${cell} border-r font-display text-3xl leading-none text-cream`}>
          JB
        </a>

        <div className="hidden items-stretch md:flex">
          {trigger("file", "File")}
          {trigger("links", "Links")}
        </div>

        <div className="ml-auto flex items-stretch">
          <span className={`${cell} hidden gap-2 border-l sm:flex`}>
            <span className="blink h-2 w-2 bg-phosphor" aria-hidden />
            online
          </span>
          <span className={`${cell} border-l`}>
            <Clock />
          </span>
          <button
            type="button"
            aria-expanded={menu === "mobile"}
            onClick={() => setMenu(menu === "mobile" ? null : "mobile")}
            className={`${cell} border-l md:hidden ${menu === "mobile" ? "bg-phosphor text-ink-950" : ""}`}
          >
            {menu === "mobile" ? "close" : "menu"}
          </button>
        </div>

        {menu === "mobile" && (
          <div className={`${panel} inset-x-0 md:hidden`}>
            <FileItems onPick={close} />
            <hr className="my-2 border-phosphor/30" />
            <LinkItems onPick={close} />
          </div>
        )}
      </nav>
    </>
  );
}
