import { useState, useEffect, useCallback } from 'react'

const ONBOARDING_KEY = 'word-unscrambler-onboarding-completed'

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if onboarding has been completed
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY)

    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }

    setIsLoaded(true)
  }, [])

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setShowOnboarding(false)
  }, [])

  const skipOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setShowOnboarding(false)
  }, [])

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(ONBOARDING_KEY)
    setShowOnboarding(true)
  }, [])

  return {
    showOnboarding,
    isLoaded,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding,
  }
}
