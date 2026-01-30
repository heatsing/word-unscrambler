import Link from "next/link"
import { Grid3X3 } from "lucide-react"
import { BoggleSolverTool } from "@/components/boggle-solver-tool"

export default function BoggleSolverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-lg mb-4 shadow-lg">
            <Grid3X3 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Boggle Solver
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Boggle With Friends cheat & word finder. Solve 4×4, 5×5, and 6×6 boards in seconds.
          </p>
        </header>

        <BoggleSolverTool />

        <article className="space-y-8 text-muted-foreground max-w-3xl">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How to Use This Boggle Solver</h2>
            <p className="leading-relaxed mb-4">
              Solve any <strong>Boggle</strong> board in seconds. Works with <strong>Boggle With Friends</strong>, Scramble With Friends, classic Boggle, and similar word grid games. Supports 4×4, 5×5, and 6×6 boards.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Solver mode</h3>
            <ul className="list-decimal list-inside space-y-1 mb-4">
              <li>Enter your board letters or click &quot;Roll Dice&quot; for a new grid.</li>
              <li>Choose grid size (4×4, 5×5, or 6×6).</li>
              <li>Click &quot;Solve&quot; to find every possible word.</li>
              <li>Use Advanced Options to set minimum word length or sort order.</li>
            </ul>
            <h3 className="text-lg font-semibold text-foreground mb-2">Supported board sizes</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>4×4 Boggle solver:</strong> Classic 16-letter board used in standard Boggle.</li>
              <li><strong>5×5 Boggle solver:</strong> Big Boggle with 25 letters.</li>
              <li><strong>6×6 Boggle solver:</strong> Super Big Boggle–style 36-letter grid.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How the Boggle Solver Works</h2>
            <p className="leading-relaxed">
              The solver uses a depth-first search to find all valid words. From each cell it explores adjacent cells (horizontal, vertical, and diagonal). Each path is checked against our dictionary; words must be at least 3 letters long, and the same cube cannot be used twice in one word. <strong>Q</strong> is treated as <strong>Qu</strong> to match official Boggle rules. For unscrambling single words try our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link> or <Link href="/anagram-solver" className="text-primary font-medium hover:underline">anagram solver</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Boggle With Friends Solver & Word Finder</h2>
            <p className="leading-relaxed mb-4">
              This <strong>Boggle solver</strong> works with all Boggle-style word grid games, including mobile apps and classic board games. Enter your letters from any game and find every possible word.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Compatible games</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Boggle With Friends:</strong> Zynga&apos;s mobile word game for iOS and Android.</li>
              <li><strong>Scramble With Friends:</strong> Timed rounds on a letter grid.</li>
              <li><strong>Classic Boggle:</strong> 4×4 grid and 3-minute timer.</li>
              <li><strong>Big Boggle:</strong> 5×5 variant for longer words.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What Is Boggle?</h2>
            <p className="leading-relaxed">
              <strong>Boggle</strong> is a word game where you find words in a grid of letters. Words are formed by connecting adjacent letters (horizontally, vertically, or diagonally). Each letter can only be used once per word. Our solver helps you find all possible words in your Boggle grid. For other word tools see our <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble word finder</Link>, <Link href="/words-with-friends" className="text-primary font-medium hover:underline">Words with Friends cheat</Link>, and <Link href="/word-finder" className="text-primary font-medium hover:underline">word finder</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Boggle Rules & Scoring</h2>
            <p className="leading-relaxed mb-4">
              Words must be at least 3 letters; letters must be adjacent (including diagonals); you cannot reuse the same cube in one word. The <strong>Qu</strong> tile counts as one space. Typical scoring: 3–4 letters = 1 pt, 5 letters = 2 pts, 6 = 3 pts, 7 = 5 pts, 8+ = 11 pts. One 8-letter word (11 pts) equals eleven 3-letter words—prioritize longer words.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Tips to win at Boggle</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Look for <strong>prefixes and suffixes</strong> (UN-, RE-, -ING, -TION). Use <Link href="/words-start-with" className="text-primary font-medium hover:underline">words that start with</Link> and <Link href="/words-ending-in" className="text-primary font-medium hover:underline">words ending in</Link> to practice.</li>
              <li>Start from <strong>rare letters</strong> (Q, Z, X, J, K) to narrow options.</li>
              <li>After each game, run your board through the solver to see what you missed.</li>
            </ul>
            <p className="leading-relaxed">
              For more word games try our <Link href="/jumble-solver" className="text-primary font-medium hover:underline">Jumble solver</Link>, <Link href="/text-twist" className="text-primary font-medium hover:underline">Text Twist solver</Link>, and <Link href="/crossword-solver" className="text-primary font-medium hover:underline">crossword solver</Link>. Browse <Link href="/7-letter-words" className="text-primary font-medium hover:underline">7 letter words</Link> and <Link href="/words-by-length" className="text-primary font-medium hover:underline">words by length</Link> to build vocabulary.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
