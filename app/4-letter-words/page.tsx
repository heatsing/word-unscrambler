import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "4-Letter Words - Complete List for Word Games | Word Unscrambler",
  description:
    "Complete database of 4-letter words for word games. Perfect for Scrabble, Words with Friends, Wordle, and crossword puzzles.",
  keywords: ["4 letter words", "four letter words", "wordle words", "scrabble 4 letter words"],
}

export default function FourLetterWordsPage() {
  const words = getWordsByLength(4)

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">4 Letter Words</h1>
          <p className="text-lg text-muted-foreground">
            Complete database of {words.length} four-letter words for Scrabble, Words with Friends,
            Wordle, and crossword puzzles. Find the perfect word instantly.
          </p>
        </div>
      </div>

      <WordsByLengthTemplate length={4} words={words} />
    </>
  )
}
