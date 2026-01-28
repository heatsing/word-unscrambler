import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordUnscrambler.title,
  description: seoConfig.wordUnscrambler.description,
  keywords: seoConfig.wordUnscrambler.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordUnscrambler.canonical}`,
  },
}

export default function WordUnscramblerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

