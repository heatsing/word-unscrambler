"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Detects if the device prefers hover (fine pointer) for opening dropdowns.
 * Desktop: hover. Mobile/touch: click only.
 */
function usePrefersHover(): boolean {
  const [prefersHover, setPrefersHover] = React.useState(true)

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    setPrefersHover(mq.matches)
    const handler = () => setPrefersHover(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return prefersHover
}

export interface NavDropdownProps {
  /** Trigger label (e.g. "Word Finders") */
  label: string
  /** Unique id for aria-labelledby / aria-controls / id */
  id: string
  /** Dropdown panel content. Rendered only when open. */
  children: React.ReactNode
  /** Optional class for the root container */
  className?: string
  /** Optional class for the trigger button */
  triggerClassName?: string
  /** Optional class for the panel (dropdown content container) */
  panelClassName?: string
}

/**
 * NavDropdown: one dropdown state per instance, no shared viewport.
 * - Renders panel only when open (no empty white boxes).
 * - Anchored with position: absolute under position: relative trigger.
 * - Desktop (pointer: fine): hover to open, click outside or leave to close.
 * - Mobile (pointer: coarse): click to toggle, click outside to close.
 * - Click-outside and keyboard (Escape, focus) handled.
 */
export function NavDropdown({
  label,
  id,
  children,
  className,
  triggerClassName,
  panelClassName,
}: NavDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const leaveTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefersHover = usePrefersHover()

  const panelId = `${id}-panel`
  const triggerId = `${id}-trigger`

  const clearLeaveTimeout = React.useCallback(() => {
    if (leaveTimeoutRef.current !== null) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
  }, [])

  const scheduleClose = React.useCallback(() => {
    clearLeaveTimeout()
    leaveTimeoutRef.current = setTimeout(() => setOpen(false), 150)
  }, [clearLeaveTimeout])

  const openDropdown = React.useCallback(() => {
    clearLeaveTimeout()
    setOpen(true)
  }, [clearLeaveTimeout])

  // Click outside: close when clicking anywhere outside the container
  React.useEffect(() => {
    if (!open) return
    const handlePointerDown = (e: PointerEvent) => {
      const el = containerRef.current
      if (el && !el.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", handlePointerDown, true)
    return () => document.removeEventListener("pointerdown", handlePointerDown, true)
  }, [open])

  // Escape key: close
  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown, true)
    return () => document.removeEventListener("keydown", handleKeyDown, true)
  }, [open])

  React.useEffect(() => {
    return clearLeaveTimeout
  }, [clearLeaveTimeout])

  const handleTriggerClick = () => {
    // Mobile/touch: click to toggle
    if (!prefersHover) {
      setOpen((prev) => !prev)
    }
    // Desktop: click is ignored when hover is available (hover handles opening)
    // Keyboard users can still use Enter/Space to toggle
  }

  const handleTriggerPointerEnter = () => {
    if (prefersHover) {
      clearLeaveTimeout()
      setOpen(true)
    }
  }

  const handleTriggerPointerLeave = () => {
    if (prefersHover) {
      scheduleClose()
    }
  }

  const handlePanelPointerEnter = () => {
    if (prefersHover) {
      clearLeaveTimeout()
      setOpen(true)
    }
  }

  const handlePanelPointerLeave = () => {
    if (prefersHover) {
      scheduleClose()
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onPointerLeave={prefersHover ? scheduleClose : undefined}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? panelId : undefined}
        className={cn(
          "inline-flex h-9 min-w-[44px] items-center justify-center gap-1 rounded-md bg-background px-4 py-2 text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-colors duration-200 cursor-pointer",
          open && "bg-accent/50 text-accent-foreground",
          triggerClassName
        )}
        onClick={handleTriggerClick}
        onPointerEnter={handleTriggerPointerEnter}
        onPointerLeave={handleTriggerPointerLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen((prev) => !prev)
          }
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        {label}
        <ChevronDown
          className={cn("size-3 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={panelId}
          role="menu"
          aria-labelledby={triggerId}
          className={cn(
            "absolute left-0 top-full z-50 mt-1 min-w-[200px] overflow-auto rounded-md border bg-popover py-2 text-popover-foreground shadow-md",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            panelClassName
          )}
          style={{ height: "auto", maxHeight: "min(80vh, 400px)" }}
          onMouseEnter={handlePanelPointerEnter}
          onMouseLeave={handlePanelPointerLeave}
        >
          {children}
        </div>
      )}
    </div>
  )
}

/** Link styled for use inside NavDropdown panel. Use for each nav item. */
export function NavDropdownLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className={cn(
        "block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        "transition-colors duration-200 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
