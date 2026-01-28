import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordCookies.title,
  description: seoConfig.wordCookies.description,
  keywords: seoConfig.wordCookies.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordCookies.canonical}`,
  },
}

export default function WordCookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

