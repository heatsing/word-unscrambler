"use client"

import { Button } from "@/components/ui/button"

interface PaginationControlsProps {
  displayedCount: number
  totalCount: number
  onLoadMore: () => void
}

export function PaginationControls({
  displayedCount,
  totalCount,
  onLoadMore,
}: PaginationControlsProps) {
  if (totalCount === 0) return null

  const hasMore = displayedCount < totalCount
  const remaining = totalCount - displayedCount

  return (
    <div className="mt-6 space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Showing {displayedCount} of {totalCount} results
        </p>
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            className="h-11 px-8"
          >
            Load More ({Math.min(20, remaining)} more)
          </Button>
        </div>
      )}
    </div>
  )
}
