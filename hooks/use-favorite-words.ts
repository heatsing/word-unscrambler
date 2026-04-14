import { useState, useEffect, useCallback } from 'react'

export interface FavoriteWord {
  word: string
  score: number
  length: number
  timestamp: number
  dictionaryType?: string
}

const STORAGE_KEY = 'wordunscrambler_favorite_words'

export function useFavoriteWords() {
  const [favorites, setFavorites] = useState<FavoriteWord[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteWord[]
        setFavorites(parsed)
      }
    } catch (error) {
      console.error('Failed to load favorite words:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Check if a word is favorited
  const isFavorite = useCallback((word: string): boolean => {
    return favorites.some(fav => fav.word.toLowerCase() === word.toLowerCase())
  }, [favorites])

  // Add a word to favorites
  const addFavorite = useCallback((word: string, score: number, length: number, dictionaryType?: string) => {
    if (!word.trim()) return

    try {
      // Check if already exists
      if (favorites.some(fav => fav.word.toLowerCase() === word.toLowerCase())) {
        return
      }

      const newFavorite: FavoriteWord = {
        word: word.trim().toLowerCase(),
        score,
        length,
        timestamp: Date.now(),
        dictionaryType,
      }

      const updated = [newFavorite, ...favorites]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setFavorites(updated)
    } catch (error) {
      console.error('Failed to add favorite:', error)
    }
  }, [favorites])

  // Remove a word from favorites
  const removeFavorite = useCallback((word: string) => {
    try {
      const filtered = favorites.filter(
        fav => fav.word.toLowerCase() !== word.toLowerCase()
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      setFavorites(filtered)
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  }, [favorites])

  // Toggle favorite status
  const toggleFavorite = useCallback((word: string, score: number, length: number, dictionaryType?: string) => {
    if (isFavorite(word)) {
      removeFavorite(word)
    } else {
      addFavorite(word, score, length, dictionaryType)
    }
  }, [isFavorite, addFavorite, removeFavorite])

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
      setFavorites([])
    } catch (error) {
      console.error('Failed to clear favorites:', error)
    }
  }, [])

  return {
    favorites,
    isLoaded,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  }
}
