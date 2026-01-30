import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: "Boggle Solver - Boggle With Friends Cheat & Word Finder | 4x4, 5x5, 6x6",
  description:
    "Free Boggle solver for 4x4, 5x5 & 6x6 boards. Solve Boggle With Friends, Scramble With Friends & classic Boggle instantly. Find every word in your letter grid.",
  keywords: [
    "boggle solver",
    "boggle with friends cheat",
    "boggle word finder",
    "4x4 boggle",
    "5x5 boggle",
    "word hunt solver",
  ],
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.boggleSolver.canonical}`,
  },
}

export default function BoggleSolverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
