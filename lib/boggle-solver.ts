/**
 * Boggle board solver: find all dictionary words by traversing adjacent cells.
 * Uses depth-first search; each cell can be used at most once per word.
 */
import { ALL_WORDS } from "./dictionary"

const MIN_LENGTH = 3
const wordSet = new Set(ALL_WORDS.map((w) => w.toLowerCase()))

/** Words that start with a prefix (for pruning). Built from same list. */
const prefixSet = new Set<string>()
ALL_WORDS.forEach((w) => {
  const lower = w.toLowerCase()
  for (let len = 1; len <= lower.length; len++) prefixSet.add(lower.slice(0, len))
})

const dr = [-1, -1, -1, 0, 0, 1, 1, 1]
const dc = [-1, 0, 1, -1, 1, -1, 0, 1]

function inBounds(r: number, c: number, rows: number, cols: number): boolean {
  return r >= 0 && r < rows && c >= 0 && c < cols
}

/**
 * Solve a Boggle-style grid. Letters can be 1 character (or "Qu").
 * Returns unique words of length >= minLength found in the grid.
 */
export function solveBoggle(
  grid: string[][],
  options: { minLength?: number; quAsQu?: boolean } = {}
): string[] {
  const rows = grid.length
  const cols = grid[0]?.length ?? 0
  if (rows === 0 || cols === 0) return []
  const minLen = Math.max(MIN_LENGTH, options.minLength ?? MIN_LENGTH)
  const quAsQu = options.quAsQu !== false
  const found = new Set<string>()
  const visited = new Set<number>()

  function getLetter(r: number, c: number): string {
    const cell = (grid[r]?.[c] ?? "").trim().toLowerCase()
    if (quAsQu && (cell === "q" || cell.startsWith("qu"))) return "qu"
    return cell.slice(0, 1) || ""
  }

  function dfs(r: number, c: number, path: string) {
    if (path.length >= minLen && wordSet.has(path)) found.add(path)
    for (let d = 0; d < 8; d++) {
      const nr = r + dr[d]
      const nc = c + dc[d]
      if (!inBounds(nr, nc, rows, cols)) continue
      const idx = nr * cols + nc
      if (visited.has(idx)) continue
      const letter = getLetter(nr, nc)
      if (!letter) continue
      const nextPath = path + letter
      if (nextPath.length >= 2 && !prefixSet.has(nextPath)) continue
      visited.add(idx)
      dfs(nr, nc, nextPath)
      visited.delete(idx)
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const letter = getLetter(r, c)
      if (!letter) continue
      visited.add(r * cols + c)
      dfs(r, c, letter)
      visited.delete(r * cols + c)
    }
  }

  return Array.from(found).sort((a, b) => b.length - a.length || a.localeCompare(b))
}

/** Classic Boggle 4x4 dice letter distributions (simplified: one face per die). */
const BOGGLE_4x4_DICE = [
  "aaafrs", "aaeeee", "aafirs", "adennn", "aeeeem", "aeegmu", "aegmnn", "afirsy",
  "bjkqxz", "ccenst", "ceiilt", "ceilpt", "ceipst", "ddhnot", "dhhlor", "dhlnor",
]

/** Random letter from a die face (weighted by face string). */
function rollDie(faces: string): string {
  const f = faces[Math.floor(Math.random() * faces.length)]
  return f === "q" ? "qu" : f
}

/** Fill a 4x4 grid with random Boggle dice letters. */
export function rollBoggleDice(size: 4): string[][] {
  const dice = [...BOGGLE_4x4_DICE]
  for (let i = dice.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dice[i], dice[j]] = [dice[j], dice[i]]
  }
  const grid: string[][] = []
  for (let r = 0; r < 4; r++) {
    grid[r] = []
    for (let c = 0; c < 4; c++) {
      const idx = r * 4 + c
      grid[r][c] = rollDie(dice[idx]).toUpperCase()
    }
  }
  return grid
}

/** Fill NxN grid with random letters (for 5x5, 6x6). */
export function rollRandomGrid(size: number): string[][] {
  const letters = "abcdefghijklmnopqrstuvwxyz"
  const grid: string[][] = []
  for (let r = 0; r < size; r++) {
    grid[r] = []
    for (let c = 0; c < size; c++) {
      grid[r][c] = letters[Math.floor(Math.random() * letters.length)].toUpperCase()
    }
  }
  return grid
}
