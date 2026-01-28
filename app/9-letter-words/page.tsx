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
      <WordsByLengthTemplate length={9} words={words} />
    </>
  )
}
