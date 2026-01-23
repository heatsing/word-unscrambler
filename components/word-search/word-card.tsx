"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Heart, CheckSquare, Square } from "lucide-react"
import type { WordResult } from "@/lib/word-utils"

interface WordCardProps {
  word: WordResult
  index?: number
  isFavorite: boolean
  isSelected?: boolean
  compareMode?: boolean
  showTopBadge?: boolean
  onCardClick: () => void
  onFavoriteClick: () => void
  onCompareToggle?: () => void
}

export function WordCard({
  word,
  index = 0,
  isFavorite,
  isSelected = false,
  compareMode = false,
  showTopBadge = false,
  onCardClick,
  onFavoriteClick,
  onCompareToggle,
}: WordCardProps) {
  const handleClick = () => {
    if (compareMode && onCompareToggle) {
      onCompareToggle()
    } else {
      onCardClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <Card
      className={`hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer relative group focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
      }`}
    >
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${word.word}, ${word.score} points, ${word.length} letters${compareMode ? (isSelected ? ', selected' : ', not selected') : ''}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {compareMode && (
                <div className="flex-shrink-0">
                  {isSelected ? (
                    <CheckSquare className="h-5 w-5 text-primary" />
                  ) : (
                    <Square className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              )}
              <CardTitle className="text-xl font-bold capitalize">
                {word.word}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1">
              {showTopBadge && index < 3 && !compareMode && (
                <Badge variant="default" className="ml-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Top
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-4 text-sm items-center justify-between">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{word.score} pts</span>
              </div>
              <div className="text-muted-foreground">
                {word.length} letters
              </div>
            </div>
          </div>
        </CardContent>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-11 w-11 p-0 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          onFavoriteClick()
        }}
      >
        <Heart
          className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
        />
      </Button>
    </Card>
  )
}
