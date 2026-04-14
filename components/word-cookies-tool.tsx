"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { unscrambleWord, type WordResult } from "@/lib/word-utils"
import { WordList } from "@/components/word-list"
import { Search, Filter } from "lucide-react"

export function WordCookiesTool() {
  const [letters, setLetters] = useState("")
  const [startsWith, setStartsWith] = useState("")
  const [endsWith, setEndsWith] = useState("")
  const [contains, setContains] = useState("")
  const [minLength, setMinLength] = useState<number>(2)
  const [maxLength, setMaxLength] = useState<number>(15)
  const [sortBy, setSortBy] = useState<"length" | "alpha">("length")
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    if (!letters.trim()) return

    const words = unscrambleWord(letters, {
      minLength,
      maxLength,
      mustContain: contains || undefined,
      sortBy: sortBy === "length" ? "length" : "alpha",
    })

    let filtered: WordResult[] = words
    if (startsWith) {
      filtered = filtered.filter((w) => w.word.toLowerCase().startsWith(startsWith.toLowerCase()))
    }
    if (endsWith) {
      filtered = filtered.filter((w) => w.word.toLowerCase().endsWith(endsWith.toLowerCase()))
    }

    setResults(filtered.map((w) => w.word))
    setSearched(true)
  }

  const handleReset = () => {
    setLetters("")
    setStartsWith("")
    setEndsWith("")
    setContains("")
    setMinLength(2)
    setMaxLength(15)
    setSortBy("length")
    setResults([])
    setSearched(false)
  }

  return (
    <>
      <Card className="mb-8 animate-scale-in shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Enter Your Letters
          </CardTitle>
          <CardDescription>
            Unscramble your Word Cookies letters with Starts With, Ends With, Contains, and Length filters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="word-cookies-letters" className="text-base font-semibold">
              Word Cookies Letters
            </Label>
            <Input
              id="word-cookies-letters"
              type="text"
              value={letters}
              onChange={(e) => setLetters(e.target.value.toLowerCase())}
              placeholder="Enter letters (e.g., cookie)"
              className="text-lg h-14"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <p className="text-xs text-muted-foreground">Enter up to 15 letters. Use ? for wildcards.</p>
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="word-cookies-startsWith">Starts With</Label>
                <Input
                  id="word-cookies-startsWith"
                  type="text"
                  value={startsWith}
                  onChange={(e) => setStartsWith(e.target.value.toLowerCase())}
                  placeholder="e.g., ab"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="word-cookies-endsWith">Ends With</Label>
                <Input
                  id="word-cookies-endsWith"
                  type="text"
                  value={endsWith}
                  onChange={(e) => setEndsWith(e.target.value.toLowerCase())}
                  placeholder="e.g., ing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="word-cookies-contains">Contains</Label>
                <Input
                  id="word-cookies-contains"
                  type="text"
                  value={contains}
                  onChange={(e) => setContains(e.target.value.toLowerCase())}
                  placeholder="e.g., qu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="word-cookies-sortBy">Sort By</Label>
                <Select value={sortBy} onValueChange={(v: "length" | "alpha") => setSortBy(v)}>
                  <SelectTrigger id="word-cookies-sortBy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="length">Longest First</SelectItem>
                    <SelectItem value="alpha">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="word-cookies-minLength">Min Length</Label>
                <Input
                  id="word-cookies-minLength"
                  type="number"
                  min={2}
                  max={15}
                  value={minLength}
                  onChange={(e) => setMinLength(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="word-cookies-maxLength">Max Length</Label>
                <Input
                  id="word-cookies-maxLength"
                  type="number"
                  min={2}
                  max={15}
                  value={maxLength}
                  onChange={(e) => setMaxLength(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSearch} className="flex-1" size="lg">
              <Search className="mr-2 h-4 w-4" />
              Get Answers
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && (
        <div className="space-y-6 animate-fade-in mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              All Possible Words ({results.length} found)
            </h2>
            <Badge variant="secondary" className="text-sm">
              {sortBy === "length" ? "By Length" : "A–Z"}
            </Badge>
          </div>
          {results.length > 0 ? (
            <WordList words={results} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <p className="text-lg font-semibold mb-2">No words found</p>
                <p className="text-sm text-muted-foreground">
                  Try different letters or loosen filters (e.g. shorter min length).
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  )
}
