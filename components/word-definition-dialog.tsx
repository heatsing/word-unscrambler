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
import { Loader2, Volume2, BookOpen, Brain, GraduationCap, Sparkles, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useWordLearning, type MasteryLevel } from "@/hooks/use-word-learning"
import { useFavoriteWords } from "@/hooks/use-favorite-words"
import { toast } from "sonner"

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
      antonyms?: string[]
    }>
    synonyms?: string[]
    antonyms?: string[]
  }>
  origin?: string
  sourceUrls?: string[]
}

interface WordDefinitionDialogProps {
  word: string
  open: boolean
  onOpenChange: (open: boolean) => void
  score?: number
  length?: number
  dictionaryType?: string
}

export function WordDefinitionDialog({
  word,
  open,
  onOpenChange,
  score = 0,
  length = 0,
  dictionaryType
}: WordDefinitionDialogProps) {
  const [definition, setDefinition] = useState<WordDefinition | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { isLearning, getLearningInfo, addToLearning, removeFromLearning, updateMasteryLevel } = useWordLearning()
  const { isFavorite, toggleFavorite } = useFavoriteWords()

  const learningInfo = getLearningInfo(word)
  const isWordLearning = isLearning(word)
  const isWordFavorite = isFavorite(word)

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
        toast.error(`Could not find definition for "${word}"`)
      } finally {
        setLoading(false)
      }
    }

    fetchDefinition()
  }, [word, open])

  const handleAddToLearning = () => {
    addToLearning(word, score, length, dictionaryType)
    toast.success(`Added "${word}" to learning list`)
  }

  const handleRemoveFromLearning = () => {
    removeFromLearning(word)
    toast.success(`Removed "${word}" from learning list`)
  }

  const handleToggleFavorite = () => {
    const wasFavorite = isWordFavorite
    toggleFavorite(word, score, length, dictionaryType)

    if (wasFavorite) {
      toast.success(`Removed "${word}" from favorites`)
    } else {
      toast.success(`Added "${word}" to favorites`)
    }
  }

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
              {/* Etymology Section */}
              {definition.origin && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Etymology</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {definition.origin}
                  </p>
                  <Separator />
                </div>
              )}

              {/* Definitions Section */}
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
                            <span className="text-xs">Example: </span>"{def.example}"
                          </div>
                        )}

                        {def.synonyms && def.synonyms.length > 0 && (
                          <div className="ml-6 mt-2">
                            <span className="text-xs text-muted-foreground">
                              Synonyms: {def.synonyms.slice(0, 5).join(", ")}
                            </span>
                          </div>
                        )}

                        {def.antonyms && def.antonyms.length > 0 && (
                          <div className="ml-6 mt-1">
                            <span className="text-xs text-muted-foreground">
                              Antonyms: {def.antonyms.slice(0, 5).join(", ")}
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}

              {/* Comprehensive Synonyms Section */}
              {(() => {
                const allSynonyms = new Set<string>()
                const allAntonyms = new Set<string>()

                definition.meanings?.forEach(meaning => {
                  meaning.synonyms?.forEach(s => allSynonyms.add(s))
                  meaning.antonyms?.forEach(a => allAntonyms.add(a))
                  meaning.definitions?.forEach(def => {
                    def.synonyms?.forEach(s => allSynonyms.add(s))
                    def.antonyms?.forEach(a => allAntonyms.add(a))
                  })
                })

                if (allSynonyms.size === 0 && allAntonyms.size === 0) return null

                return (
                  <div className="space-y-3">
                    <Separator />
                    {allSynonyms.size > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-sm">Synonyms</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(allSynonyms).slice(0, 15).map((synonym, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {synonym}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {allAntonyms.size > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold text-sm">Antonyms</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(allAntonyms).slice(0, 15).map((antonym, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {antonym}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Learning Mode Section */}
              <div className="space-y-3">
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Learning Tools</h3>
                  </div>

                  {isWordLearning && learningInfo && (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Mastery Level: <span className="capitalize">{learningInfo.masteryLevel}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Reviewed {learningInfo.reviewCount} times
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {!isWordLearning ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAddToLearning}
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        Add to Learning List
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleRemoveFromLearning}
                        >
                          Remove from Learning
                        </Button>
                        <div className="flex gap-1">
                          {(['new', 'learning', 'familiar', 'mastered'] as MasteryLevel[]).map((level) => (
                            <Button
                              key={level}
                              size="sm"
                              variant={learningInfo?.masteryLevel === level ? 'default' : 'ghost'}
                              onClick={() => updateMasteryLevel(word, level)}
                              className="text-xs px-2"
                            >
                              {level}
                            </Button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
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
