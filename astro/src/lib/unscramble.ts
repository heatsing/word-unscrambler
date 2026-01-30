/**
 * Pure unscramble logic: given a list of words and letters, return words that can be formed.
 * No dictionary import — caller provides word list (e.g. from fetched JSON).
 */

function countLetters(str: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const char of str.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      counts[char] = (counts[char] || 0) + 1;
    }
  }
  return counts;
}

function canFormWord(word: string, available: Record<string, number>): boolean {
  const wordCounts = countLetters(word);
  for (const [letter, count] of Object.entries(wordCounts)) {
    if (!available[letter] || available[letter] < count) return false;
  }
  return true;
}

const SCRABBLE: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
  m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
};

export interface UnscrambleResult {
  word: string;
  score: number;
  length: number;
}

export interface UnscrambleOptions {
  minLength?: number;
  maxLength?: number;
  sortBy?: 'score' | 'length' | 'alpha';
  sortDir?: 'asc' | 'desc';
}

/**
 * Unscramble letters against a provided word list.
 */
export function unscramble(
  letters: string,
  wordList: string[],
  options: UnscrambleOptions = {}
): UnscrambleResult[] {
  const normalized = letters.toLowerCase().replace(/[^a-z]/g, '');
  if (!normalized) return [];

  const available = countLetters(normalized);
  const { minLength = 2, maxLength = 15, sortBy = 'score', sortDir = 'desc' } = options;

  const results: UnscrambleResult[] = [];
  for (const word of wordList) {
    if (word.length < minLength || word.length > maxLength) continue;
    if (!canFormWord(word, available)) continue;
    const score = word.split('').reduce((s, c) => s + (SCRABBLE[c] ?? 0), 0);
    results.push({ word, score, length: word.length });
  }

  const mult = sortDir === 'desc' ? -1 : 1;
  results.sort((a, b) => {
    if (sortBy === 'length') return (b.length - a.length) * mult;
    if (sortBy === 'alpha') return a.word.localeCompare(b.word) * mult;
    return (b.score - a.score) * mult;
  });

  return results;
}
