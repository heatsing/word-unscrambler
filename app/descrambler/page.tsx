"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle } from "lucide-react"

export default function DescramblerPage() {
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
            <Shuffle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Descrambler</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Descramble letters into words. Perfect for word games, puzzles, and finding valid word combinations.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter scrambled letters..." buttonText="Descramble" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Descrambled Words ({results.length} found)</h2>
            <WordList words={results} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>What is Descrambling?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            <p>
              Descrambling is the process of rearranging jumbled letters to form valid words. This skill is essential
              for word games like Scrabble, solving newspaper puzzles, and improving your vocabulary. Our descrambler
              tool uses an extensive dictionary to find all possible words from your letters.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
