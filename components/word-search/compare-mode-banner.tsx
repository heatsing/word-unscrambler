"use client"

import { GitCompare } from "lucide-react"

interface CompareModeBannerProps {
  selectedCount: number
}

export function CompareModeBanner({ selectedCount }: CompareModeBannerProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex items-center gap-2">
        <GitCompare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Select 2-5 words to compare. Click on words to select them.
        </p>
      </div>
      {selectedCount > 0 && (
        <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {selectedCount} selected
        </div>
      )}
    </div>
  )
}
