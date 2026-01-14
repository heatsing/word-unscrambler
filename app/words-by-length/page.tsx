"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DICTIONARY } from "@/lib/dictionary"
import { BookOpen, ArrowRight } from "lucide-react"

const lengthsData = [
  { length: 2, title: "2 Letter Word Finder" },
  { length: 3, title: "3 Letter Word Finder" },
  { length: 4, title: "4 Letter Word Finder" },
  { length: 5, title: "5 Letter Word Finder" },
  { length: 6, title: "6 Letter Word Finder" },
  { length: 7, title: "7 Letter Word Finder" },
  { length: 8, title: "8 Letter Word Finder" },
  { length: 9, title: "9 Letter Word Finder" },
  { length: 10, title: "10 Letter Word Finder" },
]

export default function WordsByLengthPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Words By Length
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Browse our complete dictionary organized by word length. Find all 2-letter through 10-letter words for
            word games, puzzles, and vocabulary building.
          </p>
        </div>

        {/* Length Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {lengthsData.map((item) => (
            <Link key={item.length} href={`/${item.length}-letter-words`}>
              <Card className="h-full hover:shadow-xl hover:scale-105 transition-all cursor-pointer group animate-scale-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                      {item.title}
                    </CardTitle>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Click on any word length card above</p>
              <p>2. Browse through 100 random words from that category</p>
              <p>3. Use the refresh button to see different words</p>
              <p>4. Search within the displayed words</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Word Length Guide</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• 2-4 letters: Short, common words</p>
              <p>• 5 letters: Perfect for Wordle</p>
              <p>• 6-7 letters: Versatile game words</p>
              <p>• 8-10 letters: High-scoring words</p>
            </CardContent>
          </Card>
        </div>

        {/* Popular Categories */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Popular Word Length Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Best for Wordle</h3>
                <Link
                  href="/5-letter-words"
                  className="text-primary hover:underline"
                >
                  5-Letter Words
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  Complete list of all valid Wordle words
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Best for Scrabble</h3>
                <div className="space-y-1">
                  <Link
                    href="/7-letter-words"
                    className="text-primary hover:underline"
                  >
                    7-Letter Words
                  </Link>
                  <p className="text-xs text-muted-foreground">7-letter bingo words for bonus points</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Short Words</h3>
                <div className="flex gap-4">
                  <Link href="/2-letter-words" className="text-primary hover:underline">
                    2-Letter
                  </Link>
                  <Link href="/3-letter-words" className="text-primary hover:underline">
                    3-Letter
                  </Link>
                  <Link href="/4-letter-words" className="text-primary hover:underline">
                    4-Letter
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Quick plays and common words</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Long Words</h3>
                <div className="flex gap-4">
                  <Link href="/8-letter-words" className="text-primary hover:underline">
                    8-Letter
                  </Link>
                  <Link href="/9-letter-words" className="text-primary hover:underline">
                    9-Letter
                  </Link>
                  <Link href="/10-letter-words" className="text-primary hover:underline">
                    10-Letter
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground mt-1">High-scoring game winners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content */}
        <div className="mt-12 prose prose-sm max-w-none">
          <Card className="p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Complete Word Length Dictionary</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our comprehensive Words By Length dictionary organizes thousands of English words by their letter count.
                Whether you're playing Wordle, Scrabble, Words with Friends, or solving crossword puzzles, finding
                words of a specific length has never been easier.
              </p>
              <p>
                Each word length category contains a curated list of valid English words. We display 100 random words at
                a time with a refresh option to explore more. This makes it perfect for vocabulary building, game
                strategy, and discovering new words.
              </p>
              <p>
                From short 2-letter words perfect for tight board positions to impressive 10-letter words that maximize
                your score, our database covers all the word lengths you need. Click any category above to start
                exploring!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
