import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "2 Letter Words - Complete List of Two Letter Words | Word Finder",
  description: "Browse all valid 2-letter words. Perfect for Scrabble, Words with Friends, and crossword puzzles. Search and filter two-letter words with advanced options.",
}

export default function TwoLetterWordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
