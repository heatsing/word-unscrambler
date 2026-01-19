import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "9-Letter Words - High-Scoring Word List | Word Unscrambler",
  description:
    "Complete database of 9-letter words for expert word game players. Find nine-letter words for maximum scores.",
  keywords: ["9 letter words", "nine letter words", "scrabble 9 letter words", "high scoring words"],
}

export default function NineLetterWordsPage() {
  const words = getWordsByLength(9)

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">9 Letter Words</h1>
          <p className="text-lg text-muted-foreground">
            Complete database of {words.length} nine-letter words for expert word game players.
            Perfect for high-scoring Scrabble and Words with Friends plays.
          </p>
        </div>
      </div>

      <WordsByLengthTemplate length={9} words={words} />
    </>
  )
}
