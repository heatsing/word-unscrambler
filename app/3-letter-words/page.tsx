import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "3-Letter Words - Complete List for Word Games | Word Unscrambler",
  description:
    "Comprehensive list of all valid 3-letter words for Scrabble, Words with Friends, and word puzzles. Find three-letter words quickly.",
  keywords: ["3 letter words", "three letter words", "scrabble 3 letter words"],
}

export default function ThreeLetterWordsPage() {
  const words = getWordsByLength(3)

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">3 Letter Words</h1>
          <p className="text-lg text-muted-foreground">
            Complete list of {words.length} three-letter words for Scrabble, Words with Friends,
            and other word games. Perfect for quick word game solutions.
          </p>
        </div>
      </div>

      <WordsByLengthTemplate length={3} words={words} />
    </>
  )
}
