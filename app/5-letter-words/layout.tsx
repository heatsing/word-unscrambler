import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "5 Letter Words - Wordle Word List & Five Letter Word Finder",
  description:
    "Complete list of 5-letter words for Wordle, Scrabble, and word games. Search and filter five-letter words with advanced options including starts with, ends with, and contains.",
}

export default function FiveLetterWordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
