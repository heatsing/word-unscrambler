import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordfeud.title,
  description: seoConfig.wordfeud.description,
  keywords: seoConfig.wordfeud.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordfeud.canonical}`,
  },
}

export default function WordfeudLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

