import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "4 Letter Words - Complete List of Four Letter Words | Word Finder",
  description: "Browse all valid 4-letter words. Perfect for Scrabble, Words with Friends, and crossword puzzles. Search and filter four-letter words with advanced options.",
}

export default function FourLetterWordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
