"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ALL_WORDS } from "@/lib/dictionary"
import { Search, Sparkles, Layers } from "lucide-react"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"

const exampleSearches = [
  { letters: "qu", description: "Words with QU" },
  { letters: "xyz", description: "Rare letter combo" },
  { letters: "tion", description: "Common ending" },
  { letters: "ae", description: "Vowel pair" },
]

export default function WordsWithLettersPage() {
  const searchParams = useSearchParams()
  const [letters, setLetters] = useState("")
  const [searched, setSearched] = useState(false)
  const [lengthFilter, setLengthFilter] = useState<number | null>(null)
  const [selectedWord, setSelectedWord] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const lettersParam = searchParams.get("letters")
    const lengthParam = searchParams.get("length")

    if (lettersParam) {
      setLetters(lettersParam.toLowerCase())
      setSearched(true)
    }
    if (lengthParam) {
      setLengthFilter(Number(lengthParam))
    }
  }, [searchParams])

  const results = useMemo(() => {
    if (!letters.trim()) return []
    const searchLetters = letters.toLowerCase().trim()
    let filtered = ALL_WORDS.filter((word) => word.includes(searchLetters))

    if (lengthFilter) {
      filtered = filtered.filter((word) => word.length === lengthFilter)
    }

    return filtered
  }, [letters, searched, lengthFilter])

  const handleSearch = () => {
    if (letters.trim()) {
      setSearched(true)
    }
  }

  const handleExampleClick = (exampleLetters: string) => {
    setLetters(exampleLetters)
    setSearched(true)
  }

  const groupedResults = useMemo(() => {
    return results.reduce((acc, word) => {
      const len = word.length
      if (!acc[len]) acc[len] = []
      acc[len].push(word)
      return acc
    }, {} as Record<number, string[]>)
  }, [results])

  const displayResults = results.slice(0, 100)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mb-4 shadow-lg">
            <Layers className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Words With Letters
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find all words that contain specific letters. Enter any combination of letters and discover words that
            include them.
          </p>
          {lengthFilter && (
            <Badge variant="secondary" className="mt-4">
              Filtered by {lengthFilter}-letter words
            </Badge>
          )}
        </div>

        {/* Search Interface */}
        <Card className="mb-8 shadow-lg animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Words Containing Letters
            </CardTitle>
            <CardDescription>Enter letters to find all words that contain them anywhere</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
              }}
              className="flex gap-3"
            >
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={letters}
                  onChange={(e) => setLetters(e.target.value.toLowerCase())}
                  placeholder="Enter letters (e.g., qu, xyz, tion)"
                  className="h-12 text-lg"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>

            <div>
              <p className="text-sm font-semibold mb-3 text-center">Try These Examples:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {exampleSearches.map((example) => (
                  <Button
                    key={example.letters}
                    variant="outline"
                    onClick={() => handleExampleClick(example.letters)}
                    className="flex flex-col h-auto p-3 hover:bg-primary hover:text-primary-foreground"
                  >
                    <span className="font-bold uppercase">{example.letters}</span>
                    <span className="text-xs mt-1">{example.description}</span>
                  </Button>
                ))}
              </div>
            </div>

            {lengthFilter && (
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLengthFilter(null)}
                >
                  Clear length filter
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {searched && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                Words containing "{letters}"{lengthFilter ? ` (${lengthFilter} letters)` : ""}
              </h2>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-sm">
                  Total: {results.length}
                </Badge>
                {results.length > 100 && (
                  <Badge variant="default" className="text-sm">
                    Showing first 100
                  </Badge>
                )}
              </div>
            </div>

            {results.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All Words</TabsTrigger>
                  <TabsTrigger value="grouped">By Length</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {displayResults.map((word, index) => {
                      const letterIndex = word.indexOf(letters.toLowerCase())
                      const before = word.slice(0, letterIndex)
                      const match = word.slice(letterIndex, letterIndex + letters.length)
                      const after = word.slice(letterIndex + letters.length)

                      return (
                        <Card
                          key={`${word}-${index}`}
                          className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer hover-lift group"
                          onClick={() => {
                            setSelectedWord(word)
                            setDialogOpen(true)
                          }}
                        >
                          <span className="font-semibold text-sm md:text-base uppercase group-hover:text-primary transition-colors">
                            {before}
                            <span className="text-primary font-bold">{match}</span>
                            {after}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {word.length} letter{word.length !== 1 ? "s" : ""}
                          </p>
                        </Card>
                      )
                    })}
                  </div>
                  {results.length > 100 && (
                    <p className="text-center text-sm text-muted-foreground mt-6">
                      Showing first 100 of {results.length} words. Try a more specific search for better results.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="grouped" className="mt-6 space-y-6">
                  {Object.keys(groupedResults)
                    .sort((a, b) => Number(a) - Number(b))
                    .map((length) => {
                      const wordsInGroup = groupedResults[Number(length)]
                      const displayWords = wordsInGroup.slice(0, 20)

                      return (
                        <div key={length} className="space-y-3">
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            {length} Letter Words
                            <Badge variant="outline">{wordsInGroup.length}</Badge>
                          </h3>
                          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {displayWords.map((word, index) => (
                              <Card
                                key={`${word}-${index}`}
                                className="p-3 text-center hover:shadow-md hover:scale-105 transition-all cursor-pointer"
                                onClick={() => {
                                  setSelectedWord(word)
                                  setDialogOpen(true)
                                }}
                              >
                                <span className="font-semibold uppercase">{word}</span>
                              </Card>
                            ))}
                          </div>
                          {wordsInGroup.length > 20 && (
                            <p className="text-xs text-muted-foreground">
                              Showing first 20 of {wordsInGroup.length} words
                            </p>
                          )}
                        </div>
                      )
                    })}
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="p-12 text-center border-dashed">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">No words found</p>
                <p className="text-sm text-muted-foreground">
                  No words contain "{letters}". Try different letters.
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                How to Use
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Enter any letter combination in the search box</p>
              <p>2. Click "Search" or press Enter to find words</p>
              <p>3. Letters can appear anywhere in the word</p>
              <p>4. Browse results in grid view or grouped by length</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Perfect For</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Finding words with rare letter combinations</p>
              <p>• Word game pattern discovery</p>
              <p>• Crossword puzzle assistance</p>
              <p>• Spelling and vocabulary practice</p>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-sm max-w-none">
          <Card className="p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Find Words Containing Specific Letters</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our Words With Letters tool helps you discover all words that contain specific letter combinations.
                Whether you're solving crossword puzzles, playing word games, or exploring English word patterns, this
                comprehensive search tool makes it easy to find words with particular letter sequences.
              </p>
              <p>
                Simply enter any letter combination (like "qu", "xyz", or "tion") and instantly see all words that
                contain those letters anywhere in the word. The matching letters are highlighted in each result for easy
                identification. Perfect for finding words with rare letter combinations or common patterns.
              </p>
              <p>
                With thousands of words in our database, you'll discover interesting patterns and expand your vocabulary.
                Use this tool for Scrabble strategy, crossword solving, or language learning. Our search is fast,
                accurate, and completely free to use.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Word Definition Dialog */}
      <WordDefinitionDialog
        word={selectedWord}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
