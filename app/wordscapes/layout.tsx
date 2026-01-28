import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordscapes.title,
  description: seoConfig.wordscapes.description,
  keywords: seoConfig.wordscapes.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordscapes.canonical}`,
  },
}

export default function WordscapesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

