import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Words With Letters - Find Words Containing Letters | Word Finder",
  description: "Find all words that contain specific letters. Search for words with any letter combination and filter by length. Perfect for word games and puzzles.",
}

export default function WordsWithLettersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
