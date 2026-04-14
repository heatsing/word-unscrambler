export type JsonLd = Record<string, unknown>

const baseUrl = "https://wordunscrambler.cc"

export function getOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Word Unscrambler",
    url: baseUrl,
    logo: `${baseUrl}/opengraph-image`,
    description: "Free word unscrambler and anagram solver for word games",
    foundingDate: "2024",
    areaServed: { "@type": "Place", name: "Worldwide" },
    sameAs: [],
  }
}

export function getWebsiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Word Unscrambler",
    url: baseUrl,
    description: "Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends",
    inLanguage: ["en-US", "en-GB", "en-CA", "en-AU", "en-NZ"],
    publisher: { "@id": `${baseUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/word-unscrambler?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function getServiceSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#service`,
    name: "Word Unscrambler Service",
    description: "Free online word unscrambler and anagram solver tool for word games",
    provider: { "@id": `${baseUrl}/#organization` },
    serviceType: "Online Word Game Solver",
    areaServed: { "@type": "Place", name: "Worldwide" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: baseUrl,
      serviceType: "Online",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: baseUrl,
      availability: "https://schema.org/InStock",
    },
  }
}

/**
 * Optional: WebApplication schema (helps eligibility for some rich results).
 * Note: AggregateRating eligibility depends on Google's policies.
 */
export function getWebApplicationSchema(params?: { ratingValue?: number; ratingCount?: number }): JsonLd {
  const ratingValue = params?.ratingValue
  const ratingCount = params?.ratingCount

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/#app`,
    name: "Word Unscrambler",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    url: baseUrl,
    description:
      "Free word unscrambler and word game solver for Wordle, Scrabble, Words with Friends, and more.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: baseUrl,
      availability: "https://schema.org/InStock",
    },
    publisher: { "@id": `${baseUrl}/#organization` },
    ...(Number.isFinite(ratingValue) && Number.isFinite(ratingCount)
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            ratingCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  }
}

