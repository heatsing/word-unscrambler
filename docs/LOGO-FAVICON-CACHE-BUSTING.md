# Logo & Favicon – Versioned Assets (Cache Busting)

This project uses **versioned filenames** so that after deploying to Vercel, browsers and CDNs fetch the new logo/favicon instead of cached old ones.

## File locations that affect logo / favicon

| Purpose | File / location | Current usage |
|--------|------------------|----------------|
| Favicon (browser tab) | `public/icon-v2.svg` | `<link rel="icon">` in `BaseHead.astro` |
| Apple touch icon | `public/apple-icon-v2.png` | `<link rel="apple-touch-icon">` + og:image |
| PWA / manifest icons | `public/manifest.json` | References `icon-v2.svg`, `apple-icon-v2.png` |
| Open Graph image | Same as apple touch | `og:image` in `BaseHead.astro` |
| Organization logo (JSON-LD) | Same as apple touch | `src/lib/schema.ts` → `getOrganizationSchema().logo` |
| Version constant | `src/lib/assets-version.ts` | Single place to bump version |

## Recommended file structure (public)

```
public/
  icon-v2.svg           # Favicon (SVG)
  apple-icon-v2.png     # Apple touch + og:image (e.g. 180×180)
  favicon-v2.ico        # Optional: classic .ico for old browsers
  manifest.json         # PWA manifest (uses versioned icon paths)
```

HTML head and schema use `src/lib/assets-version.ts` so one constant drives all paths.

## How to update logo / favicon next time

1. **Bump version** in `src/lib/assets-version.ts`: set `ASSETS_VERSION = 'v3'` (or next).
2. **Add new files** in `public/`:
   - `icon-v3.svg`
   - `apple-icon-v3.png`
   - Optionally `favicon-v3.ico`
3. **Update** `public/manifest.json`: replace `v2` with `v3` in all icon `src` values.
4. **Deploy.** New URLs (e.g. `/icon-v3.svg`) bypass cache.

No query strings needed; the new filename is enough for cache busting.

## Verification after deploy

1. **Favicon**
   - Open `https://wordunscrambler.cc` in a **new incognito/private** window.
   - Check the browser tab: it should show the new favicon.

2. **Apple touch icon**
   - Same incognito window → right‑click page → Inspect → open **Application** (Chrome) or **Storage** (Firefox).
   - Under "Application" → "Manifest", confirm icon URLs point to `.../icon-v2.svg` and `.../apple-icon-v2.png` (or current version).

3. **og:image**
   - View page source, find `<meta property="og:image" content="https://wordunscrambler.cc/apple-icon-v2.png" />`.
   - Or use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) / [Twitter Card Validator](https://cards-dev.twitter.com/validator) and confirm the image shown is the new one.

4. **Direct URL**
   - Open `https://wordunscrambler.cc/apple-icon-v2.png` in the browser; it should return 200 and the new image (no old cached image).

5. **Hard refresh**
   - If the tab still shows the old icon, do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) or clear site data for wordunscrambler.cc.
