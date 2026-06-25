"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { HeroCanvas } from "./hero-canvas"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduce = useReducedMotion()

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease },
        }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy px-6 text-white"
    >
      {/* Interactive neural constellation */}
      <HeroCanvas />
      {/* Soft glow behind the headline for depth + legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_50%_at_50%_40%,rgba(120,165,230,0.26)_0%,rgba(12,31,61,0)_70%)]" />
      {/* Fade into the page below */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/5 to-navy" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center pt-24 text-center">
        {/* Eyebrow */}
        <motion.div
          {...rise(0)}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-white/80 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Brussels, BE · Building production AI
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...rise(0.08)}
          className="text-display text-balance font-medium"
        >
          AI systems that make work{" "}
          <span className="font-serif italic text-sky">
            faster, smarter, human.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          {...rise(0.2)}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/65 md:text-lg"
        >
          I design, build, and ship production AI — RAG pipelines, fine-tuned
          LLMs, and agentic workflows for organisations that need answers, not
          demos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...rise(0.32)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollTo("work")}
            className="group flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-navy shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            See the work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-[15px] font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.div>

        {/* Honest credentials strip */}
        <motion.div
          {...rise(0.46)}
          className="mt-14 flex flex-col items-center gap-3 text-[13px] text-white/45"
        >
          <span className="font-mono uppercase tracking-[0.2em] text-white/35">
            Currently
          </span>
          <p className="max-w-md text-pretty leading-relaxed text-white/55">
            Leading the AI practice at{" "}
            <span className="text-white/80">UCLouvain</span> · previously
            national-scale data infrastructure at{" "}
            <span className="text-white/80">Smals</span>
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo("work")}
        {...rise(0.7)}
        aria-label="Scroll to work"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors hover:text-white/80"
      >
        <ArrowDown className="animate-float h-5 w-5" />
      </motion.button>
    </section>
  )
}
