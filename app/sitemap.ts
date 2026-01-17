import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wordunscrambler.cc'

  // 静态页面
  const staticPages = [
    '',
    '/word-unscrambler',
    '/wordle-solver',
    '/anagram-solver',
    '/scrabble',
    '/scrabble-go',
    '/words-with-friends',
    '/jumble-solver',
    '/word-generator',
    '/word-scramble',
    '/wordscapes',
    '/word-cookies',
    '/wordfeud',
    '/text-twist',
    '/boggle-solver',
    '/crossword-solver',
    '/word-search-solver',
    '/hangman-solver',
    '/letter-boxed-solver',
    '/words-by-length',
    '/words-start-with',
    '/words-with-letters',
    '/words-ending-in',
    '/about',
  ]

  // 单词长度页面 (2-10 letter words)
  const wordLengthPages = [2, 3, 4, 5, 6, 7, 8, 9, 10].map(length =>
    `/${length}-letter-words`
  )

  // 合并所有页面
  const allPages = [...staticPages, ...wordLengthPages]

  return allPages.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.includes('letter-words') ? 0.8 : 0.7,
  }))
}
