"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { solveWordle } from "@/lib/word-utils"
import { Sparkles, HelpCircle, X } from "lucide-react"

export default function WordleSolverPage() {
  const [pattern, setPattern] = useState("_____")
  const [includedLetters, setIncludedLetters] = useState("")
  const [excludedLetters, setExcludedLetters] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSolve = () => {
    const words = solveWordle(pattern, includedLetters, excludedLetters)
    setResults(words)
    setHasSearched(true)
  }

  const handleReset = () => {
    setPattern("_____")
    setIncludedLetters("")
    setExcludedLetters("")
    setResults([])
    setHasSearched(false)
  }

  const handlePatternChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newPattern = pattern.split("")
    newPattern[index] = value || "_"
    setPattern(newPattern.join(""))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Wordle Solver
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the best words for your Wordle puzzle. Enter known letters and get instant suggestions.
          </p>
        </div>

        {/* Solver Interface */}
        <Card className="mb-8 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Solve Your Wordle
            </CardTitle>
            <CardDescription>
              Enter known letters in their positions, and specify included/excluded letters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pattern Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Word Pattern (use _ for unknown)</label>
              <div className="flex gap-2 justify-center">
                {pattern.split("").map((letter, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={letter === "_" ? "" : letter}
                    onChange={(e) => handlePatternChange(index, e.target.value.toLowerCase())}
                    className="w-14 h-14 text-center text-2xl font-bold uppercase"
                    placeholder="_"
                  />
                ))}
              </div>
            </div>

            {/* Included Letters */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                  ✓
                </Badge>
                Included Letters (letters that must be in the word)
              </label>
              <Input
                type="text"
                value={includedLetters}
                onChange={(e) => setIncludedLetters(e.target.value.toLowerCase())}
                placeholder="e.g., a, r, t"
                className="h-12"
              />
            </div>

            {/* Excluded Letters */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Badge variant="secondary" className="bg-red-500/10 text-red-600">
                  <X className="h-3 w-3" />
                </Badge>
                Excluded Letters (letters NOT in the word)
              </label>
              <Input
                type="text"
                value={excludedLetters}
                onChange={(e) => setExcludedLetters(e.target.value.toLowerCase())}
                placeholder="e.g., b, c, d"
                className="h-12"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleSolve} className="flex-1" size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Find Words
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && (
          <div className="animate-fade-in">
            {results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Found {results.length} possible word{results.length !== 1 ? "s" : ""}
                  </h2>
                  <Badge variant="secondary">{pattern.toUpperCase()}</Badge>
                </div>

                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {results.map((word, index) => (
                    <Card
                      key={word}
                      className="hover:shadow-md transition-all hover:scale-105 cursor-pointer hover-lift"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold uppercase text-center">{word}</CardTitle>
                        {index < 5 && (
                          <Badge variant="default" className="mx-auto mt-2">
                            Top {index + 1}
                          </Badge>
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    No words match your criteria. Try adjusting your pattern or filters.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Enter Known Letters</h4>
              <p className="text-sm text-muted-foreground">
                Fill in the boxes with letters you know are in the correct position. Leave others blank or with "_".
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Add Included Letters</h4>
              <p className="text-sm text-muted-foreground">
                Enter letters that must be in the word but you don't know their position (green/yellow in Wordle).
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. Add Excluded Letters</h4>
              <p className="text-sm text-muted-foreground">
                Enter letters that are NOT in the word at all (gray in Wordle).
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border">
              <p className="text-sm font-medium mb-2">Example:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pattern: <code className="bg-muted px-2 py-0.5 rounded">h_ll_</code></li>
                <li>• Included: <code className="bg-muted px-2 py-0.5 rounded">e, o</code></li>
                <li>• Excluded: <code className="bg-muted px-2 py-0.5 rounded">a, r, t</code></li>
                <li className="pt-2">→ Result: "hello", "hollo"</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
