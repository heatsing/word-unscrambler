"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function WordUnscramblerPage() {
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (letters: string) => {
    const words = unscrambleWord(letters)
    setResults(words)
    setSearched(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Unscrambler</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Enter your scrambled letters and we'll find all possible words you can make. Perfect for word games,
            puzzles, and anagrams.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter your scrambled letters..." buttonText="Unscramble" />
        </div>

        {/* Results */}
        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Found {results.length} {results.length === 1 ? "word" : "words"}
            </h2>
            <WordList words={results} />
          </div>
        )}

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Enter your scrambled letters in the search box above</p>
              <p>2. Click "Unscramble" to find all possible words</p>
              <p>3. Browse through the results to find the perfect word</p>
              <p>4. Use wildcards (?) for unknown letters</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips & Tricks</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Try different letter combinations for more results</p>
              <p>• Use this tool for Scrabble, Words with Friends, and more</p>
              <p>• Our dictionary includes over 100,000 valid words</p>
              <p>• Results are sorted by word length and frequency</p>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">About Word Unscrambler</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our word unscrambler is a powerful tool that helps you solve word puzzles by finding all possible words from
            a set of scrambled letters. Whether you're playing Scrabble, Words with Friends, solving crossword puzzles,
            or just having fun with anagrams, our tool will help you find the perfect words.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The unscrambler uses an extensive dictionary database to quickly identify valid words from your letter
            combinations. It supports various word lengths and can handle wildcards for those tricky unknown letters.
            Perfect for word game enthusiasts and puzzle solvers alike.
          </p>
        </div>
      </div>
    </div>
  )
}
