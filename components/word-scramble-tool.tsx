"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle } from "lucide-react"

const WORD_POOL = ["ELEPHANT", "MOUNTAIN", "BUTTERFLY", "COMPUTER", "HAPPINESS", "TREASURE"]

export function WordScrambleTool() {
  const [originalWord, setOriginalWord] = useState("")
  const [scrambledWord, setScrambledWord] = useState("")

  const scrambleWord = () => {
    const word = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)]
    const scrambled = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
    setOriginalWord(word)
    setScrambledWord(scrambled)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Generate Scrambled Word</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={scrambleWord} className="w-full" size="lg">
          <Shuffle className="mr-2 h-4 w-4" />
          Generate New Scramble
        </Button>
        {scrambledWord && (
          <div className="space-y-4 pt-4">
            <div className="text-center p-6 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Scrambled Word:</p>
              <p className="text-3xl font-bold tracking-wider">{scrambledWord}</p>
            </div>
            <details className="text-center">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Show Answer
              </summary>
              <p className="mt-4 text-2xl font-bold text-primary">{originalWord}</p>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
