"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react"

interface OnboardingStep {
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
}

interface OnboardingDialogProps {
  steps: OnboardingStep[]
  onComplete: () => void
  onSkip: () => void
  open: boolean
}

export function OnboardingDialog({ steps, onComplete, onSkip, open }: OnboardingDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onSkip()
  }

  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleSkip()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{steps[currentStep].title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-base mt-4">
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        {steps[currentStep].icon && (
          <div className="flex justify-center py-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              {steps[currentStep].icon}
            </div>
          </div>
        )}

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-primary w-8"
                    : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {!isFirstStep && (
              <Button variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
            <Button onClick={handleNext}>
              {isLastStep ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </DialogFooter>

        <div className="text-center">
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-xs">
            Skip tutorial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
