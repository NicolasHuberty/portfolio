"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

interface SidebarContextType {
  isExpanded: boolean
  setIsExpanded: (value: boolean) => void
  isScrolledPastHero: boolean
  shouldShowSidebar: boolean
}

const SidebarContext = createContext<SidebarContextType>({
  isExpanded: false,
  setIsExpanded: () => {},
  isScrolledPastHero: false,
  shouldShowSidebar: false,
})

export function useSidebar() {
  return useContext(SidebarContext)
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", latest => {
    if (!mounted) return
    const heroThreshold = window.innerHeight * 0.7
    setIsScrolledPastHero(latest > heroThreshold)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldShowSidebar = isExpanded || isScrolledPastHero

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        setIsExpanded,
        isScrolledPastHero,
        shouldShowSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
