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
      {/* SSR-rendered intro for SEO */}
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">2 Letter Words</h1>
          <p className="text-lg text-muted-foreground">
            Complete list of {words.length} two-letter words for Scrabble, Words with Friends,
            and other word games. Find the perfect word for any word puzzle.
          </p>
        </div>
      </div>

      <WordsByLengthTemplate length={2} words={words} />
    </>
  )
}
