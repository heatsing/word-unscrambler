/**
 * Performance Monitoring and Error Tracking
 *
 * This module provides utilities for:
 * - Web Vitals tracking
 * - Error logging
 * - Performance metrics
 * - User analytics
 */

// Web Vitals Types
interface Metric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

/**
 * Report Web Vitals to analytics
 * Can be integrated with Google Analytics, PostHog, or custom endpoints
 */
export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating
    })
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Option 1: Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Option 2: Send to Vercel Analytics (already included)
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', metric.name, {
        value: metric.value,
        rating: metric.rating
      })
    }

    // Option 3: Send to custom endpoint
    sendToAnalytics({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      path: window.location.pathname
    })
  }
}

/**
 * Send custom analytics events
 */
export function sendToAnalytics(data: Record<string, any>) {
  if (typeof window === 'undefined') return

  // Queue events if analytics not loaded yet
  ;(window as any).__analytics_queue = (window as any).__analytics_queue || []

  // Send to endpoint (implement your own)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }),
      keepalive: true
    }).catch(console.error)
  }
}

/**
 * Log errors to monitoring service
 */
export function logError(error: Error, errorInfo?: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', error, errorInfo)
  }

  // Send to error tracking service in production
  if (process.env.NODE_ENV === 'production') {
    sendToAnalytics({
      event: 'error',
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      errorInfo,
      path: typeof window !== 'undefined' ? window.location.pathname : undefined
    })
  }
}

/**
 * Track custom events
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Event]', eventName, properties)
  }

  sendToAnalytics({
    event: eventName,
    properties,
    path: typeof window !== 'undefined' ? window.location.pathname : undefined
  })
}

/**
 * Track page views
 */
export function trackPageView(url: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Page View]', url)
  }

  sendToAnalytics({
    event: 'page_view',
    path: url
  })
}

/**
 * Performance monitoring utilities
 */
export const performance = {
  /**
   * Measure time for an operation
   */
  measure: (name: string, fn: () => void | Promise<void>) => {
    const start = Date.now()

    const result = fn()

    if (result instanceof Promise) {
      return result.then(() => {
        const duration = Date.now() - start
        trackEvent('performance_measure', { name, duration })
        return duration
      })
    } else {
      const duration = Date.now() - start
      trackEvent('performance_measure', { name, duration })
      return duration
    }
  },

  /**
   * Mark a performance milestone
   */
  mark: (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name)
    }
  },

  /**
   * Measure between two marks
   */
  measureBetween: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        window.performance.measure(name, startMark, endMark)
        const measure = window.performance.getEntriesByName(name)[0]
        trackEvent('performance_measure', {
          name,
          duration: measure.duration
        })
      } catch (e) {
        console.error('Performance measure failed:', e)
      }
    }
  }
}

/**
 * Monitor Core Web Vitals thresholds
 */
export const webVitalsThresholds = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }  // Time to First Byte
}

/**
 * Get rating for a metric value
 */
export function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = webVitalsThresholds[metricName as keyof typeof webVitalsThresholds]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * User interaction tracking
 */
export const interactions = {
  /**
   * Track button clicks
   */
  trackClick: (buttonName: string, properties?: Record<string, any>) => {
    trackEvent('button_click', { button: buttonName, ...properties })
  },

  /**
   * Track form submissions
   */
  trackFormSubmit: (formName: string, properties?: Record<string, any>) => {
    trackEvent('form_submit', { form: formName, ...properties })
  },

  /**
   * Track search queries
   */
  trackSearch: (query: string, resultsCount: number) => {
    trackEvent('search', {
      query: query.substring(0, 100), // Limit length for privacy
      resultsCount
    })
  },

  /**
   * Track feature usage
   */
  trackFeature: (featureName: string, properties?: Record<string, any>) => {
    trackEvent('feature_use', { feature: featureName, ...properties })
  }
}
