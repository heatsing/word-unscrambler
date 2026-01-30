import Link from "next/link"
import { Brain } from "lucide-react"
import { WordSolverTool } from "@/components/word-solver-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WordSolverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Universal word solver for all word puzzles and games. Enter your letters and find valid words instantly.
          </p>
        </header>

        <WordSolverTool />

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Supported Word Games</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link> and Scrabble Go</p>
            <p>• <Link href="/words-with-friends" className="text-primary font-medium hover:underline">Words with Friends</Link></p>
            <p>• <Link href="/wordle-solver" className="text-primary font-medium hover:underline">Wordle</Link> and Wordle variants</p>
            <p>• Crossword puzzles</p>
            <p>• Word search puzzles</p>
            <p>• <Link href="/boggle-solver" className="text-primary font-medium hover:underline">Boggle</Link> and similar games</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
