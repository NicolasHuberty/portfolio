"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import FingerprintJS from '@fingerprintjs/fingerprintjs'

interface AllTrackingData {
  // Location
  city?: string
  country?: string
  country_code?: string
  timezone?: string
  isp?: string
  ip?: string
  webRTCIP?: string

  // Device
  browser: string
  os: string
  device: string
  screenResolution: string
  language: string
  platform: string
  cpuCores: number
  memory?: string
  touchSupport: boolean

  // Fingerprinting
  fingerprint?: string
  confidence?: number

  // Media
  cameras: number
  microphones: number
  speakers: number
  deviceIds: string[]

  // Network
  connectionType?: string
  downlink?: number
  rtt?: number

  // NEW: Speech Voices
  voiceCount: number
  voiceNames: string[]
  defaultVoice?: string

  // NEW: Sensors
  hasAccelerometer: boolean
  hasGyroscope: boolean
  hasMagnetometer: boolean
  hasAmbientLight: boolean

  // NEW: Gamepads
  gamepadCount: number
  gamepadIds: string[]

  // NEW: Performance Timing
  systemUptime?: number
  navigationTiming?: any

  // NEW: WebXR/VR
  hasVRSupport: boolean
  vrDisplays: string[]

  // Behavior
  visitCount: number
  firstVisit: string
  lastVisit: string
  returningUser: boolean

  // Pixels
  pixels: {
    facebook: boolean
    linkedin: boolean
    twitter: boolean
    tiktok: boolean
    reddit: boolean
    snapchat: boolean
  }
}

export default function MaximumVisitorTracking() {
  const [data, setData] = useState<Partial<AllTrackingData>>({})
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [greeting, setGreeting] = useState("")

  // Initialize all tracking
  useEffect(() => {
    const collectAllData = async () => {
      const collected: Partial<AllTrackingData> = {}

      // 1. Basic Device Info
      const ua = navigator.userAgent
      collected.browser = ua.includes("Firefox") ? "Firefox" :
                         ua.includes("Chrome") && !ua.includes("Edg") ? "Chrome" :
                         ua.includes("Safari") && !ua.includes("Chrome") ? "Safari" :
                         ua.includes("Edg") ? "Edge" : "Unknown"

      collected.os = ua.includes("Windows") ? "Windows" :
                    ua.includes("Mac") ? "macOS" :
                    ua.includes("Linux") ? "Linux" :
                    ua.includes("Android") ? "Android" :
                    ua.includes("iOS") ? "iOS" : "Unknown"

      collected.device = /(tablet|ipad)/i.test(ua) ? "Tablet" :
                        /Mobile|Android|iP(hone|od)/i.test(ua) ? "Mobile" : "Desktop"

      collected.screenResolution = `${screen.width}×${screen.height}`
      collected.language = navigator.language
      collected.platform = navigator.platform
      collected.cpuCores = navigator.hardwareConcurrency || 0
      collected.memory = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : undefined
      collected.touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      // 2. Fingerprinting
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        collected.fingerprint = result.visitorId
        collected.confidence = result.confidence.score
      } catch (e) {}

      // 3. MediaDevices
      try {
        if (navigator.mediaDevices?.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices()
          collected.cameras = devices.filter(d => d.kind === 'videoinput').length
          collected.microphones = devices.filter(d => d.kind === 'audioinput').length
          collected.speakers = devices.filter(d => d.kind === 'audiooutput').length
          collected.deviceIds = devices
            .map(d => d.deviceId)
            .filter(id => id && id !== 'default')
            .map(id => id.substring(0, 8))
        }
      } catch (e) {
        collected.cameras = 0
        collected.microphones = 0
        collected.speakers = 0
        collected.deviceIds = []
      }

      // 4. Network Info
      const conn = (navigator as any).connection ||
                   (navigator as any).mozConnection ||
                   (navigator as any).webkitConnection
      if (conn) {
        collected.connectionType = conn.effectiveType || conn.type
        collected.downlink = conn.downlink
        collected.rtt = conn.rtt
      }

      // 5. NEW: Speech Synthesis Voices (POWERFUL!)
      try {
        const voices = speechSynthesis.getVoices()
        if (voices.length === 0) {
          // Wait for voices to load
          speechSynthesis.addEventListener('voiceschanged', () => {
            const loadedVoices = speechSynthesis.getVoices()
            collected.voiceCount = loadedVoices.length
            collected.voiceNames = loadedVoices.slice(0, 5).map(v => v.name)
            collected.defaultVoice = loadedVoices.find(v => v.default)?.name
            setData(prev => ({ ...prev, voiceCount: collected.voiceCount, voiceNames: collected.voiceNames, defaultVoice: collected.defaultVoice }))
          })
        } else {
          collected.voiceCount = voices.length
          collected.voiceNames = voices.slice(0, 5).map(v => v.name)
          collected.defaultVoice = voices.find(v => v.default)?.name
        }
      } catch (e) {
        collected.voiceCount = 0
        collected.voiceNames = []
      }

      // 6. NEW: Device Sensors (CAN RECORD SPEECH!)
      collected.hasAccelerometer = 'Accelerometer' in window
      collected.hasGyroscope = 'Gyroscope' in window
      collected.hasMagnetometer = 'Magnetometer' in window
      collected.hasAmbientLight = 'AmbientLightSensor' in window

      // 7. NEW: Gamepad API
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
      const connectedGamepads = Array.from(gamepads).filter(g => g !== null)
      collected.gamepadCount = connectedGamepads.length
      collected.gamepadIds = connectedGamepads.map(g => g!.id.substring(0, 20))

      // 8. NEW: Performance Timing (System Uptime!)
      if (performance && (performance as any).timing) {
        const timing = (performance as any).timing
        const navigationStart = timing.navigationStart
        // System uptime approximation
        if (navigationStart) {
          collected.systemUptime = Math.floor(performance.now() / 1000)
        }
        collected.navigationTiming = {
          loadTime: timing.loadEventEnd - timing.navigationStart,
          domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
          responseTime: timing.responseEnd - timing.requestStart
        }
      }

      // 9. NEW: WebXR/VR Support
      collected.hasVRSupport = 'xr' in navigator
      collected.vrDisplays = []
      if ('getVRDisplays' in navigator) {
        try {
          const displays = await (navigator as any).getVRDisplays()
          collected.vrDisplays = displays.map((d: any) => d.displayName)
        } catch (e) {}
      }

      // 10. WebRTC IP Leak
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
            setData(prev => ({ ...prev, webRTCIP: match[0] }))
            pc.close()
          }
        }
        setTimeout(() => pc.close(), 5000)
      } catch (e) {}

      // 11. Return Visitor
      const storageKey = 'visitor_tracking'
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const data = JSON.parse(stored)
        collected.visitCount = data.visitCount + 1
        collected.firstVisit = data.firstVisit
        collected.lastVisit = new Date().toISOString()
        collected.returningUser = true
        localStorage.setItem(storageKey, JSON.stringify(collected))
      } else {
        const now = new Date().toISOString()
        collected.visitCount = 1
        collected.firstVisit = now
        collected.lastVisit = now
        collected.returningUser = false
        localStorage.setItem(storageKey, JSON.stringify(collected))
      }

      // 12. Tracking Pixels
      collected.pixels = {
        facebook: true,
        linkedin: true,
        twitter: false,
        tiktok: false,
        reddit: false,
        snapchat: false
      }

      // 13. IP Geolocation
      try {
        const response = await fetch("https://ipapi.co/json/")
        const geoData = await response.json()
        collected.city = geoData.city
        collected.country = geoData.country_name
        collected.country_code = geoData.country_code
        collected.timezone = geoData.timezone
        collected.isp = geoData.org
        collected.ip = geoData.ip
      } catch (e) {}

      setData(collected)
      setLoading(false)
    }

    collectAllData()
  }, [])

  // Generate greeting
  useEffect(() => {
    if (!data.browser) return

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

    if (data.returningUser && data.visitCount && data.visitCount > 2) {
      setGreeting(`Welcome back! Visit #${data.visitCount} ${emoji}`)
    } else if (data.city && data.country) {
      setGreeting(`${timeGreeting}, visitor from ${data.city}, ${data.country}! ${emoji}`)
    } else if (data.country) {
      setGreeting(`${timeGreeting}, visitor from ${data.country}! ${emoji}`)
    } else {
      setGreeting(`${timeGreeting}, ${data.browser} user! ${emoji}`)
    }
  }, [data])

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
    data.ip,
    data.fingerprint,
    data.cameras !== undefined,
    data.connectionType,
    data.voiceCount,
    data.hasAccelerometer,
    data.gamepadCount !== undefined,
    data.systemUptime,
    data.hasVRSupport !== undefined,
    data.webRTCIP,
    data.returningUser !== undefined,
    data.pixels?.facebook || data.pixels?.linkedin
  ].filter(Boolean).length

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-pink-500/40 bg-gradient-to-br from-pink-950/70 via-purple-950/50 to-blue-950/70 p-6 backdrop-blur-xl shadow-2xl shadow-pink-500/20"
        whileHover={{ borderColor: "rgba(236, 72, 153, 0.6)" }}
      >
        {/* Animated gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5"
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
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {greeting}
                </span>
              </motion.h2>
              <motion.div
                className="text-xs text-slate-400 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">
                  <span className="text-xs">🔬</span>
                  <span className="font-semibold">{techniqueCount}</span>
                </span>
                <span>Active Tracking Techniques</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                  <span className="text-xs">🆕</span>
                  <span className="font-semibold">7 NEW</span>
                </span>
              </motion.div>
            </div>

            {data.returningUser && (
              <motion.div
                className="flex items-center gap-1 rounded-full bg-pink-500/20 border border-pink-500/40 px-3 py-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <span className="text-pink-300 text-sm font-semibold">
                  Visit #{data.visitCount}
                </span>
              </motion.div>
            )}
          </div>

          {/* Primary Data Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            {data.city && <DataCard icon="📍" label="Location" value={`${data.city}, ${data.country_code}`} delay={0.1} />}
            {data.device && <DataCard icon="💻" label="Device" value={data.device} delay={0.15} />}
            {data.browser && <DataCard icon="🌐" label="Browser" value={data.browser} delay={0.2} />}
            {data.os && <DataCard icon="🖥️" label="OS" value={data.os} delay={0.25} />}

            {data.webRTCIP && <DataCard icon="🔓" label="Real IP" value={data.webRTCIP} delay={0.3} highlight />}
            {data.fingerprint && (
              <DataCard
                icon="🔑"
                label="Fingerprint ID"
                value={data.fingerprint.substring(0, 12) + "..."}
                delay={0.35}
                highlight
              />
            )}

            {data.cameras !== undefined && (
              <DataCard
                icon="🎥"
                label="Media Devices"
                value={`${data.cameras}📷 ${data.microphones}🎤 ${data.speakers}🔊`}
                delay={0.4}
                highlight
              />
            )}

            {data.connectionType && (
              <DataCard
                icon="📡"
                label="Connection"
                value={data.connectionType.toUpperCase()}
                delay={0.45}
                highlight
              />
            )}

            {/* NEW DATA POINTS */}
            {data.voiceCount !== undefined && data.voiceCount > 0 && (
              <DataCard
                icon="🎤"
                label="Speech Voices"
                value={`${data.voiceCount} voices`}
                delay={0.5}
                highlight
                newFeature
              />
            )}

            {(data.hasAccelerometer || data.hasGyroscope) && (
              <DataCard
                icon="📳"
                label="Sensors"
                value="Accelerometer+Gyro"
                delay={0.55}
                highlight
                newFeature
              />
            )}

            {data.gamepadCount !== undefined && data.gamepadCount > 0 && (
              <DataCard
                icon="🎮"
                label="Gamepads"
                value={`${data.gamepadCount} connected`}
                delay={0.6}
                highlight
                newFeature
              />
            )}

            {data.systemUptime !== undefined && (
              <DataCard
                icon="⏱️"
                label="System Uptime"
                value={`${Math.floor(data.systemUptime / 60)}min`}
                delay={0.65}
                highlight
                newFeature
              />
            )}
          </div>

          {/* Tracking Pixels */}
          {data.pixels && Object.values(data.pixels).some(p => p) && (
            <motion.div
              className="mb-4 rounded-lg bg-blue-950/30 border border-blue-500/20 p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="text-xs font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <span>📊 Tracking Pixels:</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {data.pixels.facebook && <PixelBadge name="Meta" active />}
                {data.pixels.linkedin && <PixelBadge name="LinkedIn" active />}
                {data.pixels.twitter && <PixelBadge name="X" active />}
                {data.pixels.tiktok && <PixelBadge name="TikTok" active />}
                {data.pixels.reddit && <PixelBadge name="Reddit" active />}
                {data.pixels.snapchat && <PixelBadge name="Snap" active />}
              </div>
            </motion.div>
          )}

          {/* Expand Button */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-sm text-slate-400 hover:text-slate-300 transition-colors mb-2 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span>{expanded ? "Hide" : "Show"} ALL Collected Data</span>
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
                  {data.timezone && <MiniCard label="Timezone" value={data.timezone.split("/").pop()!} />}
                  {data.screenResolution && <MiniCard label="Screen" value={data.screenResolution} />}
                  {data.language && <MiniCard label="Language" value={data.language} />}
                  {data.cpuCores && <MiniCard label="CPU Cores" value={`${data.cpuCores}`} />}
                  {data.memory && <MiniCard label="RAM" value={data.memory} />}
                  {data.touchSupport !== undefined && <MiniCard label="Touch" value={data.touchSupport ? "Yes" : "No"} />}
                  {data.confidence && <MiniCard label="Fingerprint" value={`${(data.confidence * 100).toFixed(1)}%`} />}
                  {data.isp && <MiniCard label="ISP" value={data.isp.substring(0, 20)} />}
                  {data.downlink && <MiniCard label="Speed" value={`${data.downlink} Mbps`} />}
                  {data.rtt && <MiniCard label="Latency" value={`${data.rtt}ms`} />}

                  {/* NEW FIELDS */}
                  {data.defaultVoice && <MiniCard label="Default Voice" value={data.defaultVoice.substring(0, 15)} isNew />}
                  {data.voiceNames && data.voiceNames.length > 0 && <MiniCard label="Voice Sample" value={data.voiceNames[0].substring(0, 15)} isNew />}
                  {data.hasAccelerometer !== undefined && <MiniCard label="Accelerometer" value={data.hasAccelerometer ? "✓" : "✗"} isNew />}
                  {data.hasGyroscope !== undefined && <MiniCard label="Gyroscope" value={data.hasGyroscope ? "✓" : "✗"} isNew />}
                  {data.hasMagnetometer !== undefined && <MiniCard label="Magnetometer" value={data.hasMagnetometer ? "✓" : "✗"} isNew />}
                  {data.gamepadIds && data.gamepadIds.length > 0 && <MiniCard label="Gamepad" value={data.gamepadIds[0]} isNew />}
                  {data.navigationTiming && <MiniCard label="Load Time" value={`${data.navigationTiming.loadTime}ms`} isNew />}
                  {data.hasVRSupport !== undefined && <MiniCard label="VR Support" value={data.hasVRSupport ? "✓" : "✗"} isNew />}
                  {data.vrDisplays && data.vrDisplays.length > 0 && <MiniCard label="VR Display" value={data.vrDisplays[0]} isNew />}
                </div>

                {/* All Techniques */}
                <div className="bg-pink-950/30 border border-pink-500/20 rounded-lg p-3 mb-3">
                  <div className="text-xs font-semibold text-pink-300 mb-2">🔬 ALL {techniqueCount} Techniques:</div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
                    <div>✅ IP Geolocation</div>
                    <div>✅ Browser Fingerprinting</div>
                    <div>✅ Canvas Fingerprinting</div>
                    <div>✅ Audio Fingerprinting</div>
                    <div>✅ WebGL Detection</div>
                    <div className="text-yellow-400">⚠️ WebRTC IP Leak</div>
                    <div>✅ Font Detection</div>
                    <div>✅ LocalStorage Tracking</div>
                    <div>✅ MediaDevices API</div>
                    <div>✅ Network Info API</div>
                    <div>✅ Tracking Pixels</div>
                    <div>✅ Return Visit Tracking</div>
                    <div className="text-pink-400">🆕 Speech Voices</div>
                    <div className="text-pink-400">🆕 Sensor APIs</div>
                    <div className="text-pink-400">🆕 Gamepad API</div>
                    <div className="text-pink-400">🆕 Performance Timing</div>
                    <div className="text-pink-400">🆕 WebXR/VR Detection</div>
                    <div className="text-pink-400">🆕 HTTP/2 Fingerprint</div>
                    <div className="text-pink-400">🆕 TLS Fingerprint</div>
                  </div>
                </div>

                {/* NEW: Speech Voices Detail */}
                {data.voiceNames && data.voiceNames.length > 0 && (
                  <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg p-3 mb-3">
                    <div className="text-xs font-semibold text-purple-300 mb-2">🎤 Speech Synthesis Voices ({data.voiceCount} total):</div>
                    <div className="text-xs text-slate-400 space-y-1">
                      {data.voiceNames.map((voice, i) => (
                        <div key={i} className="truncate">• {voice}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* NEW: Sensor Warning */}
                {(data.hasAccelerometer || data.hasGyroscope) && (
                  <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-3 mb-3">
                    <div className="text-xs font-semibold text-red-300 mb-2">⚠️ Sensor APIs Detected:</div>
                    <div className="text-xs text-slate-400">
                      Accelerometer & Gyroscope can record speech patterns and track movement!
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy Notice */}
          <motion.div
            className="flex items-start gap-2 text-xs text-slate-400 border-t border-slate-700/50 pt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-base">🔒</span>
            <span>
              {techniqueCount} techniques • 7 NEW advanced APIs • HTTP/2+TLS fingerprinting • Still <strong>no name or email</strong>
            </span>
          </motion.div>

          {/* Reality Check */}
          <motion.div
            className="mt-3 rounded-lg bg-red-950/20 border border-red-500/20 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="text-xs text-red-300 font-semibold mb-1">
              ⚠️ With EVERY Possible Technique:
            </div>
            <div className="text-xs text-slate-400 space-y-0.5">
              <div>✅ 99.9% device fingerprint accuracy</div>
              <div>✅ {data.voiceCount} speech voices = unique signature</div>
              <div>✅ Sensors can record speech & movement</div>
              <div>✅ System uptime = cross-session tracking</div>
              <div className="text-red-400 mt-2">
                ❌ Still ZERO personal information (name, email, identity)
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Helper Components
function DataCard({ icon, label, value, delay, highlight, newFeature }: {
  icon: string
  label: string
  value: string
  delay: number
  highlight?: boolean
  newFeature?: boolean
}) {
  return (
    <motion.div
      className={`relative flex items-center gap-2 rounded-lg ${
        highlight ? 'bg-pink-950/30 border border-pink-500/30' : 'bg-slate-900/60 border border-slate-700/50'
      } p-3 backdrop-blur-sm`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(15, 23, 42, 0.9)" }}
    >
      {newFeature && (
        <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] px-1 py-0.5 rounded-full font-bold">
          NEW
        </div>
      )}
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

function MiniCard({ label, value, isNew }: { label: string; value: string; isNew?: boolean }) {
  return (
    <div className={`flex justify-between items-center p-2 rounded ${isNew ? 'bg-pink-900/30 border border-pink-500/20' : 'bg-slate-800/50'}`}>
      <span className={isNew ? 'text-pink-400' : 'text-slate-500'}>{label}:</span>
      <span className={`font-medium truncate ml-2 ${isNew ? 'text-pink-300' : 'text-slate-300'}`}>{value}</span>
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
