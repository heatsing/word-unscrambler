"use client";

import { useState, useCallback } from "react";
import { getScrabbleScore } from "@/lib/unscramble";

interface CrosswordResult {
  word: string;
  score: number;
}

function solveCrossword(
  pattern: string,
  includeLetters: string,
  excludeLetters: string,
  wordList: string[]
): CrosswordResult[] {
  const normalized = pattern.toLowerCase().replace(/[^a-z_]/g, "");
  const included = includeLetters.toLowerCase().replace(/[^a-z]/g, "").split("").filter(Boolean);
  const excluded = excludeLetters.toLowerCase().replace(/[^a-z]/g, "").split("").filter(Boolean);

  const results: CrosswordResult[] = [];
  for (const word of wordList) {
    if (word.length !== normalized.length) continue;

    let matches = true;
    for (let i = 0; i < normalized.length; i++) {
      if (normalized[i] !== "_" && normalized[i] !== word[i]) {
        matches = false;
        break;
      }
    }
    if (!matches) continue;

    for (const letter of excluded) {
      if (word.includes(letter)) { matches = false; break; }
    }
    if (!matches) continue;

    for (const letter of included) {
      if (!word.includes(letter)) { matches = false; break; }
    }
    if (!matches) continue;

    results.push({ word, score: getScrabbleScore(word) });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

function loadWordsByLength(len: number): Promise<string[]> {
  return fetch(`/data/words_${len}.json`).then((r) => r.ok ? r.json() : []).catch(() => []);
}

export default function CrosswordSolver() {
  const [pattern, setPattern] = useState("");
  const [includeLetters, setIncludeLetters] = useState("");
  const [excludeLetters, setExcludeLetters] = useState("");
  const [results, setResults] = useState<CrosswordResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [wordLength, setWordLength] = useState(5);
  const [copied, setCopied] = useState(false);

  const lengthOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSolve = useCallback(async () => {
    const cleanPattern = pattern.toLowerCase().replace(/[^a-z_]/g, "");
    const targetLen = cleanPattern.replace(/_/g, "").length > 0 ? cleanPattern.replace(/_/g, "").length : wordLength;

    // If pattern has letters without underscores, use that length
    const patternLetters = cleanPattern.replace(/_/g, "");
    const effectiveLen = patternLetters.length > 0 ? cleanPattern.length : wordLength;

    setLoading(true);
    setSearched(true);
    try {
      const words = await loadWordsByLength(effectiveLen);
      const r = solveCrossword(pattern, includeLetters, excludeLetters, words);
      setResults(r);
    } finally {
      setLoading(false);
    }
  }, [pattern, includeLetters, excludeLetters, wordLength]);

  const handleReset = () => {
    setPattern("");
    setIncludeLetters("");
    setExcludeLetters("");
    setResults([]);
    setSearched(false);
  };

  const handlePatternKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSolve();
  };

  const copyResults = () => {
    const text = results.map((r) => r.word).join("\n");
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="crossword-solver">
      <div className="tool-form-card rounded-lg border border-border bg-card p-6 mb-6">
        <div className="mb-6">
          <label htmlFor="crossword-pattern" className="block text-sm font-semibold text-foreground mb-2">
            Letter Pattern (use _ for unknown letters)
          </label>
          <input
            id="crossword-pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value.toLowerCase().replace(/[^a-z_]/g, ""))}
            onKeyDown={handlePatternKeyDown}
            className="input text-center text-2xl font-mono tracking-widest uppercase"
            placeholder="e.g. _A_E or CROS_"
            maxLength={10}
            autoComplete="off"
          />
          <p className="tool-helper-text text-xs text-muted-foreground text-center mt-2">
            Enter known letters. Use underscore (_) for each unknown letter.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div>
            <label htmlFor="word-length" className="block text-sm font-semibold text-foreground mb-1">
              Word Length
            </label>
            <select
              id="word-length"
              value={wordLength}
              onChange={(e) => setWordLength(Number(e.target.value))}
              className="input"
            >
              {lengthOptions.map((n) => (
                <option key={n} value={n}>{n} letters</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="include-letters" className="block text-sm font-semibold text-foreground mb-1">
              Include Letters
            </label>
            <input
              id="include-letters"
              type="text"
              value={includeLetters}
              onChange={(e) => setIncludeLetters(e.target.value.replace(/[^a-z]/gi, "").toLowerCase())}
              className="input"
              placeholder="e.g. aet"
              maxLength={26}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="exclude-letters" className="block text-sm font-semibold text-foreground mb-1">
              Exclude Letters
            </label>
            <input
              id="exclude-letters"
              type="text"
              value={excludeLetters}
              onChange={(e) => setExcludeLetters(e.target.value.replace(/[^a-z]/gi, "").toLowerCase())}
              className="input"
              placeholder="e.g. bcd"
              maxLength={26}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" className="btn btn-primary flex-1" onClick={handleSolve} disabled={loading}>
            {loading ? <><span className="spinner mr-2" />Searching…</> : "Find Words"}
          </button>
          <button type="button" className="btn" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {searched && (
        <div className="mb-8">
          <div className="tool-results-head flex items-center justify-between mb-4">
            <h2 className="tool-results-title text-2xl font-bold">
              {results.length} word{results.length !== 1 ? "s" : ""} found
            </h2>
            {results.length > 0 && (
              <button type="button" className="btn" onClick={copyResults}>
                {copied ? "Copied!" : "Copy all"}
              </button>
            )}
          </div>

          {results.length === 0 && !loading && (
            <p className="tool-empty-state text-muted-foreground text-center py-8">
              No words match your pattern. Try adjusting your letters or length.
            </p>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 fade-in">
              {results.map((r) => (
                <div
                  key={r.word}
                  className="result-card tool-result-card p-4 rounded-lg border border-border bg-card text-center cursor-pointer"
                  title={`Score: ${r.score}`}
                >
                  <span className="font-bold uppercase text-lg tracking-wide text-foreground">{r.word}</span>
                  <span className="block text-xs text-muted-foreground mt-1">{r.score} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="tool-info-card rounded-lg border border-border bg-card p-6">
        <h2 className="tool-info-title text-xl font-bold mb-4 text-foreground">Pattern Examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
            <code className="text-lg font-mono font-bold text-foreground">_ A _ _ E</code>
            <span className="text-sm text-muted-foreground">5-letter word with A and E</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
            <code className="text-lg font-mono font-bold text-foreground">C R O S _</code>
            <span className="text-sm text-muted-foreground">Starts with "CROS"</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
            <code className="text-lg font-mono font-bold text-foreground">_ _ _ _ _</code>
            <span className="text-sm text-muted-foreground">Any 5-letter word</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
            <code className="text-lg font-mono font-bold text-foreground">S _ _ _ S</code>
            <span className="text-sm text-muted-foreground">Starts and ends with S</span>
          </div>
        </div>
      </div>
    </div>
  );
}
