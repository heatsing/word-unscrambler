"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"
import { unscrambleWord } from "@/lib/word-utils"

export default function TextTwistPage() {
  const [letters, setLetters] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (value: string) => {
    const input = value.trim()
    setLetters(input)
    if (!input) {
      setResults([])
      setSearched(false)
      return
    }
    const words = unscrambleWord(input)
    setResults(words.map((w) => w.word))
    setSearched(true)
  }

  const topWords = useMemo(() => results.slice(0, 20), [results])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Shuffle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Text Twist Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Enter your Text Twist letters to find all possible words (including longer bonus words).
          </p>
        </div>

        <div className="mb-10">
          <WordInput onSearch={handleSearch} placeholder="Enter Text Twist letters..." buttonText="Find Words" />
        </div>

        {searched && (
          <div className="mb-12 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">
                Found {results.length} word{results.length !== 1 ? "s" : ""}
              </h2>
              <Badge variant="secondary" className="uppercase">{letters}</Badge>
            </div>

            {results.length > 0 ? (
              <>
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-base">Top suggestions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {topWords.map((w) => (
                      <Badge key={w} variant="outline" className="uppercase">
                        {w}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>

                <WordList words={results} />
              </>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-8 text-center text-muted-foreground">
                  No words found. Try different letters or remove spaces.
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How to use</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>1. Type the letters shown in your Text Twist round.</p>
              <p>2. Click “Find Words” to see all valid word combinations.</p>
              <p>3. Start with longer words first to maximize points.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related tools</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="flex flex-wrap gap-2">
                <Link href="/anagram-solver"><Button variant="outline" size="sm">Anagram Solver</Button></Link>
                <Link href="/word-unscrambler"><Button variant="outline" size="sm">Word Unscrambler</Button></Link>
                <Link href="/word-finder"><Button variant="outline" size="sm">Word Finder</Button></Link>
              </div>
              <p className="text-xs">
                Tip: If you know the word length, use{" "}
                <Link className="underline hover:text-foreground" href="/words-by-length">Words by Length</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

