"use client"

import { Button } from "@/components/ui/button"
import { FileText, Table, GitCompare } from "lucide-react"

interface ActionButtonsProps {
  displayedResultsCount: number
  compareMode: boolean
  selectedCount: number
  onExportCSV: () => void
  onCopyTable: () => void
  onToggleCompareMode: () => void
  onShowCompareDialog: () => void
  onClearSelection: () => void
}

export function ActionButtons({
  displayedResultsCount,
  compareMode,
  selectedCount,
  onExportCSV,
  onCopyTable,
  onToggleCompareMode,
  onShowCompareDialog,
  onClearSelection,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onExportCSV}
          disabled={displayedResultsCount === 0}
        >
          <FileText className="h-3 w-3 mr-1" />
          CSV
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCopyTable}
          disabled={displayedResultsCount === 0}
        >
          <Table className="h-3 w-3 mr-1" />
          Copy Table
        </Button>
      </div>
      <Button
        size="sm"
        variant={compareMode ? "default" : "outline"}
        onClick={onToggleCompareMode}
      >
        <GitCompare className="h-4 w-4 mr-1" />
        {compareMode ? 'Exit Compare' : 'Compare'}
      </Button>
      {compareMode && selectedCount > 0 && (
        <Button
          size="sm"
          variant="default"
          onClick={onShowCompareDialog}
          disabled={selectedCount < 2}
        >
          Compare Selected ({selectedCount})
        </Button>
      )}
      {compareMode && selectedCount > 0 && (
        <Button size="sm" variant="ghost" onClick={onClearSelection}>
          Clear Selection
        </Button>
      )}
    </div>
  )
}
