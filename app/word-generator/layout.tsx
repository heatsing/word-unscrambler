import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordGenerator.title,
  description: seoConfig.wordGenerator.description,
  keywords: seoConfig.wordGenerator.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordGenerator.canonical}`,
  },
}

export default function WordGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
