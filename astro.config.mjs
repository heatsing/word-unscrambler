import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://wordunscrambler.cc';

export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('?'),
      serialize(item) {
        item.lastmod = new Date().toISOString().split('T')[0];
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
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
