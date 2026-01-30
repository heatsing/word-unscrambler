import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { DICTIONARY } from "@/lib/dictionary"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { HighlightedWordGrid } from "@/components/highlighted-word-grid"

// Next.js may pass one segment as a single param or separate length/letter; normalize both.
const SEGMENT_REGEX = /^(\d+)-letter-words-with-([a-z])$/

async function parseParams(
  p: Promise<{ length?: string; letter?: string }> | { length?: string; letter?: string }
): Promise<{ length: string; letter: string } | null> {
  const raw = await Promise.resolve(p)
  const segment = typeof raw.length === "string" ? raw.length : ""
  const m = SEGMENT_REGEX.exec(segment)
  if (m) {
    return { length: m[1], letter: m[2] }
  }
  if (
    typeof raw.length === "string" &&
    typeof raw.letter === "string" &&
    /^\d+$/.test(raw.length) &&
    /^[a-z]$/.test(raw.letter)
  ) {
    return { length: raw.length, letter: raw.letter }
  }
  return null
}

type Props = {
  params: Promise<{ length?: string; letter?: string }> | { length?: string; letter?: string }
}

export async function generateStaticParams() {
  const lengths = [2, 3, 4, 5, 6, 7, 8, 9, 10]
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
  const paths: { length: string; letter: string }[] = []
  for (const length of lengths) {
    for (const letter of alphabet) {
      paths.push({ length: length.toString(), letter })
    }
  }
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = await parseParams(params)
  if (!parsed) notFound()
  const { length, letter } = parsed
  const letterUpper = letter.toUpperCase()
  return {
    title: `${length} Letter Words Containing ${letterUpper} | Word Finder`,
    description: `Complete list of ${length}-letter words that contain the letter ${letterUpper}. Perfect for Scrabble, Wordle, Words with Friends, and word puzzles.`,
  }
}

export default async function WordsWithLetterPage({ params }: Props) {
  const parsed = await parseParams(params)
  if (!parsed) notFound()
  const { length, letter } = parsed
  const wordLength = parseInt(length, 10)

  if (isNaN(wordLength) || wordLength < 2 || wordLength > 10) {
    notFound()
  }

  if (!/^[a-z]$/.test(letter)) {
    notFound()
  }

  const allWords = DICTIONARY[wordLength] || []
  const words = allWords.filter(word => word.toLowerCase().includes(letter))
  const letterUpper = letter.toUpperCase()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {length} Letter Words Containing {letterUpper}
          </h1>
          <p className="text-lg text-muted-foreground">
            Found {words.length} words that contain "{letterUpper}"
          </p>
        </div>

        {words.length > 0 ? (
          <div className="mb-12">
            <HighlightedWordGrid words={words} highlightLetter={letter} />
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg">No {length}-letter words found containing "{letterUpper}"</p>
          </Card>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse {length}-Letter Words by Letter</h2>
          <div className="flex flex-wrap gap-2">
            {'abcdefghijklmnopqrstuvwxyz'.split('').map((l) => (
              <Link
                key={l}
                href={`/${length}-letter-words-with-${l}`}
                className={`px-4 py-2 rounded-md font-bold uppercase transition-colors ${
                  l === letter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            About {length} Letter Words Containing {letterUpper}
          </h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              This page lists all valid {length}-letter words that contain the letter {letterUpper}.
              We found {words.length} words in our dictionary that match this criteria.
            </p>
            <p>
              These words are useful for word games like Scrabble, Words with Friends, Wordle,
              and other word puzzles. The letter {letterUpper} is highlighted in each word for easy identification.
            </p>
            {words.length > 0 && (
              <p>
                Popular {length}-letter words containing {letterUpper} include:{' '}
                {words.slice(0, 10).join(', ')}, and many more.
              </p>
            )}
          </div>

          {/* Mini FAQ */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-bold mb-3">Frequently Asked Questions</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold">How many {length}-letter words contain {letterUpper}?</dt>
                <dd className="text-muted-foreground mt-1">There are {words.length} valid {length}-letter words containing {letterUpper} in our dictionary.</dd>
              </div>
              <div>
                <dt className="font-semibold">Can I use these words in Scrabble?</dt>
                <dd className="text-muted-foreground mt-1">Yes, all words listed are from standard dictionaries and valid for Scrabble, Words with Friends, and Wordle.</dd>
              </div>
            </dl>
          </div>
        </Card>

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wordunscrambler.cc" },
                { "@type": "ListItem", "position": 2, "name": `${length} Letter Words`, "item": `https://wordunscrambler.cc/${length}-letter-words` },
                { "@type": "ListItem", "position": 3, "name": `Containing ${letterUpper}`, "item": `https://wordunscrambler.cc/${length}-letter-words-with-${letter}` }
              ]
            })
          }}
        />
      </div>
    </div>
  )
}
