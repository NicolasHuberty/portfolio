"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useReducedMotion } from "framer-motion"

import { projects } from "@/lib/projects-data"
import { Reveal } from "./reveal"

const featured = projects.filter(p => p.featured && p.screenshots.length > 0)

export function Work() {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  return (
    <section
      id="work"
      data-section="work"
      className="grain relative bg-paper py-28 md:py-36"
      onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/45">
                <span className="h-1.5 w-1.5 rounded-sm bg-blue" />
                Selected work
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
                Things I&apos;ve{" "}
                <span className="font-serif italic text-blue">shipped.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-ink/55">
              A selection of production systems — legal AI, agentic platforms,
              and the infrastructure that runs them. Hover to preview, click to
              dive in.
            </p>
          </Reveal>
        </div>

        {/* Editorial numbered list */}
        <div className="mt-14 border-t border-ink/10">
          {featured.map((p, i) => {
            const live = p.status === "online"
            const isHot = hovered === i
            return (
              <Reveal key={p.id} delay={Math.min(i * 0.04, 0.2)}>
                <Link
                  href={`/projects/${p.id}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative block border-b border-ink/10"
                >
                  {/* Hover wash */}
                  <span
                    className={`pointer-events-none absolute inset-0 origin-left bg-cloud transition-all duration-500 ease-out ${
                      isHot ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative flex items-center gap-4 py-6 md:gap-8 md:py-8">
                    {/* Index */}
                    <span
                      className={`hidden w-12 shrink-0 font-mono text-sm tabular-nums transition-colors sm:block ${
                        isHot ? "text-blue" : "text-ink/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Mobile thumbnail */}
                    <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-cloud lg:hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.screenshots[0]}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Title + subtitle */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <h3
                          className={`truncate text-2xl font-medium tracking-tight transition-all duration-300 md:text-4xl ${
                            isHot ? "translate-x-1 text-blue" : "text-ink"
                          }`}
                        >
                          {p.title}
                        </h3>
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue text-white transition-all duration-300 ${
                            isHot
                              ? "scale-100 opacity-100"
                              : "scale-50 opacity-0"
                          }`}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-ink/50 md:text-base">
                        {p.subtitle}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="hidden shrink-0 flex-col items-end gap-2 md:flex">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
                        {p.category}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] ${
                          live
                            ? "bg-emerald-500/10 text-emerald-700"
                            : "bg-ink/5 text-ink/45"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            live ? "bg-emerald-500" : "bg-ink/30"
                          }`}
                        />
                        {live ? "Live" : "Archived"}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        {/* Footnote: archived / more */}
        <Reveal delay={0.1}>
          <p className="mt-8 font-mono text-[12px] text-ink/40">
            + research &amp; infra projects (ILA clinical anonymization, private
            Kubernetes cloud) — ask me about them.
          </p>
        </Reveal>
      </div>

      {/* Cursor-following image preview (desktop only) */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
        style={{
          transform: `translate3d(${pos.x + 28}px, ${pos.y - 120}px, 0)`,
          transition: reduce
            ? "none"
            : "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          className="relative h-[200px] w-[300px] overflow-hidden rounded-xl border border-ink/10 bg-cloud shadow-[0_30px_80px_rgba(12,31,61,0.25)]"
          style={{
            opacity: hovered !== null ? 1 : 0,
            transform: hovered !== null ? "scale(1)" : "scale(0.9)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {featured.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.id}
              src={p.screenshots[0]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
              style={{
                opacity: hovered === i ? 1 : 0,
                transform: hovered === i ? "scale(1)" : "scale(1.08)",
                filter: hovered === i ? "grayscale(0)" : "grayscale(1)",
              }}
            />
          ))}
          <span className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
