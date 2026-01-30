import { MetadataRoute } from 'next'

const baseUrl = 'https://wordunscrambler.cc'
const currentDate = new Date().toISOString()

// 静态页面列表
const staticPages = [
  // 首页
  { url: '', priority: 1.0, changefreq: 'daily' },
  
  // 主要工具页面
  { url: '/word-unscrambler', priority: 0.9, changefreq: 'weekly' },
  { url: '/wordle-solver', priority: 0.9, changefreq: 'weekly' },
  { url: '/wordle', priority: 0.9, changefreq: 'weekly' },
  { url: '/anagram-solver', priority: 0.9, changefreq: 'weekly' },
  { url: '/scrabble', priority: 0.9, changefreq: 'weekly' },
  { url: '/scrabble-go', priority: 0.8, changefreq: 'weekly' },
  { url: '/scrabble-cheat', priority: 0.8, changefreq: 'weekly' },
  { url: '/words-with-friends', priority: 0.9, changefreq: 'weekly' },
  { url: '/jumble-solver', priority: 0.8, changefreq: 'weekly' },
  { url: '/boggle-solver', priority: 0.8, changefreq: 'weekly' },
  { url: '/crossword-solver', priority: 0.8, changefreq: 'weekly' },
  { url: '/word-generator', priority: 0.8, changefreq: 'weekly' },
  { url: '/word-solver', priority: 0.7, changefreq: 'weekly' },
  { url: '/word-scramble', priority: 0.7, changefreq: 'weekly' },
  { url: '/word-finder', priority: 0.8, changefreq: 'weekly' },
  { url: '/descrambler', priority: 0.7, changefreq: 'weekly' },
  { url: '/unscramble', priority: 0.7, changefreq: 'weekly' },
  { url: '/wordscapes', priority: 0.8, changefreq: 'weekly' },
  { url: '/word-cookies', priority: 0.8, changefreq: 'weekly' },
  { url: '/wordfeud', priority: 0.8, changefreq: 'weekly' },
  { url: '/text-twist', priority: 0.7, changefreq: 'weekly' },
  { url: '/word-search-solver', priority: 0.7, changefreq: 'weekly' },
  { url: '/hangman-solver', priority: 0.7, changefreq: 'weekly' },
  { url: '/letter-boxed-solver', priority: 0.7, changefreq: 'weekly' },
  
  // 分类页面
  { url: '/words-by-length', priority: 0.8, changefreq: 'weekly' },
  { url: '/words-start-with', priority: 0.8, changefreq: 'weekly' },
  { url: '/words-with-letters', priority: 0.8, changefreq: 'weekly' },
  { url: '/words-ending-in', priority: 0.8, changefreq: 'weekly' },
  
  // 信息页面
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
  { url: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
  { url: '/terms', priority: 0.5, changefreq: 'yearly' },
]

// 单词长度页面 (2-10 letters)
const wordLengthPages = Array.from({ length: 9 }, (_, i) => ({
  url: `/${i + 2}-letter-words`,
  priority: 0.9,
  changefreq: 'monthly' as const,
}))

// 生成动态字母组合页面
function generateLetterPages() {
  const lengths = [2, 3, 4, 5, 6, 7, 8, 9, 10]
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const pages: Array<{ url: string; priority: number; changefreq: 'monthly' }> = []

  // Starting with pages
  for (const length of lengths) {
    for (const letter of alphabet) {
      pages.push({
        url: `/${length}-letter-words-starting-with/${letter}`,
        priority: 0.6,
        changefreq: 'monthly',
      })
    }
  }

  // Ending with pages
  for (const length of lengths) {
    for (const letter of alphabet) {
      pages.push({
        url: `/${length}-letter-words-ending-with/${letter}`,
        priority: 0.6,
        changefreq: 'monthly',
      })
    }
  }

  // Words with letter pages
  for (const length of lengths) {
    for (const letter of alphabet) {
      pages.push({
        url: `/${length}-letter-words-with-${letter}`,
        priority: 0.6,
        changefreq: 'monthly',
      })
    }
  }

  return pages
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 合并所有页面
  const allPages = [
    ...staticPages,
    ...wordLengthPages,
    ...generateLetterPages(),
  ]

  // 转换为 sitemap 格式
  type ChangeFreq = MetadataRoute.Sitemap[number]['changeFrequency']
  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changefreq as ChangeFreq,
    priority: page.priority,
  }))
}
