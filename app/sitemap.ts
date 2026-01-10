import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wordunscrambler.com"

  const wordFinderTools = [
    "wordle",
    "anagram-solver",
    "jumble-solver",
    "scrabble-go",
    "scrabble",
    "scrabble-cheat",
    "unscramble",
    "word-cookies",
    "descrambler",
    "word-finder",
    "word-generator",
    "word-scramble",
    "word-solver",
    "word-unscrambler",
    "wordfeud",
    "wordle-solver",
    "words-with-friends",
    "wordscapes",
  ]

  const wordLengths = [2, 3, 4, 5, 6, 7, 8, 9, 10]

  const staticPages = [
    "",
    "words-by-length",
    "words-start-with",
    "words-with-letters",
    "privacy-policy",
    "terms",
    "about",
    "contact",
  ]

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
    ...wordFinderTools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...wordLengths.map((length) => ({
      url: `${baseUrl}/${length}-letter-words`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ]
}
