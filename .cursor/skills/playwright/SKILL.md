---
name: playwright
description: Browser automation and visual testing with Playwright for this portfolio. Use when writing or running E2E tests, capturing responsive screenshots, validating UI in the browser, debugging frontend behavior, or when the user mentions Playwright, browser testing, visual QA, or screenshot checks.
---

# Playwright

This project uses **Playwright** as the primary browser tool for visual validation and E2E testing. Prefer it over generic browser automation when available.

## Project context

Static HTML portfolio: `index.html`, `style.css`, `script.js`.

Local dev server (from `.claude/launch.json`):

```bash
npx serve . --listen 3000
```

Base URL: `http://localhost:3000`

## When to use

- After UI/CSS/JS changes — verify layout before claiming done
- Responsive checks: mobile, tablet, desktop minimum
- E2E smoke tests: navigation, scroll, interactions, modals
- Debugging rendering, clipping, Thai text, or font issues
- Accessibility snapshots (`page.accessibility.snapshot()`)

## Setup (first time)

If `@playwright/test` is not installed yet:

```bash
npm init -y
npm install -D @playwright/test
npx playwright install chromium
```

Recommended config at project root — `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
    { name: 'tablet', use: { ...devices['iPad Mini'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npx serve . --listen 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

Add npm scripts when `package.json` exists:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## Quick commands

**One-off screenshot** (server must be running):

```bash
npx playwright screenshot http://localhost:3000 screenshots/desktop.png --viewport-size=1280,720
npx playwright screenshot http://localhost:3000 screenshots/mobile.png --viewport-size=390,844
```

**Run tests:**

```bash
npx playwright test
npx playwright test --project=mobile
npx playwright show-report
```

## Visual validation workflow

1. Start dev server (or let `webServer` in config handle it)
2. Capture at least three viewports:
   - Mobile: 390×844
   - Tablet: 768×1024
   - Desktop: 1280×720
3. **Read screenshot PNGs back** into the conversation — unread screenshots don't count
4. Check: spacing, alignment, clipping, contrast, responsive composition (not just shrink), Thai text rendering

## Writing tests

Use `@playwright/test`. Test user-visible behavior, not implementation details.

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads with hero visible', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ธีรนาฏ/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
```

Selector priority: `getByRole` → `getByLabel` → `getByText` → `getByTestId`. Avoid brittle CSS class selectors.

## Integration with impeccable

When running `craft`, `polish`, `audit`, or similar UI commands, use Playwright as your eyes. Step 5 visual iteration in `impeccable/reference/craft.md` applies — Playwright is the preferred tool here.

## Rules

- Don't claim UI work is finished without at least one Playwright viewport check
- Always inspect screenshot output yourself
- Respect `prefers-reduced-motion` when testing animations
- Keep test files in `e2e/` at project root
- Don't commit `playwright-report/` or `test-results/` — add to `.gitignore` if missing
