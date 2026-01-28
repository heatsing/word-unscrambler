import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.descrambler.title,
  description: seoConfig.descrambler.description,
  keywords: seoConfig.descrambler.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.descrambler.canonical}`,
  },
}

export default function DescramblerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
