"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Heart, Brain, GitCompare, CheckSquare, MoreHorizontal, Copy } from "lucide-react"
import { ShareButton } from "@/components/share-button"

interface HeaderActionsProps {
  favoritesCount: number
  learningCount: number
  showFavorites: boolean
  showLearning: boolean
  compareMode: boolean
  selectedCount: number
  displayedResultsCount: number
  onToggleFavorites: () => void
  onToggleLearning: () => void
  onCopyAll: () => void
  onToggleCompareMode: () => void
  onShowCompareDialog: () => void
  shareTitle: string
  shareText: string
}

export function HeaderActions({
  favoritesCount,
  learningCount,
  showFavorites,
  showLearning,
  compareMode,
  selectedCount,
  displayedResultsCount,
  onToggleFavorites,
  onToggleLearning,
  onCopyAll,
  onToggleCompareMode,
  onShowCompareDialog,
  shareTitle,
  shareText,
}: HeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Favorites & Learning Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" className="h-9">
            <Heart className="h-3.5 w-3.5 mr-1.5" />
            Collections
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onToggleFavorites}>
            <Heart
              className={`h-4 w-4 mr-2 ${showFavorites ? "fill-red-500 text-red-500" : ""}`}
            />
            Favorites ({favoritesCount})
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onToggleLearning}>
            <Brain className={`h-4 w-4 mr-2 ${showLearning ? "text-primary" : ""}`} />
            Learning ({learningCount})
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Compare Mode */}
      {!compareMode ? (
        <Button size="sm" variant="outline" onClick={onToggleCompareMode} className="h-9">
          <GitCompare className="h-3.5 w-3.5 mr-1.5" />
          Compare
        </Button>
      ) : (
        <>
          <Button
            size="sm"
            variant="default"
            onClick={onShowCompareDialog}
            disabled={selectedCount < 2}
            className="h-9"
          >
            <CheckSquare className="h-3.5 w-3.5 mr-1.5" />
            Compare ({selectedCount})
          </Button>
          <Button size="sm" variant="outline" onClick={onToggleCompareMode} className="h-9">
            Exit
          </Button>
        </>
      )}

      {/* More Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-9"
            disabled={displayedResultsCount === 0}
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
            <span className="sr-only">More actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCopyAll}>
            <Copy className="h-4 w-4 mr-2" />
            Copy All Words
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Share Button - Kept separate as it's a special component */}
      <ShareButton title={shareTitle} text={shareText} variant="outline" size="sm" />
    </div>
  )
}
