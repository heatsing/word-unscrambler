import Link from "next/link"
import { Shuffle } from "lucide-react"
import { WordScrambleTool } from "@/components/word-scramble-tool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WordScramblePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Shuffle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Scramble</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Generate scrambled words for games and educational activities. Perfect for teachers and game creators.
          </p>
        </header>

        <WordScrambleTool />

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Educational Uses</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Vocabulary building exercises</p>
            <p>• Spelling practice for students</p>
            <p>• Party games and icebreakers</p>
            <p>• Brain training activities</p>
            <p>• Team building exercises</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
