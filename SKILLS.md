# huberty.os — Implementation Brief

> Hand this whole document to Claude (or any coding agent). It is designed to be self-contained: a single system prompt + spec that produces a fully working, desktop-OS-themed portfolio for Nicolas Huberty with draggable windows, a real virtual file system for project dossiers, and an interactive terminal.

---

## 0. ROLE / SYSTEM PROMPT

You are a senior front-end engineer. Your job is to build **huberty.os**, an interactive portfolio website that simulates a minimalist desktop operating system in the browser. It is for **Nicolas Huberty**, an AI engineer based in Brussels. The site replaces his current portfolio (portfolio.huberty.pro) and must feel like using software, not scrolling a page.

**Primary goals (in order):**
1. Attract high-value B2B consulting leads (AI/RAG/agentic work).
2. Impress recruiters and technical hiring managers.
3. Showcase craft — the site itself is the portfolio piece.

**Non-negotiables:**
- Every window is draggable, focusable, minimisable, closable, and restorable from the dock.
- The **Finder** window shows a real virtual filesystem. Double-clicking a project folder opens a new window for that dossier with full case study content.
- The **Terminal** is actually interactive: it parses commands, supports history, tab-completion, and can navigate the same virtual filesystem (`ls`, `cd`, `cat`, `open`, `tree`, `help`, `clear`, plus custom commands: `whoami`, `projects`, `stack`, `contact`, `book`, `sudo hire-me`).
- The **Mail** window composes real `mailto:` links.
- Works on desktop (primary) and gracefully degrades on tablets. Mobile falls back to a stacked single-column "mobile OS" layout.
- Keyboard accessible: `⌘K` opens spotlight search; `Esc` closes focused window; arrow keys move focused window by 10px.
- No backend. All content lives in a static data file. Deploys to Vercel as a single Next.js or Vite app.
- Performance: < 150KB JS gzipped for initial paint; windows lazy-load their content.
- Never invent UI of real companies (macOS, Windows). This is an **original** OS. Name: **huberty.os**.

**Tone of copy:** confident, quiet, slightly dry. Never corporate. Never hype. First-person. Belgian understatement — "I ship things that work" over "I revolutionise enterprise AI."

---

## 1. TECH STACK

- **Framework:** Next.js 14 App Router (or Vite + React 18 if simpler) — TypeScript.
- **Styling:** Tailwind CSS + CSS variables for theming. No UI library. Custom components.
- **State:** Zustand for window manager state; React context for filesystem.
- **Animation:** Framer Motion for window open/close, minimise, focus.
- **Fonts:** self-hosted via `next/font` — **Inter Tight** (UI), **JetBrains Mono** (terminal, labels), **Fraunces** (display accents, case-study prose).
- **Icons:** Lucide React.
- **Deploy:** Vercel. Single page app at `/`.

---

## 2. VISUAL SYSTEM

### Colours (CSS variables, themeable)
```
--bg:            #f0ede3   (warm paper)
--bg-window:     #fbfaf6
--ink:           #1a1a1a
--ink-muted:     #5c5c5c
--ink-faint:     #8a8a8a
--accent:        #ff5c8a   (hot pink — primary)
--accent-2:      #8ab2ff   (cornflower — secondary)
--accent-3:      #f0c03f   (mustard — tertiary)
--accent-ok:     #2dd86f
--accent-err:    #ff5c5c
--terminal-bg:   #0c0c0c
--terminal-fg:   #e8e8e8
```

Dark theme mirrors these (inverted paper → #14130f, ink → #fbfaf6). Theme toggle lives in menu bar.

### Typography scale
- Display (Fraunces, regular, italic for emphasis): 48 / 32 / 24
- UI (Inter Tight): 20 / 16 / 14 / 13 / 11
- Mono (JetBrains Mono): 13 / 12 / 11 / 10

### Window chrome
- 1px solid `--ink` border + `8px 8px 0 var(--ink)` drop shadow (no blur — deliberate, flat).
- 6px border radius.
- Title bar: `--ink` background, `--bg-window` text, height 32px, mono 11px.
- Traffic lights on left: red (close), amber (minimise), green (maximise). Each 11×11, circular.
- Title centered. Drag handle = entire title bar.
- Content area: `--bg-window` background, scrollable.
- Focused window z-index above others; unfocused windows have 60% opacity title bar.

### Desktop
- Background: `--bg` with subtle 24×24px dot grid at `--ink` at 6% opacity.
- One wallpaper signature bottom-left: "nicolas / huberty" in Fraunces italic, 140px, 4% opacity, non-interactive.
- Top menu bar (28px): `--ink` @ 90% + backdrop blur, mono 12px. Contents:
  `● huberty.os  File  Edit  View  Window  Help        Wi-Fi  100%  Thu 16:04`
- Dock (bottom-center): `--ink` @ 88% + backdrop blur, 10px gap, 16px radius, 14px padding. Icons 44×44, 10px radius.

### Motion
- Window open: scale from 0.92 → 1, opacity 0 → 1, 180ms `easeOut`.
- Window close: reverse, 140ms.
- Minimise: genie-style — scale-y 0.02 + translate-y to dock icon position, 260ms.
- Focus change: subtle 60ms opacity tick on title bar.
- Dock icon hover: scale 1.12, neighbours 1.05, 120ms.

---

## 3. DATA — CONTENT + FILESYSTEM

Create `/lib/data/content.ts`. All user-facing content lives here.

### 3.1 Profile
```ts
export const profile = {
  name: "Nicolas Huberty",
  role: "AI Engineer & Consultant",
  location: "Brussels, BE",
  email: "huberty.nicolas@hotmail.com",
  availability: {
    q2_2026: "booked",
    q3_2026: "2 slots open",
    q4_2026: "3 slots open",
  },
  bio: `AI engineer in Brussels. Two UCLouvain degrees (BSc + MSc in Computer Science). Five years shipping production ML, RAG, and agentic workflows for organisations that need answers — not demos. Currently leading an internal AI practice at UCLouvain; previously at Smals (ONEM) on national-scale data infrastructure for Belgium's employment office.`,
  links: {
    github: "https://github.com/NicolasHuberty",
    linkedin: "https://www.linkedin.com/in/nicolas-huberty/",
    email: "mailto:huberty.nicolas@hotmail.com",
  },
  stack: {
    ai: ["Python", "PyTorch", "TensorFlow", "LangChain", "LangGraph", "OpenAI", "Hugging Face", "Haystack", "scikit-learn"],
    data: ["PostgreSQL", "MongoDB", "Redis", "Qdrant", "Apache Spark", "Kafka", "Airflow", "dbt"],
    web: ["TypeScript", "React", "Next.js", "Nuxt", "FastAPI", "Flask", "Django", "Tailwind"],
    cloud: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "Terraform", "GitHub Actions"],
  },
  experience: [
    { role: "AI Engineer", org: "UCLouvain", years: "2025 — present", type: "work",
      blurb: "Leading AI initiatives. Designing RAG systems, fine-tuning LLMs, deploying production AI.",
      tags: ["Azure AI", "RAG", "LLMs", "Python"] },
    { role: "Data Engineer", org: "Smals (ONEM)", years: "2024 — 2025", type: "work",
      blurb: "Built data pipelines and ETL systems for Belgium's national employment office.",
      tags: ["dbt", "SQL", "Python", "ETL"] },
    { role: "MSc Computer Science", org: "UCLouvain", years: "2022 — 2024", type: "edu",
      blurb: "AI, Cybersecurity, Data Science. Thesis: clinical document de-identification.",
      tags: ["AI", "ML", "NER", "Privacy"] },
    { role: "BSc Computer Science", org: "UCLouvain", years: "2019 — 2022", type: "edu",
      blurb: "Algorithms, data structures, software engineering.",
      tags: ["Algorithms", "Databases", "Systems"] },
  ],
};
```

### 3.2 Projects

Each project has a full case study. Produce them in `/lib/data/projects/*.mdx` (or as TS strings). Required fields:

```ts
type Project = {
  id: string;             // filesystem name, e.g. "emate"
  name: string;           // display, e.g. "eMate"
  tagline: string;        // one line
  status: "live" | "archived";
  year: number;
  url?: string;
  tags: string[];         // ["Legal Tech", "Agentic RAG"]
  stack: string[];
  role: string;           // "Lead · AI + build"
  icon: { shape: "folder" | "app"; color: string; letter: string };
  summary: string;        // 2–3 sentences for previews
  problem: string;        // markdown allowed
  approach: string;
  outcome: string;
  metrics?: { label: string; value: string }[];
  // raw file listing that shows up in the project window
  files: { name: string; kind: "md" | "img" | "link"; content?: string; href?: string }[];
};
```

Projects to include (use the original site's facts — do not invent):

1. **eMate** — Intelligent legal research. Agentic RAG across doctrine, jurisprudence, legislation. Sourced answers, hours → minutes. Stack: Nuxt UI, Docker, Python, Qdrant. Status: live. URL: https://emate.be.
2. **Docuralis** — Agentic AI platform. MCP, web search, API integrations; domain-specific agents. Stack: Python, LangChain, MCP. Status: live. URL: https://docuralis.com.
3. **DataNest** — Sovereign practice-management for law firms. Emails, docs, dossiers, accounting. Kubernetes in a Belgian cloud. Stack: Nuxt 3, FastAPI, Kubernetes, PostgreSQL. Status: archived.
4. **Ratio** — Weighted debate platform. Arguments weighted by sources, logic, credibility; AI fact-checking, leagues, 1v1 duels. Stack: Next.js, Prisma, PostgreSQL, Claude AI, Better Auth. Status: live. URL: https://ratio.huberty.pro.
5. **MeetYourNotes** — Fully-local meeting transcription. Detects Teams/Zoom/Meet, transcribes, summarises. On-device. Stack: Tauri, React, Zustand, BlockNote, TypeScript. Status: archived.
6. **SWET** — Custom Odoo ERP for a Brussels hot-sauce maker. Production + distribution. Stack: Odoo, Python, Odoo.sh, PostgreSQL. Status: live. URL: https://www.swet.be.
7. **Louise Huberty** — Clinical practice website for a speech-language pathologist. Stack: Next.js, Tailwind, Framer Motion, TypeScript. Status: live. URL: https://louise.huberty.pro.
8. **ILA** — Clinical data anonymisation. Status: archived.
9. **Private Cloud** — Enterprise infrastructure. Status: live.

Each case study follows this structure:
- **Problem** — what was broken, for whom. 3–5 sentences.
- **Approach** — architecture + key decisions, with a small ascii/svg diagram if warranted. Call out constraints (privacy, on-prem, latency).
- **Outcome** — what shipped, metrics where real, what you'd do differently.

If a fact is unknown, write `[TK — Nicolas to fill]` rather than fabricating.

### 3.3 Virtual Filesystem

The filesystem underpins both the Finder and the Terminal. Shape:

```ts
type FSNode =
  | { kind: "dir"; name: string; icon?: string; color?: string; children: FSNode[] }
  | { kind: "file"; name: string; content: string | ReactNode; mime: "md" | "txt" | "json" | "app" }
  | { kind: "app"; name: string; appId: string; icon: string; color: string }
  | { kind: "link"; name: string; href: string };

const fs: FSNode = {
  kind: "dir", name: "/", children: [
    { kind: "dir", name: "home", children: [
      { kind: "dir", name: "nicolas", icon: "user", children: [
        { kind: "file", name: "about.md", mime: "md", content: /* profile.bio + highlights */ },
        { kind: "file", name: "stack.txt", mime: "txt", content: /* rendered stack */ },
        { kind: "file", name: "availability.json", mime: "json", content: JSON.stringify(profile.availability, null, 2) },
        { kind: "dir", name: "work", icon: "briefcase", children: [
          /* one dir per project, each with case-study.md, screenshots/, links.md */
        ]},
        { kind: "dir", name: "experience", children: [ /* one md per role */ ] },
        { kind: "dir", name: "writing", children: [ /* blog posts if any; else .empty */ ] },
        { kind: "link", name: "github", href: profile.links.github },
        { kind: "link", name: "linkedin", href: profile.links.linkedin },
      ]},
    ]},
    { kind: "dir", name: "apps", children: [
      { kind: "app", name: "Terminal", appId: "terminal", icon: "terminal", color: "#1a1a1a" },
      { kind: "app", name: "Mail", appId: "mail", icon: "mail", color: "#f0c03f" },
      { kind: "app", name: "Finder", appId: "finder", icon: "folder", color: "#ff5c8a" },
      { kind: "app", name: "Readme", appId: "readme", icon: "book-open", color: "#8ab2ff" },
      { kind: "app", name: "Book a call", appId: "book", icon: "calendar", color: "#2dd86f" },
    ]},
  ]
};
```

Expose helpers: `resolve(path)`, `ls(path)`, `read(path)`, `walk()`, `search(query)`.

---

## 4. APPS (WINDOW CONTENT)

### 4.1 Finder — `appId: "finder"`
- Two-pane: sidebar (Favourites: Home, Work, Experience, Writing, Trash) + main column.
- Main column toggles Grid / List / Column view.
- Double-click folder → navigate; double-click file → open in appropriate app (md → Readme, img → Preview, link → new tab, app → launch).
- Breadcrumb bar at top.
- Search input filters current directory by name and content (debounced 120ms).
- Context menu (right-click): Open, Open in new window, Copy path, Get info.

### 4.2 Readme — `appId: "readme"`
- Default window opens to `/home/nicolas/about.md`.
- Renders Markdown with a lightweight renderer (no external lib needed; see `/lib/md.ts`). Supports headings, bold, italic, code, lists, links, blockquote, hr, and inline images.
- Project case studies open here. Window title = the file path.
- Has a "Table of contents" rail on the right for long docs.

### 4.3 Terminal — `appId: "terminal"`
**Must be genuinely interactive.** Not a scripted cinematic.
- Prompt: `nicolas@huberty:<cwd>$`
- Supports history (↑ / ↓), inline editing, tab completion for commands + paths, `clear`, `Ctrl+C` cancels current input.
- Commands (implement all):

| Command | Behaviour |
|---|---|
| `help` | Lists all commands with one-line descriptions. |
| `whoami` | `nicolas huberty — ai engineer · brussels · uclouvain × 2` |
| `pwd` | Prints current dir. |
| `ls [path]` | Lists children. Colour dirs `--accent-2`, apps `--accent-3`, links underlined. |
| `cd <path>` | Navigates. Supports `..`, `~`, `-` (previous dir). |
| `cat <file>` | Dumps file content. For `.md`, prints rendered-plain version. |
| `tree [path]` | ASCII tree. |
| `open <target>` | If file → opens in Readme window. If app → launches it. If link → opens URL. |
| `find <query>` | Full-text search across filesystem; results clickable. |
| `projects` | Prints project index as a table (name · status · year · tag). |
| `stack` | Prints the stack grouped by category. |
| `contact` | Prints email + opens Mail window. |
| `book` | Opens the booking app. |
| `availability` | Prints the availability JSON, colourised. |
| `theme [light\|dark]` | Toggles theme. |
| `clear` | Clears terminal. |
| `sudo hire-me` | Prints an ASCII banner + opens Mail pre-filled with subject "Project for Nicolas". Responds with `[auth] vouched by: your mother.` |
| `history` | Shows command history. |
| `echo <text>` | Prints text. |
| `neofetch` | Prints a stylised summary: ascii "N" logo + profile.bio one-liner + stack highlights + uptime. |

Unknown command: `zsh: command not found: foo` with a suggestion (`did you mean 'find'?`) using simple Levenshtein distance.

Terminal input uses a single `<input>` visually styled to match the cursor; history scroll is a styled div with ANSI-like colour classes.

### 4.4 Mail — `appId: "mail"`
- Pre-populated compose window: To = Nicolas's email, From = placeholder "you@…", Subject = prefillable via query string (`?subject=…`).
- Body is a `<textarea>` styled as Fraunces italic 15px.
- "Send" button opens a `mailto:` with current fields.
- "Save draft" toasts "saved to /home/nicolas/drafts/".
- When opened via `sudo hire-me` or a project CTA, prefills subject and intro.

### 4.5 Book a call — `appId: "book"`
- Shows a month grid (current month + next). Availability comes from `profile.availability`.
- Booked slots rendered as `--ink` squares; open slots as `--accent-ok` squares.
- Click a slot → window expands to show a form (name / company / topic / link to current work) + "Confirm".
- Confirm opens a mailto with the form contents as body. No backend.

### 4.6 Readme (onboarding)
On first load, auto-launch Readme with `/home/nicolas/welcome.md`:
> # welcome — start here
> This is huberty.os. A few things you can do:
> - Open **Finder** from the dock and browse `/home/nicolas/work`.
> - Pop the **Terminal** and try `projects`, `stack`, or `sudo hire-me`.
> - Hit `⌘K` anywhere for spotlight search.

Persist "seen welcome" in localStorage so it only shows once.

### 4.7 Spotlight — `⌘K` / `Ctrl+K`
- Centered overlay modal, 520px wide.
- Searches apps, files, project names, stack items, and raw file content.
- Enter opens the top result; Esc closes.

---

## 5. WINDOW MANAGER

`/lib/wm.ts` — a Zustand store.

```ts
type Win = {
  id: string;          // uuid
  appId: string;       // "finder" | "terminal" | ...
  title: string;
  x: number; y: number; w: number; h: number;
  z: number;
  state: "open" | "minimised" | "maximised";
  props?: any;         // e.g. { path: "/home/nicolas/work/emate/case-study.md" }
};
```

Actions: `launch(appId, props?)`, `close(id)`, `focus(id)`, `minimise(id)`, `maximise(id)`, `move(id, dx, dy)`, `resize(id, dw, dh)`, `snapshot()`.

Rules:
- New windows cascade: first at `(60, 60)`, each next offset by `(28, 24)`.
- Window size clamps to viewport minus menu bar + dock.
- State persists to localStorage under `huberty.os:wm` so a refresh preserves layout.
- Menu-bar "Window → Cleanup" tiles all open windows in a 2×2 grid.

Focus: click anywhere in a window focuses it and raises z. Only one focused window at a time.

Resize: every window has 8px drag regions on edges + corners using pointer events. Minimum size 280×200.

---

## 6. ACCESSIBILITY + KEYBOARD

- All interactive elements reachable by Tab. Focus ring uses `--accent` 2px outline offset 2px.
- Each window has role="dialog", aria-label = title.
- Dock icons have descriptive `aria-label`s.
- `Esc` closes the focused window unless it's the Terminal (which consumes Esc for command cancel).
- `⌘W` closes focused window; `⌘M` minimises; `⌘⇧F` toggles Finder.
- Reduced-motion preference disables window animations; swaps for instant state changes.

---

## 7. MOBILE

Below 768px: hide dock + windows. Render a stacked single-column "mobile OS" with large tile buttons for About, Work, Stack, Book, Contact. Opening a tile pushes a full-screen view with a back chevron. Terminal is hidden on mobile (noted as "terminal available on desktop"). Preserve all content.

---

## 8. SEO + META

- Title: `Nicolas Huberty — AI Engineer (huberty.os)`
- Description: `An AI engineer's portfolio, built as a desktop OS. Work, writing, and a terminal you can actually use.`
- OG image: generated static PNG of the desktop with three windows visible. Prebuild at `/public/og.png` 1200×630.
- JSON-LD Person schema with job title, sameAs links, worksFor UCLouvain.
- Robots: index, follow. Sitemap at `/sitemap.xml`.

---

## 9. FILE / MODULE LAYOUT

```
app/
  layout.tsx             // fonts, theme provider
  page.tsx               // <Desktop />
  globals.css
components/
  Desktop.tsx            // wallpaper, menu bar, dock, window renderer
  MenuBar.tsx
  Dock.tsx
  Window.tsx             // chrome + drag + resize + focus
  Spotlight.tsx
  apps/
    Finder.tsx
    Terminal.tsx
    Readme.tsx
    Mail.tsx
    Book.tsx
  md/
    Markdown.tsx         // mini md renderer
lib/
  wm.ts                  // Zustand store
  fs.ts                  // virtual FS + helpers
  theme.ts
  keybinds.ts
  md.ts
  data/
    profile.ts
    projects/
      emate.md
      docuralis.md
      datanest.md
      ratio.md
      meetyournotes.md
      swet.md
      louise.md
      ila.md
      private-cloud.md
public/
  og.png
  favicon.svg            // minimalist "N" monogram matching dock icon
```

---

## 10. ACCEPTANCE TESTS (run before calling done)

1. Clicking each dock icon opens the correct app.
2. Dragging any window moves it; bringing any covered window to front works.
3. In Finder, navigating `/home/nicolas/work/emate` and double-clicking `case-study.md` opens Readme with the full study.
4. In Terminal: `cd ~/work && ls` lists the project folders. `cat emate/case-study.md` prints the study. `open emate/case-study.md` opens it in Readme.
5. `sudo hire-me` opens Mail with subject prefilled.
6. `⌘K`, typing "rag", pressing Enter — opens eMate's case study.
7. Reload the page — windows restore to their previous positions and states.
8. Light/dark toggle changes every surface; no hard-coded colours remain.
9. Lighthouse a11y ≥ 95, performance ≥ 90 on a clean run.
10. Resize browser to 375px — site re-renders as mobile, all content reachable, dock hidden.

---

## 11. LINKS + ASSETS NEEDED FROM NICOLAS (ASK FIRST)

- High-res project screenshots (for the case-study windows).
- Confirmation of availability dates.
- Any blog drafts you want on day 1 (else writing dir is empty with a placeholder).
- Preferred booking link (Cal.com?) — else Mail-only.
- LinkedIn + GitHub URLs (verify the ones in §3.1).

Ask these questions before writing content. Never fabricate metrics.

---

## 12. DELIVERABLE

A single Git repo, deployable to Vercel via `vercel` command. README with:
- `pnpm install && pnpm dev` → localhost:3000.
- How to add a project (drop an MDX into `lib/data/projects/`, update `lib/data/projects/index.ts`).
- How to customise theme colours (edit `app/globals.css` variables).
- Keyboard reference.

The final site should feel like sitting down at someone's desk. Everything clickable does what you expect. Nothing is a prop.

— end of brief —
