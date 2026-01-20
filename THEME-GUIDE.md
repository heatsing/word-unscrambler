# Differentiated Design System - Theme Guide

## Overview

This project implements **4 distinct visual themes** for different tool categories, creating memorable and context-specific user experiences.

**Philosophy:** "Bold maximalism and refined minimalism both work—the key is intentionality, not intensity."

---

## Theme Categories

### 1. 🎮 Gaming - Brutalism

**For:** Scrabble, Wordle, Words with Friends, Word Cookies, Wordscapes, Wordfeud

**Style:** High contrast, bold typography, hard shadows, competitive feel

**Visual Characteristics:**
- **Colors:** Deep purple primary, bold orange accents
- **Typography:** Uppercase headings, bold weights, monospace for scores
- **Effects:** Hard shadows (8px offset), thick borders (4px), no blur
- **Animation:** Fast (100ms), linear easing, immediate feedback

**Design Inspiration:**
```
Arcade Games → Scoreboards → Competition → Victory
```

**Example Implementation:**

```tsx
import { gamingTheme, getThemeClasses } from '@/lib/themes'

export default function ScrabblePage() {
  const classes = getThemeClasses(gamingTheme)

  return (
    <div className="container mx-auto p-4">
      {/* Brutalist Header */}
      <div className="text-center mb-8">
        <h1 className={`text-5xl ${classes.heading} mb-4`}>
          SCRABBLE SOLVER
        </h1>
        <div className="h-2 w-32 mx-auto bg-foreground" />
      </div>

      {/* Brutalist Card */}
      <div className={classes.card}>
        <div className="p-6">
          <h2 className={`text-2xl ${classes.heading} mb-4`}>
            FIND WORDS
          </h2>
          {/* Card content */}
        </div>
      </div>

      {/* Hard shadow button */}
      <button className="px-8 py-4 bg-foreground text-background border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-100">
        <span className={classes.heading}>SOLVE</span>
      </button>
    </div>
  )
}
```

**CSS Variables:**
```css
:root {
  --gaming-primary: oklch(0.5 0.2 260);
  --gaming-accent: oklch(0.7 0.25 40);
}
```

---

### 2. ✨ Creative - Aurora UI

**For:** Word Generator, Word Scramble, Anagram Solver

**Style:** Vibrant gradients, flowing effects, imaginative, expressive

**Visual Characteristics:**
- **Colors:** Warm orange → Magenta → Purple gradients
- **Typography:** Normal tracking, flowing curves, readable
- **Effects:** Glassmorphism, soft shadows, gradient borders
- **Animation:** Smooth (300ms), ease-out, subtle scale

**Design Inspiration:**
```
Northern Lights → Flow → Creativity → Expression
```

**Example Implementation:**

```tsx
import { creativeTheme, getThemeStyles, getThemeClasses } from '@/lib/themes'

export default function WordGeneratorPage() {
  const classes = getThemeClasses(creativeTheme)
  const styles = getThemeStyles(creativeTheme)

  return (
    <div className="container mx-auto p-4" style={styles}>
      {/* Aurora Header with Gradient */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-[var(--theme-primary)] via-[var(--theme-accent)] to-[var(--theme-primary)] p-[2px]">
          <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center">
            <Sparkles className="h-10 w-10 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-accent)] bg-clip-text text-transparent" />
          </div>
        </div>
        <h1 className={`text-5xl ${classes.heading} mb-4`}>
          <span className="bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-accent)] to-[var(--theme-primary)] bg-clip-text text-transparent">
            Word Generator
          </span>
        </h1>
      </div>

      {/* Glassmorphic Card */}
      <div className={classes.card}>
        <div className="p-6 relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)]/5 to-[var(--theme-accent)]/5 opacity-50" />

          <div className="relative">
            <h2 className={`text-2xl ${classes.heading} mb-4`}>
              Generate Words
            </h2>
            {/* Card content */}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**CSS Variables:**
```css
:root {
  --creative-primary: oklch(0.55 0.18 40);
  --creative-accent: oklch(0.65 0.20 320);
  --creative-gradient: linear-gradient(135deg,
    oklch(0.55 0.18 40) 0%,
    oklch(0.65 0.20 320) 50%,
    oklch(0.60 0.22 280) 100%);
}
```

---

### 3. 📚 Learning - Educational Minimalism

**For:** 2-10 Letter Words, Words by Length, Words Starting With

**Style:** Clean, focused, accessible, textbook-inspired

**Visual Characteristics:**
- **Colors:** Calm green primary, teal accents
- **Typography:** Semi-bold headings, normal body, clear hierarchy
- **Effects:** Subtle shadows, thin borders, minimal decoration
- **Animation:** Medium (200ms), ease-in-out, smooth

**Design Inspiration:**
```
Textbooks → Clarity → Learning → Growth
```

**Example Implementation:**

```tsx
import { learningTheme, getThemeClasses } from '@/lib/themes'

export default function WordListPage() {
  const classes = getThemeClasses(learningTheme)

  return (
    <div className="container mx-auto p-4">
      {/* Clean Header */}
      <div className="mb-12">
        <h1 className={`text-4xl ${classes.heading} mb-2`}>
          5-Letter Words
        </h1>
        <p className={`text-lg text-muted-foreground ${classes.body}`}>
          A comprehensive list of common 5-letter words
        </p>
      </div>

      {/* Minimal Card */}
      <div className={classes.card}>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4">
            {words.map(word => (
              <div key={word} className="p-3 hover:bg-accent/10 rounded transition-colors">
                <span className={classes.mono}>{word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**CSS Variables:**
```css
:root {
  --learning-primary: oklch(0.6 0.15 150);
  --learning-accent: oklch(0.65 0.18 180);
}
```

---

### 4. 🧩 Solving - Swiss Modernism

**For:** Word Unscrambler, Word Solver, Word Finder, Jumble Solver

**Style:** Systematic, grid-based, analytical, precise

**Visual Characteristics:**
- **Colors:** Cool blue primary, deep blue accents
- **Typography:** Tight tracking, systematic hierarchy, grid alignment
- **Effects:** Medium shadows, clean borders, structured layout
- **Animation:** Fast (150ms), ease-in-out, precise

**Design Inspiration:**
```
Swiss Design → Precision → Logic → Solutions
```

**Example Implementation:**

```tsx
import { solvingTheme, getThemeClasses } from '@/lib/themes'

export default function UnscramblerPage() {
  const classes = getThemeClasses(solvingTheme)

  return (
    <div className="container mx-auto p-4">
      {/* Systematic Header */}
      <div className="mb-12">
        <h1 className={`text-4xl ${classes.heading} mb-4`}>
          Word Unscrambler
        </h1>
        <div className="grid grid-cols-3 gap-4 max-w-2xl">
          <div className="text-center">
            <div className="text-3xl font-bold">1</div>
            <div className="text-sm text-muted-foreground">Input Letters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">2</div>
            <div className="text-sm text-muted-foreground">Process</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Results</div>
          </div>
        </div>
      </div>

      {/* Grid-based Card */}
      <div className={classes.card}>
        <div className="p-6">
          <div className="grid grid-cols-[200px_1fr] gap-6">
            <div>
              <h3 className={`text-lg ${classes.heading} mb-4`}>
                Filters
              </h3>
              {/* Filters */}
            </div>
            <div>
              <h3 className={`text-lg ${classes.heading} mb-4`}>
                Results
              </h3>
              {/* Results grid */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**CSS Variables:**
```css
:root {
  --solving-primary: oklch(0.5 0.18 220);
  --solving-accent: oklch(0.45 0.15 240);
}
```

---

## Implementation Guide

### Step 1: Detect Page Category

```tsx
import { usePageTheme } from '@/lib/themes'

export default function MyPage() {
  const theme = usePageTheme('/word-generator')
  // Returns: creativeTheme
}
```

### Step 2: Apply Theme Classes

```tsx
import { getThemeClasses } from '@/lib/themes'

const classes = getThemeClasses(theme)

// Use in JSX
<h1 className={classes.heading}>Title</h1>
<Card className={classes.card}>Content</Card>
```

### Step 3: Use Theme Colors

```tsx
import { getThemeStyles } from '@/lib/themes'

const styles = getThemeStyles(theme)

// Apply to root element
<div style={styles}>
  {/* Theme colors available as CSS variables */}
</div>
```

---

## Theme Components

### Themed Hero Section

```tsx
function ThemedHero({ theme }: { theme: ThemeConfig }) {
  const classes = getThemeClasses(theme)

  return (
    <div className="text-center mb-12">
      <h1 className={`text-5xl ${classes.heading} mb-4`}>
        {theme.name}
      </h1>
      <p className={classes.body}>
        {theme.description}
      </p>
    </div>
  )
}
```

### Themed Card

```tsx
function ThemedCard({ theme, children }: { theme: ThemeConfig; children: React.ReactNode }) {
  const classes = getThemeClasses(theme)

  return (
    <div className={classes.card}>
      {children}
    </div>
  )
}
```

### Themed Button

```tsx
function ThemedButton({ theme, children }: { theme: ThemeConfig; children: React.ReactNode }) {
  const styles = getThemeStyles(theme)

  return (
    <button
      className="px-6 py-3 rounded-lg font-semibold transition-all"
      style={{
        backgroundColor: 'var(--theme-primary)',
        color: 'var(--theme-primary-foreground)',
      }}
    >
      {children}
    </button>
  )
}
```

---

## Migration Checklist

### Gaming Pages (9 pages)
- [ ] /scrabble
- [ ] /scrabble-cheat
- [ ] /scrabble-go
- [ ] /wordle
- [ ] /wordle-solver
- [ ] /wordscapes
- [ ] /words-with-friends
- [ ] /wordfeud
- [ ] /word-cookies

### Creative Pages (3 pages)
- [x] /word-generator (Already enhanced!)
- [ ] /word-scramble
- [ ] /anagram-solver

### Learning Pages (12 pages)
- [ ] /2-letter-words
- [ ] /3-letter-words
- [ ] /4-letter-words
- [ ] /5-letter-words
- [ ] /6-letter-words
- [ ] /7-letter-words
- [ ] /8-letter-words
- [ ] /9-letter-words
- [ ] /10-letter-words
- [ ] /words-by-length
- [ ] /words-start-with
- [ ] /words-with-letters

### Solving Pages (6 pages)
- [ ] /word-unscrambler
- [ ] /unscramble
- [ ] /descrambler
- [ ] /word-solver
- [ ] /word-finder
- [ ] /jumble-solver

---

## Testing Themes

```tsx
// Test all themes on a single page
export default function ThemeShowcase() {
  return (
    <div className="space-y-12 p-8">
      {Object.entries(themes).map(([category, theme]) => (
        <div key={category}>
          <h2 className="text-3xl font-bold mb-4">{theme.name}</h2>
          <ThemedCard theme={theme}>
            <p>{theme.description}</p>
          </ThemedCard>
        </div>
      ))}
    </div>
  )
}
```

---

## Performance Considerations

### Tree-Shaking

Only import the theme you need:

```tsx
// ✅ Good - tree-shakeable
import { gamingTheme } from '@/lib/themes'

// ❌ Avoid - imports all themes
import { themes } from '@/lib/themes'
const myTheme = themes.gaming
```

### CSS-in-JS Alternative

For better performance, consider using Tailwind's arbitrary values:

```tsx
<div className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
  Brutalist shadow
</div>
```

---

## Best Practices

1. **Consistency Within Categories**
   - All gaming pages should feel cohesive
   - Use the same theme for all pages in a category

2. **Distinct Between Categories**
   - Users should immediately recognize different tool types
   - Each category should have a "wow" moment

3. **Accessibility First**
   - All themes maintain 4.5:1 contrast minimum
   - Focus states are clearly visible
   - Keyboard navigation works in all themes

4. **Performance**
   - Themes use CSS classes, not inline styles (when possible)
   - Animations use transform/opacity for GPU acceleration
   - Images are properly optimized

---

## Resources

- [Design System Figma File](#) (Coming soon)
- [Theme Preview Site](#) (Coming soon)
- [Component Library](#) (Coming soon)

**Last Updated:** January 20, 2026
