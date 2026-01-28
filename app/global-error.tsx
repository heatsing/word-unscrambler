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
    <html>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          backgroundColor: '#f9fafb',
        }}>
          <div style={{
            maxWidth: '600px',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px', color: '#dc2626' }}>
              ⚠️ Critical Error
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '24px' }}>
              We apologize, but something went critically wrong. Please try refreshing the page.
            </p>
            <div style={{
              padding: '16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '4px',
              marginBottom: '24px',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: '#374151',
              textAlign: 'left',
            }}>
              {error.message || 'An unexpected error occurred'}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Try again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
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
