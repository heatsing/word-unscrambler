/**
 * Build-time word data from public/data/words_*.json.
 * Used by words-ending-in and similar static pages.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'public', 'data');
const LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10];
type DictProfile = 'full' | 'common';

let cachedAll: string[] | null = null;
let cachedAllCommon: string[] | null = null;

function loadWordsByLength(length: number, profile: DictProfile = 'full'): string[] {
  try {
    const fileName = profile === 'common' ? `words_common_${length}.json` : `words_${length}.json`;
    const raw = readFileSync(join(DATA_DIR, fileName), 'utf-8');
    const arr = JSON.parse(raw) as string[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

/** Words for a given length (2–10). Used by [length]-letter-words pages. */
export function getWordsByLength(length: number, profile: DictProfile = 'full'): string[] {
  if (length < 2 || length > 10) return [];
  return loadWordsByLength(length, profile).sort((a, b) => a.localeCompare(b));
}

/** All words from words_2..words_10, concatenated. Cached for reuse. */
export function getAllWords(profile: DictProfile = 'full'): string[] {
  if (profile === 'full' && cachedAll) return cachedAll;
  if (profile === 'common' && cachedAllCommon) return cachedAllCommon;
  const out: string[] = [];
  for (const len of LENGTHS) {
    out.push(...loadWordsByLength(len, profile));
  }
  if (profile === 'full') cachedAll = out;
  else cachedAllCommon = out;
  return out;
}
