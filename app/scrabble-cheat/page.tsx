"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord, calculateScrabbleScore } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

export default function ScrabbleCheatPage() {
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (letters: string) => {
    const words = unscrambleWord(letters)
    const sortedWords = words.sort((a, b) => calculateScrabbleScore(b) - calculateScrabbleScore(a))
    setResults(sortedWords)
    setSearched(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Scrabble® and Scrabble® GO Cheat</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get instant word suggestions for Scrabble and Scrabble GO. Find the highest-scoring plays every time.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter your tiles..." buttonText="Get Words" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Highest-Scoring Words ({results.length} found)</h2>
            <WordList words={results} showScore calculateScore={calculateScrabbleScore} />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Scrabble Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Memorize Q without U words (QI, QOPH, QADI)</p>
              <p>• Learn all 2-letter words for maximum flexibility</p>
              <p>• Focus on 7-letter bingo opportunities (50 point bonus)</p>
              <p>• Use S strategically for plurals and verb forms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>High-Value Plays</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Look for opportunities to use J, Q, X, Z</p>
              <p>• Play perpendicular to existing words</p>
              <p>• Target triple letter and word scores</p>
              <p>• Keep track of tiles remaining in the bag</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
