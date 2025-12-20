"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AdaptiveOrb() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get relative mouse position (normalized -1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Generate organic blob path using radial displacement
  const generateBlobPath = (
    centerX: number,
    centerY: number,
    baseRadius: number,
    points: number,
    variation: number,
  ) => {
    let path = `M `
    const angleStep = (Math.PI * 2) / points

    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep
      // Add organic variation to radius
      const radiusVariation =
        baseRadius +
        Math.sin(angle * 3 + variation) * 20 +
        Math.cos(angle * 5 + variation * 1.5) * 15
      const x = centerX + Math.cos(angle) * radiusVariation
      const y = centerY + Math.sin(angle) * radiusVariation

      if (i === 0) {
        path += `${x},${y} `
      } else {
        // Use quadratic curves for smooth organic shape
        const prevAngle = (i - 1) * angleStep
        const prevRadius =
          baseRadius +
          Math.sin(prevAngle * 3 + variation) * 20 +
          Math.cos(prevAngle * 5 + variation * 1.5) * 15
        const controlX =
          centerX +
          Math.cos(prevAngle + angleStep / 2) *
            ((radiusVariation + prevRadius) / 2)
        const controlY =
          centerY +
          Math.sin(prevAngle + angleStep / 2) *
            ((radiusVariation + prevRadius) / 2)
        path += `Q ${controlX},${controlY} ${x},${y} `
      }
    }

    return path + "Z"
  }

  return (
    <div
      className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10" />

      {/* Main SVG container */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 500"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Define gradients */}
        <defs>
          {/* Main orb gradient */}
          <motion.radialGradient
            id="orbGradient"
            animate={{
              cx: ["40%", "60%", "40%"],
              cy: ["40%", "60%", "40%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </motion.radialGradient>

          {/* Inner glow gradient */}
          <radialGradient id="innerGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>

          {/* Blur filter for glow */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="20"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Strong glow filter */}
          <filter
            id="strongGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="40"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background blob layers for depth */}
        {[0, 1, 2].map(layer => (
          <motion.path
            key={`bg-blob-${layer}`}
            fill="url(#orbGradient)"
            opacity={0.1 - layer * 0.03}
            filter="url(#glow)"
            animate={{
              d: [
                generateBlobPath(300, 250, 180 + layer * 20, 12, layer * 0.5),
                generateBlobPath(
                  300,
                  250,
                  180 + layer * 20,
                  12,
                  layer * 0.5 + Math.PI * 0.5,
                ),
                generateBlobPath(
                  300,
                  250,
                  180 + layer * 20,
                  12,
                  layer * 0.5 + Math.PI,
                ),
                generateBlobPath(
                  300,
                  250,
                  180 + layer * 20,
                  12,
                  layer * 0.5 + Math.PI * 1.5,
                ),
                generateBlobPath(
                  300,
                  250,
                  180 + layer * 20,
                  12,
                  layer * 0.5 + Math.PI * 2,
                ),
              ],
              scale: [1, 1.05, 0.98, 1.02, 1],
            }}
            transition={{
              duration: 15 + layer * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: layer * 0.5,
            }}
            style={{
              transformOrigin: "300px 250px",
            }}
          />
        ))}

        {/* Main adaptive orb */}
        <motion.path
          fill="url(#orbGradient)"
          filter="url(#strongGlow)"
          animate={{
            d: [
              generateBlobPath(300, 250, 150, 12, 0),
              generateBlobPath(300, 250, 150, 12, Math.PI * 0.33),
              generateBlobPath(300, 250, 150, 12, Math.PI * 0.66),
              generateBlobPath(300, 250, 150, 12, Math.PI),
              generateBlobPath(300, 250, 150, 12, Math.PI * 1.33),
              generateBlobPath(300, 250, 150, 12, Math.PI * 1.66),
              generateBlobPath(300, 250, 150, 12, Math.PI * 2),
            ],
            scale: isHovered ? [1, 1.08, 1] : [1, 1.03, 0.97, 1.02, 1],
          }}
          transition={{
            d: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: isHovered ? 2 : 10,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            transformOrigin: "300px 250px",
          }}
        />

        {/* Inner highlight blob */}
        <motion.path
          fill="url(#innerGlow)"
          animate={{
            d: [
              generateBlobPath(280, 230, 60, 8, 0),
              generateBlobPath(285, 235, 65, 8, Math.PI * 0.5),
              generateBlobPath(280, 230, 60, 8, Math.PI),
              generateBlobPath(275, 225, 65, 8, Math.PI * 1.5),
              generateBlobPath(280, 230, 60, 8, Math.PI * 2),
            ],
            opacity: [0.6, 0.8, 0.6, 0.7, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle mouse reaction - displacement effect */}
        <motion.ellipse
          cx={300}
          cy={250}
          rx={150}
          ry={150}
          fill="rgba(255, 255, 255, 0.05)"
          animate={{
            cx: 300 + mousePos.x * 15,
            cy: 250 + mousePos.y * 15,
            rx: isHovered ? 160 : 150 - Math.abs(mousePos.x) * 5,
            ry: isHovered ? 160 : 150 - Math.abs(mousePos.y) * 5,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 50,
          }}
        />

        {/* Floating particles inside the orb */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const distance = 80 + (i % 3) * 20
          return (
            <motion.circle
              key={`particle-${i}`}
              cx={300}
              cy={250}
              r={2 + (i % 2)}
              fill="rgba(255, 255, 255, 0.3)"
              animate={{
                cx: 300 + Math.cos(angle + Date.now() * 0.0001) * distance,
                cy: 250 + Math.sin(angle + Date.now() * 0.0001) * distance,
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                cx: { duration: 20 + i * 2, repeat: Infinity, ease: "linear" },
                cy: { duration: 20 + i * 2, repeat: Infinity, ease: "linear" },
                opacity: {
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          )
        })}

        {/* Center core pulse */}
        <motion.circle
          cx={300}
          cy={250}
          r={4}
          fill="#ffffff"
          animate={{
            r: [4, 6, 4],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Text overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm font-semibold text-white/80 backdrop-blur-sm">
            L'Orbe Adaptatif
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Intelligent • Fluide • Réactif
          </div>
        </motion.div>
      </div>

      {/* Bottom info card */}
      <motion.div
        className="absolute bottom-6 left-6 rounded-lg border border-slate-700/50 bg-slate-950/80 px-4 py-2 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="h-2 w-2 rounded-full bg-emerald-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-xs text-slate-400">
            {isHovered ? "En interaction" : "Mode adaptatif"}
          </span>
        </div>
      </motion.div>

      {/* Breathing indicator */}
      <motion.div
        className="absolute right-6 top-6 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-[10px] text-slate-500">IA Générative</div>
        <motion.div
          className="mt-1 flex justify-end gap-1"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-1 rounded-full bg-blue-400"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
