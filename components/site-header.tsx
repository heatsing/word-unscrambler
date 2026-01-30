"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavDropdown, NavDropdownLink } from "@/components/nav-dropdown"
import { useState, useMemo } from "react"

// Navigation 1: Word Finders
const wordFinders = [
  { name: "Word Unscrambler", href: "/word-unscrambler", description: "Unscramble any letters" },
  { name: "Anagram Solver", href: "/anagram-solver", description: "Find anagrams" },
  { name: "Scrabble Word Finder", href: "/scrabble", description: "High-scoring words" },
  { name: "Scrabble Go", href: "/scrabble-go", description: "Scrabble Go helper" },
  { name: "Words with Friends", href: "/words-with-friends", description: "WWF cheat tool" },
  { name: "Word Generator", href: "/word-generator", description: "Random words" },
  { name: "Word Scramble", href: "/word-scramble", description: "Scramble solver" },
  { name: "Boggle Solver", href: "/boggle-solver", description: "Solve Boggle grids" },
  { name: "Word Finder", href: "/word-finder", description: "Find words by letters" },
  { name: "Descrambler", href: "/descrambler", description: "Descramble letters fast" },
  { name: "Unscramble", href: "/unscramble", description: "Unscramble words quickly" },
  { name: "Text Twist", href: "/text-twist", description: "Text Twist solver" },
  { name: "Word Search Solver", href: "/word-search-solver", description: "Find hidden words" },
  { name: "Hangman Solver", href: "/hangman-solver", description: "Hangman helper" },
  { name: "Letter Boxed Solver", href: "/letter-boxed-solver", description: "Letter Boxed helper" },
]

const dailyGameHints = [
  { name: "Wordle", href: "/wordle", description: "Daily Wordle hub" },
  { name: "Wordle Solver", href: "/wordle-solver", description: "Solve today's Wordle" },
  { name: "Jumble Solver", href: "/jumble-solver", description: "Daily Jumble answers" },
  { name: "Wordscapes", href: "/wordscapes", description: "Daily Wordscapes help" },
  { name: "Word Cookies", href: "/word-cookies", description: "Daily Word Cookies answers" },
  { name: "Wordfeud", href: "/wordfeud", description: "Wordfeud tips & help" },
]

const wordLists = [
  { name: "Words by Length", href: "/words-by-length", description: "Browse words by letter count" },
  { name: "Words Start With", href: "/words-start-with", description: "Words beginning with specific letters" },
  { name: "Words With Letters", href: "/words-with-letters", description: "Words containing certain letters" },
  { name: "Words Ending In", href: "/words-ending-in", description: "Words ending with specific letters" },
]

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

function MobileNavLink({
  href,
  name,
  onClick,
}: {
  href: string
  name: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm px-3 py-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground active:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 cursor-pointer touch-manipulation"
      aria-label={name}
    >
      {name}
    </Link>
  )
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useMemo(() => () => setMobileOpen(false), [])

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
      style={{ contain: "layout style" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md transition-colors duration-200"
            aria-label="Word Unscrambler Home"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200 group-active:scale-95">
              <span className="text-xl font-bold">W</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-none">Word Unscrambler</div>
              <div className="text-xs text-muted-foreground">Solve any word game</div>
            </div>
          </Link>

          {/* Desktop Navigation: NavDropdown per menu, no shared viewport */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            <NavDropdown
              id="nav-word-finders"
              label="Word Finders"
              className="shrink-0"
              panelClassName="w-[560px] p-4"
            >
              <div className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Word Finders
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {wordFinders.map((item) => (
                  <NavDropdownLink key={item.href} href={item.href}>
                    {item.name}
                  </NavDropdownLink>
                ))}
              </div>
            </NavDropdown>

            <NavDropdown
              id="nav-list-of-words"
              label="List of Words"
              className="shrink-0"
              panelClassName="w-[280px] p-4"
            >
              <div className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                List of Words
              </div>
              <div className="space-y-1">
                {wordLists.map((item) => (
                  <NavDropdownLink key={item.href} href={item.href}>
                    {item.name}
                  </NavDropdownLink>
                ))}
              </div>
            </NavDropdown>

            <NavDropdown
              id="nav-words-by-length"
              label="Words by Length"
              className="shrink-0"
              panelClassName="w-[400px] p-4"
            >
              <div className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Words by Length
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {wordsByLength.map((item) => (
                  <NavDropdownLink key={item.href} href={item.href}>
                    {item.name}
                  </NavDropdownLink>
                ))}
              </div>
            </NavDropdown>

            <NavDropdown
              id="nav-daily-game-hints"
              label="Daily Game Hints"
              className="shrink-0"
              panelClassName="w-[360px] p-4"
            >
              <div className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Daily Game Hints
              </div>
              <div className="space-y-1">
                {dailyGameHints.map((item) => (
                  <NavDropdownLink key={item.href} href={item.href}>
                    {item.name}
                  </NavDropdownLink>
                ))}
              </div>
            </NavDropdown>

            <Link
              href="/about"
              className="inline-flex h-9 min-w-[44px] items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 cursor-pointer"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="min-h-[44px] min-w-[44px] cursor-pointer touch-manipulation transition-colors duration-200"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] overflow-y-auto"
                style={{ contain: "layout style paint" }}
              >
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-6 mt-8"
                  role="navigation"
                  aria-label="Main navigation"
                >
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                      WORD FINDERS
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {wordFinders.map((item) => (
                        <MobileNavLink
                          key={item.href}
                          href={item.href}
                          name={item.name.replace(" Solver", "").replace(" Finder", "")}
                          onClick={closeMobile}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                      DAILY GAME HINTS
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {dailyGameHints.map((item) => (
                        <MobileNavLink
                          key={item.href}
                          href={item.href}
                          name={item.name}
                          onClick={closeMobile}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                      LIST OF WORDS
                    </h3>
                    <div className="flex flex-col gap-2">
                      {wordLists.map((item) => (
                        <MobileNavLink
                          key={item.href}
                          href={item.href}
                          name={item.name}
                          onClick={closeMobile}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                      WORDS BY LENGTH
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {wordsByLength.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobile}
                          className="text-sm px-2 py-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground active:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 cursor-pointer touch-manipulation text-center"
                          aria-label={`${item.name.replace(" Words", "")} letter words`}
                        >
                          {item.name.replace(" Words", "")}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/about"
                    onClick={closeMobile}
                    className="flex items-center gap-3 text-lg font-semibold min-h-[44px] hover:text-primary hover:bg-accent/50 rounded-md px-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 cursor-pointer pt-4 border-t"
                    aria-label="About page"
                  >
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
