"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const isLight = theme === "light"

  return (
    <Button
      type="button"
      size="sm"
      className={`min-w-[88px] transition-colors duration-200 ${
        isLight
          ? "bg-white text-black border border-input hover:bg-muted"
          : "bg-black text-white hover:bg-black/90"
      }`}
      aria-label={isLight ? "切换到暗色模式" : "切换到亮色模式"}
      onClick={toggleTheme}
    >
      {isLight ? "Light" : "Dark"}
    </Button>
  )
}

