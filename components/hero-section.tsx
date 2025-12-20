"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Building,
  Stethoscope,
  Scale,
  Code2,
  Brain,
  Database,
  Cloud,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Clean white/dark-blue background */}
      <div className="absolute inset-0 bg-white dark:bg-slate-900" />

      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-cyan-50/50 dark:from-indigo-950/30 dark:via-transparent dark:to-cyan-950/30" />

      <div className="container relative z-10 mx-auto px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
                <span className="relative mr-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                </span>
                Currently busy
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl"
            >
              Building intelligent systems that{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-cyan-400">
                transform organizations
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-slate-400"
            >
              I'm Nicolas, an AI engineer based in Belgium. I design and
              implement AI-powered solutions that help businesses automate
              workflows, extract insights from data, and deliver exceptional
              user experiences.
            </motion.p>

            {/* Industry focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-10 flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 dark:bg-slate-800 dark:text-slate-300">
                <Scale className="h-4 w-4 text-indigo-500" />
                Legal Tech
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 dark:bg-slate-800 dark:text-slate-300">
                <Stethoscope className="h-4 w-4 text-cyan-500" />
                Healthcare AI
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 dark:bg-slate-800 dark:text-slate-300">
                <BookOpen className="h-4 w-4 text-violet-500" />
                Education Tech
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-zinc-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Start a Conversation
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main visual container */}
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              {/* Rotating gradient ring */}
              <div className="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-cyan-500 to-violet-500 opacity-20 blur-3xl" />

              {/* Center profile image */}
              <div className="absolute inset-8 overflow-hidden rounded-full border-4 border-white bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800">
                <Image
                  src="/images/nicolas.jpeg"
                  alt="Nicolas Huberty"
                  fill
                  className="object-cover"
                />

                {/* Busy Badge Overlay (LinkedIn Style) */}
                <div className="pointer-events-none absolute inset-0 z-10 scale-110">
                  <svg
                    viewBox="0 0 200 200"
                    className="h-full w-full rotate-[-15deg]"
                  >
                    <defs>
                      <path id="curve" d="M 33 167 A 95 95 0 0 1 167 167" />
                    </defs>
                    {/* Arc Background */}
                    <path
                      d="M 33 167 A 95 95 0 0 1 167 167"
                      stroke="#f97316" // Orange-500
                      strokeWidth="28"
                      fill="none"
                      className="opacity-90"
                    />
                    {/* Text */}
                    <text
                      className="fill-white font-sans text-[24px] font-bold uppercase tracking-widest"
                      dy="8"
                    >
                      <textPath
                        href="#curve"
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        #BOOKED
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>

              {/* Floating skill icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 right-16 rounded-xl border border-zinc-100 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <Brain className="h-6 w-6 text-indigo-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -right-4 top-20 rounded-xl border border-zinc-100 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <Code2 className="h-6 w-6 text-cyan-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -right-2 bottom-20 rounded-xl border border-zinc-100 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <Database className="h-6 w-6 text-violet-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute -bottom-2 right-20 rounded-xl border border-zinc-100 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <Cloud className="h-6 w-6 text-emerald-500" />
              </motion.div>

              {/* Decorative dots */}
              <div className="absolute -left-8 top-1/4 h-2 w-2 rounded-full bg-indigo-500" />
              <div className="absolute -left-4 top-1/2 h-3 w-3 rounded-full bg-cyan-400" />
              <div className="absolute -left-6 bottom-1/4 h-2 w-2 rounded-full bg-violet-500" />
            </div>
          </motion.div>
        </div>

        {/* Stats - Below on mobile, part of left column flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col gap-6 border-t border-zinc-200 pt-10 dark:border-slate-800 lg:max-w-xl"
        >
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-base font-medium text-zinc-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-slate-500" />
              Based in Belgium
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-slate-500" />
              Remote Compatible
            </span>
          </div>

          <div>
            <span className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-lg font-semibold text-transparent">
              Currently fully booked building the future
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
