import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingUp, BookOpen, CheckCircle2 } from "lucide-react"

export function EducationSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/30 rounded-2xl p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Why Use Word Unscrambler */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Why Use a Word Unscrambler?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Word unscramblers aren't just tools—they're learning companions that help you improve your vocabulary,
            win word games, and discover the hidden potential in any set of letters.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center mb-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Win More Games</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Discover high-scoring words you never knew existed. From Scrabble to Words With Friends,
              find the perfect word to secure your victory.
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">Expand Vocabulary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Learn new words naturally through gameplay. Our definitions and examples help you understand
              and remember each word you discover.
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center mb-3">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Solve Puzzles Faster</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Get unstuck on crosswords, anagrams, and word puzzles. Find solutions instantly and keep
              your winning streak alive.
            </CardContent>
          </Card>
        </div>

        {/* Is It Cheating? */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Is Using a Word Unscrambler Cheating?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Not at all! Think of word unscramblers as learning tools, not shortcuts. When you use our tool,
                you're actually <strong>expanding your vocabulary</strong> and <strong>discovering new words</strong> you
                can use in future games without help.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong className="block mb-1">Learning Tool</strong>
                    <span className="text-muted-foreground">
                      Perfect for studying new words and improving your game strategy
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong className="block mb-1">Practice Mode</strong>
                    <span className="text-muted-foreground">
                      Use it to train between games and become a better player
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong className="block mb-1">Fair Play</strong>
                    <span className="text-muted-foreground">
                      Most casual games welcome word finders as educational aids
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong className="block mb-1">Memory Building</strong>
                    <span className="text-muted-foreground">
                      The words you discover become part of your permanent vocabulary
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic pt-2">
                💡 Pro Tip: Use the tool to learn, then challenge yourself to remember the words in your next game!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA to Guides */}
        <div className="text-center">
          <Link href="/wordle-solver">
            <Button size="lg" variant="outline" className="button-lift">
              View Strategy Guides
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
