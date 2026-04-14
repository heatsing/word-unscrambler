"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, AlertCircle } from "lucide-react"

interface LetterAnalysis {
  letterCounts: Record<string, number>
  sortedLetters: [string, number][]
  totalValue: number
  averageValue: number
  highValueLetters: [string, number][]
  unusedLetters: string[]
  totalLetters: number
}

interface LetterAnalysisPanelProps {
  analysis: LetterAnalysis | null
}

export function LetterAnalysisPanel({ analysis }: LetterAnalysisPanelProps) {
  if (!analysis) return null

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Letter Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Letter Distribution */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase">Letter Distribution</h4>
          <div className="flex flex-wrap gap-1.5">
            {analysis.sortedLetters.map(([letter, count]) => (
              <Badge
                key={letter}
                variant="secondary"
                className="text-xs"
              >
                {letter.toUpperCase()} × {count}
              </Badge>
            ))}
          </div>
        </div>

        {/* High Value Letters */}
        {analysis.highValueLetters.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              High Value Letters
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {analysis.highValueLetters.map(([letter]) => (
                <Badge
                  key={letter}
                  variant="default"
                  className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500"
                >
                  {letter.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{analysis.totalValue}</div>
            <div className="text-xs text-muted-foreground">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{analysis.averageValue}</div>
            <div className="text-xs text-muted-foreground">Avg Value</div>
          </div>
        </div>

        {/* Suggestions */}
        {analysis.highValueLetters.length > 0 && (
          <div className="flex items-start gap-2 p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-md">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900 dark:text-blue-100">
              Try to use high-value letters ({analysis.highValueLetters.map(([l]) => l.toUpperCase()).join(', ')})
              for maximum points!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
