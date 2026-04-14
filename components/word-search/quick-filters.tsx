"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

interface FilterOption {
  id: string
  label: string
  count: number
}

interface QuickFiltersProps {
  filters: FilterOption[]
  activeFilters: Set<string>
  onToggleFilter: (filterId: string) => void
  onClearFilters: () => void
}

export function QuickFilters({
  filters,
  activeFilters,
  onToggleFilter,
  onClearFilters,
}: QuickFiltersProps) {
  if (filters.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 items-center p-3 bg-muted/30 rounded-lg border">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Filter className="h-3.5 w-3.5" />
        <span>Quick Filters:</span>
      </div>
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant={activeFilters.has(filter.id) ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => onToggleFilter(filter.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onToggleFilter(filter.id)
            }
          }}
          tabIndex={0}
          role="button"
          aria-pressed={activeFilters.has(filter.id)}
        >
          {filter.label} ({filter.count})
        </Badge>
      ))}
      {activeFilters.size > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-6 px-2 text-xs"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
