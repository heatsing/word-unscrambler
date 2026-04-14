"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord, calculateScrabbleScore } from "@/lib/word-utils"

export function WordFinderTool() {
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (letters: string) => {
    const words = unscrambleWord(letters)
    setResults(words.map((w) => w.word))
    setSearched(true)
  }

  return (
    <>
      <div className="mb-12">
        <WordInput onSearch={handleSearch} placeholder="Enter your tiles..." buttonText="Find Words" />
      </div>
      {searched && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Found Words ({results.length})</h2>
          <WordList words={results} showScore calculateScore={calculateScrabbleScore} />
        </div>
      )}
    </>
  )
}
