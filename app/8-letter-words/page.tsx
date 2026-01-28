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
      <WordsByLengthTemplate length={8} words={words} />
    </>
  )
}
