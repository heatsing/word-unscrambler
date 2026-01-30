# Word Unscrambler (Astro)

Astro + Islands migration: fast first load, dictionary not in main bundle, sitemap/robots crawlable, structured data (WebSite/SearchAction, SoftwareApplication, FAQPage).

## Project structure

```
astro/
├── astro.config.mjs      # site, @astrojs/sitemap, @astrojs/react
├── package.json
├── tsconfig.json
├── public/
│   ├── robots.txt       # Allow /, Sitemap: https://wordunscrambler.cc/sitemap.xml
│   ├── sitemap.xml      # Static fallback (/, /unscramble)
│   └── data/            # words_2.json … words_10.json (from build:dict)
├── scripts/
│   └── build-dict.ts    # words.txt → public/data/words_{len}.json
└── src/
    ├── env.d.ts
    ├── layouts/
    │   └── Layout.astro
    ├── components/
    │   ├── BaseHead.astro   # canonical, title, description, og
    │   ├── InternalLinks.astro
    │   └── UnscrambleTool.tsx  # client:load island
    ├── lib/
    │   ├── unscramble.ts   # pure unscramble (no dict import)
    │   ├── schema.ts       # WebSite, SoftwareApplication, FAQPage
    │   ├── meta.ts         # getMeta(), canonical
    │   └── internal-links.ts
    ├── pages/
    │   ├── index.astro     # home + WebSite schema
    │   └── unscramble.astro # tool + SoftwareApplication + FAQPage
    └── styles/
        └── global.css
```

## Setup

```bash
cd astro
npm install
```

## Build dictionary

Place a `words.txt` in the project root (one word per line). Then:

```bash
npm run build:dict
```

This writes `public/data/words_2.json` … `words_10.json`. If `words.txt` is missing, the script creates a sample file and sample JSONs.

## Run

```bash
npm run dev     # http://localhost:4321
npm run build   # build:dict + astro build → dist/
npm run preview # serve dist/
```

## Deploy

### Vercel

- Connect repo, root directory: `astro`
- Build: `npm run build`
- Output: `dist` (static)
- No env required. Ensure `/sitemap.xml` and `/robots.txt` are served (they live in `public/`).

### Cloudflare Pages

- Build command: `npm run build`
- Build output: `dist`
- Root: `astro` if monorepo

## Verification

- **Sitemap:** `curl -I https://your-domain.com/sitemap.xml` → 200, `Content-Type: application/xml`
- **Robots:** `curl https://your-domain.com/robots.txt` → contains `Sitemap: https://wordunscrambler.cc/sitemap.xml`
- **Structured data:** View source on `/` and `/unscramble` for `application/ld+json` (WebSite, SoftwareApplication, FAQPage).

## Optional: /api/unscramble

This project uses **static** output. For a server-side `/api/unscramble` with cache headers you’d need:

- `output: 'server'` or `output: 'hybrid'` in `astro.config.mjs`
- An adapter (e.g. `@astrojs/vercel` or `@astrojs/cloudflare`)
- `src/pages/api/unscramble.ts` returning `Response` with `Cache-Control`

The current design keeps the main bundle small by loading `words_{len}.json` in the client and running unscramble in the browser.
