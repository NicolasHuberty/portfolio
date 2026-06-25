"use client"

import { Reveal } from "./reveal"

const STACK: Record<string, string[]> = {
  AI: ["Python", "PyTorch", "LangChain", "LangGraph", "Hugging Face", "OpenAI"],
  Data: ["PostgreSQL", "Qdrant", "Redis", "Kafka", "Airflow", "dbt"],
  Web: ["TypeScript", "Next.js", "Nuxt", "FastAPI", "React", "Tailwind"],
  Cloud: [
    "Docker",
    "Kubernetes",
    "Azure",
    "AWS",
    "Terraform",
    "GitHub Actions",
  ],
}

export function Stack() {
  const all = Object.values(STACK).flat()
  const per = Math.ceil(all.length / 3)
  const rows = [all.slice(0, per), all.slice(per, per * 2), all.slice(per * 2)]

  return (
    <section
      id="stack"
      data-section="stack"
      className="curtain-bg relative overflow-hidden py-28 text-white md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/10 to-navy/40" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
        <div className="animate-spin-slow h-[40rem] w-[40rem] rounded-full border border-white/10" />
        <div className="animate-spin-rev absolute h-[28rem] w-[28rem] rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-sm bg-sky" />
            The toolkit
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            One stack,{" "}
            <span className="font-serif italic text-sky">end to end.</span>
          </h2>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-white/60">
            From model training to the Kubernetes cluster it runs on — I own the
            whole pipeline, so nothing falls between the cracks.
          </p>
        </Reveal>

        {/* Category legend */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {Object.entries(STACK).map(([group, items]) => (
              <div key={group} className="flex items-baseline gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  {group}
                </span>
                <span className="font-mono text-[11px] text-white/25">
                  {items.length}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Marquee ticker */}
        <div className="marquee-mask mt-10 space-y-3">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className={`marquee ${ri % 2 === 1 ? "marquee-right" : "marquee-left"}`}
            >
              {[...row, ...row].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
