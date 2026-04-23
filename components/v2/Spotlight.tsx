"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Search } from "lucide-react"
import { search } from "@/lib/v2/fs"
import { projects } from "@/lib/v2/data/projects"
import { profile } from "@/lib/v2/data/profile"
import { useWM, type AppId } from "@/lib/v2/wm"

type Result = {
  label: string
  hint: string
  onPick: () => void
}

type Props = { open: boolean; onClose: () => void }

export default function Spotlight({ open, onClose }: Props) {
  const [q, setQ] = useState("")
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { launch } = useWM()

  useEffect(() => {
    if (open) {
      setQ("")
      setIdx(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  const results = useMemo<Result[]>(() => {
    if (!q.trim()) {
      const apps: Result[] = (
        ["finder", "terminal", "readme", "mail", "book"] as AppId[]
      ).map(a => ({
        label: `Open ${a}`,
        hint: "app",
        onPick: () => launch(a),
      }))
      return apps
    }
    const needle = q.toLowerCase()
    const out: Result[] = []

    // --- easter eggs -----------------------------------------------------
    const egg = (label: string, fn: () => void): Result => ({
      label,
      hint: "secret",
      onPick: fn,
    })
    if (["42", "answer", "meaning of life"].some(k => k === needle)) {
      out.push(
        egg("The answer is 42", () => {
          launch("terminal")
        }),
      )
    }
    if (["matrix", "neo", "wake up"].some(k => needle.includes(k))) {
      out.push(
        egg("Wake up, Neo…", () =>
          window.dispatchEvent(new CustomEvent("huberty:matrix")),
        ),
      )
    }
    if (["party", "dance", "confetti"].some(k => needle.includes(k))) {
      out.push(
        egg("🎉 party mode", () =>
          window.dispatchEvent(new CustomEvent("huberty:party")),
        ),
      )
    }
    if (["hire", "hire me", "job", "freelance"].some(k => needle.includes(k))) {
      out.push(
        egg("sudo hire-me →", () =>
          launch("mail", { subject: "Project for Nicolas" }),
        ),
      )
    }
    if (["coffee", "☕"].some(k => needle.includes(k))) {
      out.push(
        egg("☕ order coffee (local pickup)", () =>
          launch("mail", { subject: "Coffee in Brussels" }),
        ),
      )
    }
    if (["easter", "egg", "secret", "hidden"].some(k => needle.includes(k))) {
      out.push(
        egg("The easter egg index", () =>
          window.dispatchEvent(new CustomEvent("huberty:eggs")),
        ),
      )
    }
    if (needle === "konami") {
      out.push(
        egg("↑ ↑ ↓ ↓ ← → ← → B A", () =>
          window.dispatchEvent(new CustomEvent("huberty:matrix")),
        ),
      )
    }

    // apps matching
    const apps: AppId[] = ["finder", "terminal", "readme", "mail", "book"]
    for (const a of apps) {
      if (a.includes(needle))
        out.push({
          label: `Open ${a}`,
          hint: "app",
          onPick: () => launch(a),
        })
    }

    // projects
    for (const p of projects) {
      const hay = (
        p.name +
        " " +
        p.tagline +
        " " +
        p.tags.join(" ") +
        " " +
        p.stack.join(" ")
      ).toLowerCase()
      if (hay.includes(needle)) {
        out.push({
          label: `${p.name} — ${p.tagline}`,
          hint: "project",
          onPick: () =>
            launch(
              "readme",
              { path: `/home/nicolas/work/${p.id}/case-study.md` },
              `/home/nicolas/work/${p.id}/case-study.md`,
            ),
        })
      }
    }

    // stack items
    for (const [group, items] of Object.entries(profile.stack)) {
      for (const it of items) {
        if (it.toLowerCase().includes(needle)) {
          out.push({
            label: `${it} — in ${group} stack`,
            hint: "stack",
            onPick: () =>
              launch(
                "readme",
                { path: "/home/nicolas/stack.txt" },
                "stack.txt",
              ),
          })
        }
      }
    }

    // filesystem path + content search
    const fsHits = search(q).slice(0, 10)
    for (const hit of fsHits) {
      const n = hit.node
      if (n.kind === "file") {
        out.push({
          label: hit.path,
          hint: "file",
          onPick: () => launch("readme", { path: hit.path }, hit.path),
        })
      } else if (n.kind === "dir") {
        out.push({
          label: hit.path,
          hint: "folder",
          onPick: () => launch("finder", { path: hit.path }, hit.path),
        })
      } else if (n.kind === "link") {
        out.push({
          label: `${hit.path} → ${n.href}`,
          hint: "link",
          onPick: () => window.open(n.href, "_blank", "noopener,noreferrer"),
        })
      }
    }

    return out.slice(0, 12)
  }, [q, launch])

  useEffect(() => {
    setIdx(0)
  }, [q])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={onClose}
    >
      <div
        className="w-[520px] max-w-[92vw] overflow-hidden rounded-[10px] border"
        style={{
          background: "var(--os-bg-window)",
          color: "var(--os-ink)",
          borderColor: "var(--os-ink)",
          boxShadow: "8px 8px 0 var(--os-ink)",
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => {
          if (e.key === "Escape") onClose()
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setIdx(i => Math.min(results.length - 1, i + 1))
          }
          if (e.key === "ArrowUp") {
            e.preventDefault()
            setIdx(i => Math.max(0, i - 1))
          }
          if (e.key === "Enter") {
            results[idx]?.onPick()
            onClose()
          }
        }}
      >
        <div
          className="flex items-center gap-3 border-b px-4 py-3"
          style={{ borderColor: "var(--os-ink-faint)" }}
        >
          <Search className="h-4 w-4 opacity-60" />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="search apps, files, projects, stack…"
            className="flex-1 bg-transparent text-[15px] outline-none"
            style={{ fontFamily: "var(--os-ui)" }}
          />
          <span
            className="text-[10px] opacity-60"
            style={{ fontFamily: "var(--os-mono)" }}
          >
            ⌘K
          </span>
        </div>
        <div className="max-h-[60vh] overflow-auto">
          {results.length === 0 ? (
            <div className="p-4 text-sm opacity-60">no matches</div>
          ) : (
            results.map((r, i) => (
              <button
                key={i}
                onClick={() => {
                  r.onPick()
                  onClose()
                }}
                onMouseEnter={() => setIdx(i)}
                className="flex w-full items-center justify-between gap-4 px-4 py-2 text-left"
                style={{
                  background: i === idx ? "var(--os-accent)" : "transparent",
                  color: i === idx ? "#fff" : "var(--os-ink)",
                }}
              >
                <span className="truncate text-[13px]">{r.label}</span>
                <span
                  className="text-[10px] uppercase tracking-wider opacity-70"
                  style={{ fontFamily: "var(--os-mono)" }}
                >
                  {r.hint}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
