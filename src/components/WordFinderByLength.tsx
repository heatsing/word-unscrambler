import { useState, useCallback, useEffect } from 'react';

const EXCLUDE_SLOTS = 5;

function loadWords(len: number): Promise<string[]> {
  return fetch(`/data/words_${len}.json`).then((r) => (r.ok ? r.json() : [])).catch(() => []);
}

function countLetters(s: string): Record<string, number> {
  const c: Record<string, number> = {};
  for (const x of s.toLowerCase()) {
    if (x >= 'a' && x <= 'z') c[x] = (c[x] || 0) + 1;
  }
  return c;
}

function matches(
  word: string,
  length: number,
  known: string[],
  unknownLetters: string,
  excludeLetters: string
): boolean {
  if (word.length !== length) return false;
  const w = word.toLowerCase();
  for (let i = 0; i < length; i++) {
    const k = known[i]?.toLowerCase().trim();
    if (k && w[i] !== k) return false;
  }
  const excl = excludeLetters.toLowerCase().replace(/[^a-z]/g, '');
  for (const x of excl) {
    if (w.includes(x)) return false;
  }
  const need = countLetters(unknownLetters);
  const have = countLetters(w);
  for (const [letter, count] of Object.entries(need)) {
    if (!have[letter] || have[letter] < count) return false;
  }
  return true;
}

interface WordFinderByLengthProps {
  length: number;
}

export default function WordFinderByLength({ length }: WordFinderByLengthProps) {
  const [known, setKnown] = useState<string[]>(() => Array(length).fill(''));
  const [unknown, setUnknown] = useState<string[]>(() => Array(length).fill(''));
  const [exclude, setExclude] = useState<string[]>(() => Array(EXCLUDE_SLOTS).fill(''));
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const setKnownAt = (i: number, v: string) => {
    const next = [...known];
    next[i] = (v.slice(-1) || '').toLowerCase();
    setKnown(next);
  };
  const setUnknownAt = (i: number, v: string) => {
    const next = [...unknown];
    next[i] = (v.slice(-1) || '').toLowerCase();
    setUnknown(next);
  };
  const setExcludeAt = (i: number, v: string) => {
    const next = [...exclude];
    next[i] = (v.slice(-1) || '').toLowerCase();
    setExclude(next);
  };

  const knownStr = known.join('');
  const unknownStr = unknown.filter(Boolean).join('');
  const excludeStr = exclude.filter(Boolean).join('');

  const findWords = useCallback(async () => {
    setLoading(true);
    setSearched(true);
    try {
      const list = await loadWords(length);
      const filtered = list.filter((word) =>
        matches(word, length, known, unknownStr, excludeStr)
      );
      setResults(filtered.sort((a, b) => a.localeCompare(b)));
    } finally {
      setLoading(false);
    }
  }, [length, known, unknownStr, excludeStr]);

  const reset = () => {
    setKnown(Array(length).fill(''));
    setUnknown(Array(length).fill(''));
    setExclude(Array(EXCLUDE_SLOTS).fill(''));
    setResults([]);
    setSearched(false);
  };

  const hasAny = knownStr || unknownStr || excludeStr;

  return (
    <div className="word-finder-by-length rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground">
          Word Finder <span className="text-muted-foreground">& Unscrambler</span>
        </h2>
        <a href="/unscramble" className="text-sm text-primary hover:underline">
          Logic
        </a>
      </div>

      {/* Position. Known */}
      <section className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Position. Known</h3>
          <span className="size-5 rounded-full info-icon-green flex items-center justify-center" title="Letters in order">
            <span className="text-xs font-bold">i</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Letters: In order</p>
        <div className="flex flex-wrap gap-2">
          {known.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">{i + 1}</span>
              <input
                type="text"
                maxLength={1}
                value={v}
                onChange={(e) => setKnownAt(i, e.target.value)}
                className="h-12 w-12 rounded-lg border border-border bg-background text-center text-xl font-semibold uppercase text-foreground focus:outline-none focus:ring-2"
                aria-label={`Position ${i + 1} known letter`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Position. Unknown */}
      <section className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Position. Unknown</h3>
          <span className="size-5 rounded-full info-icon-amber flex items-center justify-center" title="Letters in any order">
            <span className="text-xs font-bold">i</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Letters: In any order</p>
        <div className="flex flex-wrap gap-2">
          {unknown.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">?</span>
              <input
                type="text"
                maxLength={1}
                value={v}
                onChange={(e) => setUnknownAt(i, e.target.value)}
                placeholder="?"
                className="h-12 w-12 rounded-lg border border-border bg-background text-center text-xl font-semibold text-muted-foreground focus:outline-none focus:ring-2"
                aria-label={`Unknown letter ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Exclude */}
      <section className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Exclude</h3>
          <span className="size-5 rounded-full info-icon-gray flex items-center justify-center" title="Letters not in word">
            <span className="text-xs font-bold">i</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Letters: In any order</p>
        <div className="flex flex-wrap gap-2">
          {exclude.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">X</span>
              <input
                type="text"
                maxLength={1}
                value={v}
                onChange={(e) => setExcludeAt(i, e.target.value)}
                placeholder="X"
                className="h-12 w-12 rounded-lg border border-border bg-background text-center text-xl font-semibold text-muted-foreground focus:outline-none focus:ring-2"
                aria-label={`Exclude letter ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={findWords}
          disabled={loading}
          className="rounded-lg bg-gradient-to-r from-primary to-primary/80 px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? 'Searching…' : 'Find Words'}
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
          <h3 className="font-semibold text-foreground mb-2">
            {loading ? 'Loading…' : results.length === 0 ? 'No words found' : `${results.length} word${results.length !== 1 ? 's' : ''} found`}
          </h3>
          {!loading && results.length > 0 && (
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
              {results.map((w) => (
                <a
                  key={w}
                  href={`/unscramble?q=${encodeURIComponent(w)}`}
                  className="px-3 py-1.5 rounded-md bg-card border border-border text-foreground font-medium hover:bg-muted hover:border-primary transition-colors"
                >
                  {w}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
