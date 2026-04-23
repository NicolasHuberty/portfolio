"use client"

import { useMemo, useState } from "react"
import { profile } from "@/lib/v2/data/profile"
import { useWM } from "@/lib/v2/wm"
import type { Win } from "@/lib/v2/wm"

type Slot = { year: number; month: number; day: number }

function monthGrid(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1)
  const startDay = (first.getDay() + 6) % 7 // monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

function availabilityFor(year: number, month: number) {
  // Map profile.availability q#_YYYY → boolean openness
  const quarter = Math.floor(month / 3) + 1
  const key = `q${quarter}_${year}`
  const raw = profile.availability[key] || "closed"
  const open = raw !== "booked" && raw !== "closed"
  return { raw, open }
}

export default function BookApp(_props: { win: Win }) {
  const now = new Date()
  const [baseMonth, setBaseMonth] = useState(now.getMonth())
  const [baseYear, setBaseYear] = useState(now.getFullYear())
  const [selected, setSelected] = useState<Slot | null>(null)
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [topic, setTopic] = useState("")
  const [work, setWork] = useState("")
  const { launch } = useWM()

  const nextMonth = baseMonth === 11 ? 0 : baseMonth + 1
  const nextYear = baseMonth === 11 ? baseYear + 1 : baseYear

  const months = useMemo(
    () => [
      { y: baseYear, m: baseMonth },
      { y: nextYear, m: nextMonth },
    ],
    [baseYear, baseMonth, nextYear, nextMonth],
  )

  const confirm = () => {
    if (!selected) return
    const subject = `[huberty.os] Call request — ${selected.year}-${String(selected.month + 1).padStart(2, "0")}-${String(selected.day).padStart(2, "0")}`
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Topic: ${topic}`,
      `Current work: ${work}`,
      ``,
      `Requested slot: ${selected.year}-${String(selected.month + 1).padStart(2, "0")}-${String(selected.day).padStart(2, "0")}`,
    ].join("\n")
    launch("mail", { subject, body })
  }

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
          <span className="opacity-60">availability · </span>
          <span style={{ fontFamily: "var(--os-mono)" }}>
            book a call with nicolas
          </span>
        </div>
        <div className="flex gap-1 text-[11px]">
          <button
            onClick={() => {
              if (baseMonth === 0) {
                setBaseMonth(11)
                setBaseYear(y => y - 1)
              } else {
                setBaseMonth(m => m - 1)
              }
            }}
            className="rounded px-2 py-1 hover:bg-black/5"
          >
            ‹ prev
          </button>
          <button
            onClick={() => {
              if (baseMonth === 11) {
                setBaseMonth(0)
                setBaseYear(y => y + 1)
              } else {
                setBaseMonth(m => m + 1)
              }
            }}
            className="rounded px-2 py-1 hover:bg-black/5"
          >
            next ›
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          {months.map(({ y, m }) => {
            const { raw, open } = availabilityFor(y, m)
            const cells = monthGrid(y, m)
            const name = new Date(y, m, 1).toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })
            return (
              <div key={`${y}-${m}`}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-[14px] font-medium">{name}</div>
                  <div
                    className="rounded px-1.5 py-0.5 text-[10px] uppercase tracking-widest"
                    style={{
                      background: open
                        ? "color-mix(in srgb, var(--os-ok) 18%, transparent)"
                        : "color-mix(in srgb, var(--os-ink) 10%, transparent)",
                      color: open ? "var(--os-ok)" : "var(--os-ink-muted)",
                      fontFamily: "var(--os-mono)",
                    }}
                  >
                    {raw}
                  </div>
                </div>

                <div
                  className="mb-1 grid grid-cols-7 gap-1 text-[10px] opacity-60"
                  style={{ fontFamily: "var(--os-mono)" }}
                >
                  {WEEKDAYS.map(d => (
                    <div key={d} className="text-center">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((d, i) => {
                    if (d === null) return <div key={i} />
                    const isSelected =
                      selected &&
                      selected.year === y &&
                      selected.month === m &&
                      selected.day === d
                    const isBooked = !open
                    return (
                      <button
                        key={i}
                        disabled={isBooked}
                        onClick={() =>
                          setSelected({ year: y, month: m, day: d })
                        }
                        className="flex aspect-square items-center justify-center rounded-[4px] border text-[11px] disabled:cursor-not-allowed"
                        style={{
                          borderColor: "transparent",
                          background: isSelected
                            ? "var(--os-accent)"
                            : isBooked
                              ? "var(--os-ink)"
                              : "color-mix(in srgb, var(--os-ok) 20%, transparent)",
                          color: isSelected
                            ? "#fff"
                            : isBooked
                              ? "var(--os-bg-window)"
                              : "var(--os-ink)",
                        }}
                      >
                        {d}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {selected && (
          <div
            className="space-y-3 border-t p-6"
            style={{ borderColor: "var(--os-ink-faint)" }}
          >
            <div
              className="text-[12px] opacity-60"
              style={{ fontFamily: "var(--os-mono)" }}
            >
              requested slot: {selected.year}-
              {String(selected.month + 1).padStart(2, "0")}-
              {String(selected.day).padStart(2, "0")}
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input label="Name" value={name} onChange={setName} />
              <Input label="Company" value={company} onChange={setCompany} />
              <Input label="Topic" value={topic} onChange={setTopic} />
              <Input label="Your work (link)" value={work} onChange={setWork} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelected(null)}
                className="rounded border px-3 py-1.5 text-[12px]"
                style={{ borderColor: "var(--os-ink-faint)" }}
              >
                cancel
              </button>
              <button
                onClick={confirm}
                className="rounded px-3 py-1.5 text-[12px] text-white"
                style={{ background: "var(--os-accent)" }}
              >
                confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <div
        className="mb-1 text-[10px] uppercase tracking-widest opacity-60"
        style={{ fontFamily: "var(--os-mono)" }}
      >
        {label}
      </div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border-b bg-transparent py-1 text-[13px] outline-none"
        style={{ borderColor: "var(--os-ink-faint)" }}
      />
    </label>
  )
}
