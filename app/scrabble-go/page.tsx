"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord, calculateScrabbleScore } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export default function ScrabbleGoPage() {
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
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Scrabble Go Word Finder</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the best words for Scrabble Go. Get word suggestions sorted by score to dominate the game.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter your tiles..." buttonText="Find Words" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Best Words ({results.length} found, sorted by score)</h2>
            <WordList words={results} showScore calculateScore={calculateScrabbleScore} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>About Scrabble GO</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            <p>
              Scrabble GO is the official mobile version of the classic Scrabble game. It features the same scoring
              system and rules as traditional Scrabble, with additional power-ups and modern features. Use this tool to
              find the highest-scoring words from your tiles and improve your gameplay.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
