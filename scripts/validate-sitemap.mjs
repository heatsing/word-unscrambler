#!/usr/bin/env node
/**
 * Validate sitemap: status 200, Content-Type xml, valid XML, absolute locs, min URLs.
 * Usage: node scripts/validate-sitemap.mjs [baseUrl]
 * Example: node scripts/validate-sitemap.mjs http://localhost:4321
 *          node scripts/validate-sitemap.mjs https://wordunscrambler.cc
 */

const BASE = process.argv[2] || 'http://localhost:4321';
const MIN_URLS = 10;

async function fetchText(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: { 'Accept': 'application/xml, text/xml, */*' },
  });
  return { url, status: res.status, contentType: res.headers.get('content-type') || '', text: await res.text() };
}

function parseXml(text) {
  const match = text.match(/<\?xml[^?]*\?>/);
  if (!match) return { ok: false, error: 'Missing XML declaration' };
  const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const isIndex = text.includes('<sitemapindex');
  return { ok: true, locs, isIndex };
}

function checkUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

async function main() {
  const indexUrl = BASE.replace(/\/$/, '') + '/sitemap-index.xml';
  console.log('Fetching', indexUrl, '...');
  const { url, status, contentType, text } = await fetchText(indexUrl);

  const issues = [];
  if (status !== 200) issues.push(`Status ${status} (expected 200)`);
  const ct = contentType.toLowerCase();
  if (!ct.includes('xml')) issues.push(`Content-Type "${contentType}" (expected application/xml or text/xml)`);
  if (!text || text.trim().length === 0) issues.push('Empty body');

  const parsed = parseXml(text);
  if (!parsed.ok) issues.push(parsed.error);
  else if (parsed.isIndex) {
    const total = parsed.locs.length;
    if (total === 0) issues.push('Sitemap index has 0 <sitemap> entries');
    else {
      console.log('Sitemap index: %d sitemap(s)', total);
      let totalUrls = 0;
      for (const sm of parsed.locs) {
        const r = await fetchText(sm);
        if (r.status !== 200) issues.push(`Chunk ${sm} status ${r.status}`);
        const p = parseXml(r.text);
        if (p.ok && p.locs) {
          const bad = p.locs.filter((loc) => !checkUrl(loc) || !loc.startsWith('https://'));
          if (bad.length) issues.push(`Chunk ${sm}: non-absolute or non-https loc: ${bad.slice(0, 3).join(', ')}`);
          totalUrls += p.locs.length;
        }
      }
      if (totalUrls < MIN_URLS) issues.push(`Total URLs ${totalUrls} < ${MIN_URLS}`);
      else console.log('Total URLs:', totalUrls);
    }
  } else {
    const n = (parsed.locs || []).length;
    if (n < MIN_URLS) issues.push(`URL count ${n} < ${MIN_URLS}`);
    const bad = (parsed.locs || []).filter((loc) => !checkUrl(loc) || !loc.startsWith('https://'));
    if (bad.length) issues.push(`Non-absolute or non-https loc: ${bad.slice(0, 3).join(', ')}`);
  }

  if (issues.length) {
    console.error('Validation FAILED:');
    issues.forEach((i) => console.error('  -', i));
    process.exit(1);
  }
  console.log('Validation passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
