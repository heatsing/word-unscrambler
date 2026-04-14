"use client";

import { useState, useCallback, useEffect } from "react";

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

type TileState = "empty" | "filled" | "correct" | "present" | "absent";

function getDailyWord(words: string[], date: Date): string {
  const seed =
    date.getFullYear() * 10000 +
    (date.getMonth() + 1) * 100 +
    date.getDate();
  let s = seed;
  for (let i = 0; i < 10; i++)
    s = (s * 1103515245 + 12345) & 0x7fffffff;
  const idx = s % words.length;
  return words[idx].toUpperCase();
}

function getRandomWord(words: string[]): string {
  const idx = Math.floor(Math.random() * words.length);
  return words[idx].toUpperCase();
}

function evaluateGuess(guess: string, answer: string): TileState[] {
  const result: TileState[] = Array(5).fill("absent");
  const answerLetters = answer.split("");
  const guessLetters = guess.split("");

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      result[i] = "correct";
      answerLetters[i] = "_";
      guessLetters[i] = "_";
    }
  }

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === "_") continue;
    const idx = answerLetters.indexOf(guessLetters[i]);
    if (idx !== -1) {
      result[i] = "present";
      answerLetters[idx] = "_";
    }
  }

  return result;
}

function buildShareText(grid: TileState[][], guesses: string[][], won: boolean, dayStr: string): string {
  const lines = grid.map((row) =>
    row
      .map((state) => {
        if (state === "correct") return "🟩";
        if (state === "present") return "🟨";
        if (state === "absent") return "⬛";
        return "⬜";
      })
      .join("")
  );
  return `Wordle ${dayStr} ${won ? guesses.length : "X"}/6\n\n${lines.join("\n")}`;
}

interface PlayWordleProps {
  daily?: boolean;
}

export default function PlayWordle({ daily = true }: PlayWordleProps) {
  const [words, setWords] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [grid, setGrid] = useState<TileState[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => "empty" as TileState)
    )
  );
  const [keyStates, setKeyStates] = useState<Record<string, TileState>>({});
  const [message, setMessage] = useState<string>("");
  const [shakeRow, setShakeRow] = useState<number>(-1);
  const [flipRow, setFlipRow] = useState<number>(-1);
  const [bounceRow, setBounceRow] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const initGame = useCallback(
    (wordList: string[]) => {
      if (wordList.length === 0) return;
      const word = daily ? getDailyWord(wordList, new Date()) : getRandomWord(wordList);
      setAnswer(word);
      setGuesses([]);
      setCurrentGuess("");
      setGameOver(false);
      setWon(false);
      setGrid(
        Array.from({ length: 6 }, () =>
          Array.from({ length: 5 }, () => "empty" as TileState)
        )
      );
      setKeyStates({});
      setMessage("");
      setShakeRow(-1);
      setFlipRow(-1);
      setBounceRow(-1);
      setLoading(false);
    },
    [daily]
  );

  useEffect(() => {
    fetch("/data/words_5.json")
      .then((r) => r.json())
      .then((data) => {
        setWords(data);
        initGame(data);
      })
      .catch(() => setLoading(false));
  }, [initGame]);

  const dayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();

  const submitGuess = useCallback(
    (guess: string) => {
      if (guess.length !== 5 || gameOver) return;
      if (!words.map((w) => w.toUpperCase()).includes(guess)) {
        setMessage("Not in word list");
        setShakeRow(guesses.length);
        setTimeout(() => {
          setShakeRow(-1);
          setMessage("");
        }, 600);
        return;
      }

      const states = evaluateGuess(guess, answer);
      const rowIdx = guesses.length;

      const newGrid = grid.map((r) => [...r]);
      for (let i = 0; i < 5; i++) newGrid[rowIdx][i] = states[i];
      setGrid(newGrid);
      setFlipRow(rowIdx);

      const newKeyStates = { ...keyStates };
      for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        const current = newKeyStates[letter];
        if (states[i] === "correct") {
          newKeyStates[letter] = "correct";
        } else if (states[i] === "present" && current !== "correct") {
          newKeyStates[letter] = "present";
        } else if (states[i] === "absent" && !current) {
          newKeyStates[letter] = "absent";
        }
      }
      setTimeout(() => setKeyStates(newKeyStates), 600);

      const newGuesses = [...guesses, guess];
      setGuesses(newGuesses);

      if (guess === answer) {
        setTimeout(() => {
          setWon(true);
          setGameOver(true);
          setBounceRow(rowIdx);
          setMessage(
            rowIdx === 0
              ? "Genius!"
              : rowIdx === 1
              ? "Magnificent!"
              : rowIdx === 2
              ? "Impressive!"
              : rowIdx === 3
              ? "Splendid!"
              : rowIdx === 4
              ? "Great!"
              : "Phew!"
          );
        }, 800);
      } else if (newGuesses.length >= 6) {
        setTimeout(() => {
          setGameOver(true);
          setMessage(`The word was ${answer}`);
        }, 800);
      } else {
        setTimeout(() => {
          setCurrentGuess("");
          setFlipRow(-1);
        }, 600);
      }
    },
    [answer, gameOver, guesses, grid, keyStates, words]
  );

  const handleKey = useCallback(
    (key: string) => {
      if (gameOver) return;
      if (key === "ENTER") {
        if (currentGuess.length === 5) {
          submitGuess(currentGuess);
        } else {
          setMessage("Not enough letters");
          setShakeRow(guesses.length);
          setTimeout(() => {
            setShakeRow(-1);
            setMessage("");
          }, 600);
        }
      } else if (key === "BACKSPACE" || key === "⌫") {
        setCurrentGuess((g) => g.slice(0, -1));
        const rowIdx = guesses.length;
        const newGrid = grid.map((r) => [...r]);
        for (let i = 0; i < 5; i++) {
          newGrid[rowIdx][i] = i < currentGuess.length - 1 ? "filled" : "empty";
        }
        setGrid(newGrid);
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        const next = currentGuess + key;
        setCurrentGuess(next);

        const rowIdx = guesses.length;
        const newGrid = grid.map((r) => [...r]);
        for (let i = 0; i < next.length; i++) newGrid[rowIdx][i] = "filled";
        for (let i = next.length; i < 5; i++) newGrid[rowIdx][i] = "empty";
        setGrid(newGrid);

        if (next.length === 5) {
          setTimeout(() => submitGuess(next), 150);
        }
      }
    },
    [currentGuess, gameOver, guesses, grid, submitGuess]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter") {
        handleKey("ENTER");
      } else if (e.key === "Backspace") {
        handleKey("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key.toUpperCase());
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const handleShare = async () => {
    const text = buildShareText(grid, guesses.map((_, i) => guesses.slice(0, i + 1)), won, dayStr);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNewWord = () => {
    initGame();
  };

  const getCellClass = (state: TileState, rowIdx: number, colIdx: number, isFlipping: boolean) => {
    const classes = ["wordle-cell"];
    if (state === "correct") classes.push("correct");
    else if (state === "present") classes.push("present");
    else if (state === "absent") classes.push("absent");
    else if (state === "filled") classes.push("filled");
    
    if (isFlipping && rowIdx < guesses.length) {
      classes.push("flip");
    }
    return classes.join(" ");
  };

  const getKeyClass = (letter: string) => {
    const classes = ["wordle-key"];
    const state = keyStates[letter];
    if (letter === "ENTER" || letter === "⌫") classes.push("wide");
    if (state === "correct") classes.push("correct");
    else if (state === "present") classes.push("present");
    else if (state === "absent") classes.push("absent");
    return classes.join(" ");
  };

  if (loading) {
    return (
      <div className="wordle-game">
        <div className="wordle-grid">
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <div key={rowIdx} className="wordle-row">
              {Array.from({ length: 5 }).map((_, colIdx) => (
                <div key={colIdx} className="wordle-cell" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="wordle-game">
      {message && (
        <div className="wordle-message" style={{
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          background: "var(--card)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
          fontWeight: 600,
          fontSize: "0.875rem",
          marginBottom: "0.5rem",
          animation: "fadeIn 0.2s ease-out"
        }}>
          {message}
        </div>
      )}

      <div className="wordle-grid">
        {grid.map((row, rowIdx) => {
          const isCurrentRow = rowIdx === guesses.length && !gameOver;
          const isShaking = rowIdx === shakeRow;
          const isFlipping = rowIdx === flipRow;
          const isBouncing = rowIdx === bounceRow;

          return (
            <div
              key={rowIdx}
              className={`wordle-row ${isShaking ? "shake" : ""} ${isBouncing ? "bounce" : ""}`}
            >
              {Array.from({ length: 5 }).map((_, colIdx) => {
                const state = row[colIdx];
                const letter =
                  rowIdx < guesses.length
                    ? guesses[rowIdx][colIdx]
                    : rowIdx === guesses.length ? currentGuess[colIdx] || "" : "";

                return (
                  <div
                    key={colIdx}
                    className={getCellClass(state, rowIdx, colIdx, isFlipping)}
                    style={
                      isFlipping && rowIdx < guesses.length
                        ? { animationDelay: `${colIdx * 250}ms` }
                        : isBouncing
                        ? { animationDelay: `${colIdx * 100}ms` }
                        : {}
                    }
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="wordle-keyboard">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="wordle-keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleKey(key === "⌫" ? "BACKSPACE" : key)}
                className={getKeyClass(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1rem" }}>
        {!daily && (
          <button
            type="button"
            onClick={handleNewWord}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              background: "var(--color-primary)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer"
            }}
          >
            New Word
          </button>
        )}
        {daily && (gameOver || guesses.length > 0) && (
          <button
            type="button"
            onClick={handleShare}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              background: copied ? "#6aaa64" : "var(--color-primary)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer"
            }}
          >
            {copied ? "Copied!" : "Share"}
          </button>
        )}
        {gameOver && (
          <button
            type="button"
            onClick={handleNewWord}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--foreground)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer"
            }}
          >
            {daily ? "Next Day" : "Play Again"}
          </button>
        )}
      </div>
    </div>
  );
}
