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
      <WordsByLengthTemplate length={5} words={words} />
    </>
  )
}
