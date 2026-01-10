"use client"

import { useState } from "react"
import { WordInput } from "@/components/word-input"
import { WordList } from "@/components/word-list"
import { generateAnagrams } from "@/lib/word-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function AnagramSolverPage() {
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (word: string) => {
    const anagrams = generateAnagrams(word)
    setResults(anagrams)
    setSearched(true)
    setSearchTerm(word)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Anagram Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find all anagrams of any word. Rearrange letters to discover new words with the same letters.
          </p>
        </div>

        <div className="mb-12">
          <WordInput
            onSearch={handleSearch}
            placeholder="Enter a word to find anagrams..."
            buttonText="Find Anagrams"
          />
        </div>

        {searched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {results.length > 0
                ? `Found ${results.length} anagram${results.length === 1 ? "" : "s"} for "${searchTerm}"`
                : `No anagrams found for "${searchTerm}"`}
            </h2>
            <WordList words={results} />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>What is an Anagram?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="leading-relaxed">
                An anagram is a word or phrase formed by rearranging the letters of another word or phrase, using all
                the original letters exactly once. For example, "listen" and "silent" are anagrams of each other.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Anagrams</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>• listen → silent, enlist</p>
              <p>• earth → heart, hater</p>
              <p>• night → thing</p>
              <p>• stop → post, spot, tops</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
