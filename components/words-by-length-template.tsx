import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Search } from "lucide-react"

interface WordsByLengthTemplateProps {
  length: number
  words: string[]
}

export function WordsByLengthTemplate({ length, words }: WordsByLengthTemplateProps) {
  const otherLengths = [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((l) => l !== length)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{length}-Letter Words</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive list of {length}-letter words. Perfect for word games like Scrabble, Words with Friends,
            Wordle, and crossword puzzles.
          </p>
          <Badge variant="secondary" className="mt-4">
            {words.length} words found
          </Badge>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="text" placeholder={`Search ${length}-letter words...`} className="pl-10" />
          </div>
        </div>

        {/* Word Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All {length}-Letter Words</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {words.map((word, index) => (
              <Card key={index} className="p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                <span className="font-medium text-sm md:text-base">{word}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation to Other Lengths */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse Other Word Lengths</h2>
          <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {otherLengths.map((len) => (
              <Link key={len} href={`/${len}-letter-words`}>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-2xl font-bold text-primary">{len}</div>
                  <div className="text-xs text-muted-foreground">Letters</div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="prose prose-sm max-w-none">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">About {length}-Letter Words</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This comprehensive list contains all valid {length}-letter words that can be used in popular word games
                and puzzles. Whether you're playing Scrabble, Words with Friends, solving crosswords, or enjoying
                Wordle, this word list will help you find the perfect {length}-letter word.
              </p>
              <p>
                {length}-letter words are{" "}
                {length <= 4
                  ? "short and commonly used in everyday language"
                  : length <= 6
                    ? "versatile and frequently appear in word games"
                    : "longer words that can earn you high scores in word games"}
                . Our database includes {words.length} unique {length}-letter words from the official dictionary.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-3">How to Use This {length}-Letter Word List</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Use the search box above to quickly find specific {length}-letter words</li>
                <li>Click on any word to see its definition and usage examples</li>
                <li>Perfect for discovering high-scoring Scrabble and Words with Friends words</li>
                <li>Ideal for solving {length === 5 ? "Wordle puzzles" : "crossword clues"}</li>
                <li>Expand your vocabulary with less common {length}-letter words</li>
              </ul>
              <h3 className="text-xl font-bold mt-6 mb-3">Popular {length}-Letter Words</h3>
              <p>
                Some of the most commonly used {length}-letter words include: {words.slice(0, 10).join(", ")}, and many
                more. Browse the complete list above to discover all possibilities.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
