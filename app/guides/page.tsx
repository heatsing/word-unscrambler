import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, Trophy, Lightbulb, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Word Game Guides & Strategies | Word Unscrambler",
  description: "Learn winning strategies for Wordle, Scrabble, and other word games. Expert tips, best practices, and proven techniques to improve your gameplay.",
  keywords: "word game guides, wordle strategy, scrabble tips, word game help, vocabulary building",
}

export default function GuidesPage() {
  const guides = [
    {
      title: "Wordle Strategy Guide",
      description: "Master Wordle with proven strategies, best starting words, and pattern recognition techniques.",
      icon: Target,
      href: "/guides/wordle-strategy",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      tags: ["Beginner Friendly", "Pattern Recognition", "Daily Puzzle"],
    },
    {
      title: "Scrabble Tips & Strategies",
      description: "Win more Scrabble games with expert tips on high-scoring words, board positioning, and 7-letter bonuses.",
      icon: Trophy,
      href: "/guides/scrabble-tips",
      color: "text-primary",
      bgColor: "bg-primary/10",
      tags: ["Premium Squares", "High Scoring", "Bingo Bonus"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Word Game Guides</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn winning strategies, expert tips, and proven techniques to master your favorite word games
          </p>
        </div>

        {/* Featured Guides */}
        <div className="space-y-6 mb-12">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Card key={guide.href} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${guide.bgColor}`}>
                      <Icon className={`h-8 w-8 ${guide.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{guide.title}</CardTitle>
                      <CardDescription className="text-base">{guide.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {guide.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-muted rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={guide.href}>
                    <Button size="lg" className="w-full sm:w-auto">
                      Read Guide
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Why Learn Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-600" />
              Why Learn Word Game Strategies?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Improve Your Skills
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding word patterns, letter frequencies, and strategic thinking will dramatically improve your gameplay and vocabulary.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Win More Games
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Apply proven strategies and techniques used by top players to consistently outperform your opponents.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Expand Vocabulary
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learning word games naturally expands your vocabulary and improves your language skills.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Have More Fun
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Knowing the strategies makes games more enjoyable and less frustrating when you're stuck.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools Section */}
        <Card>
          <CardHeader>
            <CardTitle>Practice What You've Learned</CardTitle>
            <CardDescription>
              Use our free tools to apply these strategies and improve your word game skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/wordle-solver">
                <Button variant="outline" size="lg" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Wordle Solver
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/scrabble">
                <Button variant="outline" size="lg" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Scrabble Word Finder
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/word-unscrambler">
                <Button variant="outline" size="lg" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Word Unscrambler
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/learning-dashboard">
                <Button variant="outline" size="lg" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Learning Dashboard
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
