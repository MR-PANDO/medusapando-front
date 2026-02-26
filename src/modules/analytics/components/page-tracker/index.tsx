"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// Generate or retrieve session ID
const getSessionId = (): string => {
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem("analytics_session_id")
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem("analytics_session_id", sessionId)
  }
  return sessionId
}

export default function PageTracker() {
  const pathname = usePathname()
  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    // Avoid tracking the same page twice
    if (lastTrackedPath.current === pathname) return
    lastTrackedPath.current = pathname

    const trackPageView = async () => {
      try {
        const sessionId = getSessionId()
        if (!sessionId) return

        const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

        await fetch(`${backendUrl}/store/analytics/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId,
            page_path: pathname,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
          }),
        })
      } catch (error) {
        // Silently fail - analytics shouldn't break the app
        console.debug("Analytics tracking error:", error)
      }
    }

    // Small delay to ensure page has loaded
    const timeout = setTimeout(trackPageView, 100)
    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
