import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { ALL_WORDS } from "@/lib/dictionary"
import { ArrowLeft } from "lucide-react"
import { WordsGroupClient } from "./WordsGroupClient"

interface Props {
  params: { letter: string }
}

export async function generateStaticParams() {
  return Array.from("abcdefghijklmnopqrstuvwxyz").map((letter) => ({
    letter,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const letter = params.letter.toUpperCase()
  const wordsCount = ALL_WORDS.filter((word) => word.endsWith(params.letter.toLowerCase())).length

  return {
    title: `Words Ending in ${letter} | ${wordsCount} Words`,
    description: `Browse ${wordsCount} English words that end with the letter ${letter}. Organized by word length from 2 to 10 letters.`,
  }
}

export default function WordsEndingInLetterPage({ params }: Props) {
  const letter = params.letter.toLowerCase()

  // Filter words ending with this letter
  const wordsEndingWithLetter = ALL_WORDS.filter((word) => word.endsWith(letter))

  // Group by length (10 to 2)
  const groupedByLength: Record<number, string[]> = {}
  for (let len = 10; len >= 2; len--) {
    groupedByLength[len] = wordsEndingWithLetter
      .filter((word) => word.length === len)
      .sort()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/words-ending-in"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Words Ending In
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white text-3xl font-bold uppercase">
              {letter}
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                Words Ending in {letter.toUpperCase()}
              </h1>
              <p className="text-muted-foreground mt-1">
                Found {wordsEndingWithLetter.length} words
              </p>
            </div>
          </div>
        </div>

        {/* Letter Navigation */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-13 gap-2">
              {Array.from("abcdefghijklmnopqrstuvwxyz").map((l) => (
                <Link
                  key={l}
                  href={`/words-ending-in/${l}`}
                  className={`flex items-center justify-center h-10 rounded-md border font-semibold uppercase transition-colors ${
                    l === letter
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Words Grouped by Length */}
        {wordsEndingWithLetter.length > 0 ? (
          <WordsGroupClient groupedByLength={groupedByLength} />
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg text-muted-foreground">
              No words found ending in "{letter.toUpperCase()}"
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
