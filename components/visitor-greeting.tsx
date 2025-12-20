"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface VisitorInfo {
  city?: string
  region?: string
  country?: string
  country_code?: string
  timezone?: string
  isp?: string
  lat?: number
  lon?: number
  ip?: string
}

interface DeviceInfo {
  browser: string
  os: string
  device: string
  screenResolution: string
  language: string
}

export default function VisitorGreeting() {
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [greeting, setGreeting] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch visitor information
  useEffect(() => {
    // Get device info
    const getDeviceInfo = (): DeviceInfo => {
      const ua = navigator.userAgent

      let browser = "Unknown Browser"
      if (ua.includes("Firefox")) browser = "Firefox"
      else if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome"
      else if (ua.includes("Safari") && !ua.includes("Chrome"))
        browser = "Safari"
      else if (ua.includes("Edg")) browser = "Edge"

      let os = "Unknown OS"
      if (ua.includes("Windows")) os = "Windows"
      else if (ua.includes("Mac")) os = "macOS"
      else if (ua.includes("Linux")) os = "Linux"
      else if (ua.includes("Android")) os = "Android"
      else if (ua.includes("iOS")) os = "iOS"

      let device = "Desktop"
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua))
        device = "Tablet"
      else if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua,
        )
      )
        device = "Mobile"

      return {
        browser,
        os,
        device,
        screenResolution: `${screen.width}×${screen.height}`,
        language: navigator.language,
      }
    }

    // Fetch IP-based location
    const fetchVisitorInfo = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        setVisitorInfo({
          city: data.city,
          region: data.region,
          country: data.country_name,
          country_code: data.country_code,
          timezone: data.timezone,
          isp: data.org,
          lat: data.latitude,
          lon: data.longitude,
          ip: data.ip,
        })
      } catch (error) {
        console.error("Failed to fetch visitor info:", error)
      } finally {
        setLoading(false)
      }
    }

    setDeviceInfo(getDeviceInfo())
    fetchVisitorInfo()
  }, [])

  // Generate smart greeting
  useEffect(() => {
    if (!deviceInfo) return

    const hour = new Date().getHours()
    let timeGreeting = "Hello"
    let emoji = "👋"
    if (hour < 12) {
      timeGreeting = "Good morning"
      emoji = "☀️"
    } else if (hour < 18) {
      timeGreeting = "Good afternoon"
      emoji = "🌤️"
    } else if (hour < 22) {
      timeGreeting = "Good evening"
      emoji = "🌙"
    } else {
      timeGreeting = "Hello night owl"
      emoji = "🦉"
    }

    if (visitorInfo?.city && visitorInfo?.country) {
      setGreeting(
        `${timeGreeting}, visitor from ${visitorInfo.city}, ${visitorInfo.country}! ${emoji}`,
      )
    } else if (visitorInfo?.country) {
      setGreeting(
        `${timeGreeting}, visitor from ${visitorInfo.country}! ${emoji}`,
      )
    } else {
      setGreeting(`${timeGreeting}, ${deviceInfo.browser} user! ${emoji}`)
    }
  }, [visitorInfo, deviceInfo])

  if (loading) {
    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="animate-pulse space-y-3">
          <div className="h-8 w-3/4 rounded bg-slate-700"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 rounded-lg bg-slate-700"></div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (!visitorInfo && !deviceInfo) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/60 via-purple-950/40 to-emerald-950/60 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
        whileHover={{ scale: 1.01, borderColor: "rgba(59, 130, 246, 0.5)" }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative z-10">
          {/* Main Greeting */}
          <motion.h2
            className="mb-4 text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              {greeting}
            </span>
          </motion.h2>

          {/* Visitor Data Grid */}
          <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
            {visitorInfo?.city && (
              <motion.div
                className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/60 p-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                }}
              >
                <span className="text-xl">📍</span>
                <div className="flex-1">
                  <div className="mb-0.5 text-xs text-slate-500">Location</div>
                  <div className="font-semibold text-slate-200">
                    {visitorInfo.city}, {visitorInfo.country_code}
                  </div>
                </div>
              </motion.div>
            )}

            {deviceInfo && (
              <motion.div
                className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/60 p-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                }}
              >
                <span className="text-xl">💻</span>
                <div className="flex-1">
                  <div className="mb-0.5 text-xs text-slate-500">Device</div>
                  <div className="font-semibold text-slate-200">
                    {deviceInfo.device}
                  </div>
                </div>
              </motion.div>
            )}

            {deviceInfo?.browser && (
              <motion.div
                className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/60 p-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                }}
              >
                <span className="text-xl">🌐</span>
                <div className="flex-1">
                  <div className="mb-0.5 text-xs text-slate-500">Browser</div>
                  <div className="font-semibold text-slate-200">
                    {deviceInfo.browser}
                  </div>
                </div>
              </motion.div>
            )}

            {deviceInfo?.os && (
              <motion.div
                className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/60 p-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                }}
              >
                <span className="text-xl">🖥️</span>
                <div className="flex-1">
                  <div className="mb-0.5 text-xs text-slate-500">OS</div>
                  <div className="font-semibold text-slate-200">
                    {deviceInfo.os}
                  </div>
                </div>
              </motion.div>
            )}

            {visitorInfo?.timezone && (
              <motion.div
                className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/60 p-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                }}
              >
                <span className="text-xl">🕐</span>
                <div className="flex-1">
                  <div className="mb-0.5 text-xs text-slate-500">Timezone</div>
                  <div className="font-semibold text-slate-200">
                    {visitorInfo.timezone.split("/").pop()}
                  </div>
                </div>
              </motion.div>
            )}

            {deviceInfo?.screenResolution && (
              <motion.div
                className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/60 p-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                }}
              >
                <span className="text-xl">📐</span>
                <div className="flex-1">
                  <div className="mb-0.5 text-xs text-slate-500">Screen</div>
                  <div className="font-semibold text-slate-200">
                    {deviceInfo.screenResolution}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Privacy note */}
          <motion.div
            className="flex items-center gap-2 border-t border-slate-700/50 pt-3 text-xs text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span>🔒</span>
            <span>
              Detected via IP geolocation & browser APIs • No cookies required •
              All data shown above
            </span>
          </motion.div>

          {/* What Facebook Pixel CAN'T get */}
          <motion.div
            className="mt-3 rounded-lg border border-red-500/20 bg-red-950/20 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mb-1 text-xs font-semibold text-red-300">
              ⚠️ Facebook Pixel Reality:
            </div>
            <div className="space-y-0.5 text-xs text-slate-400">
              <div>❌ Cannot get your name</div>
              <div>❌ Cannot get your email</div>
              <div>❌ Cannot get your social profiles</div>
              <div className="mt-1 text-emerald-400">
                ✅ Can only get data shown above (legally!)
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
