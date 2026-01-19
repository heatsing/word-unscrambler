"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Search, RefreshCw, Plus } from "lucide-react"

interface WordsByLengthTemplateProps {
  length: number
  words: string[]
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

export function WordsByLengthTemplate({ length, words }: WordsByLengthTemplateProps) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [displayCount, setDisplayCount] = useState(100)
  const [startsWith, setStartsWith] = useState("")
  const [endsWith, setEndsWith] = useState("")
  const [contains, setContains] = useState("")
  const [excludes, setExcludes] = useState("")

  // Get random words based on display count
  // Optimize: Only shuffle first 500 words instead of entire array for performance
  const displayWords = useMemo(() => {
    const subset = words.slice(0, Math.min(500, words.length))
    const shuffled = shuffleArray(subset)
    return shuffled.slice(0, Math.min(displayCount, shuffled.length))
  }, [words, refreshKey, displayCount])

  // Filter words based on advanced search options
  const filteredWords = useMemo(() => {
    let filtered = displayWords

    // Simple search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((word) => word.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Starts with
    if (startsWith.trim()) {
      filtered = filtered.filter((word) => word.toLowerCase().startsWith(startsWith.toLowerCase().trim()))
    }

    // Ends with
    if (endsWith.trim()) {
      filtered = filtered.filter((word) => word.toLowerCase().endsWith(endsWith.toLowerCase().trim()))
    }

    // Contains
    if (contains.trim()) {
      filtered = filtered.filter((word) => word.toLowerCase().includes(contains.toLowerCase().trim()))
    }

    // Excludes
    if (excludes.trim()) {
      const excludeLetters = excludes.toLowerCase().trim().split("")
      filtered = filtered.filter((word) => {
        return !excludeLetters.some((letter) => word.toLowerCase().includes(letter))
      })
    }

    return filtered
  }, [displayWords, searchQuery, startsWith, endsWith, contains, excludes])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
    setSearchQuery("")
    setStartsWith("")
    setEndsWith("")
    setContains("")
    setExcludes("")
    setDisplayCount(100)
  }

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 100, words.length))
  }

  const otherLengths = [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((l) => l !== length)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {length} Letter Word Finder
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive list of {length}-letter words. Perfect for word games like Scrabble, Words with Friends,
            Wordle, and crossword puzzles.
          </p>
        </div>

        {/* Advanced Search */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Advanced Search</CardTitle>
            <CardDescription>Use filters to find specific {length}-letter words</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${length}-letter words...`}
                className="pl-10 h-12"
              />
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Starts With</label>
                <Input
                  type="text"
                  value={startsWith}
                  onChange={(e) => setStartsWith(e.target.value)}
                  placeholder="e.g., ab"
                  className="h-10"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Ends With</label>
                <Input
                  type="text"
                  value={endsWith}
                  onChange={(e) => setEndsWith(e.target.value)}
                  placeholder="e.g., ed"
                  className="h-10"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Contains</label>
                <Input
                  type="text"
                  value={contains}
                  onChange={(e) => setContains(e.target.value)}
                  placeholder="e.g., ing"
                  className="h-10"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Exclude Letters</label>
                <Input
                  type="text"
                  value={excludes}
                  onChange={(e) => setExcludes(e.target.value)}
                  placeholder="e.g., xyz"
                  className="h-10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-muted-foreground">
                Found {filteredWords.length} word{filteredWords.length !== 1 ? "s" : ""}
              </div>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset & Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Word Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {(searchQuery || startsWith || endsWith || contains || excludes) ? "Search Results" : `${length}-Letter Words`}
            </h2>
            {!(searchQuery || startsWith || endsWith || contains || excludes) && words.length > 100 && (
              <p className="text-sm text-muted-foreground">Click refresh to see different words</p>
            )}
          </div>
          {filteredWords.length > 0 ? (
            <>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-fade-in">
                {filteredWords.map((word, index) => (
                  <Card
                    key={`${word}-${index}`}
                    className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer hover-lift group"
                  >
                    <span className="font-semibold text-sm md:text-base uppercase group-hover:text-primary transition-colors">
                      {word}
                    </span>
                  </Card>
                ))}
              </div>
              {!(searchQuery || startsWith || endsWith || contains || excludes) && displayCount < words.length && (
                <div className="text-center mt-8">
                  <Button onClick={handleLoadMore} size="lg" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Load More Words ({words.length - displayCount} remaining)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card className="p-12 text-center border-dashed">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">No words found</p>
              <p className="text-sm text-muted-foreground">Try a different search term</p>
            </Card>
          )}
        </div>

        {/* Letter Navigation Sections */}
        <div className="space-y-8 mb-12">
          {/* Starting with */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{length} Letter Words Starting With</CardTitle>
              <CardDescription>Find {length}-letter words that start with a specific letter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alphabet.map((letter) => (
                  <Link
                    key={`start-${letter}`}
                    href={`/words-start-with?letters=${letter}&length=${length}`}
                  >
                    <Button variant="outline" className="w-12 h-12 font-bold uppercase hover:bg-primary hover:text-primary-foreground">
                      {letter}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ending in */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{length} Letter Words Ending In</CardTitle>
              <CardDescription>Find {length}-letter words that end with a specific letter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alphabet.map((letter) => (
                  <Link
                    key={`end-${letter}`}
                    href={`/words-ending-in?letters=${letter}&length=${length}`}
                  >
                    <Button variant="outline" className="w-12 h-12 font-bold uppercase hover:bg-primary hover:text-primary-foreground">
                      {letter}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* With */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{length} Letter Words With</CardTitle>
              <CardDescription>Find {length}-letter words that contain a specific letter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alphabet.map((letter) => (
                  <Link
                    key={`with-${letter}`}
                    href={`/words-with-letters?letters=${letter}&length=${length}`}
                  >
                    <Button variant="outline" className="w-12 h-12 font-bold uppercase hover:bg-primary hover:text-primary-foreground">
                      {letter}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation to Other Lengths */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse Other Word Lengths</h2>
          <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {otherLengths.map((len) => (
              <Link key={len} href={`/${len}-letter-words`}>
                <Card className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
                  <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                    {len}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Letter Words</div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="prose prose-sm max-w-none">
          <Card className="p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">About {length}-Letter Words</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This comprehensive list contains all valid {length}-letter words that can be used in popular word games
                and puzzles. Whether you're playing Scrabble, Words with Friends, solving crosswords, or enjoying
                Wordle, this word list will help you find the perfect {length}-letter word.
              </p>
              <p>
                {length}-letter words are{" "}
                {length <= 4
                  ? "short and commonly used in everyday language"
                  : length <= 6
                    ? "versatile and frequently appear in word games"
                    : "longer words that can earn you high scores in word games"}
                . Our database includes {words.length} unique {length}-letter words from the official dictionary. We
                display 100 random words at a time - click the "Load More" button or refresh to see different words!
              </p>
              <h3 className="text-xl font-bold mt-6 mb-3">How to Use This {length}-Letter Word Finder</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Use the search box above to quickly find specific {length}-letter words</li>
                <li>Click the "Load More" button to see additional words from our database</li>
                <li>Click the "Refresh Words" button to see a different random selection</li>
                <li>Browse by starting letter, ending letter, or containing letter using the sections below</li>
                <li>
                  We show 100 random words at a time from our collection of {words.length} {length}-letter words
                </li>
                <li>Perfect for discovering high-scoring Scrabble and Words with Friends words</li>
                <li>Ideal for solving {length === 5 ? "Wordle puzzles" : "crossword clues"}</li>
              </ul>
              <h3 className="text-xl font-bold mt-6 mb-3">Popular {length}-Letter Words</h3>
              <p>
                Some of the most commonly used {length}-letter words include: {words.slice(0, 15).join(", ")}, and many
                more. Use the load more button above to discover all possibilities from our extensive word database.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
