"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

// Sync with site-header.tsx
const wordFinders = [
  { name: "Word Unscrambler", href: "/word-unscrambler" },
  { name: "Wordle Solver", href: "/wordle-solver" },
  { name: "Anagram Solver", href: "/anagram-solver" },
  { name: "Scrabble Word Finder", href: "/scrabble" },
  { name: "Words with Friends", href: "/words-with-friends" },
  { name: "Jumble Solver", href: "/jumble-solver" },
  { name: "Word Generator", href: "/word-generator" },
  { name: "Word Solver", href: "/word-solver" },
  { name: "Word Scramble", href: "/word-scramble" },
  { name: "Wordscapes", href: "/wordscapes" },
  { name: "Word Cookies", href: "/word-cookies" },
  { name: "Wordfeud", href: "/wordfeud" },
]

const wordLists = [
  { name: "Words by Length", href: "/words-by-length" },
  { name: "Words Start With", href: "/words-start-with" },
  { name: "Words With Letters", href: "/words-with-letters" },
  { name: "Words Ending In", href: "/words-ending-in" },
]

const wordsByLength = [
  { name: "10-Letter Words", href: "/10-letter-words" },
  { name: "9-Letter Words", href: "/9-letter-words" },
  { name: "8-Letter Words", href: "/8-letter-words" },
  { name: "7-Letter Words", href: "/7-letter-words" },
  { name: "6-Letter Words", href: "/6-letter-words" },
  { name: "5-Letter Words", href: "/5-letter-words" },
  { name: "4-Letter Words", href: "/4-letter-words" },
  { name: "3-Letter Words", href: "/3-letter-words" },
  { name: "2-Letter Words", href: "/2-letter-words" },
]

const legal = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function SiteFooter() {
  const storageKey = "wu_footer_rating_v1"
  const baseVotes = 2960
  const baseAverage = 4.6

  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [userRating, setUserRating] = useState<number | null>(null)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey)
      if (!stored) return
      const parsed = Number(stored)
      if (Number.isFinite(parsed) && parsed >= 1 && parsed <= 5) {
        setUserRating(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  const votes = baseVotes + (userRating ? 1 : 0)
  const average = useMemo(() => {
    if (!userRating) return baseAverage
    const avg = (baseAverage * baseVotes + userRating) / (baseVotes + 1)
    return Math.round(avg * 10) / 10
  }, [userRating])

  return (
    <footer className="bg-black text-white">
      {/* Rating / Review block */}
      <section className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Rate WordUnscrambler.cc
            </h2>

            <div
              className="mt-6 flex items-center justify-center gap-2"
              role="radiogroup"
              aria-label="Rate this site"
              onMouseLeave={() => setHoverRating(null)}
            >
              {Array.from({ length: 5 }).map((_, idx) => {
                const value = idx + 1
                const activeValue = hoverRating ?? userRating ?? 0
                const filled = value <= activeValue

                return (
                  <button
                    key={value}
                    type="button"
                    className="rounded-md p-1 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-200 cursor-pointer touch-manipulation"
                    role="radio"
                    aria-checked={userRating === value}
                    aria-label={`${value} star${value === 1 ? '' : 's'}`}
                    onMouseEnter={() => setHoverRating(value)}
                    onFocus={() => setHoverRating(value)}
                    onBlur={() => setHoverRating(null)}
                    onClick={() => {
                      setUserRating(value)
                      try {
                        window.localStorage.setItem(storageKey, String(value))
                      } catch {
                        // ignore
                      }
                    }}
                  >
                    <Star
                      className={[
                        "h-10 w-10 transition-colors duration-200",
                        filled ? "text-yellow-400 fill-yellow-400" : "text-white/30",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-6 text-3xl md:text-4xl font-semibold text-white">
              {average} <span className="text-lg md:text-xl font-medium text-white/70">/ 5</span>
            </div>
            <div className="mt-2 text-sm md:text-base text-white/60">{votes.toLocaleString()} votes</div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Word Finders */}
          <div>
            <h3 className="font-semibold mb-5 text-base text-white">Word Finders</h3>
            <ul className="space-y-3">
              {wordFinders.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* List of Words */}
          <div>
            <h3 className="font-semibold mb-5 text-base text-white">List of Words</h3>
            <ul className="space-y-3">
              {wordLists.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Words by Length */}
          <div>
            <h3 className="font-semibold mb-5 text-base text-white">Words by Length</h3>
            <ul className="space-y-3">
              {wordsByLength.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-5 text-base text-white">Legal</h3>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-white/70 text-center md:text-left">
              © {new Date().getFullYear()} Word Unscrambler. All rights reserved.
            </p>
            <p className="text-xs text-white/60 text-center md:text-right max-w-md leading-relaxed">
              Scrabble® is a registered trademark. Words with Friends® is a registered trademark. This site is not
              affiliated with Scrabble®, Words with Friends®, or any other game.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
