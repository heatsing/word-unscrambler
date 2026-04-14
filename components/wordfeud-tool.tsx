"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord, calculateScrabbleScore } from "@/lib/word-utils"

export function WordfeudTool() {
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (letters: string) => {
    const words = unscrambleWord(letters)
    const sorted = words.sort((a, b) => calculateScrabbleScore(b.word) - calculateScrabbleScore(a.word))
    setResults(sorted.map((w) => w.word))
    setSearched(true)
  }

  return (
    <>
      <div className="mb-12">
        <WordInput onSearch={handleSearch} placeholder="Enter your Wordfeud tiles..." buttonText="Find Words" />
      </div>
      {searched && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Best Wordfeud Words ({results.length} found)</h2>
          <WordList words={results} showScore calculateScore={calculateScrabbleScore} />
        </div>
      )}
    </>
  )
}
