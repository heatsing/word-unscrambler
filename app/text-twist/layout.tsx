import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text Twist Solver - Unscramble Letters Fast",
  description:
    "Text Twist solver to find all possible words from your letters. Get quick anagrams and longer words to beat every round.",
  alternates: {
    canonical: "https://wordunscrambler.cc/text-twist",
  },
}

export default function TextTwistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

