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

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="min-w-[88px] bg-white text-black border border-input hover:bg-muted"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        Light
      </Button>
      <Button
        type="button"
        size="sm"
        className="min-w-[88px] bg-black text-white hover:bg-black/90"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
    </div>
  )
}

