import { test, expect } from '@playwright/test'

/**
 * Global Accessibility and Performance Tests
 * Tests that should pass for ALL pages
 */

const criticalPages = [
  '/',
  '/word-generator',
  '/word-unscrambler',
  '/scrabble',
  '/wordle-solver',
  '/anagram-solver'
]

test.describe('Global Accessibility Tests', () => {

  for (const pagePath of criticalPages) {
    test(`${pagePath} should have proper HTML structure`, async ({ page }) => {
      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')

      // Check for main heading
      const h1 = page.locator('h1')
      await expect(h1).toHaveCount(1) // Should have exactly one h1

      // Check for proper document title
      const title = await page.title()
      expect(title.length).toBeGreaterThan(0)
      expect(title).not.toBe('Document') // Default title
    })

    test(`${pagePath} should have valid language attribute`, async ({ page }) => {
      await page.goto(pagePath)

      const lang = await page.locator('html').getAttribute('lang')
      expect(lang).toBeTruthy()
      expect(lang).toBe('en') // Assuming English
    })

    test(`${pagePath} should have meta description`, async ({ page }) => {
      await page.goto(pagePath)

      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content')
      expect(metaDescription).toBeTruthy()
      expect(metaDescription!.length).toBeGreaterThan(50) // Meaningful description
      expect(metaDescription!.length).toBeLessThan(160) // SEO best practice
    })

    test(`${pagePath} should have no console errors`, async ({ page }) => {
      const consoleErrors: string[] = []

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })

      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')

      // Filter out known third-party errors if any
      const criticalErrors = consoleErrors.filter(error =>
        !error.includes('fonts.googleapis.com') // Font loading errors in test env
      )

      expect(criticalErrors).toHaveLength(0)
    })

    test(`${pagePath} should have no failed network requests`, async ({ page }) => {
      const failedRequests: string[] = []

      page.on('requestfailed', (request) => {
        failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`)
      })

      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')

      // Filter out font loading failures in test environment
      const criticalFailures = failedRequests.filter(req =>
        !req.includes('fonts.googleapis.com') &&
        !req.includes('fonts.gstatic.com')
      )

      expect(criticalFailures).toHaveLength(0)
    })

    test(`${pagePath} should be keyboard navigable`, async ({ page }) => {
      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')

      // Tab through page
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab')
      }

      // Verify focus is visible
      const focused = await page.evaluate(() => {
        return document.activeElement !== document.body
      })

      expect(focused).toBeTruthy()
    })
  }
})

test.describe('Performance Checks', () => {

  for (const pagePath of criticalPages) {
    test(`${pagePath} should load within acceptable time`, async ({ page }) => {
      const startTime = Date.now()

      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      // Should load within 5 seconds (generous for testing environment)
      expect(loadTime).toBeLessThan(5000)
    })

    test(`${pagePath} should have acceptable Cumulative Layout Shift`, async ({ page }) => {
      await page.goto(pagePath)

      // Wait for page to stabilize
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      // Get CLS metric (simplified check)
      const hasLayoutShift = await page.evaluate(() => {
        return new Promise((resolve) => {
          let cls = 0
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                cls += (entry as any).value
              }
            }
          })
          observer.observe({ type: 'layout-shift', buffered: true })

          setTimeout(() => {
            resolve(cls < 0.1) // Good CLS score
          }, 500)
        })
      })

      expect(hasLayoutShift).toBeTruthy()
    })
  }
})

test.describe('Mobile Responsiveness', () => {

  const mobileViewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'Pixel 5', width: 393, height: 851 }
  ]

  for (const viewport of mobileViewports) {
    test(`Critical pages should work on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })

      for (const pagePath of criticalPages.slice(0, 3)) { // Test first 3 pages
        await page.goto(pagePath)
        await page.waitForLoadState('networkidle')

        // Verify no horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth
        })

        expect(hasHorizontalScroll).toBe(false)

        // Verify main content is visible
        const h1 = page.locator('h1')
        await expect(h1).toBeVisible()
      }
    })
  }
})

test.describe('SEO Fundamentals', () => {

  for (const pagePath of criticalPages) {
    test(`${pagePath} should have Open Graph tags`, async ({ page }) => {
      await page.goto(pagePath)

      // Check for OG title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
      expect(ogTitle).toBeTruthy()

      // Check for OG description
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content')
      expect(ogDescription).toBeTruthy()
    })

    test(`${pagePath} should have canonical URL`, async ({ page }) => {
      await page.goto(pagePath)

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toBeTruthy()
    })
  }
})
