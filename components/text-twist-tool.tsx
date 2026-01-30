"use client"

import { useMemo, useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TextTwistTool() {
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
    <>
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
                    <Badge key={w} variant="outline" className="uppercase">{w}</Badge>
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
    </>
  )
}
