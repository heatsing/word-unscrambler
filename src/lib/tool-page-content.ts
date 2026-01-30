/**
 * Path-specific body content for tool pages. Used by [...slug].astro.
 * Returns HTML string (paragraphs, lists, links). Keep concise and SEO-friendly.
 */
export function getToolPageContent(path: string): string {
  const base =
    'Use our <a href="/unscramble" class="text-primary hover:underline">Unscramble</a> tool to enter your letters and find valid words. ';
  const byLength =
    'Browse <a href="/words-by-length" class="text-primary hover:underline">words by length</a> from 2 to 10 letters. ';
  const gameLinks =
    'Part of our word game tools for <a href="/wordle" class="text-primary hover:underline">Wordle</a>, <a href="/scrabble" class="text-primary hover:underline">Scrabble</a>, and <a href="/words-with-friends" class="text-primary hover:underline">Words with Friends</a>.';

  const content: Record<string, string> = {
    '/word-unscrambler': `<p>Unscramble any set of letters into real words. Enter up to 15 letters, add optional wildcards (?), and filter by length or pattern. ${gameLinks}</p>
<p>Get instant results for Scrabble, Wordle, crosswords, and daily puzzles. ${byLength}</p>`,

    '/anagram-solver': `<p>Find every anagram from your letters. Type your word or letter mix and see all valid anagrams. Perfect for anagram games and creative writing. ${gameLinks}</p>
<p>Combine with our <a href="/word-finder" class="text-primary hover:underline">Word Finder</a> to explore length and pattern filters. ${base}</p>`,

    '/wordle-solver': `<p>Solve Wordle using green (correct), yellow (wrong spot), and gray (not in word) clues. Enter your guesses and we suggest the best next 5-letter words. ${gameLinks}</p>
<p>Use the same dictionary as our <a href="/unscramble" class="text-primary hover:underline">Unscramble</a> tool for consistent, valid answers. ${byLength}</p>`,

    '/scrabble': `<p>Find high-scoring Scrabble words from your tiles. Enter your letters and optional blanks, then sort by score or length. ${gameLinks}</p>
<p>Try our <a href="/scrabble-cheat" class="text-primary hover:underline">Scrabble Cheat</a> and <a href="/scrabble-go" class="text-primary hover:underline">Scrabble GO</a> helpers for more game-specific tips. ${base}</p>`,

    '/words-with-friends': `<p>Words With Friends cheat: enter your tiles and get the best word options. Filter by score or length to make the best move. ${gameLinks}</p>
<p>Same powerful engine as our <a href="/word-finder" class="text-primary hover:underline">Word Finder</a>. ${base}</p>`,

    '/word-finder': `<p>Universal word finder: type your letters and get all valid words. Works for Scrabble, Words with Friends, Wordle, and any word game. ${gameLinks}</p>
<p>${base} ${byLength}</p>`,

    '/word-solver': `<p>Solve any word puzzle from your letters. One tool for crosswords, anagrams, and board games. Enter letters and optional pattern. ${gameLinks}</p>
<p>${base} For daily games, see <a href="/wordle" class="text-primary hover:underline">Wordle</a> and <a href="/wordscapes" class="text-primary hover:underline">Wordscapes</a> helpers. ${byLength}</p>`,

    '/word-generator': `<p>Generate random words for games, writing prompts, or brainstorming. Pick length and get random valid words from our dictionary. ${gameLinks}</p>
<p>For unscrambling your own letters, use <a href="/unscramble" class="text-primary hover:underline">Unscramble</a>. ${byLength}</p>`,

    '/word-scramble': `<p>Solve word scramble puzzles: enter jumbled letters and get all possible words. Instant results for classroom puzzles and word games. ${gameLinks}</p>
<p>${base} ${byLength}</p>`,

    '/jumble-solver': `<p>Solve daily Jumble puzzles. Type the jumbled letters and we list all valid words so you can find the answer. ${gameLinks}</p>
<p>${base} Same engine as our <a href="/anagram-solver" class="text-primary hover:underline">Anagram Solver</a>. ${byLength}</p>`,

    '/boggle-solver': `<p>Find all words in your Boggle board. Enter 16 letters in order (4×4) and we list every valid word. Great for practicing or checking answers. ${gameLinks}</p>
<p>${base} ${byLength}</p>`,

    '/wordle': `<p>Wordle helper: daily tips, strategy, and 5-letter word suggestions. Use green/yellow/gray clues with our <a href="/wordle-solver" class="text-primary hover:underline">Wordle Solver</a> for the best next guess. ${gameLinks}</p>
<p>${base} Browse <a href="/words/5-letter-words" class="text-primary hover:underline">5-letter words</a> by length. ${byLength}</p>`,

    '/wordscapes': `<p>Wordscapes help: find words for daily levels and puzzles. Enter your letters and use our word finder to complete levels faster. ${gameLinks}</p>
<p>${base} ${byLength}</p>`,

    '/word-cookies': `<p>Word Cookies answers and word finder. Enter the letters from your level and we show all valid words so you can finish each puzzle. ${gameLinks}</p>
<p>${base} ${byLength}</p>`,

    '/wordfeud': `<p>Wordfeud helper: get high-scoring words from your tiles. Enter your letters and optional blanks for the best moves. ${gameLinks}</p>
<p>${base} Same logic as our <a href="/scrabble" class="text-primary hover:underline">Scrabble</a> tool. ${byLength}</p>`,

    '/scrabble-go': `<p>Scrabble GO helper: find high-scoring words from your letters. Enter tiles and blanks, then sort by score or length. ${gameLinks}</p>
<p>${base} See also <a href="/scrabble-cheat" class="text-primary hover:underline">Scrabble Cheat</a>. ${byLength}</p>`,

    '/scrabble-cheat': `<p>Scrabble cheat and word finder for high-scoring plays. Enter your rack and we show the best words. ${gameLinks}</p>
<p>${base} <a href="/scrabble-go" class="text-primary hover:underline">Scrabble GO</a> and <a href="/wordfeud" class="text-primary hover:underline">Wordfeud</a> helpers available too. ${byLength}</p>`,

    '/hangman-solver': `<p>Solve Hangman: enter known letters and underscores for unknowns (e.g. a__le). We list words that match the pattern. ${gameLinks}</p>
<p>${base} ${byLength}</p>`,

    '/letter-boxed-solver': `<p>Letter Boxed solver for the NYT puzzle. Find words that use letters from each side of the box. Enter the 12 letters by side and we suggest solutions. ${gameLinks}</p>
<p>${base} ${byLength}</p>`,

    '/text-twist': `<p>Text Twist solver: enter your letters and get all valid words. Unscramble the mix to find the longest words and beat the game. ${gameLinks}</p>
<p>${base} Same as our <a href="/anagram-solver" class="text-primary hover:underline">Anagram Solver</a>. ${byLength}</p>`,

    '/word-search-solver': `<p>Word search solver: paste your grid or list letters and we find words. Useful for solving or creating word search puzzles. ${gameLinks}</p>
<p>${base} ${byLength}</p>`,

    '/descrambler': `<p>Word descrambler: type scrambled letters and get real words instantly. No sign-up; works for any word game or puzzle. ${gameLinks}</p>
<p>${base} Also try our <a href="/word-unscrambler" class="text-primary hover:underline">Word Unscrambler</a> for filters and wildcards. ${byLength}</p>`,
  };

  return content[path] ?? `<p>${base}${gameLinks}</p><p>${byLength}</p>`;
}
