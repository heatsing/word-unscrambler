import React, { useMemo, useState } from "react";

const SAMPLE_WORDS = [
  "scramble",
  "solver",
  "anagram",
  "finder",
  "letters",
  "wordle",
  "crossword",
  "puzzle",
  "unscramble",
  "vocabulary",
];

export default function InteractiveWordTools() {
  const [query, setQuery] = useState("");
  const [minLength, setMinLength] = useState(5);
  const [sortMode, setSortMode] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = SAMPLE_WORDS.filter((word) => {
      if (word.length < minLength) return false;
      if (!q) return true;
      return word.includes(q);
    });

    result.sort((a, b) => (sortMode === "asc" ? a.localeCompare(b) : b.localeCompare(a)));
    return result;
  }, [query, minLength, sortMode]);

  return (
    <section className="card border border-border bg-card shadow-sm">
      <div className="card-body gap-4">
        <h2 className="card-title text-foreground">React 交互组件</h2>

        <div className="grid gap-3 md:grid-cols-3">
          <label className="form-control">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Search
            </span>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="type letters..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Min Length
            </span>
            <input
              type="range"
              min={3}
              max={10}
              value={minLength}
              onChange={(e) => setMinLength(Number(e.target.value))}
              className="range range-primary"
            />
            <span className="text-sm text-muted-foreground">{"\u2265"} {minLength}</span>
          </label>

          <label className="form-control">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sort
            </span>
            <select
              className="select select-bordered w-full"
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as "asc" | "desc")}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </label>
        </div>

        <div className="rounded-lg border border-border bg-background p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Results</p>
            <span className="badge badge-primary">{filtered.length}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filtered.length === 0 ? (
              <span className="text-sm text-muted-foreground">No matches.</span>
            ) : (
              filtered.map((word) => (
                <span key={word} className="badge badge-outline">
                  {word}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
