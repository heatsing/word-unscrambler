import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Words Start With - Find Words Beginning with Letters | Word Finder",
  description: "Find all words that start with specific letters. Perfect for Scrabble, Wordle, crossword puzzles, and word games. Search by starting letters and word length.",
}

export default function WordsStartWithLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
