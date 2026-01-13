"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Search, RefreshCw } from "lucide-react"

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

export function WordsByLengthTemplate({ length, words }: WordsByLengthTemplateProps) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  // Get random 100 words or all words if less than 100
  const displayWords = useMemo(() => {
    const shuffled = shuffleArray(words)
    return shuffled.slice(0, Math.min(100, words.length))
  }, [words, refreshKey])

  // Filter words based on search query
  const filteredWords = useMemo(() => {
    if (!searchQuery.trim()) return displayWords
    return displayWords.filter((word) => word.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [displayWords, searchQuery])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
    setSearchQuery("")
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
            {length}-Letter Words
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive list of {length}-letter words. Perfect for word games like Scrabble, Words with Friends,
            Wordle, and crossword puzzles.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Badge variant="secondary" className="text-sm">
              Total: {words.length} words
            </Badge>
            <Badge variant="default" className="text-sm">
              Showing: {displayWords.length} words
            </Badge>
          </div>
        </div>

        {/* Search and Refresh */}
        <Card className="mb-8 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${length}-letter words...`}
                className="pl-10 h-12"
              />
            </div>
            <Button onClick={handleRefresh} variant="outline" size="lg" className="sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Words
            </Button>
          </div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-3">
              Found {filteredWords.length} word{filteredWords.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </p>
          )}
        </Card>

        {/* Word Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? "Search Results" : `Random ${Math.min(100, words.length)} Words`}
            </h2>
            {!searchQuery && words.length > 100 && (
              <p className="text-sm text-muted-foreground">Click refresh to see different words</p>
            )}
          </div>
          {filteredWords.length > 0 ? (
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
          ) : (
            <Card className="p-12 text-center border-dashed">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">No words found</p>
              <p className="text-sm text-muted-foreground">Try a different search term</p>
            </Card>
          )}
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
                display 100 random words at a time - click the refresh button to see different words!
              </p>
              <h3 className="text-xl font-bold mt-6 mb-3">How to Use This {length}-Letter Word Finder</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Use the search box above to quickly find specific {length}-letter words</li>
                <li>Click the "Refresh Words" button to see a different random selection</li>
                <li>
                  We show 100 random words at a time from our collection of {words.length} {length}-letter words
                </li>
                <li>Perfect for discovering high-scoring Scrabble and Words with Friends words</li>
                <li>Ideal for solving {length === 5 ? "Wordle puzzles" : "crossword clues"}</li>
                <li>Expand your vocabulary with less common {length}-letter words</li>
              </ul>
              <h3 className="text-xl font-bold mt-6 mb-3">Popular {length}-Letter Words</h3>
              <p>
                Some of the most commonly used {length}-letter words include: {words.slice(0, 15).join(", ")}, and many
                more. Use the refresh button above to discover all possibilities from our extensive word database.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
