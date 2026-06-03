"use client";

import { useState } from "react";
import { useEasterEgg } from "@/context/EasterEggContext";

interface EasterEggProps {
  id: string;
  className?: string;
}

export function EasterEgg({ id, className = "" }: EasterEggProps) {
  const { findEgg, isGameActive, foundEggs, activeEggs } = useEasterEgg();
  const [justFound, setJustFound] = useState(false);
  const isFound = foundEggs.includes(id);

  // Don't show if game isn't active or this egg isn't in the random selection
  if (!isGameActive || !activeEggs.includes(id)) return null;

  const handleClick = () => {
    if (isFound) return;
    findEgg(id);
    setJustFound(true);
    setTimeout(() => setJustFound(false), 2000);
  };

  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer select-none inline-block transition-all duration-300 ${
        isFound
          ? "opacity-50 scale-90"
          : "opacity-30 hover:opacity-100 hover:scale-125"
      } ${justFound ? "animate-bounce" : ""} ${className}`}
      title={isFound ? "Already found!" : "🤔"}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {justFound ? "🎉" : isFound ? "✅" : "🥚"}
    </span>
  );
}
