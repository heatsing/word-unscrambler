import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, Grid3x3 } from "lucide-react"
import { GoBackButton } from "@/components/go-back-button"

// Popular tools for quick navigation
const popularTools = [
  { name: "Word Unscrambler", href: "/word-unscrambler", description: "Unscramble any letters" },
  { name: "Wordle Solver", href: "/wordle-solver", description: "Solve today's Wordle" },
  { name: "Anagram Solver", href: "/anagram-solver", description: "Find anagrams" },
  { name: "Scrabble Word Finder", href: "/scrabble", description: "High-scoring words" },
  { name: "Words with Friends", href: "/words-with-friends", description: "WWF cheat tool" },
  { name: "Jumble Solver", href: "/jumble-solver", description: "Daily Jumble answers" },
]

// Popular word lists
const popularLists = [
  { name: "5-Letter Words", href: "/5-letter-words" },
  { name: "4-Letter Words", href: "/4-letter-words" },
  { name: "Words by Length", href: "/words-by-length" },
  { name: "Words Start With", href: "/words-start-with" },
]

export const metadata = {
  title: "404 - Page Not Found | Word Unscrambler",
  description: "The page you're looking for doesn't exist. Browse our word finder tools and word lists.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Main 404 Content */}
      <div className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* 404 Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted mb-6">
              <Search className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground" aria-hidden="true" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's help you find what you need.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="min-h-[44px] cursor-pointer transition-colors duration-200"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" aria-hidden="true" />
                Go to Homepage
              </Link>
            </Button>
            <GoBackButton />
          </div>

          {/* Popular Tools Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Popular Word Finder Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTools.map((tool) => (
                <Card
                  key={tool.href}
                  className="hover:shadow-md transition-shadow duration-200 cursor-pointer group border-border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                >
                  <Link href={tool.href} className="block focus-visible:outline-none">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base group-hover:text-primary transition-colors duration-200">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Word Lists */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Popular Word Lists
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {popularLists.map((list) => (
                <Button
                  key={list.href}
                  asChild
                  variant="outline"
                  className="min-h-[44px] cursor-pointer transition-colors duration-200 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Link href={list.href} className="text-center">
                    {list.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Search Suggestion */}
          <Card className="bg-muted/50 border-dashed">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Grid3x3 className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <CardTitle className="text-lg">Can't find what you're looking for?</CardTitle>
              </div>
              <CardDescription>
                Try using our word unscrambler or browse all our tools from the navigation menu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  variant="default"
                  className="min-h-[44px] cursor-pointer transition-colors duration-200"
                >
                  <Link href="/word-unscrambler" className="flex items-center gap-2">
                    <Search className="h-4 w-4" aria-hidden="true" />
                    Use Word Unscrambler
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="min-h-[44px] cursor-pointer transition-colors duration-200"
                >
                  <Link href="/words-by-length">Browse All Word Lists</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
