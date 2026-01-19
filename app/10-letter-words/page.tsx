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

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">10 Letter Words</h1>
          <p className="text-lg text-muted-foreground">
            Complete list of {words.length} ten-letter words for advanced players.
            Expand your vocabulary and dominate word games with long words.
          </p>
        </div>
      </div>

      <WordsByLengthTemplate length={10} words={words} />
    </>
  )
}
