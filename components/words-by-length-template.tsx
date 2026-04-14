"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Search, RefreshCw, Plus } from "lucide-react"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"

interface WordsByLengthTemplateProps {
  length: number
  words: string[]
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

export function WordsByLengthTemplate({ length, words }: WordsByLengthTemplateProps) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [displayCount, setDisplayCount] = useState(100)
  const [startsWith, setStartsWith] = useState("")
  const [endsWith, setEndsWith] = useState("")
  const [contains, setContains] = useState("")
  const [excludes, setExcludes] = useState("")
  const [selectedWord, setSelectedWord] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  // Get random words based on display count
  // Optimize: Only shuffle first 500 words instead of entire array for performance
  const displayWords = useMemo(() => {
    const subset = words.slice(0, Math.min(500, words.length))
    const shuffled = shuffleArray(subset)
    return shuffled.slice(0, Math.min(displayCount, shuffled.length))
  }, [words, refreshKey, displayCount])

  // Filter words based on advanced search options
  const filteredWords = useMemo(() => {
    let filtered = displayWords

    // Simple search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((word) => word.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Starts with
    if (startsWith.trim()) {
      filtered = filtered.filter((word) => word.toLowerCase().startsWith(startsWith.toLowerCase().trim()))
    }

    // Ends with
    if (endsWith.trim()) {
      filtered = filtered.filter((word) => word.toLowerCase().endsWith(endsWith.toLowerCase().trim()))
    }

    // Contains
    if (contains.trim()) {
      filtered = filtered.filter((word) => word.toLowerCase().includes(contains.toLowerCase().trim()))
    }

    // Excludes
    if (excludes.trim()) {
      const excludeLetters = excludes.toLowerCase().trim().split("")
      filtered = filtered.filter((word) => {
        return !excludeLetters.some((letter) => word.toLowerCase().includes(letter))
      })
    }

    return filtered
  }, [displayWords, searchQuery, startsWith, endsWith, contains, excludes])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
    setSearchQuery("")
    setStartsWith("")
    setEndsWith("")
    setContains("")
    setExcludes("")
    setDisplayCount(100)
  }

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 100, words.length))
  }

  const otherLengths = [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((l) => l !== length)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {length} Letter Words
          </h1>
        </div>

        {/* Left-Right Layout: Search on Left, Words on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Side: Advanced Search */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle>Advanced Search</CardTitle>
                <CardDescription>Use filters to find specific {length}-letter words</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${length}-letter words...`}
                    className="pl-10 h-12"
                  />
                </div>

                {/* Filter Grid */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Starts With</label>
                    <Input
                      type="text"
                      value={startsWith}
                      onChange={(e) => setStartsWith(e.target.value)}
                      placeholder="e.g., ab"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ends With</label>
                    <Input
                      type="text"
                      value={endsWith}
                      onChange={(e) => setEndsWith(e.target.value)}
                      placeholder="e.g., ed"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contains</label>
                    <Input
                      type="text"
                      value={contains}
                      onChange={(e) => setContains(e.target.value)}
                      placeholder="e.g., ing"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Exclude Letters</label>
                    <Input
                      type="text"
                      value={excludes}
                      onChange={(e) => setExcludes(e.target.value)}
                      placeholder="e.g., xyz"
                      className="h-10"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <div className="text-sm text-muted-foreground">
                    Found {filteredWords.length} word{filteredWords.length !== 1 ? "s" : ""}
                  </div>
                  <Button onClick={handleRefresh} variant="outline" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset & Refresh
                  </Button>
                </div>

                {/* Keyword Navigation / Guidance */}
                <div className="mt-6 border-t pt-4 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Quick navigation
                  </p>
                  <div className="flex flex-col gap-1 text-sm">
                    <Link
                      href={`/words-start-with?length=${length}`}
                      className="text-primary hover:underline"
                    >
                      {length}-letter words starting with...
                    </Link>
                    <Link
                      href={`/words-ending-in?length=${length}`}
                      className="text-primary hover:underline"
                    >
                      {length}-letter words ending in...
                    </Link>
                    <Link
                      href={`/words-with-letters?length=${length}`}
                      className="text-primary hover:underline"
                    >
                      {length}-letter words with letter...
                    </Link>
                    <Link
                      href="/words-by-length"
                      className="text-primary hover:underline"
                    >
                      Browse all word lengths
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Word Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {(searchQuery || startsWith || endsWith || contains || excludes) ? "Search Results" : `${length}-Letter Words`}
              </h2>
              {!(searchQuery || startsWith || endsWith || contains || excludes) && words.length > 100 && (
                <p className="text-sm text-muted-foreground">Click refresh to see different words</p>
              )}
            </div>
            {filteredWords.length > 0 ? (
              <>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-fade-in">
                  {filteredWords.map((word, index) => (
                    <Card
                      key={`${word}-${index}`}
                      className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer hover-lift group"
                      onClick={() => {
                        setSelectedWord(word)
                        setDialogOpen(true)
                      }}
                    >
                      <span className="font-semibold text-sm md:text-base lowercase group-hover:text-primary transition-colors">
                        {word.toLowerCase()}
                      </span>
                    </Card>
                  ))}
                </div>
                {!(searchQuery || startsWith || endsWith || contains || excludes) && displayCount < words.length && (
                  <div className="text-center mt-8">
                    <Button onClick={handleLoadMore} size="lg" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Load More Words
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <Card className="p-12 text-center border-dashed">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">No words found</p>
                <p className="text-sm text-muted-foreground">Try a different search term</p>
              </Card>
            )}
          </div>
        </div>

        {/* SEO & FAQ section */}
        <section className="mb-12 space-y-8">
          {length === 5 ? (
            <>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>About 5-Letter Words in Word Games</CardTitle>
                  <CardDescription>
                    Why five-letter words matter so much in Wordle, Scrabble, and other puzzles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Other than bingos, <strong>five letter words</strong> are some of the rarest plays in word games like <Link href="/words-with-friends" className="text-primary hover:underline">Words With Friends</Link> and <Link href="/scrabble" className="text-primary hover:underline">Scrabble</Link>. Most of the time, they have a less-than-average scoring ratio, but players
                    use them to clear their rack of troublesome letters so that they can make easier bingos in later
                    turns.
                  </p>
                  <h3 className="text-base font-semibold">Which are the most popular five-letter words?</h3>
                  <p>
                    OTHER, WHICH and THERE are among the most common five-letter words. The word WHICH, in particular,
                    is a fine play to ditch both Hs, a W, and a C for decent points and to get more bingo-friendly
                    letters in your rack. OTHER and THERE, however, use up strong bingo letters for relatively few
                    points and are often better avoided.
                  </p>
                  <h3 className="text-base font-semibold">Strategy for 5-letter words</h3>
                  <p>
                    One of the chief strategies for 5-letter words is using the S tile to create two words at once by
                    placing the S on a double or triple letter/word square. Remember that keeping two great letters in
                    your rack after playing a five-letter word is often more important than squeezing out a couple of
                    extra points while leaving yourself with awkward tiles.
                  </p>
                  <p>
                    For example, if your rack is S, C, O, W, S, A, and T, you could hook{' '}
                    <span className="font-semibold">scow</span> onto an existing word and keep S, A, and T in your rack.
                    Even if you can score a few more points by playing the second S, it is usually not worth it because
                    you would be giving up a great bingo setup. Other strong five-letter hooks starting with S include
                    SLOJD, STOOK, and SIZAR.
                  </p>
                  <p>
                    Another important group is five-letter words starting with C. There are only three Cs in the bag,
                    but they&apos;re valuable in five-letter plays because C is a three-point tile that doesn&apos;t
                    appear in any two-letter words. CHYME, CLOZE, and CIVVY are excellent ways to clear difficult
                    consonants. CLOZE is especially strong because you can hook the Z to an A to make ZA and score at
                    least 27 points even without a premium square.
                  </p>
                  <p>
                    Five-letter words starting with E shine in the endgame because E is one of the best hooking
                    letters, with EX, EL, EH, EN, ER, ES, ET, and EF all available. EERIE, EAGLE, and ETHER are all good
                    examples of flexible, useful plays.
                  </p>
                  <h3 className="text-base font-semibold">Five-letter words and Wordle</h3>
                  <p>
                    Mastering <strong>five-letter words</strong> is crucial for solving the daily Wordle puzzle. You need to know how to
                    spell a wide range of <strong>5 letter words</strong>, think about how letters combine, and quickly recall strong
                    candidates as the feedback narrows your options. That&apos;s exactly why our <Link href="/wordle-solver" className="text-primary hover:underline">Wordle solver</Link>
                    and <Link href="/5-letter-words" className="text-primary hover:underline">five-letter word list</Link> are so powerful for practice.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>5-Letter Words FAQ</CardTitle>
                  <CardDescription>Common questions about five-letter words in word games.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="font-semibold">How many five-letter words are there?</h3>
                    <p>
                      There are 8,996 five-letter words in the Official Scrabble Players Dictionary, Volume 6. Your
                      exact playable list may vary slightly depending on the word list used by your game or app.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">What are some five-letter words that start with E?</h3>
                    <p>
                      Popular examples include EAGLE, EVENS, EXTRA, ENURE, and ENEMY. These words are especially useful
                      in both mid-game and endgame scenarios thanks to the flexible letter E.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">What are strong five-letter words that start with S?</h3>
                    <p>
                      Words like SHADY, SEXTS, SEVEN, SHEER, and SIZES can be excellent plays. Many S-starting words
                      create hooks on existing words, helping you score well while opening new lanes on the board.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      How do five-letter words help me set up bingos in Scrabble and similar games?
                    </h3>
                    <p>
                      A strong <Link href="/scrabble" className="text-primary hover:underline">Scrabble</Link> vocabulary focuses on bingos, but managing <strong>five-letter words</strong> starting with key
                      letters like C, S, or E helps you keep a balanced rack. Well-chosen five-letter plays clear
                      awkward tiles while leaving you with premium consonants and vowels for high-scoring <Link href="/7-letter-words" className="text-primary hover:underline">seven-letter words</Link>
                      bingos on future turns.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>About {length}-Letter Words</CardTitle>
                  <CardDescription>
                    Learn how {length}-letter words fit into your word game strategy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong>{length}-letter words</strong> are an essential part of every strong word-game vocabulary. They bridge the
                    gap between short utility words and full-length bingos, helping you score well while keeping a
                    balanced rack for future plays.
                  </p>
                  <p>
                    Use this list to explore new words, spot patterns, and discover fresh options when you&apos;re
                    stuck. Filter by <Link href={`/words-start-with?length=${length}`} className="text-primary hover:underline">words starting with</Link>, <Link href={`/words-ending-in?length=${length}`} className="text-primary hover:underline">words ending in</Link>, or <Link href={`/words-with-letters?length=${length}`} className="text-primary hover:underline">words with letters</Link> to find
                    playable {length}-letter words that fit your current board.
                  </p>
                  <p>
                    Whether you&apos;re preparing for <Link href="/scrabble" className="text-primary hover:underline">Scrabble</Link>, <Link href="/words-with-friends" className="text-primary hover:underline">Words With Friends</Link>, crosswords, or other puzzles,
                    try our <Link href="/word-unscrambler" className="text-primary hover:underline">word unscrambler</Link> or <Link href="/anagram-solver" className="text-primary hover:underline">anagram solver</Link> for more help.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>{length}-Letter Words FAQ</CardTitle>
                  <CardDescription>Helpful tips for using {length}-letter words effectively.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="font-semibold">How many {length}-letter words are there?</h3>
                    <p>
                      There are thousands of {length}-letter words in common English word lists. The exact number
                      depends on which dictionary your game uses, but this page gives you a practical, game-ready
                      sample to study and play with.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">When should I play a {length}-letter word?</h3>
                    <p>
                      {length}-letter words are ideal when you want solid points without burning all of your premium
                      tiles. They often hit double or triple word scores while leaving you with enough strong letters to
                      threaten a bingo on the next turn.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      How can I practice and memorize more {length}-letter words?
                    </h3>
                    <p>
                      Use the filters on this page to focus on specific patterns, like words starting with certain
                      letters or containing key letter combinations. Regularly scanning and replaying these lists will
                      quickly grow your {length}-letter word bank.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </section>

        {/* Letter Navigation Sections */}
        <div className="space-y-8 mb-12">
          {/* Starting with */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{length} Letter Words Starting With</CardTitle>
              <CardDescription>Find {length}-letter words that start with a specific letter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alphabet.map((letter) => (
                  <Link
                    key={`start-${letter}`}
                    href={`/words-start-with?letters=${letter}&length=${length}`}
                  >
                    <Button variant="outline" className="w-12 h-12 font-bold uppercase hover:bg-primary hover:text-primary-foreground">
                      {letter}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ending in */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{length} Letter Words Ending In</CardTitle>
              <CardDescription>Find {length}-letter words that end with a specific letter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alphabet.map((letter) => (
                  <Link
                    key={`end-${letter}`}
                    href={`/words-ending-in?letters=${letter}&length=${length}`}
                  >
                    <Button variant="outline" className="w-12 h-12 font-bold uppercase hover:bg-primary hover:text-primary-foreground">
                      {letter}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* With */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{length} Letter Words With</CardTitle>
              <CardDescription>Find {length}-letter words that contain a specific letter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alphabet.map((letter) => (
                  <Link
                    key={`with-${letter}`}
                    href={`/words-with-letters?letters=${letter}&length=${length}`}
                  >
                    <Button variant="outline" className="w-12 h-12 font-bold uppercase hover:bg-primary hover:text-primary-foreground">
                      {letter}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation to Other Lengths */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse Other Word Lengths</h2>
          <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {otherLengths.map((len) => (
              <Link key={len} href={`/${len}-letter-words`}>
                <Card className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
                  <div className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                    {len} letter words
                  </div>
                </Card>
              </Link>
            ))}
          </div>
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
