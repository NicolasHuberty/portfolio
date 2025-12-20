"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface PathLine {
  id: number
  angle: number
  length: number
  opacity: number
  isOptimal: boolean
}

export default function FuturePlotterAnimation() {
  const [phase, setPhase] = useState<"fog" | "scanning" | "clear">("fog")
  const [scanProgress, setScanProgress] = useState(0)
  const [lines, setLines] = useState<PathLine[]>([])

  // Generate hundreds of possible future paths
  useEffect(() => {
    const pathCount = 200
    const generatedLines: PathLine[] = Array.from({ length: pathCount }, (_, i) => ({
      id: i,
      angle: (Math.random() - 0.5) * 60, // Spread between -30 and +30 degrees
      length: 50 + Math.random() * 150,
      opacity: 0.1 + Math.random() * 0.2,
      isOptimal: i === Math.floor(pathCount / 2), // One optimal path in the middle
    }))
    setLines(generatedLines)
  }, [])

  // Animation cycle
  useEffect(() => {
    const cycle = async () => {
      // Phase 1: Fog (2s)
      setPhase("fog")
      setScanProgress(0)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Phase 2: Scanning (2s)
      setPhase("scanning")
      const scanDuration = 2000
      const scanSteps = 60
      for (let i = 0; i <= scanSteps; i++) {
        setScanProgress(i / scanSteps)
        await new Promise((resolve) => setTimeout(resolve, scanDuration / scanSteps))
      }

      // Phase 3: Clear path (3s)
      setPhase("clear")
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Loop
      cycle()
    }

    cycle()
  }, [])

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />

      {/* Phase labels */}
      <motion.div
        className="absolute left-6 top-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="rounded-lg border border-slate-700/50 bg-slate-950/80 px-4 py-2 backdrop-blur-sm">
          <div className="text-xs text-slate-500">Phase</div>
          <div className="text-sm font-semibold text-slate-300">
            {phase === "fog" && "Incertitude • Données Multiples"}
            {phase === "scanning" && "Analyse Prédictive • Modélisation"}
            {phase === "clear" && "Stratégie Claire • Décision Optimale"}
          </div>
        </div>
      </motion.div>

      {/* Main visualization */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Starting point */}
        <motion.circle
          cx="100"
          cy="250"
          r="8"
          fill="url(#startGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Pulse effect on starting point */}
        <motion.circle
          cx="100"
          cy="250"
          r="8"
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
          animate={{
            r: [8, 20, 8],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* All possible paths (fog) */}
        {lines.map((line, i) => {
          const startX = 100
          const startY = 250
          const endX = startX + Math.cos((line.angle * Math.PI) / 180) * line.length * 3
          const endY = startY + Math.sin((line.angle * Math.PI) / 180) * line.length

          // Calculate if this line is being scanned
          const lineProgress = i / lines.length
          const isScanned = phase === "scanning" && scanProgress >= lineProgress

          return (
            <motion.line
              key={line.id}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: phase === "fog" || phase === "scanning" ? 1 : line.isOptimal ? 1 : 0,
                opacity:
                  phase === "clear" && !line.isOptimal
                    ? 0
                    : phase === "clear" && line.isOptimal
                    ? 1
                    : isScanned
                    ? 0.4
                    : line.opacity,
                strokeWidth: phase === "clear" && line.isOptimal ? 3 : 1,
              }}
              stroke={
                phase === "clear" && line.isOptimal
                  ? "url(#optimalGradient)"
                  : isScanned
                  ? "rgba(139, 92, 246, 0.4)"
                  : "rgba(148, 163, 184, 0.2)"
              }
              strokeLinecap="round"
              transition={{
                pathLength: { duration: 0.8, delay: i * 0.003 },
                opacity: { duration: phase === "clear" ? 0.5 : 0.3 },
                strokeWidth: { duration: 0.3 },
              }}
            />
          )
        })}

        {/* Scanning beam */}
        {phase === "scanning" && (
          <motion.g>
            {/* Beam core */}
            <motion.line
              x1="100"
              y1="250"
              x2={100 + scanProgress * 600}
              y2={250}
              stroke="url(#beamGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            {/* Beam glow */}
            <motion.line
              x1="100"
              y1="250"
              x2={100 + scanProgress * 600}
              y2={250}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="blur(8px)"
            />
            {/* Scanning head */}
            <motion.circle
              cx={100 + scanProgress * 600}
              cy={250}
              r="6"
              fill="#3b82f6"
              filter="url(#glow)"
            />
          </motion.g>
        )}

        {/* Optimal path endpoint indicator */}
        {phase === "clear" && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <circle
              cx={100 + Math.cos((0 * Math.PI) / 180) * 150 * 3}
              cy={250 + Math.sin((0 * Math.PI) / 180) * 150}
              r="10"
              fill="url(#endGradient)"
            />
            <motion.circle
              cx={100 + Math.cos((0 * Math.PI) / 180) * 150 * 3}
              cy={250 + Math.sin((0 * Math.PI) / 180) * 150}
              r="10"
              fill="none"
              stroke="rgba(16, 185, 129, 0.5)"
              strokeWidth="2"
              animate={{
                r: [10, 25, 10],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        )}

        {/* Gradients and filters */}
        <defs>
          <linearGradient id="startGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="optimalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="endGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Bottom legend */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-4">
        <motion.div
          className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-950/80 px-3 py-1.5 backdrop-blur-sm"
          animate={{ opacity: phase === "clear" ? 1 : 0.5 }}
        >
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
          <span className="text-xs text-slate-400">Optimal Path</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-950/80 px-3 py-1.5 backdrop-blur-sm"
          animate={{ opacity: phase === "fog" || phase === "scanning" ? 1 : 0.3 }}
        >
          <div className="h-1 w-8 rounded-full bg-slate-500/30" />
          <span className="text-xs text-slate-400">Possibilities</span>
        </motion.div>
      </div>
    </div>
  )
}
