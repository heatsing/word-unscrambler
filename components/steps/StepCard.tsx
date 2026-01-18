import React from 'react'
import { cn } from '@/lib/utils'

export interface StepItem {
  number?: number
  title: string
  description: string | React.ReactNode
  icon?: React.ReactNode
  example?: {
    label?: string
    content: React.ReactNode
  }
  tip?: string
}

interface StepCardProps extends StepItem {
  headingLevel?: 'h2' | 'h3' | 'h4'
  showConnector?: boolean
  className?: string
}

export function StepCard({
  number,
  title,
  description,
  icon,
  example,
  tip,
  headingLevel = 'h3',
  showConnector = false,
  className,
}: StepCardProps) {
  const HeadingTag = headingLevel

  return (
    <div className={cn('relative space-y-2', className)}>
      <HeadingTag className="font-semibold flex items-center gap-2">
        {number !== undefined && (
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-xs flex-shrink-0">
            {number}
          </div>
        )}
        {icon}
        <span>{title}</span>
      </HeadingTag>

      <div className="text-muted-foreground text-xs">
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>

      {example && (
        <div className="bg-background p-4 rounded-lg border mt-2">
          {example.label && (
            <p className="text-xs font-medium mb-2">{example.label}</p>
          )}
          {example.content}
        </div>
      )}

      {tip && (
        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-900 dark:text-blue-100">
            <strong className="font-medium">💡 Tip:</strong> {tip}
          </p>
        </div>
      )}

      {showConnector && (
        <div
          className="absolute left-3 top-8 bottom-0 w-px bg-border -mb-4"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
