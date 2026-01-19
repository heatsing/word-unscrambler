import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { DICTIONARY } from "@/lib/dictionary"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { WordGridWithDefinition } from "@/components/word-grid-with-definition"

type Props = {
  params: { length: string; letter: string }
}

// 生成所有可能的静态路径
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

// 动态生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { length, letter } = await params
  const letterUpper = letter.toUpperCase()

  return {
    title: `${length} Letter Words Starting with ${letterUpper} | Word Finder`,
    description: `Complete list of ${length}-letter words that start with ${letterUpper}. Perfect for Scrabble, Wordle, Words with Friends, and crossword puzzles.`,
  }
}

export default async function WordsStartingWithPage({ params }: Props) {
  const { length, letter } = await params
  const wordLength = parseInt(length)

  // 验证参数
  if (isNaN(wordLength) || wordLength < 2 || wordLength > 10) {
    notFound()
  }

  if (!/^[a-z]$/.test(letter)) {
    notFound()
  }

  // 获取所有该长度的单词
  const allWords = DICTIONARY[wordLength] || []

  // 过滤以指定字母开头的单词
  const words = allWords.filter(word => word.toLowerCase().startsWith(letter))

  const letterUpper = letter.toUpperCase()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {length} Letter Words Starting with {letterUpper}
          </h1>
          <p className="text-lg text-muted-foreground">
            Found {words.length} words that start with "{letterUpper}"
          </p>
        </div>

        {/* Word Grid */}
        {words.length > 0 ? (
          <div className="mb-12">
            <WordGridWithDefinition words={words} />
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg">No {length}-letter words found starting with "{letterUpper}"</p>
          </Card>
        )}

        {/* Navigation to other letters */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse {length}-Letter Words by Starting Letter</h2>
          <div className="flex flex-wrap gap-2">
            {'abcdefghijklmnopqrstuvwxyz'.split('').map((l) => (
              <Link
                key={l}
                href={`/${length}-letter-words-starting-with/${l}`}
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

        {/* SEO Content */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            About {length} Letter Words Starting with {letterUpper}
          </h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              This page lists all valid {length}-letter words that begin with the letter {letterUpper}.
              We found {words.length} words in our dictionary that match this criteria.
            </p>
            <p>
              These words are perfect for word games like Scrabble, Words with Friends, Wordle,
              and crossword puzzles. Use the navigation above to explore words starting with other letters.
            </p>
            {words.length > 0 && (
              <p>
                Popular {length}-letter words starting with {letterUpper} include:{' '}
                {words.slice(0, 10).join(', ')}, and many more.
              </p>
            )}
          </div>

          {/* Mini FAQ */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-bold mb-3">Frequently Asked Questions</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold">How many {length}-letter words start with {letterUpper}?</dt>
                <dd className="text-muted-foreground mt-1">There are {words.length} valid {length}-letter words starting with {letterUpper} in our dictionary.</dd>
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
                { "@type": "ListItem", "position": 3, "name": `Starting with ${letterUpper}`, "item": `https://wordunscrambler.cc/${length}-letter-words-starting-with/${letter}` }
              ]
            })
          }}
        />
      </div>
    </div>
  )
}
