"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateRandomWords } from "@/lib/word-utils"
import { brandConfig, getCategoryColor } from "@/lib/brand"
import { Wand2, RefreshCw, Copy, Check, Sparkles, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function WordGeneratorPage() {
  const [wordLength, setWordLength] = useState("any")
  const [count, setCount] = useState("20")
  const [generatedWords, setGeneratedWords] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copyAllSuccess, setCopyAllSuccess] = useState(false)
  const [error, setError] = useState("")

  const generateWords = () => {
    setError("")
    const countValue = Number.parseInt(count)

    // Validation
    if (isNaN(countValue) || countValue < 1) {
      setError("Please enter a valid number of words (minimum 1)")
      return
    }

    if (countValue > 100) {
      setError("Maximum 100 words allowed")
      return
    }

    // Show loading state
    setIsGenerating(true)

    // Simulate slight delay for better UX feedback
    setTimeout(() => {
      const numWords = Math.min(countValue, 100)
      const length = wordLength === "any" ? undefined : Number.parseInt(wordLength)
      const words = generateRandomWords(numWords, length)
      setGeneratedWords(words)
      setIsGenerating(false)
    }, 300)
  }

  const copyWord = (word: string, index: number) => {
    navigator.clipboard.writeText(word).then(() => {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  const copyAllWords = () => {
    navigator.clipboard.writeText(generatedWords.join(", ")).then(() => {
      setCopyAllSuccess(true)
      setTimeout(() => setCopyAllSuccess(false), 2000)
    })
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isGenerating) {
      generateWords()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header with Glassmorphism effect */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-2xl mb-4 shadow-lg border border-primary/20 transition-transform hover:scale-105">
            <Wand2 className="h-8 w-8 md:h-10 md:w-10 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Word Generator
          </h1>
          <p className="text-base md:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Generate random words for games, creativity, and brainstorming. Perfect for inspiration and word game
            practice.
          </p>
        </div>

        {/* Generator Settings Card with enhanced glassmorphism */}
        <Card className="mb-6 md:mb-8 shadow-xl border-primary/10 bg-card/95 backdrop-blur-sm animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
              Generator Settings
            </CardTitle>
            <CardDescription>
              Customize your word generation preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Error Message */}
            {error && (
              <div
                className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive animate-fade-in"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="grid gap-5 md:gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="wordLength" className="text-sm font-semibold">
                  Word Length
                </Label>
                <Select
                  value={wordLength}
                  onValueChange={setWordLength}
                  disabled={isGenerating}
                >
                  <SelectTrigger
                    id="wordLength"
                    className="h-11 md:h-12 transition-all focus:ring-2 focus:ring-primary/20"
                    aria-label="Select word length"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any length</SelectItem>
                    <SelectItem value="2">2 letters</SelectItem>
                    <SelectItem value="3">3 letters</SelectItem>
                    <SelectItem value="4">4 letters</SelectItem>
                    <SelectItem value="5">5 letters</SelectItem>
                    <SelectItem value="6">6 letters</SelectItem>
                    <SelectItem value="7">7 letters</SelectItem>
                    <SelectItem value="8">8 letters</SelectItem>
                    <SelectItem value="9">9 letters</SelectItem>
                    <SelectItem value="10">10 letters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="count" className="text-sm font-semibold">
                  Number of Words <span className="text-muted-foreground font-normal">(max 100)</span>
                </Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isGenerating}
                  className="h-11 md:h-12 transition-all focus:ring-2 focus:ring-primary/20"
                  aria-label="Enter number of words to generate"
                  aria-describedby="count-hint"
                />
                <p id="count-hint" className="text-xs text-muted-foreground">
                  Press Enter to generate
                </p>
              </div>
            </div>

            <Button
              onClick={generateWords}
              className="w-full h-12 md:h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
              disabled={isGenerating}
              aria-label={isGenerating ? "Generating words..." : "Generate random words"}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" aria-hidden="true" />
                  Generate Words
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section with enhanced UX */}
        {generatedWords.length > 0 && (
          <div className="mb-8 md:mb-10 animate-fade-in" role="region" aria-label="Generated words results">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {generatedWords.length}
                  </Badge>
                  Word{generatedWords.length !== 1 ? "s" : ""} Generated
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Click any word to copy to clipboard
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="default"
                  onClick={copyAllWords}
                  disabled={isGenerating}
                  className="flex-1 sm:flex-none h-11 hover:bg-primary/10 transition-all duration-200"
                  aria-label="Copy all words to clipboard"
                >
                  {copyAllSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
                      Copy All
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={generateWords}
                  disabled={isGenerating}
                  className="flex-1 sm:flex-none h-11 hover:bg-primary/10 transition-all duration-200"
                  aria-label="Generate new set of words"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} aria-hidden="true" />
                  Regenerate
                </Button>
              </div>
            </div>

            {/* Word Grid with enhanced accessibility and touch targets */}
            <div
              className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              role="list"
              aria-label="List of generated words"
            >
              {generatedWords.map((word, index) => (
                <Card
                  key={index}
                  role="listitem"
                  className="group relative overflow-hidden border-primary/10 bg-card/95 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] hover:border-primary/30 transition-all duration-200 cursor-pointer"
                  onClick={() => copyWord(word, index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      copyWord(word, index)
                    }
                  }}
                  tabIndex={0}
                  aria-label={`Copy word: ${word}, ${word.length} letters`}
                >
                  {/* Glassmorphism background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />

                  <CardContent className="relative p-5 md:p-6 text-center min-h-[88px] flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-3 w-full">
                      <span className="font-bold text-lg md:text-xl uppercase group-hover:text-primary transition-colors duration-200 break-all">
                        {word}
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium px-2 py-0.5"
                        >
                          {word.length} {word.length === 1 ? 'letter' : 'letters'}
                        </Badge>
                        <div className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
                          {copiedIndex === index ? (
                            <Check className="h-4 w-4 text-green-500 animate-scale-in" />
                          ) : (
                            <Copy className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Loading skeleton state */}
        {isGenerating && generatedWords.length === 0 && (
          <div className="mb-8 animate-fade-in" role="status" aria-label="Loading generated words">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 20 }).map((_, index) => (
                <Card key={index} className="border-primary/10 bg-card/95 backdrop-blur-sm">
                  <CardContent className="p-5 md:p-6 min-h-[88px] flex flex-col items-center justify-center">
                    <div className="w-full space-y-3 animate-pulse">
                      <div className="h-6 bg-muted rounded w-3/4 mx-auto" />
                      <div className="h-5 bg-muted/50 rounded w-1/2 mx-auto" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <span className="sr-only">Generating words, please wait...</span>
          </div>
        )}

        {/* Information Card with glassmorphism */}
        <Card className="border-primary/10 bg-card/95 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
              Use Cases for Random Words
            </CardTitle>
            <CardDescription>
              Explore the many ways random words can enhance your creativity and productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: "✍️", title: "Creative Writing", desc: "Generate prompts and inspiration for stories" },
                { icon: "🎮", title: "Word Games", desc: "Practice for Scrabble, crosswords, and puzzles" },
                { icon: "🔐", title: "Password Ideas", desc: "Create memorable and secure passphrases" },
                { icon: "👥", title: "Team Activities", desc: "Brainstorming and ice-breaker exercises" },
                { icon: "📚", title: "Education", desc: "Vocabulary building and language learning" },
                { icon: "📋", title: "Quick Copy", desc: "Click any word to copy to clipboard instantly" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group"
                >
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-0.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Tab</kbd> to navigate •
            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono mx-1">Enter</kbd> or
            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono mx-1">Space</kbd> to copy
          </p>
        </div>
      </div>
    </div>
  )
}
