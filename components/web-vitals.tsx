"use client"

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import { reportWebVitals } from '@/lib/monitoring'

/**
 * Web Vitals Reporter Component
 * Automatically reports Core Web Vitals metrics
 *
 * Metrics tracked:
 * - CLS: Cumulative Layout Shift
 * - FCP: First Contentful Paint
 * - FID: First Input Delay
 * - LCP: Largest Contentful Paint
 * - TTFB: Time to First Byte
 * - INP: Interaction to Next Paint
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    reportWebVitals({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id
    })
  })

  // Track page navigation
  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname
        // Track page view
        if ((window as any).gtag) {
          (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
            page_path: path,
          })
        }
      }
    }

    // Initial page load
    handleRouteChange()

    // Listen for route changes (client-side navigation)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  return null
}
