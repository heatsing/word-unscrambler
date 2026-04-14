"use client"

import { useState, useEffect, useRef } from "react"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Search, Clock, TrendingUp } from "lucide-react"

interface SearchAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (value: string) => void
  suggestions?: string[]
}

// Common search patterns and popular queries
const popularSearches = [
  "hello", "world", "puzzle", "game", "words",
  "letter", "solve", "brain", "quick", "fast"
]

const commonPatterns = [
  { pattern: /^[a-z]{2,}$/, label: "Letters to unscramble" },
  { pattern: /^[a-z?_]{3,}$/, label: "Pattern with wildcards" },
  { pattern: /^\d+\s*letter/, label: "Word length search" },
]

export function SearchAutocomplete({
  value,
  onChange,
  onSelect,
  suggestions = popularSearches
}: SearchAutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLDivElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recent-searches')
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored).slice(0, 5))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  // Filter suggestions based on input
  useEffect(() => {
    if (!value || value.length < 2) {
      setFilteredSuggestions([])
      setShowSuggestions(false)
      return
    }

    const input = value.toLowerCase()
    const matches = suggestions.filter(s =>
      s.toLowerCase().includes(input) && s.toLowerCase() !== input
    ).slice(0, 5)

    setFilteredSuggestions(matches)
    setShowSuggestions(matches.length > 0 || recentSearches.length > 0)
  }, [value, suggestions, recentSearches])

  const handleSelect = (selected: string) => {
    onChange(selected)
    onSelect(selected)

    // Save to recent searches
    const updated = [selected, ...recentSearches.filter(s => s !== selected)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recent-searches', JSON.stringify(updated))

    setShowSuggestions(false)
  }

  const detectPattern = (input: string) => {
    for (const { pattern, label } of commonPatterns) {
      if (pattern.test(input)) {
        return label
      }
    }
    return null
  }

  if (!showSuggestions || !value) return null

  const patternLabel = detectPattern(value)

  return (
    <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg" ref={inputRef}>
      <Command className="border-none">
        <CommandList className="max-h-[300px]">
          {patternLabel && (
            <div className="px-2 py-1.5 text-xs text-muted-foreground border-b">
              <Search className="inline h-3 w-3 mr-1" />
              {patternLabel}
            </div>
          )}

          {filteredSuggestions.length > 0 && (
            <CommandGroup heading="Suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <CommandItem
                  key={`suggestion-${index}`}
                  onSelect={() => handleSelect(suggestion)}
                  className="cursor-pointer"
                >
                  <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{suggestion}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {recentSearches.length > 0 && (
            <CommandGroup heading="Recent">
              {recentSearches
                .filter(recent => !filteredSuggestions.includes(recent))
                .slice(0, 3)
                .map((recent, index) => (
                  <CommandItem
                    key={`recent-${index}`}
                    onSelect={() => handleSelect(recent)}
                    className="cursor-pointer"
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{recent}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          )}

          {filteredSuggestions.length === 0 && recentSearches.length === 0 && (
            <CommandEmpty>No suggestions</CommandEmpty>
          )}
        </CommandList>
      </Command>
    </div>
  )
}
