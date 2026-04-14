#!/usr/bin/env node
/**
 * Post-build: ensure dist contains sitemap-index.xml (and chunks).
 * If @astrojs/sitemap did not run or wrote nothing, we generate from dist.
 * Run after: astro build
 * Usage: node scripts/ensure-sitemap.mjs [distDir]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.resolve(ROOT, process.argv[2] || 'dist');
const SITE = 'https://wordunscrambler.cc';
const ENTRY_LIMIT = 45000;
const NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

function collectPaths(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const paths = [];
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      const indexPath = path.join(dir, e.name, 'index.html');
      if (fs.existsSync(indexPath)) {
        paths.push('/' + rel + '/');
      }
      paths.push(...collectPaths(path.join(dir, e.name), rel));
    } else if (e.name === 'index.html' && base === '') {
      paths.push('/');
    }
  }
  return paths;
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function writeUrlsetChunk(urls, outPath) {
  const lastmod = new Date().toISOString().split('T')[0];
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="${NS}">`,
    ...urls.map(
      (u) =>
        `  <url><loc>${escapeXml(u)}</loc><lastmod>${lastmod}</lastmod></url>`
    ),
    '</urlset>',
  ];
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
}

function main() {
  const indexPath = path.join(DIST, 'sitemap-index.xml');
  if (fs.existsSync(indexPath)) {
    console.log('ensure-sitemap: sitemap-index.xml already exists, skip.');
    return;
  }

  if (!fs.existsSync(DIST)) {
    console.warn('ensure-sitemap: dist not found, skip.');
    return;
  }

  const paths = collectPaths(DIST);
  const urls = [...new Set(paths)]
    .filter((p) => !p.startsWith('/_') && p !== '/404.html')
    .map((p) => (p === '/' ? SITE + '/' : SITE + p))
    .sort();

  if (urls.length === 0) {
    console.warn('ensure-sitemap: no URLs from dist, skip.');
    return;
  }

  const chunks = [];
  for (let i = 0; i < urls.length; i += ENTRY_LIMIT) {
    const slice = urls.slice(i, i + ENTRY_LIMIT);
    const chunkIndex = chunks.length;
    const chunkPath = path.join(DIST, `sitemap-${chunkIndex}.xml`);
    writeUrlsetChunk(slice, chunkPath);
    chunks.push({ path: chunkPath, url: `${SITE}/sitemap-${chunkIndex}.xml` });
  }

  const lastmod = new Date().toISOString().split('T')[0];
  const indexLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<sitemapindex xmlns="${NS}">`,
    ...chunks.map(
      (c) =>
        `  <sitemap><loc>${escapeXml(c.url)}</loc><lastmod>${lastmod}</lastmod></sitemap>`
    ),
    '</sitemapindex>',
  ];
  fs.writeFileSync(indexPath, indexLines.join('\n'), 'utf8');

  console.log(
    `ensure-sitemap: wrote sitemap-index.xml + ${chunks.length} chunk(s), ${urls.length} URLs.`
  );
}

main();
