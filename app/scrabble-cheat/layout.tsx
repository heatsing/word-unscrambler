import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.scrabbleCheat.title,
  description: seoConfig.scrabbleCheat.description,
  keywords: seoConfig.scrabbleCheat.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.scrabbleCheat.canonical}`,
  },
}

export default function ScrabbleCheatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

