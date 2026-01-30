import Link from "next/link"
import { Gamepad } from "lucide-react"
import { WordfeudTool } from "@/components/wordfeud-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WordfeudPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Gamepad className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Wordfeud Cheat</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the best words for Wordfeud. Get word suggestions with scores to beat your opponents.
          </p>
        </header>

        <WordfeudTool />

        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>About Wordfeud</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <p>
                Wordfeud is a multiplayer word game similar to Scrabble. The game uses a similar board layout and
                scoring system, but with some unique tile distributions and bonus square placements. It&apos;s popular in
                Europe and offers cross-platform play.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Wordfeud Strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Bonus squares are positioned differently than Scrabble</p>
              <p>• Plan multiple moves ahead</p>
              <p>• Control the board center early</p>
              <p>• Learn valid 2-letter words for flexibility</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
