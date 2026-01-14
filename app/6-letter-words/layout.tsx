import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "6 Letter Words - Complete List of Six Letter Words | Word Finder",
  description: "Browse all valid 6-letter words. Perfect for Scrabble, Words with Friends, and crossword puzzles. Search and filter six-letter words with advanced options.",
}

export default function SixLetterWordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
