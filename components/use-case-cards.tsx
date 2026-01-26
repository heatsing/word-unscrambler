import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Grid3x3, BookOpen, GraduationCap, Zap } from "lucide-react"

const USE_CASES = [
  {
    title: "Stuck in Wordle?",
    description: "Get the best word suggestions based on your known and excluded letters",
    icon: Target,
    href: "/wordle-solver",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
  },
  {
    title: "Beat Scrabble Friends?",
    description: "Find high-scoring words from your tiles and dominate the board",
    icon: Grid3x3,
    href: "/scrabble",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Words With Friends Help?",
    description: "Discover the perfect word to play with your specific letter rack",
    icon: BookOpen,
    href: "/words-with-friends",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    title: "Learn New Words?",
    description: "Expand your vocabulary with spaced repetition and word tracking",
    icon: GraduationCap,
    href: "/word-unscrambler",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    title: "Quick Anagram?",
    description: "Find all possible anagrams and variations of any word instantly",
    icon: Zap,
    href: "/anagram-solver",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
  },
]

export function UseCaseCards() {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">How Can We Help You?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your goal and we'll help you achieve it
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.slice(0, 3).map((useCase) => {
          const Icon = useCase.icon
          return (
            <Card
              key={useCase.title}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 card-interactive"
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-14 h-14 rounded-xl ${useCase.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-7 w-7 ${useCase.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
                <Link href={useCase.href}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Use Cases - Smaller Cards */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        {USE_CASES.slice(3).map((useCase) => {
          const Icon = useCase.icon
          return (
            <Link key={useCase.title} href={useCase.href}>
              <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${useCase.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${useCase.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {useCase.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    Try →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
