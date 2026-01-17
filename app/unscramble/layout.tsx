import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.unscramble.title,
  description: seoConfig.unscramble.description,
  keywords: seoConfig.unscramble.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.unscramble.canonical}`,
  },
}

export default function UnscrambleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
