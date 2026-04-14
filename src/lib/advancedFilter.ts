/**
 * Advanced word filter: position known, position unknown (must contain), exclude.
 * Used by AdvancedWordFinder and client-side filtering.
 */

function countLetters(s: string): Record<string, number> {
  const c: Record<string, number> = {};
  for (const x of s.toLowerCase()) {
    if (x >= 'a' && x <= 'z') c[x] = (c[x] || 0) + 1;
  }
  return c;
}

export interface AdvancedFilterInput {
  /** Known letters by position (length N). Empty string = any. */
  known: string[];
  /** Letters that must appear somewhere (any order). */
  unknownLetters: string;
  /** Letters that must not appear. */
  excludeLetters: string;
}

/**
 * Filter word list by known positions, required letters, and excluded letters.
 */
export function filterWords(
  words: string[],
  length: number,
  input: AdvancedFilterInput
): string[] {
  const { known, unknownLetters, excludeLetters } = input;
  const need = countLetters(unknownLetters.toLowerCase().replace(/[^a-z]/g, ''));
  const excl = excludeLetters.toLowerCase().replace(/[^a-z]/g, '');

  return words.filter((word) => {
    if (word.length !== length) return false;
    const w = word.toLowerCase();
    const have = countLetters(w);
    for (let i = 0; i < length; i++) {
      const k = known[i]?.toLowerCase().trim();
      if (k && w[i] !== k) return false;
    }
    for (const x of excl) {
      if (w.includes(x)) return false;
    }
    for (const [letter, count] of Object.entries(need)) {
      if (!have[letter] || have[letter] < count) return false;
    }
    return true;
  });
}
