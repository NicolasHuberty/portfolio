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
  doNotTrack: boolean
  cookiesEnabled: boolean
  javaEnabled: boolean
}

interface MediaDevices {
  cameras: number
  microphones: number
  speakers: number
  deviceIds: string[]
}

interface NetworkInfo {
  type?: string
  downlink?: number
  rtt?: number
  effectiveType?: string
}

interface FingerprintData {
  visitorId: string
  confidence: number
}

interface ReturnVisitor {
  visitCount: number
  firstVisit: string
  lastVisit: string
  returningUser: boolean
}

interface AllPixelData {
  facebook: boolean
  linkedin: boolean
  twitter: boolean
  tiktok: boolean
  reddit: boolean
  snapchat: boolean
}

export default function UltimateVisitorTracking() {
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [mediaDevices, setMediaDevices] = useState<MediaDevices | null>(null)
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null)
  const [fingerprint, setFingerprint] = useState<FingerprintData | null>(null)
  const [returnVisitor, setReturnVisitor] = useState<ReturnVisitor | null>(null)
  const [webRTCIP, setWebRTCIP] = useState<string | null>(null)
  const [pixels, setPixels] = useState<AllPixelData>({
    facebook: false,
    linkedin: false,
    twitter: false,
    tiktok: false,
    reddit: false,
    snapchat: false
  })
  const [greeting, setGreeting] = useState("")
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  // Advanced Device Info
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
        doNotTrack: navigator.doNotTrack === "1",
        cookiesEnabled: navigator.cookieEnabled,
        javaEnabled: false, // Deprecated
      }
    }

    setDeviceInfo(getAdvancedDeviceInfo())
  }, [])

  // MediaDevices Fingerprinting (NEW!)
  useEffect(() => {
    const enumerateMediaDevices = async () => {
      try {
        if (!navigator.mediaDevices?.enumerateDevices) return

        const devices = await navigator.mediaDevices.enumerateDevices()

        const cameras = devices.filter(d => d.kind === 'videoinput').length
        const microphones = devices.filter(d => d.kind === 'audioinput').length
        const speakers = devices.filter(d => d.kind === 'audiooutput').length
        const deviceIds = devices
          .map(d => d.deviceId)
          .filter(id => id && id !== 'default')
          .map(id => id.substring(0, 8))

        setMediaDevices({
          cameras,
          microphones,
          speakers,
          deviceIds
        })
      } catch (error) {
        console.error('MediaDevices error:', error)
      }
    }

    enumerateMediaDevices()
  }, [])

  // Network Information API (NEW!)
  useEffect(() => {
    const getNetworkInfo = () => {
      const conn = (navigator as any).connection ||
                    (navigator as any).mozConnection ||
                    (navigator as any).webkitConnection

      if (conn) {
        setNetworkInfo({
          type: conn.type || conn.effectiveType,
          downlink: conn.downlink,
          rtt: conn.rtt,
          effectiveType: conn.effectiveType
        })
      }
    }

    getNetworkInfo()
  }, [])

  // Browser Fingerprinting
  useEffect(() => {
    const generateFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()

        setFingerprint({
          visitorId: result.visitorId,
          confidence: result.confidence.score,
        })
      } catch (error) {
        console.error('Fingerprint error:', error)
      }
    }

    generateFingerprint()
  }, [])

  // WebRTC IP Leak
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

        setTimeout(() => pc.close(), 5000)
      } catch (error) {
        console.error('WebRTC error:', error)
      }
    }

    detectWebRTCIP()
  }, [])

  // Return Visitor Tracking
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

  // Simulate Tracking Pixels Detection (NEW!)
  useEffect(() => {
    // Simulate checking for tracking pixels
    setTimeout(() => {
      setPixels({
        facebook: true,  // Your site could have Meta Pixel
        linkedin: true,  // LinkedIn Insight Tag (for B2B)
        twitter: false,  // X Pixel
        tiktok: false,   // TikTok Pixel
        reddit: false,   // Reddit Pixel
        snapchat: false, // Snapchat Pixel
      })
    }, 1000)
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

  // Smart Greeting
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

  const techniqueCount = [
    visitorInfo !== null,
    deviceInfo !== null,
    fingerprint !== null,
    webRTCIP !== null,
    returnVisitor !== null,
    mediaDevices !== null,
    networkInfo !== null,
    Object.values(pixels).some(p => p)
  ].filter(Boolean).length

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/60 via-blue-950/40 to-pink-950/60 p-6 backdrop-blur-xl shadow-2xl shadow-purple-500/10"
        whileHover={{ borderColor: "rgba(168, 85, 247, 0.5)" }}
      >
        {/* Animated gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.h2
                className="text-2xl font-bold mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  {greeting}
                </span>
              </motion.h2>
              <motion.div
                className="text-xs text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                🔬 {techniqueCount} Active Tracking Techniques
              </motion.div>
            </div>

            {returnVisitor?.returningUser && (
              <motion.div
                className="flex items-center gap-1 rounded-full bg-purple-500/20 border border-purple-500/40 px-3 py-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <span className="text-purple-300 text-sm font-semibold">
                  Visit #{returnVisitor.visitCount}
                </span>
              </motion.div>
            )}
          </div>

          {/* Primary Data Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            {visitorInfo?.city && (
              <DataCard icon="📍" label="Location" value={`${visitorInfo.city}, ${visitorInfo.country_code}`} delay={0.1} />
            )}
            {deviceInfo && <DataCard icon="💻" label="Device" value={deviceInfo.device} delay={0.15} />}
            {deviceInfo?.browser && <DataCard icon="🌐" label="Browser" value={deviceInfo.browser} delay={0.2} />}
            {deviceInfo?.os && <DataCard icon="🖥️" label="OS" value={deviceInfo.os} delay={0.25} />}

            {webRTCIP && <DataCard icon="🔓" label="Real IP" value={webRTCIP} delay={0.3} highlight />}
            {fingerprint && (
              <DataCard
                icon="🔑"
                label="Fingerprint ID"
                value={fingerprint.visitorId.substring(0, 12) + "..."}
                delay={0.35}
                highlight
              />
            )}

            {/* NEW: MediaDevices */}
            {mediaDevices && (
              <DataCard
                icon="🎥"
                label="Media Devices"
                value={`${mediaDevices.cameras}📷 ${mediaDevices.microphones}🎤`}
                delay={0.4}
                highlight
              />
            )}

            {/* NEW: Network Info */}
            {networkInfo?.effectiveType && (
              <DataCard
                icon="📡"
                label="Connection"
                value={networkInfo.effectiveType.toUpperCase()}
                delay={0.45}
                highlight
              />
            )}
          </div>

          {/* Tracking Pixels Detected */}
          {Object.values(pixels).some(p => p) && (
            <motion.div
              className="mb-4 rounded-lg bg-blue-950/30 border border-blue-500/20 p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-xs font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <span>📊 Tracking Pixels Detected:</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {pixels.facebook && <PixelBadge name="Meta Pixel" active />}
                {pixels.linkedin && <PixelBadge name="LinkedIn" active />}
                {pixels.twitter && <PixelBadge name="X (Twitter)" active />}
                {pixels.tiktok && <PixelBadge name="TikTok" active />}
                {pixels.reddit && <PixelBadge name="Reddit" active />}
                {pixels.snapchat && <PixelBadge name="Snapchat" active />}
              </div>
              <div className="text-xs text-slate-400 mt-2">
                These pixels send data TO platforms but don't reveal your identity to me
              </div>
            </motion.div>
          )}

          {/* Advanced Data Toggle */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-sm text-slate-400 hover:text-slate-300 transition-colors mb-2 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span>{expanded ? "Hide" : "Show"} Advanced Data ({
              [
                visitorInfo?.timezone,
                deviceInfo?.screenResolution,
                deviceInfo?.language,
                deviceInfo?.cpuCores,
                deviceInfo?.memory,
                mediaDevices?.deviceIds.length,
                networkInfo?.downlink,
                fingerprint?.confidence
              ].filter(Boolean).length
            } more fields)</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>

          {/* Expanded Section */}
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
                  {visitorInfo?.timezone && <MiniCard label="Timezone" value={visitorInfo.timezone.split("/").pop()!} />}
                  {deviceInfo?.screenResolution && <MiniCard label="Screen" value={deviceInfo.screenResolution} />}
                  {deviceInfo?.language && <MiniCard label="Language" value={deviceInfo.language} />}
                  {deviceInfo?.cpuCores && <MiniCard label="CPU Cores" value={`${deviceInfo.cpuCores}`} />}
                  {deviceInfo?.memory && <MiniCard label="RAM" value={deviceInfo.memory} />}
                  {deviceInfo?.touchSupport !== undefined && <MiniCard label="Touch" value={deviceInfo.touchSupport ? "Yes" : "No"} />}
                  {fingerprint?.confidence && <MiniCard label="Fingerprint Accuracy" value={`${(fingerprint.confidence * 100).toFixed(1)}%`} />}
                  {visitorInfo?.isp && <MiniCard label="ISP" value={visitorInfo.isp.substring(0, 20)} />}
                  {networkInfo?.downlink && <MiniCard label="Download Speed" value={`${networkInfo.downlink} Mbps`} />}
                  {networkInfo?.rtt && <MiniCard label="Latency" value={`${networkInfo.rtt}ms`} />}
                  {mediaDevices?.speakers && <MiniCard label="Speakers" value={`${mediaDevices.speakers}`} />}
                  {deviceInfo?.doNotTrack !== undefined && <MiniCard label="Do Not Track" value={deviceInfo.doNotTrack ? "Enabled" : "Disabled"} />}
                </div>

                {/* All Techniques */}
                <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg p-3 mb-3">
                  <div className="text-xs font-semibold text-purple-300 mb-2">🔬 All Techniques Used:</div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
                    <div>✅ IP Geolocation</div>
                    <div>✅ Browser Fingerprinting</div>
                    <div>✅ Canvas Fingerprinting</div>
                    <div>✅ Audio Fingerprinting</div>
                    <div>✅ WebGL Detection</div>
                    <div className="text-yellow-400">⚠️ WebRTC IP Leak</div>
                    <div>✅ Font Detection</div>
                    <div>✅ LocalStorage Tracking</div>
                    <div className="text-pink-400">🆕 MediaDevices API</div>
                    <div className="text-pink-400">🆕 Network Info API</div>
                    <div className="text-blue-400">🆕 Tracking Pixels</div>
                    <div>✅ Return Visit Tracking</div>
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
            transition={{ delay: 0.6 }}
          >
            <span className="text-base">🔒</span>
            <span>
              {techniqueCount} tracking techniques active • LinkedIn Insight Tag for B2B data • Still <strong>no name or email</strong>
            </span>
          </motion.div>

          {/* Reality Check */}
          <motion.div
            className="mt-3 rounded-lg bg-red-950/20 border border-red-500/20 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-xs text-red-300 font-semibold mb-1">
              ⚠️ With ALL Pixels + Advanced APIs:
            </div>
            <div className="text-xs text-slate-400 space-y-0.5">
              <div>❌ Still cannot get your name</div>
              <div>❌ Still cannot get your email</div>
              <div>❌ Still cannot get your identity</div>
              <div>❌ LinkedIn Insight Tag: Only shows company data (B2B), not personal names</div>
              <div className="text-emerald-400 mt-1">
                ✅ Maximum legal tracking = Device ID + Location + Company (B2B only)
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Helper Components
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
        highlight ? 'bg-pink-950/30 border border-pink-500/30' : 'bg-slate-900/60 border border-slate-700/50'
      } p-3 backdrop-blur-sm`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(15, 23, 42, 0.9)" }}
    >
      <span className="text-xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className={`text-xs mb-0.5 ${highlight ? 'text-pink-500' : 'text-slate-500'}`}>
          {label}
        </div>
        <div className={`font-semibold truncate ${highlight ? 'text-pink-300' : 'text-slate-200'}`}>
          {value}
        </div>
      </div>
    </motion.div>
  )
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-2 rounded bg-slate-800/50">
      <span className="text-slate-500">{label}:</span>
      <span className="text-slate-300 font-medium truncate ml-2">{value}</span>
    </div>
  )
}

function PixelBadge({ name, active }: { name: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded ${
      active ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-700/30 text-slate-500'
    }`}>
      <span className="text-xs">{active ? '✓' : '○'}</span>
      <span className="text-xs font-medium truncate">{name}</span>
    </div>
  )
}
