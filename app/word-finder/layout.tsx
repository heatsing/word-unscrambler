import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordFinder.title,
  description: seoConfig.wordFinder.description,
  keywords: seoConfig.wordFinder.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordFinder.canonical}`,
  },
}

export default function WordFinderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
