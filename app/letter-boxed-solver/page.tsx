import Link from "next/link"
import { Square } from "lucide-react"
import { LetterBoxedSolverTool } from "@/components/letter-boxed-solver-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LetterBoxedSolverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Square className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Letter Boxed Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Enter the puzzle letters to find valid words using only those letters. Optionally require a specific letter.
          </p>
        </header>
        <LetterBoxedSolverTool />
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Related tools</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link href="/word-unscrambler"><Button variant="outline" size="sm">Word Unscrambler</Button></Link>
            <Link href="/anagram-solver"><Button variant="outline" size="sm">Anagram Solver</Button></Link>
            <Link href="/word-finder"><Button variant="outline" size="sm">Word Finder</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
