import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "8-Letter Words - Complete List for Word Games | Word Unscrambler",
  description:
    "Comprehensive list of 8-letter words for advanced word games. Find eight-letter words for Scrabble, Words with Friends, and more.",
  keywords: ["8 letter words", "eight letter words", "scrabble 8 letter words", "long words"],
}

export default function EightLetterWordsPage() {
  const words = getWordsByLength(8)

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">8 Letter Words</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive list of {words.length} eight-letter words for advanced word games.
            Find long words for Scrabble, Words with Friends, and more.
          </p>
        </div>
      </div>

      <WordsByLengthTemplate length={8} words={words} />
    </>
  )
}
