import Link from "next/link"
import { Wand2 } from "lucide-react"
import { WordGeneratorTool } from "@/components/word-generator-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WordGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Wand2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Generator</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Generate random words for games, creativity, and brainstorming. Perfect for inspiration and word game
            practice.
          </p>
        </header>

        <WordGeneratorTool />

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Use Cases for Random Words</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Creative writing prompts and inspiration</p>
            <p>• Practice for word games and puzzles</p>
            <p>• Password generation ideas</p>
            <p>• Team building and brainstorming activities</p>
            <p>• Educational vocabulary exercises. Try our <Link href="/word-unscrambler" className="text-primary font-medium hover:underline">word unscrambler</Link> or <Link href="/5-letter-words" className="text-primary font-medium hover:underline">5 letter words</Link> for more.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
