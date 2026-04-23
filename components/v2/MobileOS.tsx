"use client"

import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Mail,
  User as UserIcon,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { profile } from "@/lib/v2/data/profile"
import { projects } from "@/lib/v2/data/projects"
import { renderMarkdown } from "@/lib/v2/md"

type View =
  | { kind: "home" }
  | { kind: "about" }
  | { kind: "work" }
  | { kind: "project"; id: string }
  | { kind: "stack" }
  | { kind: "contact" }
  | { kind: "book" }

export default function MobileOS() {
  const [view, setView] = useState<View>({ kind: "home" })

  const goHome = () => setView({ kind: "home" })

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "var(--os-bg)", color: "var(--os-ink)" }}
    >
      <header
        className="sticky top-0 z-20 flex h-12 items-center border-b px-4 backdrop-blur-md"
        style={{
          borderColor: "var(--os-ink-faint)",
          background: "color-mix(in srgb, var(--os-bg) 85%, transparent)",
        }}
      >
        {view.kind !== "home" ? (
          <button
            onClick={goHome}
            className="flex items-center gap-1 text-[13px]"
          >
            <ArrowLeft className="h-4 w-4" />
            back
          </button>
        ) : (
          <div
            className="text-[12px] opacity-60"
            style={{ fontFamily: "var(--os-mono)" }}
          >
            huberty.os · mobile
          </div>
        )}
        <div className="flex-1" />
        <Link href="/" className="text-[12px] underline">
          exit
        </Link>
      </header>

      <main className="flex-1">
        {view.kind === "home" && <Home onPick={setView} />}
        {view.kind === "about" && <AboutView />}
        {view.kind === "work" && (
          <WorkView onPick={id => setView({ kind: "project", id })} />
        )}
        {view.kind === "project" && <ProjectView id={view.id} />}
        {view.kind === "stack" && <StackView />}
        {view.kind === "contact" && <ContactView />}
        {view.kind === "book" && <BookView />}
      </main>

      <footer
        className="border-t px-4 py-6 text-[11px] opacity-50"
        style={{
          borderColor: "var(--os-ink-faint)",
          fontFamily: "var(--os-mono)",
        }}
      >
        terminal available on desktop.
      </footer>
    </div>
  )
}

function Home({ onPick }: { onPick: (v: View) => void }) {
  const tiles: {
    label: string
    view: View
    icon: React.ReactNode
    color: string
  }[] = [
    {
      label: "About",
      view: { kind: "about" },
      icon: <UserIcon className="h-5 w-5" />,
      color: "#8ab2ff",
    },
    {
      label: "Work",
      view: { kind: "work" },
      icon: <Briefcase className="h-5 w-5" />,
      color: "#ff5c8a",
    },
    {
      label: "Stack",
      view: { kind: "stack" },
      icon: <BookOpen className="h-5 w-5" />,
      color: "#f0c03f",
    },
    {
      label: "Contact",
      view: { kind: "contact" },
      icon: <Mail className="h-5 w-5" />,
      color: "#2dd86f",
    },
    {
      label: "Book",
      view: { kind: "book" },
      icon: <Calendar className="h-5 w-5" />,
      color: "#ff5c5c",
    },
  ]
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1
          className="text-[32px] leading-tight"
          style={{ fontFamily: "var(--os-display)" }}
        >
          {profile.name}
        </h1>
        <div className="text-[13px] opacity-70">
          {profile.role} · {profile.location}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {tiles.map(t => (
          <button
            key={t.label}
            onClick={() => onPick(t.view)}
            className="flex flex-col items-start gap-6 rounded-[12px] border p-4 text-left"
            style={{
              borderColor: "var(--os-ink)",
              background: "var(--os-bg-window)",
              boxShadow: "4px 4px 0 var(--os-ink)",
            }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[8px] text-white"
              style={{ background: t.color }}
            >
              {t.icon}
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="font-medium">{t.label}</span>
              <ChevronRight className="h-4 w-4 opacity-50" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function AboutView() {
  const html = renderMarkdown(
    `# ${profile.name}\n\n*${profile.role} · ${profile.location}*\n\n${profile.bio}\n\n## Experience\n\n${profile.experience
      .map(e => `- **${e.role}** · ${e.org} (${e.years}) — ${e.blurb}`)
      .join("\n")}\n`,
  )
  return (
    <div className="os-md p-6">
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

function WorkView({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="space-y-3 p-6">
      {projects.map(p => (
        <button
          key={p.id}
          onClick={() => onPick(p.id)}
          className="w-full rounded-[10px] border p-4 text-left"
          style={{ borderColor: "var(--os-ink-faint)" }}
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="font-medium">{p.name}</span>
            <span
              className="rounded px-1.5 py-0.5 text-[10px] uppercase tracking-widest"
              style={{
                background:
                  p.status === "live"
                    ? "color-mix(in srgb, var(--os-ok) 20%, transparent)"
                    : "color-mix(in srgb, var(--os-ink) 10%, transparent)",
                color:
                  p.status === "live" ? "var(--os-ok)" : "var(--os-ink-muted)",
                fontFamily: "var(--os-mono)",
              }}
            >
              {p.status}
            </span>
          </div>
          <div className="text-[13px] opacity-70">{p.tagline}</div>
          <div
            className="mt-2 text-[11px] opacity-50"
            style={{ fontFamily: "var(--os-mono)" }}
          >
            {p.tags.join(" · ")}
          </div>
        </button>
      ))}
    </div>
  )
}

function ProjectView({ id }: { id: string }) {
  const p = projects.find(pp => pp.id === id)
  if (!p) return <div className="p-6 opacity-60">unknown project</div>
  const md = `# ${p.name}\n\n*${p.tagline}*\n\n**Stack:** ${p.stack.join(", ")}${p.url ? `\n\n**Live:** ${p.url}` : ""}\n\n## Problem\n\n${p.problem}\n\n## Approach\n\n${p.approach}\n\n## Outcome\n\n${p.outcome}`
  const html = renderMarkdown(md)
  return (
    <div className="os-md p-6">
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

function StackView() {
  return (
    <div className="space-y-5 p-6">
      {Object.entries(profile.stack).map(([group, items]) => (
        <div key={group}>
          <div
            className="mb-2 text-[11px] uppercase tracking-widest opacity-60"
            style={{ fontFamily: "var(--os-mono)" }}
          >
            {group}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {items.map(it => (
              <span
                key={it}
                className="rounded border px-2 py-0.5 text-[12px]"
                style={{ borderColor: "var(--os-ink-faint)" }}
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ContactView() {
  return (
    <div className="space-y-4 p-6">
      <p className="text-[14px]">The fastest way is email.</p>
      <a
        href={profile.links.email}
        className="inline-block rounded px-4 py-2 text-white"
        style={{ background: "var(--os-accent)" }}
      >
        {profile.email}
      </a>
      <div className="space-y-1 pt-4 text-[13px]">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block underline"
        >
          GitHub →
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block underline"
        >
          LinkedIn →
        </a>
      </div>
    </div>
  )
}

function BookView() {
  return (
    <div className="space-y-4 p-6 text-[14px]">
      <p>Availability:</p>
      <ul className="space-y-1" style={{ fontFamily: "var(--os-mono)" }}>
        {Object.entries(profile.availability).map(([k, v]) => (
          <li key={k}>
            <span className="opacity-60">{k}: </span>
            <span
              style={{
                color: v === "booked" ? "var(--os-err)" : "var(--os-ok)",
              }}
            >
              {v}
            </span>
          </li>
        ))}
      </ul>
      <p className="opacity-70">To request a slot, send an email:</p>
      <a
        href={`mailto:${profile.email}?subject=Book%20a%20call`}
        className="inline-block rounded px-4 py-2 text-white"
        style={{ background: "var(--os-accent)" }}
      >
        request a call
      </a>
    </div>
  )
}
