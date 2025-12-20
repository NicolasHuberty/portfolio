"use client"

import { useEffect, useState } from "react"

interface VisitorInfo {
  city?: string
  region?: string
  country?: string
  timezone?: string
  isp?: string
  lat?: number
  lon?: number
}

interface DeviceInfo {
  browser: string
  os: string
  device: string
  screenResolution: string
  language: string
}

export default function SmartGreeting() {
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState("")
  const [facebookPixelDemo, setFacebookPixelDemo] = useState<string[]>([])

  useEffect(() => {
    // Get device info (always available)
    const getDeviceInfo = (): DeviceInfo => {
      const ua = navigator.userAgent

      // Detect browser
      let browser = "Unknown Browser"
      if (ua.includes("Firefox")) browser = "Firefox"
      else if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome"
      else if (ua.includes("Safari") && !ua.includes("Chrome"))
        browser = "Safari"
      else if (ua.includes("Edg")) browser = "Edge"

      // Detect OS
      let os = "Unknown OS"
      if (ua.includes("Windows")) os = "Windows"
      else if (ua.includes("Mac")) os = "macOS"
      else if (ua.includes("Linux")) os = "Linux"
      else if (ua.includes("Android")) os = "Android"
      else if (ua.includes("iOS")) os = "iOS"

      // Detect device type
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
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
      }
    }

    // Get IP-based location info
    const fetchVisitorInfo = async () => {
      try {
        // Using free IP geolocation API (no signup required)
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        setVisitorInfo({
          city: data.city,
          region: data.region,
          country: data.country_name,
          timezone: data.timezone,
          isp: data.org,
          lat: data.latitude,
          lon: data.longitude,
        })
      } catch (error) {
        console.error("Failed to fetch visitor info:", error)
        setVisitorInfo(null)
      } finally {
        setLoading(false)
      }
    }

    setDeviceInfo(getDeviceInfo())
    fetchVisitorInfo()
  }, [])

  useEffect(() => {
    if (!visitorInfo || !deviceInfo) return

    // Generate smart greeting based on available data
    const hour = new Date().getHours()
    let timeGreeting = "Hello"
    if (hour < 12) timeGreeting = "Good morning"
    else if (hour < 18) timeGreeting = "Good afternoon"
    else if (hour < 22) timeGreeting = "Good evening"
    else timeGreeting = "Hello night owl"

    // Create personalized greeting without knowing the name
    let personalizedGreeting = ""

    if (visitorInfo.city && visitorInfo.country) {
      personalizedGreeting = `${timeGreeting}, visitor from ${visitorInfo.city}, ${visitorInfo.country}! 🌍`
    } else if (visitorInfo.country) {
      personalizedGreeting = `${timeGreeting}, visitor from ${visitorInfo.country}! 🌍`
    } else {
      personalizedGreeting = `${timeGreeting}, ${deviceInfo.browser} user! 👋`
    }

    setGreeting(personalizedGreeting)

    // Simulate what Facebook Pixel WOULD send (but can't get back)
    setFacebookPixelDemo(
      [
        "✅ PageView event sent to Facebook",
        `✅ Device: ${deviceInfo.device} (${deviceInfo.os})`,
        `✅ Browser: ${deviceInfo.browser}`,
        `✅ Screen: ${deviceInfo.screenResolution}`,
        `✅ Language: ${deviceInfo.language}`,
        visitorInfo.country ? `✅ Country: ${visitorInfo.country}` : "",
        "❌ User's Name: NOT AVAILABLE",
        "❌ Facebook Profile: NOT AVAILABLE",
        "❌ Email: NOT AVAILABLE",
        "ℹ️  Facebook uses this data for ad targeting",
        "ℹ️  But YOU can't retrieve user identity",
      ].filter(Boolean),
    )
  }, [visitorInfo, deviceInfo])

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-6 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-20 rounded-lg bg-slate-800"></div>
          <div className="h-64 rounded-lg bg-slate-800"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-8">
      {/* Smart Greeting - The "WOW" Factor */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/50 to-blue-950/50 p-8">
        <div className="bg-grid-white/[0.02] absolute inset-0"></div>
        <div className="relative">
          <h1 className="mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
            {greeting}
          </h1>
          <p className="text-sm text-slate-400">
            No login required • No OAuth • Just smart detection
          </p>
        </div>
      </div>

      {/* What We Know About You */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-300">
            <span className="text-2xl">📍</span> Location Info
          </h3>
          <div className="space-y-2 text-sm">
            {visitorInfo?.city && (
              <div className="flex justify-between">
                <span className="text-slate-500">City:</span>
                <span className="font-medium text-slate-300">
                  {visitorInfo.city}
                </span>
              </div>
            )}
            {visitorInfo?.region && (
              <div className="flex justify-between">
                <span className="text-slate-500">Region:</span>
                <span className="font-medium text-slate-300">
                  {visitorInfo.region}
                </span>
              </div>
            )}
            {visitorInfo?.country && (
              <div className="flex justify-between">
                <span className="text-slate-500">Country:</span>
                <span className="font-medium text-slate-300">
                  {visitorInfo.country}
                </span>
              </div>
            )}
            {visitorInfo?.timezone && (
              <div className="flex justify-between">
                <span className="text-slate-500">Timezone:</span>
                <span className="font-medium text-slate-300">
                  {visitorInfo.timezone}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-300">
            <span className="text-2xl">💻</span> Device Info
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Browser:</span>
              <span className="font-medium text-slate-300">
                {deviceInfo?.browser}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">OS:</span>
              <span className="font-medium text-slate-300">
                {deviceInfo?.os}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Device:</span>
              <span className="font-medium text-slate-300">
                {deviceInfo?.device}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Screen:</span>
              <span className="font-medium text-slate-300">
                {deviceInfo?.screenResolution}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Facebook Pixel Reality Check */}
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-950/10 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-yellow-400">
          <span className="text-2xl">⚠️</span> Facebook Pixel Reality Check
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          If you had Facebook Pixel installed, here's what would happen:
        </p>
        <div className="space-y-1 font-mono text-xs">
          {facebookPixelDemo.map((line, idx) => (
            <div
              key={idx}
              className={`rounded p-2 ${
                line.includes("✅")
                  ? "bg-emerald-950/30 text-emerald-400"
                  : line.includes("❌")
                    ? "bg-red-950/30 text-red-400"
                    : "bg-blue-950/30 text-blue-400"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* The Truth */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-950/10 p-6">
        <h3 className="mb-4 text-lg font-semibold text-purple-400">
          💡 The Bottom Line
        </h3>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-3">
            <span className="font-bold text-red-400">✗</span>
            <span>
              Facebook Pixel <strong>cannot</strong> give you the visitor's name
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-red-400">✗</span>
            <span>
              No way to get identity from just cookies/fingerprint without OAuth
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-emerald-400">✓</span>
            <span>
              You <strong>can</strong> use IP geolocation for city/country
              (shown above)
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-emerald-400">✓</span>
            <span>
              You <strong>can</strong> detect device, browser, time of day
              (shown above)
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-emerald-400">✓</span>
            <span>
              Creating smart, contextual greetings is the best "wow" factor
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
