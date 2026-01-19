"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { solveWordle } from "@/lib/word-utils"
import { Sparkles, HelpCircle, X, Check, AlertCircle, Lightbulb, Target } from "lucide-react"

type LetterState = "correct" | "present" | "absent" | "unknown"

interface LetterInfo {
  letter: string
  state: LetterState
}

export default function WordleSolverPage() {
  const [pattern, setPattern] = useState("_____")
  const [includedLetters, setIncludedLetters] = useState("")
  const [excludedLetters, setExcludedLetters] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [guessHistory, setGuessHistory] = useState<LetterInfo[][]>([])

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
    setGuessHistory([])
  }

  const handlePatternChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newPattern = pattern.split("")
    newPattern[index] = value.toLowerCase() || "_"
    setPattern(newPattern.join(""))
  }

  const getLetterStateColor = (state: LetterState) => {
    switch (state) {
      case "correct":
        return "bg-green-500 text-white border-green-600"
      case "present":
        return "bg-yellow-500 text-white border-yellow-600"
      case "absent":
        return "bg-gray-400 text-white border-gray-500"
      default:
        return "bg-background border-border"
    }
  }

  const suggestedStarters = ["adieu", "raise", "stare", "slate", "crane", "crate", "trace", "arose"]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mb-4 shadow-lg">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
            Wordle Solver
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the best words for your Wordle puzzle. Enter known letters and get instant suggestions.
          </p>
        </div>

        {/* Solver Interface */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-scale-in shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Solve Your Wordle
                </CardTitle>
                <CardDescription>Enter known letters in their positions and specify included/excluded letters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pattern Input */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Word Pattern
                  </Label>
                  <div className="flex gap-2 justify-center">
                    {pattern.split("").map((letter, index) => (
                      <Input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={letter === "_" ? "" : letter}
                        onChange={(e) => handlePatternChange(index, e.target.value)}
                        className="w-14 h-14 text-center text-2xl font-bold uppercase transition-all hover:border-primary focus:scale-110"
                        placeholder="_"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Use _ for unknown letters • Green tiles in Wordle
                  </p>
                </div>

                {/* Included Letters */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Present
                    </Badge>
                    Letters in word (wrong position)
                  </Label>
                  <Input
                    type="text"
                    value={includedLetters}
                    onChange={(e) => setIncludedLetters(e.target.value.toLowerCase())}
                    placeholder="e.g., a, r, t"
                    className="h-12"
                  />
                  <p className="text-xs text-muted-foreground">Yellow tiles in Wordle • Separated by commas or spaces</p>
                </div>

                {/* Excluded Letters */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Badge variant="secondary" className="bg-gray-400/10 text-gray-600 hover:bg-gray-400/20">
                      <X className="h-3 w-3 mr-1" />
                      Absent
                    </Badge>
                    Letters NOT in word
                  </Label>
                  <Input
                    type="text"
                    value={excludedLetters}
                    onChange={(e) => setExcludedLetters(e.target.value.toLowerCase())}
                    placeholder="e.g., b, c, d"
                    className="h-12"
                  />
                  <p className="text-xs text-muted-foreground">Gray tiles in Wordle</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
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
              <Card className="animate-fade-in shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Found {results.length} possible word{results.length !== 1 ? "s" : ""}
                    </CardTitle>
                    <Badge variant="secondary">{pattern.toUpperCase()}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {results.length > 0 ? (
                    <Tabs defaultValue="grid" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="grid">Grid View</TabsTrigger>
                        <TabsTrigger value="list">List View</TabsTrigger>
                      </TabsList>

                      <TabsContent value="grid" className="mt-6">
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                          {results.map((word, index) => (
                            <Card
                              key={word}
                              className="hover:shadow-md transition-all hover:scale-105 cursor-pointer hover-lift group"
                            >
                              <CardHeader className="pb-3">
                                <CardTitle className="text-xl font-bold uppercase text-center group-hover:text-primary transition-colors">
                                  {word}
                                </CardTitle>
                                {index < 5 && (
                                  <Badge variant="default" className="mx-auto mt-2">
                                    Top {index + 1}
                                  </Badge>
                                )}
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="list" className="mt-6">
                        <div className="space-y-2">
                          {results.map((word, index) => (
                            <div
                              key={word}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-muted-foreground w-8">#{index + 1}</span>
                                <span className="text-lg font-bold uppercase tracking-wide">{word}</span>
                              </div>
                              {index < 3 && <Badge variant="default">Recommended</Badge>}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">No words match your criteria</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your pattern or filters
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Tips & Starter Words */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Best Starter Words
                </CardTitle>
                <CardDescription>Popular opening words with good letter coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedStarters.map((word, index) => (
                    <button
                      key={word}
                      onClick={() => {
                        setPattern("_____")
                        setIncludedLetters("")
                        setExcludedLetters("")
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold uppercase group-hover:text-primary transition-colors">
                          {word}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center text-white text-xs">
                      1
                    </div>
                    Known Letters (Green)
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    Fill in the boxes with letters you know are in the correct position
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-yellow-500 flex items-center justify-center text-white text-xs">
                      2
                    </div>
                    Present Letters (Yellow)
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    Enter letters that are in the word but in wrong positions
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gray-400 flex items-center justify-center text-white text-xs">
                      3
                    </div>
                    Absent Letters (Gray)
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    Enter letters that are NOT in the word at all
                  </p>
                </div>

                <div className="bg-background p-4 rounded-lg border mt-4">
                  <p className="text-xs font-medium mb-2">Example:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• Pattern: <code className="bg-muted px-2 py-0.5 rounded">h_ll_</code></p>
                    <p>• Present: <code className="bg-muted px-2 py-0.5 rounded">e, o</code></p>
                    <p>• Absent: <code className="bg-muted px-2 py-0.5 rounded">a, r, t</code></p>
                    <p className="pt-2">→ Result: "hello", "hollo"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">Advanced Wordle Solver & Helper</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our Wordle solver is the ultimate tool for cracking today's Wordle puzzle. Using advanced algorithms and a
            comprehensive word database, we help you find the perfect word based on your clues. Whether you're stuck on
            your last guess or want to improve your Wordle strategy, our solver provides instant, accurate suggestions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The solver supports all Wordle color combinations: green tiles (correct letter, correct position), yellow
            tiles (correct letter, wrong position), and gray tiles (letter not in word). Simply input your clues and
            get a curated list of possible words ranked by likelihood and strategic value.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Perfect for daily Wordle players, word game enthusiasts, and anyone looking to maintain their winning
            streak. Our tool also suggests optimal starter words with excellent letter coverage to maximize your
            chances of solving the puzzle efficiently.
          </p>
        </div>
      </div>
    </div>
  )
}
