import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { DICTIONARY } from "@/lib/dictionary"
import { Card } from "@/components/ui/card"
import Link from "next/link"

type Props = {
  params: { length: string; letter: string }
}

export async function generateStaticParams() {
  const lengths = [2, 3, 4, 5, 6, 7, 8, 9, 10]
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

  const paths = []

  for (const length of lengths) {
    for (const letter of alphabet) {
      paths.push({
        length: length.toString(),
        letter: letter,
      })
    }
  }

  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { length, letter } = params
  const letterUpper = letter.toUpperCase()

  return {
    title: `${length} Letter Words Containing ${letterUpper} | Word Finder`,
    description: `Complete list of ${length}-letter words that contain the letter ${letterUpper}. Perfect for Scrabble, Wordle, Words with Friends, and word puzzles.`,
  }
}

export default function WordsWithLetterPage({ params }: Props) {
  const { length, letter } = params
  const wordLength = parseInt(length)

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
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-12">
            {words.map((word, index) => {
              const letterIndex = word.toLowerCase().indexOf(letter)
              const before = word.slice(0, letterIndex)
              const match = word.slice(letterIndex, letterIndex + 1)
              const after = word.slice(letterIndex + 1)

              return (
                <Card key={`${word}-${index}`} className="p-4 text-center hover:shadow-lg transition-all">
                  <span className="font-semibold uppercase">
                    {before}
                    <span className="text-primary font-bold">{match}</span>
                    {after}
                  </span>
                </Card>
              )
            })}
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
        </Card>
      </div>
    </div>
  )
}
