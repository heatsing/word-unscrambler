"use client"

import { Button } from "@/components/ui/button"
import { List, Grid3x3, BarChart3 } from "lucide-react"

export type ViewMode = "list" | "groupByLength" | "groupByLetter"

interface ViewModeToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant={viewMode === "list" ? "default" : "ghost"}
        onClick={() => onViewModeChange("list")}
        className="h-11 px-3"
      >
        <List className="h-4 w-4 mr-1" />
        List
      </Button>
      <Button
        size="sm"
        variant={viewMode === "groupByLength" ? "default" : "ghost"}
        onClick={() => onViewModeChange("groupByLength")}
        className="h-11 px-3"
      >
        <Grid3x3 className="h-4 w-4 mr-1" />
        By Length
      </Button>
      <Button
        size="sm"
        variant={viewMode === "groupByLetter" ? "default" : "ghost"}
        onClick={() => onViewModeChange("groupByLetter")}
        className="h-11 px-3"
      >
        <BarChart3 className="h-4 w-4 mr-1" />
        By Letter
      </Button>
    </div>
  )
}
