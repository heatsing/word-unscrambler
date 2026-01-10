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
  return <WordsByLengthTemplate length={6} words={words} />
}
