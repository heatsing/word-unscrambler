import Link from "next/link"
import { Target } from "lucide-react"
import { WordleSolverTool } from "@/components/wordle-solver-tool"

export default function WordleSolverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mb-4 shadow-lg">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
            Wordle Solver
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the best words for your Wordle puzzle. Enter known letters and get instant suggestions.
          </p>
        </header>

        <WordleSolverTool />

        <article className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold text-foreground mb-4">Advanced Wordle Solver &amp; Helper</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our <strong>Wordle solver</strong> is the ultimate tool for cracking today&apos;s Wordle puzzle. Using advanced algorithms and a
            comprehensive <strong>5 letter words</strong> database, we help you find the perfect word based on your clues. Whether you&apos;re stuck on
            your last guess or want to improve your Wordle strategy, our solver provides instant, accurate suggestions. Browse our <Link href="/5-letter-words" className="text-primary font-medium hover:underline">5 letter words list</Link> for more options.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The solver supports all Wordle color combinations: green tiles (correct letter, correct position), yellow
            tiles (correct letter, wrong position), and gray tiles (letter not in word). Simply input your clues and
            get a curated list of possible words ranked by likelihood and strategic value. Need to <strong>unscramble letters</strong>? Try our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link> or <Link href="/anagram-solver" className="text-primary font-medium hover:underline">anagram solver</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Perfect for daily Wordle players, word game enthusiasts, and anyone looking to maintain their winning
            streak. Our tool also suggests optimal starter words with excellent letter coverage to maximize your
            chances of solving the puzzle efficiently. For <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link> and <Link href="/words-with-friends" className="text-primary font-medium hover:underline">Words with Friends</Link>, use our <Link href="/word-finder" className="text-primary font-medium hover:underline">word finder</Link>.
          </p>
        </article>
      </div>
    </div>
  )
}
