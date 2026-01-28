import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Word Search Solver - Find Hidden Words Fast",
  description:
    "Word search solver to find words by filters like starts with, ends with, contains, and length. Great for puzzles and word hunts.",
  alternates: {
    canonical: "https://wordunscrambler.cc/word-search-solver",
  },
}

export default function WordSearchSolverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

