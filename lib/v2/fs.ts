import { profile } from "./data/profile"
import { projects, projectById } from "./data/projects"

export type FSDir = {
  kind: "dir"
  name: string
  icon?: string
  color?: string
  children: FSNode[]
}
export type FSFile = {
  kind: "file"
  name: string
  content: string
  mime: "md" | "txt" | "json"
}
export type FSApp = {
  kind: "app"
  name: string
  appId: string
  icon: string
  color: string
}
export type FSLink = { kind: "link"; name: string; href: string }
export type FSNode = FSDir | FSFile | FSApp | FSLink

function caseStudy(id: string): string {
  const p = projectById(id)
  if (!p) return ""
  const meta = [
    `# ${p.name}`,
    ``,
    `*${p.tagline}*`,
    ``,
    `**Status:** ${p.status} · **Year:** ${p.year} · **Role:** ${p.role}`,
    p.url ? `**Live:** ${p.url}` : "",
    ``,
    `**Stack:** ${p.stack.join(", ")}`,
    ``,
    `---`,
    ``,
    `## Problem`,
    ``,
    p.problem,
    ``,
    `## Approach`,
    ``,
    p.approach,
    ``,
    `## Outcome`,
    ``,
    p.outcome,
    ``,
  ]
    .filter(Boolean)
    .join("\n")

  if (p.metrics && p.metrics.length) {
    const rows = p.metrics.map(m => `- **${m.label}:** ${m.value}`).join("\n")
    return meta + `\n## Metrics\n\n${rows}\n`
  }
  return meta
}

function stackText(): string {
  const lines: string[] = ["# Stack", ""]
  for (const [group, items] of Object.entries(profile.stack)) {
    lines.push(`## ${group}`)
    lines.push("")
    lines.push(items.map(i => `- ${i}`).join("\n"))
    lines.push("")
  }
  return lines.join("\n")
}

function aboutMd(): string {
  return `# about — ${profile.name}

*${profile.role} · ${profile.location}*

${profile.bio}

---

## Links

- [GitHub](${profile.links.github})
- [LinkedIn](${profile.links.linkedin})
- [Email](${profile.links.email})
`
}

function welcomeMd(): string {
  return `# welcome — start here

This is **huberty.os**. A few things you can do:

- Open **Finder** from the dock and browse \`/home/nicolas/work\`.
- Pop the **Terminal** and try \`projects\`, \`stack\`, or \`sudo hire-me\`.
- Hit \`⌘K\` anywhere for spotlight search.

Everything clickable does what you expect. Nothing is a prop.

---

> *pssst — there are **70+ secret commands** in the terminal. start with* \`fortune\`, \`matrix\`, \`cowsay hello\`, \`git blame\`. *the Konami code does something.*
`
}

function secretFile(): string {
  return `# .secret — you pay attention, I respect that

Fine. Here is the short list:

## Terminal highlights
- \`matrix\` · \`konami\` · \`hack\` · \`party\` · \`dance\`
- \`git blame\` · \`git push --force\` · \`git reset --hard\`
- \`vim\` · \`emacs\` · \`rm -rf /\` (lies) · \`sudo rm -rf /\` (bigger lies)
- \`make coffee\` · \`make love\` · \`make money\`
- \`npm install\` · \`docker\` · \`kubectl\`
- \`gpt\` · \`claude\` · \`agi\` · \`hallucinate\` · \`tokens\` · \`embed\`
- \`blockchain\` · \`nft\` · \`metaverse\` · \`web3\` · \`quantum\`
- \`cowsay\` · \`banner\` · \`sl\` · \`lolcat\` · \`yes\` · \`htop\` · \`ps\`
- \`fortune\` · \`joke\` · \`advice\`
- \`42\` · \`xyzzy\` · \`plugh\` · \`mornington\`
- \`waffle\` · \`beer\` · \`brussels\` · \`coffee\`
- \`sudo hire-me\` · \`sudo !!\`

## Outside the terminal
- **Konami code** anywhere — ↑↑↓↓←→←→BA
- **Click the huberty.os bullet** seven times — party.
- **Click the wallpaper signature** three times — this file.
- **⌘⌥T** opens the terminal.
- **Spotlight** — try \`42\`, \`hire me\`, \`matrix\`, \`party\`, \`easter\`, \`coffee\`.

## Mail
- Type \`crypto\` or \`nft\` in the subject. See what happens.
- Type \`exposure\` if you want a specific response.
- Type \`rag\` or \`agent\` if you want a happy one.

There. Don't tell anyone.

— N.
`
}

export function buildFS(): FSDir {
  const workChildren: FSNode[] = projects.map<FSDir>(p => ({
    kind: "dir",
    name: p.id,
    icon: p.icon.letter,
    color: p.icon.color,
    children: [
      {
        kind: "file",
        name: "case-study.md",
        mime: "md",
        content: caseStudy(p.id),
      },
      {
        kind: "file",
        name: "meta.json",
        mime: "json",
        content: JSON.stringify(
          {
            id: p.id,
            name: p.name,
            status: p.status,
            year: p.year,
            url: p.url,
            tags: p.tags,
            stack: p.stack,
          },
          null,
          2,
        ),
      },
      ...(p.url
        ? [{ kind: "link" as const, name: "visit.link", href: p.url }]
        : []),
    ],
  }))

  const experienceChildren: FSNode[] = profile.experience.map(e => ({
    kind: "file" as const,
    name: `${e.org.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`,
    mime: "md" as const,
    content: `# ${e.role} · ${e.org}

*${e.years}*

${e.blurb}

**Tags:** ${e.tags.join(", ")}
`,
  }))

  return {
    kind: "dir",
    name: "/",
    children: [
      {
        kind: "dir",
        name: "home",
        children: [
          {
            kind: "dir",
            name: "nicolas",
            icon: "user",
            children: [
              {
                kind: "file",
                name: "welcome.md",
                mime: "md",
                content: welcomeMd(),
              },
              {
                kind: "file",
                name: "about.md",
                mime: "md",
                content: aboutMd(),
              },
              {
                kind: "file",
                name: "stack.txt",
                mime: "txt",
                content: stackText(),
              },
              {
                kind: "file",
                name: "availability.json",
                mime: "json",
                content: JSON.stringify(profile.availability, null, 2),
              },
              {
                kind: "dir",
                name: "work",
                icon: "briefcase",
                color: "#ff5c8a",
                children: workChildren,
              },
              {
                kind: "dir",
                name: "experience",
                children: experienceChildren,
              },
              {
                kind: "dir",
                name: "writing",
                children: [
                  {
                    kind: "file",
                    name: ".empty",
                    mime: "txt",
                    content: "no posts yet — soon.",
                  },
                ],
              },
              {
                kind: "file",
                name: ".secret",
                mime: "md",
                content: secretFile(),
              },
              { kind: "link", name: "github", href: profile.links.github },
              { kind: "link", name: "linkedin", href: profile.links.linkedin },
            ],
          },
        ],
      },
      {
        kind: "dir",
        name: "apps",
        children: [
          {
            kind: "app",
            name: "Finder",
            appId: "finder",
            icon: "folder",
            color: "#ff5c8a",
          },
          {
            kind: "app",
            name: "Terminal",
            appId: "terminal",
            icon: "terminal",
            color: "#1a1a1a",
          },
          {
            kind: "app",
            name: "Readme",
            appId: "readme",
            icon: "book-open",
            color: "#8ab2ff",
          },
          {
            kind: "app",
            name: "Mail",
            appId: "mail",
            icon: "mail",
            color: "#f0c03f",
          },
          {
            kind: "app",
            name: "Book",
            appId: "book",
            icon: "calendar",
            color: "#2dd86f",
          },
        ],
      },
    ],
  }
}

export const FS = buildFS()

function splitPath(path: string): string[] {
  return path.split("/").filter(Boolean)
}

export function normalize(cwd: string, p: string): string {
  if (!p) return cwd
  if (p === "~") return "/home/nicolas"
  if (p.startsWith("~/")) return "/home/nicolas/" + p.slice(2)
  let base: string[]
  if (p.startsWith("/")) base = []
  else base = splitPath(cwd)
  const parts = splitPath(p)
  for (const part of parts) {
    if (part === "." || part === "") continue
    if (part === "..") base.pop()
    else base.push(part)
  }
  return "/" + base.join("/")
}

export function resolve(path: string): FSNode | null {
  const parts = splitPath(path)
  let node: FSNode = FS
  for (const part of parts) {
    if (node.kind !== "dir") return null
    const next: FSNode | undefined = node.children.find(
      (c: FSNode) => c.name === part,
    )
    if (!next) return null
    node = next
  }
  return node
}

export function ls(path: string): FSNode[] | null {
  const node = resolve(path)
  if (!node || node.kind !== "dir") return null
  return node.children
}

export function read(path: string): string | null {
  const node = resolve(path)
  if (!node) return null
  if (node.kind === "file") return node.content
  return null
}

export type WalkEntry = { path: string; node: FSNode }

export function walk(): WalkEntry[] {
  const out: WalkEntry[] = []
  function rec(node: FSNode, p: string) {
    out.push({ path: p, node })
    if (node.kind === "dir") {
      for (const c of node.children) {
        rec(c, p === "/" ? "/" + c.name : p + "/" + c.name)
      }
    }
  }
  rec(FS, "/")
  return out
}

export function search(query: string): WalkEntry[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return walk().filter(({ path, node }) => {
    if (path.toLowerCase().includes(q)) return true
    if (node.kind === "file") return node.content.toLowerCase().includes(q)
    return false
  })
}

export function tree(path: string, prefix = ""): string {
  const node = resolve(path)
  if (!node) return `${path}: no such file or directory`
  if (node.kind !== "dir") return node.name
  const lines: string[] = [prefix + node.name + "/"]
  function rec(d: FSDir, pre: string) {
    const children = d.children
    children.forEach((c, i) => {
      const isLast = i === children.length - 1
      const branch = isLast ? "└── " : "├── "
      const next = isLast ? "    " : "│   "
      if (c.kind === "dir") {
        lines.push(pre + branch + c.name + "/")
        rec(c, pre + next)
      } else {
        lines.push(pre + branch + c.name)
      }
    })
  }
  rec(node, prefix)
  return lines.join("\n")
}
