"use client"

import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, TrendingUp, ArrowUpDown, ArrowUp, ArrowDown, Filter, X, Heart, Star, Brain, GraduationCap, Grid3x3, List, BarChart3, Activity, Download, FileText, Table, CheckSquare, Square, GitCompare } from "lucide-react"
import { unscrambleWord, type WordResult, type DictionaryType, type PositionConstraint, type SortOption, type SortDirection } from "@/lib/word-utils"
import { getAvailableDictionaries, DEFAULT_DICTIONARY } from "@/lib/dictionary-config"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"
import { WordCompareDialog } from "@/components/word-compare-dialog"
import { useSearchHistory } from "@/hooks/use-search-history"
import { useFavoriteWords } from "@/hooks/use-favorite-words"
import { useWordLearning } from "@/hooks/use-word-learning"
import { SearchHistory } from "@/components/search-history"
import { ShareButton } from "@/components/share-button"
import { toast } from "sonner"
import {
  QuickFilters,
  LetterAnalysisPanel,
  ResultsStats,
  ViewModeToggle,
  LoadingState,
  EmptyState,
  WordGrid,
  WordGridVirtualized,
  AdvancedFilters,
  ActionButtons,
  CompareModeBanner,
  PaginationControls,
  HeaderActions,
  type ViewMode,
} from "@/components/word-search/index"

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
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(new Set())
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(20)
  const [allFilteredResults, setAllFilteredResults] = useState<WordResult[]>([])

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

  // Analyze letter frequency and value
  const analyzeLetters = useCallback((inputLetters: string) => {
    if (!inputLetters.trim()) return null

    const letterValues: Record<string, number> = {
      q: 10, z: 10, j: 8, x: 8,
      k: 5, v: 5, w: 5, y: 5,
      f: 4, h: 4, b: 3, p: 3, m: 3,
      g: 2, c: 2, d: 2, u: 2, l: 2,
      n: 1, r: 1, s: 1, t: 1,
      a: 1, e: 1, i: 1, o: 1,
    }

    const normalized = inputLetters.toLowerCase().replace(/[^a-z]/g, '')
    const letterCounts: Record<string, number> = {}
    let totalValue = 0

    for (const letter of normalized) {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1
      totalValue += letterValues[letter] || 0
    }

    const sortedLetters = Object.entries(letterCounts)
      .sort(([, a], [, b]) => b - a)

    const highValueLetters = Object.entries(letterCounts)
      .filter(([letter]) => (letterValues[letter] || 0) >= 5)

    const allLetters = 'abcdefghijklmnopqrstuvwxyz'
    const unusedLetters = allLetters.split('').filter(l => !letterCounts[l])

    return {
      letterCounts,
      sortedLetters,
      totalValue,
      averageValue: normalized.length > 0 ? Math.round(totalValue / normalized.length * 10) / 10 : 0,
      highValueLetters,
      unusedLetters: unusedLetters.slice(0, 10),
      totalLetters: normalized.length,
    }
  }, [])

  // Export results to CSV
  const exportToCSV = useCallback((words: WordResult[]) => {
    try {
      const headers = ['Word', 'Score', 'Length']
      const rows = words.map(w => [w.word, w.score.toString(), w.length.toString()])
      const csv = [headers, ...rows].map(row => row.join(',')).join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `word-unscrambler-results-${Date.now()}.csv`
      a.click()
      URL.revokeObjectURL(url)

      toast.success(`Exported ${words.length} words to CSV`)
    } catch (error) {
      toast.error('Failed to export CSV')
    }
  }, [])

  // Copy results as table
  const copyAsTable = useCallback((words: WordResult[]) => {
    const headers = 'Word\tScore\tLength'
    const rows = words.map(w => `${w.word}\t${w.score}\t${w.length}`)
    const table = [headers, ...rows].join('\n')

    navigator.clipboard.writeText(table).then(() => {
      toast.success(`Copied ${words.length} words to clipboard`)
    }).catch(() => {
      toast.error('Failed to copy to clipboard')
    })
  }, [])

  // Toggle favorite with toast notification
  const handleToggleFavorite = useCallback((word: string, score: number, length: number, dictionaryType?: string) => {
    const wasFavorite = isFavorite(word)
    toggleFavorite(word, score, length, dictionaryType)

    if (wasFavorite) {
      toast.success(`Removed "${word}" from favorites`)
    } else {
      toast.success(`Added "${word}" to favorites`)
    }
  }, [isFavorite, toggleFavorite])

  // Handle remove from learning with toast notification
  const handleRemoveFromLearning = useCallback((word: string) => {
    removeFromLearning(word)
    toast.success(`Removed "${word}" from learning list`)
  }, [removeFromLearning])

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
      setResults(foundWords)
      setAllFilteredResults(foundWords)
      setDisplayedResults(foundWords.slice(0, 20)) // Show first 20 initially
      setItemsToShow(20) // Reset pagination
      setActiveFilters(new Set()) // Clear filters on new search
      setIsSearching(false)

      // Add to search history
      if (foundWords.length > 0) {
        addToHistory(letters.trim())
      }
    }, 100)
  }, [letters, minLength, sortBy, sortDirection, dictionaryType, positionInput, startsWithInput, containsSequenceInput, mustNotContainInput, parsePositionConstraints, addToHistory])

  // Toggle word selection for comparison
  const toggleWordSelection = useCallback((word: string) => {
    setSelectedForCompare(prev => {
      const newSet = new Set(prev)
      if (newSet.has(word)) {
        newSet.delete(word)
      } else {
        if (newSet.size >= 5) {
          // Limit to 5 words for comparison
          return prev
        }
        newSet.add(word)
      }
      return newSet
    })
  }, [])

  // Clear all selections
  const clearSelection = useCallback(() => {
    setSelectedForCompare(new Set())
  }, [])

  // Get selected words data
  const getSelectedWordsData = useCallback(() => {
    return displayedResults.filter(w => selectedForCompare.has(w.word))
  }, [displayedResults, selectedForCompare])

  // Update displayed results when filters change
  useEffect(() => {
    const filtered = applyQuickFilters(results, activeFilters)
    setAllFilteredResults(filtered)
    setDisplayedResults(filtered.slice(0, itemsToShow))
  }, [activeFilters, results, applyQuickFilters, itemsToShow])

  // Load more results
  const loadMore = useCallback(() => {
    const newItemsToShow = itemsToShow + 20
    setItemsToShow(newItemsToShow)
    setDisplayedResults(allFilteredResults.slice(0, newItemsToShow))
  }, [itemsToShow, allFilteredResults])

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
          <Button size="lg" className="h-12 px-8" onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Unscramble
              </>
            )}
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
                className="h-11 w-11 p-0"
                title={sortDirection === "desc" ? "Descending (High to Low)" : "Ascending (Low to High)"}
              >
                {sortDirection === "desc" ? (
                  <ArrowDown className="h-5 w-5" />
                ) : (
                  <ArrowUp className="h-5 w-5" />
                )}
              </Button>
            </div>

          </div>

          <AdvancedFilters
            showAdvanced={showAdvanced}
            onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
            startsWithInput={startsWithInput}
            onStartsWithChange={setStartsWithInput}
            containsSequenceInput={containsSequenceInput}
            onContainsSequenceChange={setContainsSequenceInput}
            mustNotContainInput={mustNotContainInput}
            onMustNotContainChange={setMustNotContainInput}
            positionInput={positionInput}
            onPositionChange={setPositionInput}
          />
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
                className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer relative group focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              >
                <div
                  onClick={() => {
                    setSelectedWord(fav.word)
                    setSelectedWordData({ score: fav.score, length: fav.length, dictionaryType: fav.dictionaryType })
                    setDialogOpen(true)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedWord(fav.word)
                      setSelectedWordData({ score: fav.score, length: fav.length, dictionaryType: fav.dictionaryType })
                      setDialogOpen(true)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${fav.word}, ${fav.score} points, ${fav.length} letters`}
                >
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
                  className="absolute top-2 right-2 h-11 w-11 p-0 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleFavorite(fav.word, fav.score, fav.length, fav.dictionaryType)
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
                className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer relative group focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              >
                <div
                  onClick={() => {
                    setSelectedWord(word.word)
                    setSelectedWordData({ score: word.score, length: word.length, dictionaryType: word.dictionaryType })
                    setDialogOpen(true)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedWord(word.word)
                      setSelectedWordData({ score: word.score, length: word.length, dictionaryType: word.dictionaryType })
                      setDialogOpen(true)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${word.word}, ${word.score} points, ${word.length} letters, ${word.masteryLevel} level`}
                >
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
                  className="absolute top-2 right-14 h-11 w-11 p-0 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFromLearning(word.word)
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
            <LoadingState />
          ) : results.length > 0 ? (
            <>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    Found {results.length} word{results.length !== 1 ? "s" : ""}
                    {activeFilters.size > 0 && ` (showing ${displayedResults.length} filtered)`}
                  </h3>
                  <Badge variant="secondary" className="text-sm">
                    {letters.toUpperCase()}
                  </Badge>
                </div>
                <HeaderActions
                  favoritesCount={favorites.length}
                  learningCount={learningWords.length}
                  showFavorites={showFavorites}
                  showLearning={showLearning}
                  compareMode={compareMode}
                  selectedCount={selectedForCompare.size}
                  displayedResultsCount={displayedResults.length}
                  onToggleFavorites={() => {
                    setShowFavorites(!showFavorites)
                    setShowLearning(false)
                  }}
                  onToggleLearning={() => {
                    setShowLearning(!showLearning)
                    setShowFavorites(false)
                  }}
                  onCopyAll={() => {
                    const wordList = displayedResults.map(r => r.word).join(', ')
                    navigator.clipboard.writeText(wordList)
                    toast.success('Copied all words to clipboard')
                  }}
                  onToggleCompareMode={() => {
                    setCompareMode(!compareMode)
                    if (compareMode) {
                      clearSelection()
                    }
                  }}
                  onShowCompareDialog={() => setShowCompareDialog(true)}
                  shareTitle="Word Unscrambler Results"
                  shareText={`I found ${results.length} words from "${letters.toUpperCase()}"! Top words: ${displayedResults.slice(0, 5).map(r => r.word).join(', ')}`}
                />
              </div>

              {/* Compare Mode Info */}
              {compareMode && <CompareModeBanner selectedCount={selectedForCompare.size} />}

              {/* Quick Filter Tags */}
              <QuickFilters
                filters={getAvailableFilters(results)}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
                onClearFilters={clearFilters}
              />

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

              {/* Letter Analysis Panel */}
              {(() => {
                const analysis = analyzeLetters(letters)
                if (!analysis) return null

                return (
                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        Letter Analysis
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Frequency and value analysis of your input letters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Letter Frequency */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-semibold text-muted-foreground">Letter Frequency</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {analysis.sortedLetters.map(([letter, count]) => (
                            <Badge key={letter} variant="secondary" className="text-xs">
                              {letter.toUpperCase()} × {count}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Value Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Total Letters</p>
                          <p className="text-lg font-bold">{analysis.totalLetters}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Total Value</p>
                          <p className="text-lg font-bold text-primary">{analysis.totalValue}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Avg Value</p>
                          <p className="text-lg font-bold">{analysis.averageValue}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">High Value</p>
                          <p className="text-lg font-bold text-yellow-600">{analysis.highValueLetters.length}</p>
                        </div>
                      </div>

                      {/* High Value Letters */}
                      {analysis.highValueLetters.length > 0 && (
                        <div className="space-y-2 pt-2 border-t">
                          <h5 className="text-xs font-semibold text-muted-foreground">High Value Letters (5+ pts)</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {analysis.highValueLetters.map(([letter, count]) => (
                              <Badge key={letter} variant="default" className="text-xs bg-yellow-600">
                                {letter.toUpperCase()} × {count}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Unused Letters Suggestions */}
                      {analysis.unusedLetters.length > 0 && (
                        <div className="space-y-2 pt-2 border-t">
                          <h5 className="text-xs font-semibold text-muted-foreground">Suggested Letters to Add</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {analysis.unusedLetters.map((letter) => (
                              <Badge key={letter} variant="outline" className="text-xs opacity-60">
                                {letter.toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground italic">
                            Try adding these common letters to find more words
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })()}

              {/* Export Options */}
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Export Results</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => exportToCSV(displayedResults)}
                    disabled={displayedResults.length === 0}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyAsTable(displayedResults)}
                    disabled={displayedResults.length === 0}
                  >
                    <Table className="h-3 w-3 mr-1" />
                    Copy Table
                  </Button>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-muted-foreground">Display Mode</h4>
                <div className="flex gap-1 border rounded-lg p-1">
                  <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                </div>
              </div>

              {/* Render Results - Use virtualization for large lists */}
              {allFilteredResults.length > 100 ? (
                <WordGridVirtualized
                  words={allFilteredResults}
                  viewMode={viewMode}
                  compareMode={compareMode}
                  selectedForCompare={selectedForCompare}
                  dictionaryType={dictionaryType}
                  isFavorite={isFavorite}
                  onWordClick={(word) => {
                    setSelectedWord(word.word)
                    setSelectedWordData({ score: word.score, length: word.length, dictionaryType })
                    setDialogOpen(true)
                  }}
                  onFavoriteClick={(word, score, length, dict) => {
                    toggleFavorite(word, score, length, dict)
                  }}
                  onCompareToggle={toggleWordSelection}
                />
              ) : (
                <WordGrid
                  words={displayedResults}
                  viewMode={viewMode}
                  compareMode={compareMode}
                  selectedForCompare={selectedForCompare}
                  dictionaryType={dictionaryType}
                  isFavorite={isFavorite}
                  onWordClick={(word) => {
                    setSelectedWord(word.word)
                    setSelectedWordData({ score: word.score, length: word.length, dictionaryType })
                    setDialogOpen(true)
                  }}
                  onFavoriteClick={(word, score, length, dict) => {
                    toggleFavorite(word, score, length, dict)
                  }}
                  onCompareToggle={toggleWordSelection}
                />
              )}

              {/* Pagination Controls - Only for non-virtualized lists */}
              {allFilteredResults.length <= 100 && (
                <PaginationControls
                  displayedCount={displayedResults.length}
                  totalCount={allFilteredResults.length}
                  onLoadMore={loadMore}
                />
              )}
            </>
          ) : letters.length >= 2 ? (
            <EmptyState letters={letters} />
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

      {/* Word Compare Dialog */}
      <WordCompareDialog
        words={getSelectedWordsData()}
        open={showCompareDialog}
        onOpenChange={setShowCompareDialog}
        dictionaryType={dictionaryType}
      />
    </div>
  )
}
