'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { History, X, Trash2 } from 'lucide-react'
import { SearchHistoryItem } from '@/hooks/use-search-history'
import { formatDistanceToNow } from 'date-fns'

interface SearchHistoryProps {
  history: SearchHistoryItem[]
  onSelect: (query: string) => void
  onRemove: (query: string) => void
  onClearAll: () => void
  isLoaded: boolean
}

export function SearchHistory({
  history,
  onSelect,
  onRemove,
  onClearAll,
  isLoaded,
}: SearchHistoryProps) {
  if (!isLoaded || history.length === 0) {
    return null
  }

  return (
    <div className="border rounded-lg p-4 bg-muted/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Recent Searches</h3>
          <Badge variant="secondary" className="text-xs">
            {history.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-7 text-xs"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Clear all
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <div
            key={`${item.query}-${item.timestamp}`}
            className="group relative"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(item.query)}
              className="pr-8 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span className="font-mono text-xs uppercase">{item.query}</span>
              <span className="ml-2 text-xs text-muted-foreground group-hover:text-primary-foreground/70">
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onRemove(item.query)
              }}
              className="absolute right-0 top-0 h-full w-7 hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Click on a search to reuse it
      </p>
    </div>
  )
}
