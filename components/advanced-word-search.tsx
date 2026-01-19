"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Search, HelpCircle } from "lucide-react"
import { ALL_WORDS } from "@/lib/dictionary"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AdvancedWordSearchProps {
  onSearch?: (results: string[]) => void
  defaultEnds?: string
}

export function AdvancedWordSearch({ onSearch, defaultEnds = "" }: AdvancedWordSearchProps) {
  const [letters, setLetters] = useState("")
  const [starts, setStarts] = useState("")
  const [ends, setEnds] = useState(defaultEnds)
  const [contains, setContains] = useState("")
  const [length, setLength] = useState("")
  const [exclude, setExclude] = useState("")
  const [include, setInclude] = useState("")
  const [gameMode, setGameMode] = useState("all")

  const handleSearch = () => {
    let filtered = ALL_WORDS

    // Filter by main letters input (if provided)
    if (letters.trim()) {
      const letterSet = letters.toLowerCase().trim().split("")
      filtered = filtered.filter((word) => {
        const wordLetters = word.split("")
        return letterSet.every((letter) => wordLetters.includes(letter))
      })
    }

    // Filter by starts with
    if (starts.trim()) {
      filtered = filtered.filter((word) => word.startsWith(starts.toLowerCase().trim()))
    }

    // Filter by ends with
    if (ends.trim()) {
      filtered = filtered.filter((word) => word.endsWith(ends.toLowerCase().trim()))
    }

    // Filter by contains
    if (contains.trim()) {
      filtered = filtered.filter((word) => word.includes(contains.toLowerCase().trim()))
    }

    // Filter by length
    if (length.trim()) {
      const len = Number(length)
      if (!isNaN(len) && len > 0) {
        filtered = filtered.filter((word) => word.length === len)
      }
    }

    // Filter by exclude letters
    if (exclude.trim()) {
      const excludeLetters = exclude.toLowerCase().trim().split("")
      filtered = filtered.filter((word) => {
        return !excludeLetters.some((letter) => word.includes(letter))
      })
    }

    // Filter by include letters (must contain all these letters)
    if (include.trim()) {
      const includeLetters = include.toLowerCase().trim().split("")
      filtered = filtered.filter((word) => {
        return includeLetters.every((letter) => word.includes(letter))
      })
    }

    // Sort results
    filtered.sort((a, b) => {
      // First by length (longer first), then alphabetically
      if (a.length !== b.length) {
        return b.length - a.length
      }
      return a.localeCompare(b)
    })

    onSearch?.(filtered)
  }

  const handleReset = () => {
    setLetters("")
    setStarts("")
    setEnds(defaultEnds)
    setContains("")
    setLength("")
    setExclude("")
    setInclude("")
    setGameMode("all")
    onSearch?.([])
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Words Ending In</CardTitle>
        <CardDescription className="text-center">
          Enter up to 3 wildcards (? or space)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={letters}
            onChange={(e) => setLetters(e.target.value.toLowerCase())}
            placeholder="YOUR LETTERS"
            className="pl-10 h-14 text-lg text-center placeholder:text-muted-foreground/40 placeholder:text-lg uppercase"
            maxLength={15}
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Starts */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="starts" className="text-sm font-medium">
                Starts
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Words that start with these letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="starts"
              type="text"
              value={starts}
              onChange={(e) => setStarts(e.target.value.toLowerCase())}
              placeholder="e.g., abc"
              className="h-10"
            />
          </div>

          {/* Ends */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="ends" className="text-sm font-medium">
                Ends
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Words that end with these letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="ends"
              type="text"
              value={ends}
              onChange={(e) => setEnds(e.target.value.toLowerCase())}
              placeholder="e.g., ing"
              className="h-10"
            />
          </div>

          {/* Contains */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="contains" className="text-sm font-medium">
                Contains
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Words containing these letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="contains"
              type="text"
              value={contains}
              onChange={(e) => setContains(e.target.value.toLowerCase())}
              placeholder="e.g., xyz"
              className="h-10"
            />
          </div>

          {/* Length */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="length" className="text-sm font-medium">
                Length
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Exact number of letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="e.g., 5"
              className="h-10"
              min="2"
              max="15"
            />
          </div>

          {/* Exclude */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="exclude" className="text-sm font-medium">
                Exclude
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Don't include these letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="exclude"
              type="text"
              value={exclude}
              onChange={(e) => setExclude(e.target.value.toLowerCase())}
              placeholder="e.g., qz"
              className="h-10"
            />
          </div>

          {/* Include */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="include" className="text-sm font-medium">
                Include
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Must include these letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="include"
              type="text"
              value={include}
              onChange={(e) => setInclude(e.target.value.toLowerCase())}
              placeholder="e.g., aei"
              className="h-10"
            />
          </div>
        </div>

        {/* Game Mode Selector */}
        <div className="space-y-2">
          <Label htmlFor="gameMode" className="text-sm font-medium">
            Dictionary
          </Label>
          <select
            id="gameMode"
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="all">All Words</option>
            <option value="scrabble">Scrabble Dictionary</option>
            <option value="wwf">Words With Friends</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSearch}
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Search className="mr-2 h-4 w-4" />
            SEARCH
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="h-12 px-6"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
