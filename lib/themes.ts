/**
 * Differentiated Design System
 *
 * Implements distinct visual styles for different tool categories
 * to create memorable, context-specific user experiences.
 *
 * Based on UX Pro Max design principles:
 * - Bold, intentional aesthetic directions
 * - Category-specific character
 * - Consistent within categories, distinct between them
 */

export type ToolCategory = 'gaming' | 'creative' | 'learning' | 'solving'

export interface ThemeConfig {
  name: string
  description: string
  style: string
  colors: {
    primary: string
    primaryForeground: string
    accent: string
    accentForeground: string
    gradient: string
  }
  typography: {
    headingFont: string
    bodyFont: string
    monoFont: string
  }
  effects: {
    cardStyle: string
    hoverEffect: string
    shadowStyle: string
    borderStyle: string
  }
  animations: {
    duration: string
    easing: string
    hover: string
  }
}

/**
 * Gaming Category Theme - Brutalism
 *
 * For: Scrabble, Wordle, Words with Friends, etc.
 * Style: High contrast, bold, game-like, competitive
 * Inspiration: Arcade games, scoreboards, competition
 */
export const gamingTheme: ThemeConfig = {
  name: 'Gaming Brutalism',
  description: 'Bold, high-contrast design for competitive word games',
  style: 'brutalism',

  colors: {
    primary: 'oklch(0.5 0.2 260)',           // Deep purple
    primaryForeground: 'oklch(1 0 0)',       // White
    accent: 'oklch(0.7 0.25 40)',            // Bold orange
    accentForeground: 'oklch(0.1 0 0)',      // Nearly black
    gradient: 'linear-gradient(135deg, oklch(0.5 0.2 260) 0%, oklch(0.6 0.22 280) 100%)'
  },

  typography: {
    headingFont: 'font-bold uppercase tracking-tight',
    bodyFont: 'font-medium',
    monoFont: 'font-mono font-bold'
  },

  effects: {
    cardStyle: 'border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    hoverEffect: 'hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    shadowStyle: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]',
    borderStyle: 'border-4 border-foreground'
  },

  animations: {
    duration: 'duration-100',
    easing: 'ease-linear',
    hover: 'transition-all duration-100 ease-linear'
  }
}

/**
 * Creative Category Theme - Aurora UI
 *
 * For: Word Generator, Word Scramble, etc.
 * Style: Vibrant gradients, flowing, imaginative
 * Inspiration: Northern lights, creativity, expression
 */
export const creativeTheme: ThemeConfig = {
  name: 'Aurora Creative',
  description: 'Vibrant, flowing design for creative word tools',
  style: 'aurora',

  colors: {
    primary: 'oklch(0.55 0.18 40)',          // Warm orange
    primaryForeground: 'oklch(1 0 0)',       // White
    accent: 'oklch(0.65 0.20 320)',          // Magenta
    accentForeground: 'oklch(1 0 0)',        // White
    gradient: 'linear-gradient(135deg, oklch(0.55 0.18 40) 0%, oklch(0.65 0.20 320) 50%, oklch(0.60 0.22 280) 100%)'
  },

  typography: {
    headingFont: 'font-bold tracking-normal',
    bodyFont: 'font-normal',
    monoFont: 'font-mono'
  },

  effects: {
    cardStyle: 'border border-primary/20 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md shadow-2xl',
    hoverEffect: 'hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-primary/40',
    shadowStyle: 'shadow-2xl shadow-primary/10',
    borderStyle: 'border border-primary/20'
  },

  animations: {
    duration: 'duration-300',
    easing: 'ease-out',
    hover: 'transition-all duration-300 ease-out'
  }
}

/**
 * Learning Category Theme - Clean Minimalism
 *
 * For: Word lists (2-10 letters), reference pages
 * Style: Clean, educational, accessible
 * Inspiration: Textbooks, learning materials, clarity
 */
export const learningTheme: ThemeConfig = {
  name: 'Educational Minimalism',
  description: 'Clean, focused design for learning tools',
  style: 'minimalism',

  colors: {
    primary: 'oklch(0.6 0.15 150)',          // Calm green
    primaryForeground: 'oklch(1 0 0)',       // White
    accent: 'oklch(0.65 0.18 180)',          // Teal
    accentForeground: 'oklch(0.98 0 0)',     // Off-white
    gradient: 'linear-gradient(135deg, oklch(0.6 0.15 150) 0%, oklch(0.65 0.18 180) 100%)'
  },

  typography: {
    headingFont: 'font-semibold tracking-tight',
    bodyFont: 'font-normal',
    monoFont: 'font-mono font-medium'
  },

  effects: {
    cardStyle: 'border border-border bg-card shadow-sm',
    hoverEffect: 'hover:shadow-md hover:border-primary/50',
    shadowStyle: 'shadow-sm',
    borderStyle: 'border border-border'
  },

  animations: {
    duration: 'duration-200',
    easing: 'ease-in-out',
    hover: 'transition-all duration-200 ease-in-out'
  }
}

/**
 * Solving Category Theme - Swiss Modernism
 *
 * For: Word Unscrambler, Anagram Solver, etc.
 * Style: Systematic, grid-based, analytical
 * Inspiration: Swiss design, precision, logic
 */
export const solvingTheme: ThemeConfig = {
  name: 'Swiss Precision',
  description: 'Systematic, grid-based design for puzzle solvers',
  style: 'swiss-modernism',

  colors: {
    primary: 'oklch(0.5 0.18 220)',          // Cool blue
    primaryForeground: 'oklch(1 0 0)',       // White
    accent: 'oklch(0.45 0.15 240)',          // Deep blue
    accentForeground: 'oklch(1 0 0)',        // White
    gradient: 'linear-gradient(135deg, oklch(0.5 0.18 220) 0%, oklch(0.45 0.15 240) 100%)'
  },

  typography: {
    headingFont: 'font-bold tracking-tight',
    bodyFont: 'font-normal',
    monoFont: 'font-mono font-normal'
  },

  effects: {
    cardStyle: 'border border-border bg-card shadow-md',
    hoverEffect: 'hover:shadow-lg hover:border-primary/30',
    shadowStyle: 'shadow-md',
    borderStyle: 'border border-border'
  },

  animations: {
    duration: 'duration-150',
    easing: 'ease-in-out',
    hover: 'transition-all duration-150 ease-in-out'
  }
}

/**
 * Theme map for easy access
 */
export const themes: Record<ToolCategory, ThemeConfig> = {
  gaming: gamingTheme,
  creative: creativeTheme,
  learning: learningTheme,
  solving: solvingTheme
}

/**
 * Get theme for a specific tool path
 */
export function getThemeForTool(toolPath: string): ThemeConfig {
  // Import brand config to get category
  const categories = {
    gaming: ['scrabble', 'scrabble-cheat', 'scrabble-go', 'wordle', 'wordle-solver', 'wordscapes', 'words-with-friends', 'wordfeud', 'word-cookies'],
    creative: ['word-generator', 'word-scramble', 'anagram-solver'],
    learning: ['2-letter-words', '3-letter-words', '4-letter-words', '5-letter-words', '6-letter-words', '7-letter-words', '8-letter-words', '9-letter-words', '10-letter-words', 'words-by-length', 'words-start-with', 'words-with-letters'],
    solving: ['word-unscrambler', 'unscramble', 'descrambler', 'word-solver', 'word-finder', 'jumble-solver']
  }

  for (const [category, tools] of Object.entries(categories)) {
    if (tools.includes(toolPath)) {
      return themes[category as ToolCategory]
    }
  }

  // Default to creative theme
  return creativeTheme
}

/**
 * Helper to generate CSS classes from theme
 */
export function getThemeClasses(theme: ThemeConfig) {
  return {
    heading: theme.typography.headingFont,
    body: theme.typography.bodyFont,
    mono: theme.typography.monoFont,
    card: `${theme.effects.cardStyle} ${theme.animations.hover}`,
    cardHover: theme.effects.hoverEffect,
    shadow: theme.effects.shadowStyle,
    border: theme.effects.borderStyle,
    gradient: theme.colors.gradient
  }
}

/**
 * Generate inline styles for theme colors
 */
export function getThemeStyles(theme: ThemeConfig): React.CSSProperties {
  return {
    '--theme-primary': theme.colors.primary,
    '--theme-primary-foreground': theme.colors.primaryForeground,
    '--theme-accent': theme.colors.accent,
    '--theme-accent-foreground': theme.colors.accentForeground,
    '--theme-gradient': theme.colors.gradient,
  } as React.CSSProperties
}

/**
 * React hook to get current page theme
 */
export function usePageTheme(pathname: string): ThemeConfig {
  // Extract tool name from pathname (e.g., "/word-generator" -> "word-generator")
  const toolPath = pathname.split('/').filter(Boolean)[0] || ''
  return getThemeForTool(toolPath)
}
