import Link from "next/link"
import { Puzzle } from "lucide-react"
import { WordscapesTool } from "@/components/wordscapes-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WordscapesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Puzzle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Wordscapes Cheats &amp; Answers</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Stuck on a Wordscapes level? Enter your letters and find all possible words to complete the puzzle.
          </p>
        </header>

        <WordscapesTool />

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>About Wordscapes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Wordscapes is a popular word puzzle game that combines anagrams with crossword-style puzzles. Each level
              presents you with a set of letters that you must use to fill in the crossword grid. Words can be of
              varying lengths, and you need to find all the words to complete the level.
            </p>
            <p>
              Use this tool when you&apos;re stuck on a level. Simply enter the letters provided in the puzzle, and we&apos;ll
              show you all possible words you can make. Remember, Wordscapes levels often have bonus words that aren&apos;t
              required to complete the puzzle but still earn you coins! Try our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link> or <Link href="/word-cookies" className="text-primary font-medium hover:underline">Word Cookies answers</Link> for similar games.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
