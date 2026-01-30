"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { solveBoggle, rollBoggleDice, rollRandomGrid } from "@/lib/boggle-solver"
import { Grid3X3, Shuffle, Trash2, ChevronDown, ChevronUp } from "lucide-react"

type GridSize = 4 | 5 | 6

const GRID_LABELS: Record<GridSize, string> = {
  4: "4×4 (Classic)",
  5: "5×5 (Big Boggle)",
  6: "6×6",
}

function emptyGrid(size: GridSize): string[][] {
  return Array.from({ length: size }, () => Array(size).fill(""))
}

export function BoggleSolverTool() {
  const [gridSize, setGridSize] = useState<GridSize>(4)
  const [grid, setGrid] = useState<string[][]>(() => emptyGrid(4))
  const [minLength, setMinLength] = useState(3)
  const [sortBy, setSortBy] = useState<"length" | "alpha">("length")
  const [solved, setSolved] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const setCell = useCallback((r: number, c: number, value: string) => {
    const v = value.slice(-1).toUpperCase()
    setGrid((prev) => {
      const next = prev.map((row) => [...row])
      next[r][c] = v
      return next
    })
  }, [])

  const handleSizeChange = (size: string) => {
    const n = Number(size) as GridSize
    setGridSize(n)
    setGrid(emptyGrid(n))
    setSolved(false)
  }

  const handleSolve = useCallback(() => setSolved(true), [])

  const handleClear = useCallback(() => {
    setGrid(emptyGrid(gridSize))
    setSolved(false)
  }, [gridSize])

  const handleRollDice = useCallback(() => {
    if (gridSize === 4) setGrid(rollBoggleDice(4))
    else setGrid(rollRandomGrid(gridSize))
    setSolved(false)
  }, [gridSize])

  const words = useMemo(() => {
    const letters = grid.map((row) => row.map((c) => (c || " ").trim().toLowerCase()))
    const found = solveBoggle(letters, { minLength })
    if (sortBy === "length") return found.sort((a, b) => b.length - a.length || a.localeCompare(b))
    return found.sort((a, b) => a.localeCompare(b))
  }, [grid, minLength, sortBy])

  const displayWords = solved ? words : []
  const rows = grid.length
  const cols = grid[0]?.length ?? 0

  return (
    <>
      <Card className="mb-6 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <label className="text-sm font-medium text-muted-foreground">Grid size</label>
            <Select value={String(gridSize)} onValueChange={handleSizeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">{GRID_LABELS[4]}</SelectItem>
                <SelectItem value="5">{GRID_LABELS[5]}</SelectItem>
                <SelectItem value="6">{GRID_LABELS[6]}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            className="inline-grid gap-1.5 mb-6"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              width: rows <= 4 ? "min(280px, 100%)" : rows <= 5 ? "min(340px, 100%)" : "min(400px, 100%)",
            }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <input
                  key={`${r}-${c}`}
                  type="text"
                  maxLength={2}
                  value={cell}
                  onChange={(e) => setCell(r, c, e.target.value)}
                  className="h-12 w-full text-center text-lg font-semibold uppercase border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder={c === 0 && r === 0 ? "?" : ""}
                  aria-label={`Cell ${r + 1}, ${c + 1}`}
                />
              ))
            )}
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button onClick={handleSolve} size="lg" className="gap-2">
              <Grid3X3 className="h-4 w-4" />
              Solve
            </Button>
            <Button onClick={handleClear} variant="outline" size="lg" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
            <Button onClick={handleRollDice} variant="secondary" size="lg" className="gap-2">
              <Shuffle className="h-4 w-4" />
              Roll Dice
            </Button>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium bg-muted/50 hover:bg-muted transition-colors"
            >
              Advanced Options
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showAdvanced && (
              <div className="p-4 flex flex-wrap gap-6 border-t">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Min length</label>
                  <Select value={String(minLength)} onValueChange={(v) => setMinLength(Number(v))}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Sort by</label>
                  <Select value={sortBy} onValueChange={(v: "length" | "alpha") => setSortBy(v)}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="length">Length</SelectItem>
                      <SelectItem value="alpha">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {solved && (
        <Card className="mb-10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
              Words found
              <Badge variant="secondary">{displayWords.length}</Badge>
            </CardTitle>
            <CardDescription>
              Valid words from your Boggle board (min length {minLength})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {displayWords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {displayWords.map((w) => (
                  <span key={w} className="px-3 py-1.5 rounded-md bg-muted text-sm font-medium">
                    {w}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No words found. Try different letters or lower the min length.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}
