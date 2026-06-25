"use client"

import { Github, Linkedin, Mail } from "lucide-react"

import { Reveal } from "./reveal"

const EMAIL = "huberty.nicolas@hotmail.com"

const LINKS = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: Github,
    label: "GitHub",
    value: "NicolasHuberty",
    href: "https://github.com/NicolasHuberty",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "nicolas-huberty",
    href: "https://www.linkedin.com/in/nicolas-huberty/",
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      data-section="contact"
      className="grain relative bg-paper pt-28 md:pt-36"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-24 text-center">
        <Reveal>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/45">
            Let&apos;s build something
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-display text-balance font-medium">
            Have a system worth{" "}
            <span className="font-serif italic text-blue">building right?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-ink/60">
            Whether it&apos;s a RAG platform, an agentic workflow, or the infra
            to run it — tell me what you&apos;re building.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-blue px-7 py-4 text-[15px] font-medium text-white shadow-[0_12px_40px_rgba(24,73,139,0.3)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Mail className="h-4 w-4" />
            Start a conversation
          </a>
        </Reveal>

        {/* Social cards */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 grid max-w-2xl gap-3 sm:grid-cols-3">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex flex-col items-center gap-2 rounded-2xl border border-ink/[0.08] bg-paper px-4 py-5 transition-all hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_14px_40px_rgba(24,73,139,0.08)]"
              >
                <l.icon className="h-5 w-5 text-ink/40 transition-colors group-hover:text-blue" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                  {l.label}
                </span>
                <span className="truncate text-sm text-ink/70">{l.value}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <footer className="border-t border-ink/[0.07] px-6 py-7">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-ink/45 sm:flex-row">
          <p className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-blue font-mono text-[10px] font-bold text-white">
              NH
            </span>
            Nicolas Huberty
          </p>
          <p className="font-mono text-[12px] uppercase tracking-wide">
            Brussels · AI &amp; Software Engineer · {new Date().getFullYear()}
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors hover:text-ink"
          >
            {EMAIL}
          </a>
        </div>
      </footer>
    </section>
  )
}
