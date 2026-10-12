"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

// Posts to the site's own SMTP route (app/api/contact), or to NEXT_PUBLIC_FORM_ENDPOINT if set.
// If the route has no SMTP credentials yet it answers 503 and the form hands the message to
// the visitor's mail app instead, prefilled.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/contact";

type Status = "idle" | "sending" | "sent" | "mail" | "busy" | "error";

const fields = [
  { name: "name", label: "name", type: "text", required: true, autoComplete: "name", placeholder: "who's writing?" },
  { name: "email", label: "email", type: "email", required: true, autoComplete: "email", placeholder: "where do I reply?" },
  { name: "company", label: "company", type: "text", required: false, autoComplete: "organization", placeholder: "optional" },
] as const;

const inputClass =
  "w-full border-b-2 border-phosphor/40 bg-transparent py-1.5 text-xl text-cream outline-none transition-colors placeholder:text-phosphor/30 focus:border-phosphor";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const viaMailApp = () => {
      const subject = `Portfolio enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`;
      const body = `${data.message}\n\n— ${data.name}\n${data.email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mail");
    };

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 503) return viaMailApp();
      if (res.status === 429) return setStatus("busy");
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="line-in border-2 border-phosphor p-6 text-xl text-cream" role="status">
        <p className="text-phosphor">[ OK ] message delivered</p>
        <p className="mt-2 text-cream/70">Thank you — I usually reply within 24–48 hours.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-phosphor underline">
          send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {fields.map((f, i) => (
        <label
          key={f.name}
          className={`line-in block ${f.name === "company" ? "sm:col-span-2" : ""}`}
          style={{ ["--d" as string]: `${0.15 + i * 0.08}s` }}
        >
          <span className="text-sm uppercase tracking-[0.2em] text-phosphor/70">
            <span className="text-rust">&gt;</span> {f.label}
            {f.required && <span className="text-rust"> *</span>}
          </span>
          <input
            name={f.name}
            type={f.type}
            required={f.required}
            autoComplete={f.autoComplete}
            placeholder={f.placeholder}
            className={inputClass}
          />
        </label>
      ))}
      {/* honeypot: hidden from people, tempting to bots; the server drops anything that fills it */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="line-in block sm:col-span-2" style={{ ["--d" as string]: "0.4s" }}>
        <span className="text-sm uppercase tracking-[0.2em] text-phosphor/70">
          <span className="text-rust">&gt;</span> message<span className="text-rust"> *</span>
        </span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="role, project, or just hello…"
          className={`${inputClass} resize-none`}
        />
      </label>

      <div className="line-in flex flex-wrap items-center gap-4 sm:col-span-2" style={{ ["--d" as string]: "0.5s" }}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group flex items-center gap-3 bg-phosphor px-5 py-2 text-xl text-ink-950 shadow-[4px_4px_0_var(--color-rust)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-cream hover:shadow-[2px_2px_0_var(--color-rust)] disabled:opacity-60"
        >
          {status === "sending" ? "sending…" : "send message"}
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            ▶
          </span>
        </button>
        <p className="text-sm text-phosphor/70" role="status">
          {status === "mail" && "Opening your mail app with the message filled in — press send there."}
          {status === "busy" && "Too many messages just now — please try again in a few minutes."}
          {status === "error" && (
            <>
              Couldn&apos;t send. Email me directly:{" "}
              <a href={`mailto:${profile.email}`} className="underline">
                {profile.email}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
