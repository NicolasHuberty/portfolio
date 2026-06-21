import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { getProject, projects } from "@/lib/projects-data"

export function generateStaticParams() {
  return projects.map(p => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = getProject(id)
  if (!project) return { title: "Project — Nicolas Huberty" }
  return {
    title: `${project.title} — Nicolas Huberty`,
    description: project.subtitle,
  }
}

/** Render simple **bold** markdown inline. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProject(id)
  if (!project) notFound()

  const live = project.status === "online"

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/#work"
            className="group flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to work
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span className="grid h-6 w-6 place-items-center rounded-md bg-blue text-[11px] font-bold text-white">
              NH
            </span>
            Nicolas Huberty
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-14">
        {/* Header */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink/45">
          <span className="h-2 w-2 rounded-sm bg-blue" />
          {project.category}
          <span
            className={`ml-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] tracking-wide ${
              live
                ? "bg-emerald-500/10 text-emerald-700"
                : "bg-ink/5 text-ink/50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                live ? "bg-emerald-500" : "bg-ink/30"
              }`}
            />
            {live ? "Live" : "Archived"}
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
          {project.title}
        </h1>
        <p className="font-serif-display mt-2 text-2xl italic text-blue md:text-3xl">
          {project.subtitle}
        </p>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70">
          <RichText text={project.description} />
        </p>

        {/* Impact + tech */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              Visit project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : null}
          <span className="rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink/60">
            {project.impact}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map(t => (
            <span
              key={t}
              className="rounded-full border border-blue/15 bg-blue/[0.04] px-3 py-1.5 text-sm text-blue"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Screenshots */}
        {project.screenshots.length > 0 ? (
          <div className="mt-14 space-y-6">
            {project.screenshots.map(src => (
              <figure
                key={src}
                className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_60px_rgba(24,73,139,0.08)]"
              >
                <div className="flex items-center gap-2 border-b border-ink/5 bg-[#f4f5f7] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </figure>
            ))}
          </div>
        ) : null}

        <div className="mt-16 border-t border-ink/5 pt-8">
          <Link
            href="/#work"
            className="group flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
        </div>
      </article>
    </main>
  )
}
