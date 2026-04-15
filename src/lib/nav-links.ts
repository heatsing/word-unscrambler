/** Main header — Wordtips-style top nav dropdowns (labels match reference UI). */
export const headerWordSolvers = [
  { name: 'NYT Crossplay Solver', href: '/nyt-crossplay-solver' },
  { name: 'Wordle Solver', href: '/wordle-solver' },
  { name: 'Word Unscramble', href: '/unscramble' },
  { name: 'Word Scramble Solver', href: '/word-scramble' },
  { name: 'Anagram Solver', href: '/anagram-solver' },
  { name: 'Scrabble Solver', href: '/scrabble' },
] as const;

export const headerWordLists = [
  { name: 'Words Start With', href: '/words-start-with' },
  { name: 'Words With', href: '/words-with-letters' },
  { name: 'Words Ending In', href: '/words-ending-in' },
] as const;

export type HeaderDailyHint = { name: string; subtitle: string; href: string };

/** Subtitles match reference; hrefs point to the closest in-site tools where we have no dedicated hints page. */
export const headerDailyGameHints: HeaderDailyHint[] = [
  { name: 'Connections', subtitle: 'Today Hints', href: '/jumble-solver' },
  { name: 'Strands', subtitle: 'Hints Today', href: '/word-search-solver' },
  { name: 'NYT Pips', subtitle: 'Answers Today', href: '/crossword-solver' },
  { name: 'NYT Mini Crossword', subtitle: 'Answers Today', href: '/crossword-solver' },
  { name: 'NYT Midi Crossword', subtitle: 'Answers Today', href: '/crossword-solver' },
  { name: 'NYT The Crossword', subtitle: 'Answers Today', href: '/crossword-solver' },
  { name: 'Wordle', subtitle: 'Hints Today', href: '/wordle' },
  { name: 'Spelling Bee', subtitle: 'Answers Today', href: '/word-unscrambler' },
  { name: 'NYT Capture', subtitle: 'Today Hints', href: '/crossword-solver' },
  { name: 'Contexto', subtitle: 'Answers Today', href: '/word-finder' },
  { name: 'Sports Connections', subtitle: 'Hints Today', href: '/words-with-friends' },
  { name: 'Blossom Game', subtitle: 'Answers Today', href: '/wordscapes' },
];

export const headerDailyGameHintsMoreHref = '/words-by-length';

export const headerCrosswords = [
  { name: 'Crossword Solver', href: '/crossword-solver' },
  { name: 'Crossword Popular Clues', href: '/word-finder' },
] as const;

/** Nav link groups for header dropdowns and footer columns (matches original Next.js site). */
export const wordFinders = [
  { name: 'Word Unscrambler', href: '/word-unscrambler' },
  { name: 'Anagram Solver', href: '/anagram-solver' },
  { name: 'Scrabble Word Finder', href: '/scrabble' },
  { name: 'Scrabble Go', href: '/scrabble-go' },
  { name: 'Words with Friends', href: '/words-with-friends' },
  { name: 'Word Generator', href: '/word-generator' },
  { name: 'Word Scramble Solver', href: '/word-scramble' },
  { name: 'Boggle Solver', href: '/boggle-solver' },
  { name: 'Word Finder', href: '/word-finder' },
  { name: 'Descrambler', href: '/descrambler' },
  { name: 'Unscramble', href: '/unscramble' },
  { name: 'Text Twist', href: '/text-twist' },
  { name: 'Word Search Solver', href: '/word-search-solver' },
  { name: 'Hangman Solver', href: '/hangman-solver' },
  { name: 'Letter Boxed Solver', href: '/letter-boxed-solver' },
  { name: 'Crossword Solver', href: '/crossword-solver' },
];

export const dailyGameHints = [
  { name: 'Wordle', href: '/wordle' },
  { name: 'Play Wordle', href: '/play-wordle' },
  { name: 'Wordle Unlimited', href: '/wordle-unlimited' },
  { name: 'Wordle Solver', href: '/wordle-solver' },
  { name: 'Jumble Solver', href: '/jumble-solver' },
  { name: 'Wordscapes', href: '/wordscapes' },
  { name: 'Word Cookies', href: '/word-cookies' },
  { name: 'Wordfeud', href: '/wordfeud' },
];

export const wordLists = [
  { name: 'Words by Length', href: '/words-by-length' },
  { name: 'Words Start With', href: '/words-start-with' },
  { name: 'Words With Letters', href: '/words-with-letters' },
  { name: 'Words Ending In', href: '/words-ending-in' },
];

export const wordsByLength = [
  { name: '10-Letter Words', href: '/10-letter-words' },
  { name: '9-Letter Words', href: '/9-letter-words' },
  { name: '8-Letter Words', href: '/8-letter-words' },
  { name: '7-Letter Words', href: '/7-letter-words' },
  { name: '6-Letter Words', href: '/6-letter-words' },
  { name: '5-Letter Words', href: '/5-letter-words' },
  { name: '4-Letter Words', href: '/4-letter-words' },
  { name: '3-Letter Words', href: '/3-letter-words' },
  { name: '2-Letter Words', href: '/2-letter-words' },
];

export const legal = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];
