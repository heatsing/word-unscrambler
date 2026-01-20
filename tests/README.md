# Testing Documentation

## Overview

This project uses **Playwright** for end-to-end (E2E) testing to ensure quality, accessibility, and performance across all pages.

## Setup

### Install Dependencies

```bash
npm install
npx playwright install
```

This will install Playwright and download the necessary browser binaries (Chromium, Firefox, WebKit).

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

This opens Playwright's interactive UI where you can:
- Watch tests run in real-time
- Debug failed tests
- Time-travel through test execution
- Inspect DOM snapshots

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Debug a Specific Test

```bash
npm run test:debug
```

Or debug a specific file:

```bash
npx playwright test tests/e2e/word-generator.spec.ts --debug
```

### View Test Report

After running tests, view the HTML report:

```bash
npm run test:report
```

## Test Structure

```
tests/
├── e2e/
│   ├── word-generator.spec.ts       # Word Generator specific tests
│   ├── global-accessibility.spec.ts # Tests for ALL pages
│   └── ... (more test files)
└── README.md                         # This file
```

## Test Categories

### 1. Critical User Flows (`word-generator.spec.ts`)

Tests core functionality:
- ✅ Form validation
- ✅ Word generation
- ✅ Copy functionality
- ✅ Keyboard shortcuts
- ✅ Error handling
- ✅ Loading states

### 2. Accessibility Tests (`global-accessibility.spec.ts`)

Ensures WCAG compliance:
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Semantic HTML
- ✅ Focus management
- ✅ Screen reader compatibility

### 3. Performance Tests

Validates speed and efficiency:
- ✅ Page load time < 5s
- ✅ Cumulative Layout Shift (CLS) < 0.1
- ✅ No console errors
- ✅ No failed network requests

### 4. Responsive Design Tests

Checks mobile compatibility:
- ✅ Mobile viewports (375px, 390px, 393px)
- ✅ Tablet viewports (768px)
- ✅ No horizontal scroll
- ✅ Touch target sizes

### 5. SEO Tests

Validates search engine optimization:
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Canonical URLs
- ✅ Proper heading hierarchy

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/your-page')
    await page.waitForLoadState('networkidle')
  })

  test('should do something', async ({ page }) => {
    // Arrange
    const button = page.getByRole('button', { name: /Click Me/i })

    // Act
    await button.click()

    // Assert
    await expect(page.getByText(/Success/i)).toBeVisible()
  })
})
```

### Best Practices

1. **Always wait for networkidle** before interacting with dynamic content
2. **Use semantic selectors** (roles, labels) instead of CSS classes
3. **Test user flows**, not implementation details
4. **Include accessibility checks** in every test
5. **Test error states** as well as happy paths

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Debugging Failed Tests

### 1. Check the Trace

Playwright automatically captures traces on failure:

```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

### 2. View Screenshots

Failed tests save screenshots to `test-results/`:

```
test-results/
├── word-generator-should-generate-words/
│   ├── test-failed-1.png
│   └── trace.zip
```

### 3. Run in Debug Mode

```bash
npx playwright test --debug
```

This opens the Playwright Inspector where you can:
- Step through test execution
- Inspect locators
- View console logs
- See network requests

## Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| Critical Paths | 100% | 🟢 100% |
| Accessibility | 100% | 🟢 100% |
| Core Pages | 80% | 🟡 60% |
| All Pages | 50% | 🔴 20% |

## Maintenance

### Update Baselines

If visual tests fail due to intentional design changes:

```bash
npx playwright test --update-snapshots
```

### Update Browsers

```bash
npx playwright install
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [CI/CD Integration](https://playwright.dev/docs/ci)
