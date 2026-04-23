"use client"

import { useMemo, useRef } from "react"
import { read, resolve } from "@/lib/v2/fs"
import { extractHeadings, renderMarkdown } from "@/lib/v2/md"
import type { Win } from "@/lib/v2/wm"

export default function ReadmeApp({ win }: { win: Win }) {
  const path = (win.props?.path as string) || "/home/nicolas/about.md"
  const node = resolve(path)
  const fsContent = read(path)
  // Transient docs (e.g. easter-eggs.md) may be injected via sessionStorage.
  const sessionContent =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem(`huberty.os:readme:${path}`)
      : null
  const content = fsContent ?? sessionContent
  const contentRef = useRef<HTMLDivElement>(null)

  const isMd = useMemo(() => {
    if (node && node.kind === "file") return node.mime === "md"
    return path.endsWith(".md")
  }, [node, path])

  const isJson = useMemo(() => {
    if (node && node.kind === "file") return node.mime === "json"
    return path.endsWith(".json")
  }, [node, path])

  const headings = useMemo(() => {
    if (isMd && content) return extractHeadings(content)
    return []
  }, [isMd, content])

  const html = useMemo(() => {
    if (isMd && content) return renderMarkdown(content)
    return ""
  }, [isMd, content])

  if (!content) {
    return (
      <div
        className="p-6 text-sm opacity-60"
        style={{ fontFamily: "var(--os-ui)" }}
      >
        <div className="mb-2 font-medium">File not found</div>
        <div style={{ fontFamily: "var(--os-mono)" }}>{path}</div>
      </div>
    )
  }

  return (
    <div className="flex h-full" style={{ fontFamily: "var(--os-ui)" }}>
      <div
        ref={contentRef}
        className="os-md flex-1 overflow-auto px-8 py-6"
        style={{ maxWidth: "100%" }}
      >
        {isMd ? (
          <article dangerouslySetInnerHTML={{ __html: html }} />
        ) : isJson ? (
          <pre
            className="whitespace-pre-wrap break-all text-[12px]"
            style={{ fontFamily: "var(--os-mono)" }}
          >
            {content}
          </pre>
        ) : (
          <pre
            className="whitespace-pre-wrap text-[13px]"
            style={{ fontFamily: "var(--os-mono)" }}
          >
            {content}
          </pre>
        )}
      </div>

      {isMd && headings.length > 2 && (
        <aside
          className="hidden w-[180px] overflow-auto border-l px-3 py-6 text-[12px] md:block"
          style={{
            borderColor: "var(--os-ink-faint)",
            fontFamily: "var(--os-mono)",
          }}
        >
          <div className="mb-2 text-[10px] uppercase tracking-widest opacity-60">
            contents
          </div>
          {headings.map(h => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault()
                const el = contentRef.current?.querySelector(
                  `#${h.id}`,
                ) as HTMLElement | null
                if (el && contentRef.current) {
                  contentRef.current.scrollTo({
                    top: el.offsetTop - 12,
                    behavior: "smooth",
                  })
                }
              }}
              className="block py-0.5 hover:underline"
              style={{ paddingLeft: (h.level - 1) * 8 }}
            >
              {h.text}
            </a>
          ))}
        </aside>
      )}
    </div>
  )
}
