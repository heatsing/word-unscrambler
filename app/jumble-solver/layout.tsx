import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.jumbleSolver.title,
  description: seoConfig.jumbleSolver.description,
  keywords: seoConfig.jumbleSolver.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.jumbleSolver.canonical}`,
  },
}

export default function JumbleSolverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
