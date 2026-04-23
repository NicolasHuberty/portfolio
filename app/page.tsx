"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Terminal } from "lucide-react"

export default function VersionSelector() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
            <span className="h-px w-8 bg-white/30" />
            nicolas huberty
            <span className="h-px w-8 bg-white/30" />
          </div>
          <h1
            className="text-5xl font-light tracking-tight md:text-7xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Choose your{" "}
            <span className="italic text-[#ff5c8a]">experience</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/60">
            Two ways to meet me. Pick the one that fits your mood.
          </p>
        </motion.div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/v1"
              className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all hover:border-white/30"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-white/60">
                <Sparkles className="h-3 w-3" />
                v1 · classic
              </div>
              <h2 className="mb-3 text-3xl font-semibold">
                The polished portfolio
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-white/60">
                A modern scrolling portfolio. Hero, experience, projects, and a
                contact form. Built with Next.js, Tailwind, and Framer Motion.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/80 transition-transform group-hover:translate-x-1">
                Enter v1 <ArrowRight className="h-4 w-4" />
              </div>
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/v2"
              className="group relative block h-full overflow-hidden rounded-2xl border border-[#ff5c8a]/30 bg-gradient-to-br from-[#1a1512] to-[#0c0c0c] p-8 transition-all hover:border-[#ff5c8a]/60"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff5c8a]/30 bg-[#ff5c8a]/5 px-3 py-1 text-[11px] uppercase tracking-widest text-[#ff5c8a]">
                <Terminal className="h-3 w-3" />
                v2 · huberty.os
              </div>
              <h2 className="mb-3 text-3xl font-semibold">
                An operating system
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-white/60">
                A desktop OS in your browser. Draggable windows, a real virtual
                filesystem, and an interactive terminal. This is the site as the
                portfolio.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#ff5c8a] transition-transform group-hover:translate-x-1">
                Boot huberty.os <ArrowRight className="h-4 w-4" />
              </div>
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ff5c8a]/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#8ab2ff]/10 blur-3xl" />
            </Link>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-xs uppercase tracking-[0.25em] text-white/40"
        >
          brussels · ai engineer · {new Date().getFullYear()}
        </motion.p>
      </div>
    </main>
  )
}
