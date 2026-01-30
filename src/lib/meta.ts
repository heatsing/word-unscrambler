const BASE = 'https://wordunscrambler.cc';

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
}

export function getMeta(
  path: string,
  title: string,
  description: string,
  options?: { noindex?: boolean }
): PageMeta {
  const canonical = path.startsWith('http') ? path : `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
  return { title, description, canonical, noindex: options?.noindex };
}

export const DEFAULT_TITLE = 'Word Unscrambler - Solve Wordle, Scrabble & Word Games';
export const DEFAULT_DESCRIPTION =
  'Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends. Unscramble letters and find valid words instantly.';
