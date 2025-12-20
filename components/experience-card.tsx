"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ExperienceCardProps {
  role: string
  company: string
  type: string
  description: string
  responsibilities?: string[]
  technologies?: string[]
  period?: string
  icon?: string
  logo?: string
}

export default function ExperienceCard({
  role,
  company,
  type,
  description,
  responsibilities,
  technologies,
  period,
  icon = "💼",
  logo,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/20 via-black/90 to-pink-950/20 backdrop-blur-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Icon/Logo */}
            <motion.div
              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-3xl backdrop-blur-sm ${logo ? 'p-2' : ''}`}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {logo ? (
                <img
                  src={logo}
                  alt={`${company} logo`}
                  className="h-full w-full object-contain"
                />
              ) : (
                icon
              )}
            </motion.div>

            {/* Role and Company */}
            <div>
              <h3 className="text-2xl font-bold text-white">{role}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-lg font-semibold text-transparent">
                  {company}
                </p>
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
                  {type}
                </span>
              </div>
            </div>
          </div>

          {/* Period */}
          {period && (
            <div className="flex-shrink-0 text-right text-sm text-white/60">
              {period}
            </div>
          )}
        </div>

        {/* Description */}
        <motion.p
          className="mt-6 leading-relaxed text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>

        {/* Expandable section */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-6 space-y-6">
            {/* Responsibilities */}
            {responsibilities && responsibilities.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Key Responsibilities
                </h4>
                <div className="space-y-3">
                  {responsibilities.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                      <p className="text-sm text-white/70">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {technologies && technologies.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-pink-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm ring-1 ring-white/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Expand/Collapse button */}
        {(responsibilities || technologies) && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{isExpanded ? "Show Less" : "Show More"}</span>
            <motion.svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        )}
      </div>

      {/* Shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)",
        }}
      />
    </motion.div>
  )
}
