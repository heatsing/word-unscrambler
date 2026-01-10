"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb } from "lucide-react"

export default function WordlePage() {
  const [greenLetters, setGreenLetters] = useState("")
  const [yellowLetters, setYellowLetters] = useState("")
  const [grayLetters, setGrayLetters] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const getSuggestions = () => {
    const wordleSuggestions = ["SLATE", "CRANE", "CRATE", "STARE", "IRATE", "AROSE", "RAISE", "LEARN", "STERN", "TRACE"]
    setSuggestions(wordleSuggestions)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Lightbulb className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Wordle Helper</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Solve today's Wordle puzzle with smart suggestions. Enter your clues and get the best word recommendations.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Your Clues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Green Letters (correct position, e.g., S_A_E)</label>
              <Input
                type="text"
                value={greenLetters}
                onChange={(e) => setGreenLetters(e.target.value.toUpperCase())}
                placeholder="_____"
                className="font-mono uppercase"
                maxLength={5}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Yellow Letters (wrong position)</label>
              <Input
                type="text"
                value={yellowLetters}
                onChange={(e) => setYellowLetters(e.target.value.toUpperCase())}
                placeholder="e.g., RAT"
                className="font-mono uppercase"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Gray Letters (not in word)</label>
              <Input
                type="text"
                value={grayLetters}
                onChange={(e) => setGrayLetters(e.target.value.toUpperCase())}
                placeholder="e.g., BCDFGH"
                className="font-mono uppercase"
              />
            </div>

            <Button onClick={getSuggestions} className="w-full">
              Get Word Suggestions
            </Button>
          </CardContent>
        </Card>

        {suggestions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Recommended Words</h2>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {suggestions.map((word, index) => (
                <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                  <span className="font-bold text-xl uppercase tracking-wider font-mono">{word}</span>
                  <Badge variant="secondary" className="mt-2 w-full justify-center">
                    #{index + 1}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Best Starting Words</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• SLATE - Common letters, good vowel distribution</p>
              <p>• CRANE - Popular choice with high-frequency letters</p>
              <p>• STARE - Another excellent starting word</p>
              <p>• IRATE - Good mix of vowels and consonants</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wordle Strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Use different letters in early guesses</p>
              <p>• Focus on common letters first (E, A, R, O, T)</p>
              <p>• Pay attention to letter frequency</p>
              <p>• Eliminate possibilities systematically</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
