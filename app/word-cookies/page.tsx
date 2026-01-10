"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie } from "lucide-react"

export default function WordCookiesPage() {
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
            <Cookie className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Cookies Cheat</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Stuck on Word Cookies? Enter your letters and find all the words you need to complete the level.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter Word Cookies letters..." buttonText="Get Answers" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">All Possible Words ({results.length} found)</h2>
            <WordList words={results} />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>About Word Cookies</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <p>
                Word Cookies is a popular mobile word puzzle game where you connect letters to form words. Each level
                has a set of letters, and you must find all valid words to progress. The game features thousands of
                levels with increasing difficulty.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Word Cookies</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Start with shorter 3-4 letter words</p>
              <p>• Look for common prefixes and suffixes</p>
              <p>• Try different letter combinations systematically</p>
              <p>• Use hints sparingly to save coins</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
