"use client"

import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

const wordFinders = [
  { name: "Wordle", href: "/wordle" },
  { name: "Anagram Solver", href: "/anagram-solver" },
  { name: "Jumble Solver", href: "/jumble-solver" },
  { name: "Scrabble Go Word Finder", href: "/scrabble-go" },
  { name: "Scrabble Word Finder", href: "/scrabble" },
  { name: "Scrabble® and Scrabble® Go Cheat", href: "/scrabble-cheat" },
  { name: "Unscramble Words", href: "/unscramble" },
  { name: "Word Cookies Cheat", href: "/word-cookies" },
  { name: "Word Descrambler", href: "/descrambler" },
  { name: "Word Finder - Scrabble and Words With Friends Cheat", href: "/word-finder" },
  { name: "Word Generator", href: "/word-generator" },
  { name: "Word Scramble", href: "/word-scramble" },
  { name: "Word Solver", href: "/word-solver" },
  { name: "Word Unscrambler", href: "/word-unscrambler" },
  { name: "Wordfeud Cheat", href: "/wordfeud" },
  { name: "Wordle Solver", href: "/wordle-solver" },
  { name: "Words with Friends Help", href: "/words-with-friends" },
  { name: "Wordscapes Cheats and Answers", href: "/wordscapes" },
]

const listOfWords = [
  { name: "Words by Length", href: "/words-by-length" },
  { name: "Words Start With", href: "/words-start-with" },
  { name: "Words With Letters", href: "/words-with-letters" },
]

const wordsByLength = [
  { name: "10-Letter Words", href: "/10-letter-words" },
  { name: "9-Letter Words", href: "/9-letter-words" },
  { name: "8-Letter Words", href: "/8-letter-words" },
  { name: "7-Letter Words", href: "/7-letter-words" },
  { name: "6-Letter Words", href: "/6-letter-words" },
  { name: "5-Letter Words", href: "/5-letter-words" },
  { name: "4-Letter Words", href: "/4-letter-words" },
  { name: "3-Letter Words", href: "/3-letter-words" },
  { name: "2-Letter Words", href: "/2-letter-words" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground font-bold rounded">
              W
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">Word Unscrambler</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">Word Finders</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {wordFinders.map((item) => (
                      <NavigationMenuLink key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">List of Words</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[250px] gap-3 p-4">
                    {listOfWords.map((item) => (
                      <NavigationMenuLink key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">Words by Length</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[300px] gap-3 p-4 md:grid-cols-2">
                    {wordsByLength.map((item) => (
                      <NavigationMenuLink key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <nav className="flex flex-col gap-4 mt-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Word Finders</h3>
                    <div className="flex flex-col gap-1">
                      {wordFinders.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">List of Words</h3>
                    <div className="flex flex-col gap-1">
                      {listOfWords.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Words by Length</h3>
                    <div className="flex flex-col gap-1">
                      {wordsByLength.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
