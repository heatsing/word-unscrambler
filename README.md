# Word Unscrambler | Online Word Unscramble Tool

**Word Unscrambler** is a fast, free online word unscramble tool that helps you solve anagrams, word scrambles, and spelling challenges. Generate valid English words from scrambled letters, filter by length, and quickly find the best matches for learning, games, and teaching.

The site is built with [Astro](https://astro.build) (static output) only. All routes (tool pages, words-by-length, words-start-with, words-ending-in, N-letter-words-with-X, etc.) are generated from `src/pages/`.

## 🚀 Key Features

- **Unscramble letters** into all possible words
- **Length filters** to narrow down results
- **Dictionary scope** options (common, advanced, full)
- **Instant search** with sortable results
- **Mobile-friendly** responsive UI

## 🔍 SEO Keywords

> word unscrambler, unscramble words, anagram solver, word scramble solver, letter solver, english word finder, anagram generator, word game helper, vocabulary practice

## 📍 Target Audience (US)

This project targets **US** users: students, teachers, word-game players, and anyone who needs to unscramble letters or solve anagrams in English. Ideal for Wordle, Scrabble, Words with Friends, classroom activities, and spelling practice.

## 🧭 Use Cases

- English learning: spelling practice and vocabulary building
- Word games: Anagram, Word Scramble, Wordscapes
- Teaching: classroom activities and word challenges
- Content creation: wordplay and anagram ideas

## 🛠️ Local Development (Astro)

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # builds dict + Astro → dist/
npm run preview   # serve dist/
```

- **Dictionary**: Put `words.txt` (one word per line) in the project root, or leave it out to use the built-in sample. Run `npm run build:dict` to regenerate `public/data/words_*.json`. For a much larger 2–10 letter dictionary, run once (with network): `npx tsx scripts/download-words-alpha.ts` to fetch a public word list into `words_alpha.txt`; the build will merge it automatically. Use `SKIP_REMOTE_DICT=1` to skip network fetch and use only `words.txt` plus optional `words_alpha.txt` or the bundled subset.

## 📦 Deployment

Deploy easily with Vercel for automatic builds and hosting (`vercel.json` uses `npm run build` and `dist/`).

## 📄 License

MIT License
