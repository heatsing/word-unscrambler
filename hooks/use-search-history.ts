import { useState, useEffect, useCallback } from 'react'

export interface SearchHistoryItem {
  query: string
  timestamp: number
  tool: string // e.g., 'word-unscrambler', 'wordle-solver'
}

const MAX_HISTORY_ITEMS = 20
const STORAGE_KEY = 'wordunscrambler_search_history'

export function useSearchHistory(toolName: string) {
  const [history, setHistory] = useState<SearchHistoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as SearchHistoryItem[]
        // Filter to only show history for this tool
        const toolHistory = parsed.filter(item => item.tool === toolName)
        setHistory(toolHistory.slice(0, MAX_HISTORY_ITEMS))
      }
    } catch (error) {
      console.error('Failed to load search history:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [toolName])

  // Add a new search to history
  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return

    try {
      // Get all history items
      const stored = localStorage.getItem(STORAGE_KEY)
      const allHistory: SearchHistoryItem[] = stored ? JSON.parse(stored) : []

      // Remove duplicate if exists
      const filtered = allHistory.filter(
        item => !(item.query.toLowerCase() === query.toLowerCase() && item.tool === toolName)
      )

      // Add new item at the beginning
      const newItem: SearchHistoryItem = {
        query: query.trim(),
        timestamp: Date.now(),
        tool: toolName,
      }

      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS * 5) // Keep more items globally

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

      // Update local state (only for this tool)
      setHistory(prev => {
        const withoutDuplicate = prev.filter(
          item => item.query.toLowerCase() !== query.toLowerCase()
        )
        return [newItem, ...withoutDuplicate].slice(0, MAX_HISTORY_ITEMS)
      })
    } catch (error) {
      console.error('Failed to save search history:', error)
    }
  }, [toolName])

  // Remove a specific item from history
  const removeFromHistory = useCallback((query: string) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return

      const allHistory: SearchHistoryItem[] = JSON.parse(stored)
      const filtered = allHistory.filter(
        item => !(item.query === query && item.tool === toolName)
      )

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))

      // Update local state
      setHistory(prev => prev.filter(item => item.query !== query))
    } catch (error) {
      console.error('Failed to remove from history:', error)
    }
  }, [toolName])

  // Clear all history for this tool
  const clearHistory = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return

      const allHistory: SearchHistoryItem[] = JSON.parse(stored)
      const filtered = allHistory.filter(item => item.tool !== toolName)

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      setHistory([])
    } catch (error) {
      console.error('Failed to clear history:', error)
    }
  }, [toolName])

  return {
    history,
    isLoaded,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
