"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

const commonPrefixes = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

export default function WordsStartWithPage() {
  const [prefix, setPrefix] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (searchPrefix: string) => {
    // Mock results
    const mockResults = [
      `${searchPrefix}bove`,
      `${searchPrefix}bout`,
      `${searchPrefix}buse`,
      `${searchPrefix}ctive`,
      `${searchPrefix}ction`,
      `${searchPrefix}ctor`,
      `${searchPrefix}dmit`,
      `${searchPrefix}dult`,
      `${searchPrefix}fter`,
      `${searchPrefix}gain`,
    ]
    setResults(mockResults.slice(0, 10))
    setSearched(true)
  }

  const handlePrefixClick = (letter: string) => {
    setPrefix(letter)
    handleSearch(letter)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Words Starting With</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find all words that start with specific letters. Perfect for crossword puzzles, word games, and expanding
            your vocabulary.
          </p>
        </div>

        <div className="mb-12">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (prefix.trim()) handleSearch(prefix.trim())
            }}
            className="flex gap-2 max-w-2xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="Enter starting letters..."
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Search
            </Button>
          </form>

          <div>
            <p className="text-sm text-muted-foreground text-center mb-4">Or select a letter:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {commonPrefixes.map((letter) => (
                <Button
                  key={letter}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePrefixClick(letter)}
                  className="w-10 h-10 p-0 font-semibold uppercase"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Words starting with "{prefix}" ({results.length} found)
            </h2>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {results.map((word, index) => (
                <Card key={index} className="p-3 text-center hover:shadow-md transition-shadow">
                  <span className="font-medium">{word}</span>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>How to Use This Tool</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>1. Enter the starting letter(s) in the search box above</p>
            <p>2. Click "Search" or select a letter from the alphabet grid</p>
            <p>3. Browse through all words that begin with those letters</p>
            <p>4. Use this for crosswords, Scrabble, Words with Friends, and more</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
