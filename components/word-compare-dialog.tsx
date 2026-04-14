"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Award, TrendingUp, CheckCircle2 } from "lucide-react"
import { type WordResult } from "@/lib/word-utils"

interface WordCompareDialogProps {
  words: WordResult[]
  open: boolean
  onOpenChange: (open: boolean) => void
  dictionaryType?: string
}

export function WordCompareDialog({ words, open, onOpenChange, dictionaryType }: WordCompareDialogProps) {
  if (words.length === 0) return null

  // Calculate similarity between words
  const calculateSimilarity = (word1: string, word2: string): number => {
    const set1 = new Set(word1.split(''))
    const set2 = new Set(word2.split(''))
    const intersection = new Set([...set1].filter(x => set2.has(x)))
    const union = new Set([...set1, ...set2])
    return Math.round((intersection.size / union.size) * 100)
  }

  // Find best word based on score
  const bestByScore = words.reduce((max, w) => w.score > max.score ? w : max, words[0])

  // Find longest word
  const longest = words.reduce((max, w) => w.length > max.length ? w : max, words[0])

  // Calculate average similarity
  const avgSimilarity = words.length > 1
    ? Math.round(
        words.reduce((sum, w1, i) => {
          return sum + words.slice(i + 1).reduce((innerSum, w2) => {
            return innerSum + calculateSimilarity(w1.word, w2.word)
          }, 0)
        }, 0) / (words.length * (words.length - 1) / 2)
      )
    : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Word Comparison ({words.length} words)
          </DialogTitle>
          <DialogDescription>
            Compare selected words side-by-side to find the best option
          </DialogDescription>
        </DialogHeader>

        {/* Summary Statistics */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Best Score</p>
              <p className="text-lg font-bold text-primary capitalize">{bestByScore.word}</p>
              <p className="text-xs text-muted-foreground">{bestByScore.score} pts</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Longest Word</p>
              <p className="text-lg font-bold capitalize">{longest.word}</p>
              <p className="text-xs text-muted-foreground">{longest.length} letters</p>
            </div>
            {words.length > 1 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Avg Similarity</p>
                <p className="text-lg font-bold">{avgSimilarity}%</p>
                <p className="text-xs text-muted-foreground">Letter overlap</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Word Comparison Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {words.map((word, index) => {
            const isBestScore = word.word === bestByScore.word
            const isLongest = word.word === longest.word

            return (
              <Card
                key={word.word}
                className={`${isBestScore || isLongest ? 'border-primary/50 bg-primary/5' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold capitalize">
                      {word.word}
                    </CardTitle>
                    <div className="flex flex-col gap-1">
                      {isBestScore && (
                        <Badge variant="default" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Best
                        </Badge>
                      )}
                      {isLongest && !isBestScore && (
                        <Badge variant="secondary" className="text-xs">
                          Longest
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Word Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Score</p>
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{word.score}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Length</p>
                      <span className="font-semibold">{word.length} letters</span>
                    </div>
                  </div>

                  {/* Similarity with other words */}
                  {words.length > 1 && (
                    <div className="space-y-2 pt-2 border-t">
                      <p className="text-xs text-muted-foreground font-medium">Similarity</p>
                      <div className="space-y-1">
                        {words
                          .filter(w => w.word !== word.word)
                          .map(otherWord => {
                            const similarity = calculateSimilarity(word.word, otherWord.word)
                            return (
                              <div key={otherWord.word} className="flex items-center justify-between text-xs">
                                <span className="capitalize">{otherWord.word}</span>
                                <Badge variant="outline" className="text-xs">
                                  {similarity}%
                                </Badge>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )}

                  {/* Letter breakdown */}
                  <div className="space-y-1 pt-2 border-t">
                    <p className="text-xs text-muted-foreground font-medium">Letters</p>
                    <div className="flex flex-wrap gap-1">
                      {word.word.split('').map((letter, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {letter.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recommendation */}
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Based on the comparison, <strong className="capitalize">{bestByScore.word}</strong> is recommended
              for the highest score ({bestByScore.score} points).
              {longest.word !== bestByScore.word && (
                <> However, if you need a longer word, consider <strong className="capitalize">{longest.word}</strong>
                ({longest.length} letters).</>
              )}
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
