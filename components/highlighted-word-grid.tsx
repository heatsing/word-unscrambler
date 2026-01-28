"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"

interface HighlightedWordGridProps {
  words: string[]
  highlightLetter: string
  className?: string
}

export function HighlightedWordGrid({ words, highlightLetter, className }: HighlightedWordGridProps) {
  const [selectedWord, setSelectedWord] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <div className={className || "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}>
        {words.map((word, index) => {
          const letterIndex = word.toLowerCase().indexOf(highlightLetter.toLowerCase())
          const before = word.slice(0, letterIndex)
          const match = word.slice(letterIndex, letterIndex + 1)
          const after = word.slice(letterIndex + 1)

          return (
            <Card
              key={`${word}-${index}`}
              className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              onClick={() => {
                setSelectedWord(word)
                setDialogOpen(true)
              }}
            >
              <span className="font-semibold uppercase">
                {before}
                <span className="text-primary font-bold">{match}</span>
                {after}
              </span>
            </Card>
          )
        })}
      </div>

      <WordDefinitionDialog
        word={selectedWord}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
