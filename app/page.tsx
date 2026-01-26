import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Search, Type, Target, Grid3x3, BookOpen } from "lucide-react"
import { WordSearch } from "@/components/word-search"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata = {
  title: "Word Unscrambler & Word Game Solver - Unscramble Words Instantly",
  description:
    "Free word unscrambler tool to solve Wordle, Scrabble, Words with Friends, and more. Unscramble letters instantly and find all possible words from your letters.",
  keywords: "word unscrambler, anagram solver, wordle solver, scrabble word finder, words with friends cheat",
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="max-w-4xl mx-auto px-2">
          <h1 className="text-fluid-3xl md:text-6xl font-bold mb-4 md:mb-6 text-balance bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Word Unscrambler & Word Game Solver
          </h1>
          <p className="text-fluid-base md:text-xl text-muted-foreground mb-8 md:mb-12 text-pretty leading-relaxed-mobile">
            Unscramble letters, solve word puzzles, and dominate your favorite word games. Get instant solutions for
            Wordle, Scrabble, Words with Friends, and more.
          </p>

          {/* Interactive Search Component */}
          <ErrorBoundary>
            <WordSearch />
          </ErrorBoundary>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-12 md:mb-16 px-2">
        <h2 className="text-fluid-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Popular Word Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Type className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Word Unscrambler</CardTitle>
              <CardDescription>Turn jumbled letters into valid words instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/word-unscrambler">
                <Button variant="outline" className="w-full bg-transparent">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Wordle Solver</CardTitle>
              <CardDescription>Get the best word suggestions for Wordle puzzles</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/wordle-solver">
                <Button variant="outline" className="w-full bg-transparent">
                  Solve Wordle <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Anagram Solver</CardTitle>
              <CardDescription>Find all possible anagrams from your letters</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/anagram-solver">
                <Button variant="outline" className="w-full bg-transparent">
                  Find Anagrams <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Grid3x3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Scrabble Word Finder</CardTitle>
              <CardDescription>Find high-scoring Scrabble words from your tiles</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/scrabble">
                <Button variant="outline" className="w-full bg-transparent">
                  Find Words <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Words with Friends Help</CardTitle>
              <CardDescription>Get word suggestions for Words with Friends</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/words-with-friends">
                <Button variant="outline" className="w-full bg-transparent">
                  Get Help <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Word Generator</CardTitle>
              <CardDescription>Generate random words for games and creativity</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/word-generator">
                <Button variant="outline" className="w-full bg-transparent">
                  Generate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Word Lists Section */}
      <section className="mb-12 md:mb-16 px-2">
        <h2 className="text-fluid-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Browse Words by Length</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-4xl mx-auto">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((length) => (
            <Link key={length} href={`/${length}-letter-words`}>
              <Card className="hover:shadow-lg transition-shadow text-center cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-primary">{length}</CardTitle>
                  <CardDescription className="text-xs">Letter Words</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-muted/30 rounded-lg p-6 md:p-8 lg:p-12 mx-2">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-fluid-2xl md:text-3xl font-bold mb-4 md:mb-6">How to Use Word Unscrambler</h2>
          <div className="space-y-4 text-muted-foreground text-fluid-sm md:text-base">
            <p className="leading-relaxed-mobile">
              Our word unscrambler is the perfect tool for solving word puzzles and games. Simply enter your letters,
              and we'll instantly find all valid words you can make. Whether you're stuck on a Wordle puzzle, looking
              for high-scoring Scrabble words, or need help with Words with Friends, we've got you covered.
            </p>
            <p className="leading-relaxed-mobile">
              The tool supports advanced filters like word length, starting letters, and patterns. Our comprehensive
              dictionary includes over 100,000 words, ensuring you'll find the perfect solution every time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
