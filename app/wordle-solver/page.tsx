"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

export default function WordleSolverPage() {
  const [pattern, setPattern] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const getSuggestions = () => {
    // Mock Wordle suggestions
    const wordleSuggestions = ["slate", "crane", "stare", "irate", "arise", "raise", "soare", "later", "crate", "trace"]
    setSuggestions(wordleSuggestions.slice(0, 10))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Wordle Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get the best word suggestions for your Wordle puzzle. Enter what you know and we'll help you solve it.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Your Clues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Known Letters (use _ for unknown)</label>
              <Input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="e.g., _R_I_"
                className="text-lg font-mono"
                maxLength={5}
              />
            </div>
            <Button onClick={getSuggestions} className="w-full">
              Get Suggestions
            </Button>
          </CardContent>
        </Card>

        {suggestions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Best Starting Words</h2>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {suggestions.map((word, index) => (
                <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                  <span className="font-bold text-xl uppercase tracking-wider font-mono">{word}</span>
                  <Badge variant="secondary" className="mt-2">
                    Rank #{index + 1}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Wordle Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Start with words containing common vowels (A, E, I, O, U)</p>
            <p>• Use words with frequently used consonants (R, S, T, L, N)</p>
            <p>• Avoid repeating letters in your first guesses</p>
            <p>• Pay attention to yellow and green letter positions</p>
            <p>• Common starting words: SLATE, CRANE, STARE, RAISE</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
