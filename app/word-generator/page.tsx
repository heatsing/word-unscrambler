"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2 } from "lucide-react"

export default function WordGeneratorPage() {
  const [wordLength, setWordLength] = useState("5")
  const [count, setCount] = useState("10")
  const [generatedWords, setGeneratedWords] = useState<string[]>([])

  const generateWords = () => {
    // Mock word generation
    const mockWords = [
      "random",
      "clever",
      "bright",
      "simple",
      "strong",
      "mighty",
      "gentle",
      "cosmic",
      "stellar",
      "bright",
      "crystal",
      "diamond",
      "emerald",
      "fantasy",
      "journey",
    ]
    const numWords = Math.min(Number.parseInt(count), 20)
    setGeneratedWords(mockWords.slice(0, numWords))
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
                    <SelectItem value="3">3 letters</SelectItem>
                    <SelectItem value="4">4 letters</SelectItem>
                    <SelectItem value="5">5 letters</SelectItem>
                    <SelectItem value="6">6 letters</SelectItem>
                    <SelectItem value="7">7 letters</SelectItem>
                    <SelectItem value="8">8 letters</SelectItem>
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
                  max="20"
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Generated Words</h2>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {generatedWords.map((word, index) => (
                <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                  <span className="font-medium text-lg">{word}</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
