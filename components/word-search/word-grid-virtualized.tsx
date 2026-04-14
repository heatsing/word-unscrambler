"use client"

import { useRef, useMemo } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Badge } from "@/components/ui/badge"
import { WordCard } from "./word-card"
import type { WordResult, DictionaryType } from "@/lib/word-utils"
import type { ViewMode } from "./view-mode-toggle"

interface WordGridVirtualizedProps {
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

export function WordGridVirtualized({
  words,
  viewMode,
  compareMode,
  selectedForCompare,
  dictionaryType,
  isFavorite,
  onWordClick,
  onFavoriteClick,
  onCompareToggle,
}: WordGridVirtualizedProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  // Calculate columns based on viewport (1 on mobile, 2 on tablet, 3 on desktop)
  const columnsPerRow = useMemo(() => {
    if (typeof window === "undefined") return 3
    const width = window.innerWidth
    if (width < 640) return 1 // mobile
    if (width < 768) return 2 // tablet
    return 3 // desktop
  }, [])

  // List View - Simple Grid Virtualization
  if (viewMode === "list") {
    // Group words into rows based on columns
    const rows = useMemo(() => {
      const rowsArray: WordResult[][] = []
      for (let i = 0; i < words.length; i += columnsPerRow) {
        rowsArray.push(words.slice(i, i + columnsPerRow))
      }
      return rowsArray
    }, [words, columnsPerRow])

    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 180, // Estimated row height
      overscan: 2, // Number of items to render outside viewport
    })

    return (
      <div ref={parentRef} className="h-[600px] overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-1">
                  {row.map((word, colIndex) => (
                    <WordCard
                      key={`${word.word}-${virtualRow.index}-${colIndex}`}
                      word={word}
                      index={virtualRow.index * columnsPerRow + colIndex}
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
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Group By Length View - Virtualized Groups
  if (viewMode === "groupByLength") {
    const groups = useMemo(() => {
      const groupsMap: Record<number, WordResult[]> = {}
      words.forEach(word => {
        if (!groupsMap[word.length]) {
          groupsMap[word.length] = []
        }
        groupsMap[word.length].push(word)
      })
      const sortedLengths = Object.keys(groupsMap).map(Number).sort((a, b) => b - a)

      // Create flat array of groups with their rows
      const groupsArray: Array<{
        type: "header" | "row"
        length: number
        words?: WordResult[]
        rowIndex?: number
      }> = []

      sortedLengths.forEach(length => {
        // Add header
        groupsArray.push({ type: "header", length })

        // Add rows for this group
        const groupWords = groupsMap[length]
        for (let i = 0; i < groupWords.length; i += columnsPerRow) {
          groupsArray.push({
            type: "row",
            length,
            words: groupWords.slice(i, i + columnsPerRow),
            rowIndex: i / columnsPerRow,
          })
        }
      })

      return { groupsArray, groupsMap }
    }, [words, columnsPerRow])

    const groupVirtualizer = useVirtualizer({
      count: groups.groupsArray.length,
      getScrollElement: () => parentRef.current,
      estimateSize: (index) => {
        const item = groups.groupsArray[index]
        return item.type === "header" ? 50 : 180
      },
      overscan: 3,
    })

    return (
      <div ref={parentRef} className="h-[600px] overflow-auto">
        <div
          style={{
            height: `${groupVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {groupVirtualizer.getVirtualItems().map((virtualItem) => {
            const item = groups.groupsArray[virtualItem.index]

            if (item.type === "header") {
              return (
                <div
                  key={`header-${item.length}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <h4 className="font-semibold text-sm flex items-center gap-2 bg-background py-2 px-1 sticky top-0 z-10">
                    <Badge variant="secondary">{item.length} Letters</Badge>
                    <span className="text-muted-foreground text-xs">
                      ({groups.groupsMap[item.length].length} words)
                    </span>
                  </h4>
                </div>
              )
            }

            // Row rendering
            return (
              <div
                key={`row-${item.length}-${item.rowIndex}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-1">
                  {item.words?.map((word, colIndex) => (
                    <WordCard
                      key={`${word.word}-${item.length}-${item.rowIndex}-${colIndex}`}
                      word={word}
                      index={(item.rowIndex || 0) * columnsPerRow + colIndex}
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
            )
          })}
        </div>
      </div>
    )
  }

  // Group By Letter View - Virtualized Groups
  if (viewMode === "groupByLetter") {
    const groups = useMemo(() => {
      const groupsMap: Record<string, WordResult[]> = {}
      words.forEach(word => {
        const firstLetter = word.word[0].toUpperCase()
        if (!groupsMap[firstLetter]) {
          groupsMap[firstLetter] = []
        }
        groupsMap[firstLetter].push(word)
      })
      const sortedLetters = Object.keys(groupsMap).sort()

      // Create flat array of groups with their rows
      const groupsArray: Array<{
        type: "header" | "row"
        letter: string
        words?: WordResult[]
        rowIndex?: number
      }> = []

      sortedLetters.forEach(letter => {
        // Add header
        groupsArray.push({ type: "header", letter })

        // Add rows for this group
        const groupWords = groupsMap[letter]
        for (let i = 0; i < groupWords.length; i += columnsPerRow) {
          groupsArray.push({
            type: "row",
            letter,
            words: groupWords.slice(i, i + columnsPerRow),
            rowIndex: i / columnsPerRow,
          })
        }
      })

      return { groupsArray, groupsMap }
    }, [words, columnsPerRow])

    const groupVirtualizer = useVirtualizer({
      count: groups.groupsArray.length,
      getScrollElement: () => parentRef.current,
      estimateSize: (index) => {
        const item = groups.groupsArray[index]
        return item.type === "header" ? 50 : 180
      },
      overscan: 3,
    })

    return (
      <div ref={parentRef} className="h-[600px] overflow-auto">
        <div
          style={{
            height: `${groupVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {groupVirtualizer.getVirtualItems().map((virtualItem) => {
            const item = groups.groupsArray[virtualItem.index]

            if (item.type === "header") {
              return (
                <div
                  key={`header-${item.letter}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <h4 className="font-semibold text-sm flex items-center gap-2 bg-background py-2 px-1 sticky top-0 z-10">
                    <Badge variant="secondary" className="text-lg w-10 h-10 flex items-center justify-center">
                      {item.letter}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      ({groups.groupsMap[item.letter].length} words)
                    </span>
                  </h4>
                </div>
              )
            }

            // Row rendering
            return (
              <div
                key={`row-${item.letter}-${item.rowIndex}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-1">
                  {item.words?.map((word, colIndex) => (
                    <WordCard
                      key={`${word.word}-${item.letter}-${item.rowIndex}-${colIndex}`}
                      word={word}
                      index={(item.rowIndex || 0) * columnsPerRow + colIndex}
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
            )
          })}
        </div>
      </div>
    )
  }

  return null
}
