"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { MouseEvent, useState } from "react"

interface EducationCardProps {
  degree: string
  field: string
  institution: string
  location: string
  period: string
  thesis?: {
    title: string
    description: string
  }
  achievements?: string[]
  icon?: string
  logo?: string
}

export default function EducationCard({
  degree,
  field,
  institution,
  location,
  period,
  thesis,
  achievements,
  icon = "🎓",
  logo,
}: EducationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/30 via-black/90 to-pink-950/30 p-8 backdrop-blur-xl">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />

        {/* Animated gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 0.1 : 0,
          }}
        />

        {/* Icon/Logo with glow effect */}
        <motion.div
          className="relative mb-6 inline-flex"
          style={{
            transform: "translateZ(50px)",
          }}
        >
          <motion.div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-4xl backdrop-blur-sm ${logo ? 'p-2' : ''} sm:h-20 sm:w-20`}
            animate={{
              boxShadow: isHovered
                ? "0 0 30px rgba(168, 85, 247, 0.5)"
                : "0 0 0 rgba(168, 85, 247, 0)",
            }}
            transition={{ duration: 0.3 }}
          >
            {logo ? (
              <img
                src={logo}
                alt={`${institution} logo`}
                className="h-full w-full object-contain"
              />
            ) : (
              icon
            )}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div
          className="relative space-y-4"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          {/* Degree */}
          <div>
            <h3 className="text-2xl font-bold text-white">{degree}</h3>
            <p className="mt-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-lg font-semibold text-transparent">
              {field}
            </p>
          </div>

          {/* Institution */}
          <div className="flex items-center gap-2 text-white/70">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="font-medium">{institution}</span>
            <span>•</span>
            <span>{location}</span>
          </div>

          {/* Period */}
          <div className="flex items-center gap-2 text-white/60">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{period}</span>
          </div>

          {/* Thesis */}
          {thesis && (
            <motion.div
              className="mt-6 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-pink-950/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-purple-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Master's Thesis
              </div>
              <h4 className="mb-2 text-lg font-semibold text-white">{thesis.title}</h4>
              <p className="text-sm leading-relaxed text-white/70">{thesis.description}</p>
            </motion.div>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <div className="mt-6 space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  <p className="text-sm text-white/70">{achievement}</p>
                </motion.div>
              ))}
            </div>
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
      </div>
    </motion.div>
  )
}
