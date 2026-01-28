"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { unscrambleWord, type WordResult } from "@/lib/word-utils"
import { Sparkles, Search, Filter, SortAsc, Info, Zap } from "lucide-react"

export default function WordUnscramblerPage() {
  const [letters, setLetters] = useState("")
  const [startsWith, setStartsWith] = useState("")
  const [endsWith, setEndsWith] = useState("")
  const [contains, setContains] = useState("")
  const [minLength, setMinLength] = useState<number>(2)
  const [maxLength, setMaxLength] = useState<number>(15)
  const [sortBy, setSortBy] = useState<"score" | "length" | "alpha">("score")
  const [results, setResults] = useState<WordResult[]>([])
  const [searched, setSearched] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = () => {
    if (!letters.trim()) return

    const words = unscrambleWord(letters, {
      minLength,
      maxLength,
      mustContain: contains,
      sortBy,
    })

    // Apply additional filters
    let filtered = words
    if (startsWith) {
      filtered = filtered.filter((w) => w.word.toLowerCase().startsWith(startsWith.toLowerCase()))
    }
    if (endsWith) {
      filtered = filtered.filter((w) => w.word.toLowerCase().endsWith(endsWith.toLowerCase()))
    }

    setResults(filtered)
    setSearched(true)
  }

  const handleReset = () => {
    setLetters("")
    setStartsWith("")
    setEndsWith("")
    setContains("")
    setMinLength(2)
    setMaxLength(15)
    setSortBy("score")
    setResults([])
    setSearched(false)
  }

  const groupedResults = results.reduce((acc, word) => {
    const len = word.length
    if (!acc[len]) acc[len] = []
    acc[len].push(word)
    return acc
  }, {} as Record<number, WordResult[]>)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-lg mb-4 shadow-lg">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Word Unscrambler
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Unscramble letters to find all possible words. Perfect for Scrabble, Words with Friends, crosswords, and
            word games.
          </p>
        </div>

        {/* Search Interface */}
        <Card className="mb-8 animate-scale-in shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Words
            </CardTitle>
            <CardDescription>Enter your letters and apply filters to find the perfect words</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Input */}
            <div className="space-y-2">
              <Label htmlFor="letters" className="text-base font-semibold">
                Your Letters
              </Label>
              <Input
                id="letters"
                type="text"
                value={letters}
                onChange={(e) => setLetters(e.target.value.toLowerCase())}
                placeholder="Enter letters to unscramble (e.g., example)"
                className="text-lg h-14"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <p className="text-xs text-muted-foreground">Enter up to 15 letters. Use ? for wildcards.</p>
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showAdvanced ? "Hide" : "Show"} Advanced Filters
            </Button>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg border animate-fade-in">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startsWith">Starts With</Label>
                    <Input
                      id="startsWith"
                      type="text"
                      value={startsWith}
                      onChange={(e) => setStartsWith(e.target.value.toLowerCase())}
                      placeholder="e.g., ab"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endsWith">Ends With</Label>
                    <Input
                      id="endsWith"
                      type="text"
                      value={endsWith}
                      onChange={(e) => setEndsWith(e.target.value.toLowerCase())}
                      placeholder="e.g., ing"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contains">Contains</Label>
                    <Input
                      id="contains"
                      type="text"
                      value={contains}
                      onChange={(e) => setContains(e.target.value.toLowerCase())}
                      placeholder="e.g., qu"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sortBy">Sort By</Label>
                    <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                      <SelectTrigger id="sortBy">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="score">Highest Score</SelectItem>
                        <SelectItem value="length">Longest First</SelectItem>
                        <SelectItem value="alpha">Alphabetical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minLength">Min Length</Label>
                    <Input
                      id="minLength"
                      type="number"
                      min="2"
                      max="15"
                      value={minLength}
                      onChange={(e) => setMinLength(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLength">Max Length</Label>
                    <Input
                      id="maxLength"
                      type="number"
                      min="2"
                      max="15"
                      value={maxLength}
                      onChange={(e) => setMaxLength(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleSearch} className="flex-1" size="lg">
                <Search className="mr-2 h-4 w-4" />
                Search Words
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {searched && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                Found {results.length} word{results.length !== 1 ? "s" : ""}
              </h2>
              <Badge variant="secondary" className="text-sm">
                <SortAsc className="mr-1 h-3 w-3" />
                {sortBy === "score" ? "By Score" : sortBy === "length" ? "By Length" : "A-Z"}
              </Badge>
            </div>

            {results.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
                  <TabsTrigger value="all">All Words</TabsTrigger>
                  <TabsTrigger value="grouped">By Length</TabsTrigger>
                  <TabsTrigger value="top">Top Scoring</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {results.map((word, index) => (
                      <Card
                        key={`${word.word}-${index}`}
                        className="hover:shadow-lg transition-all hover-lift cursor-pointer group"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg font-bold uppercase group-hover:text-primary transition-colors">
                              {word.word}
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {word.score}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">
                            {word.length} letter{word.length !== 1 ? "s" : ""}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="grouped" className="mt-6 space-y-6">
                  {Object.keys(groupedResults)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((length) => (
                      <div key={length} className="space-y-3">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          {length} Letter Words
                          <Badge variant="outline">{groupedResults[Number(length)].length}</Badge>
                        </h3>
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                          {groupedResults[Number(length)].map((word, index) => (
                            <Card
                              key={`${word.word}-${index}`}
                              className="hover:shadow-lg transition-all hover-lift cursor-pointer"
                            >
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg font-bold uppercase">{word.word}</CardTitle>
                                  <Badge variant="secondary" className="text-xs">
                                    {word.score}
                                  </Badge>
                                </div>
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="top" className="mt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {results.slice(0, 12).map((word, index) => (
                      <Card
                        key={`${word.word}-${index}`}
                        className="hover:shadow-lg transition-all hover-lift cursor-pointer"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-bold text-primary">
                                #{index + 1}
                              </div>
                              <CardTitle className="text-2xl font-bold uppercase">{word.word}</CardTitle>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span className="text-2xl font-bold text-primary">{word.score}</span>
                              </div>
                              <CardDescription className="text-xs">points</CardDescription>
                            </div>
                          </div>
                          <CardDescription>{word.length} letters</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center">
                  <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">No words found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or using different letters
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-3 mt-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Enter your scrambled letters</p>
              <p>2. Apply filters for precise results</p>
              <p>3. Browse words sorted by score</p>
              <p>4. Use wildcards (?) for blanks</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Advanced Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Filter by starting letters</p>
              <p>• Filter by ending letters</p>
              <p>• Must contain specific letters</p>
              <p>• Set minimum/maximum length</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Word Scoring
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Scrabble-based point system</p>
              <p>• Higher scores = better words</p>
              <p>• Sort by score, length, or A-Z</p>
              <p>• Perfect for competitive games</p>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">Ultimate Word Unscrambler Tool</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our advanced word unscrambler is the most powerful tool for solving word puzzles and dominating word games.
            Whether you're playing Scrabble, Words with Friends, solving crossword puzzles, or exploring anagrams, our
            comprehensive dictionary and smart filtering system will help you find every possible word from your letters.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            With advanced features like starts-with, ends-with, and contains filters, you can precisely target the words
            you need. Our Scrabble-based scoring system helps you identify the highest-value words, giving you a
            competitive edge in any word game. The tool supports wildcards for blank tiles and allows you to set custom
            length constraints.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Perfect for word game enthusiasts, puzzle solvers, and anyone looking to expand their vocabulary. Our
            extensive dictionary includes thousands of valid words, regularly updated to ensure accuracy and
            completeness.
          </p>
        </div>
      </div>
    </div>
  )
}
