import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "7 Letter Words - Scrabble Bingo Words & Seven Letter Word Finder",
  description: "Browse all valid 7-letter words for Scrabble bingo bonuses. Search and filter seven-letter words with advanced options. Perfect for high-scoring word game plays.",
}

export default function SevenLetterWordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
