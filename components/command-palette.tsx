"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Search, Type, Target, Grid3x3, List, BookOpen, FileText } from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const tools = [
  { name: "Word Unscrambler", href: "/word-unscrambler", icon: Type },
  { name: "Wordle Solver", href: "/wordle-solver", icon: Target },
  { name: "Anagram Solver", href: "/anagram-solver", icon: Search },
  { name: "Scrabble Word Finder", href: "/scrabble", icon: Grid3x3 },
  { name: "Words with Friends", href: "/words-with-friends", icon: BookOpen },
  { name: "Jumble Solver", href: "/jumble-solver", icon: List },
]

const wordLists = [
  { name: "5 Letter Words", href: "/5-letter-words" },
  { name: "6 Letter Words", href: "/6-letter-words" },
  { name: "7 Letter Words", href: "/7-letter-words" },
  { name: "Words Starting With", href: "/words-start-with" },
  { name: "Words Ending In", href: "/words-ending-in" },
  { name: "Words by Length", href: "/words-by-length" },
]

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelect = useCallback((path: string) => {
    onOpenChange(false)
    router.push(path)
    setSearchQuery("")
  }, [router, onOpenChange])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search for tools, word lists, or enter letters..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Quick unscramble */}
        {searchQuery.length >= 2 && (
          <>
            <CommandGroup heading="Quick Actions">
              <CommandItem
                onSelect={() => handleSelect(`/word-unscrambler?q=${searchQuery}`)}
              >
                <Search className="mr-2 h-4 w-4" />
                <span>Unscramble "{searchQuery}"</span>
              </CommandItem>
              <CommandItem
                onSelect={() => handleSelect(`/anagram-solver?q=${searchQuery}`)}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>Find anagrams of "{searchQuery}"</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        <CommandGroup heading="Word Tools">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <CommandItem
                key={tool.href}
                onSelect={() => handleSelect(tool.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{tool.name}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Word Lists">
          {wordLists.map((list) => (
            <CommandItem
              key={list.href}
              onSelect={() => handleSelect(list.href)}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>{list.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
