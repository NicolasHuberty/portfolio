"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Facebook Pixel Implementation
 *
 * IMPORTANT: This tracks users for advertising but CANNOT give you their names!
 *
 * What it DOES:
 * - Sends page views, events, and conversions TO Facebook
 * - Allows Facebook to show your ads to visitors
 * - Creates custom audiences for retargeting
 *
 * What it DOESN'T do:
 * - Return user names or personal information to your website
 * - Give you access to Facebook profiles
 * - Provide email addresses or social media data
 *
 * The data flows ONE WAY: Your site → Facebook (not the other way around)
 */

declare global {
  interface Window {
    fbq: any
    _fbq: any
  }
}

interface FacebookPixelProps {
  pixelId: string
}

export function FacebookPixel({ pixelId }: FacebookPixelProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Facebook Pixel
    if (typeof window !== "undefined" && !window.fbq) {
      // Load Facebook Pixel script
      ;(function (
        f: any,
        b: Document,
        e: string,
        v: string,
        n: any,
        t: any,
        s: any,
      ) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = true
        n.version = "2.0"
        n.queue = []
        t = b.createElement(e)
        t.async = true
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
        undefined,
        undefined,
        undefined,
      )

      window.fbq("init", pixelId)
      window.fbq("track", "PageView")

      console.log("📊 Facebook Pixel initialized")
      console.log("✅ Sending data TO Facebook for ad targeting")
      console.log("❌ You CANNOT get user names or personal info back")
    }
  }, [pixelId])

  useEffect(() => {
    // Track page views on route change
    if (window.fbq) {
      window.fbq("track", "PageView")
      console.log(`📊 PageView tracked: ${pathname}`)
    }
  }, [pathname, searchParams])

  return (
    <>
      {/* Facebook Pixel noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

/**
 * Helper function to track custom events
 *
 * Usage:
 *   trackEvent('ViewContent', { content_name: 'Portfolio' })
 *   trackEvent('Lead', { content_name: 'Contact Form' })
 */
export function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, data)
    console.log(`📊 Event tracked: ${eventName}`, data)
    console.log("ℹ️  This data goes TO Facebook, not FROM Facebook")
  }
}

/**
 * Example: How to use Facebook Pixel in your app
 *
 * 1. Add to your root layout:
 *
 *    import { FacebookPixel } from '@/components/facebook-pixel'
 *
 *    export default function Layout({ children }) {
 *      return (
 *        <html>
 *          <body>
 *            <FacebookPixel pixelId="YOUR_PIXEL_ID" />
 *            {children}
 *          </body>
 *        </html>
 *      )
 *    }
 *
 * 2. Track custom events:
 *
 *    import { trackEvent } from '@/components/facebook-pixel'
 *
 *    function ContactButton() {
 *      return (
 *        <button onClick={() => trackEvent('Lead', { content_name: 'Contact' })}>
 *          Contact Me
 *        </button>
 *      )
 *    }
 *
 * REALITY CHECK:
 * - Facebook uses this data to show your ads to the right people
 * - You can create "Custom Audiences" in Facebook Ads Manager
 * - BUT you cannot retrieve user identities or names from the pixel
 * - The pixel is for ADVERTISING, not for personalizing greetings
 */
