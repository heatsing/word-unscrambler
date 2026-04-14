"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2 } from "lucide-react"

const MOCK_WORDS = [
  "random", "clever", "bright", "simple", "strong", "mighty", "gentle", "cosmic",
  "stellar", "crystal", "diamond", "emerald", "fantasy", "journey", "wonder", "brave",
  "silver", "golden", "shadow", "forest",
]

export function WordGeneratorTool() {
  const [wordLength, setWordLength] = useState("5")
  const [count, setCount] = useState("10")
  const [generatedWords, setGeneratedWords] = useState<string[]>([])

  const generateWords = () => {
    const numWords = Math.min(Number.parseInt(count, 10) || 10, 20)
    setGeneratedWords(MOCK_WORDS.slice(0, numWords))
  }

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generator Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="wordLength" className="mb-2 block">Word Length</Label>
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
              <Label htmlFor="count" className="mb-2 block">Number of Words</Label>
              <Input
                id="count"
                type="number"
                min={1}
                max={20}
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
              <Card key={`${word}-${index}`} className="p-4 text-center hover:shadow-md transition-shadow">
                <span className="font-medium text-lg">{word}</span>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
