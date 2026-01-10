import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "4-Letter Words - Complete List for Word Games | Word Unscrambler",
  description:
    "Complete database of 4-letter words for word games. Perfect for Scrabble, Words with Friends, Wordle, and crossword puzzles.",
  keywords: ["4 letter words", "four letter words", "wordle words", "scrabble 4 letter words"],
}

export default function FourLetterWordsPage() {
  const words = getWordsByLength(4)
  return <WordsByLengthTemplate length={4} words={words} />
}
