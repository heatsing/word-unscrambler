/**
 * Optimized Dictionary Index
 *
 * This module provides a backward-compatible interface while enabling
 * progressive loading and code splitting of dictionary data.
 *
 * Strategy:
 * 1. Import original dictionary (will be code-split in production)
 * 2. Provide same exports for backward compatibility
 * 3. Add new async APIs for future optimization
 */

import { DICTIONARY, ALL_WORDS, WORD_SET } from '../dictionary'
import { loadDictionary, loadDictionaryRange, preloadCommonDictionaries } from './loader'

// Re-export original dictionary for backward compatibility
export { DICTIONARY, ALL_WORDS, WORD_SET }

// Export async loaders for new code
export { loadDictionary, loadDictionaryRange, preloadCommonDictionaries }

/**
 * Get words by length (sync - uses pre-loaded data)
 * For better performance, use loadDictionary() which supports dynamic loading
 */
export function getWordsByLength(length: number): string[] {
  return DICTIONARY[length] || []
}

/**
 * Get all words in a length range (sync - uses pre-loaded data)
 * For better performance, use loadDictionaryRange() which supports dynamic loading
 */
export function getWordsByLengthRange(minLength: number, maxLength: number): string[] {
  const words: string[] = []

  for (let length = minLength; length <= maxLength; length++) {
    if (DICTIONARY[length]) {
      words.push(...DICTIONARY[length])
    }
  }

  return words
}

/**
 * Check if a word exists (sync - uses pre-loaded set)
 */
export function isValidWord(word: string): boolean {
  return WORD_SET.has(word.toLowerCase())
}

/**
 * Get total word count
 */
export function getTotalWordCount(): number {
  return ALL_WORDS.length
}

/**
 * Get word count by length
 */
export function getWordCountByLength(): Record<number, number> {
  const counts: Record<number, number> = {}

  for (const [length, words] of Object.entries(DICTIONARY)) {
    counts[Number(length)] = words.length
  }

  return counts
}

/**
 * Performance utilities
 */
export const performance = {
  /**
   * Preload specific word lengths for faster access
   * Call this during app initialization
   */
  preload: async (lengths: number[]): Promise<void> => {
    // Already loaded in current implementation
    // In future, this will use dynamic imports
    return Promise.resolve()
  },

  /**
   * Preload common word lengths (3-7 letters)
   * Most used in word games
   */
  preloadCommon: async (): Promise<void> => {
    await preloadCommonDictionaries()
  },

  /**
   * Get memory usage estimate (approximate)
   */
  getMemoryEstimate: (): { bytes: number; formatted: string } => {
    const totalChars = ALL_WORDS.reduce((sum, word) => sum + word.length, 0)
    const bytes = totalChars * 2 // Approximate (UTF-16)

    return {
      bytes,
      formatted: formatBytes(bytes)
    }
  }
}

/**
 * Helper to format bytes
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
