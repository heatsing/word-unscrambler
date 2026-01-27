import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Sparkles, Lightbulb, CheckCircle2, Target, Grid3x3 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Scrabble Tips & Strategies - How to Win at Scrabble | Word Unscrambler",
  description: "Master Scrabble with expert tips on high-scoring words, 7-letter bonuses, board positioning, and strategic play. Improve your Scrabble game today.",
  keywords: "scrabble tips, scrabble strategy, how to win scrabble, scrabble high scoring words, scrabble bonus, scrabble board strategy",
}

export default function ScrabbleTipsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Scrabble Tips & Strategies</h1>
              <p className="text-muted-foreground">Win more games with proven Scrabble tactics</p>
            </div>
          </div>
        </div>

        {/* Letter Values Quick Reference */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid3x3 className="h-5 w-5" />
              Letter Values Quick Reference
            </CardTitle>
            <CardDescription>Know your letter values for strategic tile usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">1 Point</p>
                <p className="text-sm">A, E, I, O, U, L, N, S, T, R</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">2 Points</p>
                <p className="text-sm">D, G</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">3 Points</p>
                <p className="text-sm">B, C, M, P</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                <p className="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-1">4 Points</p>
                <p className="text-sm">F, H, V, W, Y</p>
              </div>
              <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-lg">
                <p className="text-xs font-semibold text-pink-700 dark:text-pink-300 mb-1">5 Points</p>
                <p className="text-sm">K</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">8 Points</p>
                <p className="text-sm">J, X</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-300 mb-1">10 Points</p>
                <p className="text-sm">Q, Z</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-950/30 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">0 Points</p>
                <p className="text-sm">Blank tiles (2)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Strategies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Top 5 Scrabble Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Strategy 1 - Bingo */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Badge variant="default">1</Badge>
                Master the 7-Letter Bingo (50-Point Bonus)
              </h3>
              <p className="text-muted-foreground mb-3">
                Using all 7 tiles in one turn earns a 50-point bonus on top of your word score. This is the fastest way to build a commanding lead.
              </p>
              <div className="bg-primary/5 border-2 border-primary/20 p-4 rounded-lg">
                <p className="font-medium mb-2">Common 7-Letter Word Patterns:</p>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div>
                    <p className="font-semibold text-primary">-ING Words</p>
                    <p className="text-muted-foreground">READING, PLAYING, WRITING</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">-ER Words</p>
                    <p className="text-muted-foreground">TEACHER, SPEAKER, LIGHTER</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">-EST Words</p>
                    <p className="text-muted-foreground">BIGGEST, FASTEST, LONGEST</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">RE- Words</p>
                    <p className="text-muted-foreground">RESTART, REWRITE, RESTORE</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  💡 Tip: Keep common prefixes (RE-, UN-) and suffixes (-ING, -ER, -ED) in mind when arranging your tiles.
                </p>
              </div>
            </div>

            {/* Strategy 2 - Premium Squares */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Badge variant="default">2</Badge>
                Maximize Premium Square Usage
              </h3>
              <p className="text-muted-foreground mb-3">
                Strategic placement on colored squares can multiply your score dramatically. Plan ahead to set up big plays.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border-2 border-red-200 dark:border-red-800">
                  <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Triple Word Score (TWS)</p>
                  <p className="text-sm text-muted-foreground">3× total word value - prioritize these!</p>
                  <p className="text-xs text-muted-foreground mt-1">Best for: High-value letters (J, Q, X, Z)</p>
                </div>
                <div className="bg-pink-50 dark:bg-pink-950/30 p-3 rounded-lg border-2 border-pink-200 dark:border-pink-800">
                  <p className="font-semibold text-pink-700 dark:text-pink-300 mb-1">Double Word Score (DWS)</p>
                  <p className="text-sm text-muted-foreground">2× total word value - use frequently</p>
                  <p className="text-xs text-muted-foreground mt-1">Best for: Longer words (5+ letters)</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                  <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Triple Letter Score (TLS)</p>
                  <p className="text-sm text-muted-foreground">3× single letter value</p>
                  <p className="text-xs text-muted-foreground mt-1">Best for: Q (30 pts), Z (30 pts), J (24 pts)</p>
                </div>
                <div className="bg-sky-50 dark:bg-sky-950/30 p-3 rounded-lg border-2 border-sky-200 dark:border-sky-800">
                  <p className="font-semibold text-sky-700 dark:text-sky-300 mb-1">Double Letter Score (DLS)</p>
                  <p className="text-sm text-muted-foreground">2× single letter value</p>
                  <p className="text-xs text-muted-foreground mt-1">Best for: X (16 pts), K (10 pts), high-value tiles</p>
                </div>
              </div>
            </div>

            {/* Strategy 3 - Two-Letter Words */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Badge variant="default">3</Badge>
                Learn Essential 2-Letter Words
              </h3>
              <p className="text-muted-foreground mb-3">
                Two-letter words are game-changers. They allow parallel plays and open up tight boards. Memorize these:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-sm font-mono">
                  {[
                    "AA", "AB", "AD", "AE", "AG", "AH", "AI", "AL",
                    "AM", "AN", "AR", "AS", "AT", "AW", "AX", "AY",
                    "BA", "BE", "BI", "BO", "BY", "DE", "DO", "ED",
                    "EF", "EH", "EL", "EM", "EN", "ER", "ES", "ET",
                    "EX", "FA", "FE", "GO", "HA", "HE", "HI", "HM",
                    "HO", "ID", "IF", "IN", "IS", "IT", "JO", "KA",
                    "KI", "LA", "LI", "LO", "MA", "ME", "MI", "MM",
                    "MO", "MU", "MY", "NA", "NE", "NO", "NU", "OD",
                    "OE", "OF", "OH", "OI", "OK", "OM", "ON", "OP",
                    "OR", "OS", "OW", "OX", "OY", "PA", "PE", "PI",
                  ].map(word => (
                    <span key={word} className="bg-background px-2 py-1 rounded text-center">
                      {word}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  💡 Pro tip: Words with Q without U are especially valuable: QI, QOPH, QADI, QAID
                </p>
              </div>
            </div>

            {/* Strategy 4 - Tile Management */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Badge variant="default">4</Badge>
                Balance Your Tile Rack
              </h3>
              <p className="text-muted-foreground mb-3">
                Maintaining a good vowel-to-consonant ratio (roughly 3:4) gives you more word-forming options.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300">Good Rack Balance</p>
                    <p className="text-sm text-muted-foreground">Example: A, E, I, R, S, T, N (3 vowels, 4 consonants)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-700 dark:text-red-300">Trade Tiles When Needed</p>
                    <p className="text-sm text-muted-foreground">If you have 5+ vowels or all consonants, consider exchanging tiles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy 5 - Hooks & Extensions */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Badge variant="default">5</Badge>
                Use Hooks and Extensions
              </h3>
              <p className="text-muted-foreground mb-3">
                "Hooks" are single letters that can be added to existing words to create new ones. This lets you score for both words.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold mb-2">Common Front Hooks:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div>ART → <span className="text-primary font-bold">C</span>ART</div>
                    <div>EAR → <span className="text-primary font-bold">B</span>EAR</div>
                    <div>ATE → <span className="text-primary font-bold">D</span>ATE</div>
                    <div>OLD → <span className="text-primary font-bold">G</span>OLD</div>
                    <div>ILL → <span className="text-primary font-bold">B</span>ILL</div>
                    <div>ASH → <span className="text-primary font-bold">C</span>ASH</div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2">Common Back Hooks:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div>CAR → CAR<span className="text-primary font-bold">D</span></div>
                    <div>WIN → WIN<span className="text-primary font-bold">E</span></div>
                    <div>BAN → BAN<span className="text-primary font-bold">K</span></div>
                    <div>CAR → CAR<span className="text-primary font-bold">T</span></div>
                    <div>BEE → BEE<span className="text-primary font-bold">F</span></div>
                    <div>TAR → TAR<span className="text-primary font-bold">T</span></div>
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
              <Sparkles className="h-5 w-5 text-amber-600" />
              Advanced Scrabble Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Block Premium Squares Defensively</p>
                  <p className="text-sm text-muted-foreground">Don't leave Triple Word Scores open for your opponent, especially near high-value letter opportunities.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Save the S and Blank Tiles</p>
                  <p className="text-sm text-muted-foreground">S tiles and blanks are the most valuable. Save them for high-scoring plays or 7-letter bingos.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Learn Q Without U Words</p>
                  <p className="text-sm text-muted-foreground">QI, QOPH, QADI, QAID, QAT, QWERTY - essential when you draw Q without U.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Track Tiles Left in the Bag</p>
                  <p className="text-sm text-muted-foreground">Advanced players track which tiles have been played to predict opponent's rack and plan end-game strategy.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Practice Anagramming</p>
                  <p className="text-sm text-muted-foreground">The faster you can rearrange letters mentally, the quicker you'll spot high-scoring opportunities.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Tools CTA */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help Finding Scrabble Words?</CardTitle>
            <CardDescription>Use our Scrabble word finder to discover high-scoring plays</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Link href="/scrabble">
              <Button size="lg">
                <Trophy className="h-4 w-4 mr-2" />
                Try Scrabble Finder
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
