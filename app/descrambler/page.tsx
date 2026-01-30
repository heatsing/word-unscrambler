import Link from "next/link"
import { Shuffle } from "lucide-react"
import { DescramblerTool } from "@/components/descrambler-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DescramblerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Shuffle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Descrambler</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Descramble letters into words. Perfect for word games, puzzles, and finding valid word combinations.
          </p>
        </header>

        <DescramblerTool />

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>What is Descrambling?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            <p>
              Descrambling is the process of rearranging jumbled letters to form valid words. This skill is essential
              for word games like <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link>, solving newspaper puzzles, and improving your vocabulary. Our descrambler
              tool uses an extensive dictionary to find all possible words from your letters. Try our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link> or <Link href="/anagram-solver" className="text-primary font-medium hover:underline">anagram solver</Link> for more options.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
