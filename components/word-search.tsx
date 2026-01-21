"use client"

import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, TrendingUp, ArrowUpDown, ArrowUp, ArrowDown, Filter, X } from "lucide-react"
import { unscrambleWord, type WordResult, type DictionaryType, type PositionConstraint, type SortOption, type SortDirection } from "@/lib/word-utils"
import { getAvailableDictionaries, DEFAULT_DICTIONARY } from "@/lib/dictionary-config"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"
import { useSearchHistory } from "@/hooks/use-search-history"
import { SearchHistory } from "@/components/search-history"
import { ShareButton } from "@/components/share-button"

export function WordSearch() {
  const [letters, setLetters] = useState("")
  const [results, setResults] = useState<WordResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [minLength, setMinLength] = useState<number>(2)
  const [sortBy, setSortBy] = useState<SortOption>("score")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>(DEFAULT_DICTIONARY)
  const [selectedWord, setSelectedWord] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [positionInput, setPositionInput] = useState<string>("")
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [displayedResults, setDisplayedResults] = useState<WordResult[]>([])

  const { history, isLoaded, addToHistory, removeFromHistory, clearHistory } = useSearchHistory('word-unscrambler')

  // Generate available quick filters based on results
  const getAvailableFilters = useCallback((words: WordResult[]) => {
    if (words.length === 0) return []

    const filters: { id: string; label: string; count: number }[] = []
    const lengthCounts: Record<number, number> = {}
    let highScoreCount = 0
    let rareLetterCount = 0
    let commonOnlyCount = 0

    const rareLetters = new Set(['q', 'z', 'j', 'x', 'k'])
    const avgScore = words.reduce((sum, w) => sum + w.score, 0) / words.length

    words.forEach((word) => {
      // Count by length
      lengthCounts[word.length] = (lengthCounts[word.length] || 0) + 1

      // High score (above average)
      if (word.score > avgScore) highScoreCount++

      // Contains rare letters
      if (word.word.split('').some(l => rareLetters.has(l))) rareLetterCount++

      // Common letters only
      if (!word.word.split('').some(l => rareLetters.has(l))) commonOnlyCount++
    })

    // Add length filters (only for lengths with 3+ words)
    Object.entries(lengthCounts)
      .filter(([_, count]) => count >= 3)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .forEach(([length, count]) => {
        filters.push({
          id: `length-${length}`,
          label: `${length} letters`,
          count,
        })
      })

    // Add score filter
    if (highScoreCount >= 3) {
      filters.push({
        id: 'high-score',
        label: 'High Score',
        count: highScoreCount,
      })
    }

    // Add rare letter filter
    if (rareLetterCount >= 3) {
      filters.push({
        id: 'rare-letters',
        label: 'Rare Letters',
        count: rareLetterCount,
      })
    }

    // Add common only filter
    if (commonOnlyCount >= 3) {
      filters.push({
        id: 'common-only',
        label: 'Common Letters',
        count: commonOnlyCount,
      })
    }

    return filters
  }, [])

  // Apply quick filters to results
  const applyQuickFilters = useCallback((words: WordResult[], filters: Set<string>) => {
    if (filters.size === 0) return words

    const rareLetters = new Set(['q', 'z', 'j', 'x', 'k'])
    const avgScore = words.reduce((sum, w) => sum + w.score, 0) / words.length

    return words.filter((word) => {
      for (const filter of filters) {
        if (filter.startsWith('length-')) {
          const length = parseInt(filter.split('-')[1])
          if (word.length !== length) return false
        } else if (filter === 'high-score') {
          if (word.score <= avgScore) return false
        } else if (filter === 'rare-letters') {
          if (!word.word.split('').some(l => rareLetters.has(l))) return false
        } else if (filter === 'common-only') {
          if (word.word.split('').some(l => rareLetters.has(l))) return false
        }
      }
      return true
    })
  }, [])

  // Parse position input (format: "1:a,3:t" means position 1 is 'a', position 3 is 't')
  const parsePositionConstraints = useCallback((input: string): PositionConstraint[] => {
    if (!input.trim()) return []

    const constraints: PositionConstraint[] = []
    const parts = input.split(',').map(p => p.trim())

    for (const part of parts) {
      const match = part.match(/^(\d+):([a-z])$/i)
      if (match) {
        const position = parseInt(match[1]) - 1 // Convert to 0-based
        const letter = match[2].toLowerCase()
        if (position >= 0) {
          constraints.push({ position, letter })
        }
      }
    }

    return constraints
  }, [])

  const handleSearch = useCallback(() => {
    if (!letters.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)

    // Simulate async search (in case we add API calls later)
    setTimeout(() => {
      const positionConstraints = parsePositionConstraints(positionInput)
      const foundWords = unscrambleWord(letters, {
        minLength,
        sortBy,
        sortDirection,
        dictionaryType,
        positionConstraints: positionConstraints.length > 0 ? positionConstraints : undefined,
      })
      setResults(foundWords.slice(0, 100)) // Limit to 100 results for performance
      setDisplayedResults(foundWords.slice(0, 50)) // Show first 50 initially
      setActiveFilters(new Set()) // Clear filters on new search
      setIsSearching(false)

      // Add to search history
      if (foundWords.length > 0) {
        addToHistory(letters.trim())
      }
    }, 100)
  }, [letters, minLength, sortBy, sortDirection, dictionaryType, positionInput, parsePositionConstraints, addToHistory])

  // Update displayed results when filters change
  useEffect(() => {
    const filtered = applyQuickFilters(results, activeFilters)
    setDisplayedResults(filtered.slice(0, 50))
  }, [activeFilters, results, applyQuickFilters])

  // Toggle filter
  const toggleFilter = useCallback((filterId: string) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev)
      if (newFilters.has(filterId)) {
        newFilters.delete(filterId)
      } else {
        newFilters.add(filterId)
      }
      return newFilters
    })
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setActiveFilters(new Set())
  }, [])

  // Real-time search as user types
  useEffect(() => {
    if (letters.length >= 2) {
      const timer = setTimeout(() => {
        handleSearch()
      }, 300) // Debounce for 300ms

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setDisplayedResults([])
      setActiveFilters(new Set())
    }
  }, [letters, handleSearch])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter letters... Use ? or _ for wildcards (e.g., 'h?ll?')"
              className="pl-10 h-12 text-lg"
              value={letters}
              onChange={(e) => setLetters(e.target.value.toLowerCase())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              maxLength={15}
            />
          </div>
          <Button size="lg" className="h-12 px-8" onClick={handleSearch}>
            Unscramble
          </Button>
        </div>

        {/* Search History */}
        <SearchHistory
          history={history}
          isLoaded={isLoaded}
          onSelect={(query) => setLetters(query)}
          onRemove={removeFromHistory}
          onClearAll={clearHistory}
        />

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex gap-4 flex-wrap items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Dictionary:</span>
              <select
                value={dictionaryType}
                onChange={(e) => setDictionaryType(e.target.value as DictionaryType)}
                className="border rounded px-2 py-1 bg-background"
              >
                {getAvailableDictionaries().map((dict) => (
                  <option key={dict.id} value={dict.id}>
                    {dict.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Min Length:</span>
              <select
                value={minLength}
                onChange={(e) => setMinLength(Number(e.target.value))}
                className="border rounded px-2 py-1 bg-background"
              >
                {[2, 3, 4, 5, 6, 7].map((len) => (
                  <option key={len} value={len}>
                    {len}+ letters
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border rounded px-2 py-1 bg-background"
              >
                <option value="score">Score</option>
                <option value="length">Length</option>
                <option value="alpha">A-Z</option>
                <option value="rarity">Rarity</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSortDirection(sortDirection === "desc" ? "asc" : "desc")}
                className="h-8 w-8 p-0"
                title={sortDirection === "desc" ? "Descending (High to Low)" : "Ascending (Low to High)"}
              >
                {sortDirection === "desc" ? (
                  <ArrowDown className="h-4 w-4" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="ml-auto"
            >
              {showAdvanced ? "Hide" : "Show"} Advanced
            </Button>
          </div>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-medium min-w-[100px]">Position Filter:</span>
                <Input
                  type="text"
                  placeholder="e.g., 1:h,5:o (position:letter)"
                  value={positionInput}
                  onChange={(e) => setPositionInput(e.target.value.toLowerCase())}
                  className="h-8 text-sm flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground pl-[108px]">
                Specify letter positions (1-based). Example: <strong>1:c,3:t</strong> finds words with 'c' at position 1 and 't' at position 3.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {letters.length > 0 && (
        <div className="space-y-4">
          {isSearching ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Searching for words...</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Found {results.length} word{results.length !== 1 ? "s" : ""}
                  {activeFilters.size > 0 && ` (showing ${displayedResults.length} filtered)`}
                </h3>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {letters.toUpperCase()}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const wordList = displayedResults.map(r => r.word).join(', ')
                      navigator.clipboard.writeText(wordList)
                    }}
                  >
                    Copy All
                  </Button>
                  <ShareButton
                    title="Word Unscrambler Results"
                    text={`I found ${results.length} words from "${letters.toUpperCase()}"! Top words: ${displayedResults.slice(0, 5).map(r => r.word).join(', ')}`}
                    variant="outline"
                    size="sm"
                  />
                </div>
              </div>

              {/* Quick Filter Tags */}
              {getAvailableFilters(results).length > 0 && (
                <div className="flex flex-wrap gap-2 items-center p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Quick Filters:</span>
                  </div>
                  {getAvailableFilters(results).map((filter) => (
                    <Badge
                      key={filter.id}
                      variant={activeFilters.has(filter.id) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => toggleFilter(filter.id)}
                    >
                      {filter.label} ({filter.count})
                    </Badge>
                  ))}
                  {activeFilters.size > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-6 px-2 text-xs"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              )}

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {displayedResults.map((result, index) => (
                  <Card
                    key={`${result.word}-${index}`}
                    className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      setSelectedWord(result.word)
                      setDialogOpen(true)
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl font-bold capitalize">
                          {result.word}
                        </CardTitle>
                        {index < 3 && (
                          <Badge variant="default" className="ml-2">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Top
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{result.score} pts</span>
                        </div>
                        <div className="text-muted-foreground">
                          {result.length} letters
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : letters.length >= 2 ? (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">
                  No words found with "{letters.toUpperCase()}"
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Try these tips:
                </p>
                <ul className="text-sm text-muted-foreground text-left max-w-xs mx-auto space-y-1">
                  <li>• Use wildcards: Replace unknown letters with ? or _</li>
                  <li>• Use fewer letters (remove uncommon letters like Q, Z, X)</li>
                  <li>• Lower the minimum length filter</li>
                  <li>• Check for typos in your letters</li>
                  <li>• Try different letter combinations</li>
                </ul>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}

      {/* Help Text */}
      {letters.length === 0 && (
        <div className="text-center py-8 space-y-3">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              💡 <strong>Quick Start Examples:</strong>
            </p>
            <div className="space-y-1.5 max-w-xl mx-auto">
              <p>• Enter <strong>"listen"</strong> to find anagrams like "silent", "enlist", "tinsel"</p>
              <p>• Use <strong>"h?ll?"</strong> with wildcards to find "hello", "hallo", "hilly"</p>
              <p>• Try <strong>"c_t"</strong> to discover "cat", "cot", "cut"</p>
            </div>
          </div>
          <div className="pt-2 text-xs text-muted-foreground/80">
            <p><strong>Wildcards:</strong> Use ? or _ for any letter</p>
          </div>
        </div>
      )}

      {/* Word Definition Dialog */}
      <WordDefinitionDialog
        word={selectedWord}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
