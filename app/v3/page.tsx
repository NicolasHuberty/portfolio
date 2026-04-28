"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowUpRight,
  Briefcase,
  Eye,
  GraduationCap,
  Send,
  Sparkles,
  Star,
} from "lucide-react"

export default function V3Landing() {
  return (
    <div className="landing-root min-h-screen antialiased">
      <style>{`
        .landing-root {
          --cream: #F5EFE3;
          --cream-deep: #EDE5D2;
          --ink: #15120D;
          --ink-soft: #3A352A;
          --moss: #2B4A3B;
          --moss-deep: #17301F;
          --rust: #C75C2C;
          --stone: #8B7E66;
          --hairline: rgba(21, 18, 13, 0.15);

          background: var(--cream);
          color: var(--ink);
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          background-image:
            radial-gradient(circle at 20% 10%, rgba(199, 92, 44, 0.05) 0%, transparent 35%),
            radial-gradient(circle at 85% 80%, rgba(43, 74, 59, 0.06) 0%, transparent 40%);
        }

        .landing-root::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.5;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /%3E%3CfeColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.07 0 0 0 0 0.05 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .landing-root > * { position: relative; z-index: 1; }

        .serif { font-family: var(--font-serif), "Fraunces", Georgia, serif; font-optical-sizing: auto; font-variation-settings: "SOFT" 80, "opsz" 144; }
        .serif-display {
          font-family: var(--font-serif), "Fraunces", Georgia, serif;
          font-optical-sizing: auto;
          font-variation-settings: "SOFT" 100, "opsz" 144, "WONK" 0;
          font-weight: 430;
          line-height: 0.92;
          letter-spacing: -0.035em;
        }
        .serif-italic {
          font-family: var(--font-serif), "Fraunces", Georgia, serif;
          font-style: italic;
          font-variation-settings: "SOFT" 100, "opsz" 144, "WONK" 1;
        }
        .mono { font-family: var(--font-geist-mono), ui-monospace, monospace; font-feature-settings: "tnum", "zero"; }

        .rule { border-top: 1px solid var(--hairline); }
        .rule-heavy { border-top: 2px solid var(--ink); }

        .fade-in { opacity: 0; animation: fade-rise 900ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards; }
        @keyframes fade-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .d1 { animation-delay: 60ms; }
        .d2 { animation-delay: 180ms; }
        .d3 { animation-delay: 320ms; }
        .d4 { animation-delay: 480ms; }
        .d5 { animation-delay: 640ms; }
        .d6 { animation-delay: 820ms; }

        .btn-primary {
          background: var(--ink);
          color: var(--cream);
          padding: 0.9rem 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 180ms ease;
          position: relative;
          border: 1px solid var(--ink);
        }
        .btn-primary:hover {
          background: var(--moss-deep);
          border-color: var(--moss-deep);
          transform: translate(2px, -2px);
          box-shadow: -4px 4px 0 var(--rust);
        }
        .btn-ghost {
          background: transparent;
          color: var(--ink);
          padding: 0.9rem 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          border: 1px solid var(--hairline);
          transition: all 180ms ease;
        }
        .btn-ghost:hover {
          border-color: var(--ink);
          background: var(--cream-deep);
        }

        .ledger-card {
          border: 1px solid var(--hairline);
          background: var(--cream-deep);
          position: relative;
        }
        .ledger-card::before {
          content: '';
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--moss) 30%, var(--moss) 70%, transparent);
          opacity: 0.3;
        }

        .row-num {
          font-feature-settings: "tnum", "zero";
          letter-spacing: -0.02em;
        }

        .ticker-track {
          display: flex;
          gap: 3rem;
          animation: ticker 38s linear infinite;
          white-space: nowrap;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .polaroid {
          border: 1px solid var(--ink);
          background: var(--cream-deep);
          padding: 0.5rem;
          box-shadow: 5px 5px 0 var(--rust);
          transform: rotate(-2.2deg);
          transition: transform 300ms ease;
        }
        .polaroid:hover { transform: rotate(-0.5deg) translate(-1px, -2px); }
        .polaroid-photo {
          filter: sepia(0.18) contrast(0.96) saturate(0.88);
        }

        .field-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(245, 239, 227, 0.35);
          color: var(--cream);
          font-family: var(--font-geist-sans);
          font-size: 14px;
          padding: 0.55rem 0;
          outline: none;
          transition: border-color 180ms ease;
        }
        .field-input::placeholder { color: rgba(245, 239, 227, 0.4); }
        .field-input:focus { border-bottom-color: var(--rust); }
        textarea.field-input { resize: vertical; min-height: 90px; }
      `}</style>

      {/* ──────────────────── Top bar ──────────────────── */}
      <header className="d1 flex items-center justify-between px-6 py-5 fade-in md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex size-8 items-center justify-center rounded-[3px]"
            style={{ background: "var(--ink)", color: "var(--cream)" }}
          >
            <span className="mono text-[13px] font-semibold">NH</span>
          </div>
          <span className="mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-soft)]">
            Nicolas Huberty · folio
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <a
            href="https://github.com/NicolasHuberty"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] md:inline-flex"
          >
            <GithubGlyph /> Source
          </a>
          <Link
            href="/v1"
            className="text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
          >
            v1
          </Link>
          <Link
            href="/v2"
            className="text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
          >
            v2
          </Link>
          <a
            href="#contact"
            className="serif-italic text-[15px] text-[var(--rust)] underline underline-offset-4 hover:text-[var(--moss-deep)]"
          >
            Me contacter →
          </a>
        </nav>
      </header>

      {/* ──────────────────── Hero ──────────────────── */}
      <section className="relative px-6 pb-24 pt-14 md:px-12 md:pb-40 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="d2 mb-10 flex items-center gap-3 fade-in">
            <span
              className="block h-px w-10"
              style={{ background: "var(--ink)" }}
            />
            <span className="mono text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">
              AI engineer · Brussels · MSc UCLouvain
            </span>
          </div>

          <h1 className="d3 serif-display max-w-[18ch] text-[clamp(3.5rem,12vw,11rem)] fade-in">
            AI engineering,
            <br />
            <span
              className="serif-italic"
              style={{ color: "var(--moss-deep)" }}
            >
              sur votre
            </span>{" "}
            <span className="underline decoration-[var(--rust)] decoration-[6px] underline-offset-[0.1em]">
              stack
            </span>
            .
          </h1>

          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="d4 text-[17px] leading-[1.55] text-[var(--ink-soft)] fade-in">
                Je suis{" "}
                <span className="font-medium text-[var(--ink)]">
                  Nicolas Huberty
                </span>
                . Je construis des outils qui font
                <span className="serif-italic"> gagner du temps</span> à des
                équipes entières : une IA qui répond à partir de vos documents,
                des automatisations qui tournent la nuit, des plateformes web
                qui convertissent. Du concret, mesurable, en production.
              </p>
              <p className="d4 mt-5 text-[15px] leading-[1.6] text-[var(--ink-soft)] fade-in">
                UCLouvain × Smals (ONEM) × indépendant. Pas de jargon quand on
                peut s&apos;en passer. Pas de{" "}
                <span className="serif-italic">« proof of concept »</span> qui
                finit dans un tiroir.
              </p>
            </div>

            <div className="d5 fade-in md:col-span-6 md:border-l md:border-[var(--hairline)] md:pl-8">
              <div className="mb-8 flex items-start gap-5">
                <div className="polaroid w-[140px] shrink-0">
                  <div className="bg-[var(--ink)]/5 relative h-[170px] w-full overflow-hidden">
                    <Image
                      src="/images/nicolas.jpeg"
                      alt="Nicolas Huberty, portrait"
                      fill
                      priority
                      sizes="140px"
                      className="polaroid-photo object-cover"
                    />
                  </div>
                  <div className="mono mt-2 flex items-center justify-between text-[8.5px] uppercase tracking-[0.22em] text-[var(--stone)]">
                    <span>N. Huberty</span>
                    <span>№ 03</span>
                  </div>
                </div>
                <div className="pt-1">
                  <div className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--stone)]">
                    Portrait · folio 03
                  </div>
                  <div className="serif mt-1 text-[19px] leading-tight">
                    Nicolas Huberty
                  </div>
                  <div
                    className="serif-italic text-[14px]"
                    style={{ color: "var(--moss-deep)" }}
                  >
                    AI engineer, Brussels
                  </div>
                  <div className="mono mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                    <span className="block size-1.5 rounded-full bg-[var(--rust)]" />
                    Fully booked · Q4 2026
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href="#projects" className="btn-primary text-[14px]">
                  <Eye className="size-4" /> Voir les projets
                </a>
                <a href="#contact" className="btn-ghost text-[14px]">
                  Me contacter <ArrowUpRight className="size-4" />
                </a>
                <a
                  href="https://github.com/NicolasHuberty"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[var(--ink-soft)] underline underline-offset-4 hover:text-[var(--ink)]"
                >
                  <Star className="size-3.5" /> Star on GitHub
                </a>
              </div>
              <div className="mono mt-6 inline-flex items-center gap-2 rounded-[2px] border border-[var(--hairline)] bg-[var(--cream-deep)] px-3 py-2 text-[11px] text-[var(--ink-soft)]">
                <span className="text-[var(--moss-deep)]">$</span> curl -s
                huberty.pro/intro.txt
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="mono pointer-events-none absolute right-8 top-32 hidden origin-top-right rotate-90 text-[10px] uppercase tracking-[0.4em] md:block"
          style={{ color: "var(--stone)" }}
        >
          FOLIO № 03 · 2026
        </div>
      </section>

      {/* ──────────────────── Ticker/stat bar ──────────────────── */}
      <div
        className="rule-heavy rule d6 overflow-hidden border-y py-6 fade-in"
        style={{ borderColor: "var(--ink)", background: "var(--cream-deep)" }}
      >
        <div className="ticker-track mono text-[13px] uppercase tracking-[0.2em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12">
              <Item label="Python" value="3.12" />
              <Dot />
              <Item label="Next.js" value="16" />
              <Dot />
              <Item label="LangChain" value="0.3" />
              <Dot />
              <Item label="Qdrant" value="1.x" />
              <Dot />
              <Item label="Kubernetes" value="1.30" />
              <Dot />
              <Item label="Postgres" value="16" />
              <Dot />
              <Item label="Azure AI" value="prod" />
              <Dot />
              <Item label="5" value="years production ML" reverse />
              <Dot />
              <Item label="2" value="UCLouvain degrees" reverse />
              <Dot />
              <Item label="0" value="demos, only systems" reverse />
              <Dot />
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────── En clair — for humans ──────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-28">
        <div className="mb-14 flex items-baseline justify-between">
          <h2 className="serif-display text-[clamp(2rem,5vw,3.75rem)]">
            <span style={{ color: "var(--stone)" }}>§ </span>
            Trois choses,
            <br />
            <span
              className="serif-italic"
              style={{ color: "var(--moss-deep)" }}
            >
              en clair.
            </span>
          </h2>
          <span className="mono hidden text-[10px] uppercase tracking-[0.35em] text-[var(--stone)] md:block">
            Chapter i · pour les humains
          </span>
        </div>

        <div className="grid gap-px border border-[var(--hairline)] md:grid-cols-3">
          {PLAIN_LANGUAGE.map((f, i) => (
            <article
              key={f.title}
              className="ledger-card group p-8 transition-colors md:p-10"
              style={{ background: "var(--cream-deep)" }}
            >
              <div className="mono mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-[var(--stone)]">
                <span>Page</span>
                <span className="row-num">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
              </div>
              <h3 className="serif whitespace-pre-line text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium leading-[1.1]">
                {f.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-[var(--ink-soft)]">
                {f.body}
              </p>
              <div className="mono mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--moss-deep)]">
                <span className="block h-px w-6 bg-[var(--moss-deep)]" />
                {f.example}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ──────────────────── Services — tech detail ──────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="mb-14 flex items-baseline justify-between">
          <h2 className="serif-display text-[clamp(2rem,5vw,3.75rem)]">
            Et côté{" "}
            <span className="serif-italic" style={{ color: "var(--rust)" }}>
              atelier
            </span>
            ,
            <br />
            la stack.
          </h2>
          <span className="mono hidden text-[10px] uppercase tracking-[0.35em] text-[var(--stone)] md:block">
            Chapter ii · stack & services
          </span>
        </div>

        <div className="grid gap-px border border-[var(--hairline)] md:grid-cols-3">
          {SERVICES.map((f, i) => (
            <article
              key={f.title}
              className="ledger-card group p-8 transition-colors md:p-10"
              style={{ background: "var(--cream-deep)" }}
            >
              <div className="mono mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-[var(--stone)]">
                <span>Entry</span>
                <span className="row-num">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
              </div>
              <h3 className="serif whitespace-pre-line text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.05]">
                {f.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-[var(--ink-soft)]">
                {f.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {f.tags.map(t => (
                  <span
                    key={t}
                    className="mono border border-[var(--hairline)] px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-[var(--ink-soft)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ──────────────────── Projects — ledger preview ──────────────────── */}
      <section
        id="projects"
        className="mx-auto max-w-6xl px-6 pb-28 md:px-12 md:pb-40"
      >
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="serif-display text-[clamp(2rem,5vw,3.5rem)]">
            Un{" "}
            <span className="serif-italic" style={{ color: "var(--rust)" }}>
              folio
            </span>
            ,
            <br /> pas un CV.
          </h2>
          <span className="mono hidden text-[10px] uppercase tracking-[0.35em] text-[var(--stone)] md:block">
            Chapter iii · shipped · 2023—2026
          </span>
        </div>

        <div className="border border-[var(--ink)] shadow-[8px_8px_0_var(--moss-deep)]">
          <div
            className="mono flex items-center justify-between border-b border-[var(--ink)] px-4 py-2 text-[10px] uppercase tracking-[0.25em] md:px-8"
            style={{ background: "var(--ink)", color: "var(--cream)" }}
          >
            <span>Portfolio / Shipped · 2023 — 2026</span>
            <span>Folio № 05</span>
          </div>

          <div className="bg-[var(--cream)]">
            {PROJECTS.map(p => (
              <ProjectRow key={p.name} {...p} />
            ))}
            <div className="mono grid grid-cols-12 gap-4 border-t-2 border-[var(--ink)] px-4 py-5 text-[13px] uppercase tracking-[0.1em] md:px-8">
              <div className="col-span-6 md:col-span-7">
                <span className="serif-italic text-[18px] normal-case tracking-normal">
                  Total livrés
                </span>
              </div>
              <div className="row-num col-span-3 text-right tabular-nums text-[var(--stone)]">
                {PROJECTS.length} entrées
              </div>
              <div className="row-num col-span-3 text-right tabular-nums">
                <span style={{ color: "var(--moss-deep)" }}>depuis 2023</span>
              </div>
            </div>
          </div>
        </div>

        <p className="serif-italic mt-6 max-w-2xl text-[15px] text-[var(--ink-soft)]">
          « Chaque entrée du folio est en ligne, utilisée, maintenue. Pas de
          capture d&apos;écran Figma, pas de repo abandonné après la démo. »
        </p>
      </section>

      {/* ──────────────────── Experience — two ledgers ──────────────────── */}
      <section
        id="experience"
        className="mx-auto max-w-6xl px-6 pb-28 md:px-12 md:pb-40"
      >
        <div className="mb-12 flex items-baseline justify-between">
          <h2 className="serif-display text-[clamp(2rem,5vw,3.5rem)]">
            D&apos;où je{" "}
            <span
              className="serif-italic"
              style={{ color: "var(--moss-deep)" }}
            >
              viens
            </span>
            .
          </h2>
          <span className="mono hidden text-[10px] uppercase tracking-[0.35em] text-[var(--stone)] md:block">
            Chapter iv · background
          </span>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <ExperienceColumn
            title="Work"
            icon={<Briefcase className="size-4" />}
            entries={WORK}
            accent="var(--rust)"
          />
          <ExperienceColumn
            title="Education"
            icon={<GraduationCap className="size-4" />}
            entries={EDUCATION}
            accent="var(--moss-deep)"
          />
        </div>
      </section>

      {/* ──────────────────── Contact — dark slab with form ──────────────────── */}
      <ContactSlab />

      {/* ──────────────────── Footer ──────────────────── */}
      <footer className="mx-auto max-w-6xl px-6 py-12 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="serif text-[22px] leading-none">
              Huberty
              <span className="serif-italic" style={{ color: "var(--rust)" }}>
                .
              </span>
            </div>
            <p className="mono mt-2 text-[10px] uppercase tracking-[0.25em] text-[var(--stone)]">
              2026 · Brussels, Belgium · Independent
            </p>
          </div>
          <div className="mono flex flex-wrap items-center gap-6 text-[12px]">
            <a
              href="https://github.com/NicolasHuberty"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              <GithubGlyph size={12} /> github.com/NicolasHuberty
            </a>
            <Link
              href="/v1"
              className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              v1 · classic
            </Link>
            <Link
              href="/v2"
              className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              v2 · huberty.os
            </Link>
            <a
              href="mailto:nicolas.huberty@uclouvain.be"
              className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              Email
            </a>
          </div>
        </div>
        <div className="rule mt-8" />
        <p className="serif-italic mt-8 max-w-2xl text-[14px] text-[var(--stone)]">
          Folio № 03 — designed as a ledger. Typed on a cream page, set in
          Fraunces &amp; Geist. Fait à Bruxelles.
        </p>
      </footer>
    </div>
  )
}

/* ────────────────────────── DATA ────────────────────────── */

const PLAIN_LANGUAGE = [
  {
    title: "Je fais parler\nvos documents.",
    body: "Contrats, procédures, archives, rapports internes : posez une question en français, recevez une réponse qui cite la page exacte. Zéro copier-coller, rien n'est envoyé dans un cloud que vous ne contrôlez pas.",
    example: "Ex. eMate · recherche juridique en 2 min",
  },
  {
    title: "J'automatise les tâches\nqui vous épuisent.",
    body: "Factures à relancer, emails à trier, rapports hebdo à compiler, extractions de données. Un logiciel le fait à votre place, 24h/24, sans erreur de fatigue. Vous gardez la main sur les exceptions.",
    example: "Ex. Smals · 100 % d'automatisation du reporting",
  },
  {
    title: "Je construis l'outil\nqui vous manque.",
    body: "Site vitrine, portail client, app métier, petit SaaS. Du design à la mise en ligne, en une seule main. Vous parlez à une personne du début à la fin — pas à six interlocuteurs d'une agence.",
    example: "Ex. SWET · ERP Odoo pour un producteur artisanal",
  },
]

const SERVICES = [
  {
    title: "RAG & agents\nsouverains.",
    body: "Pipelines RAG, agents MCP, fine-tuning domaine. Citations par défaut, data on your box — Azure, on-prem ou VPS. Déjà en production : legal tech, healthcare, doc search.",
    tags: ["RAG", "MCP", "LangChain", "Fine-tuning"],
  },
  {
    title: "Data\n& infrastructure.",
    body: "Data Vault, dbt, pipelines Spark, Kubernetes, Terraform, GitOps. De l'ingestion aux dashboards Grafana. 99.9 % d'uptime, déploiements reproductibles, governance stricte.",
    tags: ["dbt", "Kubernetes", "Terraform", "PostgreSQL"],
  },
  {
    title: "Produit\n& web.",
    body: "Next.js, FastAPI, TypeScript, Tailwind. Du MVP à la scale, avec le design qui va avec. Portails clients, SaaS internes, sites cliniques — livrés entiers, pas en pièces détachées.",
    tags: ["Next.js", "FastAPI", "TypeScript", "Design"],
  },
]

const PROJECTS = [
  {
    name: "eMate",
    category: "Recherche juridique agentique · 2025",
    stack: "Nuxt · Python · Qdrant · Docker",
    year: "2025",
    status: "Online" as const,
    href: "https://emate.be",
  },
  {
    name: "Docuralis",
    category: "Plateforme d'IA agentique · au-delà du RAG",
    stack: "Python · LangChain · MCP · APIs",
    year: "2025",
    status: "Online" as const,
    href: "https://docuralis.com",
  },
  {
    name: "Ratio",
    category: "Débat pondéré · fact-check par IA",
    stack: "Next.js · Prisma · Claude · Better-Auth",
    year: "2025",
    status: "Online" as const,
    href: "https://ratio.huberty.pro",
  },
  {
    name: "Louise Huberty",
    category: "Site clinique · logopède",
    stack: "Next.js · Tailwind · Framer Motion",
    year: "2025",
    status: "Online" as const,
    href: "https://louise.huberty.pro",
  },
  {
    name: "SWET",
    category: "ERP Odoo · producteur artisanal",
    stack: "Odoo · PostgreSQL · Odoo.sh",
    year: "2023",
    status: "Online" as const,
    href: "https://www.swet.be",
  },
  {
    name: "ILA",
    category: "NER clinique · dé-identification · mémoire",
    stack: "Fine-tuned LLMs · NER · Privacy",
    year: "2024",
    status: "Archived" as const,
    href: "https://youtu.be/PJTIBT_-VHk",
  },
]

type ExperienceEntry = {
  role: string
  company: string
  period: string
  plain: string
  tags: string[]
  href?: string
}

const WORK: ExperienceEntry[] = [
  {
    role: "AI Engineer",
    company: "UCLouvain",
    period: "2025 —",
    plain:
      "Lead IA de l'université. Plateforme model-agnostic, pipelines RAG souverains, mise en production à l'échelle académique. En clair : une IA qui parle à toutes les données de la fac, sans vendor lock-in.",
    tags: ["Azure AI", "RAG", "LLMs", "Python"],
    href: "/experience/uclouvain-ai",
  },
  {
    role: "Data Engineer",
    company: "Smals · ONEM",
    period: "2024 — 2025",
    plain:
      "Pipelines ETL & Data Vault pour l'office national de l'emploi. 100 % d'automatisation du reporting, −40 % de temps de requête, 99 % d'anomalies captées. Donnée nationale, donnée propre.",
    tags: ["DBT", "Airflow", "SQL", "Power BI"],
    href: "/experience/smals",
  },
]

const EDUCATION: ExperienceEntry[] = [
  {
    role: "MSc Computer Science",
    company: "UCLouvain · Distinction",
    period: "2022 — 2024",
    plain:
      "AI × Cybersecurity. Mémoire : dé-identification de documents cliniques. Pour construire des IA qui respectent la vie privée par design, pas après coup.",
    tags: ["AI", "RGPD", "NER", "Privacy"],
    href: "/experience/uclouvain-master",
  },
  {
    role: "BSc Computer Science",
    company: "UCLouvain · Minor Entrepreneurship",
    period: "2019 — 2022",
    plain:
      "Fondations solides en algorithmes et systèmes + minor Esprit d'Entreprendre. Pour toujours commencer par le pourquoi avant le comment.",
    tags: ["Algorithms", "Systems", "Entrepreneurship"],
    href: "/experience/uclouvain-bachelor",
  },
]

/* ────────────────────────── COMPONENTS ────────────────────────── */

function ExperienceColumn({
  title,
  icon,
  entries,
  accent,
}: {
  title: string
  icon: React.ReactNode
  entries: ExperienceEntry[]
  accent: string
}) {
  return (
    <div>
      <div className="mono mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--ink-soft)]">
        <span style={{ color: accent }}>{icon}</span>
        {title}
      </div>
      <div className="border border-[var(--hairline)] bg-[var(--cream-deep)]">
        {entries.map((e, i) => (
          <ExperienceRow
            key={`${e.company}-${i}`}
            entry={e}
            accent={accent}
            last={i === entries.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function ExperienceRow({
  entry,
  accent,
  last,
}: {
  entry: ExperienceEntry
  accent: string
  last: boolean
}) {
  const Wrapper = (p: { children: React.ReactNode }) =>
    entry.href ? (
      <Link
        href={entry.href}
        className="group block px-5 py-6 transition-colors hover:bg-[var(--cream)] md:px-7 md:py-7"
      >
        {p.children}
      </Link>
    ) : (
      <div className="px-5 py-6 md:px-7 md:py-7">{p.children}</div>
    )

  return (
    <div className={last ? "" : "border-b border-[var(--hairline)]"}>
      <Wrapper>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <div className="serif text-[18px] leading-tight">{entry.role}</div>
          <div className="mono shrink-0 text-[10px] uppercase tracking-[0.2em] text-[var(--stone)]">
            {entry.period}
          </div>
        </div>
        <div className="serif-italic text-[14px]" style={{ color: accent }}>
          {entry.company}
        </div>
        <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--ink-soft)]">
          {entry.plain}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map(t => (
            <span
              key={t}
              className="mono border border-[var(--hairline)] px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.15em] text-[var(--ink-soft)]"
            >
              {t}
            </span>
          ))}
        </div>
        {entry.href && (
          <div className="mono mt-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-soft)] transition-all group-hover:gap-2 group-hover:text-[var(--ink)]">
            Lire le détail <ArrowUpRight className="size-3" />
          </div>
        )}
      </Wrapper>
    </div>
  )
}

function ContactSlab() {
  const [form, setForm] = useState({ name: "", email: "", brief: "" })
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Brief de ${form.name || "un visiteur"}`
    const body = `De : ${form.name} <${form.email}>\n\n${form.brief}`
    window.location.href = `mailto:nicolas.huberty@uclouvain.be?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-y-2 px-6 py-24 md:px-12 md:py-32"
      style={{
        borderColor: "var(--ink)",
        background: "var(--moss-deep)",
        color: "var(--cream)",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:items-start">
        <div className="md:col-span-6">
          <div className="mb-8 flex items-center gap-3">
            <Sparkles className="size-4" style={{ color: "var(--rust)" }} />
            <span className="mono text-[var(--cream)]/80 text-[10px] uppercase tracking-[0.35em]">
              Chapter v · booked — next slot Q4 2026
            </span>
          </div>
          <h2 className="serif-display text-[clamp(2.5rem,7vw,5.5rem)]">
            Votre problème.
            <br />
            <span className="serif-italic" style={{ color: "var(--rust)" }}>
              Mon code.
            </span>{" "}
            Votre stack.
          </h2>
          <p className="text-[var(--cream)]/75 mt-8 max-w-xl text-[16px] leading-[1.6]">
            Une idée à valider, un document à faire parler, un produit à faire
            décoller ? Envoyez-moi deux paragraphes. Réponse sous 48 h, proposal
            écrit sous une semaine, premier commit sous deux.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px]">
            <a
              href="mailto:nicolas.huberty@uclouvain.be"
              className="serif-italic text-[var(--rust)] underline underline-offset-4"
            >
              nicolas.huberty@uclouvain.be
            </a>
            <a
              href="https://github.com/NicolasHuberty"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--cream)]/80 inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-[var(--cream)]"
            >
              <GithubGlyph size={13} /> github.com/NicolasHuberty
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas-huberty-a1068723b"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--cream)]/80 underline underline-offset-4 hover:text-[var(--cream)]"
            >
              in/nicolas-huberty
            </a>
          </div>
        </div>

        <div className="md:col-span-6">
          <form
            onSubmit={onSubmit}
            className="border-[var(--cream)]/20 border bg-[color:rgba(245,239,227,0.04)] p-6 md:p-8"
            style={{ backdropFilter: "blur(3px)" }}
          >
            <div className="mono text-[var(--cream)]/60 mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.25em]">
              <span>brief · 03 champs</span>
              <span>~/huberty/brief</span>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mono text-[var(--cream)]/60 block text-[10px] uppercase tracking-[0.22em]"
                >
                  01 · Votre nom
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="field-input"
                  placeholder="Jane Dupont"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mono text-[var(--cream)]/60 block text-[10px] uppercase tracking-[0.22em]"
                >
                  02 · Email pour la réponse
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="field-input"
                  placeholder="jane@entreprise.be"
                />
              </div>
              <div>
                <label
                  htmlFor="brief"
                  className="mono text-[var(--cream)]/60 block text-[10px] uppercase tracking-[0.22em]"
                >
                  03 · Votre brief · 2 paragraphes
                </label>
                <textarea
                  id="brief"
                  required
                  value={form.brief}
                  onChange={e => setForm({ ...form, brief: e.target.value })}
                  className="field-input"
                  placeholder="Le problème à résoudre, votre contrainte principale, et l'échéance si elle existe."
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="submit"
                className="hover:shadow-[0_4px_0_var(--cream)]/20 inline-flex items-center gap-2 border border-[var(--rust)] bg-[var(--rust)] px-5 py-2.5 text-[13px] text-[var(--cream)] transition-all hover:translate-y-[-2px]"
              >
                Envoyer le brief <Send className="size-3.5" />
              </button>
              <a
                href="mailto:nicolas.huberty@uclouvain.be?subject=Hello"
                className="serif-italic text-[var(--cream)]/70 text-[13px] underline underline-offset-4 hover:text-[var(--cream)]"
              >
                ou juste dire bonjour
              </a>
            </div>

            {sent && (
              <p className="mono mt-5 text-[11px] uppercase tracking-[0.2em] text-[var(--rust)]">
                ✓ client mail ouvert — envoyez pour confirmer
              </p>
            )}
          </form>

          <p className="mono text-[var(--cream)]/50 mt-6 text-[11px] uppercase tracking-[0.22em]">
            aucune donnée stockée · aucun analytics · mailto direct
          </p>
        </div>
      </div>
    </section>
  )
}

function ProjectRow({
  name,
  category,
  stack,
  year,
  status,
  href,
}: {
  name: string
  category: string
  stack: string
  year: string
  status: "Online" | "Archived"
  href: string
}) {
  const statusColor = status === "Online" ? "var(--moss-deep)" : "var(--stone)"
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="grid grid-cols-12 items-baseline gap-4 border-b border-[var(--hairline)] px-4 py-4 text-[13px] transition-colors hover:bg-[var(--cream-deep)] md:px-8"
    >
      <div className="col-span-12 md:col-span-5">
        <div className="serif text-[16px]">
          {name}{" "}
          <ArrowUpRight className="inline size-3.5 text-[var(--stone)]" />
        </div>
        <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--stone)]">
          {category}
        </div>
      </div>
      <div className="mono col-span-8 text-[11px] text-[var(--ink-soft)] md:col-span-4 md:text-right">
        <span className="text-[var(--stone)]/60 block text-[9px] uppercase tracking-[0.2em] md:hidden">
          Stack
        </span>
        {stack}
      </div>
      <div className="mono col-span-4 text-right tabular-nums text-[var(--stone)] md:col-span-1">
        <span className="text-[var(--stone)]/60 block text-[9px] uppercase tracking-[0.2em] md:hidden">
          Year
        </span>
        {year}
      </div>
      <div
        className="mono col-span-12 text-right text-[12px] font-medium uppercase tabular-nums tracking-[0.15em] md:col-span-2"
        style={{ color: statusColor }}
      >
        <span className="text-[var(--stone)]/60 block text-[9px] uppercase tracking-[0.2em] md:hidden">
          Status
        </span>
        {status}
      </div>
    </a>
  )
}

function Item({
  label,
  value,
  reverse,
}: {
  label: string
  value: string
  reverse?: boolean
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={reverse ? "text-[var(--rust)]" : "text-[var(--ink-soft)]"}
      >
        {reverse ? label : value}
      </span>
      <span
        className={reverse ? "text-[var(--ink-soft)]" : "text-[var(--stone)]"}
      >
        {reverse ? value : label}
      </span>
    </div>
  )
}

function Dot() {
  return (
    <span
      className="size-1.5 rounded-full"
      style={{ background: "var(--stone)" }}
    />
  )
}

function GithubGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden
      fill="currentColor"
      className="inline-block"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}
