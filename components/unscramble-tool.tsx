"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { unscrambleWord } from "@/lib/word-utils"

export function UnscrambleTool() {
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
        <WordInput onSearch={handleSearch} placeholder="Enter letters to unscramble..." buttonText="Unscramble" />
      </div>
      {searched && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Unscrambled Words ({results.length} found)</h2>
          <WordList words={results} />
        </div>
      )}
    </>
  )
}
