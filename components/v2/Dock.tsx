"use client"

import { BookOpen, Calendar, Folder, Mail, TerminalSquare } from "lucide-react"
import { useWM, type AppId } from "@/lib/v2/wm"

type DockApp = {
  appId: AppId
  label: string
  icon: React.ReactNode
  color: string
  props?: Record<string, unknown>
}

const apps: DockApp[] = [
  {
    appId: "finder",
    label: "Finder",
    icon: <Folder className="h-6 w-6" />,
    color: "#ff5c8a",
    props: { path: "/home/nicolas" },
  },
  {
    appId: "terminal",
    label: "Terminal",
    icon: <TerminalSquare className="h-6 w-6" />,
    color: "#1a1a1a",
  },
  {
    appId: "readme",
    label: "Readme",
    icon: <BookOpen className="h-6 w-6" />,
    color: "#8ab2ff",
    props: { path: "/home/nicolas/about.md" },
  },
  {
    appId: "mail",
    label: "Mail",
    icon: <Mail className="h-6 w-6" />,
    color: "#f0c03f",
  },
  {
    appId: "book",
    label: "Book a call",
    icon: <Calendar className="h-6 w-6" />,
    color: "#2dd86f",
  },
]

export default function Dock() {
  const { state, launch, focus } = useWM()
  const openByApp = new Map<string, string>()
  for (const w of state.wins) {
    if (!openByApp.has(w.appId)) openByApp.set(w.appId, w.id)
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div
        className="flex items-end gap-2 rounded-[16px] border px-[14px] py-[10px] backdrop-blur-md"
        style={{
          background: "color-mix(in srgb, var(--os-ink) 88%, transparent)",
          borderColor: "color-mix(in srgb, var(--os-ink) 95%, transparent)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        {apps.map(a => {
          const openId = openByApp.get(a.appId)
          return (
            <button
              key={a.appId}
              onClick={() => {
                if (openId) focus(openId)
                else launch(a.appId, a.props)
              }}
              aria-label={a.label}
              className="group relative flex flex-col items-center"
            >
              <div
                className="flex h-[44px] w-[44px] items-center justify-center rounded-[10px] text-white transition-transform group-hover:scale-[1.12]"
                style={{ background: a.color }}
              >
                {a.icon}
              </div>
              {openId && (
                <div
                  className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                  style={{ background: "var(--os-bg-window)" }}
                />
              )}
              <span
                className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: "var(--os-ink)",
                  color: "var(--os-bg-window)",
                  fontFamily: "var(--os-mono)",
                }}
              >
                {a.label}
              </span>
            </button>
          )
        })}

        {/* Minimised windows */}
        {state.wins
          .filter(w => w.state === "minimised")
          .map(w => (
            <button
              key={w.id}
              onClick={() => focus(w.id)}
              className="flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border border-white/20 text-white"
              style={{ background: "var(--os-ink-muted)" }}
              aria-label={`Restore ${w.title}`}
              title={w.title}
            >
              <div className="h-3 w-3 rounded-full bg-white/60" />
            </button>
          ))}
      </div>
    </div>
  )
}
