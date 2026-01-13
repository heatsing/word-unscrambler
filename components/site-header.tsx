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

const popularTools = [
  { name: "Word Unscrambler", href: "/word-unscrambler", icon: "✨", badge: "Popular" },
  { name: "Wordle Solver", href: "/wordle-solver", icon: "🎯", badge: "Hot" },
  { name: "Scrabble Word Finder", href: "/scrabble", icon: "🎲", badge: null },
  { name: "Anagram Solver", href: "/anagram-solver", icon: "🔄", badge: null },
]

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
]

const wordLists = [
  { name: "Words by Length", href: "/words-by-length", icon: "📏" },
  { name: "Words Start With", href: "/words-start-with", icon: "▶️" },
  { name: "Words With Letters", href: "/words-with-letters", icon: "🔤" },
]

const quickLengths = [
  { name: "2-Letter Words", href: "/2-letter-words", count: "31" },
  { name: "3-Letter Words", href: "/3-letter-words", count: "400+" },
  { name: "4-Letter Words", href: "/4-letter-words", count: "800+" },
  { name: "5-Letter Words", href: "/5-letter-words", count: "1000+" },
  { name: "6-Letter Words", href: "/6-letter-words", count: "500+" },
  { name: "7-Letter Words", href: "/7-letter-words", count: "300+" },
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

              {/* Tools Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Word Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-4">
                    {/* Popular Tools Section */}
                    <div className="mb-4 pb-4 border-b">
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Popular Tools</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {popularTools.map((item) => (
                          <NavigationMenuLink key={item.href} asChild>
                            <Link
                              href={item.href}
                              className="group flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                            >
                              <span className="text-2xl">{item.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{item.name}</span>
                                  {item.badge && (
                                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>

                    {/* All Tools */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">All Tools</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {wordFinders.map((item) => (
                          <NavigationMenuLink key={item.href} asChild>
                            <Link
                              href={item.href}
                              className="block rounded-md p-2 hover:bg-accent transition-colors"
                            >
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Word Lists */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Word Lists
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <div className="space-y-4">
                      {/* Browse Options */}
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Browse Words</h4>
                        <div className="space-y-1">
                          {wordLists.map((item) => (
                            <NavigationMenuLink key={item.href} asChild>
                              <Link
                                href={item.href}
                                className="flex items-center gap-3 rounded-md p-3 hover:bg-accent transition-colors"
                              >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm font-medium">{item.name}</span>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>

                      {/* Quick Access by Length */}
                      <div className="pt-4 border-t">
                        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Quick Access</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {quickLengths.map((item) => (
                            <NavigationMenuLink key={item.href} asChild>
                              <Link
                                href={item.href}
                                className="flex items-center justify-between rounded-md p-2 hover:bg-accent transition-colors"
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

                  {/* Popular Tools */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      POPULAR TOOLS
                    </h3>
                    <div className="flex flex-col gap-1">
                      {popularTools.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-sm font-medium flex-1">{item.name}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* All Word Finders */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">ALL WORD TOOLS</h3>
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

                  {/* Word Lists */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      WORD LISTS
                    </h3>
                    <div className="flex flex-col gap-1">
                      {wordLists.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          <span>{item.icon}</span>
                          <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Lengths */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      BY LENGTH
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {quickLengths.map((item) => (
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
