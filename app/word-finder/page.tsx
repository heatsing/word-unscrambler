import Link from "next/link"
import { Search } from "lucide-react"
import { WordFinderTool } from "@/components/word-finder-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WordFinderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Word Finder - Scrabble and Words With Friends Cheat
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            The ultimate word finder for Scrabble and Words with Friends. Find high-scoring words from your tiles.
          </p>
        </header>

        <WordFinderTool />

        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Scrabble Strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Target triple word score squares</p>
              <p>• Use high-value letters (Q, Z, J, X) wisely</p>
              <p>• Create parallel words for multiple scores</p>
              <p>• Keep balanced vowel-consonant ratio</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Words With Friends Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Learn 2-letter words for tight spots</p>
              <p>• Use all 7 tiles for bonus points</p>
              <p>• Block opponent&apos;s scoring opportunities</p>
              <p>• Save blank tiles for strategic plays</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
