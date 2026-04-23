// Minimal markdown renderer → HTML string.
// Supports: headings (# .. ######), bold **x**, italic *x*, inline code `x`,
// code blocks ```..```, unordered/ordered lists, links [x](y), blockquote >,
// hr ---, images ![alt](src), paragraphs.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function inline(s: string): string {
  // Escape first, then apply inline patterns using placeholders.
  let out = escapeHtml(s)

  // images ![alt](src)
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt, src) => {
    return `<img src="${src}" alt="${alt}" class="os-md-img" />`
  })

  // links [text](href)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
    const safe = href.replace(/"/g, "&quot;")
    return `<a href="${safe}" class="os-md-a" target="_blank" rel="noopener noreferrer">${text}</a>`
  })

  // inline code `x`
  out = out.replace(
    /`([^`]+)`/g,
    (_m, code) => `<code class="os-md-code">${code}</code>`,
  )

  // bold **x**
  out = out.replace(/\*\*([^*]+)\*\*/g, (_m, t) => `<strong>${t}</strong>`)

  // italic *x* (not **)
  out = out.replace(
    /(^|[^*])\*([^*\n]+)\*(?!\*)/g,
    (_m, pre, t) => `${pre}<em>${t}</em>`,
  )

  return out
}

export function renderMarkdown(src: string): string {
  const lines = src.split(/\r?\n/)
  const out: string[] = []
  let i = 0
  const headings: { level: number; text: string; id: string }[] = []

  function slug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  }

  while (i < lines.length) {
    const line = lines[i]

    // fenced code block
    if (/^```/.test(line)) {
      const lang = line.replace(/^```/, "").trim()
      i++
      const buf: string[] = []
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i])
        i++
      }
      i++ // skip closing
      const code = escapeHtml(buf.join("\n"))
      out.push(
        `<pre class="os-md-pre" data-lang="${escapeHtml(lang)}"><code>${code}</code></pre>`,
      )
      continue
    }

    // hr
    if (/^---+\s*$/.test(line)) {
      out.push(`<hr class="os-md-hr" />`)
      i++
      continue
    }

    // heading
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      const level = h[1].length
      const text = h[2]
      const id = slug(text)
      headings.push({ level, text, id })
      out.push(
        `<h${level} id="${id}" class="os-md-h os-md-h${level}">${inline(text)}</h${level}>`,
      )
      i++
      continue
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""))
        i++
      }
      out.push(
        `<blockquote class="os-md-bq">${inline(buf.join(" "))}</blockquote>`,
      )
      continue
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""))
        i++
      }
      out.push(
        `<ul class="os-md-ul">${items
          .map(it => `<li>${inline(it)}</li>`)
          .join("")}</ul>`,
      )
      continue
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""))
        i++
      }
      out.push(
        `<ol class="os-md-ol">${items
          .map(it => `<li>${inline(it)}</li>`)
          .join("")}</ol>`,
      )
      continue
    }

    // paragraph (until blank)
    if (line.trim() === "") {
      i++
      continue
    }

    const buf: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^>/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i])
    ) {
      buf.push(lines[i])
      i++
    }
    out.push(`<p class="os-md-p">${inline(buf.join(" "))}</p>`)
  }

  return out.join("\n")
}

export function extractHeadings(
  src: string,
): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = []
  const lines = src.split(/\r?\n/)
  let inCode = false
  for (const line of lines) {
    if (/^```/.test(line)) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      const text = h[2]
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
      headings.push({ level: h[1].length, text, id })
    }
  }
  return headings
}

// Plain-text rendering for terminal `cat` command.
export function renderMarkdownPlain(src: string): string {
  return src
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/^---+\s*$/gm, "────────────────────────")
}
