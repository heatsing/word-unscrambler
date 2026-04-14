"use client"

import { useOnboarding } from "@/hooks/use-onboarding"
import { OnboardingDialog } from "./onboarding-dialog"
import { onboardingSteps } from "./onboarding-content"

interface OnboardingProviderProps {
  children: React.ReactNode
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const { showOnboarding, isLoaded, completeOnboarding, skipOnboarding } = useOnboarding()

  // Don't render until we've checked localStorage
  if (!isLoaded) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <OnboardingDialog
        steps={onboardingSteps}
        open={showOnboarding}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
      />
    </>
  )
}
