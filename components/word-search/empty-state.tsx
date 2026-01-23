"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface EmptyStateProps {
  letters: string
}

export function EmptyState({ letters }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 text-center">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-semibold mb-2">
          No words found with "{letters.toUpperCase()}"
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Try these tips:
        </p>
        <ul className="text-sm text-muted-foreground text-left max-w-xs mx-auto space-y-1">
          <li>• Check your spelling</li>
          <li>• Try different letter combinations</li>
          <li>• Use fewer letters</li>
          <li>• Adjust minimum length filter</li>
          <li>• Change dictionary type</li>
        </ul>
      </CardContent>
    </Card>
  )
}
