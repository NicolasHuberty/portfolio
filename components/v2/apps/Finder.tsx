"use client"

import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  File as FileIcon,
  Folder,
  Globe,
  Rocket,
  Search,
} from "lucide-react"
import { useMemo, useState } from "react"
import { FSNode, ls, normalize, resolve } from "@/lib/v2/fs"
import { useWM, type Win } from "@/lib/v2/wm"

const FAVOURITES: { label: string; path: string }[] = [
  { label: "Home", path: "/home/nicolas" },
  { label: "Work", path: "/home/nicolas/work" },
  { label: "Experience", path: "/home/nicolas/experience" },
  { label: "Writing", path: "/home/nicolas/writing" },
  { label: "Apps", path: "/apps" },
]

function iconFor(node: FSNode) {
  switch (node.kind) {
    case "dir":
      return (
        <Folder
          className="h-4 w-4"
          style={{ color: node.color || "var(--os-accent)" }}
        />
      )
    case "file":
      return <FileIcon className="h-4 w-4 opacity-70" />
    case "app":
      return <Rocket className="h-4 w-4" style={{ color: node.color }} />
    case "link":
      return <Globe className="h-4 w-4 opacity-70" />
  }
}

export default function FinderApp({ win }: { win: Win }) {
  const initialPath = (win.props?.path as string) || "/home/nicolas"
  const [cwd, setCwd] = useState(initialPath)
  const [history, setHistory] = useState<string[]>([initialPath])
  const [hi, setHi] = useState(0)
  const [view, setView] = useState<"grid" | "list">("list")
  const [q, setQ] = useState("")
  const { launch } = useWM()

  const filtered = useMemo(() => {
    const children = ls(cwd) ?? []
    if (!q.trim()) return children
    const needle = q.toLowerCase()
    return children.filter(c => {
      if (c.name.toLowerCase().includes(needle)) return true
      if (c.kind === "file" && c.content.toLowerCase().includes(needle))
        return true
      return false
    })
  }, [cwd, q])

  const navigate = (path: string) => {
    const next = normalize(cwd, path)
    const node = resolve(next)
    if (!node || node.kind !== "dir") return
    const h = history.slice(0, hi + 1)
    h.push(next)
    setHistory(h)
    setHi(h.length - 1)
    setCwd(next)
  }

  const back = () => {
    if (hi > 0) {
      setHi(hi - 1)
      setCwd(history[hi - 1])
    }
  }
  const forward = () => {
    if (hi < history.length - 1) {
      setHi(hi + 1)
      setCwd(history[hi + 1])
    }
  }

  const onOpen = (node: FSNode) => {
    if (node.kind === "dir") {
      navigate(cwd === "/" ? "/" + node.name : cwd + "/" + node.name)
    } else if (node.kind === "file") {
      const path = cwd === "/" ? "/" + node.name : cwd + "/" + node.name
      launch("readme", { path }, path)
    } else if (node.kind === "link") {
      window.open(node.href, "_blank", "noopener,noreferrer")
    } else if (node.kind === "app") {
      launch(node.appId as "finder" | "terminal" | "readme" | "mail" | "book")
    }
  }

  const segs = cwd.split("/").filter(Boolean)

  return (
    <div
      className="flex h-full flex-col"
      style={{ fontFamily: "var(--os-ui)" }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{ borderColor: "var(--os-ink-faint)" }}
      >
        <button
          onClick={back}
          disabled={hi === 0}
          className="rounded p-1 hover:bg-black/5 disabled:opacity-30"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={forward}
          disabled={hi >= history.length - 1}
          className="rounded p-1 hover:bg-black/5 disabled:opacity-30"
          aria-label="Forward"
        >
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Breadcrumbs */}
        <div
          className="flex flex-1 items-center overflow-hidden text-[12px]"
          style={{ fontFamily: "var(--os-mono)" }}
        >
          <button
            onClick={() => {
              setCwd("/")
              setHistory(h => [...h.slice(0, hi + 1), "/"])
              setHi(v => v + 1)
            }}
            className="hover:underline"
          >
            /
          </button>
          {segs.map((s, i) => {
            const path = "/" + segs.slice(0, i + 1).join("/")
            return (
              <span key={i} className="flex items-center">
                <ChevronRight className="h-3 w-3 opacity-60" />
                <button
                  onClick={() => {
                    setCwd(path)
                    setHistory(h => [...h.slice(0, hi + 1), path])
                    setHi(v => v + 1)
                  }}
                  className="hover:underline"
                >
                  {s}
                </button>
              </span>
            )
          })}
        </div>

        <div className="flex items-center gap-1 text-[11px]">
          <button
            onClick={() => setView("list")}
            className={`rounded px-2 py-0.5 ${view === "list" ? "bg-black/10" : "hover:bg-black/5"}`}
          >
            list
          </button>
          <button
            onClick={() => setView("grid")}
            className={`rounded px-2 py-0.5 ${view === "grid" ? "bg-black/10" : "hover:bg-black/5"}`}
          >
            grid
          </button>
        </div>

        <div
          className="flex items-center gap-1.5 rounded border px-2 py-1 text-[12px]"
          style={{ borderColor: "var(--os-ink-faint)" }}
        >
          <Search className="h-3 w-3 opacity-60" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="search"
            className="w-[120px] bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-[180px] flex-shrink-0 overflow-auto border-r py-3 text-[12px]"
          style={{ borderColor: "var(--os-ink-faint)" }}
        >
          <div
            className="mb-1 px-3 text-[10px] uppercase tracking-widest opacity-60"
            style={{ fontFamily: "var(--os-mono)" }}
          >
            Favourites
          </div>
          {FAVOURITES.map(f => (
            <button
              key={f.path}
              onClick={() => {
                const h = history.slice(0, hi + 1)
                h.push(f.path)
                setHistory(h)
                setHi(h.length - 1)
                setCwd(f.path)
              }}
              className="block w-full px-3 py-1.5 text-left hover:bg-black/5"
              style={{
                background:
                  cwd === f.path
                    ? "color-mix(in srgb, var(--os-accent) 14%, transparent)"
                    : undefined,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 overflow-auto p-3">
          {filtered.length === 0 ? (
            <div className="p-4 text-sm opacity-50">empty</div>
          ) : view === "list" ? (
            <div>
              {filtered.map((c, i) => (
                <button
                  key={i}
                  onDoubleClick={() => onOpen(c)}
                  onClick={e => {
                    if (e.detail === 2) return
                  }}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[13px] hover:bg-black/5"
                >
                  {iconFor(c)}
                  <span>{c.name}</span>
                  <span
                    className="ml-auto text-[10px] uppercase opacity-50"
                    style={{ fontFamily: "var(--os-mono)" }}
                  >
                    {c.kind}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3">
              {filtered.map((c, i) => (
                <button
                  key={i}
                  onDoubleClick={() => onOpen(c)}
                  className="flex flex-col items-center gap-1 rounded p-2 hover:bg-black/5"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{
                      background:
                        c.kind === "dir"
                          ? c.color || "var(--os-accent)"
                          : c.kind === "app"
                            ? c.color
                            : "var(--os-ink-faint)",
                      color: "#fff",
                    }}
                  >
                    {c.kind === "dir" ? (
                      <Folder className="h-6 w-6" />
                    ) : c.kind === "app" ? (
                      <Rocket className="h-6 w-6" />
                    ) : c.kind === "link" ? (
                      <Globe className="h-6 w-6" />
                    ) : (
                      <FileIcon className="h-6 w-6" />
                    )}
                  </div>
                  <span className="max-w-[100px] truncate text-[11px]">
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
