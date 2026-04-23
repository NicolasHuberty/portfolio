"use client"

import { useEffect, useState } from "react"
import Desktop from "@/components/v2/Desktop"
import MobileOS from "@/components/v2/MobileOS"

export default function V2Page() {
  const [mobile, setMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  if (mobile === null) return null
  return mobile ? <MobileOS /> : <Desktop />
}
