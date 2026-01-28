import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordsWithFriends.title,
  description: seoConfig.wordsWithFriends.description,
  keywords: seoConfig.wordsWithFriends.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordsWithFriends.canonical}`,
  },
}

export default function WordsWithFriendsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
