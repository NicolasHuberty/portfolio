"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function TechStackSlider() {
  const [isPaused, setIsPaused] = useState(false)

  const technologies = [
    { name: "Python", icon: "🐍", color: "from-blue-400 to-yellow-400" },
    { name: "TypeScript", icon: "📘", color: "from-blue-500 to-blue-600" },
    { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
    { name: "Next.js", icon: "▲", color: "from-slate-300 to-slate-400" },
    { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-500" },
    { name: "FastAPI", icon: "⚡", color: "from-emerald-400 to-teal-500" },
    { name: "Docker", icon: "🐳", color: "from-blue-400 to-cyan-500" },
    { name: "Kubernetes", icon: "☸️", color: "from-blue-500 to-indigo-600" },
    { name: "PostgreSQL", icon: "🐘", color: "from-blue-600 to-indigo-700" },
    { name: "MongoDB", icon: "🍃", color: "from-green-500 to-emerald-600" },
    { name: "Redis", icon: "🔴", color: "from-red-500 to-orange-600" },
    { name: "Azure", icon: "☁️", color: "from-blue-400 to-sky-500" },
    { name: "Git", icon: "🔧", color: "from-orange-500 to-red-600" },
    { name: "TensorFlow", icon: "🧠", color: "from-orange-400 to-amber-500" },
    { name: "PyTorch", icon: "🔥", color: "from-red-500 to-orange-500" },
    { name: "OpenAI", icon: "🤖", color: "from-emerald-400 to-green-500" },
  ]

  // Duplicate for seamless loop
  const duplicatedTech = [...technologies, ...technologies]

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

      <div className="relative">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            Tech{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Languages, frameworks, and tools I work with
          </p>
        </motion.div>

        {/* Sliding container */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-950 to-transparent" />

          {/* Scrolling track */}
          <div
            className="flex"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: isPaused ? 0 : [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedTech.map((tech, index) => (
                <motion.div
                  key={index}
                  className="group relative flex-shrink-0"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex h-32 w-32 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm transition-all hover:border-blue-500/50">
                    {/* Icon */}
                    <div className="text-5xl">{tech.icon}</div>

                    {/* Name */}
                    <div
                      className={`bg-gradient-to-r ${tech.color} bg-clip-text text-center text-sm font-semibold text-transparent`}
                    >
                      {tech.name}
                    </div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-300 group-hover:from-blue-500/10 group-hover:to-emerald-500/10 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Proficiency levels */}
        <motion.div
          className="mt-16 grid gap-4 px-6 md:grid-cols-4 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[
            { level: "Expert", count: "6+", tech: "Python, TypeScript, React" },
            { level: "Advanced", count: "8+", tech: "Docker, K8s, Azure" },
            { level: "Proficient", count: "10+", tech: "Databases, APIs" },
            { level: "Learning", count: "∞", tech: "Always evolving" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 text-center backdrop-blur-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-3xl font-bold text-transparent">
                {item.count}
              </div>
              <div className="mb-1 text-sm font-semibold text-white">
                {item.level}
              </div>
              <div className="text-xs text-slate-500">{item.tech}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          className="mt-8 text-center text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Hover over the technologies to pause the slider
        </motion.p>
      </div>
    </section>
  )
}
