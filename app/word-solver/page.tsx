"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from "lucide-react"

export default function WordSolverPage() {
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (letters: string) => {
    const words = unscrambleWord(letters)
    setResults(words.map((w) => w.word))
    setSearched(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Universal word solver for all word puzzles and games. Enter your letters and find valid words instantly.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter your letters..." buttonText="Solve" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Solutions ({results.length} words found)</h2>
            <WordList words={results} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Supported Word Games</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Scrabble and Scrabble Go</p>
            <p>• Words with Friends</p>
            <p>• Wordle and Wordle variants</p>
            <p>• Crossword puzzles</p>
            <p>• Word search puzzles</p>
            <p>• Boggle and similar games</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
