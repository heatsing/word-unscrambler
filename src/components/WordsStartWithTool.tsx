"use client";

import { useState, useCallback } from "react";
import { getScrabbleScore } from "@/lib/unscramble";

const MAX_WILDCARDS = 3;

function countWildcards(rack: string): number {
  let n = 0;
  for (const ch of rack.toLowerCase()) {
    if (ch === "?" || ch === " ") n++;
  }
  return n;
}

function canFormWithBlanks(word: string, rack: string): boolean {
  let blanks = 0;
  const avail: Record<string, number> = {};
  for (const ch of rack.toLowerCase()) {
    if (ch === "?" || ch === " ") blanks++;
    else if (ch >= "a" && ch <= "z") avail[ch] = (avail[ch] || 0) + 1;
  }
  for (const c of word.toLowerCase()) {
    if ((avail[c] ?? 0) > 0) avail[c]--;
    else if (blanks > 0) blanks--;
    else return false;
  }
  return true;
}

function loadWordsByLength(len: number): Promise<string[]> {
  return fetch(`/data/words_${len}.json`)
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
}

type DictMode = "wwf" | "scrabble" | "general";

interface ResultRow {
  word: string;
  score: number;
}

function HintIcon({ label }: { label: string }) {
  return (
    <span className="wst-field-hint" title={label} aria-label={label} role="img">
      ?
    </span>
  );
}

export default function WordsStartWithTool() {
  const [letters, setLetters] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [contains, setContains] = useState("");
  const [exclude, setExclude] = useState("");
  const [include, setInclude] = useState("");
  const [lengthStr, setLengthStr] = useState("");
  const [dictMode, setDictMode] = useState<DictMode>("wwf");
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wildCount = countWildcards(letters);
  const wildOk = wildCount <= MAX_WILDCARDS;

  const normalizeFilter = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

  const handleSearch = useCallback(async () => {
    setError(null);
    const rack = letters.trim();
    if (!rack) {
      setError("Enter your letters in the search field.");
      return;
    }
    if (!wildOk) {
      setError(`Use at most ${MAX_WILDCARDS} wildcards (? or space).`);
      return;
    }

    const lenParsed = lengthStr.trim() === "" ? null : parseInt(lengthStr, 10);
    if (lenParsed !== null && (lenParsed < 2 || lenParsed > 10 || Number.isNaN(lenParsed))) {
      setError("Length must be between 2 and 10, or leave blank for all lengths.");
      return;
    }

    const pre = normalizeFilter(starts);
    const suf = normalizeFilter(ends);
    const mid = normalizeFilter(contains);
    const exStr = normalizeFilter(exclude);
    const incStr = normalizeFilter(include);

    setLoading(true);
    setSearched(true);
    try {
      const lengths =
        lenParsed !== null
          ? [lenParsed]
          : [5, 6, 7, 4, 8, 3, 9, 2, 10];

      const wordLists = await Promise.all(lengths.map((n) => loadWordsByLength(n)));
      const merged: string[] = wordLists.flat();

      const out: ResultRow[] = [];
      outer: for (const word of merged) {
        if (!canFormWithBlanks(word, rack)) continue;
        if (pre && !word.startsWith(pre)) continue;
        if (suf && !word.endsWith(suf)) continue;
        if (mid && !word.includes(mid)) continue;
        if (lenParsed !== null && word.length !== lenParsed) continue;
        for (let i = 0; i < exStr.length; i++) {
          if (word.includes(exStr[i])) continue outer;
        }
        for (let i = 0; i < incStr.length; i++) {
          if (!word.includes(incStr[i])) continue outer;
        }
        out.push({ word, score: getScrabbleScore(word) });
      }

      out.sort((a, b) => b.score - a.score);
      setResults(out.slice(0, 500));
    } finally {
      setLoading(false);
    }
  }, [letters, starts, ends, contains, exclude, include, lengthStr, wildOk]);

  return (
    <div className="wst-tool">
      <div className="wst-main-search">
        <svg
          className="wst-search-icon"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="wst-main-input"
          placeholder="YOUR LETTERS"
          value={letters}
          onChange={(e) =>
            setLetters(e.target.value.toUpperCase().replace(/[^A-Z?\s]/g, ""))
          }
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          autoComplete="off"
          spellCheck={false}
          aria-label="Your letters, use ? or space for up to three wildcards"
        />
      </div>
      {!wildOk && (
        <p className="wst-warn">Too many wildcards — max {MAX_WILDCARDS} (? or space).</p>
      )}

      <div className="wst-advanced">
        <div className="wst-grid">
          <label className="wst-field">
            <span className="wst-field-label">
              Starts
              <HintIcon label="Word must start with these letters (optional)" />
            </span>
            <input
              type="text"
              className="wst-field-input"
              value={starts}
              onChange={(e) =>
                setStarts(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
              }
              autoComplete="off"
            />
          </label>
          <label className="wst-field">
            <span className="wst-field-label">
              Ends
              <HintIcon label="Word must end with these letters (optional)" />
            </span>
            <input
              type="text"
              className="wst-field-input"
              value={ends}
              onChange={(e) =>
                setEnds(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
              }
              autoComplete="off"
            />
          </label>
          <label className="wst-field">
            <span className="wst-field-label">
              Contains
              <HintIcon label="Letters that must appear in order as a substring (optional)" />
            </span>
            <input
              type="text"
              className="wst-field-input"
              value={contains}
              onChange={(e) =>
                setContains(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
              }
              autoComplete="off"
            />
          </label>
          <label className="wst-field">
            <span className="wst-field-label">
              Length
              <HintIcon label="Exact word length 2–10, or leave blank for all" />
            </span>
            <input
              type="text"
              inputMode="numeric"
              className="wst-field-input"
              placeholder="Any"
              value={lengthStr}
              onChange={(e) =>
                setLengthStr(e.target.value.replace(/[^\d]/g, "").slice(0, 2))
              }
              autoComplete="off"
            />
          </label>
          <label className="wst-field">
            <span className="wst-field-label">
              Exclude
              <HintIcon label="Letters that must not appear in the word (optional)" />
            </span>
            <input
              type="text"
              className="wst-field-input"
              value={exclude}
              onChange={(e) =>
                setExclude(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
              }
              autoComplete="off"
            />
          </label>
          <label className="wst-field">
            <span className="wst-field-label">
              Include
              <HintIcon label="Each of these letters must appear at least once (optional)" />
            </span>
            <input
              type="text"
              className="wst-field-input"
              value={include}
              onChange={(e) =>
                setInclude(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
              }
              autoComplete="off"
            />
          </label>
        </div>

        <label className="wst-select-wrap">
          <span className="sr-only">Dictionary</span>
          <select
            className="wst-select"
            value={dictMode}
            onChange={(e) => setDictMode(e.target.value as DictMode)}
            aria-label="Dictionary"
          >
            <option value="wwf">Words With Friends</option>
            <option value="scrabble">Scrabble US</option>
            <option value="general">General word list</option>
          </select>
        </label>

        <button
          type="button"
          className="wst-search-btn"
          onClick={handleSearch}
          disabled={loading || !wildOk}
        >
          {loading ? "Searching…" : "SEARCH"}
        </button>
      </div>

      {error && <p className="wst-error">{error}</p>}

      {searched && !loading && (
        <div className="wst-results">
          <h2 className="wst-results-title">
            {results.length} word{results.length !== 1 ? "s" : ""} found
            {results.length >= 500 ? " (showing top 500)" : ""}
          </h2>
          {results.length === 0 ? (
            <p className="wst-results-empty">No matches. Try adjusting letters or filters.</p>
          ) : (
            <ul className="wst-results-list">
              {results.map((r) => (
                <li key={r.word} className="wst-results-item">
                  <span className="wst-results-word">{r.word.toUpperCase()}</span>
                  <span className="wst-results-pts">{r.score} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <style>{`
        .wst-tool { max-width: 36rem; margin: 0 auto; }
        .wst-main-search {
          position: relative;
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 9999px;
          padding: 0.65rem 1.25rem 0.65rem 1rem;
          box-shadow: 0 4px 24px rgb(0 0 0 / 0.12);
          margin-bottom: 1.25rem;
        }
        .wst-search-icon {
          flex-shrink: 0;
          color: #0f172a;
          margin-right: 0.65rem;
          opacity: 0.75;
        }
        .wst-main-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f172a;
          outline: none;
          text-align: center;
        }
        .wst-main-input::placeholder { color: #94a3b8; font-weight: 600; }
        .wst-warn {
          color: #fef08a;
          font-size: 0.875rem;
          text-align: center;
          margin: -0.5rem 0 1rem;
        }
        .wst-advanced {
          background: #fff;
          border-radius: 1rem;
          padding: 1.25rem;
          box-shadow: 0 8px 32px rgb(0 0 0 / 0.12);
        }
        .wst-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem 1rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 480px) {
          .wst-grid { grid-template-columns: 1fr; }
        }
        .wst-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .wst-field-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0f172a;
        }
        .wst-field-hint {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.125rem;
          height: 1.125rem;
          border-radius: 999px;
          border: 1px solid #cbd5e1;
          font-size: 0.65rem;
          font-weight: 800;
          color: #64748b;
          cursor: help;
        }
        .wst-field-input {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 9999px;
          padding: 0.5rem 0.85rem;
          font-size: 0.9rem;
          color: #0f172a;
          background: #fff;
        }
        .wst-select-wrap { display: block; margin-bottom: 1rem; }
        .wst-select {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          padding: 0.6rem 0.75rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0f172a;
          background: #fff;
          cursor: pointer;
        }
        .wst-search-btn {
          width: 100%;
          border: none;
          border-radius: 9999px;
          padding: 0.85rem 1rem;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #3f3f46;
          background: var(--wst-search-btn-bg, #f5c14e);
          box-shadow: 0 2px 0 var(--wst-search-btn-shadow, #d4a017);
          cursor: pointer;
        }
        .wst-search-btn:hover:not(:disabled) { filter: brightness(1.03); }
        .wst-search-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .wst-error {
          margin-top: 1rem;
          text-align: center;
          color: #fef08a;
          font-weight: 600;
        }
        .wst-results { margin-top: 2rem; padding: 0 0.25rem 2rem; }
        .wst-results-title {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-align: center;
        }
        .wst-results-empty { color: rgb(255 255 255 / 0.9); text-align: center; }
        .wst-results-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
          gap: 0.5rem;
        }
        .wst-results-item {
          background: rgb(255 255 255 / 0.15);
          border: 1px solid rgb(255 255 255 / 0.25);
          border-radius: 0.5rem;
          padding: 0.5rem 0.35rem;
          text-align: center;
        }
        .wst-results-word {
          display: block;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #fff;
          font-size: 0.9rem;
        }
        .wst-results-pts { font-size: 0.7rem; color: rgb(255 255 255 / 0.75); }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>
    </div>
  );
}
