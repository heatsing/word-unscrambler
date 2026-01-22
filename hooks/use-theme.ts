import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'wordunscrambler_theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Get system theme preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  // Resolve theme (convert 'system' to actual theme)
  const resolveTheme = useCallback((themeValue: Theme): 'light' | 'dark' => {
    if (themeValue === 'system') {
      return getSystemTheme()
    }
    return themeValue
  }, [getSystemTheme])

  // Apply theme to document
  const applyTheme = useCallback((themeValue: 'light' | 'dark') => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(themeValue)
    setResolvedTheme(themeValue)
  }, [])

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      const initialTheme = stored || 'system'
      setThemeState(initialTheme)

      const resolved = resolveTheme(initialTheme)
      applyTheme(resolved)
    } catch (error) {
      console.error('Failed to load theme:', error)
    }
  }, [resolveTheme, applyTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      const resolved = resolveTheme('system')
      applyTheme(resolved)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [theme, resolveTheme, applyTheme])

  // Set theme
  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, newTheme)
      setThemeState(newTheme)

      const resolved = resolveTheme(newTheme)
      applyTheme(resolved)
    } catch (error) {
      console.error('Failed to save theme:', error)
    }
  }, [resolveTheme, applyTheme])

  // Toggle between light and dark (skip system)
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [resolvedTheme, setTheme])

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }
}
