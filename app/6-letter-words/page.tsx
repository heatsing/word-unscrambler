import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "6-Letter Words - Complete List for Word Games | Word Unscrambler",
  description:
    "Comprehensive list of 6-letter words for Scrabble, Words with Friends, and word puzzles. Find six-letter words instantly.",
  keywords: ["6 letter words", "six letter words", "scrabble 6 letter words", "word games"],
}

export default function SixLetterWordsPage() {
  const words = getWordsByLength(6)

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">6 Letter Words</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive list of {words.length} six-letter words for Scrabble, Words with Friends,
            and word puzzles. Perfect for medium-length word challenges.
          </p>
        </div>
      </div>

      <WordsByLengthTemplate length={6} words={words} />
    </>
  )
}
