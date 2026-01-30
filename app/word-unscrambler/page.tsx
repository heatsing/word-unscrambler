"use client"

import { useState } from "react"
import Link from "next/link"
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

            {/* Advanced Filters - always visible */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </div>
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
                  <Select value={sortBy} onValueChange={(v: "score" | "length" | "alpha") => setSortBy(v)}>
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
                    min={2}
                    max={15}
                    value={minLength}
                    onChange={(e) => setMinLength(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLength">Max Length</Label>
                  <Input
                    id="maxLength"
                    type="number"
                    min={2}
                    max={15}
                    value={maxLength}
                    onChange={(e) => setMaxLength(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

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

        {/* Content section below Reset / tool card */}
        <article className="mt-12 space-y-10 text-muted-foreground max-w-3xl">
          <p className="text-base leading-relaxed">
            Word Unscrambler is a tool specifically created to help you find the highest-scoring words for{" "}
            <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link>,{" "}
            <Link href="/words-with-friends" className="text-primary font-medium hover:underline">Words with Friends</Link>, and other word games. By entering your current letter tiles, Word Unscrambler&apos;s unique search engine will suggest all valid words from the selection given.
          </p>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Word Unscrambler – Definition and Examples</h2>
            <p className="leading-relaxed mb-4">
              Word Unscrambler helps you to find the best cheats and highest scoring words for Scrabble, Words with Friends and many other word games.
            </p>
            <p className="leading-relaxed">
              When playing Words with Friends or Scrabble, you can come across tricky tiles. No matter our skill level, it&apos;s sometimes useful to make use of a tool like <Link href="/unscramble" className="text-primary font-medium hover:underline">unscramble</Link> and get a fresh perspective on all playable words.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What is the Word Unscrambler Tool?</h2>
            <p className="leading-relaxed mb-4">
              In a nutshell, a <strong>word unscrambler</strong> is a tool that you enter all your letters in your hand and it rearranges them to reveal all possible word combinations.
            </p>
            <p className="leading-relaxed">
              Some people may worry that this is a way to cheat. However, if all game participants have an option to use a word unscrambler, then there&apos;s certainly an even playing field. A player may decide not to use the unscrambling tool and come up with words on their own. Having said that, they might want to use it afterwards to test themselves and see the full list of potential words that they could have played.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How to Use Word Unscramblers</h2>
            <p className="leading-relaxed mb-4">
              Simply enter the tiles you are struggling with and we will unscramble the letters into something that not only makes sense but will also reward you with the highest score possible. Think of us as a helping hand that also helps boost your mental dexterity and vocabulary. A bit of jumble solving each day helps you become a top word unscrambler!
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Words by Length</h3>
            <ul className="flex flex-wrap gap-2 list-none p-0">
              <li><Link href="/7-letter-words" className="text-primary font-medium hover:underline">Seven Letter Words</Link></li>
              <li><Link href="/6-letter-words" className="text-primary font-medium hover:underline">Six Letter Words</Link></li>
              <li><Link href="/5-letter-words" className="text-primary font-medium hover:underline">Five Letter Words</Link></li>
              <li><Link href="/4-letter-words" className="text-primary font-medium hover:underline">Four Letter Words</Link></li>
              <li><Link href="/3-letter-words" className="text-primary font-medium hover:underline">Three Letter Words</Link></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Benefits of Using WordTips Word Unscramble</h2>
            <p className="leading-relaxed mb-4">
              As you can see, there are different ways that a word descrambling device can be employed. And, there are no hard and fast rules about when to use one. What&apos;s more, word unscramblers can be useful in board games like Scrabble and Words with Friends as well as crossword puzzles and games like <Link href="/hangman-solver" className="text-primary font-medium hover:underline">hangman</Link>, also Word A Round or any other word game in any language like a wordle español. Virtually any word game that you can think of. You can even enjoy using it while playing along at home with a word-based TV game show!
            </p>
            <p className="leading-relaxed mb-4">
              Now that you know a little bit about it, are you interested in some examples of how to use the tool and the benefits it gets you? Here&apos;s what we have for you:
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">A. Win Word Games</h3>
            <p className="leading-relaxed mb-4">
              Player A is a Scrabble participant who is baffled by how to get the highest score from the following scrambled letters on their rack – ERIKNRG.
            </p>
            <p className="leading-relaxed mb-4">
              When they enter the letters into the <Link href="/descrambler" className="text-primary font-medium hover:underline">word descrambler</Link>, it shows a number of words using two or more of the letters. The highest points – 15 – are for the word <strong>GHERKIN</strong> that uses all seven letters, not a word that may ordinarily come to mind quickly!
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">B. Boost Your Vocabulary</h3>
            <p className="leading-relaxed mb-4">
              Player B is a young person playing Word A Round (a game for ages 10 and up) and they&apos;re trying to be the first to unravel the following scrambled letters around the game card – LANIMA (6-letter word), ULHELPF (7-letter word) and RELSQUIR (8-letter word).
            </p>
            <p className="leading-relaxed">
              By using a word unscrambler, they&apos;ll find these words – <strong>ANIMAL</strong>, <strong>HELPFUL</strong> and <strong>SQUIRREL</strong>. Any boost that you can give a child while they&apos;re learning how to play will encourage a love of the game. In turn, they will be excited to try to win and want to play more. This will really enlarge their vocabulary!
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Word Finders</h2>
            <ul className="space-y-1 mb-4">
              <li><Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble Word Finder</Link></li>
              <li><Link href="/word-finder" className="text-primary font-medium hover:underline">Word Finder</Link></li>
              <li><Link href="/descrambler" className="text-primary font-medium hover:underline">Word Descrambler</Link></li>
            </ul>
            <h3 className="text-lg font-semibold text-foreground mb-2">Letters vs. Words</h3>
            <p className="leading-relaxed mb-4">
              <Link href="/unscramble" className="text-primary font-medium hover:underline">Unscramble Letters</Link> – Working with such a device can definitely be of benefit when attempting to unscramble letters to make words. Furthermore, our Word Unscrambler is a great <Link href="/word-solver" className="text-primary font-medium hover:underline">word solver</Link>. It will accommodate up to 15 letters and locate a truly amazing array of words using all manner of combinations of vowels and constants. You can also use the advanced search to find words that begin or end with specific letters. And, that&apos;s not all! The Word Unscrambler can be of service when you want to check out words that contain certain letters or see words with letters in a particular position. If you need to select words using a distinct dictionary, we&apos;ve got that covered too by including all references that you may need.
            </p>
            <p className="leading-relaxed">
              <strong>Unscramble Words</strong> – A word unscrambling tool can, of course, be a support to unscramble jumbled words. The English language is fascinating in its variety. Spellings are not always very intuitive. Silent letters appear and pronunciation emphasis on different syllables can be confusing. It&apos;s said to be one of the most difficult languages in the world to learn! Also, there are words that sound the same but are spelled using different letters and have totally unrelated definitions. Therefore, having our Word Unscrambler at your fingertips can be a real plus when you&apos;re attempting to sort out what words the mixed-up letters reveal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6 Tips and Tricks to Unscramble Words</h2>
            <p className="leading-relaxed mb-4">
              There are a number of tips and tricks that can be beneficial to unscramble words from jumbled letters. Everyone has their favorites – maybe tried and true ones that have worked for them in the past to make words or some that they find quick and easy to use. Following are some tips and tricks that we suggest to help you find the answers to the puzzle of letters you have before you.
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>Separate the consonants from the vowels.</li>
              <li>Try to match various consonants with vowels to see what you come up with. All words need to have vowels. Also, while you can have a word with just one vowel, such as &quot;A&quot; or &quot;I&quot;, consonants cannot stand on their own.</li>
              <li>Look for short words to start with such as those with 2 or 3 letters. Then, find out if you can lengthen these by pluralizing them or adding any letters you have that can change the tense.</li>
              <li>Pick our any prefixes or suffixes that can extend the length of the words you come up with.</li>
              <li>Play with a pencil and paper to create a list of possible words. Make sure to check the spelling to ensure that you haven&apos;t just made up a non-existent word!</li>
              <li>If you&apos;re playing a word game with tiles, move them around to see if a word materializes when you look at different letter combinations.</li>
            </ol>
            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Lists of Words</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 list-disc list-inside">
              <li><Link href="/words-with-letters" className="text-primary font-medium hover:underline">Words With Letters</Link></li>
              <li><Link href="/words-by-length" className="text-primary font-medium hover:underline">Vowel Words</Link></li>
              <li><Link href="/words-start-with" className="text-primary font-medium hover:underline">Words Start With</Link></li>
              <li><Link href="/words-ending-in" className="text-primary font-medium hover:underline">Words End In</Link></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Top 10 Most Popular Unscrambling Examples</h2>
            <p className="leading-relaxed mb-4">
              Now that you&apos;re well on your way to understanding what you need to know about word unscrambler tools, you&apos;re probably itching to try out our Word Unscrambler! Before you get going, let us show you some of the most popular unscrambling examples. We&apos;ve focused on 7-letter words here since that&apos;s the number of tiles you have in two of the most well-known word games – Scrabble and Words with Friends.
            </p>
            <ul className="space-y-1 font-medium text-foreground">
              <li>EE CFRPT → PERFECT</li>
              <li>AU BDHNS → HUSBAND</li>
              <li>AEE CHTR → TEACHER</li>
              <li>EEI CCNS → SCIENCE</li>
              <li>AEI CCLPS → SPECIAL</li>
              <li>AOU LPPR → POPULAR</li>
              <li>AE PRE MD → PREMADE</li>
              <li>ING O NSW → SNOWING</li>
              <li>RE EO DNZ → REZONED</li>
              <li>AOE SMEW → AWESOME</li>
            </ul>
          </section>

          <section className="bg-muted/40 rounded-lg p-6 border">
            <h2 className="text-xl font-bold text-foreground mb-3">Word Unscrambler &amp; Anagram Solver</h2>
            <p className="leading-relaxed mb-4">
              Our free <strong>Word Unscrambler</strong> tool is the fastest way to unscramble letters, crack tough anagram puzzles, and dominate Scrabble® or Words With Friends®. Just paste your tiles and hit search: the solver lists every playable word (longest first) and lets you refine results with powerful filters:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Starts With / Ends With / Contains</strong> – work around existing board letters, even with up to three blank tiles.</li>
              <li><strong>Length</strong> – target short fillers or high-value long plays.</li>
              <li><strong>Dictionary switch</strong> – validate words in WWF® or official Scrabble® word lists.</li>
            </ul>
            <h3 className="text-lg font-semibold text-foreground mb-2">Why use the Unscrambler?</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Check playable words instantly and guarantee legality.</li>
              <li>Win more games by focusing on placement strategy while the tool handles vocabulary.</li>
              <li>Advance in mobile puzzles like <Link href="/wordscapes" className="text-primary font-medium hover:underline">Wordscapes</Link>, <Link href="/word-cookies" className="text-primary font-medium hover:underline">Word Cookies</Link>, and other word-search challenges.</li>
              <li>Expand your vocabulary – click any result for a quick definition.</li>
              <li>Decode secret messages or classroom ciphers in seconds.</li>
            </ul>
            <h3 className="text-lg font-semibold text-foreground mb-2">Pro tips for higher scores</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Spot common patterns, prefixes, and suffixes (e.g., dis-, -est) to extend words.</li>
              <li>Leverage tricky letter combinations (str, ph, chr) for creative plays.</li>
              <li>Memorize key word lists: two-letter savers, Q-without-U words, X-words.</li>
              <li>Balance word length and letter value: a short play on a triple-letter Q often beats a longer, low-value move.</li>
              <li>Exploit bonus spaces; smart placement can outscore bigger words.</li>
            </ul>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quick unscramble examples</h3>
            <ul className="space-y-1 font-medium text-foreground mb-4">
              <li>ROUJNASTIL → journalist, insulator</li>
              <li>BEYOUTU → buyout (13 pts)</li>
              <li>AGNTE → agent, gnat</li>
              <li>LUOCD → cloud, clod</li>
              <li>EYLLJSHIF → jellyfish (27 pts), elfishly</li>
            </ul>
            <p className="leading-relaxed">
              Unlock higher scores, richer vocabulary, and faster puzzle-solving today – try our online <strong>word unscrambler</strong> and watch those jumbled letters fall into place!
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
