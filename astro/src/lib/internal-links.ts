/**
 * Internal links for crawlers and footer. Tiered by priority.
 */

export interface InternalLink {
  href: string;
  label: string;
}

export const internalLinks: InternalLink[] = [
  { href: '/', label: 'Home' },
  { href: '/unscramble', label: 'Unscramble Words' },
  { href: '/word-unscrambler', label: 'Word Unscrambler' },
  { href: '/anagram-solver', label: 'Anagram Solver' },
  { href: '/wordle-solver', label: 'Wordle Solver' },
  { href: '/scrabble', label: 'Scrabble Word Finder' },
  { href: '/words-with-friends', label: 'Words With Friends Cheat' },
  { href: '/words-by-length', label: 'Words By Length' },
];
