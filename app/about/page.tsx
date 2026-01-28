import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Word Unscrambler",
  description:
    "Learn about Word Unscrambler and how we help word game enthusiasts solve puzzles and improve their gameplay.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Word Unscrambler</h1>
          <p className="text-lg text-muted-foreground">Your ultimate word game companion</p>
        </div>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
              <p className="leading-relaxed">
                Word Unscrambler is dedicated to helping word game enthusiasts, puzzle solvers, and language learners
                find the perfect words for any situation. Whether you're stuck on a Wordle puzzle, looking for
                high-scoring Scrabble words, or simply want to expand your vocabulary, we're here to help.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">What We Offer</h2>
              <p className="leading-relaxed mb-3">Our comprehensive suite of word tools includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Word Unscrambler - Turn jumbled letters into valid words</li>
                <li>Anagram Solver - Find all anagrams of any word</li>
                <li>Wordle Solver - Get the best word suggestions for Wordle</li>
                <li>Scrabble Word Finder - Discover high-scoring words</li>
                <li>Words by Length - Browse comprehensive word lists</li>
                <li>And many more specialized tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Technology</h2>
              <p className="leading-relaxed">
                We maintain an extensive dictionary database with over 100,000 valid words. Our algorithms quickly
                search through this database to find the best matches for your query, whether you're unscrambling
                letters, finding anagrams, or searching for words by pattern.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Free for Everyone</h2>
              <p className="leading-relaxed">
                Word Unscrambler is completely free to use. We believe that everyone should have access to powerful word
                tools without barriers. Our service is supported by non-intrusive advertising, allowing us to keep the
                tools free for all users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
              <p className="leading-relaxed">
                Have questions, suggestions, or feedback? We'd love to hear from you! Visit our contact page to get in
                touch with our team.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
