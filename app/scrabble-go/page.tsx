import Link from "next/link"
import { Trophy } from "lucide-react"
import { ScrabbleGoTool } from "@/components/scrabble-go-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ScrabbleGoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Scrabble Go Word Finder</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the best words for Scrabble Go. Get word suggestions sorted by score to dominate the game.
          </p>
        </header>

        <ScrabbleGoTool />

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>About Scrabble GO</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            <p>
              Scrabble GO is the official mobile version of the classic Scrabble game. It features the same scoring
              system and rules as traditional <Link href="/scrabble" className="text-primary font-medium hover:underline">Scrabble</Link>, with additional power-ups and modern features. Use this tool to
              find the highest-scoring words from your tiles and improve your gameplay. See also our <Link href="/words-with-friends" className="text-primary font-medium hover:underline">Words with Friends cheat</Link> and <Link href="/word-finder" className="text-primary font-medium hover:underline">word finder</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
