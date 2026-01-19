"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Props {
  groupedByLength: Record<number, string[]>
}

export function WordsGroupClient({ groupedByLength }: Props) {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set())

  const toggleGroup = (length: number) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(length)) {
      newExpanded.delete(length)
    } else {
      newExpanded.add(length)
    }
    setExpandedGroups(newExpanded)
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedByLength).map(([length, words]) => {
        if (words.length === 0) return null

        const isExpanded = expandedGroups.has(Number(length))
        const displayWords = isExpanded ? words : words.slice(0, 10)
        const hasMore = words.length > 10

        return (
          <Card key={length} className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {length}-Letter Words
                </CardTitle>
                <Badge variant="secondary">{words.length} words</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {displayWords.map((word, index) => (
                  <div
                    key={`${word}-${index}`}
                    className="p-3 text-center border rounded-md hover:bg-accent hover:border-primary transition-colors"
                  >
                    <span className="font-semibold uppercase text-sm">{word}</span>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => toggleGroup(Number(length))}
                    className="gap-2"
                  >
                    {isExpanded ? (
                      <>
                        Show Less
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show {words.length - 10} More
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
