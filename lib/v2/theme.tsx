"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type Theme = "light" | "dark"

type ThemeApi = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggle: () => void
}

const Ctx = createContext<ThemeApi | null>(null)

const KEY = "huberty.os:theme"

export function OSThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Theme | null
      if (saved === "light" || saved === "dark") {
        setThemeState(saved)
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setThemeState("dark")
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-os-theme", theme)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggle = useCallback(
    () => setThemeState(t => (t === "light" ? "dark" : "light")),
    [],
  )

  const api = useMemo(
    () => ({ theme, setTheme, toggle }),
    [theme, setTheme, toggle],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useTheme must be used inside OSThemeProvider")
  return ctx
}
