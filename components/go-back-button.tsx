"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export function GoBackButton() {
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCanGoBack(window.history.length > 1)
    }
  }, [])

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  if (!canGoBack) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className="min-h-[44px] cursor-pointer transition-colors duration-200"
      onClick={handleGoBack}
      type="button"
    >
      <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
      Go Back
    </Button>
  )
}
