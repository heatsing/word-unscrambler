import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordleHub.title,
  description: seoConfig.wordleHub.description,
  keywords: seoConfig.wordleHub.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordleHub.canonical}`,
  },
}

export default function WordleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

