"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, Volume2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WordDefinition {
  word: string
  phonetic?: string
  phonetics?: Array<{
    text?: string
    audio?: string
  }>
  meanings?: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
      synonyms?: string[]
    }>
  }>
}

interface WordDefinitionDialogProps {
  word: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WordDefinitionDialog({ word, open, onOpenChange }: WordDefinitionDialogProps) {
  const [definition, setDefinition] = useState<WordDefinition | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !word) {
      return
    }

    const fetchDefinition = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
        )

        if (!response.ok) {
          throw new Error("Definition not found")
        }

        const data = await response.json()
        setDefinition(data[0])
      } catch (err) {
        setError("No definition found for this word")
        setDefinition(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDefinition()
  }, [word, open])

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl)
    audio.play()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize flex items-center gap-3">
            {word}
            {definition?.phonetic && (
              <span className="text-base font-normal text-muted-foreground">
                {definition.phonetic}
              </span>
            )}
            {definition?.phonetics?.[0]?.audio && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => playAudio(definition.phonetics![0].audio!)}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>
            Word definition and usage
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading definition...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">{error}</p>
              <p className="text-sm text-muted-foreground mt-2">
                This word may be valid for word games but doesn't have a definition in our dictionary.
              </p>
            </div>
          )}

          {definition && !loading && (
            <div className="space-y-6">
              {definition.meanings?.map((meaning, meaningIndex) => (
                <div key={meaningIndex} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {meaning.partOfSpeech}
                    </Badge>
                  </div>

                  <ol className="space-y-4 list-decimal list-inside">
                    {meaning.definitions.slice(0, 3).map((def, defIndex) => (
                      <li key={defIndex} className="text-sm space-y-2">
                        <span className="font-medium">{def.definition}</span>

                        {def.example && (
                          <div className="ml-6 mt-1 text-muted-foreground italic">
                            "{def.example}"
                          </div>
                        )}

                        {def.synonyms && def.synonyms.length > 0 && (
                          <div className="ml-6 mt-2">
                            <span className="text-xs text-muted-foreground">
                              Synonyms: {def.synonyms.slice(0, 5).join(", ")}
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Powered by Free Dictionary API
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
