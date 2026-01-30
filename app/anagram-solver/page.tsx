"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateAnagrams } from "@/lib/word-utils"
import { Sparkles, Shuffle, Info, Lightbulb, Search } from "lucide-react"

export default function AnagramSolverPage() {
  const [word, setWord] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    if (!word.trim()) return
    const anagrams = generateAnagrams(word)
    setResults(anagrams)
    setSearched(true)
  }

  const handleReset = () => {
    setWord("")
    setResults([])
    setSearched(false)
  }

  const exampleWords = [
    { word: "listen", anagrams: ["silent", "enlist"] },
    { word: "earth", anagrams: ["heart", "hater"] },
    { word: "angel", anagrams: ["angle", "glean"] },
    { word: "stop", anagrams: ["post", "spot", "tops", "pots"] },
  ]

  const groupByLength = results.reduce((acc, word) => {
    const len = word.length
    if (!acc[len]) acc[len] = []
    acc[len].push(word)
    return acc
  }, {} as Record<number, string[]>)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 shadow-lg">
            <Shuffle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Anagram Solver
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find all anagrams of any word. Rearrange letters to discover new words with the same letters.
          </p>
        </div>

        {/* Search Interface */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-scale-in shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Anagrams
                </CardTitle>
                <CardDescription>Enter a word to discover all its possible anagrams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="word" className="text-base font-semibold">
                    Your Word
                  </Label>
                  <Input
                    id="word"
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value.toLowerCase())}
                    placeholder="Enter a word (e.g., listen, earth, stop)"
                    className="text-lg h-14"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter any word to find all valid anagrams
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSearch} className="flex-1" size="lg">
                    <Shuffle className="mr-2 h-4 w-4" />
                    Find Anagrams
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="lg">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {searched && (
              <Card className="animate-fade-in shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {results.length > 0
                        ? `Found ${results.length} anagram${results.length === 1 ? "" : "s"}`
                        : "No anagrams found"}
                    </CardTitle>
                    {word && (
                      <Badge variant="secondary" className="uppercase">
                        {word}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {results.length > 0 ? (
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="all">All Anagrams</TabsTrigger>
                        <TabsTrigger value="grouped">By Length</TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="mt-6">
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                          {results.map((anagram, index) => (
                            <Card
                              key={`${anagram}-${index}`}
                              className="hover:shadow-md transition-all hover:scale-105 cursor-pointer hover-lift group"
                            >
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-bold uppercase text-center group-hover:text-primary transition-colors">
                                  {anagram}
                                </CardTitle>
                                <CardDescription className="text-xs text-center">
                                  {anagram.length} letter{anagram.length !== 1 ? "s" : ""}
                                </CardDescription>
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="grouped" className="mt-6 space-y-6">
                        {Object.keys(groupByLength)
                          .sort((a, b) => Number(b) - Number(a))
                          .map((length) => (
                            <div key={length} className="space-y-3">
                              <h3 className="text-xl font-semibold flex items-center gap-2">
                                {length} Letter Anagrams
                                <Badge variant="outline">{groupByLength[Number(length)].length}</Badge>
                              </h3>
                              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                {groupByLength[Number(length)].map((anagram, index) => (
                                  <Card
                                    key={`${anagram}-${index}`}
                                    className="hover:shadow-md transition-all hover-lift cursor-pointer"
                                  >
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg font-bold uppercase text-center">
                                        {anagram}
                                      </CardTitle>
                                    </CardHeader>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          ))}
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="text-center py-12">
                      <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">No anagrams found</p>
                      <p className="text-sm text-muted-foreground">
                        The word "{word}" has no valid anagrams in our dictionary
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Try These Examples
                </CardTitle>
                <CardDescription>Click to find anagrams instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {exampleWords.map((example) => (
                    <button
                      key={example.word}
                      onClick={() => {
                        setWord(example.word)
                        const anagrams = generateAnagrams(example.word)
                        setResults(anagrams)
                        setSearched(true)
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <div className="font-semibold uppercase group-hover:text-primary transition-colors">
                        {example.word}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {example.anagrams.join(", ")}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  What is an Anagram?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="text-muted-foreground leading-relaxed">
                  An anagram is a word or phrase formed by rearranging the letters of another word or phrase, using all
                  the original letters exactly once.
                </p>
                <div className="bg-background p-4 rounded-lg border">
                  <p className="font-semibold mb-2">Examples:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• "listen" → "silent"</p>
                    <p>• "earth" → "heart"</p>
                    <p>• "angel" → "angle"</p>
                    <p>• "stop" → "post" → "spot"</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Anagrams are popular in word games, puzzles, and cryptography. They're also used in literature and
                  wordplay for creative expression.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Fun Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• "dormitory" → "dirty room"</p>
                <p>• "astronomer" → "moon starer"</p>
                <p>• "the eyes" → "they see"</p>
                <p>• "a gentleman" → "elegant man"</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SEO/GEO: keyword emphasis + dofollow internal links */}
        <div className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">Complete Anagram Solver & Generator</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our <strong>anagram solver</strong> is the most comprehensive tool for finding anagrams of any word. Using an extensive
            dictionary database, we can quickly identify all valid anagrams by rearranging the letters of your input
            word. Whether you&apos;re solving word puzzles with our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link>, playing <Link href="/wordle-solver" className="text-primary font-medium hover:underline">Wordle</Link> or <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link>, or just exploring the fascinating world of
            anagrams, our tool provides instant, accurate results.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Anagrams have been used throughout history in literature, wordplay, and cryptography. They appear in word
            games like <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link> and crossword puzzles, making this tool invaluable for word game enthusiasts. Our
            solver not only finds anagrams but also organizes them by length and frequency for easy browsing. Need <strong>5 letter words</strong>? See our <Link href="/5-letter-words" className="text-primary font-medium hover:underline">5 letter words list</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Perfect for students, writers, puzzle enthusiasts, and anyone who loves playing with words. Discover hidden
            meanings, create clever wordplay, or simply <strong>unscramble letters</strong> to form new
            words. Try our <Link href="/descrambler" className="text-primary font-medium hover:underline">word descrambler</Link> or <Link href="/word-finder" className="text-primary font-medium hover:underline">word finder</Link> for more options.
          </p>
        </div>
      </div>
    </div>
  )
}
