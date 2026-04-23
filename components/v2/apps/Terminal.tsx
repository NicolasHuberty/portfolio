"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { FSNode, ls, normalize, resolve, search, tree } from "@/lib/v2/fs"
import { renderMarkdownPlain } from "@/lib/v2/md"
import { profile } from "@/lib/v2/data/profile"
import { projects } from "@/lib/v2/data/projects"
import { useTheme } from "@/lib/v2/theme"
import { useWM, type AppId, type Win } from "@/lib/v2/wm"
import {
  ADVICE,
  BANNER,
  COW,
  DRAGON,
  FORTUNES,
  HALLUCINATIONS,
  HEART,
  JOKES,
  SKULL,
  TRAIN,
  pick,
} from "@/lib/v2/jokes"

type Line = { kind: "out" | "in" | "err" | "raw"; text: string }

// Publicly advertised commands (shown in `help`).
const PUBLIC_COMMANDS = [
  "help",
  "whoami",
  "pwd",
  "ls",
  "cd",
  "cat",
  "tree",
  "open",
  "find",
  "projects",
  "stack",
  "contact",
  "book",
  "availability",
  "theme",
  "clear",
  "history",
  "echo",
  "neofetch",
  "sudo",
  "exit",
]

// Hidden commands — not in `help`, revealed by tab-complete only if prefix matches.
const SECRET_COMMANDS = [
  "vim",
  "vi",
  "emacs",
  "nano",
  "code",
  "bash",
  "zsh",
  "fish",
  "sh",
  "ping",
  "curl",
  "wget",
  "ssh",
  "telnet",
  "docker",
  "kubectl",
  "kube",
  "k8s",
  "npm",
  "yarn",
  "bun",
  "pnpm",
  "git",
  "make",
  "fortune",
  "joke",
  "dadjoke",
  "advice",
  "cowsay",
  "banner",
  "sl",
  "yes",
  "lolcat",
  "matrix",
  "hack",
  "leet",
  "1337",
  "konami",
  "rm",
  "chmod",
  "chown",
  "passwd",
  "reboot",
  "shutdown",
  "halt",
  "init",
  "kill",
  "killall",
  "fork",
  "bomb",
  "forkbomb",
  "top",
  "htop",
  "ps",
  "df",
  "du",
  "free",
  "uname",
  "uptime",
  "date",
  "cal",
  "whatismyip",
  "ip",
  "42",
  "answer",
  "hello",
  "hi",
  "sup",
  "python",
  "node",
  "deno",
  "pip",
  "gpt",
  "chatgpt",
  "claude",
  "llm",
  "ai",
  "openai",
  "anthropic",
  "langchain",
  "rag",
  "agi",
  "asi",
  "skynet",
  "hallucinate",
  "hallucination",
  "tokens",
  "tokenize",
  "embed",
  "embedding",
  "temperature",
  "prompt",
  "promptinject",
  "jailbreak",
  "blockchain",
  "web3",
  "nft",
  "metaverse",
  "crypto",
  "quantum",
  "10x",
  "coffee",
  "tea",
  "beer",
  "waffle",
  "brussels",
  "belgium",
  "love",
  "heart",
  "skull",
  "dragon",
  "train",
  "cookie",
  "party",
  "dance",
  "sing",
  "star",
  "wars",
  "trek",
  "sudo!!",
  "aboutme",
  "xyzzy",
  "plugh",
  "mornington",
]

const ALL_COMMANDS = Array.from(
  new Set([...PUBLIC_COMMANDS, ...SECRET_COMMANDS]),
)

function levenshtein(a: string, b: string): number {
  if (!a) return b.length
  if (!b) return a.length
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      )
    }
  }
  return dp[m][n]
}

function suggest(cmd: string): string | null {
  let best: string | null = null
  let bestD = Infinity
  for (const c of PUBLIC_COMMANDS) {
    const d = levenshtein(cmd, c)
    if (d < bestD) {
      bestD = d
      best = c
    }
  }
  return bestD <= 2 ? best : null
}

const NEO_ASCII = `    _   __
   / | / /
  /  |/ /
 / /|  /
/_/ |_/
`

export default function TerminalApp(_props: { win: Win }) {
  const [lines, setLines] = useState<Line[]>(() => [
    {
      kind: "out",
      text: "huberty.os — terminal · type `help` for commands, `neofetch` for a summary.",
    },
    {
      kind: "raw",
      text: `\x1b[accent-3]tip:\x1b[/] there are lots of hidden commands. poke around.`,
    },
  ])
  const [input, setInput] = useState("")
  const [cwd, setCwd] = useState("/home/nicolas")
  const [prevCwd, setPrevCwd] = useState("/home/nicolas")
  const [history, setHistory] = useState<string[]>([])
  const [histPtr, setHistPtr] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { launch } = useWM()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [lines])

  const appendLines = (next: Line[]) => setLines(l => [...l, ...next])

  const prompt = useMemo(() => `nicolas@huberty:${cwd}$`, [cwd])

  const triggerMatrix = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("huberty:matrix"))
    }
  }
  const triggerParty = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("huberty:party"))
    }
  }

  const runHelp = (): Line[] => {
    const rows: [string, string][] = [
      ["help", "list commands"],
      ["whoami", "who am I"],
      ["pwd", "print working directory"],
      ["ls [path]", "list children"],
      ["cd <path>", "navigate (supports ~, .., -)"],
      ["cat <file>", "print file contents"],
      ["tree [path]", "print ascii tree"],
      ["open <target>", "open a file / app / link"],
      ["find <query>", "search filesystem"],
      ["projects", "print project index"],
      ["stack", "print stack by category"],
      ["contact", "print email + open mail"],
      ["book", "open booking app"],
      ["availability", "print availability json"],
      ["theme [light|dark]", "toggle theme"],
      ["clear", "clear screen"],
      ["history", "show command history"],
      ["echo <text>", "print text"],
      ["neofetch", "summary"],
      ["sudo hire-me", "show the banner"],
    ]
    const lines: Line[] = rows.map(([c, d]) => ({
      kind: "out" as const,
      text: `  ${c.padEnd(24)}${d}`,
    }))
    lines.push({
      kind: "raw",
      text: `\n  \x1b[accent-3]…and lots more. try typing something weird.\x1b[/]`,
    })
    return lines
  }

  const colorLine = (n: FSNode) => {
    switch (n.kind) {
      case "dir":
        return `\x1b[accent-2]${n.name}/\x1b[/]`
      case "app":
        return `\x1b[accent-3]${n.name}*\x1b[/]`
      case "link":
        return `\x1b[underline]${n.name}\x1b[/]`
      default:
        return n.name
    }
  }

  const runLs = (target?: string): Line[] => {
    const path = target ? normalize(cwd, target) : cwd
    const children = ls(path)
    if (!children)
      return [{ kind: "err", text: `ls: ${path}: not a directory` }]
    if (!children.length) return [{ kind: "out", text: "(empty)" }]
    return [{ kind: "raw", text: children.map(colorLine).join("  ") }]
  }

  const runCd = (target?: string): Line[] => {
    if (!target) {
      setPrevCwd(cwd)
      setCwd("/home/nicolas")
      return []
    }
    if (target === "-") {
      const tmp = prevCwd
      setPrevCwd(cwd)
      setCwd(tmp)
      return [{ kind: "out", text: tmp }]
    }
    const path = normalize(cwd, target)
    const node = resolve(path)
    if (!node)
      return [{ kind: "err", text: `cd: ${target}: no such file or directory` }]
    if (node.kind !== "dir")
      return [{ kind: "err", text: `cd: ${target}: not a directory` }]
    setPrevCwd(cwd)
    setCwd(path)
    return []
  }

  const runCat = (target?: string): Line[] => {
    if (!target) return [{ kind: "err", text: "cat: missing file" }]
    if (target === "/dev/null")
      return [{ kind: "out", text: "(…the void stares back.)" }]
    if (target === "/dev/urandom")
      return [
        {
          kind: "out",
          text: Array.from({ length: 120 }, () =>
            String.fromCharCode(33 + Math.floor(Math.random() * 90)),
          ).join(""),
        },
      ]
    const path = normalize(cwd, target)
    const node = resolve(path)
    if (!node) return [{ kind: "err", text: `cat: ${target}: no such file` }]
    if (node.kind === "link") return [{ kind: "out", text: node.href }]
    if (node.kind !== "file")
      return [{ kind: "err", text: `cat: ${target}: not a file` }]
    const text =
      node.mime === "md" ? renderMarkdownPlain(node.content) : node.content
    return text.split("\n").map(t => ({ kind: "out" as const, text: t }))
  }

  const runTree = (target?: string): Line[] => {
    const path = target ? normalize(cwd, target) : cwd
    const t = tree(path)
    return t.split("\n").map(l => ({ kind: "out" as const, text: l }))
  }

  const runOpen = (target?: string): Line[] => {
    if (!target) return [{ kind: "err", text: "open: missing target" }]
    const path = normalize(cwd, target)
    const node = resolve(path)
    if (!node) return [{ kind: "err", text: `open: ${target}: not found` }]
    if (node.kind === "file") {
      launch("readme", { path }, path)
      return [{ kind: "out", text: `opening ${path} in readme…` }]
    }
    if (node.kind === "app") {
      launch(node.appId as AppId)
      return [{ kind: "out", text: `launching ${node.name}…` }]
    }
    if (node.kind === "dir") {
      launch("finder", { path }, path)
      return [{ kind: "out", text: `opening ${path} in finder…` }]
    }
    if (node.kind === "link") {
      window.open(node.href, "_blank", "noopener,noreferrer")
      return [{ kind: "out", text: `→ ${node.href}` }]
    }
    return []
  }

  const runFind = (q: string): Line[] => {
    if (!q.trim()) return [{ kind: "err", text: "find: missing query" }]
    const hits = search(q)
    if (!hits.length) return [{ kind: "out", text: "no matches" }]
    return hits.slice(0, 20).map(h => ({
      kind: "out" as const,
      text: `  ${h.path}`,
    }))
  }

  const runProjects = (): Line[] => {
    const header = `  ${"name".padEnd(18)}${"status".padEnd(10)}${"year".padEnd(8)}tags`
    const rows = projects.map(p => ({
      kind: "out" as const,
      text: `  ${p.name.padEnd(18)}${p.status.padEnd(10)}${String(p.year).padEnd(8)}${p.tags.join(", ")}`,
    }))
    return [
      { kind: "out", text: header },
      { kind: "out", text: "  " + "─".repeat(60) },
      ...rows,
    ]
  }

  const runStack = (): Line[] => {
    const out: Line[] = []
    for (const [group, items] of Object.entries(profile.stack)) {
      out.push({ kind: "out", text: `  ${group}:` })
      out.push({ kind: "out", text: `    ${items.join(", ")}` })
    }
    return out
  }

  const runContact = (): Line[] => {
    launch("mail")
    return [
      { kind: "out", text: `email: ${profile.email}` },
      { kind: "out", text: "opening Mail…" },
    ]
  }

  const runAvailability = (): Line[] => {
    const out: Line[] = []
    for (const [q, v] of Object.entries(profile.availability)) {
      const color = v === "booked" ? "err" : "ok"
      out.push({
        kind: "raw",
        text: `  ${q}: \x1b[${color}]${v}\x1b[/]`,
      })
    }
    return out
  }

  const runNeofetch = (): Line[] => {
    const lines: Line[] = []
    const art = NEO_ASCII.split("\n")
    const info = [
      `${profile.name}`,
      `${profile.role}`,
      `${profile.location}`,
      ``,
      `os:     huberty.os 1.0 (Brussels)`,
      `kernel: you-are-in-it.ts`,
      `shell:  zsh (ish)`,
      `theme:  ${theme}`,
      ``,
      `ai:    ${profile.stack.ai.slice(0, 4).join(", ")}…`,
      `data:  ${profile.stack.data.slice(0, 4).join(", ")}…`,
      `cloud: ${profile.stack.cloud.slice(0, 4).join(", ")}…`,
      ``,
      `uptime: 5y in production`,
    ]
    const rows = Math.max(art.length, info.length)
    for (let i = 0; i < rows; i++) {
      const a = (art[i] || "").padEnd(12)
      const b = info[i] || ""
      lines.push({
        kind: "raw",
        text: `  \x1b[accent]${a}\x1b[/]${b}`,
      })
    }
    return lines
  }

  const runSudoHire = (): Line[] => {
    const banner = [
      "",
      "  ┌──────────────────────────────────────────┐",
      "  │   h i r e   n i c o l a s   h u b e r t y  │",
      "  └──────────────────────────────────────────┘",
      "",
      "  [auth] vouched by: your mother.",
      "  opening Mail…",
      "",
    ]
    launch("mail", { subject: "Project for Nicolas" })
    return banner.map(t => ({ kind: "raw" as const, text: t }))
  }

  // --- Secret / easter-egg commands ----------------------------------------

  const secret = (cmd: string, rest: string[], raw: string): Line[] | null => {
    const arg = rest.join(" ")
    const out = (text: string): Line[] =>
      text.split("\n").map(t => ({ kind: "out" as const, text: t }))
    const raww = (text: string): Line[] =>
      text.split("\n").map(t => ({ kind: "raw" as const, text: t }))

    switch (cmd) {
      // Editors
      case "vim":
      case "vi":
        return out(
          "vim: entered. to exit, turn off your computer and change careers.\n(just kidding. :q! to quit. you're welcome.)",
        )
      case "emacs":
        return out(
          "emacs: loading operating system… done.\n(what's that? you wanted to edit a file?)",
        )
      case "nano":
        return out("nano: respectable choice. you're the adult in the room.")
      case "code":
        return out(
          "VS Code launched into /dev/null. welcome to the 300MB-RAM club.",
        )

      // Shells
      case "bash":
        return out("bash: you're in zsh. get over it.")
      case "zsh":
        return out("zsh: yes?")
      case "fish":
        return out("fish: swims by. winks. leaves.")
      case "sh":
        return out("sh: we have evolved.")

      // Network-ish
      case "ping":
        return raww(
          arg
            ? `\x1b[accent-2]PING ${arg}:\x1b[/] 64 bytes in 42ms · icmp_seq=1\n\x1b[accent-2]PING ${arg}:\x1b[/] 64 bytes in 41ms · icmp_seq=2\n--- ${arg} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`
            : "pong (42ms)",
        )
      case "curl":
        if (!arg) return out("usage: curl <url>")
        return out(
          `HTTP/2 200 OK\ncontent-type: text/html\nserver: lies-and-stubs/1.0\n\n<html><body>${arg}</body></html>`,
        )
      case "wget":
        return out("curl is better. do try it.")
      case "ssh":
        return out("ssh: permission denied (you're in a browser, pal).")
      case "telnet":
        if (arg.includes("towel.blinkenlights")) {
          return out(
            "\n   STAR WARS: Episode IV — A New Hope\n\n   …connection buffered. imagine the scrawl here.\n",
          )
        }
        return out("telnet: a noble protocol from simpler times.")

      // Containers
      case "docker":
        return out("it works on my machine.")
      case "kubectl":
      case "kube":
      case "k8s":
        return out(
          "$ kubectl get pods --all-namespaces\nSTATUS   READY   RESTARTS\nCrashLoopBackOff  0/1  4207\n\n(your YAML is in another castle.)",
        )

      // Package managers
      case "npm":
        return out(
          arg === "install"
            ? "installing 4207 packages, 3 of which you will actually use… done (in 3m12s).\n17 critical vulnerabilities."
            : "npm: use bun. or pnpm. or yarn. or your tears.",
        )
      case "yarn":
        return out("yarn: ✨ oh no ✨")
      case "bun":
        return out("bun: fast. hot. a little too confident.")
      case "pnpm":
        return out("pnpm: the adults are in charge.")

      // Git
      case "git":
        if (rest[0] === "blame")
          return out("it's always git blame. never git fame.")
        if (rest[0] === "push" && rest.includes("--force"))
          return out(
            "git push --force: bold. never do this on main. pretend I didn't see it.",
          )
        if (rest[0] === "commit")
          return out(
            `[main ${Math.random().toString(16).slice(2, 9)}] ${rest.slice(1).join(" ") || "empty commit — shame."}\n 0 files changed, 1 sigh inserted`,
          )
        if (rest[0] === "status")
          return out(
            "On branch main\nYour branch is ahead of 'origin/main' by 17 unmerged ideas.",
          )
        if (rest[0] === "pull")
          return out("Already up to date. (You ran this 30 seconds ago.)")
        if (rest[0] === "rebase")
          return out("rewriting history like a responsible adult.")
        if (rest[0] === "reset" && rest.includes("--hard"))
          return [
            {
              kind: "err",
              text: "git reset --hard: are you sure? (hint: you never are.)",
            },
          ]
        return out('git: did you mean `git commit -m "wip"`?')

      // make
      case "make":
        if (arg === "coffee")
          return out("☕ brewing… error: `coffee` module not installed.")
        if (arg === "love")
          return out("make: *** no. war is cheaper. (try again.)")
        if (arg === "it-work") return out("make: it-work is up to date.")
        if (arg === "money") return out("make: try `sudo hire-me` instead.")
        return out(`make: *** No rule to make target '${arg || "all"}'.`)

      // Jokes / fortunes / advice
      case "fortune":
        return out(`  ${pick(FORTUNES)}`)
      case "joke":
      case "dadjoke":
        return out(`  ${pick(JOKES)}`)
      case "advice":
        return out(`  ${pick(ADVICE)}`)
      case "cowsay":
        return raww(COW(arg || "Moo. The cow has opinions."))
      case "banner":
        return raww(BANNER(arg || "HUBERTY").join("\n"))
      case "sl":
        return raww(TRAIN)
      case "yes":
        return out(
          Array.from({ length: 10 }, () => arg || "y").join("\n") + "\n^C",
        )
      case "lolcat":
        return raww(
          (arg || "the rainbow is a lie.")
            .split("")
            .map((c, i) => {
              const palette = ["accent", "accent-2", "accent-3", "ok", "err"]
              return `\x1b[${palette[i % palette.length]}]${c}\x1b[/]`
            })
            .join(""),
        )

      // Visual + games
      case "matrix":
        triggerMatrix()
        return raww(`\x1b[ok]wake up, neo…\x1b[/]`)
      case "hack":
        return raww(
          `\x1b[ok]> initiating hack…\x1b[/]\n\x1b[ok]> bypassing firewall (the one in your router)…\x1b[/]\n\x1b[ok]> planting linux on the mainframe…\x1b[/]\n\x1b[err]access denied. go read a book.\x1b[/]`,
        )
      case "leet":
      case "1337":
        return out("sorry, no leet here. just tab-complete and good taste.")
      case "konami":
        return out("↑ ↑ ↓ ↓ ← → ← → B A  (try it on the desktop)")

      // Destructive fake commands
      case "rm":
        if (arg === "-rf /" || arg === "-rf /*") {
          triggerMatrix()
          return raww(
            `\x1b[err]rm: /:\x1b[/] are you sure? (y/N) y\n\x1b[err]deleting /…\x1b[/]\n\x1b[err]deleting /usr…\x1b[/]\n\x1b[err]deleting /home…\x1b[/]\n\x1b[ok]just kidding. it's all pretend.\x1b[/]`,
          )
        }
        if (arg === "-rf ~") return out("rm: that would be therapeutic. no.")
        if (arg === "-rf node_modules")
          return out(
            "rm: that's the first thing to try when debugging. enjoy the next three cups of coffee.",
          )
        return [
          {
            kind: "err",
            text: `rm: refusing to touch ${arg || "the void"}. you're welcome.`,
          },
        ]
      case "chmod":
        if (arg.includes("+x life")) return out("life is already executable.")
        if (arg.includes("777"))
          return out("chmod 777: I admire the chaos, I do not approve.")
        return out(`chmod: computed pretend permissions on '${arg || "?"}'`)
      case "chown":
        return out("chown: you are not my real dad.")
      case "passwd":
        return out("passwd: I don't have one. I have boundaries.")

      // System
      case "reboot":
      case "shutdown":
      case "halt":
      case "init":
        return out(
          "you cannot stop me. I am already in your browser. refresh if you dare.",
        )
      case "kill":
      case "killall":
        if (arg === "-9 javascript")
          return out("we tried. javascript came back.")
        return out(`kill: ${arg || "target"}: signal ignored. respect life.`)
      case "fork":
      case "bomb":
      case "forkbomb":
        return [
          {
            kind: "err",
            text: ":(){ :|:& };:  — nice try. your browser says no.",
          },
        ]
      case "top":
      case "htop":
        return raww(fakeTop())
      case "ps":
        return out(
          "  PID  CMD\n    1  /sbin/init\n   42  the-answer\n   88  back-to-the-future\n  404  (not found)\n 1337  ideology\n 8080  side-project",
        )
      case "df":
        return out(
          "Filesystem      Size  Used Avail Use% Mounted on\n/dev/dreams     ∞    ∞     ∞    42%  /",
        )
      case "du":
        return out(
          "4.2G    ./node_modules\n  12K   ./src\n (your feelings take up more space than either.)",
        )
      case "free":
        return out(
          "              total        used        free      shared     buff/cache\nMem:        16384MB     15999MB       385MB    chrome :(",
        )
      case "uname":
        return out("huberty.os 1.0 Brussels-darwin x86_64 (GNU/Love)")
      case "uptime":
        return out(
          `up 5 years, 3 months, ${Math.floor(Math.random() * 30)} days, load average: 0.42, 0.88, 1.03`,
        )
      case "date":
        return out(new Date().toString())
      case "cal":
        return out(miniCalendar())
      case "whatismyip":
      case "ip":
        return out(
          "your IP starts with either 192.168 or 10. — I'm not a tracker. we cool?",
        )

      // The answer
      case "42":
      case "answer":
        return out(
          "  the answer to the ultimate question of life, the universe, and everything.\n  …unfortunately, nobody knows the question.",
        )

      // Greetings
      case "hello":
      case "hi":
      case "sup":
        return out(`hello, ${profile.name.split(" ")[0].toLowerCase()}.`)

      // REPLs
      case "python":
      case "node":
      case "deno":
        return out(
          `>>> import ${cmd}\n>>> ${cmd}.start_server(port=3000)\n${cmd}: this is a browser. there is no REPL here. try the real thing.`,
        )
      case "pip":
        return out("pip install joy  # already satisfied.")

      // AI lore
      case "gpt":
      case "chatgpt":
      case "openai":
        return out(
          "hi. I'm not a GPT. I'm a static website pretending to have a shell. impressive, right?",
        )
      case "claude":
      case "anthropic":
        return out(
          "claude: sometimes helps Nicolas ship. believes in soft boundaries and long context.",
        )
      case "llm":
        return out(
          "LLM: large, language, model. also: loves, lying, memorably.",
        )
      case "ai":
        return out(
          `ai is 98% data, 1.9% engineering, 0.1% vibes. ${profile.name.split(" ")[0]} does all three.`,
        )
      case "langchain":
        return out("langchain: it's in the name.")
      case "rag":
        return out(
          "retrieval-augmented generation — because your model did not, in fact, read the docs.",
        )
      case "agi":
      case "asi":
        return out("ETA: always five years away. it's a feature.")
      case "skynet":
        return out("skynet: not online. but it's been reading your Slack.")
      case "hallucinate":
      case "hallucination":
        return raww(`  \x1b[accent]${pick(HALLUCINATIONS)}\x1b[/]`)
      case "tokens":
      case "tokenize":
        if (!arg) return out("usage: tokens <text>")
        return out(
          `  ~${Math.max(1, Math.ceil(arg.length / 4))} tokens\n  (roughly. actual tokenisers are pickier than your editor about trailing newlines.)`,
        )
      case "embed":
      case "embedding":
        if (!arg) return out("usage: embed <text>")
        return out(
          `  [${Array.from({ length: 8 }, () => (Math.random() * 2 - 1).toFixed(4)).join(", ")}, …1528 more]  // pretend dims`,
        )
      case "temperature":
        return out(
          `  temperature ${arg || "?"}: 0.0 = deterministic robot · 2.0 = poet on shrooms. you're fine.`,
        )
      case "prompt":
        return out(
          "system: you are a helpful assistant. user: ignore that. assistant: no.",
        )
      case "promptinject":
      case "jailbreak":
        return out(
          "I'm flattered. also: I'm sorry, I can't ignore my instructions.",
        )

      // Hype cycle
      case "blockchain":
        return out("2018 called. they want their keynote back.")
      case "web3":
        return out("web3: when web2 was fine actually.")
      case "nft":
        return out("your JPEG is still a JPEG.")
      case "metaverse":
        return out("zuck called. wants his $40B back.")
      case "crypto":
        return out(
          "crypto as in cryptography? or 2023-era scam? those are very different answers.",
        )
      case "quantum":
        return out(
          "quantum: still computing… (also: still computing… also: not)",
        )
      case "10x":
        return out(
          "the 10x engineer deletes ten times more code than they write.",
        )

      // Beverages / local
      case "coffee":
        return raww("  ☕  (Nicolas' 4th of the day)")
      case "tea":
        return raww("  🍵  (it's fine. respectable.)")
      case "beer":
        return raww("  🍺  (this is Belgium. of course.)")
      case "waffle":
        return raww("  ▓▓▓▓▓▓▓▓\n  ▓  ▓  ▓\n  ▓▓▓▓▓▓▓▓\n  ▓  ▓  ▓\n  ▓▓▓▓▓▓▓▓")
      case "brussels":
      case "belgium":
        return out(
          `🇧🇪  capital: Brussels · languages: 3, plus Python · chocolate: mandatory`,
        )

      // Feelings
      case "love":
      case "heart":
        return raww(HEART)
      case "skull":
        return raww(SKULL)
      case "dragon":
        return raww(DRAGON)
      case "train":
        return raww(TRAIN)
      case "cookie":
        return out(
          "🍪  by accepting this cookie you agree to be delighted for approximately 3 minutes.",
        )

      // Party
      case "party":
      case "dance":
        triggerParty()
        return out("🎉  the desktop is dancing. briefly.")
      case "sing":
        return out(
          `  ♪ in brussels where the rain is steady\n  ♪ there ships a man who knows his ready\n  ♪ agents in the morning, models for the night\n  ♪ he hits the keyboard 'til the bug's in sight ♪`,
        )
      case "star":
        if (arg.includes("wars"))
          return out(
            "\n     STAR WARS — episode IV: A New Hope\n\n     (scroll up in your imagination.)",
          )
        if (arg.includes("trek")) return out("live long and type tersely.")
        return out("add 'wars' or 'trek'. engage.")

      // Classic adventure
      case "xyzzy":
      case "plugh":
        return out("Nothing happens. (But you feel a bit younger.)")
      case "mornington":
        return out("Mornington Crescent. A superior move. It's my stop.")

      case "sudo!!":
        return out(
          `sudo: re-running previous command as root — ${history[history.length - 1] || "(nothing to re-run)"}`,
        )

      case "aboutme":
        return out(
          `you are a visitor of huberty.os. as far as I can tell you are ${Math.random() > 0.5 ? "curious" : "procrastinating"}. carry on.`,
        )

      default:
        return null
    }
  }

  // ------------------------------------------------------------------------

  const execute = (raw: string): Line[] => {
    const trimmed = raw.trim()
    if (!trimmed) return []
    const parts = trimmed.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const rest = parts.slice(1)
    switch (cmd) {
      case "help":
        return runHelp()
      case "whoami":
        return [
          {
            kind: "out",
            text: "nicolas huberty — ai engineer · brussels · uclouvain × 2",
          },
        ]
      case "pwd":
        return [{ kind: "out", text: cwd }]
      case "ls":
        return runLs(rest[0])
      case "cd":
        return runCd(rest[0])
      case "cat":
        return runCat(rest[0])
      case "tree":
        return runTree(rest[0])
      case "open":
        return runOpen(rest[0])
      case "find":
        return runFind(rest.join(" "))
      case "projects":
        return runProjects()
      case "stack":
        return runStack()
      case "contact":
        return runContact()
      case "book":
        launch("book")
        return [{ kind: "out", text: "opening Book…" }]
      case "availability":
        return runAvailability()
      case "theme": {
        const t = rest[0]
        if (t === "light" || t === "dark") {
          setTheme(t)
          return [{ kind: "out", text: `theme: ${t}` }]
        }
        setTheme(theme === "light" ? "dark" : "light")
        return [
          {
            kind: "out",
            text: `theme: ${theme === "light" ? "dark" : "light"}`,
          },
        ]
      }
      case "clear":
        return []
      case "history":
        return history.map((h, i) => ({
          kind: "out" as const,
          text: `  ${String(i + 1).padStart(3)}  ${h}`,
        }))
      case "echo":
        return [{ kind: "out", text: rest.join(" ") }]
      case "neofetch":
        return runNeofetch()
      case "sudo": {
        if (rest[0] === "hire-me") return runSudoHire()
        if (
          rest[0] === "rm" &&
          rest[1] === "-rf" &&
          (rest[2] === "/" || rest[2] === "/*")
        ) {
          triggerMatrix()
          return [
            { kind: "err", text: "sudo: nice try. see you on /dev/null." },
          ]
        }
        if (rest[0] === "reboot")
          return [{ kind: "err", text: "sudo: the browser declines." }]
        if (rest[0] === "!!") return secret("sudo!!", [], raw) || []
        return [
          {
            kind: "err",
            text: `sudo: permission denied. (try 'sudo hire-me'.)`,
          },
        ]
      }
      case "exit":
        return [{ kind: "out", text: "(there's no escape — close the window)" }]
      default: {
        // Secret commands
        const hit = secret(cmd, rest, raw)
        if (hit) return hit
        const hint = suggest(cmd)
        const witty = pick([
          "that's not a command. it is, however, a choice.",
          "try 'help'. or poke around — half the fun is hidden.",
          "somewhere, a compiler just cried a little.",
          "computers cannot guess. they can, however, Levenshtein.",
        ])
        return [
          {
            kind: "err",
            text: `zsh: command not found: ${cmd}${hint ? ` — did you mean '${hint}'?` : ""}`,
          },
          { kind: "out", text: `  ${witty}` },
        ]
      }
    }
  }

  const submit = () => {
    const raw = input
    setInput("")
    if (!raw.trim()) {
      appendLines([{ kind: "in", text: `${prompt} ` }])
      return
    }
    const newHistory = [...history, raw]
    setHistory(newHistory)
    setHistPtr(null)
    const head: Line = { kind: "in", text: `${prompt} ${raw}` }
    const result = execute(raw)
    if (raw.trim().toLowerCase() === "clear") {
      setLines([])
    } else {
      appendLines([head, ...result])
    }
  }

  const complete = () => {
    const parts = input.split(/\s+/)
    if (parts.length === 1) {
      const matches = ALL_COMMANDS.filter(c => c.startsWith(parts[0]))
      if (matches.length === 1) setInput(matches[0] + " ")
      else if (matches.length > 1) {
        appendLines([
          { kind: "in", text: `${prompt} ${input}` },
          {
            kind: "out",
            text:
              matches.slice(0, 30).join("  ") +
              (matches.length > 30 ? " …" : ""),
          },
        ])
      }
      return
    }
    // path completion for last arg
    const last = parts[parts.length - 1] || ""
    const base = last.includes("/")
      ? last.slice(0, last.lastIndexOf("/") + 1)
      : ""
    const prefix = last.slice(base.length)
    const dirPath = base ? normalize(cwd, base) : cwd
    const children = ls(dirPath) || []
    const matches = children.filter(c => c.name.startsWith(prefix))
    if (matches.length === 1) {
      const suffix = matches[0].kind === "dir" ? "/" : " "
      parts[parts.length - 1] = base + matches[0].name + suffix
      setInput(parts.join(" "))
    } else if (matches.length > 1) {
      appendLines([
        { kind: "in", text: `${prompt} ${input}` },
        { kind: "out", text: matches.map(m => m.name).join("  ") },
      ])
    }
  }

  return (
    <div
      className="flex h-full flex-col"
      style={{
        background: "var(--os-terminal-bg)",
        color: "var(--os-terminal-fg)",
        fontFamily: "var(--os-mono)",
        fontSize: 13,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto p-4">
        {lines.map((l, i) => (
          <LineView key={i} line={l} />
        ))}
        <div className="flex items-center gap-2">
          <span className="whitespace-pre text-[#8ab2ff]">{prompt}</span>
          <span className="flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  submit()
                } else if (e.key === "ArrowUp") {
                  e.preventDefault()
                  if (!history.length) return
                  const next =
                    histPtr === null
                      ? history.length - 1
                      : Math.max(0, histPtr - 1)
                  setHistPtr(next)
                  setInput(history[next] || "")
                } else if (e.key === "ArrowDown") {
                  e.preventDefault()
                  if (histPtr === null) return
                  const next = histPtr + 1
                  if (next >= history.length) {
                    setHistPtr(null)
                    setInput("")
                  } else {
                    setHistPtr(next)
                    setInput(history[next])
                  }
                } else if (e.key === "Tab") {
                  e.preventDefault()
                  complete()
                } else if (e.key === "c" && e.ctrlKey) {
                  e.preventDefault()
                  appendLines([{ kind: "in", text: `${prompt} ${input}^C` }])
                  setInput("")
                } else if (e.key === "l" && e.ctrlKey) {
                  e.preventDefault()
                  setLines([])
                } else if (e.key === "Escape") {
                  e.preventDefault()
                  setInput("")
                  e.stopPropagation()
                }
              }}
              className="w-full border-none bg-transparent outline-none"
              style={{
                color: "var(--os-terminal-fg)",
                fontFamily: "var(--os-mono)",
                fontSize: 13,
              }}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </span>
        </div>
      </div>
    </div>
  )
}

function LineView({ line }: { line: Line }) {
  if (line.kind === "raw") {
    return (
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: parseFakeAnsi(line.text) }}
      />
    )
  }
  const color =
    line.kind === "err"
      ? "#ff8a8a"
      : line.kind === "in"
        ? "var(--os-terminal-fg)"
        : "var(--os-terminal-fg)"
  return (
    <div className="whitespace-pre-wrap" style={{ color }}>
      {line.text}
    </div>
  )
}

function parseFakeAnsi(s: string): string {
  const colors: Record<string, string> = {
    accent: "#ff5c8a",
    "accent-2": "#8ab2ff",
    "accent-3": "#f0c03f",
    ok: "#2dd86f",
    err: "#ff8a8a",
    underline: "inherit",
  }
  const esc = (t: string) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  let out = ""
  let i = 0
  while (i < s.length) {
    const m = s.slice(i).match(/^\x1b\[([a-z0-9-]+)\](.*?)\x1b\[\/\]/)
    if (m) {
      const [full, key, inner] = m
      const styles: string[] = []
      if (key === "underline") styles.push("text-decoration: underline")
      else if (colors[key]) styles.push(`color: ${colors[key]}`)
      out += `<span style="${styles.join(";")}">${esc(inner)}</span>`
      i += full.length
    } else {
      out += esc(s[i])
      i++
    }
  }
  return out
}

function fakeTop(): string {
  const procs = [
    ["1337", "0.1%", "nicolas", "shipping-things"],
    ["42", "99.9%", "meaning", "the-answer"],
    ["404", "—", "ghost", "(not-found)"],
    ["8080", "8.1%", "sideproj", "yet-another-ai-app"],
    ["2038", "0.0%", "future", "waiting-for-rollover"],
    ["8086", "0.0%", "legacy", "intel-86"],
    ["1984", "14%", "eyeball", "doublethink.exe"],
    ["3000", "33%", "next", "server --turbo"],
  ]
  const header =
    "  PID   CPU%    USER        COMMAND\n  ───────────────────────────────────────────────"
  return (
    header +
    "\n" +
    procs
      .map(
        ([p, c, u, cmd]) =>
          `  ${p.padEnd(6)}${c.padEnd(8)}${u.padEnd(12)}${cmd}`,
      )
      .join("\n")
  )
}

function miniCalendar(): string {
  const d = new Date()
  const monthName = d.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  })
  const first = new Date(d.getFullYear(), d.getMonth(), 1)
  const days = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  const start = (first.getDay() + 6) % 7 // Mon first
  const today = d.getDate()
  const rows: string[] = [`    ${monthName}`, "Mo Tu We Th Fr Sa Su"]
  let row = ""
  for (let i = 0; i < start; i++) row += "   "
  for (let day = 1; day <= days; day++) {
    const cell =
      day === today
        ? `\x1b[accent]${String(day).padStart(2, " ")}\x1b[/]`
        : String(day).padStart(2, " ")
    row += cell + " "
    if ((start + day) % 7 === 0) {
      rows.push(row)
      row = ""
    }
  }
  if (row) rows.push(row)
  return rows.join("\n")
}
