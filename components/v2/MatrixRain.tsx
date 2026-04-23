"use client"

import { useEffect, useRef } from "react"

const CHARS =
  "アイウエオカキクケコサシスセソ0123456789ABCDEF{}<>/\\=+-*!?#$%&ラムリルレロ"

export default function MatrixRain({
  onDone,
  duration = 7000,
}: {
  onDone?: () => void
  duration?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    const fontSize = 16
    const cols = Math.floor(window.innerWidth / fontSize)
    const drops = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * -100),
    )

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillStyle = drops[i] < 2 ? "#bfffd0" : "#2dd86f"
        ctx.fillText(ch, x, y)
        if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick)
      } else {
        onDone?.()
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [duration, onDone])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[70]"
      style={{ background: "rgba(0,0,0,0.85)" }}
    />
  )
}
