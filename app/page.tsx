"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Database,
  Github,
  Linkedin,
  Mail,
  Rocket,
} from "lucide-react"

import { projects } from "@/lib/projects-data"
import { FillText, Reveal } from "@/components/portfolio/reveal"

const NAV = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
]

const SECTIONS = ["hero", "about", "process", "work", "stack", "contact"]

const STEPS = [
  {
    no: "01",
    tag: "Discover",
    title: "Map the real problem",
    body: "Your data, your workflows, your constraints. I sit with the people doing the work before writing a line of code.",
  },
  {
    no: "02",
    tag: "Build",
    title: "Ship intelligence that holds up",
    body: "RAG pipelines, fine-tuned LLMs, and agentic workflows — engineered for accuracy, latency, and explainability, not demos.",
  },
  {
    no: "03",
    tag: "Deploy",
    title: "Run it in production",
    body: "Kubernetes, CI/CD, and monitoring on private infrastructure. It works on day one and keeps working at scale.",
  },
]

const STACK = {
  AI: ["Python", "PyTorch", "LangChain", "LangGraph", "Hugging Face", "OpenAI"],
  Data: ["PostgreSQL", "Qdrant", "Redis", "Kafka", "Airflow", "dbt"],
  Web: ["TypeScript", "Next.js", "Nuxt", "FastAPI", "React", "Tailwind"],
  Cloud: [
    "Docker",
    "Kubernetes",
    "Azure",
    "AWS",
    "Terraform",
    "GitHub Actions",
  ],
}

export default function Home() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    )
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActive(SECTIONS.indexOf(e.target.getAttribute("data-section")!))
          }
        })
      },
      { threshold: 0.6 },
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  const go = (i: number) => {
    const el = document.querySelector<HTMLElement>(
      `[data-section="${SECTIONS[i]}"]`,
    )
    el?.scrollIntoView({ behavior: "smooth" })
  }

  const onDark = active === 0

  return (
    <>
      {/* Floating pill navbar */}
      <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div
          className={`flex w-full max-w-5xl items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur transition-colors duration-500 ${
            onDark
              ? "border-white/10 bg-white/5 text-white"
              : "border-black/5 bg-white/80 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          }`}
        >
          <button
            onClick={() => go(0)}
            className="flex items-center gap-2.5 font-medium"
          >
            <span
              className={`grid h-7 w-7 place-items-center rounded-lg text-[13px] font-bold ${
                onDark ? "bg-white text-[#0c1f3d]" : "bg-blue text-white"
              }`}
            >
              NH
            </span>
            <span className="text-[15px]">Nicolas Huberty</span>
          </button>

          <div className="hidden items-center gap-7 text-[14px] md:flex">
            {NAV.map((n, i) => (
              <button
                key={n.href}
                onClick={() => go(i + 1)}
                className={`transition-opacity hover:opacity-100 ${
                  onDark ? "opacity-75" : "opacity-70"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            onClick={e => {
              e.preventDefault()
              go(5)
            }}
            className={`rounded-xl px-4 py-2 text-[14px] font-medium transition-all hover:scale-[1.03] ${
              onDark ? "bg-white text-[#0c1f3d]" : "bg-ink text-white"
            }`}
          >
            Get in touch
          </a>
        </div>
      </nav>

      {/* Right-side section dots */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {SECTIONS.map((s, i) => (
          <button
            key={s}
            onClick={() => go(i)}
            aria-label={`Go to ${s}`}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              active === i
                ? onDark
                  ? "scale-125 bg-white"
                  : "scale-125 bg-ink"
                : onDark
                  ? "bg-white/30"
                  : "bg-ink/20"
            }`}
          />
        ))}
      </div>

      <main>
        <HeroSection onPrimary={() => go(5)} onSecondary={() => go(3)} />
        <AboutSection />
        <ProcessSection />
        <WorkSection onContact={() => go(5)} />
        <StackSection />
        <ContactSection />
      </main>
    </>
  )
}

/* ----------------------------- HERO ----------------------------- */
function HeroSection({
  onPrimary,
  onSecondary,
}: {
  onPrimary: () => void
  onSecondary: () => void
}) {
  return (
    <section
      data-section="hero"
      className="snap-section curtain-bg flex flex-col items-center justify-center overflow-hidden text-white"
    >
      <div className="curtain-glow pointer-events-none absolute inset-0" />
      <div className="curtain-sheen pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0c1f3d]/30 via-transparent to-[#0c1f3d]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-32 text-center md:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          AI Systems That Make Work{" "}
          <span className="font-serif-display italic text-[#9ec1f5]">
            Faster, Smarter, Human.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          I design, build, and ship production AI — RAG pipelines, fine-tuned
          LLMs, and agentic workflows for organisations that need answers, not
          demos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={onPrimary}
            className="group flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-[#0c1f3d] shadow-lg transition-transform hover:scale-[1.03]"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={onSecondary}
            className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            See my work
          </button>
        </motion.div>
      </div>

      {/* Console mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-8 w-full max-w-3xl translate-y-10 px-6 md:mt-12"
      >
        <ConsoleMockup />
      </motion.div>
    </section>
  )
}

function ConsoleMockup() {
  const metrics = [
    { label: "DOCUMENTS INDEXED", value: "1.24M", sub: "across 9 sources" },
    { label: "MEAN LATENCY", value: "240ms", sub: "p95 retrieval" },
    { label: "ANSWER ACCURACY", value: "96.4%", sub: "vs. graded set" },
  ]
  return (
    <div className="overflow-hidden rounded-t-2xl border border-white/10 bg-white shadow-2xl">
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#f4f5f7] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="mx-auto rounded-md bg-white px-4 py-1 text-xs text-ink/40">
          huberty.ai / console
        </div>
      </div>
      <div className="bg-white p-6 text-left text-ink">
        <p className="text-xs uppercase tracking-widest text-ink/40">
          Retrieval dashboard
        </p>
        <h3 className="mt-1 text-xl font-medium">Welcome back, Nicolas</h3>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {metrics.map(m => (
            <div
              key={m.label}
              className="rounded-xl border border-black/5 bg-[#fafafb] p-4"
            >
              <p className="text-[10px] uppercase tracking-widest text-ink/40">
                {m.label}
              </p>
              <p className="mt-2 text-lg font-semibold md:text-2xl">
                {m.value}
              </p>
              <p className="mt-1 text-[11px] text-ink/40">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- ABOUT ----------------------------- */
function AboutSection() {
  return (
    <section
      data-section="about"
      id="about"
      className="snap-section flex items-center overflow-hidden bg-paper"
    >
      {/* outlined circles */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[34rem] w-[34rem] rounded-full border border-blue/10" />
        <div className="absolute h-[46rem] w-[46rem] rounded-full border border-blue/[0.06]" />
        <div className="absolute h-[22rem] w-[22rem] rounded-full border border-blue/[0.08]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-32 md:pb-0 md:pt-28">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/45">
            <span className="h-2 w-2 rounded-sm bg-blue" />
            How I think
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="max-w-3xl text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
            I&apos;m an engineer at heart and a{" "}
            <span className="font-serif-display italic text-blue">
              builder by obsession.
            </span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <FillText
            className="max-w-2xl text-lg leading-relaxed text-ink/80 md:text-2xl"
            text="Two UCLouvain degrees and five years shipping production ML, RAG, and agentic workflows — currently leading the AI practice at UCLouvain, previously building national-scale data infrastructure at Smals. I believe AI should make professionals faster, not replace them. Technology should empower, not overwhelm."
          />

          <div className="flex flex-col items-start gap-6">
            <div className="flex gap-3">
              {[
                { n: "5+", l: "Years in production ML" },
                { n: "12+", l: "Systems shipped" },
              ].map(s => (
                <Reveal key={s.l} delay={0.1}>
                  <div className="rounded-2xl border border-blue/10 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(24,73,139,0.06)]">
                    <p className="text-3xl font-semibold text-blue">{s.n}</p>
                    <p className="mt-1 max-w-[7rem] text-xs uppercase tracking-wide text-ink/45">
                      {s.l}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <a
              href="#process"
              className="group flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-white"
            >
              How I work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- PROCESS ----------------------------- */
function ProcessSection() {
  const icons = [Database, Cpu, Rocket]
  return (
    <section
      data-section="process"
      id="process"
      className="snap-section flex items-center bg-paper"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32 md:pb-0 md:pt-28">
        <Reveal className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/45">
            <span className="h-2 w-2 rounded-sm bg-blue" />
            How I work
          </div>
        </Reveal>
        <Reveal delay={0.05} className="text-center">
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
            From raw idea to shipped system{" "}
            <span className="font-serif-display italic text-blue">
              in weeks, not quarters.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={step.no} delay={i * 0.12}>
                <div className="group flex h-full flex-col rounded-3xl border border-blue/10 bg-white p-7 shadow-[0_10px_40px_rgba(24,73,139,0.05)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-serif-display text-3xl italic text-ink/15">
                      {step.no}
                    </span>
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-blue">
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
    </section>
  )
}

/* ----------------------------- WORK ----------------------------- */
function WorkSection({ onContact }: { onContact: () => void }) {
  return (
    <section
      data-section="work"
      id="work"
      className="snap-section flex items-center bg-paper"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32 md:pb-0 md:pt-28">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/45">
                <span className="h-2 w-2 rounded-sm bg-blue" />
                Selected work
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-2xl text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
                Things I&apos;ve{" "}
                <span className="font-serif-display italic text-blue">
                  shipped.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <button
              onClick={onContact}
              className="group flex w-fit items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-white"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link
                href={`/projects/${p.id}`}
                className="group flex h-full flex-col rounded-3xl border border-blue/10 bg-white p-5 shadow-[0_10px_40px_rgba(24,73,139,0.05)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-blue">
                    {p.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                </div>
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="mt-1 flex-1 text-sm text-ink/55">{p.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 3).map(t => (
                    <span
                      key={t}
                      className="rounded-full bg-ink/5 px-2.5 py-1 text-[11px] text-ink/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- STACK ----------------------------- */
function StackSection() {
  const all = Object.values(STACK).flat()
  const per = Math.ceil(all.length / 3)
  const rows = [all.slice(0, per), all.slice(per, per * 2), all.slice(per * 2)]
  return (
    <section
      data-section="stack"
      id="stack"
      className="snap-section flex items-center overflow-hidden bg-[#0c1f3d] text-white"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
        <div className="animate-spin-slow h-[40rem] w-[40rem] rounded-full border border-white/10" />
        <div className="animate-spin-rev absolute h-[28rem] w-[28rem] rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-32 md:pb-0 md:pt-28">
        <Reveal>
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50">
            <span className="h-2 w-2 rounded-sm bg-[#9ec1f5]" />
            The toolkit
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
            One stack,{" "}
            <span className="font-serif-display italic text-[#9ec1f5]">
              end to end.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-white/60">
            From model training to the Kubernetes cluster it runs on — I own the
            whole pipeline so nothing falls between the cracks.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {Object.keys(STACK).map(g => (
            <span
              key={g}
              className="text-xs uppercase tracking-[0.2em] text-white/40"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="marquee-mask mt-10 space-y-3">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className={`marquee ${ri % 2 === 1 ? "marquee-right" : "marquee-left"}`}
            >
              {[...row, ...row].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- CONTACT ----------------------------- */
function ContactSection() {
  const links = [
    {
      icon: Mail,
      label: "huberty.nicolas@hotmail.com",
      href: "mailto:huberty.nicolas@hotmail.com",
    },
    {
      icon: Github,
      label: "github.com/NicolasHuberty",
      href: "https://github.com/NicolasHuberty",
    },
    {
      icon: Linkedin,
      label: "linkedin.com/in/nicolas-huberty",
      href: "https://www.linkedin.com/in/nicolas-huberty/",
    },
  ]
  return (
    <section
      data-section="contact"
      id="contact"
      className="snap-section flex items-center bg-paper"
    >
      <div className="w-full">
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-32 text-center md:pb-0 md:pt-28">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink/45">
              Let&apos;s build something
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Have a system worth{" "}
              <span className="font-serif-display italic text-blue">
                building right?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="mailto:huberty.nicolas@hotmail.com"
              className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-blue px-6 py-3.5 font-medium text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
                >
                  <l.icon className="h-4 w-4" />
                  {l.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="absolute inset-x-0 bottom-0 border-t border-ink/5 px-6 py-7">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-sm text-ink/45 sm:flex-row">
          <p className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-blue text-[11px] font-bold text-white">
              NH
            </span>
            Nicolas Huberty
          </p>
          <p>Brussels · AI Engineer · {new Date().getFullYear()}</p>
          <a
            href="mailto:huberty.nicolas@hotmail.com"
            className="transition-colors hover:text-ink"
          >
            huberty.nicolas@hotmail.com
          </a>
        </div>
      </footer>
    </section>
  )
}
