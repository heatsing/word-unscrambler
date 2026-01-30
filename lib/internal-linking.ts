/**
 * 内部链接策略配置
 * 用于优化网站的PageRank分配和SEO表现
 */

export const siteArchitecture = {
  // Tier 1: 最重要的页面（首页）
  tier1: [
    { url: '/', title: 'Home', priority: 1.0 }
  ],

  // Tier 2: 主要工具页面
  tier2: [
    { url: '/word-unscrambler', title: 'Word Unscrambler', priority: 0.9 },
    { url: '/wordle-solver', title: 'Wordle Solver', priority: 0.9 },
    { url: '/anagram-solver', title: 'Anagram Solver', priority: 0.9 },
    { url: '/scrabble', title: 'Scrabble Word Finder', priority: 0.9 },
    { url: '/words-with-friends', title: 'Words With Friends Cheat', priority: 0.9 },
  ],

  // Tier 3: 次要工具和分类页面
  tier3: [
    { url: '/jumble-solver', title: 'Jumble Solver', priority: 0.8 },
    { url: '/boggle-solver', title: 'Boggle Solver', priority: 0.8 },
    { url: '/crossword-solver', title: 'Crossword Solver', priority: 0.8 },
    { url: '/words-by-length', title: 'Words By Length', priority: 0.8 },
    { url: '/words-start-with', title: 'Words Start With', priority: 0.8 },
    { url: '/words-ending-in', title: 'Words Ending In', priority: 0.8 },
  ],

  // Tier 4: 单词长度页面
  tier4: [
    { url: '/5-letter-words', title: '5 Letter Words', priority: 0.8 },
    { url: '/7-letter-words', title: '7 Letter Words', priority: 0.7 },
    { url: '/6-letter-words', title: '6 Letter Words', priority: 0.7 },
    // ... 其他长度
  ],

  // Tier 5: 字母组合页面（动态生成）
  tier5Priority: 0.6
}

// 推荐的锚文本策略
export const anchorTextStrategies = {
  wordle: [
    'Wordle solver',
    'solve Wordle',
    'Wordle helper',
    'Wordle word finder',
    '5 letter words for Wordle'
  ],
  scrabble: [
    'Scrabble word finder',
    'Scrabble cheat',
    'high scoring Scrabble words',
    'Scrabble helper',
    'best Scrabble words'
  ],
  anagram: [
    'anagram solver',
    'solve anagrams',
    'anagram finder',
    'unscramble letters',
    'find anagrams'
  ],
  generic: [
    'word finder',
    'word solver',
    'word helper',
    'find words',
    'word tool'
  ]
}

// 每个页面类型的推荐内部链接
export const recommendedLinks = {
  homePage: {
    mainLinks: [
      { url: '/wordle-solver', anchor: 'Wordle Solver', context: 'Popular tool' },
      { url: '/word-unscrambler', anchor: 'Word Unscrambler', context: 'Main feature' },
      { url: '/scrabble', anchor: 'Scrabble Word Finder', context: 'Popular tool' },
      { url: '/anagram-solver', anchor: 'Anagram Solver', context: 'Popular tool' },
      { url: '/words-with-friends', anchor: 'Words With Friends Cheat', context: 'Popular tool' },
    ],
    secondaryLinks: [
      { url: '/5-letter-words', anchor: '5 Letter Words', context: 'Wordle related' },
      { url: '/7-letter-words', anchor: '7 Letter Words', context: 'Scrabble related' },
      { url: '/words-by-length', anchor: 'Words By Length', context: 'Browse words' },
    ]
  },

  wordleSolver: {
    relatedTools: [
      { url: '/5-letter-words', anchor: '5 letter words list', context: 'All possible Wordle words' },
      { url: '/word-unscrambler', anchor: 'word unscrambler', context: 'Alternative tool' },
      { url: '/anagram-solver', anchor: 'anagram solver', context: 'Similar tool' },
    ],
    letterPages: [
      { url: '/5-letter-words-starting-with/a', anchor: '5 letter words starting with A', context: 'Wordle strategy' },
      { url: '/5-letter-words-starting-with/s', anchor: '5 letter words starting with S', context: 'Common starting letter' },
    ]
  },

  scrabble: {
    relatedTools: [
      { url: '/7-letter-words', anchor: '7 letter words', context: 'Scrabble bingo words' },
      { url: '/word-unscrambler', anchor: 'unscramble letters', context: 'Find Scrabble words' },
      { url: '/anagram-solver', anchor: 'anagram solver', context: 'Rack solving' },
    ],
    letterPages: [
      { url: '/7-letter-words-starting-with/s', anchor: '7 letter words with S', context: 'High value letter' },
      { url: '/7-letter-words-ending-with/s', anchor: 'words ending in S', context: 'Plurals' },
    ]
  },

  wordLengthPages: {
    navigation: [
      { url: '/words-by-length', anchor: 'all word lengths', context: 'Parent category' },
      { url: '/words-start-with', anchor: 'words starting with', context: 'Filter option' },
      { url: '/words-ending-in', anchor: 'words ending in', context: 'Filter option' },
    ],
    tools: [
      { url: '/wordle-solver', anchor: 'Wordle solver', context: 'For 5-letter words' },
      { url: '/scrabble', anchor: 'Scrabble word finder', context: 'For 7-letter words' },
    ]
  },

  letterCombinationPages: {
    upLinks: [
      { url: '/words-by-length', anchor: 'browse all word lengths', context: 'Category page' },
    ],
    relatedFilters: [
      // 示例：5 letter words starting with A
      { url: '/5-letter-words-ending-with/a', anchor: 'words ending with A', context: 'Alternative filter' },
      { url: '/5-letter-words-with-a', anchor: 'words containing A', context: 'Alternative filter' },
    ],
    tools: [
      { url: '/word-unscrambler', anchor: 'word unscrambler tool', context: 'Find more words' },
    ]
  }
}

// 内部链接最佳实践（SEO/GEO：自然锚文本 + dofollow 传递权重）
export const linkingBestPractices = {
  maxLinksPerPage: 100,
  contextualLinksPerPage: 8, // 每页 5–10 条情境内链为宜
  navigationLinks: true,
  footerLinks: true,
  breadcrumbs: true,

  // 避免的做法
  avoid: [
    'Too many exact match anchors',
    'Links in hidden content',
    'Reciprocal linking schemes',
    'Links to low-quality pages'
  ],

  // 推荐的做法
  recommend: [
    'Natural anchor text variety',
    'Contextual placement',
    'Link to high-value pages',
    'Use related keywords',
    'Deep linking to specific pages'
  ]
}
