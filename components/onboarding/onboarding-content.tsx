"use client"

import { Search, Filter, Sparkles, Heart, Brain, GitCompare } from "lucide-react"

export const onboardingSteps = [
  {
    title: "Welcome to Word Unscrambler! 🎉",
    description:
      "Discover the fastest way to solve word puzzles! This quick tutorial will show you how to use all the powerful features to dominate Scrabble, Wordle, and more.",
    icon: <Sparkles className="h-12 w-12 text-primary" />,
  },
  {
    title: "Search for Words",
    description:
      "Simply type your letters in the search box and hit 'Unscramble'. We'll instantly find all valid words you can make. You can enter up to 15 letters at once!",
    icon: <Search className="h-12 w-12 text-primary" />,
  },
  {
    title: "Advanced Filters",
    description:
      "Use powerful filters to refine your search: specify word length, starting letters, letter sequences, position constraints, and more. Perfect for solving specific word game challenges!",
    icon: <Filter className="h-12 w-12 text-primary" />,
  },
  {
    title: "Save Your Favorites",
    description:
      "Found a great word? Click the heart icon to save it to your favorites. Access your favorite words anytime from the Favorites button.",
    icon: <Heart className="h-12 w-12 text-primary" />,
  },
  {
    title: "Learning Mode",
    description:
      "Build your vocabulary with Learning Mode! Add words to your learning list and track your progress. Each word shows definitions, examples, and mastery levels.",
    icon: <Brain className="h-12 w-12 text-primary" />,
  },
  {
    title: "Compare Words",
    description:
      "Can't decide between words? Use Compare Mode to see side-by-side analysis of up to 5 words. See similarities, scores, and get smart recommendations!",
    icon: <GitCompare className="h-12 w-12 text-primary" />,
  },
  {
    title: "You're All Set! 🚀",
    description:
      "You're ready to become a word game champion! Remember, you can access advanced features anytime. Happy unscrambling!",
    icon: <Sparkles className="h-12 w-12 text-primary" />,
  },
]
