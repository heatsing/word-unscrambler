import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "2-Letter Words - Complete List for Word Games | Word Unscrambler",
  description:
    "Complete list of all valid 2-letter words for Scrabble, Words with Friends, and other word games. Quick reference for two-letter words.",
  keywords: ["2 letter words", "two letter words", "scrabble 2 letter words", "short words"],
}

export default function TwoLetterWordsPage() {
  const words = getWordsByLength(2)

  return (
    <>
      <WordsByLengthTemplate length={2} words={words} />
    </>
  )
}
