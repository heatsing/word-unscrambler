"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface WordInputProps {
  onSearch: (letters: string) => void
  placeholder?: string
  buttonText?: string
}

export function WordInput({ onSearch, placeholder = "Enter letters...", buttonText = "Search" }: WordInputProps) {
  const [letters, setLetters] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (letters.trim()) {
      onSearch(letters.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={letters}
          onChange={(e) => setLetters(e.target.value)}
          placeholder={placeholder}
          className="pl-10 h-12 text-lg"
        />
      </div>
      <Button type="submit" size="lg" className="h-12 px-8">
        {buttonText}
      </Button>
    </form>
  )
}
