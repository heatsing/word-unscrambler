/**
 * Brand Identity System
 * Unified branding configuration for consistent user experience
 */

export const brandConfig = {
  // Core Identity
  identity: {
    name: "WordCraft Studio",
    tagline: "Where Words Come Alive",
    mission: "Empowering word enthusiasts with intelligent tools for games, creativity, and learning",
    description: "Your complete toolkit for word puzzles, games, and linguistic exploration"
  },

  // Brand Voice & Tone
  voice: {
    personality: ["intelligent", "playful", "helpful", "approachable"],
    tone: ["educational", "friendly", "inspiring", "precise"],
    avoid: ["condescending", "overly-technical", "boring", "generic"]
  },

  // Visual Identity
  colors: {
    // Primary palette (already in use)
    primary: "oklch(0.45 0.18 260)", // Purple
    primaryForeground: "oklch(0.98 0.005 240)",

    // Semantic colors for different tool categories
    categories: {
      gaming: {
        color: "oklch(0.5 0.2 260)",     // Purple (Scrabble, Wordle)
        description: "Competitive & Strategic"
      },
      creative: {
        color: "oklch(0.55 0.18 40)",     // Orange (Generator, Scrambler)
        description: "Imaginative & Expressive"
      },
      learning: {
        color: "oklch(0.6 0.15 150)",    // Green (Word Lists, Finder)
        description: "Educational & Growing"
      },
      solving: {
        color: "oklch(0.5 0.18 220)",    // Blue (Anagram, Unscrambler)
        description: "Analytical & Logical"
      }
    }
  },

  // Typography
  typography: {
    display: {
      family: "Geist",
      fallback: "system-ui, -apple-system, sans-serif",
      usage: "Headings, hero sections, branding"
    },
    body: {
      family: "Geist",
      fallback: "system-ui, -apple-system, sans-serif",
      usage: "Body text, descriptions, UI elements"
    },
    mono: {
      family: "Geist Mono",
      fallback: "ui-monospace, monospace",
      usage: "Code, technical content, word displays"
    }
  },

  // Tool Categories
  categories: {
    gaming: {
      name: "Game Helpers",
      description: "Dominate your favorite word games",
      icon: "🎮",
      tools: ["scrabble", "scrabble-cheat", "scrabble-go", "wordle", "wordle-solver", "wordscapes", "words-with-friends", "wordfeud", "word-cookies"]
    },
    creative: {
      name: "Creative Tools",
      description: "Generate and explore words creatively",
      icon: "✨",
      tools: ["word-generator", "word-scramble", "anagram-solver"]
    },
    learning: {
      name: "Learning & Reference",
      description: "Build your vocabulary and knowledge",
      icon: "📚",
      tools: ["2-letter-words", "3-letter-words", "4-letter-words", "5-letter-words", "6-letter-words", "7-letter-words", "8-letter-words", "9-letter-words", "10-letter-words", "words-by-length", "words-start-with", "words-with-letters"]
    },
    solving: {
      name: "Puzzle Solvers",
      description: "Solve any word puzzle or challenge",
      icon: "🧩",
      tools: ["word-unscrambler", "unscramble", "descrambler", "word-solver", "word-finder", "jumble-solver"]
    }
  },

  // SEO & Marketing
  seo: {
    defaultTitle: "WordCraft Studio - Professional Word Game Tools & Solvers",
    defaultDescription: "The ultimate collection of word tools for Scrabble, Wordle, crosswords, and more. Find words, solve puzzles, and enhance your vocabulary with our intelligent word finder.",
    keywords: [
      "word unscrambler",
      "scrabble word finder",
      "wordle solver",
      "anagram solver",
      "word generator",
      "crossword helper",
      "word game tools",
      "vocabulary builder"
    ]
  },

  // Social Links (when implemented)
  social: {
    twitter: undefined,
    facebook: undefined,
    github: "https://github.com/heatsing/word-unscrambler"
  },

  // Feature Highlights
  features: [
    {
      title: "Comprehensive Dictionary",
      description: "Access thousands of valid words from 2 to 15 letters",
      icon: "📖"
    },
    {
      title: "Smart Algorithms",
      description: "Powerful scoring and filtering for optimal results",
      icon: "🧠"
    },
    {
      title: "Multiple Games",
      description: "Support for Scrabble, Wordle, Words with Friends, and more",
      icon: "🎯"
    },
    {
      title: "Fast & Free",
      description: "Lightning-fast results with no registration required",
      icon: "⚡"
    }
  ]
} as const

// Helper function to get category for a tool
export function getToolCategory(toolPath: string): keyof typeof brandConfig.categories | undefined {
  for (const [category, config] of Object.entries(brandConfig.categories)) {
    if (config.tools.includes(toolPath)) {
      return category as keyof typeof brandConfig.categories
    }
  }
  return undefined
}

// Helper function to get category color
export function getCategoryColor(toolPath: string): string {
  const category = getToolCategory(toolPath)
  if (category) {
    return brandConfig.colors.categories[category].color
  }
  return brandConfig.colors.primary
}

// Helper function to format page title
export function formatPageTitle(pageTitle: string): string {
  return `${pageTitle} | ${brandConfig.identity.name}`
}

// Helper function to get category description
export function getCategoryDescription(toolPath: string): string {
  const category = getToolCategory(toolPath)
  if (category) {
    return brandConfig.colors.categories[category].description
  }
  return "Word Tool"
}
