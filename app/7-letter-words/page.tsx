import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "7-Letter Words - High-Scoring Scrabble Words | Word Unscrambler",
  description:
    "Complete list of 7-letter words for word games. Perfect for scoring big in Scrabble and Words with Friends with seven-letter words.",
  keywords: ["7 letter words", "seven letter words", "scrabble 7 letter words", "bingo words"],
}

export default function SevenLetterWordsPage() {
  const words = getWordsByLength(7)

  return (
    <>
      <WordsByLengthTemplate length={7} words={words} />
    </>
  )
}
