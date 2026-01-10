"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { WordList } from "@/components/word-list"

export default function WordsWithLettersPage() {
  const [letters, setLetters] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    // Mock results - in production, this would query a dictionary
    const mockResults = [
      "letter",
      "settle",
      "better",
      "getter",
      "setter",
      "netter",
      "wetter",
      "rattle",
      "cattle",
      "battle",
    ]
    setResults(mockResults)
    setSearched(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Words With Letters</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find all words that contain specific letters. Enter any combination of letters and discover words that
            include them.
          </p>
        </div>

        <div className="mb-12">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (letters.trim()) handleSearch()
            }}
            className="flex gap-2 max-w-2xl mx-auto"
          >
            <Input
              type="text"
              value={letters}
              onChange={(e) => setLetters(e.target.value)}
              placeholder="Enter letters (e.g., eat, rst)..."
              className="h-12 text-lg"
            />
            <Button type="submit" size="lg" className="h-12 px-8">
              Find Words
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Example: Enter "eat" to find words containing those letters
          </p>
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Words containing "{letters}" ({results.length} found)
            </h2>
            <WordList words={results} />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Enter the letters you want to find in words</p>
              <p>2. Letters can appear in any position within the word</p>
              <p>3. Results show all words containing those letters</p>
              <p>4. Great for word games when you have specific tiles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Find words from your Scrabble tiles</p>
              <p>• Solve Words with Friends challenges</p>
              <p>• Discover words for crossword puzzles</p>
              <p>• Learn new words with specific letter patterns</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>About Words With Letters</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            <p>
              This tool helps you find words that contain specific letters, regardless of their position in the word.
              It's particularly useful when you have a set of letters in word games and want to see all possible word
              combinations. Unlike anagram solvers that require you to use all letters, this tool finds words that
              simply contain your specified letters, giving you more flexibility in your word choices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
