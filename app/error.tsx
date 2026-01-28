'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error caught by error boundary:', error)
  }, [error])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="border-destructive">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl">Something went wrong!</CardTitle>
                  <CardDescription className="text-base mt-1">
                    We apologize for the inconvenience. An error occurred while processing your request.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Error Details */}
              <div className="bg-muted/50 p-4 rounded-lg border border-destructive/20">
                <p className="text-sm font-mono text-muted-foreground break-words">
                  {error.message || 'An unexpected error occurred'}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                    Error ID: <code className="font-mono">{error.digest}</code>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={reset}
                  variant="default"
                  size="lg"
                  className="min-h-[44px] cursor-pointer transition-colors duration-200"
                >
                  <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                  Try again
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[44px] cursor-pointer transition-colors duration-200"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" aria-hidden="true" />
                    Go to homepage
                  </Link>
                </Button>
              </div>

              {/* Help Text */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  If this problem persists, please{' '}
                  <Link
                    href="/contact"
                    className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm transition-colors duration-200"
                  >
                    contact support
                  </Link>
                  {' '}and include the error ID above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
