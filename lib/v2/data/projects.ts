export type Project = {
  id: string
  name: string
  tagline: string
  status: "live" | "archived"
  year: number
  url?: string
  tags: string[]
  stack: string[]
  role: string
  icon: { shape: "folder" | "app"; color: string; letter: string }
  summary: string
  problem: string
  approach: string
  outcome: string
  metrics?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    id: "emate",
    name: "eMate",
    tagline: "Intelligent legal research, powered by smart agents.",
    status: "live",
    year: 2025,
    url: "https://emate.be",
    tags: ["Legal Tech", "Agentic RAG"],
    stack: ["Nuxt UI", "Docker", "Python", "Qdrant"],
    role: "Lead · AI + build",
    icon: { shape: "folder", color: "#ff5c8a", letter: "e" },
    summary:
      "Agentic RAG across doctrine, jurisprudence, and legislation. Sourced answers. Hours become minutes.",
    problem: `Belgian lawyers spend hours a week cross-referencing doctrine, jurisprudence and legislation — three distinct corpora, each with its own structure, citations, and vocabulary. Traditional keyword search fails on legal reasoning, and the cost of a missed precedent is real.

The firms we talked to did not want another LLM demo. They wanted an answer they could cite, from sources they already trust, with the ability to drill in.`,
    approach: `Agentic RAG pipeline: a planner agent decomposes a case-based query into sub-queries for each corpus; specialised retrievers hit Qdrant indexes tuned per source type; a synthesiser agent composes the answer with inline citations back to the original document.

Constraints:
- Belgian data sovereignty — the stack runs on Belgian infrastructure.
- Every answer must point back to a source; no ungrounded claims.
- Latency budget: a lawyer will not wait 30 seconds for a draft response.`,
    outcome: `Shipped to production. Research time on typical case preparation is down from hours to minutes. Next steps: broaden coverage of regional sources, tighter citation UX in the results view.`,
    metrics: [
      { label: "research time", value: "hours → minutes" },
      { label: "corpora covered", value: "3 (doctrine, juris, legis)" },
    ],
  },
  {
    id: "docuralis",
    name: "Docuralis",
    tagline: "Agentic AI platform — beyond RAG.",
    status: "live",
    year: 2025,
    url: "https://docuralis.com",
    tags: ["Agentic AI", "MCP"],
    stack: ["Python", "LangChain", "MCP"],
    role: "Lead · architecture + build",
    icon: { shape: "folder", color: "#8ab2ff", letter: "d" },
    summary:
      "Domain-specific agents using MCP, web search, and API integrations for multi-source reasoning.",
    problem: `Generic chat UIs stop being useful when the question requires reaching into three different systems and reasoning across the results. Docuralis was built for teams that need that kind of answer, not a chat log.`,
    approach: `Agents expose tools via MCP. Each agent is scoped to a domain with its own retrieval strategy, tool allowlist, and evaluation suite. Web search and API integrations are first-class tools, not afterthoughts.`,
    outcome: `Live platform. Used for building custom agents per client domain. What I'd do differently: invest earlier in the trace + replay surface — debugging agent chains is where most of the pain lives.`,
  },
  {
    id: "datanest",
    name: "DataNest",
    tagline: "Sovereign practice management for law firms.",
    status: "archived",
    year: 2024,
    tags: ["Legal Tech", "SaaS"],
    stack: ["Nuxt 3", "FastAPI", "Kubernetes", "PostgreSQL"],
    role: "Solo · full stack",
    icon: { shape: "folder", color: "#f0c03f", letter: "d" },
    summary:
      "Unified workspace for law firms — emails, docs, dossiers, and accounting — on a Belgian cloud.",
    problem: `Small and mid-size law firms juggle four or five tools for one dossier. Each tool holds a slice of the truth. Nothing talks to each other.`,
    approach: `Single dossier-centric model. Emails, documents, notes, and accounting entries all attach to the same dossier. Kubernetes on a Belgian cloud for sovereignty. FastAPI backend, Nuxt 3 frontend.`,
    outcome: `Archived. Shipped a working beta; moved on to eMate where the AI-first angle was a better fit for my skills. DataNest taught me a lot about the operational side of legal tech.`,
  },
  {
    id: "ratio",
    name: "Ratio",
    tagline: "Debate where arguments are weighted, not liked.",
    status: "live",
    year: 2025,
    url: "https://ratio.huberty.pro",
    tags: ["Social", "AI"],
    stack: ["Next.js", "Prisma", "PostgreSQL", "Claude AI", "Better Auth"],
    role: "Solo · full stack + AI",
    icon: { shape: "folder", color: "#2dd86f", letter: "r" },
    summary:
      "A debate platform. Arguments scored by sources, logic, and credibility. AI fact-checking. 1v1 duels.",
    problem: `Online debate is a popularity contest. The argument with the most dopamine wins, even when it's wrong. I wanted a place where a well-sourced minority opinion beats a loud majority one.`,
    approach: `Every argument is scored by three axes: source quality, logical structure, and credibility signals. Claude is used for fact-checking. Gamified with leagues and 1v1 duels to pull people back.`,
    outcome: `Live. Early users. Still iterating on the scoring model — the hardest part is avoiding a judge that feels arbitrary.`,
  },
  {
    id: "meetyournotes",
    name: "MeetYourNotes",
    tagline: "Fully-local meeting transcription, on-device.",
    status: "archived",
    year: 2024,
    tags: ["Productivity", "Local AI"],
    stack: ["Tauri", "React", "Zustand", "BlockNote", "TypeScript"],
    role: "Solo · full stack",
    icon: { shape: "folder", color: "#8ab2ff", letter: "m" },
    summary:
      "Detects Teams/Zoom/Meet, transcribes, and summarises — everything on-device.",
    problem: `Most transcription tools ship your meeting audio to a third-party server. That's a non-starter in a lot of contexts (legal, medical, internal strategy).`,
    approach: `Tauri desktop app. Native audio capture, on-device transcription model, structured summary at end of call. No network calls unless the user opts in.`,
    outcome: `Archived — shipped as a proof that local-first meeting tooling is feasible on modern laptops. Happy to revisit if a client wants it.`,
  },
  {
    id: "swet",
    name: "SWET",
    tagline: "Custom Odoo ERP for a Brussels hot-sauce maker.",
    status: "live",
    year: 2023,
    url: "https://www.swet.be",
    tags: ["ERP", "Odoo"],
    stack: ["Odoo", "Python", "Odoo.sh", "PostgreSQL"],
    role: "Consultant · build + maintain",
    icon: { shape: "folder", color: "#ff5c5c", letter: "s" },
    summary:
      "Production and distribution workflows on custom Odoo models, deployed on Odoo.sh.",
    problem: `A small artisan producer with a fast-growing distribution side. Spreadsheets and invoices were falling apart.`,
    approach: `Custom Odoo models for production batches, distribution channels, and pricing. Deployed on Odoo.sh with scheduled jobs for stock reconciliation.`,
    outcome: `Live. Running their operations. Ongoing maintenance as they add product lines.`,
  },
  {
    id: "louise",
    name: "Louise Huberty",
    tagline: "Clinical practice site for a speech-language pathologist.",
    status: "live",
    year: 2025,
    url: "https://louise.huberty.pro",
    tags: ["Website", "Clinical"],
    stack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    role: "Solo · design + build",
    icon: { shape: "folder", color: "#ff5c8a", letter: "l" },
    summary:
      "A calm, accessible site that explains the practice and makes booking obvious.",
    problem: `A clinical practice needed a site that felt reassuring, not salesy, and made it obvious how to book.`,
    approach: `Minimal content model. Clear service descriptions. Accessible colour palette. One-click contact.`,
    outcome: `Live.`,
  },
  {
    id: "ila",
    name: "ILA",
    tagline: "Clinical data de-identification with fine-tuned NER.",
    status: "archived",
    year: 2024,
    url: "https://youtu.be/PJTIBT_-VHk",
    tags: ["Healthcare", "Privacy"],
    stack: ["Python", "Fine-tuned LLMs", "NER"],
    role: "Author · MSc thesis",
    icon: { shape: "folder", color: "#8ab2ff", letter: "i" },
    summary:
      "De-identification pipeline for French-language clinical documents.",
    problem: `Hospitals sit on text data that could power clinical research, but PII and PHI make it unshareable.`,
    approach: `Fine-tuned NER models on French clinical text with synthetic augmentation. Post-processing to catch the long tail of identifiers regex misses.`,
    outcome: `Archived — thesis project at UCLouvain. Demonstrated that targeted fine-tuning beats generic de-identification models on French clinical text.`,
  },
  {
    id: "private-cloud",
    name: "Private Cloud",
    tagline: "Enterprise-grade infra powering everything else here.",
    status: "live",
    year: 2024,
    tags: ["Infra", "DevOps"],
    stack: ["Kubernetes", "Terraform", "GitOps", "CI/CD"],
    role: "Solo · infra",
    icon: { shape: "folder", color: "#f0c03f", letter: "p" },
    summary:
      "Kubernetes cluster with GitOps CI/CD. Hosts the projects on this site.",
    problem: `Every project I ship needs reliable hosting, domain management, and CI/CD. Paying per-project for managed platforms was adding up and giving me less control.`,
    approach: `Self-hosted Kubernetes. Terraform for infra. GitOps for deploys. Automated backups. Observability stack.`,
    outcome: `99.9% uptime for hosted services. Ongoing — the boring infra that lets the interesting work happen.`,
    metrics: [{ label: "uptime", value: "99.9%" }],
  },
]

export const projectById = (id: string) => projects.find(p => p.id === id)
