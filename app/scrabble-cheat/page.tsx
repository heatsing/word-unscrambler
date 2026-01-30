import Link from "next/link"
import { Zap } from "lucide-react"
import { ScrabbleCheatTool } from "@/components/scrabble-cheat-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ScrabbleCheatPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Scrabble® and Scrabble® GO Cheat</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get instant word suggestions for Scrabble and Scrabble GO. Find the highest-scoring plays every time.
          </p>
        </header>

        <ScrabbleCheatTool />

        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Scrabble Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Memorize Q without U words (QI, QOPH, QADI)</p>
              <p>• Learn all 2-letter words for maximum flexibility</p>
              <p>• Focus on 7-letter bingo opportunities (50 point bonus)</p>
              <p>• Use S strategically for plurals and verb forms</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>High-Value Plays</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Look for opportunities to use J, Q, X, Z</p>
              <p>• Play perpendicular to existing words</p>
              <p>• Target triple letter and word scores</p>
              <p>• Keep track of tiles remaining in the bag</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
