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
  { href: '/words-start-with', label: 'Words Start With' },
  { href: '/words-ending-in', label: 'Words Ending In' },
  { href: '/words-with-letters', label: 'Words With Letters' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
];
