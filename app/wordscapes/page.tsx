"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Puzzle } from "lucide-react"

export default function WordscapesPage() {
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (letters: string) => {
    const words = unscrambleWord(letters)
    setResults(words.map((w) => w.word))
    setSearched(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Puzzle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Wordscapes Cheats & Answers</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Stuck on a Wordscapes level? Enter your letters and find all possible words to complete the puzzle.
          </p>
        </div>

        <div className="mb-12">
          <WordInput onSearch={handleSearch} placeholder="Enter Wordscapes letters..." buttonText="Get Answers" />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Found {results.length} possible words</h2>
            <WordList words={results} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>About Wordscapes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Wordscapes is a popular word puzzle game that combines anagrams with crossword-style puzzles. Each level
              presents you with a set of letters that you must use to fill in the crossword grid. Words can be of
              varying lengths, and you need to find all the words to complete the level.
            </p>
            <p>
              Use this tool when you're stuck on a level. Simply enter the letters provided in the puzzle, and we'll
              show you all possible words you can make. Remember, Wordscapes levels often have bonus words that aren't
              required to complete the puzzle but still earn you coins!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
