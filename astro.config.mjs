import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://wordunscrambler.cc';
const HIGH_PRIORITY_PATHS = new Set([
  '/',
  '/word-scramble/',
  '/word-finder/',
  '/word-unscrambler/',
  '/anagram-solver/',
  '/wordle-solver/',
  '/crossword-solver/',
  '/scrabble/',
]);

export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('?'),
      serialize(item) {
        const path = (() => {
          try {
            return new URL(item.url).pathname;
          } catch {
            return item.url;
          }
        })();

        const isHome = path === '/' || path === '';
        const normalizedPath = path.endsWith('/') ? path : `${path}/`;
        const isHighPriority = HIGH_PRIORITY_PATHS.has(normalizedPath);
        const isToolOrHub =
          path.includes('/word-') ||
          path.includes('/scrabble') ||
          path.includes('/crossword') ||
          path.includes('/anagram') ||
          path.includes('/unscramble');

        item.lastmod = new Date().toISOString().split('T')[0];
        item.changefreq = isHome || isHighPriority ? 'daily' : isToolOrHub ? 'weekly' : 'monthly';
        item.priority = isHome ? 1.0 : isHighPriority ? 0.9 : isToolOrHub ? 0.8 : 0.6;
        return item;
      },
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: "@", replacement: new URL("./src", import.meta.url).pathname },
      ],
      extensions: [".astro", ".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
