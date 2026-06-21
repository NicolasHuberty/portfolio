import "./globals.css"

import type { Metadata, Viewport } from "next"
import { Geist, Instrument_Serif } from "next/font/google"

import { cn } from "@/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nicolas Huberty — AI Engineer",
  description:
    "AI Engineer in Brussels. I design, build, and ship production AI systems — RAG, fine-tuned LLMs, and agentic workflows that make professional work faster.",
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fefefe",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geist.variable, instrument.variable)}
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
