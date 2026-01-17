import type { Metadata } from "next"
import { seoConfig, faqSchemas } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: seoConfig.wordleSolver.title,
  description: seoConfig.wordleSolver.description,
  keywords: seoConfig.wordleSolver.keywords,
  alternates: {
    canonical: `https://wordunscrambler.cc${seoConfig.wordleSolver.canonical}`,
  },
  openGraph: {
    title: seoConfig.wordleSolver.title,
    description: seoConfig.wordleSolver.description,
    url: `https://wordunscrambler.cc${seoConfig.wordleSolver.canonical}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.wordleSolver.title,
    description: seoConfig.wordleSolver.description,
  },
}

export default function WordleSolverLayout({
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
        "name": "Wordle Solver",
        "item": "https://wordunscrambler.cc/wordle-solver"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemas.wordleSolver) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
