"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
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
import { useState, memo, useMemo } from "react"

// Navigation 1: Word Finders (18 tools)
const wordFinders = [
  { name: "Word Unscrambler", href: "/word-unscrambler", description: "Unscramble any letters" },
  { name: "Anagram Solver", href: "/anagram-solver", description: "Find anagrams" },
  { name: "Scrabble Word Finder", href: "/scrabble", description: "High-scoring words" },
  { name: "Scrabble Go", href: "/scrabble-go", description: "Scrabble Go helper" },
  { name: "Words with Friends", href: "/words-with-friends", description: "WWF cheat tool" },
  { name: "Word Generator", href: "/word-generator", description: "Random words" },
  { name: "Word Scramble", href: "/word-scramble", description: "Scramble solver" },
  { name: "Boggle Solver", href: "/boggle-solver", description: "Solve Boggle grids" },
  { name: "Crossword Solver", href: "/crossword-solver", description: "Crossword help" },
  { name: "Word Finder", href: "/word-finder", description: "Find words by letters" },
  { name: "Descrambler", href: "/descrambler", description: "Descramble letters fast" },
  { name: "Unscramble", href: "/unscramble", description: "Unscramble words quickly" },
  { name: "Text Twist", href: "/text-twist", description: "Text Twist solver" },
  { name: "Word Search Solver", href: "/word-search-solver", description: "Find hidden words" },
  { name: "Hangman Solver", href: "/hangman-solver", description: "Hangman helper" },
  { name: "Letter Boxed Solver", href: "/letter-boxed-solver", description: "Letter Boxed helper" },
]

// Navigation: Daily Game Hints（更偏“每日游戏提示/答案”的页面）
const dailyGameHints = [
  { name: "Wordle", href: "/wordle", description: "Daily Wordle hub" },
  { name: "Wordle Solver", href: "/wordle-solver", description: "Solve today's Wordle" },
  { name: "Jumble Solver", href: "/jumble-solver", description: "Daily Jumble answers" },
  { name: "Wordscapes", href: "/wordscapes", description: "Daily Wordscapes help" },
  { name: "Word Cookies", href: "/word-cookies", description: "Daily Word Cookies answers" },
  { name: "Wordfeud", href: "/wordfeud", description: "Wordfeud tips & help" },
]

// Navigation 2: List of Words (5 categories)
const wordLists = [
  { name: "Words by Length", href: "/words-by-length", description: "Browse words by letter count" },
  { name: "Words Start With", href: "/words-start-with", description: "Words beginning with specific letters" },
  { name: "Words With Letters", href: "/words-with-letters", description: "Words containing certain letters" },
  { name: "Words Ending In", href: "/words-ending-in", description: "Words ending with specific letters" },
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

// Memoized Navigation Link Component
const NavLink = memo(({ href, name, onClick }: { href: string; name: string; onClick?: () => void }) => (
  <NavigationMenuLink asChild>
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg p-2.5 hover:bg-accent transition-colors block will-change-transform"
    >
      <div className="text-sm font-medium">{name}</div>
    </Link>
  </NavigationMenuLink>
))
NavLink.displayName = "NavLink"

// Memoized Mobile Link Component
const MobileNavLink = memo(({ href, name, onClick }: { href: string; name: string; onClick: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors will-change-transform"
  >
    {name}
  </Link>
))
MobileNavLink.displayName = "MobileNavLink"

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Memoize handlers to prevent re-renders
  const closeMobile = useMemo(() => () => setMobileOpen(false), [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
      style={{ contain: 'layout style' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <span className="text-xl font-bold">W</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-none">Word Unscrambler</div>
              <div className="text-xs text-muted-foreground">Solve any word game</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {/* Navigation 1: Word Finders - 对应 wordFinders 数组 */}
              <NavigationMenuItem value="word-finders">
                <NavigationMenuTrigger className="text-sm" id="nav-word-finders-trigger">
                  Word Finders
                </NavigationMenuTrigger>
                <NavigationMenuContent aria-labelledby="nav-word-finders-trigger">
                  <div className="w-[560px] p-4" style={{ contain: 'layout' }}>
                    <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Word Finders
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {wordFinders.map((item) => (
                        <NavLink key={item.href} href={item.href} name={item.name} />
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Navigation: Daily Game Hints - 从 Word Finders 中迁移的“每日游戏提示” */}
              <NavigationMenuItem value="daily-game-hints">
                <NavigationMenuTrigger className="text-sm" id="nav-daily-game-hints-trigger">
                  Daily Game Hints
                </NavigationMenuTrigger>
                <NavigationMenuContent aria-labelledby="nav-daily-game-hints-trigger">
                  <div className="w-[360px] p-4" style={{ contain: 'layout' }}>
                    <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Daily Game Hints
                    </div>
                    <div className="grid grid-cols-1 gap-y-1">
                      {dailyGameHints.map((item) => (
                        <NavLink key={item.href} href={item.href} name={item.name} />
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Navigation 2: List of Words - 对应 wordLists 数组 */}
              <NavigationMenuItem value="list-of-words">
                <NavigationMenuTrigger className="text-sm" id="nav-list-of-words-trigger">
                  List of Words
                </NavigationMenuTrigger>
                <NavigationMenuContent aria-labelledby="nav-list-of-words-trigger">
                  <div className="w-[280px] p-4" style={{ contain: 'layout' }}>
                    <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      List of Words
                    </div>
                    <div className="space-y-1">
                      {wordLists.map((item) => (
                        <NavLink key={item.href} href={item.href} name={item.name} />
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Navigation 3: Words by Length - 对应 wordsByLength 数组 */}
              <NavigationMenuItem value="words-by-length">
                <NavigationMenuTrigger className="text-sm" id="nav-words-by-length-trigger">
                  Words by Length
                </NavigationMenuTrigger>
                <NavigationMenuContent aria-labelledby="nav-words-by-length-trigger">
                  <div className="w-[400px] p-4" style={{ contain: 'layout' }}>
                    <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Words by Length
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {wordsByLength.map((item) => (
                        <NavLink key={item.href} href={item.href} name={item.name} />
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About - 无下拉菜单 */}
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu - Optimized */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] overflow-y-auto"
                style={{ contain: 'layout style paint' }}
              >
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-8" style={{ willChange: 'scroll-position' }}>
                  {/* Word Finders - Grid layout for mobile */}
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

                  {/* Daily Game Hints */}
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

                  {/* List of Words */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                      LIST OF WORDS
                    </h3>
                    <div className="flex flex-col gap-1">
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

                  {/* Words by Length - Compact grid */}
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
                          className="text-sm px-2 py-2 rounded-md hover:bg-accent transition-colors text-center will-change-transform"
                        >
                          {item.name.replace(" Words", "")}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* About */}
                  <Link
                    href="/about"
                    onClick={closeMobile}
                    className="flex items-center gap-3 text-lg font-semibold hover:text-primary transition-colors pt-4 border-t will-change-transform"
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
