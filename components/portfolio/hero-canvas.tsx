"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

/**
 * Interactive "neural constellation": drifting nodes linked by proximity edges
 * that brighten and bend toward the cursor. Canvas-based, DPR-aware, pauses
 * when the tab is hidden, and renders a single static frame under
 * prefers-reduced-motion.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let raf = 0

    const CONNECT = 132 // px: max distance for node-to-node edges
    const POINTER_R = 190 // px: cursor influence radius
    const pointer = { x: -9999, y: -9999, active: false }

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    function seed() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(
        96,
        Math.max(34, Math.floor((width * height) / 15000)),
      )
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.8,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]

        // node ↔ node edges
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < CONNECT) {
            const o = (1 - dist / CONNECT) * 0.16
            ctx.strokeStyle = `rgba(158,193,245,${o})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        // node ↔ cursor edges
        if (pointer.active) {
          const dx = a.x - pointer.x
          const dy = a.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < POINTER_R) {
            const o = (1 - dist / POINTER_R) * 0.5
            ctx.strokeStyle = `rgba(190,215,255,${o})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.stroke()
          }
        }
      }

      // nodes (glow near cursor)
      for (const a of nodes) {
        let glow = 0
        if (pointer.active) {
          const dist = Math.hypot(a.x - pointer.x, a.y - pointer.y)
          glow = dist < POINTER_R ? 1 - dist / POINTER_R : 0
        }
        const alpha = 0.4 + glow * 0.6
        const r = a.r + glow * 1.6
        ctx.beginPath()
        ctx.arc(a.x, a.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${(178 + glow * 60) | 0},${(205 + glow * 40) | 0},255,${alpha})`
        ctx.fill()
      }
    }

    function step() {
      for (const a of nodes) {
        a.x += a.vx
        a.y += a.vy

        if (a.x < 0 || a.x > width) a.vx *= -1
        if (a.y < 0 || a.y > height) a.vy *= -1
        a.x = Math.max(0, Math.min(width, a.x))
        a.y = Math.max(0, Math.min(height, a.y))

        // gentle attraction toward the cursor
        if (pointer.active) {
          const dx = pointer.x - a.x
          const dy = pointer.y - a.y
          const dist = Math.hypot(dx, dy)
          if (dist < POINTER_R && dist > 0.01) {
            const f = (1 - dist / POINTER_R) * 0.035
            a.vx += (dx / dist) * f
            a.vy += (dy / dist) * f
          }
        }

        // damping + speed clamp so it never runs away
        a.vx *= 0.99
        a.vy *= 0.99
        const sp = Math.hypot(a.vx, a.vy)
        if (sp > 0.5) {
          a.vx = (a.vx / sp) * 0.5
          a.vy = (a.vy / sp) * 0.5
        }
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    seed()
    if (reduce) {
      draw()
    } else {
      raf = requestAnimationFrame(step)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= width &&
        pointer.y >= 0 &&
        pointer.y <= height
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onResize = () => seed()
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(step)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerout", onLeave)
    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerout", onLeave)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
