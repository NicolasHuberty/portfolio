"use client"

import Image from "next/image"
import { Cpu, Database, Rocket } from "lucide-react"

import { FillText, Reveal } from "./reveal"

const STATS = [
  { n: "5+", l: "Years in production ML" },
  { n: "12+", l: "Systems shipped" },
  { n: "2", l: "UCLouvain degrees" },
]

const STEPS = [
  {
    no: "01",
    icon: Database,
    tag: "Discover",
    title: "Map the real problem",
    body: "Your data, your workflows, your constraints. I sit with the people doing the work before writing a line of code.",
  },
  {
    no: "02",
    icon: Cpu,
    tag: "Build",
    title: "Ship intelligence that holds up",
    body: "RAG pipelines, fine-tuned LLMs, and agentic workflows — engineered for accuracy, latency, and explainability, not demos.",
  },
  {
    no: "03",
    icon: Rocket,
    tag: "Deploy",
    title: "Run it in production",
    body: "Kubernetes, CI/CD, and monitoring on private infrastructure. It works on day one and keeps working at scale.",
  },
]

export function About() {
  return (
    <section
      id="about"
      data-section="about"
      className="relative overflow-hidden bg-cloud py-28 md:py-36"
    >
      {/* Soft concentric guides */}
      <div className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="h-[34rem] w-[34rem] rounded-full border border-blue/[0.08]" />
        <div className="absolute inset-0 m-auto h-[22rem] w-[22rem] rounded-full border border-blue/[0.1]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/45">
            <span className="h-1.5 w-1.5 rounded-sm bg-blue" />
            About
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-[1.45fr_1fr] md:items-stretch md:gap-12">
          {/* Left: statement + bio + stats (fills the column height) */}
          <div className="flex flex-col">
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
                I&apos;m an engineer at heart and a{" "}
                <span className="font-serif italic text-blue">
                  builder by obsession.
                </span>
              </h2>
            </Reveal>
            <FillText
              className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl"
              text="Two UCLouvain degrees and five years shipping production ML, RAG, and agentic workflows — currently leading the AI practice at UCLouvain, previously building national-scale data infrastructure at Smals. I believe AI should make professionals faster, not replace them. Technology should empower, not overwhelm."
            />
            <div className="mt-10 grid grid-cols-3 gap-3 md:mt-auto md:pt-10">
              {STATS.map((s, i) => (
                <Reveal key={s.l} delay={0.14 + i * 0.06}>
                  <div className="rounded-2xl border border-ink/[0.08] bg-paper px-4 py-4 shadow-[0_8px_30px_rgba(24,73,139,0.05)]">
                    <p className="font-serif text-3xl text-blue md:text-4xl">
                      {s.n}
                    </p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-wide text-ink/45">
                      {s.l}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: portrait stretches to match the left column */}
          <Reveal delay={0.08} className="h-full">
            <figure className="group relative h-full min-h-[20rem] overflow-hidden rounded-3xl border border-ink/[0.08] bg-paper shadow-[0_18px_50px_rgba(24,73,139,0.1)]">
              <Image
                src="/images/nicolas.jpeg"
                alt="Nicolas Huberty"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-navy/0" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 text-white">
                <span className="text-sm font-medium">Nicolas Huberty</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                  Brussels, BE
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Process band */}
        <div className="mt-20">
          <Reveal>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/45">
              How I work — idea to shipped system in weeks, not quarters
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal key={step.no} delay={i * 0.1}>
                  <div className="group flex h-full flex-col rounded-3xl border border-ink/[0.08] bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(24,73,139,0.08)]">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-serif text-3xl italic text-ink/15">
                        {step.no}
                      </span>
                    </div>
                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
                      {step.tag}
                    </p>
                    <h3 className="mt-2 text-xl font-medium">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
