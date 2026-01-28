"use client"

import { useState } from "react"
import Link from "next/link"
import { AdvancedWordSearch } from "@/components/advanced-word-search"
import { WordList } from "@/components/word-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Grid3x3 } from "lucide-react"

export default function WordSearchSolverPage() {
  const [results, setResults] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Grid3x3 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Search Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Use filters to quickly find words you spot in a word search puzzle: starts with, ends with, contains, and more.
          </p>
        </div>

        <div className="mb-10">
          <AdvancedWordSearch
            onSearch={(r) => {
              setResults(r)
              setHasSearched(true)
            }}
          />
        </div>

        {hasSearched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Found {results.length} matches</h2>
            <WordList words={results.slice(0, 500)} />
            {results.length > 500 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Showing first 500 results. Refine filters for more specific matches.
              </p>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>• Start with the longest word you can see—it's easier to confirm.</p>
              <p>• Use “Starts” + “Ends” together to narrow results fast.</p>
              <p>• Set “Length” to match the number of letters you highlighted.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related tools</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="flex flex-wrap gap-2">
                <Link href="/word-finder"><Button variant="outline" size="sm">Word Finder</Button></Link>
                <Link href="/word-unscrambler"><Button variant="outline" size="sm">Word Unscrambler</Button></Link>
                <Link href="/crossword-solver"><Button variant="outline" size="sm">Crossword Solver</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

