import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WordListProps {
  words: string[]
  showScore?: boolean
  calculateScore?: (word: string) => number
}

export function WordList({ words, showScore = false, calculateScore }: WordListProps) {
  if (words.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No words found. Try different letters.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {words.map((word, index) => (
        <Card key={index} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-medium text-lg">{word}</span>
            {showScore && calculateScore && <Badge variant="secondary">{calculateScore(word)}</Badge>}
          </div>
        </Card>
      ))}
    </div>
  )
}
