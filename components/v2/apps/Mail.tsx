"use client"

import { useState } from "react"
import { profile } from "@/lib/v2/data/profile"
import type { Win } from "@/lib/v2/wm"

export default function MailApp({ win }: { win: Win }) {
  const initialSubject = (win.props?.subject as string) || ""
  const initialBody = (win.props?.body as string) || ""
  const [from, setFrom] = useState("")
  const [subject, setSubject] = useState(initialSubject)
  const [body, setBody] = useState(initialBody)
  const [toast, setToast] = useState<string | null>(null)

  const sendMailto = () => {
    const to = encodeURIComponent(profile.email)
    const s = encodeURIComponent(subject)
    const b = encodeURIComponent((from ? `From: ${from}\n\n` : "") + body)
    window.location.href = `mailto:${to}?subject=${s}&body=${b}`
  }

  const saveDraft = () => {
    setToast("saved to /home/nicolas/drafts/")
    setTimeout(() => setToast(null), 1800)
  }

  const subjLower = subject.toLowerCase()
  const subjectHint =
    subjLower.includes("crypto") ||
    subjLower.includes("nft") ||
    subjLower.includes("web3")
      ? "(I will politely decline.)"
      : subjLower.includes("free") || subjLower.includes("exposure")
        ? "('exposure' does not pay for rent in Brussels.)"
        : subjLower.includes("urgent") || subjLower.includes("asap")
          ? "(everything is urgent. let's chat anyway.)"
          : subjLower.includes("hire") ||
              subjLower.includes("project") ||
              subjLower.includes("rag") ||
              subjLower.includes("agent")
            ? "(excellent choice. details help.)"
            : subjLower.includes("meeting") && subjLower.includes("minutes")
              ? "(MeetYourNotes did it locally, and on-device.)"
              : null

  return (
    <div
      className="flex h-full flex-col"
      style={{ fontFamily: "var(--os-ui)" }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: "var(--os-ink-faint)" }}
      >
        <div className="text-[13px]">
          <span className="opacity-60">new message to </span>
          <span style={{ fontFamily: "var(--os-mono)" }}>{profile.email}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={saveDraft}
            className="rounded border px-3 py-1 text-[12px] hover:bg-black/5"
            style={{ borderColor: "var(--os-ink-faint)" }}
          >
            save draft
          </button>
          <button
            onClick={sendMailto}
            className="rounded px-3 py-1 text-[12px] text-white"
            style={{ background: "var(--os-accent)" }}
          >
            send
          </button>
        </div>
      </div>

      <div
        className="space-y-2 border-b px-4 py-3"
        style={{ borderColor: "var(--os-ink-faint)" }}
      >
        <Field label="From">
          <input
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-transparent text-[13px] outline-none"
          />
        </Field>
        <Field label="Subject">
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Project for Nicolas"
            className="w-full bg-transparent text-[13px] outline-none"
          />
        </Field>
        {subjectHint && (
          <div
            className="pl-[76px] text-[11px] italic opacity-60"
            style={{ fontFamily: "var(--os-mono)" }}
          >
            {subjectHint}
          </div>
        )}
      </div>

      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Say hello, describe what you're building, mention a timeline."
        className="flex-1 bg-transparent p-6 italic outline-none"
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 15,
          color: "var(--os-ink)",
          resize: "none",
        }}
      />

      {toast && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded px-3 py-1.5 text-[12px] text-white"
          style={{ background: "var(--os-ink)" }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-16 text-[11px] uppercase tracking-widest opacity-60"
        style={{ fontFamily: "var(--os-mono)" }}
      >
        {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  )
}
