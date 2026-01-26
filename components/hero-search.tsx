"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, ArrowRight } from "lucide-react"

const EXAMPLE_QUERIES = [
  { letters: "HELLO", result: "SOLVE", count: 15 },
  { letters: "PUZZLE", result: "APPLE", count: 23 },
  { letters: "GAMES", result: "SEAM", count: 18 },
]

export function HeroSearch() {
  const [letters, setLetters] = useState("")
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!letters.trim()) return
    setIsSearching(true)
    router.push(`/word-unscrambler?q=${encodeURIComponent(letters.trim())}`)
  }

  const handleExample = (example: string) => {
    setLetters(example)
    setTimeout(() => handleSearch(), 100)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Main Search */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Enter up to 15 letters (use ? for wildcards)..."
            className="pl-12 pr-4 h-16 text-lg bg-card border-2 border-primary/20 focus:border-primary shadow-lg"
            value={letters}
            onChange={(e) => setLetters(e.target.value.toLowerCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
            maxLength={15}
            autoFocus
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Supports wildcards: <code className="px-1 py-0.5 bg-muted rounded">?</code> or <code className="px-1 py-0.5 bg-muted rounded">_</code></span>
          </div>
          <Button
            size="lg"
            onClick={handleSearch}
            disabled={!letters.trim() || isSearching}
            className="px-8 h-12 button-lift"
          >
            {isSearching ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                Find Words
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm text-muted-foreground">Quick examples:</span>
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example.letters}
            onClick={() => handleExample(example.letters)}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all"
          >
            <Badge variant="secondary" className="font-mono">
              {example.letters}
            </Badge>
            <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">{example.count} words</span>
          </button>
        ))}
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-primary">100K+</div>
          <div className="text-xs text-muted-foreground">Words in Database</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-primary">5</div>
          <div className="text-xs text-muted-foreground">Game Dictionaries</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-primary">Instant</div>
          <div className="text-xs text-muted-foreground">Results</div>
        </div>
      </div>
    </div>
  )
}
