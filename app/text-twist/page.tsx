import Link from "next/link"
import { Shuffle } from "lucide-react"
import { TextTwistTool } from "@/components/text-twist-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TextTwistPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Shuffle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Text Twist Solver</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Enter your Text Twist letters to find all possible words (including longer bonus words).
          </p>
        </header>
        <TextTwistTool />
        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>How to use</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>1. Type the letters shown in your Text Twist round.</p>
              <p>2. Click Find Words to see all valid word combinations.</p>
              <p>3. Start with longer words first to maximize points.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Related tools</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="flex flex-wrap gap-2">
                <Link href="/anagram-solver"><Button variant="outline" size="sm">Anagram Solver</Button></Link>
                <Link href="/word-unscrambler"><Button variant="outline" size="sm">Word Unscrambler</Button></Link>
                <Link href="/word-finder"><Button variant="outline" size="sm">Word Finder</Button></Link>
              </div>
              <p className="text-xs">
                Tip: If you know the word length, use <Link className="text-primary font-medium hover:underline" href="/words-by-length">Words by Length</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
