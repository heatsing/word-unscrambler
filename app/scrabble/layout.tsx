import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.scrabble.title,
  description: seoConfig.scrabble.description,
  keywords: seoConfig.scrabble.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.scrabble.canonical}`,
  },
}

export default function ScrabbleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
