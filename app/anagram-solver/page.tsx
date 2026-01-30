import Link from "next/link"
import { Shuffle } from "lucide-react"
import { AnagramSolverTool } from "@/components/anagram-solver-tool"

export default function AnagramSolverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 shadow-lg">
            <Shuffle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Anagram Solver
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find all anagrams of any word. Rearrange letters to discover new words with the same letters.
          </p>
        </header>

        <AnagramSolverTool />

        <article className="mt-12 space-y-6 text-muted-foreground max-w-3xl prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold text-foreground mb-4">Complete Anagram Solver &amp; Generator</h2>
          <p className="leading-relaxed mb-4">
            Our <strong>anagram solver</strong> is the most comprehensive tool for finding anagrams of any word. Using an extensive
            dictionary database, we can quickly identify all valid anagrams by rearranging the letters of your input
            word. Whether you&apos;re solving word puzzles with our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link>, playing <Link href="/wordle-solver" className="text-primary font-medium hover:underline">Wordle</Link> or <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link>, or just exploring the fascinating world of
            anagrams, our tool provides instant, accurate results.
          </p>
          <p className="leading-relaxed mb-4">
            Anagrams have been used throughout history in literature, wordplay, and cryptography. They appear in word
            games like <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link> and crossword puzzles, making this tool invaluable for word game enthusiasts. Our
            solver not only finds anagrams but also organizes them by length and frequency for easy browsing. Need <strong>5 letter words</strong>? See our <Link href="/5-letter-words" className="text-primary font-medium hover:underline">5 letter words list</Link>.
          </p>
          <p className="leading-relaxed">
            Perfect for students, writers, puzzle enthusiasts, and anyone who loves playing with words. Discover hidden
            meanings, create clever wordplay, or simply <strong>unscramble letters</strong> to form new
            words. Try our <Link href="/descrambler" className="text-primary font-medium hover:underline">word descrambler</Link> or <Link href="/word-finder" className="text-primary font-medium hover:underline">word finder</Link> for more options.
          </p>
        </article>
      </div>
    </div>
  )
}
