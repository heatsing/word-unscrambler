"use client"

import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, TrendingUp } from "lucide-react"
import { unscrambleWord, type WordResult, type DictionaryType } from "@/lib/word-utils"
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
  const [sortBy, setSortBy] = useState<"score" | "length" | "alpha">("score")
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>(DEFAULT_DICTIONARY)
  const [selectedWord, setSelectedWord] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const { history, isLoaded, addToHistory, removeFromHistory, clearHistory } = useSearchHistory('word-unscrambler')

  const handleSearch = useCallback(() => {
    if (!letters.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)

    // Simulate async search (in case we add API calls later)
    setTimeout(() => {
      const foundWords = unscrambleWord(letters, {
        minLength,
        sortBy,
        dictionaryType,
      })
      setResults(foundWords.slice(0, 50)) // Limit to 50 results for performance
      setIsSearching(false)

      // Add to search history
      if (foundWords.length > 0) {
        addToHistory(letters.trim())
      }
    }, 100)
  }, [letters, minLength, sortBy, dictionaryType, addToHistory])

  // Real-time search as user types
  useEffect(() => {
    if (letters.length >= 2) {
      const timer = setTimeout(() => {
        handleSearch()
      }, 300) // Debounce for 300ms

      return () => clearTimeout(timer)
    } else {
      setResults([])
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
              onChange={(e) => setSortBy(e.target.value as "score" | "length" | "alpha")}
              className="border rounded px-2 py-1 bg-background"
            >
              <option value="score">Score</option>
              <option value="length">Word Length</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
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
                </h3>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {letters.toUpperCase()}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const wordList = results.map(r => r.word).join(', ')
                      navigator.clipboard.writeText(wordList)
                    }}
                  >
                    Copy All
                  </Button>
                  <ShareButton
                    title="Word Unscrambler Results"
                    text={`I found ${results.length} words from "${letters.toUpperCase()}"! Top words: ${results.slice(0, 5).map(r => r.word).join(', ')}`}
                    variant="outline"
                    size="sm"
                  />
                </div>
              </div>

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {results.map((result, index) => (
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
