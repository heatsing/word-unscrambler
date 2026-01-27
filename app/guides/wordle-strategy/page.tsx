import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, TrendingUp, Lightbulb, CheckCircle2, AlertTriangle, Star } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Wordle Strategy Guide - Best Starting Words & Winning Tips | Word Unscrambler",
  description: "Master Wordle with proven strategies, best starting words, and expert tips. Learn pattern recognition, elimination techniques, and how to solve Wordle in fewer guesses.",
  keywords: "wordle strategy, wordle tips, best wordle starting words, wordle solver, wordle patterns, how to win wordle",
}

export default function WordleStrategyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
              <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Wordle Strategy Guide</h1>
              <p className="text-muted-foreground">Master the daily word puzzle with proven strategies</p>
            </div>
          </div>
        </div>

        {/* Best Starting Words */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Best Starting Words
            </CardTitle>
            <CardDescription>Maximize your first guess with these statistically optimal words</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Top Tier */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge variant="default">Top Tier</Badge>
                  Maximum vowel coverage
                </h3>
                <div className="space-y-2">
                  {[
                    { word: "STARE", reason: "5 unique letters, 2 vowels, common consonants" },
                    { word: "CRANE", reason: "High-frequency letters, covers R/N/E" },
                    { word: "SLATE", reason: "Common letters, tests T/L/S combinations" },
                    { word: "CRATE", reason: "Similar to CRANE, alternative R position" },
                  ].map((item) => (
                    <div key={item.word} className="p-3 bg-muted rounded-lg">
                      <div className="font-bold text-lg text-green-600 dark:text-green-400">{item.word}</div>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternative Strategy */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge variant="secondary">Alternative</Badge>
                  Vowel-heavy approach
                </h3>
                <div className="space-y-2">
                  {[
                    { word: "AUDIO", reason: "4 vowels, eliminates A/E/I/O/U quickly" },
                    { word: "ADIEU", reason: "4 vowels, French-origin pattern" },
                    { word: "OUIJA", reason: "All 5 vowels, risky but informative" },
                    { word: "AROSE", reason: "3 vowels + common S/R" },
                  ].map((item) => (
                    <div key={item.word} className="p-3 bg-muted rounded-lg">
                      <div className="font-bold text-lg text-blue-600 dark:text-blue-400">{item.word}</div>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Strategies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Core Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Strategy 1 */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                1. Maximize Information on First Guesses
              </h3>
              <p className="text-muted-foreground mb-3">
                Your first two guesses should focus on gathering information, not solving the puzzle. Use different letters in each guess to eliminate as many possibilities as quickly as possible.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium mb-2">Example Two-Guess Combo:</p>
                <div className="space-y-1 text-sm">
                  <p><strong>Guess 1:</strong> STARE (covers S, T, A, R, E)</p>
                  <p><strong>Guess 2:</strong> BLIND (covers B, L, I, N, D)</p>
                  <p className="text-muted-foreground mt-2">This combination tests 10 different letters, covering ~40% of the alphabet.</p>
                </div>
              </div>
            </div>

            {/* Strategy 2 */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                2. Use Position Information Wisely
              </h3>
              <p className="text-muted-foreground mb-3">
                When you get a yellow letter (correct letter, wrong position), systematically test it in different positions. When you get a green letter (correct position), build around it.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border-2 border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-700 dark:text-green-300">Green Letters</p>
                  <p className="text-sm text-muted-foreground">Lock them in place and build around them</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg border-2 border-yellow-200 dark:border-yellow-800">
                  <p className="font-semibold text-yellow-700 dark:text-yellow-300">Yellow Letters</p>
                  <p className="text-sm text-muted-foreground">Try different positions methodically</p>
                </div>
              </div>
            </div>

            {/* Strategy 3 */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                3. Recognize Common Letter Patterns
              </h3>
              <p className="text-muted-foreground mb-3">
                English has predictable patterns. Knowing these can help narrow down possibilities faster.
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {[
                  { pattern: "Double letters", examples: "SPELL, CREEP, BLOOD" },
                  { pattern: "Common endings", examples: "-ING, -TION, -NESS, -LY" },
                  { pattern: "Common starts", examples: "UN-, RE-, IN-, DE-" },
                  { pattern: "Vowel combos", examples: "EA, OO, OU, AI, IE" },
                ].map((item) => (
                  <div key={item.pattern} className="bg-muted p-3 rounded-lg">
                    <p className="font-semibold text-sm">{item.pattern}</p>
                    <p className="text-xs text-muted-foreground">{item.examples}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy 4 */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                4. Eliminate Strategically (Hard Mode Optional)
              </h3>
              <p className="text-muted-foreground mb-3">
                In normal mode, you can use guesses purely for elimination. In hard mode, you must use revealed hints, which requires more careful planning.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 bg-muted p-3 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Normal Mode Tip:</p>
                    <p className="text-sm text-muted-foreground">Use guess 3 or 4 to test multiple uncertain letters, even if it can't be the answer</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-muted p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Hard Mode Warning:</p>
                    <p className="text-sm text-muted-foreground">Every guess must use all revealed hints, requiring more strategic planning</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-600" />
              Advanced Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Letter Frequency Matters</p>
                  <p className="text-sm text-muted-foreground">Most common: E, A, R, I, O, T, N, S. Least common: Q, J, Z, X.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Position Probability</p>
                  <p className="text-sm text-muted-foreground">S is most common at position 1 or 5. E is most common at position 5.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Avoid Rare Letters Early</p>
                  <p className="text-sm text-muted-foreground">Don't waste early guesses on Q, X, Z unless you have strong evidence.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Think in Word Families</p>
                  <p className="text-sm text-muted-foreground">If you have _OUND, consider: BOUND, FOUND, HOUND, MOUND, POUND, ROUND, SOUND, WOUND.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Practice Daily</p>
                  <p className="text-sm text-muted-foreground">Consistency is key. Playing every day improves pattern recognition and vocabulary.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Tools CTA */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help Solving Today's Wordle?</CardTitle>
            <CardDescription>Use our Wordle solver to find the best next guess based on your clues</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Link href="/wordle-solver">
              <Button size="lg">
                <Target className="h-4 w-4 mr-2" />
                Try Wordle Solver
              </Button>
            </Link>
            <Link href="/word-unscrambler">
              <Button size="lg" variant="outline">
                Word Unscrambler
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
