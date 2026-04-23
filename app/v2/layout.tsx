import type { Metadata } from "next"
import { Inter_Tight, JetBrains_Mono, Fraunces } from "next/font/google"
import "./v2.css"
import { OSThemeProvider } from "@/lib/v2/theme"
import { WMProvider } from "@/lib/v2/wm"

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
})
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nicolas Huberty — AI Engineer (huberty.os)",
  description:
    "An AI engineer's portfolio, built as a desktop OS. Work, writing, and a terminal you can actually use.",
  robots: { index: true, follow: true },
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${interTight.variable} ${jetbrains.variable} ${fraunces.variable} os-root`}
    >
      <OSThemeProvider>
        <WMProvider>{children}</WMProvider>
      </OSThemeProvider>
    </div>
  )
}
