"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"

interface WordGridWithDefinitionProps {
  words: string[]
  className?: string
}

export function WordGridWithDefinition({ words, className }: WordGridWithDefinitionProps) {
  const [selectedWord, setSelectedWord] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <div className={className || "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}>
        {words.map((word, index) => (
          <Card
            key={`${word}-${index}`}
            className="p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            onClick={() => {
              setSelectedWord(word)
              setDialogOpen(true)
            }}
          >
            <span className="font-semibold uppercase">{word}</span>
          </Card>
        ))}
      </div>

      <WordDefinitionDialog
        word={selectedWord}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
