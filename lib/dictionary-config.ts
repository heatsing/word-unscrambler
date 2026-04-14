/**
 * Dictionary configurations for different word games
 * Each game has different letter values and rules
 */

export type DictionaryType = "scrabble-us" | "scrabble-uk" | "words-with-friends" | "wordfeud" | "general"

export interface DictionaryConfig {
  id: DictionaryType
  name: string
  description: string
  letterValues: Record<string, number>
}

/**
 * Scrabble (US/International) letter values
 */
const scrabbleUSValues: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8,
  k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1,
  u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
}

/**
 * Scrabble UK uses the same values as US
 */
const scrabbleUKValues: Record<string, number> = {
  ...scrabbleUSValues,
}

/**
 * Words with Friends has different letter values
 */
const wordsWithFriendsValues: Record<string, number> = {
  a: 1, b: 4, c: 4, d: 2, e: 1, f: 4, g: 3, h: 3, i: 1, j: 10,
  k: 5, l: 2, m: 4, n: 2, o: 1, p: 4, q: 10, r: 1, s: 1, t: 1,
  u: 2, v: 5, w: 4, x: 8, y: 3, z: 10,
}

/**
 * Wordfeud has its own unique scoring system
 */
const wordfeudValues: Record<string, number> = {
  a: 1, b: 4, c: 4, d: 2, e: 1, f: 4, g: 3, h: 4, i: 1, j: 10,
  k: 5, l: 1, m: 3, n: 1, o: 1, p: 4, q: 10, r: 1, s: 1, t: 1,
  u: 2, v: 4, w: 4, x: 8, y: 4, z: 10,
}

/**
 * General dictionary (same as Scrabble US)
 */
const generalValues: Record<string, number> = {
  ...scrabbleUSValues,
}

/**
 * Available dictionaries configuration
 */
export const DICTIONARIES: Record<DictionaryType, DictionaryConfig> = {
  "scrabble-us": {
    id: "scrabble-us",
    name: "Scrabble (US)",
    description: "Official Scrabble US/International dictionary",
    letterValues: scrabbleUSValues,
  },
  "scrabble-uk": {
    id: "scrabble-uk",
    name: "Scrabble (UK)",
    description: "British Scrabble dictionary",
    letterValues: scrabbleUKValues,
  },
  "words-with-friends": {
    id: "words-with-friends",
    name: "Words with Friends",
    description: "Zynga's Words with Friends scoring",
    letterValues: wordsWithFriendsValues,
  },
  "wordfeud": {
    id: "wordfeud",
    name: "Wordfeud",
    description: "Wordfeud game scoring",
    letterValues: wordfeudValues,
  },
  "general": {
    id: "general",
    name: "General",
    description: "Standard English dictionary",
    letterValues: generalValues,
  },
}

/**
 * Default dictionary
 */
export const DEFAULT_DICTIONARY: DictionaryType = "scrabble-us"

/**
 * Get dictionary configuration by ID
 */
export function getDictionaryConfig(id: DictionaryType): DictionaryConfig {
  return DICTIONARIES[id] || DICTIONARIES[DEFAULT_DICTIONARY]
}

/**
 * Calculate word score based on dictionary type
 */
export function calculateScore(word: string, dictionaryType: DictionaryType = DEFAULT_DICTIONARY): number {
  const config = getDictionaryConfig(dictionaryType)
  return word
    .toLowerCase()
    .split("")
    .reduce((sum, letter) => sum + (config.letterValues[letter] || 0), 0)
}

/**
 * Get list of all available dictionaries
 */
export function getAvailableDictionaries(): DictionaryConfig[] {
  return Object.values(DICTIONARIES)
}
