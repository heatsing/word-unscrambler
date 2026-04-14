import { useState, useCallback } from 'react'
import { toast } from 'sonner'

interface ErrorHandlerOptions {
  showToast?: boolean
  toastMessage?: string
  onError?: (error: Error) => void
}

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null)
  const [isError, setIsError] = useState(false)

  const handleError = useCallback((error: Error | unknown, options: ErrorHandlerOptions = {}) => {
    const {
      showToast = true,
      toastMessage,
      onError,
    } = options

    const errorObj = error instanceof Error ? error : new Error(String(error))

    setError(errorObj)
    setIsError(true)

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by useErrorHandler:', errorObj)
    }

    // Show toast notification
    if (showToast) {
      toast.error(toastMessage || errorObj.message || 'An unexpected error occurred')
    }

    // Call custom error handler
    if (onError) {
      onError(errorObj)
    }

    // In production, send to error reporting service
    // Example: Sentry.captureException(errorObj)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
    setIsError(false)
  }, [])

  const resetError = clearError // Alias for clarity

  return {
    error,
    isError,
    handleError,
    clearError,
    resetError,
  }
}

// Utility function for wrapping async functions with error handling
export function withErrorHandler<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ErrorHandlerOptions = {}
): (...args: Parameters<T>) => Promise<ReturnType<T> | null> {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error))

      if (options.showToast !== false) {
        toast.error(options.toastMessage || errorObj.message || 'An unexpected error occurred')
      }

      if (options.onError) {
        options.onError(errorObj)
      }

      if (process.env.NODE_ENV === 'development') {
        console.error('Error in withErrorHandler:', errorObj)
      }

      return null
    }
  }
}
