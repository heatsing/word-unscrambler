import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordScramble.title,
  description: seoConfig.wordScramble.description,
  keywords: seoConfig.wordScramble.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordScramble.canonical}`,
  },
}

export default function WordScrambleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
