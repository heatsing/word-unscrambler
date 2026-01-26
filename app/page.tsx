import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HeroSearch } from "@/components/hero-search"
import { UseCaseCards } from "@/components/use-case-cards"
import { EducationSection } from "@/components/education-section"
import { Hash } from "lucide-react"

export const metadata = {
  title: "Word Unscrambler & Word Game Solver - Unscramble Words Instantly",
  description:
    "Free word unscrambler tool to solve Wordle, Scrabble, Words with Friends, and more. Unscramble letters instantly and find all possible words from your letters.",
  keywords: "word unscrambler, anagram solver, wordle solver, scrabble word finder, words with friends cheat",
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section with Search */}
      <section className="text-center py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Unscramble Any Word,
              <br />
              Win Every Game
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The most powerful word finder for Wordle, Scrabble, Words with Friends, and all your favorite word games.
              <strong className="text-foreground"> 100% free, instant results.</strong>
            </p>
          </div>

          <HeroSearch />
        </div>
      </section>

      {/* Use Case Cards */}
      <UseCaseCards />

      {/* Word Lists Section - Compact */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
            <Hash className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Browse Words by Length</h2>
          <p className="text-muted-foreground">Explore our complete dictionary</p>
        </div>
        <div className="grid gap-3 grid-cols-3 md:grid-cols-5 lg:grid-cols-9 max-w-5xl mx-auto">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((length) => (
            <Link key={length} href={`/${length}-letter-words`}>
              <Card className="hover:shadow-lg transition-all text-center cursor-pointer hover:scale-105 card-interactive border-2 hover:border-primary/50">
                <CardHeader className="p-4">
                  <CardTitle className="text-3xl font-bold text-primary">{length}</CardTitle>
                  <CardDescription className="text-[10px]">letters</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <EducationSection />

      {/* Final CTA */}
      <section className="py-12 md:py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Winning?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of players who use Word Unscrambler to improve their game and expand their vocabulary.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/word-unscrambler">
              <Button size="lg" className="button-lift text-base px-8 h-14">
                Start Unscrambling Now
              </Button>
            </Link>
            <Link href="/wordle-solver">
              <Button size="lg" variant="outline" className="button-lift text-base px-8 h-14">
                Try Wordle Solver
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

