'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Critical Error | Word Unscrambler</title>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            backgroundColor: '#f9fafb',
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              width: '100%',
              padding: '40px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
              }}
            >
              <span style={{ fontSize: '32px' }} aria-hidden="true">⚠️</span>
            </div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#dc2626',
                lineHeight: '1.2',
              }}
            >
              Critical Error
            </h1>
            <p
              style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '32px',
                lineHeight: '1.6',
              }}
            >
              We apologize, but something went critically wrong. Please try refreshing the page.
            </p>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                marginBottom: '32px',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                color: '#374151',
                textAlign: 'left',
                wordBreak: 'break-word',
                border: '1px solid #e5e7eb',
              }}
            >
              {error.message || 'An unexpected error occurred'}
              {error.digest && (
                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid #d1d5db',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                  }}
                >
                  Error ID: {error.digest}
                </div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={reset}
                type="button"
                style={{
                  padding: '14px 28px',
                  minHeight: '44px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid #2563eb'
                  e.currentTarget.style.outlineOffset = '2px'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none'
                }}
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                type="button"
                style={{
                  padding: '14px 28px',
                  minHeight: '44px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid #2563eb'
                  e.currentTarget.style.outlineOffset = '2px'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none'
                }}
              >
                Go to homepage
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
