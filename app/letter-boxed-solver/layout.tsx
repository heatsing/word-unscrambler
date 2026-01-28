import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Letter Boxed Solver - Find Valid Words",
  description:
    "Letter Boxed solver to find words using only the given letters (optionally requiring a center letter). Great for NYT-style letter puzzles.",
  alternates: {
    canonical: "https://wordunscrambler.cc/letter-boxed-solver",
  },
}

export default function LetterBoxedSolverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

