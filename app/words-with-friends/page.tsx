import Link from "next/link"
import { Gamepad2 } from "lucide-react"
import { WordsWithFriendsTool } from "@/components/words-with-friends-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WordsWithFriendsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Gamepad2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Words with Friends Helper</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the best words for Words with Friends. Enter your tiles and get word suggestions sorted by score.
          </p>
        </header>

        <WordsWithFriendsTool />

        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Words with Friends Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Use bonus squares strategically (DL, TL, DW, TW)</p>
              <p>• High-value letters: J, Q, X, Z are worth more points</p>
              <p>• Play parallel to existing words for multiple scores</p>
              <p>• Save S and blank tiles for strategic plays</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scoring Strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Look for opportunities to create multiple words</p>
              <p>• Use all 7 tiles for a 35-point bonus</p>
              <p>• Block opponent&apos;s access to triple word scores</p>
              <p>• Learn common 2 and 3-letter words for tight spots</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
