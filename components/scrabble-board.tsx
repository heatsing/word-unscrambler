"use client"

import { useState, DragEvent } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Trophy } from "lucide-react"
import { calculateScrabbleScore } from "@/lib/word-utils"

// Board square types with multipliers
type SquareType = "normal" | "DW" | "TW" | "DL" | "TL" | "center"

interface Square {
  type: SquareType
  letter: string | null
  row: number
  col: number
}

// Scrabble board layout (15×15) with bonus squares
const BOARD_LAYOUT: SquareType[][] = [
  ["TW", "normal", "normal", "DL", "normal", "normal", "normal", "TW", "normal", "normal", "normal", "DL", "normal", "normal", "TW"],
  ["normal", "DW", "normal", "normal", "normal", "TL", "normal", "normal", "normal", "TL", "normal", "normal", "normal", "DW", "normal"],
  ["normal", "normal", "DW", "normal", "normal", "normal", "DL", "normal", "DL", "normal", "normal", "normal", "DW", "normal", "normal"],
  ["DL", "normal", "normal", "DW", "normal", "normal", "normal", "DL", "normal", "normal", "normal", "DW", "normal", "normal", "DL"],
  ["normal", "normal", "normal", "normal", "DW", "normal", "normal", "normal", "normal", "normal", "DW", "normal", "normal", "normal", "normal"],
  ["normal", "TL", "normal", "normal", "normal", "TL", "normal", "normal", "normal", "TL", "normal", "normal", "normal", "TL", "normal"],
  ["normal", "normal", "DL", "normal", "normal", "normal", "DL", "normal", "DL", "normal", "normal", "normal", "DL", "normal", "normal"],
  ["TW", "normal", "normal", "DL", "normal", "normal", "normal", "center", "normal", "normal", "normal", "DL", "normal", "normal", "TW"],
  ["normal", "normal", "DL", "normal", "normal", "normal", "DL", "normal", "DL", "normal", "normal", "normal", "DL", "normal", "normal"],
  ["normal", "TL", "normal", "normal", "normal", "TL", "normal", "normal", "normal", "TL", "normal", "normal", "normal", "TL", "normal"],
  ["normal", "normal", "normal", "normal", "DW", "normal", "normal", "normal", "normal", "normal", "DW", "normal", "normal", "normal", "normal"],
  ["DL", "normal", "normal", "DW", "normal", "normal", "normal", "DL", "normal", "normal", "normal", "DW", "normal", "normal", "DL"],
  ["normal", "normal", "DW", "normal", "normal", "normal", "DL", "normal", "DL", "normal", "normal", "normal", "DW", "normal", "normal"],
  ["normal", "DW", "normal", "normal", "normal", "TL", "normal", "normal", "normal", "TL", "normal", "normal", "normal", "DW", "normal"],
  ["TW", "normal", "normal", "DL", "normal", "normal", "normal", "TW", "normal", "normal", "normal", "DL", "normal", "normal", "TW"],
]

// Square colors based on type
const SQUARE_COLORS: Record<SquareType, string> = {
  normal: "bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800",
  DW: "bg-pink-200 dark:bg-pink-950 border-pink-400 dark:border-pink-800",
  TW: "bg-red-300 dark:bg-red-950 border-red-500 dark:border-red-800",
  DL: "bg-sky-200 dark:bg-sky-950 border-sky-400 dark:border-sky-800",
  TL: "bg-blue-300 dark:bg-blue-950 border-blue-500 dark:border-blue-800",
  center: "bg-pink-200 dark:bg-pink-950 border-pink-400 dark:border-pink-800",
}

// Square labels
const SQUARE_LABELS: Record<SquareType, string> = {
  normal: "",
  DW: "2W",
  TW: "3W",
  DL: "2L",
  TL: "3L",
  center: "★",
}

export function ScrabbleBoard() {
  const [board, setBoard] = useState<Square[][]>(() => {
    return BOARD_LAYOUT.map((row, rowIndex) =>
      row.map((type, colIndex) => ({
        type,
        letter: null,
        row: rowIndex,
        col: colIndex,
      }))
    )
  })

  const [availableTiles, setAvailableTiles] = useState<string[]>([
    "A", "B", "C", "D", "E", "F", "G"
  ])

  const [draggedTile, setDraggedTile] = useState<string | null>(null)
  const [totalScore, setTotalScore] = useState<number>(0)

  // Handle drag start from tile rack
  const handleDragStart = (e: DragEvent, letter: string) => {
    setDraggedTile(letter)
    e.dataTransfer.effectAllowed = "move"
  }

  // Handle drag over board square
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  // Handle drop on board square
  const handleDrop = (e: DragEvent, row: number, col: number) => {
    e.preventDefault()

    if (!draggedTile) return

    // Don't allow dropping on occupied squares
    if (board[row][col].letter) return

    // Place tile on board
    const newBoard = board.map((r, rIdx) =>
      r.map((square, cIdx) => {
        if (rIdx === row && cIdx === col) {
          return { ...square, letter: draggedTile }
        }
        return square
      })
    )

    setBoard(newBoard)

    // Remove tile from available tiles
    setAvailableTiles((prev) => {
      const index = prev.indexOf(draggedTile)
      if (index > -1) {
        const newTiles = [...prev]
        newTiles.splice(index, 1)
        return newTiles
      }
      return prev
    })

    setDraggedTile(null)
    calculateBoardScore(newBoard)
  }

  // Handle removing tile from board (drag back to rack)
  const handleSquareClick = (row: number, col: number) => {
    const square = board[row][col]
    if (!square.letter) return

    // Return tile to rack
    setAvailableTiles((prev) => [...prev, square.letter!])

    // Remove from board
    const newBoard = board.map((r, rIdx) =>
      r.map((s, cIdx) => {
        if (rIdx === row && cIdx === col) {
          return { ...s, letter: null }
        }
        return s
      })
    )

    setBoard(newBoard)
    calculateBoardScore(newBoard)
  }

  // Calculate total score with board bonuses
  const calculateBoardScore = (boardState: Square[][]) => {
    let score = 0
    let wordMultiplier = 1

    for (const row of boardState) {
      for (const square of row) {
        if (square.letter) {
          let letterScore = calculateScrabbleScore(square.letter)

          // Apply letter multipliers
          if (square.type === "DL") letterScore *= 2
          if (square.type === "TL") letterScore *= 3

          score += letterScore

          // Apply word multipliers
          if (square.type === "DW" || square.type === "center") wordMultiplier *= 2
          if (square.type === "TW") wordMultiplier *= 3
        }
      }
    }

    setTotalScore(score * wordMultiplier)
  }

  // Reset board
  const handleReset = () => {
    const newBoard = BOARD_LAYOUT.map((row, rowIndex) =>
      row.map((type, colIndex) => ({
        type,
        letter: null,
        row: rowIndex,
        col: colIndex,
      }))
    )
    setBoard(newBoard)
    setAvailableTiles(["A", "B", "C", "D", "E", "F", "G"])
    setTotalScore(0)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Score Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <span className="text-lg font-bold">Total Score: {totalScore}</span>
          </div>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Board
          </Button>
        </div>

        {/* Board Grid */}
        <div className="overflow-x-auto">
          <div className="inline-grid grid-cols-15 gap-[2px] bg-gray-300 dark:bg-gray-700 p-1 rounded-lg min-w-max">
            {board.map((row, rowIndex) =>
              row.map((square, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 border-2 flex items-center justify-center relative cursor-pointer transition-colors hover:brightness-95",
                    SQUARE_COLORS[square.type],
                    square.letter && "bg-amber-200 dark:bg-amber-800 border-amber-400"
                  )}
                >
                  {square.letter ? (
                    <span className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100">
                      {square.letter}
                    </span>
                  ) : (
                    <span className="text-[8px] md:text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                      {SQUARE_LABELS[square.type]}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tile Rack */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
            Your Tiles (drag to board)
          </h3>
          <div className="flex gap-2 flex-wrap">
            {availableTiles.map((letter, index) => (
              <div
                key={`${letter}-${index}`}
                draggable
                onDragStart={(e) => handleDragStart(e, letter)}
                className="w-12 h-12 md:w-14 md:h-14 bg-amber-200 dark:bg-amber-700 border-2 border-amber-400 dark:border-amber-600 rounded flex items-center justify-center cursor-move hover:scale-105 transition-transform shadow-md"
              >
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {letter}
                </span>
                <span className="absolute bottom-0 right-1 text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                  {calculateScrabbleScore(letter)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Drag tiles from your rack to the board</p>
          <p>• Click placed tiles to return them to your rack</p>
          <p>• Bonus squares apply when you place tiles on them</p>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className={cn("w-6 h-6 border-2 rounded", SQUARE_COLORS.DW)} />
            <span>Double Word</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("w-6 h-6 border-2 rounded", SQUARE_COLORS.TW)} />
            <span>Triple Word</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("w-6 h-6 border-2 rounded", SQUARE_COLORS.DL)} />
            <span>Double Letter</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("w-6 h-6 border-2 rounded", SQUARE_COLORS.TL)} />
            <span>Triple Letter</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("w-6 h-6 border-2 rounded", SQUARE_COLORS.center)} />
            <span>Center Star</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
