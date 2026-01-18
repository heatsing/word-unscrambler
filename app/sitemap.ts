import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wordunscrambler.cc'

  // 静态页面 - 仅包含实际存在的页面
  const staticPages = [
    '',
    '/word-unscrambler',
    '/wordle-solver',
    '/wordle',
    '/anagram-solver',
    '/scrabble',
    '/scrabble-go',
    '/scrabble-cheat',
    '/words-with-friends',
    '/jumble-solver',
    '/word-generator',
    '/word-solver',
    '/word-scramble',
    '/word-finder',
    '/descrambler',
    '/unscramble',
    '/wordscapes',
    '/word-cookies',
    '/wordfeud',
    '/words-by-length',
    '/words-start-with',
    '/words-with-letters',
    '/words-ending-in',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
  ]

  // 单词长度页面 (2-10 letter words)
  const wordLengthPages = [2, 3, 4, 5, 6, 7, 8, 9, 10].map(length =>
    `/${length}-letter-words`
  )

  // 动态生成所有字母组合页面
  const lengths = [2, 3, 4, 5, 6, 7, 8, 9, 10]
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

  const letterPages: string[] = []

  // 生成 "starting with" 页面
  for (const length of lengths) {
    for (const letter of alphabet) {
      letterPages.push(`/${length}-letter-words-starting-with/${letter}`)
    }
  }

  // 生成 "ending with" 页面
  for (const length of lengths) {
    for (const letter of alphabet) {
      letterPages.push(`/${length}-letter-words-ending-with/${letter}`)
    }
  }

  // 生成 "containing" 页面
  for (const length of lengths) {
    for (const letter of alphabet) {
      letterPages.push(`/${length}-letter-words-with-${letter}`)
    }
  }

  // 合并所有页面
  const allPages = [...staticPages, ...wordLengthPages, ...letterPages]

  return allPages.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0
      : route.includes('letter-words-starting-with') ||
        route.includes('letter-words-ending-with') ||
        route.includes('letter-words-with-') ? 0.6
      : route.includes('letter-words') ? 0.8
      : 0.7,
  }))
}
