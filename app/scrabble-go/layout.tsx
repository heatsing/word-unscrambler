import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.scrabbleGo.title,
  description: seoConfig.scrabbleGo.description,
  keywords: seoConfig.scrabbleGo.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.scrabbleGo.canonical}`,
  },
}

export default function ScrabbleGoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

