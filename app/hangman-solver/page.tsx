"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skull } from "lucide-react"
import { ALL_WORDS } from "@/lib/dictionary"
import { WordList } from "@/components/word-list"

function normalizePattern(pattern: string) {
  return pattern
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z_]/g, "")
}

export default function HangmanSolverPage() {
  const [pattern, setPattern] = useState("_____")
  const [excluded, setExcluded] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const cleanPattern = useMemo(() => normalizePattern(pattern), [pattern])
  const length = cleanPattern.length

  const handleSolve = () => {
    const p = normalizePattern(pattern)
    if (!p) return

    const excludedSet = new Set(
      excluded
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .split(""),
    )

    // Build regex: _ -> .  (exact length match)
    const re = new RegExp(`^${p.replace(/_/g, ".")}$`)

    const filtered = ALL_WORDS.filter((w) => {
      if (w.length !== p.length) return false
      if (!re.test(w)) return false
      for (const ch of excludedSet) {
        if (ch && w.includes(ch)) return false
      }
      return true
    })

    // Sort: shorter alphabetically after; but same length so just alpha
    filtered.sort((a, b) => a.localeCompare(b))
    setResults(filtered)
    setSearched(true)
  }

  const handleReset = () => {
    setPattern("_____")
    setExcluded("")
    setResults([])
    setSearched(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Skull className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Hangman Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Enter a word pattern and excluded letters to find the best matches.
          </p>
        </div>

        <Card className="mb-10 shadow-lg">
          <CardHeader>
            <CardTitle>Enter your Hangman clues</CardTitle>
            <CardDescription>Use underscores (_) for unknown letters, e.g. h_ngm_n</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pattern">Pattern</Label>
              <Input
                id="pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="e.g., h_ngm_n"
                className="h-12 font-mono text-lg"
              />
              <p className="text-xs text-muted-foreground">
                Current length: <span className="font-medium">{length || 0}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excluded">Excluded letters</Label>
              <Input
                id="excluded"
                value={excluded}
                onChange={(e) => setExcluded(e.target.value)}
                placeholder="e.g., aeiou"
                className="h-12"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSolve} className="flex-1" size="lg">
                Find Matches
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {searched && (
          <div className="mb-12">
            <div className="flex items-center justify-between gap-3 mb-6">
              <h2 className="text-2xl font-bold">
                Found {results.length} match{results.length !== 1 ? "es" : ""}
              </h2>
              <Badge variant="secondary" className="font-mono uppercase">
                {cleanPattern || "—"}
              </Badge>
            </div>
            <WordList words={results.slice(0, 500)} />
            {results.length > 500 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Showing first 500 results. Add more known letters or excluded letters to narrow it down.
              </p>
            )}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Related tools</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link href="/word-finder"><Button variant="outline" size="sm">Word Finder</Button></Link>
            <Link href="/crossword-solver"><Button variant="outline" size="sm">Crossword Solver</Button></Link>
            <Link href="/word-unscrambler"><Button variant="outline" size="sm">Word Unscrambler</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

