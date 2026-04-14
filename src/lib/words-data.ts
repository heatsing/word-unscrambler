/**
 * Build-time word data from public/data/words_*.json.
 * Used by words-ending-in and similar static pages.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'public', 'data');
const LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

let cachedAll: string[] | null = null;

function loadWordsByLength(length: number): string[] {
  try {
    const raw = readFileSync(join(DATA_DIR, `words_${length}.json`), 'utf-8');
    const arr = JSON.parse(raw) as string[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

/** Words for a given length (2–10). Used by [length]-letter-words pages. */
export function getWordsByLength(length: number): string[] {
  if (length < 2 || length > 10) return [];
  return loadWordsByLength(length).sort((a, b) => a.localeCompare(b));
}

/** All words from words_2..words_10, concatenated. Cached for reuse. */
export function getAllWords(): string[] {
  if (cachedAll) return cachedAll;
  const out: string[] = [];
  for (const len of LENGTHS) {
    out.push(...loadWordsByLength(len));
  }
  cachedAll = out;
  return out;
}
