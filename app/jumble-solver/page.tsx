"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle } from "lucide-react"

export default function JumbleSolverPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Jumble Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Solve Daily Jumble puzzles instantly. Unscramble the jumbled words and find the answer to today's cartoon.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter jumbled letters..." buttonText="Solve Jumble" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Possible Solutions ({results.length} words found)</h2>
            <WordList words={results} />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What is Jumble?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <p>
                Jumble is a classic word puzzle game where you unscramble letters to form words. The game typically
                presents 4-6 scrambled words, and once you solve them, you use circled letters to solve a final puzzle
                phrase related to a cartoon.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Solve Jumbles</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Enter each set of jumbled letters separately</p>
              <p>2. Look for common letter patterns and word endings</p>
              <p>3. Try rearranging vowels first</p>
              <p>4. Use the circled letters to solve the final answer</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
