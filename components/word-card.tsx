"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { WordDefinitionDialog } from "@/components/word-definition-dialog"

interface WordCardProps {
  word: string
  className?: string
  children?: React.ReactNode
}

export function WordCard({ word, className, children }: WordCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <Card
        className={`cursor-pointer hover:shadow-lg transition-all ${className || ""}`}
        onClick={() => setDialogOpen(true)}
      >
        {children}
      </Card>

      <WordDefinitionDialog
        word={word}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
