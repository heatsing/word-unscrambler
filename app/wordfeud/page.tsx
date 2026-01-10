"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord, calculateScrabbleScore } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad } from "lucide-react"

export default function WordfeudPage() {
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
            <Gamepad className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Wordfeud Cheat</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the best words for Wordfeud. Get word suggestions with scores to beat your opponents.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter your Wordfeud tiles..." buttonText="Find Words" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Best Wordfeud Words ({results.length} found)</h2>
            <WordList words={results} showScore calculateScore={calculateScrabbleScore} />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>About Wordfeud</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <p>
                Wordfeud is a multiplayer word game similar to Scrabble. The game uses a similar board layout and
                scoring system, but with some unique tile distributions and bonus square placements. It's popular in
                Europe and offers cross-platform play.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wordfeud Strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Bonus squares are positioned differently than Scrabble</p>
              <p>• Plan multiple moves ahead</p>
              <p>• Control the board center early</p>
              <p>• Learn valid 2-letter words for flexibility</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
