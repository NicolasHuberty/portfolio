import type { Metadata } from "next"
import { Fraunces, Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK"],
})

export const metadata: Metadata = {
  title: "Nicolas Huberty — AI Engineer · Folio № 03",
  description:
    "AI engineer in Brussels. Sovereign RAG, agentic AI, production ML and data infrastructure. UCLouvain × Smals × independent.",
}

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      {children}
    </div>
  )
}
