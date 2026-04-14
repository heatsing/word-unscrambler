/**
 * One-time download of dwyl/english-words (words_alpha.txt) to project root.
 * Run: npx tsx scripts/download-words-alpha.ts
 * Then npm run build:dict will merge it when building the dictionary (no network needed).
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'words_alpha.txt');
const URL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';

async function main(): Promise<void> {
  try {
    const res = await fetch(URL, { signal: AbortSignal.timeout(60000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf-8');
    console.log('Wrote', OUT_FILE, '(' + lines.length + ' words)');
  } catch (e) {
    console.error('Download failed:', (e as Error).message);
    process.exit(1);
  }
}

main();
