import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "9 Letter Words - Complete List of Nine Letter Words | Word Finder",
  description: "Browse all valid 9-letter words. Perfect for Scrabble, Words with Friends, and crossword puzzles. Search and filter nine-letter words with advanced options.",
}

export default function NineLetterWordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
