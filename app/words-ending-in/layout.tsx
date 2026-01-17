import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Words Ending In - Find Words Ending with Letters | Word Finder",
  description: "Find all words that end with specific letters. Search by word endings and length. Perfect for rhyming, poetry, Scrabble, and crossword puzzles.",
}

export default function WordsEndingInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
