import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordSolver.title,
  description: seoConfig.wordSolver.description,
  keywords: seoConfig.wordSolver.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordSolver.canonical}`,
  },
}

export default function WordSolverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

