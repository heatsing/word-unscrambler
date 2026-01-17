export const seoConfig = {
  wordleSolver: {
    title: "Wordle Solver - Find 5 Letter Words & Win Every Wordle",
    description: "Free Wordle solver & helper tool. Get instant word suggestions based on green, yellow & gray letters. Solve today's Wordle in 3 tries or less.",
    keywords: ["wordle solver", "wordle helper", "wordle answer", "5 letter words", "wordle cheat"],
    canonical: "/wordle-solver"
  },
  anagramSolver: {
    title: "Anagram Solver - Unscramble Letters Into Words Instantly",
    description: "Fast anagram solver for word games & puzzles. Enter up to 15 letters and find all possible word combinations. Perfect for Scrabble, crosswords & anagrams.",
    keywords: ["anagram solver", "anagram finder", "anagram generator", "word anagram", "unscramble anagram"],
    canonical: "/anagram-solver"
  },
  scrabble: {
    title: "Scrabble Word Finder - High Scoring Words & Cheat Tool",
    description: "Scrabble word finder & cheat tool. Find highest scoring words from your letters. Includes TWL & SOWPODS dictionaries. Win every Scrabble game.",
    keywords: ["scrabble word finder", "scrabble cheat", "scrabble helper", "scrabble words", "scrabble score"],
    canonical: "/scrabble"
  },
  wordsWithFriends: {
    title: "Words With Friends Cheat - Best Word Finder & Helper Tool",
    description: "Words With Friends cheat tool. Find the highest scoring words from your letters. Beat opponents with our advanced word finder. 100% free.",
    keywords: ["words with friends cheat", "wwf helper", "wwf word finder", "words with friends solver"],
    canonical: "/words-with-friends"
  },
  wordUnscrambler: {
    title: "Word Unscrambler - Unscramble Letters to Words (Up to 15 Letters)",
    description: "Powerful word unscrambler tool. Enter up to 15 letters (including wildcards) and find all valid words. Perfect for Scrabble, Wordle, WWF & word puzzles.",
    keywords: ["word unscrambler", "unscramble words", "unscramble letters", "word descrambler", "letter unscrambler"],
    canonical: "/word-unscrambler"
  },
  jumbleSolver: {
    title: "Jumble Solver - Daily Jumble Word Puzzle Solution Tool",
    description: "Solve daily Jumble puzzles instantly. Unscramble jumbled words and find final answers. Free Jumble solver for today's puzzle & archives.",
    keywords: ["jumble solver", "daily jumble", "jumble answers", "jumble word solver", "jumble puzzle"],
    canonical: "/jumble-solver"
  },
  wordGenerator: {
    title: "Random Word Generator - Generate Words for Games & Writing",
    description: "Free random word generator. Generate single or multiple random words. Perfect for games, creative writing, brainstorming & word challenges.",
    keywords: ["random word generator", "word generator", "random words", "word creator", "word maker"],
    canonical: "/word-generator"
  },
  boggleSolver: {
    title: "Boggle Solver - Find All Words in Boggle Board Instantly",
    description: "Advanced Boggle solver. Enter your 16-letter Boggle board and find all valid words. Maximize your score in Boggle & word hunt games.",
    keywords: ["boggle solver", "boggle word finder", "boggle game", "boggle helper", "word hunt solver"],
    canonical: "/boggle-solver"
  },
  crosswordSolver: {
    title: "Crossword Solver - Find Crossword Puzzle Answers Quickly",
    description: "Free crossword puzzle solver. Enter pattern with known letters and find answers. Solve NYT crossword, cryptic & themed puzzles instantly.",
    keywords: ["crossword solver", "crossword answers", "crossword helper", "crossword clue solver"],
    canonical: "/crossword-solver"
  }
}

export const faqSchemas = {
  wordleSolver: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the Wordle solver work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Wordle solver analyzes your green (correct position), yellow (wrong position), and gray (not in word) letters to suggest the best possible words. Simply enter your results after each guess, and we'll filter thousands of 5-letter words to find optimal solutions."
        }
      },
      {
        "@type": "Question",
        "name": "Is using a Wordle solver cheating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Using a Wordle solver is a personal choice. Many players use it to learn new words, improve their strategy, or maintain their streak. It's a learning tool that helps you understand word patterns and letter frequencies."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best starting words for Wordle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best Wordle starting words contain common vowels and consonants like ADIEU, ARISE, STARE, CRANE, or SLATE. These words help eliminate or confirm the most frequent letters in English."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this Wordle solver for Quordle and Octordle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Wordle solver works perfectly for Quordle, Octordle, Dordle, and any 5-letter word game. The same letter filtering logic applies to all Wordle variants."
        }
      },
      {
        "@type": "Question",
        "name": "How many 5-letter words are in your database?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our database contains over 10,000 valid 5-letter English words, including all official Wordle answers and valid Scrabble/WWF words."
        }
      }
    ]
  },
  anagramSolver: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an anagram solver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An anagram solver is a tool that rearranges letters to form new words. Enter any combination of letters, and our solver finds all possible valid words that can be made from those letters."
        }
      },
      {
        "@type": "Question",
        "name": "How many letters can I enter in the anagram solver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can enter up to 15 letters in our anagram solver, including wildcards (? or blank tiles) for games like Scrabble and Words with Friends."
        }
      },
      {
        "@type": "Question",
        "name": "What word games use anagrams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anagrams are used in Scrabble, Words with Friends, Wordscapes, Text Twist, Jumble, crossword puzzles, and many other word games."
        }
      }
    ]
  }
}
