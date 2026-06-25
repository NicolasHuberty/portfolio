import "./globals.css"

import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import { cn } from "@/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
  metadataBase: new URL("https://huberty.pro"),
  title: "Nicolas Huberty — AI & Software Engineer",
  description:
    "AI & software engineer in Brussels. I design, build, and ship production AI systems — RAG, fine-tuned LLMs, and agentic workflows that make professional work faster.",
  openGraph: {
    title: "Nicolas Huberty — AI & Software Engineer",
    description:
      "I design, build, and ship production AI — RAG pipelines, fine-tuned LLMs, and agentic workflows for organisations that need answers, not demos.",
    type: "website",
    locale: "en",
  },
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
      className={cn(geist.variable, geistMono.variable, instrument.variable)}
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
