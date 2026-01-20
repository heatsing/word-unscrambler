"use client"

import React from 'react'
import { logError } from '@/lib/monitoring'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Logs errors and displays a fallback UI
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-full bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Something went wrong</CardTitle>
                  <CardDescription>
                    We're sorry for the inconvenience. The error has been logged and we'll look into it.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono text-destructive mb-2">
                    {this.state.error.message}
                  </p>
                  <pre className="text-xs overflow-auto max-h-40">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1"
                  aria-label="Reload page"
                >
                  <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
                  Reload Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="flex-1"
                  aria-label="Go to homepage"
                >
                  <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                  Go Home
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                If this problem persists, please contact support
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook version of Error Boundary (for function components)
 * Note: This doesn't actually catch errors, but provides reset functionality
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (error) {
      logError(error)
    }
  }, [error])

  const resetError = () => setError(null)

  return { error, setError, resetError }
}
