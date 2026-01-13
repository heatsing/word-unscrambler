"use client"

import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, TrendingUp } from "lucide-react"
import { unscrambleWord, type WordResult } from "@/lib/word-utils"

export function WordSearch() {
  const [letters, setLetters] = useState("")
  const [results, setResults] = useState<WordResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [minLength, setMinLength] = useState<number>(2)
  const [sortBy, setSortBy] = useState<"score" | "length" | "alpha">("score")

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
      })
      setResults(foundWords.slice(0, 50)) // Limit to 50 results for performance
      setIsSearching(false)
    }, 100)
  }, [letters, minLength, sortBy])

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
              placeholder="Enter your letters here... (e.g., 'listen')"
              className="pl-10 h-12 text-lg"
              value={letters}
              onChange={(e) => setLetters(e.target.value.toLowerCase())}
              maxLength={15}
            />
          </div>
          <Button size="lg" className="h-12 px-8" onClick={handleSearch}>
            Unscramble
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap items-center text-sm">
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
              <option value="score">Scrabble Score</option>
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
                <Badge variant="secondary" className="text-sm">
                  {letters.toUpperCase()}
                </Badge>
              </div>

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {results.map((result, index) => (
                  <Card
                    key={`${result.word}-${index}`}
                    className="hover:shadow-md transition-shadow hover:border-primary/50"
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
                <p className="text-muted-foreground">
                  No words found with the letters "{letters.toUpperCase()}".
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try using different letters or fewer filters.
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}

      {/* Help Text */}
      {letters.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            💡 <strong>Tip:</strong> Enter "listen" to find words like "silent", "enlist", "tinsel"
          </p>
        </div>
      )}
    </div>
  )
}
