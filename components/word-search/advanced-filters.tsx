"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, ChevronDown, ChevronUp, Sparkles, Zap } from "lucide-react"

// Filter presets for common search patterns
export const FILTER_PRESETS = [
  {
    id: "wordle-starter",
    name: "Wordle Starter",
    description: "Common 5-letter words",
    icon: Sparkles,
    filters: { length: 5, startsWith: "", contains: "", mustNotContain: "", position: "" }
  },
  {
    id: "ends-ing",
    name: "Ends in ING",
    description: "Words ending with ING",
    icon: Zap,
    filters: { length: 0, startsWith: "", contains: "ing", mustNotContain: "", position: "" }
  },
  {
    id: "starts-re",
    name: "Starts with RE",
    description: "Words beginning with RE",
    icon: Zap,
    filters: { length: 0, startsWith: "re", contains: "", mustNotContain: "", position: "" }
  },
  {
    id: "starts-un",
    name: "Starts with UN",
    description: "Words beginning with UN",
    icon: Zap,
    filters: { length: 0, startsWith: "un", contains: "", mustNotContain: "", position: "" }
  },
  {
    id: "no-vowels-aeiou",
    name: "No Common Vowels",
    description: "Exclude A, E, I, O, U",
    icon: Filter,
    filters: { length: 0, startsWith: "", contains: "", mustNotContain: "aeiou", position: "" }
  },
  {
    id: "7-letter-words",
    name: "7-Letter Words",
    description: "Perfect for Scrabble",
    icon: Sparkles,
    filters: { length: 7, startsWith: "", contains: "", mustNotContain: "", position: "" }
  },
]

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
  minLength?: number
  onMinLengthChange?: (value: number) => void
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
  minLength,
  onMinLengthChange,
}: AdvancedFiltersProps) {
  // Apply a filter preset
  const applyPreset = (preset: typeof FILTER_PRESETS[0]) => {
    onStartsWithChange(preset.filters.startsWith)
    onContainsSequenceChange(preset.filters.contains)
    onMustNotContainChange(preset.filters.mustNotContain)
    onPositionChange(preset.filters.position)
    if (preset.filters.length > 0 && onMinLengthChange) {
      onMinLengthChange(preset.filters.length)
    }
  }

  // Check if any filters are active
  const hasActiveFilters = startsWithInput || containsSequenceInput || mustNotContainInput || positionInput

  return (
    <div className="space-y-3">
      {/* Filter Presets - Always Visible */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Quick Presets
          </h4>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onStartsWithChange("")
                onContainsSequenceChange("")
                onMustNotContainChange("")
                onPositionChange("")
              }}
              className="h-7 text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTER_PRESETS.map((preset) => {
            const Icon = preset.icon
            return (
              <Button
                key={preset.id}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="h-8 text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Icon className="h-3 w-3 mr-1" />
                {preset.name}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleAdvanced}
        className="w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Custom Filters
          {hasActiveFilters && (
            <Badge variant="default" className="ml-2 h-5 px-1.5 text-xs">
              Active
            </Badge>
          )}
        </span>
        {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {showAdvanced && (
        <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Custom Search Filters
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
