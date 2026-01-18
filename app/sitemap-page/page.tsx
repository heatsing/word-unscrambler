import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse all pages on Word Unscrambler - word finders, solvers, and word lists organized by category.",
  robots: "index, follow",
}

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Browse all pages on Word Unscrambler. Find word game solvers, word lists, and tools.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Word Finders & Solvers */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Word Finders & Solvers</h2>
          <ul className="space-y-2.5">
            <li>
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/word-unscrambler" className="text-primary hover:underline">
                Word Unscrambler
              </Link>
            </li>
            <li>
              <Link href="/wordle-solver" className="text-primary hover:underline">
                Wordle Solver
              </Link>
            </li>
            <li>
              <Link href="/wordle" className="text-primary hover:underline">
                Wordle Helper
              </Link>
            </li>
            <li>
              <Link href="/anagram-solver" className="text-primary hover:underline">
                Anagram Solver
              </Link>
            </li>
            <li>
              <Link href="/scrabble" className="text-primary hover:underline">
                Scrabble Word Finder
              </Link>
            </li>
            <li>
              <Link href="/scrabble-go" className="text-primary hover:underline">
                Scrabble GO
              </Link>
            </li>
            <li>
              <Link href="/scrabble-cheat" className="text-primary hover:underline">
                Scrabble Cheat
              </Link>
            </li>
            <li>
              <Link href="/words-with-friends" className="text-primary hover:underline">
                Words with Friends
              </Link>
            </li>
            <li>
              <Link href="/words-with-friends-cheat" className="text-primary hover:underline">
                Words with Friends Cheat
              </Link>
            </li>
            <li>
              <Link href="/jumble-solver" className="text-primary hover:underline">
                Jumble Solver
              </Link>
            </li>
            <li>
              <Link href="/word-generator" className="text-primary hover:underline">
                Word Generator
              </Link>
            </li>
            <li>
              <Link href="/word-solver" className="text-primary hover:underline">
                Word Solver
              </Link>
            </li>
            <li>
              <Link href="/word-scramble" className="text-primary hover:underline">
                Word Scramble
              </Link>
            </li>
            <li>
              <Link href="/wordscapes" className="text-primary hover:underline">
                Wordscapes
              </Link>
            </li>
            <li>
              <Link href="/word-cookies" className="text-primary hover:underline">
                Word Cookies
              </Link>
            </li>
            <li>
              <Link href="/wordfeud" className="text-primary hover:underline">
                Wordfeud
              </Link>
            </li>
          </ul>
        </section>

        {/* Word Lists - Browse */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Word Lists - Browse</h2>
          <ul className="space-y-2.5">
            <li>
              <Link href="/words-by-length" className="text-primary hover:underline">
                Words by Length
              </Link>
            </li>
            <li>
              <Link href="/words-start-with" className="text-primary hover:underline">
                Words Starting With
              </Link>
            </li>
            <li>
              <Link href="/words-with-letters" className="text-primary hover:underline">
                Words With Letters
              </Link>
            </li>
            <li>
              <Link href="/words-ending-in" className="text-primary hover:underline">
                Words Ending In
              </Link>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-8 mb-3">Words by Length</h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/2-letter-words" className="text-primary hover:underline">
                2-Letter Words
              </Link>
            </li>
            <li>
              <Link href="/3-letter-words" className="text-primary hover:underline">
                3-Letter Words
              </Link>
            </li>
            <li>
              <Link href="/4-letter-words" className="text-primary hover:underline">
                4-Letter Words
              </Link>
            </li>
            <li>
              <Link href="/5-letter-words" className="text-primary hover:underline">
                5-Letter Words
              </Link>
            </li>
            <li>
              <Link href="/6-letter-words" className="text-primary hover:underline">
                6-Letter Words
              </Link>
            </li>
            <li>
              <Link href="/7-letter-words" className="text-primary hover:underline">
                7-Letter Words
              </Link>
            </li>
            <li>
              <Link href="/8-letter-words" className="text-primary hover:underline">
                8-Letter Words
              </Link>
            </li>
            <li>
              <Link href="/9-letter-words" className="text-primary hover:underline">
                9-Letter Words
              </Link>
            </li>
            <li>
              <Link href="/10-letter-words" className="text-primary hover:underline">
                10-Letter Words
              </Link>
            </li>
          </ul>
        </section>

        {/* Letter-Specific Word Lists */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">5-Letter Words by Letter</h2>
          <div className="grid grid-cols-2 gap-2">
            {Array.from("abcdefghijklmnopqrstuvwxyz").map((letter) => (
              <Link
                key={letter}
                href={`/5-letter-words-starting-with/${letter}`}
                className="text-primary hover:underline text-sm"
              >
                5-Letter Words - {letter.toUpperCase()}
              </Link>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-3">Popular Word Lists</h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/words-that-start-with-a" className="text-primary hover:underline">
                Words That Start With A
              </Link>
            </li>
            <li>
              <Link href="/words-that-start-with-e" className="text-primary hover:underline">
                Words That Start With E
              </Link>
            </li>
            <li>
              <Link href="/words-that-start-with-q" className="text-primary hover:underline">
                Words That Start With Q
              </Link>
            </li>
            <li>
              <Link href="/words-that-start-with-x" className="text-primary hover:underline">
                Words That Start With X
              </Link>
            </li>
            <li>
              <Link href="/words-that-end-with-ing" className="text-primary hover:underline">
                Words Ending in ING
              </Link>
            </li>
            <li>
              <Link href="/words-that-end-with-ed" className="text-primary hover:underline">
                Words Ending in ED
              </Link>
            </li>
          </ul>
        </section>

        {/* Information & Legal */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Information & Legal</h2>
          <ul className="space-y-2.5">
            <li>
              <Link href="/about" className="text-primary hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-primary hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/sitemap-page" className="text-primary hover:underline">
                Sitemap (this page)
              </Link>
            </li>
          </ul>
        </section>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Sitemap",
            "description": "Complete sitemap of Word Unscrambler website",
            "url": "https://wordunscrambler.cc/sitemap-page",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://wordunscrambler.cc",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Sitemap",
                },
              ],
            },
          }),
        }}
      />
    </div>
  )
}
