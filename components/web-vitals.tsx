"use client"

import { useEffect } from "react"
import { useReportWebVitals } from "next/web-vitals"

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    if (window.gtag) {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(metric)
    }
  })

  return null
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: {
        event_category: string
        value: number
        event_label: string
        non_interaction: boolean
      }
    ) => void
  }
}
