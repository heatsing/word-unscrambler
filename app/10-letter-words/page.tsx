import type { Metadata } from "next"
import { WordsByLengthTemplate } from "@/components/words-by-length-template"
import { getWordsByLength } from "@/lib/word-utils"

export const metadata: Metadata = {
  title: "10-Letter Words - Complete Long Word List | Word Unscrambler",
  description:
    "Complete list of 10-letter words for advanced players. Find ten-letter words for word games and expand your vocabulary.",
  keywords: ["10 letter words", "ten letter words", "long words", "advanced word games"],
}

export default function TenLetterWordsPage() {
  const words = getWordsByLength(10)
  return <WordsByLengthTemplate length={10} words={words} />
}
