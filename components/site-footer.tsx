import Link from "next/link"

const footerLinks = {
  "Word Finders": [
    { name: "Word Unscrambler", href: "/word-unscrambler" },
    { name: "Anagram Solver", href: "/anagram-solver" },
    { name: "Wordle Solver", href: "/wordle-solver" },
    { name: "Scrabble Word Finder", href: "/scrabble" },
    { name: "Words with Friends", href: "/words-with-friends" },
  ],
  "Word Lists": [
    { name: "5-Letter Words", href: "/5-letter-words" },
    { name: "6-Letter Words", href: "/6-letter-words" },
    { name: "7-Letter Words", href: "/7-letter-words" },
    { name: "Words by Length", href: "/words-by-length" },
    { name: "Words Start With", href: "/words-start-with" },
  ],
  Resources: [
    { name: "Word Generator", href: "/word-generator" },
    { name: "Word Solver", href: "/word-solver" },
    { name: "Word Scramble", href: "/word-scramble" },
    { name: "Wordscapes Cheats", href: "/wordscapes" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-sm">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Word Unscrambler. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
              Scrabble® is a registered trademark. Words with Friends® is a registered trademark. This site is not
              affiliated with Scrabble®, Words with Friends®, or any other game.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
