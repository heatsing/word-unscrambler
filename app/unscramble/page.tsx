import Link from "next/link"
import { Sparkles } from "lucide-react"
import { UnscrambleTool } from "@/components/unscramble-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UnscramblePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Unscramble Words</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Quickly unscramble any combination of letters. Find all valid words for puzzles, games, and learning.
          </p>
        </header>

        <UnscrambleTool />

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Why Unscramble Words?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Unscrambling words is a valuable skill for word game enthusiasts and puzzle solvers. It helps improve
              pattern recognition, vocabulary, and mental flexibility. Whether you&apos;re playing competitively or just for
              fun, being able to quickly identify words from jumbled letters gives you a significant advantage.
            </p>
            <p>
              Our unscramble tool processes your letters instantly, showing you all possible word combinations. This is
              perfect for learning new words, checking if a word exists, or finding the best play in your favorite word
              game. Try our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link> for advanced filters or <Link href="/anagram-solver" className="text-primary font-medium hover:underline">anagram solver</Link> for single-word anagrams.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
