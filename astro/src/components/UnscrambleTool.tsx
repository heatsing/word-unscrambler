import { useState, useCallback, useRef, useEffect } from 'react';
import type { UnscrambleResult, UnscrambleOptions } from '@/lib/unscramble';
import { unscramble } from '@/lib/unscramble';

const MIN_LEN = 2;
const MAX_LEN = 10;
const LENGTHS = Array.from({ length: MAX_LEN - MIN_LEN + 1 }, (_, i) => i + MIN_LEN);

function loadWordsByLength(len: number): Promise<string[]> {
  return fetch(`/data/words_${len}.json`)
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
}

function groupByLength(results: UnscrambleResult[]): Map<number, UnscrambleResult[]> {
  const map = new Map<number, UnscrambleResult[]>();
  for (const r of results) {
    const list = map.get(r.length) ?? [];
    list.push(r);
    map.set(r.length, list);
  }
  return map;
}

export default function UnscrambleTool() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<UnscrambleResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [minLength, setMinLength] = useState(MIN_LEN);
  const [maxLength, setMaxLength] = useState(MAX_LEN);
  const [sortBy, setSortBy] = useState<UnscrambleOptions['sortBy']>('score');
  const [sortDir, setSortDir] = useState<UnscrambleOptions['sortDir']>('desc');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runSearch = useCallback(async () => {
    const letters = input.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (!letters) {
      setResults([]);
      setSearched(true);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const uniqueLengths = new Set<number>();
      for (let len = minLength; len <= maxLength; len++) uniqueLengths.add(len);
      const wordLists = await Promise.all(
        Array.from(uniqueLengths).map((len) => loadWordsByLength(len))
      );
      const allWords: string[] = wordLists.flat();
      const opts: UnscrambleOptions = { minLength, maxLength, sortBy, sortDir };
      const list = unscramble(letters, allWords, opts);
      setResults(list);
    } finally {
      setLoading(false);
    }
  }, [input, minLength, maxLength, sortBy, sortDir]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch();
    }
  };

  const copyResults = () => {
    const text = results.map((r) => r.word).join('\n');
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const clearAll = () => {
    setInput('');
    setResults([]);
    setSearched(false);
    inputRef.current?.focus();
  };

  const grouped = groupByLength(results);

  return (
    <div className="unscramble-tool">
      <div className="mb-6 flex gap-3 flex-wrap items-end">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="letters" className="block text-sm font-medium text-gray-700 mb-1">
            Letters
          </label>
          <input
            id="letters"
            ref={inputRef}
            type="text"
            className="input"
            placeholder="e.g. abcdefg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={15}
            autoComplete="off"
            aria-label="Letters to unscramble"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={runSearch} disabled={loading}>
          {loading ? 'Searching…' : 'Unscramble'}
        </button>
        <button type="button" className="btn" onClick={clearAll}>
          Clear
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span>Min length</span>
          <select
            value={minLength}
            onChange={(e) => setMinLength(Number(e.target.value))}
            className="input w-20"
          >
            {LENGTHS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span>Max length</span>
          <select
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
            className="input w-20"
          >
            {LENGTHS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span>Sort</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as UnscrambleOptions['sortBy'])}
            className="input w-28"
          >
            <option value="score">Score</option>
            <option value="length">Length</option>
            <option value="alpha">A–Z</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value as UnscrambleOptions['sortDir'])}
            className="input w-24"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </label>
      </div>

      {searched && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              Results ({results.length} word{results.length !== 1 ? 's' : ''})
            </h2>
            {results.length > 0 && (
              <button type="button" className="btn" onClick={copyResults}>
                {copied ? 'Copied!' : 'Copy all'}
              </button>
            )}
          </div>

          {results.length === 0 && !loading && (
            <p className="text-gray-600">No words found for these letters. Try different letters or length range.</p>
          )}

          {results.length > 0 && (
            <div className="grid gap-6">
              {Array.from(grouped.entries())
                .sort((a, b) => b[0] - a[0])
                .map(([len, words]) => (
                  <div key={len}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {len} letter{len !== 1 ? 's' : ''}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {words.map((r) => (
                        <div
                          key={r.word}
                          className="p-4 rounded-lg border border-gray-200 bg-white shadow cursor-pointer hover:bg-primary/10 transition-colors text-center font-medium"
                          title={`Score: ${r.score}`}
                        >
                          {r.word}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
