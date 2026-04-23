"use client"

import { AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import MenuBar from "./MenuBar"
import Dock from "./Dock"
import Spotlight from "./Spotlight"
import Window from "./Window"
import MatrixRain from "./MatrixRain"
import FinderApp from "./apps/Finder"
import TerminalApp from "./apps/Terminal"
import ReadmeApp from "./apps/Readme"
import MailApp from "./apps/Mail"
import BookApp from "./apps/Book"
import { useWM, type Win } from "@/lib/v2/wm"

const WELCOME_KEY = "huberty.os:welcome-seen"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

const EASTER_EGG_MD = `# easter-eggs.md — you found them

Or at least the ones I'm telling you about. Keep poking.

## Desktop
- **Konami code** — ↑↑↓↓←→←→BA → wake up, neo.
- **Click the wallpaper signature** — you're reading it.
- **Click the menu-bar bullet 7 times** — party mode.

## Terminal
There are **70+** secret commands. A small sampler:

- \`matrix\` · \`konami\` · \`hack\`
- \`vim\` · \`emacs\` · \`nano\`
- \`git blame\` · \`git push --force\`
- \`make coffee\` · \`make love\` · \`make money\`
- \`rm -rf /\` (spoiler: lies)
- \`cowsay hello\` · \`banner HUBERTY\` · \`sl\` · \`lolcat rainbow\`
- \`42\` · \`xyzzy\` · \`mornington\`
- \`docker\` · \`kubectl\` · \`npm install\`
- \`gpt\` · \`claude\` · \`agi\` · \`hallucinate\`
- \`tokens <text>\` · \`embed <text>\` · \`temperature 0.7\`
- \`blockchain\` · \`nft\` · \`metaverse\` · \`web3\`
- \`fortune\` · \`joke\` · \`advice\`
- \`waffle\` · \`beer\` · \`brussels\`
- \`sudo hire-me\` · \`sudo !!\`

Yes, there are more. That's the point.

---

> "The best easter egg is the one you rebuild from scratch on a Sunday."
> — someone who clearly had nothing else to do
`

function renderApp(win: Win) {
  switch (win.appId) {
    case "finder":
      return <FinderApp win={win} />
    case "terminal":
      return <TerminalApp win={win} />
    case "readme":
      return <ReadmeApp win={win} />
    case "mail":
      return <MailApp win={win} />
    case "book":
      return <BookApp win={win} />
    default:
      return null
  }
}

export default function Desktop() {
  const { state, launch, close, minimise, move } = useWM()
  const [spotlight, setSpotlight] = useState(false)
  const [matrix, setMatrix] = useState(false)
  const [party, setParty] = useState(false)
  const [sigClicks, setSigClicks] = useState(0)
  const [bulletClicks, setBulletClicks] = useState(0)
  const konamiBuf = useRef<string[]>([])

  const openEasterEggs = useCallback(() => {
    // Inject the doc into the readme window directly via a transient in-memory mount.
    // Readme reads from fs.resolve; we mount it via `sessionStorage`.
    try {
      sessionStorage.setItem("huberty.os:readme:/easter-eggs.md", EASTER_EGG_MD)
    } catch {
      // ignore
    }
    launch("readme", { path: "/easter-eggs.md" }, "easter-eggs.md")
  }, [launch])

  // Welcome
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const seen = localStorage.getItem(WELCOME_KEY)
      if (!seen) {
        setTimeout(() => {
          launch("readme", { path: "/home/nicolas/welcome.md" }, "welcome.md")
          localStorage.setItem(WELCOME_KEY, "1")
        }, 300)
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Global custom events (from Terminal)
  useEffect(() => {
    const onMatrix = () => setMatrix(true)
    const onParty = () => {
      setParty(true)
      setTimeout(() => setParty(false), 3200)
    }
    const onEggs = () => openEasterEggs()
    window.addEventListener("huberty:matrix", onMatrix)
    window.addEventListener("huberty:party", onParty)
    window.addEventListener("huberty:eggs", onEggs)
    return () => {
      window.removeEventListener("huberty:matrix", onMatrix)
      window.removeEventListener("huberty:party", onParty)
      window.removeEventListener("huberty:eggs", onEggs)
    }
  }, [openEasterEggs])

  // Keyboard shortcuts + konami
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey

      // Konami — track any keys, ignore when inside editable fields to avoid interfering
      const inField =
        e.target instanceof HTMLElement &&
        (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
      if (!inField) {
        konamiBuf.current = [...konamiBuf.current, e.key].slice(-KONAMI.length)
        if (konamiBuf.current.length === KONAMI.length) {
          const ok = konamiBuf.current.every(
            (k, i) =>
              k === KONAMI[i] || k.toLowerCase() === KONAMI[i].toLowerCase(),
          )
          if (ok) {
            konamiBuf.current = []
            setMatrix(true)
          }
        }
      }

      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSpotlight(v => !v)
        return
      }
      if (e.key === "Escape") {
        if (spotlight) {
          setSpotlight(false)
          return
        }
        const focused = state.wins.find(w => w.id === state.focusedId)
        if (focused && focused.appId !== "terminal") {
          close(focused.id)
        }
      }
      if (meta && e.key.toLowerCase() === "w") {
        e.preventDefault()
        if (state.focusedId) close(state.focusedId)
      }
      if (meta && e.key.toLowerCase() === "m") {
        e.preventDefault()
        if (state.focusedId) minimise(state.focusedId)
      }
      if (meta && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault()
        launch("finder", { path: "/home/nicolas" })
      }
      if (meta && e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault()
        launch("terminal")
      }
      if (
        state.focusedId &&
        !meta &&
        !inField &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault()
        const w = state.wins.find(ww => ww.id === state.focusedId)
        if (!w) return
        const delta = 10
        const nx =
          e.key === "ArrowLeft"
            ? w.x - delta
            : e.key === "ArrowRight"
              ? w.x + delta
              : w.x
        const ny =
          e.key === "ArrowUp"
            ? w.y - delta
            : e.key === "ArrowDown"
              ? w.y + delta
              : w.y
        move(w.id, nx, ny)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [spotlight, state.focusedId, state.wins, close, minimise, launch, move])

  const handleSigClick = () => {
    const next = sigClicks + 1
    setSigClicks(next)
    if (next >= 3) {
      setSigClicks(0)
      openEasterEggs()
    }
  }

  // Menu-bar bullet click handler (via global event from MenuBar)
  useEffect(() => {
    const onBullet = () => {
      const next = bulletClicks + 1
      setBulletClicks(next)
      if (next >= 7) {
        setBulletClicks(0)
        setParty(true)
        setTimeout(() => setParty(false), 3200)
      }
    }
    window.addEventListener("huberty:bullet", onBullet)
    return () => window.removeEventListener("huberty:bullet", onBullet)
  }, [bulletClicks])

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${party ? "os-party" : ""}`}
      style={{
        background: "var(--os-bg)",
        color: "var(--os-ink)",
        backgroundImage:
          "radial-gradient(circle, color-mix(in srgb, var(--os-ink) 6%, transparent) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Wallpaper signature — clickable */}
      <button
        onClick={handleSigClick}
        aria-label="Signature"
        className="absolute bottom-28 left-10 cursor-pointer select-none italic"
        style={{
          fontFamily: "var(--os-display)",
          fontSize: "min(140px, 18vw)",
          color: "var(--os-ink)",
          opacity: 0.04,
          lineHeight: 1,
          border: "none",
          background: "transparent",
          textAlign: "left",
          padding: 0,
        }}
      >
        nicolas
        <br />
        huberty
      </button>

      <MenuBar />

      <AnimatePresence>
        {state.wins.map(w => (
          <Window key={w.id} win={w} focused={state.focusedId === w.id}>
            {renderApp(w)}
          </Window>
        ))}
      </AnimatePresence>

      <Dock />

      <Spotlight open={spotlight} onClose={() => setSpotlight(false)} />

      {matrix && <MatrixRain onDone={() => setMatrix(false)} duration={7000} />}

      {/* Keyboard hint bottom-left */}
      <div
        className="pointer-events-none fixed bottom-4 left-4 text-[11px] opacity-60"
        style={{ fontFamily: "var(--os-mono)" }}
      >
        ⌘K · spotlight · ⌘⌥T · terminal
      </div>
    </div>
  )
}
