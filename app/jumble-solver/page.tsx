import Link from "next/link"
import { Shuffle } from "lucide-react"
import { JumbleSolverTool } from "@/components/jumble-solver-tool"
import { Card, CardContent } from "@/components/ui/card"

export default function JumbleSolverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Shuffle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Jumble Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Solve Daily Jumble puzzles instantly. Unscramble the jumbled words and find the answer to today&apos;s cartoon.
          </p>
        </header>

        <JumbleSolverTool />

        <article className="mt-12 space-y-8 text-muted-foreground max-w-3xl">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What is Jumble?</h2>
            <p className="leading-relaxed mb-4">
              A <strong>Jumble</strong> or <strong>scramble word game</strong> is a game where a mixed-up set of letters are provided and you have to unscramble the letters to find the word. Sometimes clues are provided to help you figure out the puzzle; other times, all you have are the jumbled letters.
            </p>
            <p className="leading-relaxed mb-4">
              Jumble games involve the skill of solving <strong>anagrams</strong>. Anagrams are all the words that can be created with the letters of one word or phrase. The difference: with an <Link href="/anagram-solver" className="text-primary font-medium hover:underline">anagram</Link> you start with an existing word and jumble the letters to create new ones; with a <strong>word jumble puzzle</strong>, you start with a random scramble of letters and you have to find the word within the jumble.
            </p>
            <p className="leading-relaxed">
              These types of puzzles help you develop skills and get better at games like <Link href="/words-with-friends" className="text-primary font-medium hover:underline">Words with Friends</Link> and <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link>. In those games you&apos;re theoretically always solving a word jumble: you get a rack of 7 random letters and have to unscramble them to find the best word for your turn. Solving <strong>word jumble games</strong> sharpens your ability to unscramble words quickly.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How Does the Jumble Solver Work?</h2>
            <p className="leading-relaxed">
              You enter the jumbled or scrambled words and our <strong>Jumble solver</strong> tells you the possible words or answers that can be made from those letters (think of it like a single-word anagram). If you frequently play <strong>daily Jumble</strong> or similar word puzzles, this tool can help when you&apos;re stuck, use it as a learning aid, or to settle disputes with friends. Try our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link> for more letters, or <Link href="/text-twist" className="text-primary font-medium hover:underline">Text Twist solver</Link> for twist-style games.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Tips to Excel at Jumble Word Games</h2>
            <p className="leading-relaxed mb-4">
              Whether or not the jumble word game you&apos;re playing provides images or clues, these tips can help you become a better puzzle solver.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Get to Know Prefixes and Suffixes</h3>
            <p className="leading-relaxed mb-4">
              It&apos;s incredibly helpful when solving a word jumble to first identify all prefixes and suffixes. Common prefixes include ANTI-, INTER-, DIS-, DE-, NON-, SEMI-, PRE-. Common suffixes include -ES, -ED, -LY, -ING, -TION. Once you spot them in your jumble, the rest of the word is easier to find. Use our <Link href="/words-start-with" className="text-primary font-medium hover:underline">words that start with</Link> and <Link href="/words-ending-in" className="text-primary font-medium hover:underline">words ending in</Link> tools to explore patterns.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Understand Common Letter Combinations</h3>
            <p className="leading-relaxed mb-4">
              Noticing letter patterns helps you solve jumble word puzzles quickly. Look for double consonants like LL or SS; if there&apos;s a Q, there&apos;s usually a U. Other common patterns are ST, PH, and CK. This skill also helps in <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link> and <Link href="/words-with-friends" className="text-primary font-medium hover:underline">Words with Friends</Link>.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Use a Sheet of Paper</h3>
            <p className="leading-relaxed">
              When solving word scramble puzzles, writing out the letters on scrap paper helps your brain try possible letter combinations. Writing also cements patterns in memory, so you get better at <Link href="/boggle-solver" className="text-primary font-medium hover:underline">Boggle</Link>, <Link href="/crossword-solver" className="text-primary font-medium hover:underline">crossword</Link> clues, and board word games over time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Why It&apos;s Great to Play Word Jumble Games</h2>
            <p className="leading-relaxed">
              Aside from being fun and mentally stimulating, solving word jumbles has real benefits. Consistent practice with letter and word patterns makes you a stronger player in <strong>Scrabble</strong>, <strong>Boggle</strong>, <strong>Words With Friends</strong>, and more. Keep solving jumble word games—it&apos;s a fun and beneficial way to spend your time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Jumble Solver Example</h2>
            <p className="leading-relaxed mb-4">
              Here&apos;s a simple example. You enter <strong>elvi</strong> and hit Solve. The <strong>Jumble solver</strong> displays words that use all the input letters:
            </p>
            <Card className="bg-muted/40 border-muted p-4">
              <p className="font-mono text-sm text-foreground mb-2">Input: elvi</p>
              <p className="text-sm text-muted-foreground">Possible words: evil, live, veil, vile, vlei</p>
            </Card>
            <p className="leading-relaxed mt-4 text-sm">
              The solver shows words that match your letters exactly. Use advanced options or blank tiles (?) for more flexibility. For shorter combinations try our <Link href="/word-finder" className="text-primary font-medium hover:underline">word finder</Link> or <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link>; for crosswords see our <Link href="/crossword-solver" className="text-primary font-medium hover:underline">crossword solver</Link>. If results seem fewer than expected, check that advanced filters aren&apos;t too strict.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
