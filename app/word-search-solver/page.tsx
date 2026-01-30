import Link from "next/link"
import { Grid3x3 } from "lucide-react"
import { WordSearchSolverTool } from "@/components/word-search-solver-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WordSearchSolverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Grid3x3 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Search Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Use filters to quickly find words you spot in a word search puzzle: starts with, ends with, contains, and more.
          </p>
        </header>

        <WordSearchSolverTool />

        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>• Start with the longest word you can see—it&apos;s easier to confirm.</p>
              <p>• Use &quot;Starts&quot; + &quot;Ends&quot; together to narrow results fast.</p>
              <p>• Set &quot;Length&quot; to match the number of letters you highlighted.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Related tools</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="flex flex-wrap gap-2">
                <Link href="/word-finder"><Button variant="outline" size="sm">Word Finder</Button></Link>
                <Link href="/word-unscrambler"><Button variant="outline" size="sm">Word Unscrambler</Button></Link>
                <Link href="/crossword-solver"><Button variant="outline" size="sm">Crossword Solver</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
