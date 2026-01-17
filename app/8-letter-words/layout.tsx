import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "8 Letter Words - Complete List of Eight Letter Words | Word Finder",
  description: "Browse all valid 8-letter words. Perfect for Scrabble, Words with Friends, and crossword puzzles. Search and filter eight-letter words with advanced options.",
}

export default function EightLetterWordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
