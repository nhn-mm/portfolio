"use client";

import { useEasterEgg } from "@/context/EasterEggContext";
import Link from "next/link";

export default function EasterEggsPage() {
  const { isGameActive, startGame, foundEggs, totalEggs, allFound } = useEasterEgg();

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/fun" className="text-accent-400 hover:text-accent-500 text-sm mb-4 inline-block">
          ← Back to Fun Zone
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-light-100 mb-6">
          🥚 Easter Egg Hunt
        </h1>

        <div className="bg-dark-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-light-100 mb-4">How to Play</h2>
          <ul className="space-y-3 text-light-300">
            <li className="flex items-start gap-2">
              <span>🥚</span>
              <span>There are <strong className="text-accent-400">5 hidden eggs</strong> randomly placed across my portfolio</span>
            </li>
            <li className="flex items-start gap-2">
              <span>👀</span>
              <span>They&apos;re subtle — look carefully in each section</span>
            </li>
            <li className="flex items-start gap-2">
              <span>👆</span>
              <span>Click an egg when you find it</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🔀</span>
              <span>Egg positions are <strong className="text-accent-400">randomized</strong> each game!</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🏆</span>
              <span>Find all 5 to unlock a celebration!</span>
            </li>
          </ul>
        </div>

        {!isGameActive ? (
          <button
            onClick={startGame}
            className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            Start the Hunt! 🔍
          </button>
        ) : (
          <div className="space-y-6">
            <div className="bg-dark-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-light-100 mb-3">Progress</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 bg-dark-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-accent-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(foundEggs.length / totalEggs) * 100}%` }}
                  />
                </div>
                <span className="text-light-100 font-semibold">{foundEggs.length}/{totalEggs}</span>
              </div>
              <p className="text-sm text-light-400">
                Scroll through the homepage to find the hidden eggs!
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/"
                className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Go Hunt! →
              </Link>
              <button
                onClick={startGame}
                className="border border-dark-700 text-light-400 hover:text-light-100 hover:border-light-400 px-6 py-3 rounded-lg transition-colors"
              >
                New Game
              </button>
            </div>

            {allFound && (
              <div className="bg-dark-800 border border-accent-500 rounded-lg p-6 text-center">
                <p className="text-3xl mb-2">🏆🎉🏆</p>
                <p className="text-xl font-bold text-light-100">Congratulations!</p>
                <p className="text-light-300 mt-2">
                  You found all the eggs! Resetting in a few seconds...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
