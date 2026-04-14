"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ALL_WORDS } from "@/lib/dictionary"
import { WordList } from "@/components/word-list"

function normalizePattern(pattern: string) {
  return pattern
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z_]/g, "")
}

export function HangmanSolverTool() {
  const [pattern, setPattern] = useState("_____")
  const [excluded, setExcluded] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const cleanPattern = useMemo(() => normalizePattern(pattern), [pattern])
  const length = cleanPattern.length

  const handleSolve = () => {
    const p = normalizePattern(pattern)
    if (!p) return
    const excludedSet = new Set(excluded.toLowerCase().replace(/[^a-z]/g, "").split(""))
    const re = new RegExp(`^${p.replace(/_/g, ".")}$`)
    const filtered = ALL_WORDS.filter((w) => {
      if (w.length !== p.length) return false
      if (!re.test(w)) return false
      for (const ch of excludedSet) {
        if (ch && w.includes(ch)) return false
      }
      return true
    })
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
    <>
      <Card className="mb-10 shadow-lg">
        <CardHeader>
          <CardTitle>Enter your Hangman clues</CardTitle>
          <CardDescription>Use underscores (_) for unknown letters, e.g. h_ngm_n</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hangman-pattern">Pattern</Label>
            <Input
              id="hangman-pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g., h_ngm_n"
              className="h-12 font-mono text-lg"
            />
            <p className="text-xs text-muted-foreground">Current length: <span className="font-medium">{length || 0}</span></p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hangman-excluded">Excluded letters</Label>
            <Input
              id="hangman-excluded"
              value={excluded}
              onChange={(e) => setExcluded(e.target.value)}
              placeholder="e.g., aeiou"
              className="h-12"
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSolve} className="flex-1" size="lg">Find Matches</Button>
            <Button onClick={handleReset} variant="outline" size="lg">Reset</Button>
          </div>
        </CardContent>
      </Card>
      {searched && (
        <div className="mb-12">
          <div className="flex items-center justify-between gap-3 mb-6">
            <h2 className="text-2xl font-bold">
              Found {results.length} match{results.length !== 1 ? "es" : ""}
            </h2>
            <Badge variant="secondary" className="font-mono uppercase">{cleanPattern || "—"}</Badge>
          </div>
          <WordList words={results.slice(0, 500)} />
          {results.length > 500 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Showing first 500 results. Add more known letters or excluded letters to narrow it down.
            </p>
          )}
        </div>
      )}
    </>
  )
}
