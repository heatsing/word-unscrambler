"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateRandomWords } from "@/lib/word-utils"
import { Wand2, RefreshCw, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function WordGeneratorPage() {
  const [wordLength, setWordLength] = useState("any")
  const [count, setCount] = useState("20")
  const [generatedWords, setGeneratedWords] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generateWords = () => {
    const numWords = Math.min(Number.parseInt(count), 100)
    const length = wordLength === "any" ? undefined : Number.parseInt(wordLength)
    const words = generateRandomWords(numWords, length)
    setGeneratedWords(words)
  }

  const copyWord = (word: string, index: number) => {
    navigator.clipboard.writeText(word)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const copyAllWords = () => {
    navigator.clipboard.writeText(generatedWords.join(", "))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Wand2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Generator</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Generate random words for games, creativity, and brainstorming. Perfect for inspiration and word game
            practice.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generator Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="wordLength" className="mb-2 block">
                  Word Length
                </Label>
                <Select value={wordLength} onValueChange={setWordLength}>
                  <SelectTrigger id="wordLength">
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

              <div>
                <Label htmlFor="count" className="mb-2 block">
                  Number of Words
                </Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={generateWords} className="w-full">
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Words
            </Button>
          </CardContent>
        </Card>

        {generatedWords.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Generated {generatedWords.length} Word{generatedWords.length !== 1 ? "s" : ""}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyAllWords}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm" onClick={generateWords}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {generatedWords.map((word, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all hover-lift cursor-pointer group"
                  onClick={() => copyWord(word, index)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col gap-2">
                      <span className="font-bold text-lg uppercase group-hover:text-primary transition-colors">
                        {word}
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {word.length} letters
                        </Badge>
                        {copiedIndex === index ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Use Cases for Random Words</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Creative writing prompts and inspiration</p>
            <p>• Practice for word games and puzzles</p>
            <p>• Password generation ideas</p>
            <p>• Team building and brainstorming activities</p>
            <p>• Educational vocabulary exercises</p>
            <p>• Click any word to copy it to clipboard</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
