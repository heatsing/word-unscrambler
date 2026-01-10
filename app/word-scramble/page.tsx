"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle } from "lucide-react"

export default function WordScramblePage() {
  const [originalWord, setOriginalWord] = useState("")
  const [scrambledWord, setScrambledWord] = useState("")

  const scrambleWord = () => {
    const words = ["ELEPHANT", "MOUNTAIN", "BUTTERFLY", "COMPUTER", "HAPPINESS", "TREASURE"]
    const word = words[Math.floor(Math.random() * words.length)]
    const scrambled = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
    setOriginalWord(word)
    setScrambledWord(scrambled)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
            <Shuffle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Word Scramble</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Generate scrambled words for games and educational activities. Perfect for teachers and game creators.
          </p>
        </div>

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

        <Card>
          <CardHeader>
            <CardTitle>Educational Uses</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Vocabulary building exercises</p>
            <p>• Spelling practice for students</p>
            <p>• Party games and icebreakers</p>
            <p>• Brain training activities</p>
            <p>• Team building exercises</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
