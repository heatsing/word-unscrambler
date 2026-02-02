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

export const DEFAULT_TITLE = 'Word Unscrambler – Unscramble Letters for Wordle, Scrabble & More';
export const DEFAULT_DESCRIPTION =
  'Unscramble jumbled letters into real words. Works for Wordle, Scrabble, Words with Friends, and crosswords. No sign-up. Free in your browser.';
