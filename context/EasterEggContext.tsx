"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { usePathname } from "next/navigation";

// All possible egg positions — 5 will be randomly selected each game
const ALL_EGG_POSITIONS = [
  "hero",
  "about",
  "skills-1",
  "skills-2",
  "experience-1",
  "experience-2",
  "projects",
  "contact-email",
  "contact-location",
  "footer",
];

interface EasterEggContextType {
  foundEggs: string[];
  totalEggs: number;
  findEgg: (id: string) => void;
  isGameActive: boolean;
  startGame: () => void;
  allFound: boolean;
  activeEggs: string[];
}

const EasterEggContext = createContext<EasterEggContextType | null>(null);

const TOTAL_EGGS = 5;
const STORAGE_KEY = "nhn-easter-eggs";
const GAME_KEY = "nhn-easter-game-active";
const ACTIVE_EGGS_KEY = "nhn-easter-active-eggs";

function pickRandomEggs(): string[] {
  const shuffled = [...ALL_EGG_POSITIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_EGGS);
}

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [activeEggs, setActiveEggs] = useState<string[]>([]);
  const [showingCelebration, setShowingCelebration] = useState(false);
  const pathname = usePathname();

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const gameActive = localStorage.getItem(GAME_KEY);
    const storedActiveEggs = localStorage.getItem(ACTIVE_EGGS_KEY);

    if (gameActive === "true") {
      setIsGameActive(true);
      if (stored) setFoundEggs(JSON.parse(stored));
      if (storedActiveEggs) setActiveEggs(JSON.parse(storedActiveEggs));
    }
  }, []);

  // Reset game when user navigates away from homepage (except to easter-eggs page)
  useEffect(() => {
    if (pathname !== "/" && pathname !== "/fun/easter-eggs") {
      if (isGameActive) {
        setFoundEggs([]);
        setIsGameActive(false);
        setActiveEggs([]);
        setShowingCelebration(false);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(GAME_KEY);
        localStorage.removeItem(ACTIVE_EGGS_KEY);
      }
    }
  }, [pathname, isGameActive]);

  // Auto-reset after all eggs found
  useEffect(() => {
    if (foundEggs.length >= TOTAL_EGGS && isGameActive && !showingCelebration) {
      setShowingCelebration(true);
      setTimeout(() => {
        setFoundEggs([]);
        setIsGameActive(false);
        setActiveEggs([]);
        setShowingCelebration(false);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(GAME_KEY);
        localStorage.removeItem(ACTIVE_EGGS_KEY);
      }, 5000);
    }
  }, [foundEggs, isGameActive, showingCelebration]);

  const findEgg = useCallback((id: string) => {
    setFoundEggs((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const startGame = useCallback(() => {
    const newEggs = pickRandomEggs();
    setFoundEggs([]);
    setIsGameActive(true);
    setActiveEggs(newEggs);
    setShowingCelebration(false);
    localStorage.setItem(GAME_KEY, "true");
    localStorage.setItem(ACTIVE_EGGS_KEY, JSON.stringify(newEggs));
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const allFound = foundEggs.length >= TOTAL_EGGS;

  return (
    <EasterEggContext.Provider
      value={{ foundEggs, totalEggs: TOTAL_EGGS, findEgg, isGameActive, startGame, allFound, activeEggs }}
    >
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEgg() {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error("useEasterEgg must be used within an EasterEggProvider");
  }
  return context;
}
