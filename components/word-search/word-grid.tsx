"use client"

import { Badge } from "@/components/ui/badge"
import { WordCard } from "./word-card"
import type { WordResult, DictionaryType } from "@/lib/word-utils"
import type { ViewMode } from "./view-mode-toggle"

interface WordGridProps {
  words: WordResult[]
  viewMode: ViewMode
  compareMode: boolean
  selectedForCompare: Set<string>
  dictionaryType: DictionaryType
  isFavorite: (word: string) => boolean
  onWordClick: (word: WordResult) => void
  onFavoriteClick: (word: string, score: number, length: number, dictionaryType?: string) => void
  onCompareToggle: (word: string) => void
}

export function WordGrid({
  words,
  viewMode,
  compareMode,
  selectedForCompare,
  dictionaryType,
  isFavorite,
  onWordClick,
  onFavoriteClick,
  onCompareToggle,
}: WordGridProps) {
  // List View
  if (viewMode === "list") {
    return (
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {words.map((word, index) => (
          <WordCard
            key={`${word.word}-${index}`}
            word={word}
            index={index}
            isFavorite={isFavorite(word.word)}
            isSelected={selectedForCompare.has(word.word)}
            compareMode={compareMode}
            showTopBadge={true}
            onCardClick={() => onWordClick(word)}
            onFavoriteClick={() => onFavoriteClick(word.word, word.score, word.length, dictionaryType)}
            onCompareToggle={() => onCompareToggle(word.word)}
          />
        ))}
      </div>
    )
  }

  // Group By Length View
  if (viewMode === "groupByLength") {
    const groups: Record<number, WordResult[]> = {}
    words.forEach(word => {
      if (!groups[word.length]) {
        groups[word.length] = []
      }
      groups[word.length].push(word)
    })
    const sortedLengths = Object.keys(groups).map(Number).sort((a, b) => b - a)

    return (
      <div className="space-y-4">
        {sortedLengths.map(length => (
          <div key={length} className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2 sticky top-0 bg-background py-2 z-10">
              <Badge variant="secondary">{length} Letters</Badge>
              <span className="text-muted-foreground text-xs">({groups[length].length} words)</span>
            </h4>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {groups[length].map((word, index) => (
                <WordCard
                  key={`${word.word}-${index}`}
                  word={word}
                  index={index}
                  isFavorite={isFavorite(word.word)}
                  isSelected={selectedForCompare.has(word.word)}
                  compareMode={compareMode}
                  showTopBadge={false}
                  onCardClick={() => onWordClick(word)}
                  onFavoriteClick={() => onFavoriteClick(word.word, word.score, word.length, dictionaryType)}
                  onCompareToggle={() => onCompareToggle(word.word)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Group By Letter View
  if (viewMode === "groupByLetter") {
    const groups: Record<string, WordResult[]> = {}
    words.forEach(word => {
      const firstLetter = word.word[0].toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(word)
    })
    const sortedLetters = Object.keys(groups).sort()

    return (
      <div className="space-y-4">
        {sortedLetters.map(letter => (
          <div key={letter} className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2 sticky top-0 bg-background py-2 z-10">
              <Badge variant="secondary" className="text-lg w-10 h-10 flex items-center justify-center">{letter}</Badge>
              <span className="text-muted-foreground text-xs">({groups[letter].length} words)</span>
            </h4>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {groups[letter].map((word, index) => (
                <WordCard
                  key={`${word.word}-${index}`}
                  word={word}
                  index={index}
                  isFavorite={isFavorite(word.word)}
                  isSelected={selectedForCompare.has(word.word)}
                  compareMode={compareMode}
                  showTopBadge={false}
                  onCardClick={() => onWordClick(word)}
                  onFavoriteClick={() => onFavoriteClick(word.word, word.score, word.length, dictionaryType)}
                  onCompareToggle={() => onCompareToggle(word.word)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return null
}
