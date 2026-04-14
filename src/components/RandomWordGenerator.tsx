"use client";

import { useState, useCallback } from "react";

interface WordData {
  word: string;
  meaning: string;
}

function loadWordsByLength(len: number): Promise<string[]> {
  return fetch(`/data/words_${len}.json`).then((r) => r.ok ? r.json() : []).catch(() => []);
}

function getRandomWord(words: string[]): string {
  const idx = Math.floor(Math.random() * words.length);
  return words[idx];
}

export default function RandomWordGenerator() {
  const [generatedWord, setGeneratedWord] = useState<string>("");
  const [length, setLength] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    try {
      const words = await loadWordsByLength(length);
      const word = getRandomWord(words);
      setGeneratedWord(word);
    } finally {
      setLoading(false);
    }
  }, [length]);

  const handleCopy = () => {
    if (generatedWord) {
      navigator.clipboard.writeText(generatedWord).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const lengths = [3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="rounded-xl border border-border bg-card p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-foreground">🎲 Random Word Generator</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Click Generate to get a random word of your chosen length. Use the copy button to copy it to your clipboard.
      </p>

      <div className="flex gap-3 items-end flex-wrap mb-4">
        <div>
          <label htmlFor="word-length-select" className="block text-sm font-medium text-foreground mb-1">
            Word Length
          </label>
          <select
            id="word-length-select"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="input w-32"
          >
            {lengths.map((n) => (
              <option key={n} value={n}>{n} letters</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? <><span className="spinner mr-2" />Generating…</> : "Generate Word"}
        </button>
      </div>

      {generatedWord && (
        <div className="flex items-center gap-3 fade-in">
          <div className="flex-1 p-4 rounded-lg border-2 border-primary bg-primary/5 text-center">
            <span className="text-2xl font-bold uppercase tracking-wide text-foreground">
              {generatedWord}
            </span>
            <span className="block text-sm text-muted-foreground mt-1">
              {generatedWord.length} letters
            </span>
          </div>
          <button
            type="button"
            className="btn"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {!generatedWord && (
        <div className="flex items-center gap-3">
          <div className="flex-1 p-4 rounded-lg border border-border bg-muted/30 text-center text-muted-foreground text-sm">
            Click "Generate Word" to get a random {length}-letter word
          </div>
        </div>
      )}
    </div>
  );
}
