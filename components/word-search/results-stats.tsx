"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp } from "lucide-react"
import type { WordResult } from "@/lib/word-utils"

interface ResultsStatsProps {
  stats: {
    totalWords: number
    avgScore: number
    maxScore: number
    minScore: number
    avgLength: number
    maxLength: number
    minLength: number
    highestScoringWord: WordResult
    longestWord: WordResult
  } | null
}

export function ResultsStats({ stats }: ResultsStatsProps) {
  if (!stats) return null

  return (
    <Card className="bg-muted/30 border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          Results Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <div className="text-2xl font-bold text-primary">{stats.totalWords}</div>
          <div className="text-xs text-muted-foreground">Total Words</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-primary">{stats.avgScore}</div>
          <div className="text-xs text-muted-foreground">Avg Score</div>
          <div className="text-xs text-muted-foreground/70">Range: {stats.minScore}-{stats.maxScore}</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-primary">{stats.avgLength}</div>
          <div className="text-xs text-muted-foreground">Avg Length</div>
          <div className="text-xs text-muted-foreground/70">Range: {stats.minLength}-{stats.maxLength}</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-yellow-500" />
            <span className="text-lg font-bold capitalize">{stats.highestScoringWord.word}</span>
          </div>
          <div className="text-xs text-muted-foreground">Best Word</div>
          <Badge variant="secondary" className="text-xs">{stats.highestScoringWord.score} pts</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
