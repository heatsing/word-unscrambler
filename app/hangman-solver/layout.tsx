import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hangman Solver - Find Words From Pattern",
  description:
    "Hangman solver to find possible words from a pattern (like h_ngm_n) and excluded letters. Great for word puzzles and games.",
  alternates: {
    canonical: "https://wordunscrambler.cc/hangman-solver",
  },
}

export default function HangmanSolverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

