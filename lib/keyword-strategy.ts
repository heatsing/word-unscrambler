/**
 * 关键词策略和内容规划
 * 90天SEO关键词发布策略
 */

export const keywordCategories = {
  // Tier 1: 高搜索量主关键词 (Primary Keywords)
  primary: {
    // Broad keywords - High volume, high competition
    broad: [
      { keyword: 'word unscrambler', volume: 'high', difficulty: 'medium', intent: 'transactional' },
      { keyword: 'wordle solver', volume: 'high', difficulty: 'medium', intent: 'transactional' },
      { keyword: 'anagram solver', volume: 'high', difficulty: 'medium', intent: 'transactional' },
      { keyword: 'scrabble word finder', volume: 'high', difficulty: 'high', intent: 'transactional' },
      { keyword: 'words with friends cheat', volume: 'high', difficulty: 'high', intent: 'transactional' },
    ],
  },

  // Tier 2: 中等搜索量次关键词 (Secondary Keywords)
  secondary: {
    // Tool-specific keywords
    toolSpecific: [
      { keyword: 'wordle helper', volume: 'medium', difficulty: 'medium', intent: 'transactional' },
      { keyword: 'unscramble letters', volume: 'medium', difficulty: 'low', intent: 'transactional' },
      { keyword: 'jumble solver', volume: 'medium', difficulty: 'low', intent: 'transactional' },
      { keyword: 'boggle solver', volume: 'medium', difficulty: 'low', intent: 'transactional' },
      { keyword: 'crossword solver', volume: 'medium', difficulty: 'medium', intent: 'transactional' },
    ],

    // Feature keywords
    features: [
      { keyword: '5 letter words', volume: 'high', difficulty: 'medium', intent: 'informational' },
      { keyword: '7 letter words', volume: 'medium', difficulty: 'medium', intent: 'informational' },
      { keyword: 'words ending in', volume: 'medium', difficulty: 'low', intent: 'informational' },
      { keyword: 'words starting with', volume: 'medium', difficulty: 'low', intent: 'informational' },
    ],
  },

  // Tier 3: 长尾关键词 (Long-tail Keywords)
  longTail: {
    // High intent, lower competition
    wordle: [
      { keyword: 'wordle answer today', volume: 'high', difficulty: 'high', intent: 'informational' },
      { keyword: 'best wordle starting words', volume: 'medium', difficulty: 'low', intent: 'informational' },
      { keyword: 'wordle words with e', volume: 'low', difficulty: 'low', intent: 'informational' },
      { keyword: '5 letter words starting with a', volume: 'medium', difficulty: 'low', intent: 'informational' },
      { keyword: '5 letter words ending with e', volume: 'medium', difficulty: 'low', intent: 'informational' },
    ],

    scrabble: [
      { keyword: 'high scoring scrabble words', volume: 'medium', difficulty: 'medium', intent: 'informational' },
      { keyword: '7 letter words for scrabble', volume: 'low', difficulty: 'low', intent: 'informational' },
      { keyword: 'scrabble words with q', volume: 'low', difficulty: 'low', intent: 'informational' },
      { keyword: 'two letter scrabble words', volume: 'medium', difficulty: 'low', intent: 'informational' },
    ],

    general: [
      { keyword: 'how to unscramble letters', volume: 'low', difficulty: 'low', intent: 'informational' },
      { keyword: 'anagram generator from letters', volume: 'low', difficulty: 'low', intent: 'transactional' },
      { keyword: 'word finder by letters', volume: 'low', difficulty: 'low', intent: 'transactional' },
    ],
  },
}

// 90天关键词发布策略
export const ninetyDayStrategy = {
  phase1: {
    days: '1-30',
    focus: 'Foundation & High-Value Pages',
    keywords: [
      'word unscrambler',
      'wordle solver',
      'anagram solver',
      '5 letter words',
      'scrabble word finder'
    ],
    pages: [
      'Home page optimization',
      'Word Unscrambler tool',
      'Wordle Solver tool',
      'Anagram Solver tool',
      '5 Letter Words page'
    ],
    goals: [
      'Establish core tool pages',
      'Optimize main metadata',
      'Build internal linking structure',
      'Create foundational content'
    ]
  },

  phase2: {
    days: '31-60',
    focus: 'Content Expansion & Long-tail Keywords',
    keywords: [
      '5 letter words starting with [a-z]',
      '7 letter words',
      'words ending in [common endings]',
      'wordle helper',
      'scrabble cheat'
    ],
    pages: [
      'All letter-specific pages',
      '7 Letter Words pages',
      'Words Ending In pages',
      'Game-specific helpers'
    ],
    goals: [
      'Launch 700+ dynamic pages',
      'Target long-tail keywords',
      'Expand content depth',
      'Build topic clusters'
    ]
  },

  phase3: {
    days: '61-90',
    focus: 'Content Quality & User Engagement',
    keywords: [
      'best wordle starting words',
      'how to win at scrabble',
      'wordle strategy',
      'scrabble tips'
    ],
    pages: [
      'Strategy guides',
      'FAQ pages',
      'Tips & tricks content',
      'Game-specific guides'
    ],
    goals: [
      'Add educational content',
      'Improve user engagement',
      'Build authority',
      'Earn backlinks'
    ]
  }
}

// 页面H1/H2/H3标题模板
export const headingTemplates = {
  toolPages: {
    h1: '{Tool Name} - {Primary Benefit} | Word Unscrambler',
    h2: [
      'How to Use the {Tool Name}',
      'Why Use Our {Tool Name}?',
      'Features & Benefits',
      '{Tool Name} Tips & Tricks',
      'Frequently Asked Questions'
    ],
    h3: [
      'Step 1: Enter Your Letters',
      'Step 2: Apply Filters',
      'Step 3: Find Words',
      'Advanced Options',
      'Common Questions'
    ]
  },

  wordListPages: {
    h1: '{Length} Letter Words {Filter} {Letter} - Complete List',
    h2: [
      'Complete {Length} Letter Words List',
      'How to Use {Length} Letter Words',
      'Popular {Length} Letter Words',
      'Browse by Letter',
      'Related Word Lists'
    ],
    h3: [
      'Common {Length} Letter Words',
      'High-Scoring Words',
      'Words for Wordle',
      'Words for Scrabble',
      'More Word Finders'
    ]
  },

  categoryPages: {
    h1: '{Category Name} - Find Words {By/With/Starting/Ending}',
    h2: [
      'Browse {Category} by Letter',
      'How to Find Words {Filter}',
      'Popular Searches',
      'Related Categories',
      'Word Game Tools'
    ],
    h3: [
      'Most Common {Filter}',
      'Tips for Finding Words',
      'Word Game Strategies',
      'Additional Resources'
    ]
  }
}

// 搜索意图分类
export const searchIntent = {
  informational: [
    '5 letter words',
    'words ending in',
    'what are anagrams',
    'how to play wordle',
    'scrabble rules'
  ],

  transactional: [
    'word unscrambler',
    'wordle solver',
    'scrabble cheat',
    'find words',
    'unscramble letters'
  ],

  navigational: [
    'wordunscrambler.cc',
    'word unscrambler tool',
    'wordle helper site'
  ],

  commercial: [
    'best wordle solver',
    'top scrabble word finder',
    'free anagram solver'
  ]
}

// 内容优化检查清单
export const contentOptimizationChecklist = {
  onPage: [
    'Unique H1 with primary keyword',
    'H2/H3 with secondary keywords',
    'Primary keyword in first 100 words',
    'LSI keywords throughout content',
    'Internal links to related pages',
    'External links to authority sites',
    'Alt text for images',
    'Meta description 120-160 chars',
    'Title tag 50-60 chars',
    'URL includes target keyword'
  ],

  content: [
    'Minimum 300 words',
    'Answer user intent',
    'Include examples',
    'Add FAQ section',
    'Use bullet points/lists',
    'Break up text with headings',
    'Add call-to-action',
    'Include related tools/links'
  ],

  technical: [
    'Mobile responsive',
    'Fast loading speed',
    'HTTPS enabled',
    'Structured data markup',
    'Canonical tag',
    'Robots meta tag',
    'XML sitemap inclusion',
    'Clean URL structure'
  ]
}
