"use client"

import Link from "next/link"
import { Menu, Home, Sparkles, BookOpen, Hash, Info, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Navigation 1: Word Finders (18 tools)
const wordFinders = [
  { name: "Word Unscrambler", href: "/word-unscrambler", description: "Unscramble any letters" },
  { name: "Wordle Solver", href: "/wordle-solver", description: "Solve Wordle puzzles" },
  { name: "Anagram Solver", href: "/anagram-solver", description: "Find anagrams" },
  { name: "Scrabble Word Finder", href: "/scrabble", description: "High-scoring words" },
  { name: "Scrabble Go", href: "/scrabble-go", description: "Scrabble Go helper" },
  { name: "Words with Friends", href: "/words-with-friends", description: "WWF cheat tool" },
  { name: "Jumble Solver", href: "/jumble-solver", description: "Solve jumbles" },
  { name: "Word Generator", href: "/word-generator", description: "Random words" },
  { name: "Word Scramble", href: "/word-scramble", description: "Scramble solver" },
  { name: "Wordscapes", href: "/wordscapes", description: "Wordscapes help" },
  { name: "Word Cookies", href: "/word-cookies", description: "Cookie answers" },
  { name: "Wordfeud", href: "/wordfeud", description: "Wordfeud cheat" },
  { name: "Text Twist", href: "/text-twist", description: "Text Twist solver" },
  { name: "Boggle Solver", href: "/boggle-solver", description: "Solve Boggle grids" },
  { name: "Crossword Solver", href: "/crossword-solver", description: "Crossword help" },
  { name: "Word Search Solver", href: "/word-search-solver", description: "Find hidden words" },
  { name: "Hangman Solver", href: "/hangman-solver", description: "Hangman helper" },
  { name: "Letter Boxed Solver", href: "/letter-boxed-solver", description: "NYT Letter Boxed" },
]

// Navigation 2: List of Words (3 categories)
const wordLists = [
  { name: "Words by Length", href: "/words-by-length", description: "Browse words by letter count" },
  { name: "Words Start With", href: "/words-start-with", description: "Words beginning with specific letters" },
  { name: "Words With Letters", href: "/words-with-letters", description: "Words containing certain letters" },
]

// Navigation 3: Words by Length (10-letter to 2-letter)
const wordsByLength = [
  { name: "10-Letter Words", href: "/10-letter-words", count: "400+" },
  { name: "9-Letter Words", href: "/9-letter-words", count: "400+" },
  { name: "8-Letter Words", href: "/8-letter-words", count: "300+" },
  { name: "7-Letter Words", href: "/7-letter-words", count: "400+" },
  { name: "6-Letter Words", href: "/6-letter-words", count: "500+" },
  { name: "5-Letter Words", href: "/5-letter-words", count: "1000+" },
  { name: "4-Letter Words", href: "/4-letter-words", count: "800+" },
  { name: "3-Letter Words", href: "/3-letter-words", count: "400+" },
  { name: "2-Letter Words", href: "/2-letter-words", count: "31" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-bold rounded-lg shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-none">Word Unscrambler</div>
              <div className="text-xs text-muted-foreground">Solve any word game</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {/* Home */}
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Navigation 1: Word Finders */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Word Finders
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">All Word Finder Tools</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {wordFinders.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="group flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Navigation 2: List of Words */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  List of Words
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Browse Word Lists</h4>
                    <div className="space-y-2">
                      {wordLists.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="group flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Navigation 3: Words by Length */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  <Hash className="mr-2 h-4 w-4" />
                  Words by Length
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[350px] p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Quick Access by Letter Count</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {wordsByLength.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center justify-between rounded-md p-2.5 hover:bg-accent transition-colors"
                          >
                            <span className="text-sm font-medium">{item.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {item.count}
                            </Badge>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <Info className="mr-2 h-4 w-4" />
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-8">
                  {/* Home */}
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-lg font-semibold hover:text-primary transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Link>

                  {/* Word Finders */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      WORD FINDERS
                    </h3>
                    <div className="flex flex-col gap-1">
                      {wordFinders.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* List of Words */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      LIST OF WORDS
                    </h3>
                    <div className="flex flex-col gap-1">
                      {wordLists.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Words by Length */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      WORDS BY LENGTH
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {wordsByLength.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm px-3 py-2 rounded-md hover:bg-accent transition-colors text-center"
                        >
                          {item.name.replace(" Words", "")}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* About */}
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-lg font-semibold hover:text-primary transition-colors pt-4 border-t"
                  >
                    <Info className="h-5 w-5" />
                    About
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
