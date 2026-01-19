import React from 'react'
import { StepCard, type StepItem } from './StepCard'

interface StepsProps {
  steps: StepItem[]
  headingLevel?: 'h2' | 'h3' | 'h4'
  showConnector?: boolean
  className?: string
}

export function Steps({
  steps,
  headingLevel = 'h3',
  showConnector = true,
  className,
}: StepsProps) {
  return (
    <div className={className} role="list">
      {steps.map((step, index) => (
        <div key={index} role="listitem">
          <StepCard
            {...step}
            number={step.number ?? index + 1}
            headingLevel={headingLevel}
            showConnector={showConnector && index < steps.length - 1}
          />
        </div>
      ))}
    </div>
  )
}
