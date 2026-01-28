"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function UnscramblePage() {
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Unscramble Words</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Quickly unscramble any combination of letters. Find all valid words for puzzles, games, and learning.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter letters to unscramble..." buttonText="Unscramble" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Unscrambled Words ({results.length} found)</h2>
            <WordList words={results} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Why Unscramble Words?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Unscrambling words is a valuable skill for word game enthusiasts and puzzle solvers. It helps improve
              pattern recognition, vocabulary, and mental flexibility. Whether you're playing competitively or just for
              fun, being able to quickly identify words from jumbled letters gives you a significant advantage.
            </p>
            <p>
              Our unscramble tool processes your letters instantly, showing you all possible word combinations. This is
              perfect for learning new words, checking if a word exists, or finding the best play in your favorite word
              game.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
