// Sentry Error Monitoring Configuration
// Documentation: https://docs.sentry.io/platforms/javascript/guides/nextjs/

// NOTE: To use Sentry, install the package:
// npm install @sentry/nextjs

export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || ''

export const sentryConfig = {
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production' && !!SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Capture Replay for 10% of all sessions,
  // plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Performance Monitoring
  enableTracing: true,

  // Debug mode
  debug: process.env.NODE_ENV === 'development',

  // Integrations
  integrations: [
    // Add custom integrations here
  ],

  // Before send hook - scrub sensitive data
  beforeSend(event, hint) {
    // Don't send errors in development
    if (process.env.NODE_ENV === 'development') {
      return null
    }

    // Scrub sensitive information
    if (event.request) {
      delete event.request.cookies
      delete event.request.headers
    }

    return event
  },

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    // Network errors
    'NetworkError',
    'Failed to fetch',
    // User navigation
    'Navigation cancelled',
    'Navigation interrupted',
  ],

  // Deny URLs - don't track errors from these sources
  denyUrls: [
    /extensions\//i,
    /^chrome:\/\//i,
    /^moz-extension:\/\//i,
  ],
}

// Initialize Sentry (call this in layout or _app)
export function initSentry() {
  if (typeof window === 'undefined') return

  // Lazy load Sentry to reduce initial bundle size
  if (sentryConfig.enabled) {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.init(sentryConfig)
    })
  }
}

// Manual error capture
export function captureError(error: Error, context?: Record<string, any>) {
  if (sentryConfig.enabled && typeof window !== 'undefined') {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.captureException(error, {
        extra: context,
      })
    })
  } else {
    // Fallback to console in development
    console.error('Captured error:', error, context)
  }
}

// Set user context
export function setUser(user: { id: string; email?: string; username?: string }) {
  if (sentryConfig.enabled && typeof window !== 'undefined') {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.setUser(user)
    })
  }
}

// Clear user context
export function clearUser() {
  if (sentryConfig.enabled && typeof window !== 'undefined') {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.setUser(null)
    })
  }
}

// Add breadcrumb
export function addBreadcrumb(message: string, category: string, data?: Record<string, any>) {
  if (sentryConfig.enabled && typeof window !== 'undefined') {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.addBreadcrumb({
        message,
        category,
        data,
        level: 'info',
        timestamp: Date.now() / 1000,
      })
    })
  }
}
