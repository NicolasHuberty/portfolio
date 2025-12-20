"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import FingerprintJS from '@fingerprintjs/fingerprintjs'

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
  vpnIP?: string
}

interface DeviceInfo {
  browser: string
  os: string
  device: string
  screenResolution: string
  language: string
  platform: string
  cpuCores: number
  memory?: string
  touchSupport: boolean
}

interface FingerprintData {
  visitorId: string
  confidence: number
  canvasFingerprint: string
  audioFingerprint: string
  webGLVendor: string
  webGLRenderer: string
  fonts: string[]
  plugins: string[]
}

interface ReturnVisitor {
  visitCount: number
  firstVisit: string
  lastVisit: string
  returningUser: boolean
}

export default function AdvancedVisitorTracking() {
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [fingerprint, setFingerprint] = useState<FingerprintData | null>(null)
  const [returnVisitor, setReturnVisitor] = useState<ReturnVisitor | null>(null)
  const [webRTCIP, setWebRTCIP] = useState<string | null>(null)
  const [greeting, setGreeting] = useState("")
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  // Get advanced device info
  useEffect(() => {
    const getAdvancedDeviceInfo = (): DeviceInfo => {
      const ua = navigator.userAgent

      let browser = "Unknown"
      if (ua.includes("Firefox")) browser = "Firefox"
      else if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome"
      else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari"
      else if (ua.includes("Edg")) browser = "Edge"

      let os = "Unknown"
      if (ua.includes("Windows")) os = "Windows"
      else if (ua.includes("Mac")) os = "macOS"
      else if (ua.includes("Linux")) os = "Linux"
      else if (ua.includes("Android")) os = "Android"
      else if (ua.includes("iOS")) os = "iOS"

      let device = "Desktop"
      if (/(tablet|ipad)/i.test(ua)) device = "Tablet"
      else if (/Mobile|Android|iP(hone|od)/i.test(ua)) device = "Mobile"

      return {
        browser,
        os,
        device,
        screenResolution: `${screen.width}×${screen.height}`,
        language: navigator.language,
        platform: navigator.platform,
        cpuCores: navigator.hardwareConcurrency || 0,
        memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : undefined,
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      }
    }

    setDeviceInfo(getAdvancedDeviceInfo())
  }, [])

  // Advanced Browser Fingerprinting
  useEffect(() => {
    const generateFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()

        setFingerprint({
          visitorId: result.visitorId,
          confidence: result.confidence.score,
          canvasFingerprint: result.components.canvas?.value || 'N/A',
          audioFingerprint: result.components.audio?.value?.toString() || 'N/A',
          webGLVendor: result.components.vendorFlavors?.value[0] || 'N/A',
          webGLRenderer: result.components.vendorFlavors?.value[1] || 'N/A',
          fonts: result.components.fonts?.value?.slice(0, 10) || [],
          plugins: result.components.plugins?.value?.map((p: any) => p.name).slice(0, 5) || [],
        })
      } catch (error) {
        console.error('Fingerprint error:', error)
      }
    }

    generateFingerprint()
  }, [])

  // WebRTC IP Leak Detection (even behind VPN!)
  useEffect(() => {
    const detectWebRTCIP = () => {
      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        })

        pc.createDataChannel('')
        pc.createOffer().then(offer => pc.setLocalDescription(offer))

        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate) return
          const regex = /([0-9]{1,3}\.){3}[0-9]{1,3}/
          const match = ice.candidate.candidate.match(regex)
          if (match && match[0]) {
            setWebRTCIP(match[0])
            pc.close()
          }
        }

        // Timeout after 5 seconds
        setTimeout(() => pc.close(), 5000)
      } catch (error) {
        console.error('WebRTC error:', error)
      }
    }

    detectWebRTCIP()
  }, [])

  // Return Visitor Tracking (localStorage)
  useEffect(() => {
    const trackReturnVisitor = () => {
      const storageKey = 'visitor_tracking'
      const stored = localStorage.getItem(storageKey)

      if (stored) {
        const data = JSON.parse(stored)
        const visitCount = data.visitCount + 1
        const now = new Date().toISOString()

        const returnData: ReturnVisitor = {
          visitCount,
          firstVisit: data.firstVisit,
          lastVisit: now,
          returningUser: true,
        }

        localStorage.setItem(storageKey, JSON.stringify(returnData))
        setReturnVisitor(returnData)
      } else {
        const now = new Date().toISOString()
        const newData: ReturnVisitor = {
          visitCount: 1,
          firstVisit: now,
          lastVisit: now,
          returningUser: false,
        }

        localStorage.setItem(storageKey, JSON.stringify(newData))
        setReturnVisitor(newData)
      }
    }

    trackReturnVisitor()
  }, [])

  // IP Geolocation
  useEffect(() => {
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
        console.error("Geolocation error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorInfo()
  }, [])

  // Generate smart greeting
  useEffect(() => {
    if (!deviceInfo) return

    const hour = new Date().getHours()
    let timeGreeting = "Hello"
    let emoji = "👋"

    if (hour < 6) {
      timeGreeting = "Hello night owl"
      emoji = "🦉"
    } else if (hour < 12) {
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

    let greetingText = ""

    if (returnVisitor?.returningUser && returnVisitor.visitCount > 2) {
      greetingText = `Welcome back! Visit #${returnVisitor.visitCount} ${emoji}`
    } else if (visitorInfo?.city && visitorInfo?.country) {
      greetingText = `${timeGreeting}, visitor from ${visitorInfo.city}, ${visitorInfo.country}! ${emoji}`
    } else if (visitorInfo?.country) {
      greetingText = `${timeGreeting}, visitor from ${visitorInfo.country}! ${emoji}`
    } else {
      greetingText = `${timeGreeting}, ${deviceInfo.browser} user! ${emoji}`
    }

    setGreeting(greetingText)
  }, [visitorInfo, deviceInfo, returnVisitor])

  if (loading) {
    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="animate-pulse space-y-3">
          <div className="h-8 w-3/4 bg-slate-700 rounded"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/60 via-purple-950/40 to-emerald-950/60 p-6 backdrop-blur-xl shadow-2xl shadow-blue-500/10"
        whileHover={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          {/* Main Greeting */}
          <div className="flex items-start justify-between mb-4">
            <motion.h2
              className="text-2xl font-bold flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                {greeting}
              </span>
            </motion.h2>

            {returnVisitor?.returningUser && (
              <motion.div
                className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <span className="text-emerald-400 text-sm font-semibold">
                  Visit #{returnVisitor.visitCount}
                </span>
              </motion.div>
            )}
          </div>

          {/* Primary Data Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            {visitorInfo?.city && (
              <DataCard
                icon="📍"
                label="Location"
                value={`${visitorInfo.city}, ${visitorInfo.country_code}`}
                delay={0.1}
              />
            )}

            {deviceInfo && (
              <DataCard
                icon="💻"
                label="Device"
                value={deviceInfo.device}
                delay={0.15}
              />
            )}

            {deviceInfo?.browser && (
              <DataCard
                icon="🌐"
                label="Browser"
                value={deviceInfo.browser}
                delay={0.2}
              />
            )}

            {deviceInfo?.os && (
              <DataCard
                icon="🖥️"
                label="OS"
                value={deviceInfo.os}
                delay={0.25}
              />
            )}

            {webRTCIP && (
              <DataCard
                icon="🔓"
                label="Real IP (WebRTC)"
                value={webRTCIP}
                delay={0.3}
                highlight
              />
            )}

            {fingerprint && (
              <DataCard
                icon="🔑"
                label="Fingerprint"
                value={fingerprint.visitorId.substring(0, 12) + "..."}
                delay={0.35}
                highlight
              />
            )}
          </div>

          {/* Advanced Data (Collapsible) */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-sm text-slate-400 hover:text-slate-300 transition-colors mb-2 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span>{expanded ? "Hide" : "Show"} Advanced Tracking Data</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-700/50 pt-3 mb-3">
                  {visitorInfo?.timezone && (
                    <MiniDataCard label="Timezone" value={visitorInfo.timezone.split("/").pop()!} />
                  )}
                  {deviceInfo?.screenResolution && (
                    <MiniDataCard label="Screen" value={deviceInfo.screenResolution} />
                  )}
                  {deviceInfo?.language && (
                    <MiniDataCard label="Language" value={deviceInfo.language} />
                  )}
                  {deviceInfo?.cpuCores > 0 && (
                    <MiniDataCard label="CPU Cores" value={`${deviceInfo.cpuCores}`} />
                  )}
                  {deviceInfo?.memory && (
                    <MiniDataCard label="RAM" value={deviceInfo.memory} />
                  )}
                  {deviceInfo?.touchSupport !== undefined && (
                    <MiniDataCard label="Touch" value={deviceInfo.touchSupport ? "Yes" : "No"} />
                  )}
                  {fingerprint?.confidence && (
                    <MiniDataCard label="Fingerprint Accuracy" value={`${(fingerprint.confidence * 100).toFixed(1)}%`} />
                  )}
                  {visitorInfo?.isp && (
                    <MiniDataCard label="ISP" value={visitorInfo.isp.substring(0, 20)} />
                  )}
                </div>

                {/* Techniques Used */}
                <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg p-3 mb-3">
                  <div className="text-xs font-semibold text-purple-300 mb-2">🔬 Techniques Used:</div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
                    <div>✅ IP Geolocation</div>
                    <div>✅ Browser Fingerprinting</div>
                    <div>✅ Canvas Fingerprinting</div>
                    <div>✅ Audio Fingerprinting</div>
                    <div>✅ WebGL Detection</div>
                    <div className="text-yellow-400">⚠️ WebRTC IP Leak</div>
                    <div>✅ Font Detection</div>
                    <div>✅ LocalStorage Tracking</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy Notice */}
          <motion.div
            className="flex items-start gap-2 text-xs text-slate-400 border-t border-slate-700/50 pt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-base">🔒</span>
            <span>
              Advanced tracking demo • All techniques shown above • Still <strong>no name, email, or personal identity</strong>
            </span>
          </motion.div>

          {/* Reality Check */}
          <motion.div
            className="mt-3 rounded-lg bg-red-950/20 border border-red-500/20 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-xs text-red-300 font-semibold mb-1">⚠️ Even With ALL These Techniques:</div>
            <div className="text-xs text-slate-400 space-y-0.5">
              <div>❌ Still cannot get your name</div>
              <div>❌ Still cannot get your email</div>
              <div>❌ Still cannot get your identity</div>
              <div className="text-emerald-400 mt-1">
                ✅ Only recognize device & location (no personal info!)
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Helper components
function DataCard({ icon, label, value, delay, highlight }: {
  icon: string
  label: string
  value: string
  delay: number
  highlight?: boolean
}) {
  return (
    <motion.div
      className={`flex items-center gap-2 rounded-lg ${
        highlight ? 'bg-yellow-950/30 border border-yellow-500/30' : 'bg-slate-900/60 border border-slate-700/50'
      } p-3 backdrop-blur-sm`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(15, 23, 42, 0.9)" }}
    >
      <span className="text-xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className={`text-xs mb-0.5 ${highlight ? 'text-yellow-500' : 'text-slate-500'}`}>
          {label}
        </div>
        <div className={`font-semibold truncate ${highlight ? 'text-yellow-300' : 'text-slate-200'}`}>
          {value}
        </div>
      </div>
    </motion.div>
  )
}

function MiniDataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-2 rounded bg-slate-800/50">
      <span className="text-slate-500">{label}:</span>
      <span className="text-slate-300 font-medium">{value}</span>
    </div>
  )
}
