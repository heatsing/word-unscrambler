"use client"

import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, TrendingUp, ArrowUpDown, ArrowUp, ArrowDown, Filter, X, Heart, Star, Brain, GraduationCap, Grid3x3, List, BarChart3 } from "lucide-react"
import { unscrambleWord, type WordResult, type DictionaryType, type PositionConstraint, type SortOption, type SortDirection } from "@/lib/word-utils"
import { getAvailableDictionaries, DEFAULT_DICTIONARY } from "@/lib/dictionary-config"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"
import { useSearchHistory } from "@/hooks/use-search-history"
import { useFavoriteWords } from "@/hooks/use-favorite-words"
import { useWordLearning } from "@/hooks/use-word-learning"
import { SearchHistory } from "@/components/search-history"
import { ShareButton } from "@/components/share-button"

type ViewMode = "list" | "groupByLength" | "groupByLetter"

export function WordSearch() {
  const [letters, setLetters] = useState("")
  const [results, setResults] = useState<WordResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [minLength, setMinLength] = useState<number>(2)
  const [sortBy, setSortBy] = useState<SortOption>("score")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>(DEFAULT_DICTIONARY)
  const [selectedWord, setSelectedWord] = useState<string>("")
  const [selectedWordData, setSelectedWordData] = useState<{ score: number; length: number; dictionaryType?: string }>({ score: 0, length: 0 })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [positionInput, setPositionInput] = useState<string>("")
  const [startsWithInput, setStartsWithInput] = useState<string>("")
  const [containsSequenceInput, setContainsSequenceInput] = useState<string>("")
  const [mustNotContainInput, setMustNotContainInput] = useState<string>("")
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [displayedResults, setDisplayedResults] = useState<WordResult[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [showLearning, setShowLearning] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("list")

  const { history, isLoaded, addToHistory, removeFromHistory, clearHistory } = useSearchHistory('word-unscrambler')
  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavoriteWords()
  const { learningWords, isLearning, removeFromLearning, clearLearningData, getStatistics, getDueWords } = useWordLearning()

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

  // Group words by length
  const groupByLength = useCallback((words: WordResult[]) => {
    const groups: Record<number, WordResult[]> = {}
    words.forEach(word => {
      if (!groups[word.length]) {
        groups[word.length] = []
      }
      groups[word.length].push(word)
    })
    return groups
  }, [])

  // Group words by first letter
  const groupByFirstLetter = useCallback((words: WordResult[]) => {
    const groups: Record<string, WordResult[]> = {}
    words.forEach(word => {
      const firstLetter = word.word[0].toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(word)
    })
    return groups
  }, [])

  // Calculate statistics
  const getResultStatistics = useCallback((words: WordResult[]) => {
    if (words.length === 0) return null

    const totalWords = words.length
    const totalScore = words.reduce((sum, w) => sum + w.score, 0)
    const avgScore = Math.round(totalScore / totalWords)
    const maxScore = Math.max(...words.map(w => w.score))
    const minScore = Math.min(...words.map(w => w.score))
    const avgLength = Math.round(words.reduce((sum, w) => sum + w.length, 0) / totalWords * 10) / 10
    const maxLength = Math.max(...words.map(w => w.length))
    const minLength = Math.min(...words.map(w => w.length))

    const highestScoringWord = words.reduce((max, w) => w.score > max.score ? w : max, words[0])
    const longestWord = words.reduce((max, w) => w.length > max.length ? w : max, words[0])

    return {
      totalWords,
      avgScore,
      maxScore,
      minScore,
      avgLength,
      maxLength,
      minLength,
      highestScoringWord,
      longestWord,
    }
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
        startsWith: startsWithInput.trim() || undefined,
        containsSequence: containsSequenceInput.trim() || undefined,
        mustNotContain: mustNotContainInput.trim() || undefined,
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
  }, [letters, minLength, sortBy, sortDirection, dictionaryType, positionInput, startsWithInput, containsSequenceInput, mustNotContainInput, parsePositionConstraints, addToHistory])

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
                    onChange={(e) => setStartsWithInput(e.target.value.toLowerCase())}
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
                    onChange={(e) => setContainsSequenceInput(e.target.value.toLowerCase())}
                    className="h-8 text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Words with this letter sequence
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
                    onChange={(e) => setMustNotContainInput(e.target.value.toLowerCase())}
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
                    placeholder="e.g., 1:h,5:o"
                    value={positionInput}
                    onChange={(e) => setPositionInput(e.target.value.toLowerCase())}
                    className="h-8 text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Letter at specific positions
                  </p>
                </div>
              </div>

              {/* Clear All Advanced Filters Button */}
              {(startsWithInput || containsSequenceInput || mustNotContainInput || positionInput) && (
                <div className="flex justify-end pt-2 border-t">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setStartsWithInput("")
                      setContainsSequenceInput("")
                      setMustNotContainInput("")
                      setPositionInput("")
                    }}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Favorites Section */}
      {showFavorites && favorites.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              Favorite Words ({favorites.length})
            </h3>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowFavorites(false)}
              >
                Back to Results
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={clearFavorites}
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {favorites.map((fav, index) => (
              <Card
                key={`${fav.word}-${index}`}
                className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer relative group"
              >
                <div onClick={() => {
                  setSelectedWord(fav.word)
                  setSelectedWordData({ score: fav.score, length: fav.length, dictionaryType: fav.dictionaryType })
                  setDialogOpen(true)
                }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold capitalize">
                      {fav.word}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{fav.score} pts</span>
                      </div>
                      <div className="text-muted-foreground">
                        {fav.length} letters
                      </div>
                    </div>
                  </CardContent>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(fav.word, fav.score, fav.length, fav.dictionaryType)
                  }}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Learning Words Section */}
      {showLearning && learningWords.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Learning Words ({learningWords.length})
              </h3>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                {(() => {
                  const stats = getStatistics()
                  const dueWords = getDueWords()
                  return (
                    <>
                      <span>New: {stats.newWords}</span>
                      <span>Learning: {stats.learningCount}</span>
                      <span>Familiar: {stats.familiarCount}</span>
                      <span>Mastered: {stats.masteredCount}</span>
                      <span className="text-primary font-medium">Due: {dueWords.length}</span>
                    </>
                  )
                })()}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowLearning(false)}
              >
                Back to Results
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={clearLearningData}
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {learningWords.map((word, index) => (
              <Card
                key={`${word.word}-${index}`}
                className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer relative group"
              >
                <div onClick={() => {
                  setSelectedWord(word.word)
                  setSelectedWordData({ score: word.score, length: word.length, dictionaryType: word.dictionaryType })
                  setDialogOpen(true)
                }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-bold capitalize">
                        {word.word}
                      </CardTitle>
                      <Badge
                        variant={
                          word.masteryLevel === 'mastered' ? 'default' :
                          word.masteryLevel === 'familiar' ? 'secondary' :
                          'outline'
                        }
                        className="text-xs"
                      >
                        {word.masteryLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{word.score} pts</span>
                      </div>
                      <div className="text-muted-foreground">
                        {word.length} letters
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        <span>Reviewed {word.reviewCount} times</span>
                      </div>
                      {word.lastReviewed && (
                        <div className="mt-1">
                          Last: {new Date(word.lastReviewed).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-14 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromLearning(word.word)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Results Section */}
      {!showFavorites && !showLearning && letters.length > 0 && (
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
                      setShowFavorites(!showFavorites)
                      setShowLearning(false)
                    }}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${showFavorites ? 'fill-red-500 text-red-500' : ''}`} />
                    Favorites ({favorites.length})
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowLearning(!showLearning)
                      setShowFavorites(false)
                    }}
                  >
                    <Brain className={`h-4 w-4 mr-1 ${showLearning ? 'text-primary' : ''}`} />
                    Learning ({learningWords.length})
                  </Button>
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

              {/* Statistics Panel */}
              {(() => {
                const stats = getResultStatistics(displayedResults)
                if (!stats) return null

                return (
                  <Card className="bg-muted/30 border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Results Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Total Words</p>
                        <p className="text-xl font-bold text-primary">{stats.totalWords}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                        <p className="text-xl font-bold">{stats.avgScore}</p>
                        <p className="text-xs text-muted-foreground">Range: {stats.minScore}-{stats.maxScore}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Avg Length</p>
                        <p className="text-xl font-bold">{stats.avgLength}</p>
                        <p className="text-xs text-muted-foreground">Range: {stats.minLength}-{stats.maxLength}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Best Word</p>
                        <p className="text-lg font-bold capitalize">{stats.highestScoringWord.word}</p>
                        <p className="text-xs text-muted-foreground">{stats.highestScoringWord.score} pts</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })()}

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-muted-foreground">Display Mode</h4>
                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "ghost"}
                    onClick={() => setViewMode("list")}
                    className="h-8 px-3"
                  >
                    <List className="h-4 w-4 mr-1" />
                    List
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "groupByLength" ? "default" : "ghost"}
                    onClick={() => setViewMode("groupByLength")}
                    className="h-8 px-3"
                  >
                    <Grid3x3 className="h-4 w-4 mr-1" />
                    By Length
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "groupByLetter" ? "default" : "ghost"}
                    onClick={() => setViewMode("groupByLetter")}
                    className="h-8 px-3"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    By Letter
                  </Button>
                </div>
              </div>

              {/* List View */}
              {viewMode === "list" && (
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {displayedResults.map((result, index) => {
                  const isWordFavorited = isFavorite(result.word)
                  return (
                    <Card
                      key={`${result.word}-${index}`}
                      className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer relative group"
                    >
                      <div onClick={() => {
                        setSelectedWord(result.word)
                        setSelectedWordData({ score: result.score, length: result.length, dictionaryType })
                        setDialogOpen(true)
                      }}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-xl font-bold capitalize">
                              {result.word}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              {index < 3 && (
                                <Badge variant="default" className="ml-2">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Top
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex gap-4 text-sm items-center justify-between">
                            <div className="flex gap-4">
                              <div className="flex items-center gap-1">
                                <Sparkles className="h-4 w-4 text-yellow-500" />
                                <span className="font-semibold">{result.score} pts</span>
                              </div>
                              <div className="text-muted-foreground">
                                {result.length} letters
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(result.word, result.score, result.length, dictionaryType)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${isWordFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                        />
                      </Button>
                    </Card>
                  )
                })}
                </div>
              )}

              {/* Group By Length View */}
              {viewMode === "groupByLength" && (() => {
                const groups = groupByLength(displayedResults)
                const sortedLengths = Object.keys(groups).map(Number).sort((a, b) => b - a)

                return (
                  <div className="space-y-4">
                    {sortedLengths.map(length => (
                      <div key={length} className="space-y-2">
                        <h4 className="font-semibold text-sm flex items-center gap-2 sticky top-0 bg-background py-2 z-10">
                          <Badge variant="secondary">{length} Letters</Badge>
                          <span className="text-muted-foreground text-xs">({groups[length].length} words)</span>
                        </h4>
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                          {groups[length].map((result, index) => {
                            const isWordFavorited = isFavorite(result.word)
                            return (
                              <Card
                                key={`${result.word}-${index}`}
                                className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer relative group"
                              >
                                <div onClick={() => {
                                  setSelectedWord(result.word)
                                  setSelectedWordData({ score: result.score, length: result.length, dictionaryType })
                                  setDialogOpen(true)
                                }}>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-xl font-bold capitalize">
                                      {result.word}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-0">
                                    <div className="flex gap-4 text-sm">
                                      <div className="flex items-center gap-1">
                                        <Sparkles className="h-4 w-4 text-yellow-500" />
                                        <span className="font-semibold">{result.score} pts</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(result.word, result.score, result.length, dictionaryType)
                                  }}
                                >
                                  <Heart
                                    className={`h-4 w-4 ${isWordFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                                  />
                                </Button>
                              </Card>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })()}

              {/* Group By Letter View */}
              {viewMode === "groupByLetter" && (() => {
                const groups = groupByFirstLetter(displayedResults)
                const sortedLetters = Object.keys(groups).sort()

                return (
                  <div className="space-y-4">
                    {sortedLetters.map(letter => (
                      <div key={letter} className="space-y-2">
                        <h4 className="font-semibold text-sm flex items-center gap-2 sticky top-0 bg-background py-2 z-10">
                          <Badge variant="secondary" className="text-lg w-10 h-10 flex items-center justify-center">{letter}</Badge>
                          <span className="text-muted-foreground text-xs">({groups[letter].length} words)</span>
                        </h4>
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                          {groups[letter].map((result, index) => {
                            const isWordFavorited = isFavorite(result.word)
                            return (
                              <Card
                                key={`${result.word}-${index}`}
                                className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer relative group"
                              >
                                <div onClick={() => {
                                  setSelectedWord(result.word)
                                  setSelectedWordData({ score: result.score, length: result.length, dictionaryType })
                                  setDialogOpen(true)
                                }}>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-xl font-bold capitalize">
                                      {result.word}
                                    </CardTitle>
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
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(result.word, result.score, result.length, dictionaryType)
                                  }}
                                >
                                  <Heart
                                    className={`h-4 w-4 ${isWordFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                                  />
                                </Button>
                              </Card>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })()}
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
        score={selectedWordData.score}
        length={selectedWordData.length}
        dictionaryType={selectedWordData.dictionaryType}
      />
    </div>
  )
}
