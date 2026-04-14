import { useState, useEffect, useCallback } from 'react'

export type MasteryLevel = 'new' | 'learning' | 'familiar' | 'mastered'

export interface WordLearning {
  word: string
  score: number
  length: number
  dictionaryType?: string
  addedAt: number
  lastReviewed?: number
  reviewCount: number
  masteryLevel: MasteryLevel
  notes?: string
}

export interface ReviewSession {
  timestamp: number
  wordsReviewed: number
  duration: number
}

const STORAGE_KEY = 'wordunscrambler_word_learning'
const SESSIONS_KEY = 'wordunscrambler_review_sessions'
const MAX_SESSIONS = 30

export function useWordLearning() {
  const [learningWords, setLearningWords] = useState<WordLearning[]>([])
  const [reviewSessions, setReviewSessions] = useState<ReviewSession[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load learning words from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const sessions = localStorage.getItem(SESSIONS_KEY)

      if (stored) {
        const parsed = JSON.parse(stored) as WordLearning[]
        setLearningWords(parsed)
      }

      if (sessions) {
        const parsedSessions = JSON.parse(sessions) as ReviewSession[]
        setReviewSessions(parsedSessions.slice(0, MAX_SESSIONS))
      }
    } catch (error) {
      console.error('Failed to load learning data:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Check if a word is in learning list
  const isLearning = useCallback((word: string): boolean => {
    return learningWords.some(item => item.word.toLowerCase() === word.toLowerCase())
  }, [learningWords])

  // Get learning info for a word
  const getLearningInfo = useCallback((word: string): WordLearning | undefined => {
    return learningWords.find(item => item.word.toLowerCase() === word.toLowerCase())
  }, [learningWords])

  // Add a word to learning list
  const addToLearning = useCallback((
    word: string,
    score: number,
    length: number,
    dictionaryType?: string
  ) => {
    if (!word.trim()) return

    try {
      // Check if already exists
      if (learningWords.some(item => item.word.toLowerCase() === word.toLowerCase())) {
        return
      }

      const newLearningWord: WordLearning = {
        word: word.trim().toLowerCase(),
        score,
        length,
        dictionaryType,
        addedAt: Date.now(),
        reviewCount: 0,
        masteryLevel: 'new',
      }

      const updated = [newLearningWord, ...learningWords]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setLearningWords(updated)
    } catch (error) {
      console.error('Failed to add word to learning:', error)
    }
  }, [learningWords])

  // Remove a word from learning list
  const removeFromLearning = useCallback((word: string) => {
    try {
      const filtered = learningWords.filter(
        item => item.word.toLowerCase() !== word.toLowerCase()
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      setLearningWords(filtered)
    } catch (error) {
      console.error('Failed to remove word from learning:', error)
    }
  }, [learningWords])

  // Update mastery level for a word
  const updateMasteryLevel = useCallback((word: string, level: MasteryLevel) => {
    try {
      const updated = learningWords.map(item =>
        item.word.toLowerCase() === word.toLowerCase()
          ? { ...item, masteryLevel: level, lastReviewed: Date.now() }
          : item
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setLearningWords(updated)
    } catch (error) {
      console.error('Failed to update mastery level:', error)
    }
  }, [learningWords])

  // Mark a word as reviewed
  const markAsReviewed = useCallback((word: string) => {
    try {
      const updated = learningWords.map(item =>
        item.word.toLowerCase() === word.toLowerCase()
          ? {
              ...item,
              reviewCount: item.reviewCount + 1,
              lastReviewed: Date.now(),
            }
          : item
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setLearningWords(updated)
    } catch (error) {
      console.error('Failed to mark word as reviewed:', error)
    }
  }, [learningWords])

  // Add review session
  const addReviewSession = useCallback((wordsReviewed: number, duration: number) => {
    try {
      const newSession: ReviewSession = {
        timestamp: Date.now(),
        wordsReviewed,
        duration,
      }

      const updated = [newSession, ...reviewSessions].slice(0, MAX_SESSIONS)
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated))
      setReviewSessions(updated)
    } catch (error) {
      console.error('Failed to add review session:', error)
    }
  }, [reviewSessions])

  // Update notes for a word
  const updateNotes = useCallback((word: string, notes: string) => {
    try {
      const updated = learningWords.map(item =>
        item.word.toLowerCase() === word.toLowerCase()
          ? { ...item, notes: notes.trim() || undefined }
          : item
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setLearningWords(updated)
    } catch (error) {
      console.error('Failed to update notes:', error)
    }
  }, [learningWords])

  // Clear all learning data
  const clearLearningData = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
      localStorage.setItem(SESSIONS_KEY, JSON.stringify([]))
      setLearningWords([])
      setReviewSessions([])
    } catch (error) {
      console.error('Failed to clear learning data:', error)
    }
  }, [])

  // Get statistics
  const getStatistics = useCallback(() => {
    const totalWords = learningWords.length
    const newWords = learningWords.filter(w => w.masteryLevel === 'new').length
    const learningCount = learningWords.filter(w => w.masteryLevel === 'learning').length
    const familiarCount = learningWords.filter(w => w.masteryLevel === 'familiar').length
    const masteredCount = learningWords.filter(w => w.masteryLevel === 'mastered').length
    const totalReviews = learningWords.reduce((sum, w) => sum + w.reviewCount, 0)
    const totalSessions = reviewSessions.length
    const totalStudyTime = reviewSessions.reduce((sum, s) => sum + s.duration, 0)

    return {
      totalWords,
      newWords,
      learningCount,
      familiarCount,
      masteredCount,
      totalReviews,
      totalSessions,
      totalStudyTime,
    }
  }, [learningWords, reviewSessions])

  // Get words due for review (not reviewed in last 24 hours)
  const getDueWords = useCallback(() => {
    const now = Date.now()
    const oneDayAgo = now - 24 * 60 * 60 * 1000

    return learningWords.filter(word => {
      if (!word.lastReviewed) return true // Never reviewed
      return word.lastReviewed < oneDayAgo && word.masteryLevel !== 'mastered'
    })
  }, [learningWords])

  return {
    learningWords,
    reviewSessions,
    isLoaded,
    isLearning,
    getLearningInfo,
    addToLearning,
    removeFromLearning,
    updateMasteryLevel,
    markAsReviewed,
    addReviewSession,
    updateNotes,
    clearLearningData,
    getStatistics,
    getDueWords,
  }
}
