"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord, calculateScrabbleScore } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export default function ScrabblePage() {
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (letters: string) => {
    const words = unscrambleWord(letters)
    // Sort by Scrabble score
    const sortedWords = words.sort((a, b) => calculateScrabbleScore(b.word) - calculateScrabbleScore(a.word))
    setResults(sortedWords.map((w) => w.word))
    setSearched(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Scrabble Word Finder</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the highest-scoring Scrabble words from your tiles. Beat your opponents with strategic word choices.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter your Scrabble tiles..." buttonText="Find Words" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Found {results.length} words (sorted by score)</h2>
            <WordList words={results} showScore calculateScore={calculateScrabbleScore} />
          </div>
        )}

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Scrabble Letter Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-semibold">1 point:</span> A, E, I, O, U, L, N, S, T, R
              </div>
              <div>
                <span className="font-semibold">2 points:</span> D, G
              </div>
              <div>
                <span className="font-semibold">3 points:</span> B, C, M, P
              </div>
              <div>
                <span className="font-semibold">4 points:</span> F, H, V, W, Y
              </div>
              <div>
                <span className="font-semibold">5 points:</span> K
              </div>
              <div>
                <span className="font-semibold">8 points:</span> J, X
              </div>
              <div>
                <span className="font-semibold">10 points:</span> Q, Z
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
