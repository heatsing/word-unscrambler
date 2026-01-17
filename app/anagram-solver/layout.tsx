import type { Metadata } from "next"
import { seoConfig, faqSchemas } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.anagramSolver.title,
  description: seoConfig.anagramSolver.description,
  keywords: seoConfig.anagramSolver.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.anagramSolver.canonical}`,
  },
  openGraph: {
    title: seoConfig.anagramSolver.title,
    description: seoConfig.anagramSolver.description,
    url: `https://wordunscrambler.cc${seoConfig.anagramSolver.canonical}`,
    type: 'website',
  },
}

export default function AnagramSolverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wordunscrambler.cc"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Anagram Solver",
        "item": "https://wordunscrambler.cc/anagram-solver"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemas.anagramSolver) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
