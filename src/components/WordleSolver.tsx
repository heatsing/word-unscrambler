"use client";

import { useState, useCallback } from "react";
import { getScrabbleScore } from "@/lib/unscramble";

interface SolvedWord {
  word: string;
  score: number;
}

function solveWordle(
  pattern: string,
  includeLetters: string,
  excludeLetters: string,
  wordList: string[]
): SolvedWord[] {
  const normalized = pattern.toLowerCase().replace(/[^a-z_]/g, "");
  const included = includeLetters.toLowerCase().replace(/[^a-z]/g, "").split("").filter(Boolean);
  const excluded = excludeLetters.toLowerCase().replace(/[^a-z]/g, "").split("").filter(Boolean);

  const results: SolvedWord[] = [];
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

export default function WordleSolver() {
  const [pattern, setPattern] = useState(["", "", "", "", ""]);
  const [includeLetters, setIncludeLetters] = useState("");
  const [excludeLetters, setExcludeLetters] = useState("");
  const [results, setResults] = useState<SolvedWord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [words, setWords] = useState<string[]>([]);

  const loadWords = useCallback(async () => {
    if (words.length > 0) return;
    try {
      const res = await fetch("/data/words_5.json");
      if (res.ok) setWords(await res.json());
    } catch { /* silent */ }
  }, [words.length]);

  const handleSolve = useCallback(async () => {
    setLoading(true);
    setSearched(true);
    await loadWords();
    const p = pattern.join("");
    setResults(solveWordle(p, includeLetters, excludeLetters, words));
    setLoading(false);
  }, [pattern, includeLetters, excludeLetters, words, loadWords]);

  const handlePatternChange = (index: number, value: string) => {
    const cleaned = value.replace(/[^a-z]/gi, "").slice(-1);
    const next = [...pattern];
    next[index] = cleaned;
    setPattern(next);
  };

  const handleReset = () => {
    setPattern(["", "", "", "", ""]);
    setIncludeLetters("");
    setExcludeLetters("");
    setResults([]);
    setSearched(false);
  };

  const copyResults = () => {
    navigator.clipboard.writeText(results.map((r) => r.word).join("\n"));
  };

  const STARTERS = [
    { word: "SLATE", note: "Great vowel coverage" },
    { word: "CRANE", note: "Common consonants + A,E" },
    { word: "TRACE", note: "High-frequency letters" },
    { word: "AUDIO", note: "Four vowels" },
    { word: "ADIEU", note: "Maximum vowels" },
    { word: "RAISE", note: "Common E in multiple positions" },
    { word: "STARE", note: "Common R,S,T" },
    { word: "SOARE", note: "Good letter distribution" },
    { word: "LARES", note: "Common L,R,S" },
    { word: "RALES", note: "Good start for R,A,L" },
  ];

  return (
    <div className="wordle-solver">
      <div className="rounded-lg border border-border bg-card p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Pattern (known letters in position)
          </label>
          <div className="flex gap-2 justify-center">
            {pattern.map((letter, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e) => handlePatternChange(i, e.target.value)}
                className={`wordle-tile ${letter ? "filled" : ""} text-center text-2xl font-bold uppercase`}
                placeholder="_"
                aria-label={`Position ${i + 1}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Enter known letters. Leave boxes empty for unknown positions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label htmlFor="include-letters" className="block text-sm font-semibold text-foreground mb-1">
              Include letters (in word, position unknown)
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
              Exclude letters (not in word)
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
            {loading ? <><span className="spinner mr-2" />Searching\u2026</> : "Find Words"}
          </button>
          <button type="button" className="btn" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {searched && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {results.length} word{results.length !== 1 ? "s" : ""} found
            </h2>
            {results.length > 0 && (
              <button type="button" className="btn" onClick={copyResults}>Copy all</button>
            )}
          </div>

          {results.length === 0 && !loading && (
            <p className="text-muted-foreground">
              No words match your pattern. Try adjusting your letters.
            </p>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 fade-in">
              {results.map((r) => (
                <div
                  key={r.word}
                  className="result-card p-4 rounded-lg border border-border bg-card text-center cursor-pointer"
                  title={`Score: ${r.score}`}
                >
                  <span className="font-bold uppercase text-lg tracking-wide">{r.word}</span>
                  <span className="block text-xs text-muted-foreground mt-1">{r.score} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">Best Wordle Starting Words</h2>
        <p className="text-sm text-muted-foreground mb-4">
          These opening words give you the best chance of finding the answer in few guesses.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {STARTERS.map((s) => (
            <div key={s.word} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
              <span className="font-bold uppercase tracking-wide text-foreground">{s.word}</span>
              <span className="text-xs text-muted-foreground">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
