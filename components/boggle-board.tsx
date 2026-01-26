"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotateCcw, Shuffle, Timer, Trophy } from "lucide-react"
import { isValidWord } from "@/lib/word-utils"

// Common Boggle letter distribution (weighted towards vowels and common consonants)
const LETTER_DISTRIBUTION = "AAAAAABBCCDDDDEEEEEEEEEEFFFGGGHHIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYZ"

// Boggle scoring: 3-4 letters = 1pt, 5 letters = 2pts, 6 letters = 3pts, 7 letters = 5pts, 8+ letters = 11pts
const BOGGLE_SCORING: Record<number, number> = {
  3: 1,
  4: 1,
  5: 2,
  6: 3,
  7: 5,
  8: 11,
}

function getBoggleScore(wordLength: number): number {
  if (wordLength < 3) return 0
  if (wordLength >= 8) return BOGGLE_SCORING[8]
  return BOGGLE_SCORING[wordLength] || 0
}

interface Cell {
  letter: string
  row: number
  col: number
}

export function BoggleBoard() {
  const [board, setBoard] = useState<string[][]>([])
  const [selectedPath, setSelectedPath] = useState<Cell[]>([])
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set())
  const [currentWord, setCurrentWord] = useState<string>("")
  const [score, setScore] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(180) // 3 minutes
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  // Generate random board
  const generateBoard = () => {
    const newBoard: string[][] = []
    for (let i = 0; i < 4; i++) {
      const row: string[] = []
      for (let j = 0; j < 4; j++) {
        const randomIndex = Math.floor(Math.random() * LETTER_DISTRIBUTION.length)
        row.push(LETTER_DISTRIBUTION[randomIndex])
      }
      newBoard.push(row)
    }
    setBoard(newBoard)
    setSelectedPath([])
    setCurrentWord("")
  }

  // Initialize board on mount
  useEffect(() => {
    generateBoard()
  }, [])

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (!isPlaying) return

    const cell: Cell = { letter: board[row][col], row, col }

    // First cell
    if (selectedPath.length === 0) {
      setSelectedPath([cell])
      setCurrentWord(cell.letter)
      return
    }

    // Check if cell is adjacent to last selected cell
    const lastCell = selectedPath[selectedPath.length - 1]
    const rowDiff = Math.abs(row - lastCell.row)
    const colDiff = Math.abs(col - lastCell.col)

    // Must be adjacent (including diagonals)
    if (rowDiff > 1 || colDiff > 1 || (rowDiff === 0 && colDiff === 0)) {
      return
    }

    // Check if cell already in path
    if (selectedPath.some((c) => c.row === row && c.col === col)) {
      return
    }

    // Add to path
    setSelectedPath([...selectedPath, cell])
    setCurrentWord(currentWord + cell.letter)
  }

  // Submit word
  const handleSubmitWord = () => {
    if (currentWord.length < 3) {
      setSelectedPath([])
      setCurrentWord("")
      return
    }

    // Check if word is valid and not already found
    if (isValidWord(currentWord) && !foundWords.has(currentWord)) {
      const newFoundWords = new Set(foundWords)
      newFoundWords.add(currentWord)
      setFoundWords(newFoundWords)

      const wordScore = getBoggleScore(currentWord.length)
      setScore(score + wordScore)
    }

    setSelectedPath([])
    setCurrentWord("")
  }

  // Clear current path
  const handleClearPath = () => {
    setSelectedPath([])
    setCurrentWord("")
  }

  // Start new game
  const handleNewGame = () => {
    generateBoard()
    setFoundWords(new Set())
    setScore(0)
    setTimeLeft(180)
    setIsPlaying(true)
  }

  // Reset game
  const handleReset = () => {
    setFoundWords(new Set())
    setScore(0)
    setTimeLeft(180)
    setIsPlaying(false)
    setSelectedPath([])
    setCurrentWord("")
  }

  // Check if cell is in path
  const isCellInPath = (row: number, col: number): boolean => {
    return selectedPath.some((c) => c.row === row && c.col === col)
  }

  // Get path index for cell
  const getPathIndex = (row: number, col: number): number => {
    return selectedPath.findIndex((c) => c.row === row && c.col === col)
  }

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header with Score and Timer */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="text-lg font-bold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className={cn("h-5 w-5", timeLeft < 30 ? "text-red-600" : "text-primary")} />
              <span className={cn("text-lg font-bold", timeLeft < 30 && "text-red-600")}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleNewGame} variant="default" size="sm">
              <Shuffle className="h-4 w-4 mr-2" />
              New Game
            </Button>
            <Button onClick={generateBoard} variant="outline" size="sm" disabled={isPlaying}>
              <RotateCcw className="h-4 w-4 mr-2" />
              New Board
            </Button>
          </div>
        </div>

        {/* Boggle Board */}
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-2 p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-4 border-amber-300 dark:border-amber-800">
            {board.map((row, rowIndex) =>
              row.map((letter, colIndex) => {
                const inPath = isCellInPath(rowIndex, colIndex)
                const pathIndex = getPathIndex(rowIndex, colIndex)
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    disabled={!isPlaying}
                    className={cn(
                      "w-16 h-16 md:w-20 md:h-20 rounded-lg font-bold text-2xl md:text-3xl transition-all",
                      "border-4 shadow-lg hover:scale-105 active:scale-95",
                      inPath
                        ? "bg-primary text-primary-foreground border-primary scale-105"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600",
                      !isPlaying && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {letter}
                    {inPath && (
                      <span className="absolute top-1 right-1 text-xs bg-primary-foreground text-primary rounded-full w-5 h-5 flex items-center justify-center">
                        {pathIndex + 1}
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Current Word Input */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={currentWord}
              readOnly
              placeholder={isPlaying ? "Click letters to form words..." : "Click 'New Game' to start"}
              className="text-lg font-semibold"
            />
            <Button onClick={handleSubmitWord} disabled={currentWord.length < 3 || !isPlaying}>
              Submit
            </Button>
            <Button onClick={handleClearPath} variant="outline" disabled={selectedPath.length === 0}>
              Clear
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Words must be at least 3 letters. Click adjacent letters (including diagonals) to form words.
          </p>
        </div>

        {/* Found Words */}
        {foundWords.size > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Found Words ({foundWords.size})
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(foundWords).map((word) => (
                <div
                  key={word}
                  className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  <span>{word}</span>
                  <span className="text-primary font-bold">
                    +{getBoggleScore(word.length)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
          <h4 className="font-semibold text-foreground">How to Play:</h4>
          <ul className="space-y-1 list-disc list-inside">
            <li>Click "New Game" to start a 3-minute timer</li>
            <li>Click adjacent letters to form words (including diagonals)</li>
            <li>Words must be at least 3 letters long</li>
            <li>Each letter can only be used once per word</li>
            <li>Submit valid words to earn points</li>
          </ul>
          <h4 className="font-semibold text-foreground mt-4">Scoring:</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <div>3-4 letters: <span className="font-bold">1 pt</span></div>
            <div>5 letters: <span className="font-bold">2 pts</span></div>
            <div>6 letters: <span className="font-bold">3 pts</span></div>
            <div>7 letters: <span className="font-bold">5 pts</span></div>
            <div>8+ letters: <span className="font-bold">11 pts</span></div>
          </div>
        </div>
      </div>
    </Card>
  )
}
