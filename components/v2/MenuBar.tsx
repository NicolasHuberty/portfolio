"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "@/lib/v2/theme"
import { useWM } from "@/lib/v2/wm"

export default function MenuBar() {
  const { cleanup } = useWM()
  const { theme, toggle } = useTheme()
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  const timeLabel = now
    ? now.toLocaleDateString("en-GB", {
        weekday: "short",
      }) +
      " " +
      now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 flex h-[28px] items-center px-4 text-[12px] backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--os-ink) 90%, transparent)",
        color: "var(--os-bg-window)",
        fontFamily: "var(--os-mono)",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("huberty:bullet"))
          }}
          className="flex items-center gap-2 opacity-90 hover:opacity-100"
          aria-label="huberty.os"
          title="keep clicking…"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--os-accent)]" />
          huberty.os
        </button>
        <MenuItem
          label="File"
          items={[
            { label: "New Finder", onClick: () => {} },
            { label: "Open Terminal", onClick: () => {} },
          ]}
        />
        <MenuItem
          label="Window"
          items={[{ label: "Cleanup", onClick: cleanup }]}
        />
        <MenuItem
          label="View"
          items={[{ label: `Theme: ${theme}`, onClick: toggle }]}
        />
        <MenuItem
          label="Help"
          items={[
            {
              label: "Easter eggs…",
              onClick: () =>
                window.dispatchEvent(new CustomEvent("huberty:eggs")),
            },
            {
              label: "Back to selector",
              onClick: () => (window.location.href = "/"),
            },
          ]}
        />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4 opacity-80">
        <button
          onClick={toggle}
          className="transition-opacity hover:opacity-100"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☽" : "☀"}
        </button>
        <Link href="/" className="transition-opacity hover:opacity-100">
          exit
        </Link>
        <span>Wi-Fi</span>
        <span>100%</span>
        <span>{timeLabel || "—"}</span>
      </div>
    </div>
  )
}

function MenuItem({
  label,
  items,
}: {
  label: string
  items: { label: string; onClick: () => void }[]
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="opacity-90 hover:opacity-100"
      >
        {label}
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-1 min-w-[160px] rounded-[4px] border py-1"
          style={{
            background: "var(--os-bg-window)",
            color: "var(--os-ink)",
            borderColor: "var(--os-ink)",
            boxShadow: "4px 4px 0 var(--os-ink)",
            fontFamily: "var(--os-mono)",
          }}
        >
          {items.map((it, i) => (
            <button
              key={i}
              className="block w-full px-3 py-1 text-left text-[12px] hover:bg-[var(--os-accent)] hover:text-white"
              onMouseDown={e => {
                e.preventDefault()
                it.onClick()
                setOpen(false)
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
