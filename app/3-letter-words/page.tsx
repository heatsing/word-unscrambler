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
  return <WordsByLengthTemplate length={3} words={words} />
}
