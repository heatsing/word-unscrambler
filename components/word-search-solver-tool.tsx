"use client"

import { useState } from "react"
import { AdvancedWordSearch } from "@/components/advanced-word-search"
import { WordList } from "@/components/word-list"

export function WordSearchSolverTool() {
  const [results, setResults] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  return (
    <>
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
    </>
  )
}
