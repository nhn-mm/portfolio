"use client";

import { useEasterEgg } from "@/context/EasterEggContext";
import { useState, useEffect } from "react";

export function EggProgressHUD() {
  const { foundEggs, totalEggs, isGameActive, allFound } = useEasterEgg();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (allFound && isGameActive) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [allFound, isGameActive]);

  if (!isGameActive) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 bg-dark-800 border border-dark-700 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
        <span className="text-lg">🥚</span>
        <span className="text-light-100 font-semibold text-sm">
          {foundEggs.length}/{totalEggs}
        </span>
        {allFound && <span className="text-lg">🎉</span>}
      </div>

      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
          <div className="text-center animate-bounce">
            <p className="text-6xl mb-4">🎊🏆🎊</p>
            <p className="text-2xl font-bold text-light-100 bg-dark-800/90 px-6 py-3 rounded-lg">
              You found all the eggs! 🎉
            </p>
            <p className="text-light-400 mt-2 bg-dark-800/90 px-4 py-2 rounded-lg">
              You&apos;re a true explorer. Thanks for visiting!
            </p>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-2xl animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              >
                {["🎉", "🎊", "⭐", "✨", "🥚", "🏆"][i % 6]}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
