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

/** Rack may include ? or space as blank tiles (NYT Crossplay style). */
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

function getWordsPath(len: number, mode: GameMode): string {
  if (mode === "general") return `/data/words_${len}.json`;
  return `/data/words_common_${len}.json`;
}

function loadWordsByLength(len: number, mode: GameMode): Promise<string[]> {
  return fetch(getWordsPath(len, mode))
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
}

type GameMode = "nyt" | "general";

interface ResultRow {
  word: string;
  score: number;
}

function HintIcon({ label }: { label: string }) {
  return (
    <span
      className="crossplay-field-hint"
      title={label}
      aria-label={label}
      role="img"
    >
      ?
    </span>
  );
}

export default function NYTCrossplaySolver() {
  const [letters, setLetters] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [contains, setContains] = useState("");
  const [lengthStr, setLengthStr] = useState("");
  const [gameMode, setGameMode] = useState<GameMode>("nyt");
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

    setLoading(true);
    setSearched(true);
    try {
      const lengths =
        lenParsed !== null
          ? [lenParsed]
          : [5, 6, 7, 4, 8, 3, 9, 2, 10];

      const wordLists = await Promise.all(lengths.map((n) => loadWordsByLength(n, gameMode)));
      const merged: string[] = wordLists.flat();

      const out: ResultRow[] = [];
      for (const word of merged) {
        if (!canFormWithBlanks(word, rack)) continue;
        if (pre && !word.startsWith(pre)) continue;
        if (suf && !word.endsWith(suf)) continue;
        if (mid && !word.includes(mid)) continue;
        if (lenParsed !== null && word.length !== lenParsed) continue;
        out.push({ word, score: getScrabbleScore(word) });
      }

      out.sort((a, b) => b.score - a.score);
      const cap = 500;
      setResults(out.slice(0, cap));
    } finally {
      setLoading(false);
    }
  }, [letters, starts, ends, contains, lengthStr, wildOk, gameMode]);

  return (
    <div className="crossplay-tool">
      <div className="crossplay-main-search">
        <svg
          className="crossplay-search-icon"
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
          className="crossplay-main-input"
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
        <p className="crossplay-warn">
          Too many wildcards — max {MAX_WILDCARDS} (? or space).
        </p>
      )}

      <div className="crossplay-advanced">
        <div className="crossplay-grid2">
          <label className="crossplay-field">
            <span className="crossplay-field-label">
              Starts
              <HintIcon label="Letters your answer must start with (optional)" />
            </span>
            <input
              type="text"
              className="crossplay-field-input"
              value={starts}
              onChange={(e) =>
                setStarts(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
              }
              autoComplete="off"
            />
          </label>
          <label className="crossplay-field">
            <span className="crossplay-field-label">
              Ends
              <HintIcon label="Letters your answer must end with (optional)" />
            </span>
            <input
              type="text"
              className="crossplay-field-input"
              value={ends}
              onChange={(e) =>
                setEnds(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
              }
              autoComplete="off"
            />
          </label>
          <label className="crossplay-field">
            <span className="crossplay-field-label">
              Contains
              <HintIcon label="Letters that must appear somewhere in the word (optional)" />
            </span>
            <input
              type="text"
              className="crossplay-field-input"
              value={contains}
              onChange={(e) =>
                setContains(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))
              }
              autoComplete="off"
            />
          </label>
          <label className="crossplay-field">
            <span className="crossplay-field-label">
              Length
              <HintIcon label="Exact word length (2–10), or leave blank to search all lengths" />
            </span>
            <input
              type="text"
              inputMode="numeric"
              className="crossplay-field-input"
              placeholder="Any"
              value={lengthStr}
              onChange={(e) =>
                setLengthStr(e.target.value.replace(/[^\d]/g, "").slice(0, 2))
              }
              autoComplete="off"
            />
          </label>
        </div>

        <label className="crossplay-select-wrap">
          <span className="sr-only">Game mode</span>
          <select
            className="crossplay-select"
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
            aria-label="Dictionary or game mode"
          >
            <option value="nyt">NYT Crossplay</option>
            <option value="general">General word list</option>
          </select>
        </label>

        <button
          type="button"
          className="crossplay-search-btn"
          onClick={handleSearch}
          disabled={loading || !wildOk}
        >
          {loading ? "Searching…" : "SEARCH"}
        </button>
      </div>

      {error && <p className="crossplay-error">{error}</p>}

      {searched && !loading && (
        <div className="crossplay-results">
          <h2 className="crossplay-results-title">
            {results.length} word{results.length !== 1 ? "s" : ""} found
            {results.length >= 500 ? " (showing top 500)" : ""}
          </h2>
          {results.length === 0 ? (
            <p className="crossplay-results-empty">
              No matches. Try different letters, fewer filters, or check wildcards.
            </p>
          ) : (
            <ul className="crossplay-results-list">
              {results.map((r) => (
                <li key={r.word} className="crossplay-results-item">
                  <span className="crossplay-results-word">{r.word.toUpperCase()}</span>
                  <span className="crossplay-results-pts">{r.score} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <style>{`
        .crossplay-tool { max-width: 36rem; margin: 0 auto; }
        .crossplay-main-search {
          position: relative;
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 9999px;
          padding: 0.65rem 1.25rem 0.65rem 1rem;
          box-shadow: 0 4px 24px rgb(0 0 0 / 0.12);
          margin-bottom: 1.25rem;
        }
        .crossplay-search-icon {
          flex-shrink: 0;
          color: #0f172a;
          margin-right: 0.65rem;
          opacity: 0.75;
        }
        .crossplay-main-input {
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
        .crossplay-main-input::placeholder {
          color: #94a3b8;
          font-weight: 600;
        }
        .crossplay-warn {
          color: #fef08a;
          font-size: 0.875rem;
          text-align: center;
          margin: -0.5rem 0 1rem;
        }
        .crossplay-advanced {
          background: #fff;
          border-radius: 1rem;
          padding: 1.25rem;
          box-shadow: 0 8px 32px rgb(0 0 0 / 0.12);
        }
        .crossplay-grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem 1rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 480px) {
          .crossplay-grid2 { grid-template-columns: 1fr; }
        }
        .crossplay-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .crossplay-field-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0f172a;
        }
        .crossplay-field-hint {
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
        .crossplay-field-input {
          width: 100%;
          border: 1px solid #0f172a;
          border-radius: 9999px;
          padding: 0.5rem 0.85rem;
          font-size: 0.9rem;
          color: #0f172a;
          background: #fff;
        }
        .crossplay-select-wrap { display: block; margin-bottom: 1rem; }
        .crossplay-select {
          width: 100%;
          border: 1px solid #0f172a;
          border-radius: 0.5rem;
          padding: 0.6rem 0.75rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0f172a;
          background: #fff;
          cursor: pointer;
        }
        .crossplay-search-btn {
          width: 100%;
          border: none;
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #1c1917;
          background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
          box-shadow: 0 2px 0 #b45309;
          cursor: pointer;
        }
        .crossplay-search-btn:hover:not(:disabled) {
          filter: brightness(1.05);
        }
        .crossplay-search-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .crossplay-error {
          margin-top: 1rem;
          text-align: center;
          color: #fef08a;
          font-weight: 600;
        }
        .crossplay-results {
          margin-top: 2rem;
          padding: 0 0.25rem 2rem;
        }
        .crossplay-results-title {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-align: center;
        }
        .crossplay-results-empty {
          color: rgb(255 255 255 / 0.85);
          text-align: center;
        }
        .crossplay-results-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
          gap: 0.5rem;
        }
        .crossplay-results-item {
          background: rgb(255 255 255 / 0.15);
          border: 1px solid rgb(255 255 255 / 0.25);
          border-radius: 0.5rem;
          padding: 0.5rem 0.35rem;
          text-align: center;
        }
        .crossplay-results-word {
          display: block;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #fff;
          font-size: 0.9rem;
        }
        .crossplay-results-pts {
          font-size: 0.7rem;
          color: rgb(255 255 255 / 0.75);
        }
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
