"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateAnagrams } from "@/lib/word-utils"
import { Shuffle, Search, Info, Lightbulb, Sparkles } from "lucide-react"

const exampleWords = [
  { word: "listen", anagrams: ["silent", "enlist"] },
  { word: "earth", anagrams: ["heart", "hater"] },
  { word: "angel", anagrams: ["angle", "glean"] },
  { word: "stop", anagrams: ["post", "spot", "tops", "pots"] },
]

export function AnagramSolverTool() {
  const [word, setWord] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    if (!word.trim()) return
    setResults(generateAnagrams(word))
    setSearched(true)
  }

  const handleReset = () => {
    setWord("")
    setResults([])
    setSearched(false)
  }

  const groupByLength = results.reduce((acc, w) => {
    const len = w.length
    if (!acc[len]) acc[len] = []
    acc[len].push(w)
    return acc
  }, {} as Record<number, string[]>)

  return (
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
              <Label htmlFor="anagram-solver-word" className="text-base font-semibold">
                Your Word
              </Label>
              <Input
                id="anagram-solver-word"
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value.toLowerCase())}
                placeholder="Enter a word (e.g., listen, earth, stop)"
                className="text-lg h-14"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <p className="text-xs text-muted-foreground">Enter any word to find all valid anagrams</p>
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
                        <Card key={`${anagram}-${index}`} className="hover:shadow-md transition-all hover:scale-105 cursor-pointer hover-lift group">
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
                              <Card key={`${anagram}-${index}`} className="hover:shadow-md transition-all hover-lift cursor-pointer">
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-lg font-bold uppercase text-center">{anagram}</CardTitle>
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
                    The word &quot;{word}&quot; has no valid anagrams in our dictionary
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

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
                  type="button"
                  onClick={() => {
                    setWord(example.word)
                    setResults(generateAnagrams(example.word))
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
              An anagram is a word or phrase formed by rearranging the letters of another word or phrase, using all the original letters exactly once.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <p className="font-semibold mb-2">Examples:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>• &quot;listen&quot; → &quot;silent&quot;</p>
                <p>• &quot;earth&quot; → &quot;heart&quot;</p>
                <p>• &quot;angel&quot; → &quot;angle&quot;</p>
                <p>• &quot;stop&quot; → &quot;post&quot; → &quot;spot&quot;</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-xs">
              Anagrams are popular in word games, puzzles, and cryptography. They&apos;re also used in literature and wordplay for creative expression.
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
            <p>• &quot;dormitory&quot; → &quot;dirty room&quot;</p>
            <p>• &quot;astronomer&quot; → &quot;moon starer&quot;</p>
            <p>• &quot;the eyes&quot; → &quot;they see&quot;</p>
            <p>• &quot;a gentleman&quot; → &quot;elegant man&quot;</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
