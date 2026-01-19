import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "5-Letter Words - Complete Wordle Word List | Word Unscrambler",
  description:
    "Complete list of 5-letter words for Wordle, Scrabble, and Words with Friends. Find the perfect five-letter word for any word game.",
  keywords: ["5 letter words", "five letter words", "wordle words", "wordle answers", "5 letter word list"],
}

export default function FiveLetterWordsPage() {
  const words = getWordsByLength(5)

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">5 Letter Words</h1>
          <p className="text-lg text-muted-foreground">
            Complete list of {words.length} five-letter words for Wordle, Scrabble, Words with Friends,
            and crossword puzzles. The ultimate Wordle word list.
          </p>
        </div>
      </div>

      <WordsByLengthTemplate length={5} words={words} />
    </>
  )
}
