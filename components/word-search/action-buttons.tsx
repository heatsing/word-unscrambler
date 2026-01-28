"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { FileText, Table, GitCompare, Download, ChevronDown, X } from "lucide-react"

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
    <div className="flex flex-wrap gap-2 items-center">
      {/* Export Dropdown - Consolidated */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            disabled={displayedResultsCount === 0}
            className="h-9"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
            <ChevronDown className="h-3.5 w-3.5 ml-1.5 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onExportCSV}>
            <FileText className="h-4 w-4 mr-2" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCopyTable}>
            <Table className="h-4 w-4 mr-2" />
            Copy as Table
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Compare Mode Toggle */}
      {!compareMode ? (
        <Button
          size="sm"
          variant="outline"
          onClick={onToggleCompareMode}
          className="h-9"
        >
          <GitCompare className="h-3.5 w-3.5 mr-1.5" />
          Compare Words
        </Button>
      ) : (
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            variant="default"
            onClick={onShowCompareDialog}
            disabled={selectedCount < 2}
            className="h-9"
          >
            <GitCompare className="h-3.5 w-3.5 mr-1.5" />
            Compare ({selectedCount})
          </Button>
          {selectedCount > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearSelection}
              className="h-9"
            >
              <X className="h-3.5 w-3.5 mr-1.5" />
              Clear
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={onToggleCompareMode}
            className="h-9"
          >
            Exit
          </Button>
        </div>
      )}
    </div>
  )
}
