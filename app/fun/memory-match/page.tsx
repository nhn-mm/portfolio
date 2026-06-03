"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Card {
  id: number;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const TECH_SKILLS = [
  "React",
  "TypeScript",
  "Golang",
  "Node.js",
  "Firebase",
  "Docker",
  "Next.js",
  "Redis",
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCards(pairCount: number): Card[] {
  const selected = shuffleArray(TECH_SKILLS).slice(0, pairCount);
  const pairs = [...selected, ...selected];
  const shuffled = shuffleArray(pairs);
  return shuffled.map((name, index) => ({
    id: index,
    name,
    isFlipped: false,
    isMatched: false,
  }));
}

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("nhn-memory-best");
    if (stored) setBestTime(parseInt(stored));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isComplete) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  const startGame = useCallback(() => {
    setCards(createCards(6));
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);
    setIsComplete(false);
  }, []);

  const handleCardClick = (id: number) => {
    if (!isPlaying || isComplete) return;
    if (flippedCards.length === 2) return;

    const card = cards[id];
    if (card.isFlipped || card.isMatched) return;

    const newCards = [...cards];
    newCards[id] = { ...newCards[id], isFlipped: true };
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (newCards[first].name === newCards[second].name) {
        // Match found
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[first] = { ...updated[first], isMatched: true };
            updated[second] = { ...updated[second], isMatched: true };

            // Check if all matched
            if (updated.every((c) => c.isMatched)) {
              setIsComplete(true);
              if (!bestTime || timer < bestTime) {
                setBestTime(timer);
                localStorage.setItem("nhn-memory-best", timer.toString());
              }
            }
            return updated;
          });
          setFlippedCards([]);
        }, 500);
      } else {
        // No match — flip back
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[first] = { ...updated[first], isFlipped: false };
            updated[second] = { ...updated[second], isFlipped: false };
            return updated;
          });
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/fun" className="text-accent-400 hover:text-accent-500 text-sm mb-4 inline-block">
          ← Back to Fun Zone
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-light-100 mb-6">
          🃏 Tech Stack Match
        </h1>

        {!isPlaying ? (
          <div className="space-y-6">
            <div className="bg-dark-800 rounded-lg p-6">
              <p className="text-light-300 mb-4">
                Match pairs of my tech skills. Flip two cards at a time — find all 6 pairs to win!
              </p>
              {bestTime !== null && (
                <p className="text-sm text-light-400">
                  🏆 Your best time: <span className="text-accent-400 font-semibold">{formatTime(bestTime)}</span>
                </p>
              )}
            </div>
            <button
              onClick={startGame}
              className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
            >
              Start Game 🃏
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="flex items-center gap-6 text-light-300">
              <span>⏱ {formatTime(timer)}</span>
              <span>🔄 {moves} moves</span>
              {bestTime !== null && (
                <span className="text-sm text-light-400">🏆 Best: {formatTime(bestTime)}</span>
              )}
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-lg text-center flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-300 ${
                    card.isMatched
                      ? "bg-accent-500/20 border-2 border-accent-500 text-accent-400"
                      : card.isFlipped
                      ? "bg-dark-700 border-2 border-accent-400 text-light-100"
                      : "bg-dark-800 border-2 border-dark-700 hover:border-light-400 text-transparent cursor-pointer"
                  }`}
                  disabled={card.isMatched}
                >
                  {card.isFlipped || card.isMatched ? card.name : "?"}
                </button>
              ))}
            </div>

            {/* Win message */}
            {isComplete && (
              <div className="bg-dark-800 border border-accent-500 rounded-lg p-6 text-center">
                <p className="text-3xl mb-2">🎉🏆🎉</p>
                <p className="text-xl font-bold text-light-100">
                  Completed in {formatTime(timer)} with {moves} moves!
                </p>
                <button
                  onClick={startGame}
                  className="mt-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}

            {!isComplete && (
              <button
                onClick={startGame}
                className="border border-dark-700 text-light-400 hover:text-light-100 hover:border-light-400 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Restart
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
