"use client"

import { Search } from "lucide-react"

export function LoadingState() {
  return (
    <div className="text-center py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary"></div>
          <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">Searching for words...</p>
          <p className="text-sm text-muted-foreground">
            Analyzing your letters and finding matches
          </p>
        </div>
      </div>
    </div>
  )
}
