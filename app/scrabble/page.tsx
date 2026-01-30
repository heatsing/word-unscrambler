import Link from "next/link"
import { Trophy } from "lucide-react"
import { ScrabbleTool } from "@/components/scrabble-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ScrabblePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Scrabble Word Finder</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the highest-scoring Scrabble words from your tiles. Beat your opponents with strategic word choices.
          </p>
        </header>

        <ScrabbleTool />

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Scrabble Letter Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="font-semibold">1 point:</span> A, E, I, O, U, L, N, S, T, R</div>
              <div><span className="font-semibold">2 points:</span> D, G</div>
              <div><span className="font-semibold">3 points:</span> B, C, M, P</div>
              <div><span className="font-semibold">4 points:</span> F, H, V, W, Y</div>
              <div><span className="font-semibold">5 points:</span> K</div>
              <div><span className="font-semibold">8 points:</span> J, X</div>
              <div><span className="font-semibold">10 points:</span> Q, Z</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
