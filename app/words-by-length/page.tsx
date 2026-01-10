import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Words by Length - Browse All Word Lists | Word Unscrambler",
  description:
    "Browse comprehensive word lists organized by length. Find 2-letter words through 10-letter words for all your word game needs.",
  keywords: ["words by length", "word lists", "word length", "scrabble words by length"],
}

const wordLengths = [
  {
    length: 2,
    count: 20,
    description: "Essential two-letter words for tight spots",
    examples: ["at", "be", "do", "go", "he"],
  },
  {
    length: 3,
    count: 20,
    description: "Common three-letter words for quick plays",
    examples: ["ace", "act", "add", "age", "ago"],
  },
  {
    length: 4,
    count: 20,
    description: "Versatile four-letter words for all games",
    examples: ["able", "acid", "aged", "also", "area"],
  },
  {
    length: 5,
    count: 20,
    description: "Perfect for Wordle and word games",
    examples: ["about", "above", "abuse", "acids", "acres"],
  },
  {
    length: 6,
    count: 20,
    description: "Medium-length words for better scores",
    examples: ["abroad", "accept", "access", "across", "acting"],
  },
  {
    length: 7,
    count: 20,
    description: "High-scoring seven-letter bingo words",
    examples: ["ability", "absence", "absolve", "academy", "account"],
  },
  {
    length: 8,
    count: 20,
    description: "Advanced eight-letter word combinations",
    examples: ["abandon", "absolute", "abstract", "academic", "accepted"],
  },
  {
    length: 9,
    count: 20,
    description: "Expert-level nine-letter words",
    examples: ["abandoned", "abilities", "abolition", "abortion", "absolutes"],
  },
  {
    length: 10,
    count: 20,
    description: "Maximum-length ten-letter words",
    examples: ["abandoning", "abbreviate", "abdication", "aberration", "abilities"],
  },
]

export default function WordsByLengthPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Words by Length</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Browse comprehensive word lists organized by word length. From short 2-letter words to long 10-letter words,
            find exactly what you need for your word games.
          </p>
        </div>

        <div className="space-y-6">
          {wordLengths.map((item) => (
            <Link key={item.length} href={`/${item.length}-letter-words`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{item.length}-Letter Words</CardTitle>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{item.count}+</div>
                      <div className="text-xs text-muted-foreground">words</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.examples.map((word) => (
                      <span
                        key={word}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 prose prose-sm max-w-none">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Why Browse Words by Length?</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Organizing words by length is one of the most practical ways to find the perfect word for your game or
                puzzle. Whether you need a quick 2-letter word to fit a tight spot in Scrabble or a strategic 7-letter
                word for a bingo bonus, browsing by length helps you quickly narrow down your options.
              </p>
              <p>
                Different word lengths serve different purposes in word games. Short words (2-4 letters) are perfect for
                connecting words and maximizing board coverage. Medium words (5-6 letters) offer a balance of
                flexibility and scoring potential. Long words (7-10 letters) can earn significant bonuses and help you
                dominate the game.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-3">Popular Word Games by Length</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Wordle:</strong> Always 5-letter words
                </li>
                <li>
                  <strong>Scrabble:</strong> 2-letter words for tight spots, 7-letter words for bingos
                </li>
                <li>
                  <strong>Words with Friends:</strong> All lengths, with emphasis on 5-7 letters
                </li>
                <li>
                  <strong>Crosswords:</strong> Variable lengths based on puzzle design
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
