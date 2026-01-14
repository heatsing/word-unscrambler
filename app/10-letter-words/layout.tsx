import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "10 Letter Words - Complete List of Ten Letter Words | Word Finder",
  description: "Browse all valid 10-letter words. Perfect for Scrabble, Words with Friends, and crossword puzzles. Search and filter ten-letter words with advanced options.",
}

export default function TenLetterWordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
