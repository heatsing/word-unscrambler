"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"

interface AdvancedFiltersProps {
  showAdvanced: boolean
  onToggleAdvanced: () => void
  startsWithInput: string
  onStartsWithChange: (value: string) => void
  containsSequenceInput: string
  onContainsSequenceChange: (value: string) => void
  mustNotContainInput: string
  onMustNotContainChange: (value: string) => void
  positionInput: string
  onPositionChange: (value: string) => void
}

export function AdvancedFilters({
  showAdvanced,
  onToggleAdvanced,
  startsWithInput,
  onStartsWithChange,
  containsSequenceInput,
  onContainsSequenceChange,
  mustNotContainInput,
  onMustNotContainChange,
  positionInput,
  onPositionChange,
}: AdvancedFiltersProps) {
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleAdvanced}
        className="w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </span>
        {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {showAdvanced && (
        <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Search Filters
          </h4>

          <div className="grid gap-3 md:grid-cols-2">
            {/* Starts With */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">
                Starts With
              </label>
              <Input
                type="text"
                placeholder="e.g., ca"
                value={startsWithInput}
                onChange={(e) => onStartsWithChange(e.target.value.toLowerCase())}
                className="h-8 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Words beginning with these letters
              </p>
            </div>

            {/* Contains Sequence */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">
                Contains Sequence
              </label>
              <Input
                type="text"
                placeholder="e.g., ing"
                value={containsSequenceInput}
                onChange={(e) => onContainsSequenceChange(e.target.value.toLowerCase())}
                className="h-8 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Words containing this exact sequence
              </p>
            </div>

            {/* Must NOT Contain */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">
                Must NOT Contain
              </label>
              <Input
                type="text"
                placeholder="e.g., xyz"
                value={mustNotContainInput}
                onChange={(e) => onMustNotContainChange(e.target.value.toLowerCase())}
                className="h-8 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Exclude words with these letters
              </p>
            </div>

            {/* Position Filter */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">
                Position Filter
              </label>
              <Input
                type="text"
                placeholder="e.g., 1:a,3:t"
                value={positionInput}
                onChange={(e) => onPositionChange(e.target.value)}
                className="h-8 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Format: position:letter (1:a = 'a' at position 1)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
