"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Square } from "lucide-react"
import { ALL_WORDS } from "@/lib/dictionary"
import { WordList } from "@/components/word-list"

function cleanLetters(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, "")
}

export default function LetterBoxedSolverPage() {
  const [letters, setLetters] = useState("")
  const [required, setRequired] = useState("")
  const [minLen, setMinLen] = useState(3)
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const letterSet = useMemo(() => new Set(cleanLetters(letters).split("")), [letters])
  const requiredLetter = useMemo(() => cleanLetters(required).slice(0, 1), [required])

  const handleSolve = () => {
    const allowed = new Set(cleanLetters(letters).split(""))
    const req = cleanLetters(required).slice(0, 1)
    if (allowed.size === 0) return

    const filtered = ALL_WORDS.filter((w) => {
      if (w.length < minLen) return false
      if (req && !w.includes(req)) return false
      for (const ch of w) {
        if (!allowed.has(ch)) return false
      }
      return true
    })

    filtered.sort((a, b) => b.length - a.length || a.localeCompare(b))
    setResults(filtered)
    setSearched(true)
  }

  const handleReset = () => {
    setLetters("")
    setRequired("")
    setMinLen(3)
    setResults([])
    setSearched(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Square className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Letter Boxed Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Enter the puzzle letters to find valid words using only those letters. Optionally require a specific letter.
          </p>
        </div>

        <Card className="mb-10 shadow-lg">
          <CardHeader>
            <CardTitle>Enter letters</CardTitle>
            <CardDescription>Paste all available letters (e.g. abcd...); we’ll find words that use only them.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="letters">Allowed letters</Label>
              <Input
                id="letters"
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
                placeholder="e.g., abcdetnrs"
                className="h-12 font-mono"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {Array.from(letterSet).slice(0, 12).map((l) => (
                  <Badge key={l} variant="outline" className="uppercase">{l}</Badge>
                ))}
                {letterSet.size > 12 && <Badge variant="secondary">+{letterSet.size - 12}</Badge>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="required">Required letter (optional)</Label>
                <Input
                  id="required"
                  value={required}
                  onChange={(e) => setRequired(e.target.value)}
                  placeholder="e.g., e"
                  className="h-12 font-mono"
                />
                {requiredLetter && (
                  <p className="text-xs text-muted-foreground">
                    Requiring: <span className="font-medium uppercase">{requiredLetter}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minLen">Minimum word length</Label>
                <Input
                  id="minLen"
                  type="number"
                  min={2}
                  max={15}
                  value={minLen}
                  onChange={(e) => setMinLen(Number(e.target.value || 3))}
                  className="h-12"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSolve} className="flex-1" size="lg">
                Find Words
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
                Found {results.length} word{results.length !== 1 ? "s" : ""}
              </h2>
              <Badge variant="secondary" className="font-mono uppercase">
                {cleanLetters(letters) || "—"}
              </Badge>
            </div>
            <WordList words={results.slice(0, 500)} />
            {results.length > 500 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Showing first 500 results. Increase minimum length or add a required letter to narrow it down.
              </p>
            )}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Related tools</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link href="/word-unscrambler"><Button variant="outline" size="sm">Word Unscrambler</Button></Link>
            <Link href="/anagram-solver"><Button variant="outline" size="sm">Anagram Solver</Button></Link>
            <Link href="/word-finder"><Button variant="outline" size="sm">Word Finder</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

