/**
 * Pre-configured data transparency content for all tool pages
 * Import and use these configs to maintain consistency across the site
 */

import type { DictionarySource, ScoringRule } from '@/components/data-transparency'

// ============================================================================
// DICTIONARY SOURCES (Reusable)
// ============================================================================

export const SOWPODS: DictionarySource = {
  name: "Collins Scrabble Words",
  abbreviation: "SOWPODS",
  description: "Official international Scrabble tournament dictionary combining British and American English.",
  wordCount: "~267,000",
  usage: "International Scrabble tournaments and competitions",
}

export const TWL: DictionarySource = {
  name: "Tournament Word List",
  abbreviation: "TWL",
  description: "Official North American Scrabble dictionary maintained by Merriam-Webster.",
  wordCount: "~187,000",
  usage: "North American Scrabble tournaments (USA, Canada)",
}

export const ENABLE: DictionarySource = {
  name: "Enhanced North American Benchmark Lexicon",
  abbreviation: "ENABLE",
  description: "Public domain word list widely used in word games and puzzles for validation.",
  wordCount: "172,000+",
  usage: "Cross-reference validation and extended word matching",
}

export const WEBSTER: DictionarySource = {
  name: "Webster's Dictionary",
  abbreviation: "WEBSTER",
  description: "Authoritative American English dictionary for contemporary usage validation.",
  wordCount: "470,000+",
  usage: "Common usage verification and spelling validation",
}

export const WORDLE_OFFICIAL: DictionarySource = {
  name: "Wordle Official Dictionary",
  abbreviation: "WORDLE",
  description: "Official word list maintained by The New York Times for daily Wordle puzzles.",
  wordCount: "~2,300",
  usage: "Daily Wordle answers (curated common words)",
}

export const WORDLE_VALID: DictionarySource = {
  name: "Valid Guess List",
  abbreviation: "VALID",
  description: "Extended list of all acceptable 5-letter words for Wordle guesses.",
  wordCount: "~12,900",
  usage: "All valid guesses (comprehensive word list)",
}

// ============================================================================
// SCORING RULES (Reusable)
// ============================================================================

export const SCRABBLE_SCORING: ScoringRule[] = [
  { value: 1, letters: "A E I O U L N S T R", count: 10 },
  { value: 2, letters: "D G", count: 2 },
  { value: 3, letters: "B C M P", count: 4 },
  { value: 4, letters: "F H V W Y", count: 5 },
  { value: 5, letters: "K", count: 1 },
  { value: 8, letters: "J X", count: 2 },
  { value: 10, letters: "Q Z", count: 2 },
]

export const WWF_SCORING: ScoringRule[] = [
  { value: 1, letters: "A E I O N R T", count: 7 },
  { value: 2, letters: "D L S U", count: 4 },
  { value: 3, letters: "G H Y", count: 3 },
  { value: 4, letters: "B C F M P W", count: 6 },
  { value: 5, letters: "K V", count: 2 },
  { value: 8, letters: "J X", count: 2 },
  { value: 10, letters: "Q Z", count: 2 },
]

// ============================================================================
// PRE-CONFIGURED TOOL CONFIGS
// ============================================================================

/**
 * Word Unscrambler Data Transparency Config
 */
export const WORD_UNSCRAMBLER_CONFIG = {
  toolName: "Word Unscrambler",
  dictionaries: [SOWPODS, TWL, ENABLE, WEBSTER],
  totalWords: "270,000+",
  validationRules: [
    "Letter frequency matching - verifies words can be formed using only available letters with correct quantities",
    "Dictionary cross-reference - validates word existence in multiple authoritative sources",
    "Length filtering - applies user-specified minimum and maximum letter constraints",
    "Pattern matching - supports wildcard characters, position-specific letters, and required letters",
    "Score calculation - computes Scrabble point values using official letter scoring system",
    "Alphabetical and score-based sorting - results ranked by strategic value or alphabetically",
  ],
  lastUpdated: "January 2025",
  updateFrequency: "Quarterly (synchronized with official dictionary updates)",
}

/**
 * Scrabble Word Finder Data Transparency Config
 */
export const SCRABBLE_CONFIG = {
  toolName: "Scrabble Word Finder",
  dictionaries: [SOWPODS, TWL],
  totalWords: "270,000+",
  scoringRules: SCRABBLE_SCORING,
  validationRules: [
    "Rack letter validation - ensures words use only letters from your 7-tile rack",
    "Blank tile support - wildcard tiles can substitute for any letter (0 points)",
    "Dictionary compliance - all words validated against SOWPODS and TWL official lists",
    "Point calculation - accurate scoring based on official Scrabble letter values",
    "Length optimization - words sorted by point value to maximize your score",
    "Cross-word validation - supports board position and existing letter constraints",
  ],
  lastUpdated: "January 2025",
  updateFrequency: "Biannually (synced with Collins and TWL dictionary releases)",
}

/**
 * Words with Friends Data Transparency Config
 */
export const WWF_CONFIG = {
  toolName: "Words with Friends Finder",
  dictionaries: [
    {
      name: "Words with Friends Dictionary",
      abbreviation: "WWF",
      description: "Official Zynga word list for Words with Friends gameplay.",
      wordCount: "~173,000",
      usage: "Words with Friends mobile game",
    },
    ENABLE,
  ],
  totalWords: "173,000+",
  scoringRules: WWF_SCORING,
  validationRules: [
    "WWF-specific dictionary - uses official Zynga word list (differs from Scrabble)",
    "Tile rack validation - verifies words can be formed from your available tiles",
    "Point calculation - uses Words with Friends scoring system (different from Scrabble)",
    "Blank tile handling - supports wildcard tiles with zero point value",
    "Length and pattern filtering - allows constraints for specific board positions",
    "Strategic scoring - results sorted by point value for optimal play",
  ],
  lastUpdated: "January 2025",
  updateFrequency: "As needed (when Zynga updates official word list)",
}

/**
 * Wordle Solver Data Transparency Config
 */
export const WORDLE_CONFIG = {
  toolName: "Wordle Solver",
  dictionaries: [WORDLE_OFFICIAL, WORDLE_VALID, ENABLE],
  totalWords: "15,000+",
  validationRules: [
    "Exact length matching - only 5-letter words are considered for Wordle solutions",
    "Position validation - green letters must match exact positions in candidate words",
    "Inclusion check - yellow letters must exist in word but not in marked positions",
    "Exclusion filtering - gray letters are completely removed from candidate pool",
    "Dictionary cross-reference - all results validated against official Wordle word lists",
    "Frequency ranking - words sorted by common usage patterns from NYT Wordle answers",
  ],
  lastUpdated: "January 2025",
  updateFrequency: "Monthly (synced with NYT Wordle updates)",
}

/**
 * Anagram Solver Data Transparency Config
 */
export const ANAGRAM_CONFIG = {
  toolName: "Anagram Solver",
  dictionaries: [SOWPODS, TWL, ENABLE, WEBSTER],
  totalWords: "270,000+",
  validationRules: [
    "Exact letter matching - anagrams must use all input letters exactly once",
    "Permutation generation - explores all possible letter arrangements efficiently",
    "Dictionary validation - checks each permutation against comprehensive word lists",
    "Length preservation - anagrams maintain exact length of input phrase",
    "Multi-word support - identifies both single-word and phrase anagrams",
    "Alphabetical sorting - results organized for easy browsing",
  ],
  lastUpdated: "January 2025",
  updateFrequency: "Quarterly",
}

/**
 * Jumble Solver Data Transparency Config
 */
export const JUMBLE_CONFIG = {
  toolName: "Jumble Solver",
  dictionaries: [WEBSTER, ENABLE, SOWPODS],
  totalWords: "270,000+",
  validationRules: [
    "Unscrambling algorithm - finds all valid words from scrambled letters",
    "Common word priority - sorts results by word frequency and familiarity",
    "Pattern recognition - identifies potential jumble puzzle solutions",
    "Length grouping - organizes results by word length for easier scanning",
    "Dictionary coverage - validates against multiple authoritative sources",
    "Quick lookup optimization - instant results for common jumble patterns",
  ],
  lastUpdated: "January 2025",
  updateFrequency: "Quarterly",
}
