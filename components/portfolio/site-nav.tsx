"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

export const SECTIONS = [
  { id: "hero", label: "Top" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const

const NAV = SECTIONS.filter(s => s.id !== "hero")

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function SiteNav() {
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const observed = SECTIONS.map(s => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    observed.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const onDark = active === "hero"

  return (
    <>
      {/* Floating pill navbar */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          className={`flex w-full max-w-4xl items-center justify-between rounded-full border px-3 py-2 backdrop-blur-md transition-colors duration-500 ${
            onDark
              ? "border-white/10 bg-white/[0.06] text-white"
              : "border-ink/[0.07] bg-paper/80 text-ink shadow-[0_8px_30px_rgba(12,31,61,0.06)]"
          }`}
        >
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 pl-1.5 font-medium"
            aria-label="Back to top"
          >
            <span
              className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[12px] font-bold transition-colors ${
                onDark ? "bg-white text-navy" : "bg-blue text-white"
              }`}
            >
              NH
            </span>
            <span className="hidden text-[15px] tracking-tight sm:inline">
              Nicolas Huberty
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map(n => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-[14px] transition-colors ${
                  active === n.id
                    ? onDark
                      ? "text-white"
                      : "text-ink"
                    : onDark
                      ? "text-white/55 hover:text-white/90"
                      : "text-ink/55 hover:text-ink/90"
                }`}
              >
                {active === n.id && (
                  <span
                    className={`absolute inset-0 -z-0 rounded-full ${
                      onDark ? "bg-white/10" : "bg-ink/[0.05]"
                    }`}
                  />
                )}
                <span className="relative z-10">{n.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className={`group flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition-all hover:scale-[1.03] active:scale-95 ${
              onDark ? "bg-white text-navy" : "bg-ink text-paper"
            }`}
          >
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </nav>
      </header>

      {/* Right-side section dots (desktop) */}
      <nav
        aria-label="Sections"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3.5 lg:flex"
      >
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={active === s.id ? "true" : undefined}
            className="group relative grid h-3 w-3 place-items-center"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                active === s.id
                  ? `h-2.5 w-2.5 ${onDark ? "bg-white" : "bg-ink"}`
                  : `h-1.5 w-1.5 ${onDark ? "bg-white/30" : "bg-ink/20"} group-hover:bg-blue`
              }`}
            />
          </button>
        ))}
      </nav>
    </>
  )
}
