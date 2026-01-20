// Utility functions for word manipulation and solving
import { ALL_WORDS, WORD_SET, DICTIONARY } from "./dictionary"
import { type DictionaryType, DEFAULT_DICTIONARY, calculateScore as calculateDictionaryScore } from "./dictionary-config"

// Re-export DictionaryType for external use
export type { DictionaryType }

export interface WordResult {
  word: string
  score: number
  length: number
}

export interface PositionConstraint {
  position: number // 0-based position
  letter: string // Required letter at this position
  exclude?: boolean // If true, this letter must NOT be at this position
}

/**
 * Unscrambles letters to find all valid words that can be formed
 * Supports wildcards: ? or _ can represent any letter
 * @param letters - The letters to unscramble (can include ? or _ as wildcards)
 * @param options - Optional settings (minLength, maxLength, mustContain, dictionaryType, positionConstraints)
 * @returns Array of words that can be formed from the letters
 */
export function unscrambleWord(
  letters: string,
  options?: {
    minLength?: number
    maxLength?: number
    mustContain?: string
    sortBy?: "length" | "score" | "alpha"
    dictionaryType?: DictionaryType
    positionConstraints?: PositionConstraint[]
  }
): WordResult[] {
  if (!letters || letters.trim().length === 0) {
    return []
  }

  const inputLower = letters.toLowerCase()

  // Check if input contains wildcards
  const containsWildcards = hasWildcards(inputLower)

  if (containsWildcards) {
    // Wildcard pattern matching mode
    // Extract only letters (not wildcards) for available letter counting
    const availableLetters = inputLower.replace(/[^a-z]/g, "")
    const letterCounts = countLetters(availableLetters)
    const pattern = inputLower.replace(/[^a-z?_]/g, "")

    // Find all valid words matching the pattern
    const validWords = ALL_WORDS.filter((word) => {
      // Apply length filters
      if (options?.minLength && word.length < options.minLength) return false
      if (options?.maxLength && word.length > options.maxLength) return false

      // Check if word must contain certain letters
      if (options?.mustContain) {
        const mustContainLower = options.mustContain.toLowerCase()
        if (!word.includes(mustContainLower)) return false
      }

      // Check position constraints
      if (!satisfiesPositionConstraints(word, options?.positionConstraints)) {
        return false
      }

      // Check if word matches the wildcard pattern
      return matchesWildcardPattern(word, pattern, letterCounts)
    })

    // Convert to WordResult objects
    const dictionaryType = options?.dictionaryType || DEFAULT_DICTIONARY
    const results: WordResult[] = validWords.map((word) => ({
      word,
      score: calculateDictionaryScore(word, dictionaryType),
      length: word.length,
    }))

    // Sort results
    const sortBy = options?.sortBy || "score"
    results.sort((a, b) => {
      if (sortBy === "score") return b.score - a.score
      if (sortBy === "length") return b.length - a.length
      return a.word.localeCompare(b.word)
    })

    return results
  } else {
    // Normal unscramble mode (original behavior)
    const normalizedLetters = inputLower.replace(/[^a-z]/g, "")
    const letterCounts = countLetters(normalizedLetters)

    // Find all valid words
    const validWords = ALL_WORDS.filter((word) => {
      // Apply length filters
      if (options?.minLength && word.length < options.minLength) return false
      if (options?.maxLength && word.length > options.maxLength) return false

      // Check if word must contain certain letters
      if (options?.mustContain) {
        const mustContainLower = options.mustContain.toLowerCase()
        if (!word.includes(mustContainLower)) return false
      }

      // Check position constraints
      if (!satisfiesPositionConstraints(word, options?.positionConstraints)) {
        return false
      }

      // Check if word can be formed from available letters
      return canFormWord(word, letterCounts)
    })

    // Convert to WordResult objects
    const dictionaryType = options?.dictionaryType || DEFAULT_DICTIONARY
    const results: WordResult[] = validWords.map((word) => ({
      word,
      score: calculateDictionaryScore(word, dictionaryType),
      length: word.length,
    }))

    // Sort results
    const sortBy = options?.sortBy || "score"
    results.sort((a, b) => {
      if (sortBy === "score") return b.score - a.score
      if (sortBy === "length") return b.length - a.length
      return a.word.localeCompare(b.word)
    })

    return results
  }
}

/**
 * Counts occurrences of each letter in a string
 */
function countLetters(str: string): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1
  }
  return counts
}

/**
 * Checks if a word can be formed from available letters
 */
function canFormWord(word: string, availableLetters: Record<string, number>): boolean {
  const wordCounts = countLetters(word)
  for (const [letter, count] of Object.entries(wordCounts)) {
    if (!availableLetters[letter] || availableLetters[letter] < count) {
      return false
    }
  }
  return true
}

/**
 * Checks if input contains wildcards (? or _)
 */
function hasWildcards(input: string): boolean {
  return input.includes("?") || input.includes("_")
}

/**
 * Checks if a word satisfies position constraints
 * @param word - The word to check
 * @param constraints - Array of position constraints
 * @returns true if word satisfies all constraints
 */
function satisfiesPositionConstraints(
  word: string,
  constraints: PositionConstraint[] | undefined
): boolean {
  if (!constraints || constraints.length === 0) {
    return true
  }

  for (const constraint of constraints) {
    const { position, letter, exclude } = constraint
    const normalizedLetter = letter.toLowerCase()

    // Position must be valid for this word
    if (position < 0 || position >= word.length) {
      continue // Skip invalid positions
    }

    const letterAtPosition = word[position]

    if (exclude) {
      // This letter must NOT be at this position
      if (letterAtPosition === normalizedLetter) {
        return false
      }
    } else {
      // This letter MUST be at this position
      if (letterAtPosition !== normalizedLetter) {
        return false
      }
    }
  }

  return true
}

/**
 * Matches a word against a pattern with wildcards
 * @param word - The word to check
 * @param pattern - Pattern with wildcards (? or _ for any letter)
 * @param availableLetters - Letters available for non-wildcard positions
 * @returns true if word matches the pattern
 */
function matchesWildcardPattern(
  word: string,
  pattern: string,
  availableLetters: Record<string, number>
): boolean {
  // Normalize pattern: convert ? to _
  const normalizedPattern = pattern.toLowerCase().replace(/\?/g, "_")

  // Word must match the pattern length
  if (word.length !== normalizedPattern.length) {
    return false
  }

  // Track which letters from availableLetters we've used
  const usedLetters: Record<string, number> = {}

  // Check each position
  for (let i = 0; i < normalizedPattern.length; i++) {
    const patternChar = normalizedPattern[i]
    const wordChar = word[i]

    if (patternChar === "_") {
      // Wildcard - any letter is allowed, no letter consumption needed
      continue
    } else if (patternChar === wordChar) {
      // Exact match required - consume this letter from available letters
      usedLetters[wordChar] = (usedLetters[wordChar] || 0) + 1

      // Check if we have enough of this letter
      if (usedLetters[wordChar] > (availableLetters[wordChar] || 0)) {
        return false
      }
    } else {
      // Pattern specifies a letter but word has different letter
      return false
    }
  }

  return true
}

/**
 * Generates anagrams for a given word
 * @param word - The word to find anagrams for
 * @returns Array of anagrams (excluding the original word)
 */
export function generateAnagrams(word: string): string[] {
  if (!word || word.trim().length === 0) {
    return []
  }

  const normalizedWord = word.toLowerCase().replace(/[^a-z]/g, "")
  const wordLetterCounts = countLetters(normalizedWord)

  // Find all words that are anagrams (same letters, same counts)
  const anagrams = ALL_WORDS.filter((dictWord) => {
    if (dictWord === normalizedWord) return false // Exclude the original word
    if (dictWord.length !== normalizedWord.length) return false

    const dictLetterCounts = countLetters(dictWord)

    // Check if letter counts match exactly
    for (const letter of Object.keys(wordLetterCounts)) {
      if (wordLetterCounts[letter] !== dictLetterCounts[letter]) {
        return false
      }
    }

    // Check if all letters are accounted for
    for (const letter of Object.keys(dictLetterCounts)) {
      if (!wordLetterCounts[letter]) {
        return false
      }
    }

    return true
  })

  return anagrams
}

/**
 * Calculates Scrabble score for a word
 */
export function calculateScrabbleScore(word: string): number {
  const letterValues: Record<string, number> = {
    a: 1,
    b: 3,
    c: 3,
    d: 2,
    e: 1,
    f: 4,
    g: 2,
    h: 4,
    i: 1,
    j: 8,
    k: 5,
    l: 1,
    m: 3,
    n: 1,
    o: 1,
    p: 3,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 1,
    v: 4,
    w: 4,
    x: 8,
    y: 4,
    z: 10,
  }

  return word
    .toLowerCase()
    .split("")
    .reduce((sum, letter) => sum + (letterValues[letter] || 0), 0)
}

/**
 * Filters words by length
 */
export function filterWordsByLength(words: string[], length: number): string[] {
  return words.filter((word) => word.length === length)
}

/**
 * Gets words by specific length from dictionary
 */
export function getWordsByLength(length: number): string[] {
  return DICTIONARY[length] || []
}

/**
 * Searches for words that start with a specific pattern
 */
export function searchWordsByPattern(pattern: string, length?: number): string[] {
  const normalizedPattern = pattern.toLowerCase()
  let words = ALL_WORDS.filter((word) => word.startsWith(normalizedPattern))

  if (length) {
    words = words.filter((word) => word.length === length)
  }

  return words.slice(0, 100) // Limit results
}

/**
 * Searches for words that contain specific letters
 */
export function searchWordsWithLetters(letters: string, exactMatch = false): string[] {
  const normalizedLetters = letters.toLowerCase().replace(/[^a-z]/g, "")

  if (exactMatch) {
    // Find words using exactly these letters (anagrams of substring)
    const letterCounts = countLetters(normalizedLetters)
    return ALL_WORDS.filter((word) => canFormWord(word, letterCounts)).slice(0, 100)
  } else {
    // Find words containing all these letters
    return ALL_WORDS.filter((word) => {
      return normalizedLetters.split("").every((letter) => word.includes(letter))
    }).slice(0, 100)
  }
}

/**
 * Validates if a word exists in the dictionary
 */
export function isValidWord(word: string): boolean {
  return WORD_SET.has(word.toLowerCase())
}

/**
 * Wordle solver - finds words matching a pattern with known/excluded letters
 * @param pattern - Pattern with known letters (use _ for unknown, e.g., "h_ll_")
 * @param includedLetters - Letters that must be in the word
 * @param excludedLetters - Letters that must not be in the word
 * @returns Array of matching words
 */
export function solveWordle(
  pattern: string,
  includedLetters: string = "",
  excludedLetters: string = ""
): string[] {
  const patternLength = pattern.length
  const included = includedLetters.toLowerCase().split("")
  const excluded = excludedLetters.toLowerCase().split("")

  const words = getWordsByLength(patternLength).filter((word) => {
    // Check pattern match
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== "_" && pattern[i].toLowerCase() !== word[i]) {
        return false
      }
    }

    // Check included letters
    for (const letter of included) {
      if (!word.includes(letter)) {
        return false
      }
    }

    // Check excluded letters
    for (const letter of excluded) {
      if (word.includes(letter)) {
        return false
      }
    }

    return true
  })

  return words
}

/**
 * Gets word definition (placeholder - would integrate with dictionary API)
 */
export function getWordDefinition(word: string): string {
  // This would typically call a dictionary API
  // For now, return a placeholder
  return `Definition of "${word}" - This word is in the dictionary.`
}
