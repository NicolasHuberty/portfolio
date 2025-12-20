"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
  layer: number
  baseSize: number
}

export default function AITransformationShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  // Track global mouse position
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles with layers
    const particleCount = 400
    const particles: Particle[] = []
    const numLayers = 3

    for (let i = 0; i < particleCount; i++) {
      const layer = Math.floor(Math.random() * numLayers)
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
        layer: layer,
        baseSize: 1.5 + layer * 0.5,
      })
    }
    particlesRef.current = particles

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(2, 6, 23, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const maxDistance = 100
      const mouseInfluence = 150

      // Draw by layers (back to front)
      for (let currentLayer = 0; currentLayer < numLayers; currentLayer++) {
        const layerParticles = particles.filter((p) => p.layer === currentLayer)
        const layerOpacity = 0.3 + (currentLayer / numLayers) * 0.7

        // Update and draw particles for this layer
        layerParticles.forEach((particle, i) => {
          // Mouse interaction with layer-based influence
          const dx = mousePos.x - particle.x
          const dy = mousePos.y - particle.y
          const distToMouse = Math.sqrt(dx * dx + dy * dy)

          const layerInfluence = mouseInfluence * (1 + currentLayer * 0.3)
          if (distToMouse < layerInfluence) {
            const force = (layerInfluence - distToMouse) / layerInfluence
            particle.vx += (dx / distToMouse) * force * 0.15 * (1 + currentLayer * 0.2)
            particle.vy += (dy / distToMouse) * force * 0.15 * (1 + currentLayer * 0.2)
          }

          // Update position
          particle.x += particle.vx
          particle.y += particle.vy

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          // Keep in bounds
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))

          // Damping
          particle.vx *= 0.97
          particle.vy *= 0.97
        })

        // Draw connections for this layer
        layerParticles.forEach((particle, i) => {
          particles.forEach((other, j) => {
            if (i >= j) return

            // Only connect particles in same or adjacent layers
            const layerDiff = Math.abs(particle.layer - other.layer)
            if (layerDiff > 1) return

            const dx = other.x - particle.x
            const dy = other.y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
              const baseOpacity = (1 - distance / maxDistance) * 0.4 * layerOpacity
              const opacity = layerDiff === 0 ? baseOpacity : baseOpacity * 0.3

              // Color based on distance to mouse and layer
              const avgX = (particle.x + other.x) / 2
              const avgY = (particle.y + other.y) / 2
              const dxMouse = mousePos.x - avgX
              const dyMouse = mousePos.y - avgY
              const distToMouseLine = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

              let color = `rgba(${100 - currentLayer * 20}, ${116 - currentLayer * 15}, 139, `
              if (distToMouseLine < mouseInfluence * 1.8) {
                // Near mouse - use gradient colors with layer variation
                const ratio = distToMouseLine / (mouseInfluence * 1.8)
                if (ratio < 0.33) {
                  color = "rgba(59, 130, 246, " // blue
                } else if (ratio < 0.66) {
                  color = "rgba(139, 92, 246, " // purple
                } else {
                  color = "rgba(16, 185, 129, " // emerald
                }
              }

              ctx.strokeStyle = color + opacity + ")"
              ctx.lineWidth = 0.5 + currentLayer * 0.3
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.stroke()
            }
          })
        })

        // Draw particles for this layer
        layerParticles.forEach((particle) => {
          const dxMouse = mousePos.x - particle.x
          const dyMouse = mousePos.y - particle.y
          const distToMouseParticle = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

          // Size and color based on proximity to mouse and layer
          let size = particle.baseSize
          let particleOpacity = 0.5 + layerOpacity * 0.4
          let particleColor = `rgba(${148 + currentLayer * 20}, ${163 + currentLayer * 15}, 184, ${particleOpacity})`

          const layerInfluence = mouseInfluence * (1 + currentLayer * 0.3)
          if (distToMouseParticle < layerInfluence * 1.5) {
            size = particle.baseSize + (1 - distToMouseParticle / (layerInfluence * 1.5)) * 3
            const ratio = distToMouseParticle / (layerInfluence * 1.5)
            if (ratio < 0.33) {
              particleColor = `rgba(59, 130, 246, ${0.8 + layerOpacity * 0.2})`
            } else if (ratio < 0.66) {
              particleColor = `rgba(139, 92, 246, ${0.8 + layerOpacity * 0.2})`
            } else {
              particleColor = `rgba(16, 185, 129, ${0.8 + layerOpacity * 0.2})`
            }
          }

          ctx.fillStyle = particleColor
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
          ctx.fill()

          // Glow effect near mouse
          if (distToMouseParticle < layerInfluence) {
            const glowIntensity = 10 + currentLayer * 5
            ctx.shadowBlur = glowIntensity
            ctx.shadowColor = particleColor
            ctx.fillStyle = particleColor
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos])

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950"
    >
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Overlay text - subtle */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100">
        <div className="text-center">
          <div className="text-sm font-semibold text-slate-400/60">AI Neural Network</div>
          <div className="mt-1 text-xs text-slate-500/40">3 Depth Layers • 400 Nodes</div>
        </div>
      </div>

      {/* Layer indicators */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex gap-2">
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-800/50 bg-slate-950/80 px-2 py-1 backdrop-blur-sm">
          <div className="h-2 w-2 rounded-full bg-slate-600/60" />
          <span className="text-[10px] text-slate-500">Layer 1</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-950/80 px-2 py-1 backdrop-blur-sm">
          <div className="h-2 w-2 rounded-full bg-slate-500/80" />
          <span className="text-[10px] text-slate-400">Layer 2</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-600/50 bg-slate-950/80 px-2 py-1 backdrop-blur-sm">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="text-[10px] text-slate-300">Layer 3</span>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-slate-950/20" />
    </div>
  )
}
