"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import AIDashboard from "./ai-dashboard"
import MaximumVisitorTracking from "./maximum-visitor-tracking"

// Magnetic Button Component
function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const buttonX = useSpring(0, { damping: 20, stiffness: 300 })
  const buttonY = useSpring(0, { damping: 20, stiffness: 300 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    mouseX.set(deltaX * 0.3)
    mouseY.set(deltaY * 0.3)
    buttonX.set(deltaX * 0.3)
    buttonY.set(deltaY * 0.3)
  }

  const handleMouseLeave = () => {
    buttonX.set(0)
    buttonY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: buttonX, y: buttonY }}
      whileTap={{ scale: 0.95 }}
      className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-blue-500/30"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.a>
  )
}

// Counter Animation Component
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function EnhancedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Smooth mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 })
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 })

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Generate more particles for richer effect
  const particlePositions = Array.from({ length: 50 }, (_, i) => ({
    left: (i * 7.3 + 13) % 100,
    top: (i * 11.7 + 23) % 100,
    duration: 2 + (i % 7) * 0.3,
    delay: (i % 10) * 0.2,
    size: Math.random() > 0.5 ? 1 : 2,
  }))

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Mouse spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-slate-950">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-emerald-900/20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2) 0%, rgba(2, 6, 23, 1) 50%)",
              "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.2) 0%, rgba(2, 6, 23, 1) 50%)",
              "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.2) 0%, rgba(2, 6, 23, 1) 50%)",
              "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, rgba(2, 6, 23, 1) 50%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2) 0%, rgba(2, 6, 23, 1) 50%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="space-y-6">
              {/* MAXIMUM Visitor Tracking - ALL TECHNIQUES + 7 NEW ONES */}
              <MaximumVisitorTracking />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="h-2 w-2 rounded-full bg-emerald-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-sm font-medium text-slate-300">
                    Available for new projects
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
                  {/* Character-by-character reveal */}
                  <motion.span
                    className="inline-block bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Building
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block text-white"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Intelligent
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    Systems
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="max-w-xl text-lg leading-relaxed text-slate-400"
              >
                AI Engineer & Full-Stack Developer specializing in generative
                intelligence, automation, and seamless user experiences for
                legal and medical industries.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex flex-wrap gap-4"
              >
                {/* Magnetic button effect */}
                <MagneticButton href="#projects">
                  <span className="relative z-10">View My Work</span>
                </MagneticButton>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800/50 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-blue-500 hover:bg-slate-800"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Let's Talk</span>
                </motion.a>
              </motion.div>

              {/* Stats with counter animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                {[
                  { value: 2, suffix: "+", label: "Years in AI" },
                  { value: 50, suffix: "+", label: "Projects Done" },
                  { value: 100, suffix: "%", label: "Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                  >
                    <div className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-3xl font-bold text-transparent">
                      {mounted && (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      )}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right side - Le Traceur d'Avenir */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                {/* Decorative glow elements */}
                <motion.div
                  className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />

                {/* AI Operations Dashboard */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="relative"
                >
                  <AIDashboard />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 0.5 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-500">Scroll to explore</span>
          <motion.div
            className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-slate-700 p-2"
            whileHover={{ borderColor: "rgb(59, 130, 246)" }}
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-gradient-to-b from-blue-400 to-emerald-400"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
