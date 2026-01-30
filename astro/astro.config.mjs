import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://wordunscrambler.cc';

export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('?'),
      customPages: [SITE, `${SITE}/unscramble`],
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
