"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Neuron {
  x: number
  y: number
  layer: number
  activation: number
  id: string
}

interface Connection {
  from: Neuron
  to: Neuron
  active: boolean
  flow: number
}

export default function NeuralNetworkVisualization() {
  const [neurons, setNeurons] = useState<Neuron[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [activeWave, setActiveWave] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const LAYERS = 16 // Réduit de 36 à 16 pour optimisation
  const NEURONS_PER_LAYER = 6 // Réduit de 12 à 6 pour optimisation
  const WIDTH = 600
  const HEIGHT = 500

  useEffect(() => {
    // Generate neurons
    const newNeurons: Neuron[] = []
    for (let layer = 0; layer < LAYERS; layer++) {
      const neuronsInLayer = layer === 0 || layer === LAYERS - 1 ? 6 : NEURONS_PER_LAYER
      for (let i = 0; i < neuronsInLayer; i++) {
        const x = (layer / (LAYERS - 1)) * WIDTH
        const ySpread = layer === 0 || layer === LAYERS - 1 ? 200 : 400
        const yOffset = (HEIGHT - ySpread) / 2
        const y = yOffset + (i / (neuronsInLayer - 1)) * ySpread

        newNeurons.push({
          x,
          y,
          layer,
          activation: Math.random(),
          id: `${layer}-${i}`,
        })
      }
    }

    // Generate connections between adjacent layers
    const newConnections: Connection[] = []
    for (let layer = 0; layer < LAYERS - 1; layer++) {
      const currentLayerNeurons = newNeurons.filter((n) => n.layer === layer)
      const nextLayerNeurons = newNeurons.filter((n) => n.layer === layer + 1)

      currentLayerNeurons.forEach((from) => {
        // Chaque neurone se connecte à 2 neurones (réduit de 4 à 2)
        const connectionCount = Math.min(2, nextLayerNeurons.length)
        const indices = Array.from(
          { length: connectionCount },
          () => Math.floor(Math.random() * nextLayerNeurons.length)
        )

        indices.forEach((idx) => {
          const to = nextLayerNeurons[idx]
          if (to) {
            newConnections.push({
              from,
              to,
              active: Math.random() > 0.7,
              flow: 0,
            })
          }
        })
      })
    }

    setNeurons(newNeurons)
    setConnections(newConnections)
  }, [])

  // Animation de propagation d'onde
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWave((prev) => (prev + 1) % LAYERS)

      // Active les neurones de la couche actuelle
      setNeurons((prev) =>
        prev.map((neuron) => ({
          ...neuron,
          activation:
            neuron.layer === activeWave
              ? 1
              : Math.max(0, neuron.activation - 0.05),
        }))
      )

      // Active les connexions
      setConnections((prev) =>
        prev.map((conn) => ({
          ...conn,
          active: conn.from.layer === activeWave,
          flow: conn.from.layer === activeWave ? 1 : Math.max(0, conn.flow - 0.1),
        }))
      )
    }, 100)

    return () => clearInterval(interval)
  }, [activeWave, LAYERS])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('neural-net')?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      id="neural-net"
      className="relative h-[500px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Brume de fond */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-emerald-900/10" />

      {/* Effet de brouillard lumineux */}
      <motion.div
        className="absolute h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"
        animate={{
          x: [100, 500, 100],
          y: [100, 400, 100],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl"
        animate={{
          x: [500, 100, 500],
          y: [400, 100, 400],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <svg className="h-full w-full" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <defs>
          {/* Gradient pour les connexions */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
          </linearGradient>

          {/* Gradient pour connexions actives */}
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(251, 146, 60)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="rgb(234, 179, 8)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.8" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for active neurons */}
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render connections */}
        {connections.map((conn, i) => {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - conn.from.x, 2) +
            Math.pow(mousePosition.y - conn.from.y, 2)
          )
          const isNearMouse = distance < 100

          return (
            <g key={`conn-${i}`}>
              {/* Base connection line */}
              <motion.line
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke={conn.active || conn.flow > 0.5 ? "url(#activeGradient)" : "url(#connectionGradient)"}
                strokeWidth={conn.active || conn.flow > 0.5 ? 2 : 1}
                opacity={isNearMouse ? 0.8 : 0.3}
                filter={conn.active ? "url(#glow)" : undefined}
              />

              {/* Flux de données animé */}
              {conn.flow > 0.3 && (
                <motion.circle
                  r="2"
                  fill="rgb(251, 146, 60)"
                  filter="url(#strongGlow)"
                  initial={{
                    cx: conn.from.x,
                    cy: conn.from.y,
                    opacity: 0,
                  }}
                  animate={{
                    cx: conn.to.x,
                    cy: conn.to.y,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              )}
            </g>
          )
        })}

        {/* Render neurons */}
        {neurons.map((neuron) => {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - neuron.x, 2) +
            Math.pow(mousePosition.y - neuron.y, 2)
          )
          const isNearMouse = distance < 80
          const isActive = neuron.activation > 0.5

          // Couleur basée sur l'activation
          const getColor = () => {
            if (isActive) {
              return "rgb(251, 146, 60)" // Orange pour activation
            } else if (neuron.activation > 0.3) {
              return "rgb(234, 179, 8)" // Jaune
            } else {
              return "rgb(59, 130, 246)" // Bleu base
            }
          }

          return (
            <g key={neuron.id}>
              {/* Glow externe */}
              <motion.circle
                cx={neuron.x}
                cy={neuron.y}
                r={isActive ? 8 : 6}
                fill={getColor()}
                opacity={neuron.activation * 0.2}
                animate={{
                  scale: isActive ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />

              {/* Neurone principal */}
              <motion.circle
                cx={neuron.x}
                cy={neuron.y}
                r={isNearMouse ? 4 : 3}
                fill={getColor()}
                opacity={0.7 + neuron.activation * 0.3}
                filter={isActive ? "url(#strongGlow)" : "url(#glow)"}
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              />

              {/* Core brillant */}
              <circle
                cx={neuron.x}
                cy={neuron.y}
                r={1.5}
                fill="white"
                opacity={isActive ? 0.9 : 0.4}
              />
            </g>
          )
        })}

        {/* Particules ambiantes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            r="1"
            fill="rgb(139, 92, 246)"
            opacity="0.4"
            filter="url(#glow)"
            animate={{
              cx: [
                Math.random() * WIDTH,
                Math.random() * WIDTH,
                Math.random() * WIDTH,
              ],
              cy: [
                Math.random() * HEIGHT,
                Math.random() * HEIGHT,
                Math.random() * HEIGHT,
              ],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </svg>

      {/* Labels informatifs */}
      <div className="absolute bottom-6 left-6 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="h-2 w-2 rounded-full bg-blue-400" />
          <span>Input Layer</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="h-2 w-2 rounded-full bg-orange-400" />
          <span>Active Processing</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Output Layer</span>
        </div>
      </div>

      {/* Info technique */}
      <div className="absolute right-6 top-6 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 backdrop-blur-sm">
        <div className="text-xs font-semibold text-blue-400">Deep Learning Model</div>
        <div className="mt-1 text-xs text-slate-400">
          Transformer Architecture
        </div>
        <div className="mt-1 text-xs text-emerald-400">Active</div>
      </div>
    </motion.div>
  )
}
