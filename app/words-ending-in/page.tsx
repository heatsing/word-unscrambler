"use client"

import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ALL_WORDS } from "@/lib/dictionary"
import { Search, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { AdvancedWordSearch } from "@/components/advanced-word-search"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"

const commonEndings = ["ed", "ing", "ly", "er", "est", "tion", "ness", "ful", "less", "ment", "ity", "ous", "ive", "able", "ible", "al", "ic", "ical", "ish", "ize"]

export default function WordsEndingInPage() {
  const searchParams = useSearchParams()
  const [suffix, setSuffix] = useState("")
  const [searched, setSearched] = useState(false)
  const [lengthFilter, setLengthFilter] = useState<number | null>(null)
  const [advancedSearchResults, setAdvancedSearchResults] = useState<string[]>([])
  const [showAdvancedResults, setShowAdvancedResults] = useState(false)
  const [selectedWord, setSelectedWord] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const lettersParam = searchParams.get("letters")
    const lengthParam = searchParams.get("length")

    if (lettersParam) {
      setSuffix(lettersParam.toLowerCase())
      setSearched(true)
    }
    if (lengthParam) {
      setLengthFilter(Number(lengthParam))
    }
  }, [searchParams])

  const results = useMemo(() => {
    if (!suffix.trim()) return []
    const searchSuffix = suffix.toLowerCase().trim()
    let filtered = ALL_WORDS.filter((word) => word.endsWith(searchSuffix))

    if (lengthFilter) {
      filtered = filtered.filter((word) => word.length === lengthFilter)
    }

    return filtered
  }, [suffix, searched, lengthFilter])

  const handleSearch = () => {
    if (suffix.trim()) {
      setSearched(true)
    }
  }

  const handleEndingClick = (ending: string) => {
    setSuffix(ending)
    setSearched(true)
  }

  const handleAdvancedSearch = (results: string[]) => {
    setAdvancedSearchResults(results)
    setShowAdvancedResults(true)
    setSearched(false) // Hide simple search results
  }

  const groupedResults = useMemo(() => {
    return results.reduce((acc, word) => {
      const len = word.length
      if (!acc[len]) acc[len] = []
      acc[len].push(word)
      return acc
    }, {} as Record<number, string[]>)
  }, [results])

  const groupedAdvancedResults = useMemo(() => {
    return advancedSearchResults.reduce((acc, word) => {
      const len = word.length
      if (!acc[len]) acc[len] = []
      acc[len].push(word)
      return acc
    }, {} as Record<number, string[]>)
  }, [advancedSearchResults])

  const displayResults = results.slice(0, 100)
  const displayAdvancedResults = advancedSearchResults.slice(0, 100)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-4 shadow-lg">
            <ArrowLeft className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Words Ending In
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find all words that end with specific letters. Perfect for rhyming, poetry, word games, and creative writing.
          </p>
          {lengthFilter && (
            <Badge variant="secondary" className="mt-4">
              Filtered by {lengthFilter}-letter words
            </Badge>
          )}
        </div>

        {/* Advanced Search Module */}
        <div className="mb-8 animate-scale-in">
          <AdvancedWordSearch onSearch={handleAdvancedSearch} />
        </div>

        {/* Two columns: Words Start With (left) | Search Words by Ending Letters (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Words Start With */}
          <Card className="shadow-lg animate-scale-in h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Words Start With
              </CardTitle>
              <CardDescription>
                Find words that start with specific letters. Browse by starting letter or use the search on the Words Start With page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href="/words-start-with"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Words Start With – main tool
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-3 text-muted-foreground">Browse by starting letter (A–Z):</p>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {Array.from("abcdefghijklmnopqrstuvwxyz").map((letter) => (
                    <Link
                      key={letter}
                      href={`/words-starting-with/${letter}`}
                      className="flex items-center justify-center h-10 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground font-semibold text-sm uppercase transition-colors"
                    >
                      {letter}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Search Words by Ending Letters */}
          <Card className="shadow-lg animate-scale-in h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Words by Ending Letters
              </CardTitle>
              <CardDescription>Enter letters to find all words that end with them</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSearch()
                }}
                className="space-y-4"
              >
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value.toLowerCase())}
                    placeholder="Enter ending letters (e.g., ing, ed, tion)"
                    className="h-12 text-lg flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button type="submit" size="lg" className="h-12 px-8">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2 text-muted-foreground">Common Word Endings:</p>
                  <div className="flex flex-wrap gap-2">
                    {commonEndings.map((ending) => (
                      <Button
                        key={ending}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleEndingClick(ending)}
                        className="font-medium hover:bg-primary hover:text-primary-foreground"
                      >
                        -{ending}
                      </Button>
                    ))}
                  </div>
                </div>
                {lengthFilter && (
                  <div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setLengthFilter(null)}
                    >
                      Clear length filter
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Search results for "Search Words by Ending Letters" – show below the two columns */}
        {searched && (
          <div className="space-y-6 animate-fade-in mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Words ending in &quot;{suffix}&quot;{lengthFilter ? ` (${lengthFilter} letters)` : ""}
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
                    {displayResults.map((word, index) => (
                      <Card
                        key={`${word}-${index}`}
                        className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer hover-lift group"
                        onClick={() => {
                          setSelectedWord(word)
                          setDialogOpen(true)
                        }}
                      >
                        <span className="font-semibold text-sm md:text-base uppercase group-hover:text-primary transition-colors">
                          {word}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {word.length} letter{word.length !== 1 ? "s" : ""}
                        </p>
                      </Card>
                    ))}
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
                  No words end with &quot;{suffix}&quot;. Try different letters.
                </p>
              </Card>
            )}
          </div>
        )}

        {/* A-Z Letter Navigation */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Words that End in A-Z</CardTitle>
            <CardDescription>Browse words by ending letter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Letter Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-13 gap-2">
              {Array.from("abcdefghijklmnopqrstuvwxyz").map((letter) => (
                <Link
                  key={letter}
                  href={`/words-ending-in/${letter}`}
                  className="flex items-center justify-center h-12 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground font-semibold text-lg uppercase transition-colors"
                >
                  {letter}
                </Link>
              ))}
            </div>

            {/* Text Link List */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {Array.from("abcdefghijklmnopqrstuvwxyz").map((letter) => (
                  <Link
                    key={`text-${letter}`}
                    href={`/words-ending-in/${letter}`}
                    className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
                  >
                    Words That End In {letter.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Search Results */}
        {showAdvancedResults && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Search Results</h2>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-sm">
                  Total: {advancedSearchResults.length}
                </Badge>
                {advancedSearchResults.length > 100 && (
                  <Badge variant="default" className="text-sm">
                    Showing first 100
                  </Badge>
                )}
              </div>
            </div>

            {advancedSearchResults.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All Words</TabsTrigger>
                  <TabsTrigger value="grouped">By Length</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {displayAdvancedResults.map((word, index) => (
                      <Card
                        key={`${word}-${index}`}
                        className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer hover-lift group"
                        onClick={() => {
                          setSelectedWord(word)
                          setDialogOpen(true)
                        }}
                      >
                        <span className="font-semibold text-sm md:text-base uppercase group-hover:text-primary transition-colors">
                          {word}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {word.length} letter{word.length !== 1 ? "s" : ""}
                        </p>
                      </Card>
                    ))}
                  </div>
                  {advancedSearchResults.length > 100 && (
                    <p className="text-center text-sm text-muted-foreground mt-6">
                      Showing first 100 of {advancedSearchResults.length} words. Try a more specific search for better results.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="grouped" className="mt-6 space-y-6">
                  {Object.keys(groupedAdvancedResults)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((length) => {
                      const wordsInGroup = groupedAdvancedResults[Number(length)]
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
                  Try adjusting your search filters.
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
              <p>1. Enter the ending letter(s) in the search box</p>
              <p>2. Click "Search" or press Enter to find words</p>
              <p>3. Or click any common ending for quick search</p>
              <p>4. Browse results in grid view or grouped by length</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Perfect For</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Finding rhyming words for poetry</p>
              <p>• Scrabble and word game strategies</p>
              <p>• Creative writing and songwriting</p>
              <p>• Language learning and word patterns</p>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-sm max-w-none">
          <Card className="p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Find Words Ending With Any Letters</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our Words Ending In tool helps you discover all words that finish with specific letters. Whether you're
                writing poetry, solving word puzzles, or playing word games, this comprehensive tool makes it easy to
                find words with specific endings.
              </p>
              <p>
                Simply enter any ending letters (like "ing", "ed", or "tion") and instantly see all matching words from
                our extensive dictionary. Perfect for finding rhymes, completing crosswords, or exploring word patterns.
                View results organized by length or in a complete list for easy browsing.
              </p>
              <p>
                With thousands of words in our database, you'll discover common endings like "-ly", "-er", and "-ness",
                as well as less common suffixes. Our tool is perfect for poets, writers, word game enthusiasts, and
                language learners exploring English word patterns.
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
