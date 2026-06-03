"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const ALL_SKILLS = [
  "React", "TypeScript", "Golang", "Node.js", "Firebase",
  "Docker", "Next.js", "Redis", "React Native", "MySQL",
  "PostgreSQL", "Tailwind", "GCP", "C#", "ASP.NET",
];

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface Food {
  position: Position;
  name: string;
}

export default function TechSnakePage() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Food | null>(null);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  const [remainingSkills, setRemainingSkills] = useState<string[]>([]);
  const [allCollected, setAllCollected] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const directionRef = useRef(direction);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("nhn-snake-highscore");
    if (stored) setHighScore(parseInt(stored));
  }, []);

  const spawnFood = useCallback((snakeBody: Position[], skills: string[]): Food | null => {
    if (skills.length === 0) return null;
    const skill = skills[0];
    let position: Position;
    let attempts = 0;
    do {
      position = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      attempts++;
    } while (
      snakeBody.some((s) => s.x === position.x && s.y === position.y) &&
      attempts < 100
    );
    return { position, name: skill };
  }, []);

  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    const shuffled = [...ALL_SKILLS].sort(() => Math.random() - 0.5);
    setSnake(initialSnake);
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setCollectedSkills([]);
    setRemainingSkills(shuffled.slice(1));
    setFood({ position: { x: 15, y: 10 }, name: shuffled[0] });
    setIsPlaying(true);
    setIsGameOver(false);
    setAllCollected(false);
    setSpeed(INITIAL_SPEED);
  }, []);

  const gameOver = useCallback(() => {
    setIsPlaying(false);
    setIsGameOver(true);
    if (collectedSkills.length > highScore) {
      setHighScore(collectedSkills.length);
      localStorage.setItem("nhn-snake-highscore", collectedSkills.length.toString());
    }
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  }, [collectedSkills.length, highScore]);

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const dir = directionRef.current;

        if (dir === "UP") head.y -= 1;
        if (dir === "DOWN") head.y += 1;
        if (dir === "LEFT") head.x -= 1;
        if (dir === "RIGHT") head.x += 1;

        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          gameOver();
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((s) => s.x === head.x && s.y === head.y)) {
          gameOver();
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        setFood((currentFood) => {
          if (currentFood && head.x === currentFood.position.x && head.y === currentFood.position.y) {
            setCollectedSkills((prev) => {
              const updated = [...prev, currentFood.name];
              if (updated.length >= ALL_SKILLS.length) {
                setAllCollected(true);
                setIsPlaying(false);
                if (gameLoopRef.current) clearInterval(gameLoopRef.current);
              }
              return updated;
            });
            setRemainingSkills((prev) => {
              const next = prev.slice(1);
              const nextFood = spawnFood(newSnake, next.length > 0 ? next : []);
              if (next.length > 0) {
                setFood({ position: nextFood!.position, name: next[0] });
              } else {
                setFood(null);
              }
              return next;
            });
            setSpeed((s) => Math.max(80, s - 5));
            return currentFood;
          }
          return currentFood;
        });

        // Check if we ate food (don't pop tail)
        if (food && head.x === food.position.x && head.y === food.position.y) {
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    }, speed);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, speed, food, gameOver, spawnFood]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      const dir = directionRef.current;
      if ((e.key === "ArrowUp" || e.key === "w") && dir !== "DOWN") {
        directionRef.current = "UP";
        setDirection("UP");
      }
      if ((e.key === "ArrowDown" || e.key === "s") && dir !== "UP") {
        directionRef.current = "DOWN";
        setDirection("DOWN");
      }
      if ((e.key === "ArrowLeft" || e.key === "a") && dir !== "RIGHT") {
        directionRef.current = "LEFT";
        setDirection("LEFT");
      }
      if ((e.key === "ArrowRight" || e.key === "d") && dir !== "LEFT") {
        directionRef.current = "RIGHT";
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // Touch controls
  const touchStartRef = useRef<Position | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isPlaying) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    const dir = directionRef.current;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && dir !== "LEFT") { directionRef.current = "RIGHT"; setDirection("RIGHT"); }
      if (dx < 0 && dir !== "RIGHT") { directionRef.current = "LEFT"; setDirection("LEFT"); }
    } else {
      if (dy > 0 && dir !== "UP") { directionRef.current = "DOWN"; setDirection("DOWN"); }
      if (dy < 0 && dir !== "DOWN") { directionRef.current = "UP"; setDirection("UP"); }
    }
  };

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/fun" className="text-accent-400 hover:text-accent-500 text-sm mb-4 inline-block">
          ← Back to Fun Zone
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-light-100 mb-6">
          🐍 Tech Snake
        </h1>

        {!isPlaying && !isGameOver && !allCollected && (
          <div className="space-y-6">
            <div className="bg-dark-800 rounded-lg p-6">
              <p className="text-light-300 mb-3">
                Eat all the tech skills to build the ultimate stack! Hit a wall or yourself = game over.
              </p>
              <p className="text-sm text-light-400">Controls: Arrow keys or WASD. Swipe on mobile.</p>
              {highScore > 0 && (
                <p className="text-sm text-light-400 mt-2">
                  🏆 High score: <span className="text-accent-400 font-semibold">{highScore} skills</span>
                </p>
              )}
            </div>
            <button
              onClick={startGame}
              className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
            >
              Start Game 🐍
            </button>
          </div>
        )}

        {(isPlaying || isGameOver || allCollected) && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Game Board */}
            <div>
              <div className="flex items-center gap-4 mb-3 text-sm text-light-400">
                <span>🎯 {collectedSkills.length}/{ALL_SKILLS.length} skills</span>
                {food && <span className="text-accent-400">Next: {food.name}</span>}
              </div>
              <div
                className="relative border-2 border-dark-700 rounded-lg overflow-hidden bg-dark-900"
                style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Snake */}
                {snake.map((segment, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-sm ${i === 0 ? "bg-accent-400" : "bg-accent-500/70"}`}
                    style={{
                      left: segment.x * CELL_SIZE,
                      top: segment.y * CELL_SIZE,
                      width: CELL_SIZE - 1,
                      height: CELL_SIZE - 1,
                    }}
                  />
                ))}
                {/* Food */}
                {food && (
                  <div
                    className="absolute bg-yellow-400 rounded-full flex items-center justify-center text-[8px] font-bold text-dark-900"
                    style={{
                      left: food.position.x * CELL_SIZE,
                      top: food.position.y * CELL_SIZE,
                      width: CELL_SIZE - 1,
                      height: CELL_SIZE - 1,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Skills sidebar */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-light-400 uppercase tracking-wider mb-3">
                Stack Built ({collectedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {collectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-accent-500/20 text-accent-400 border border-accent-500/50 px-2 py-1 rounded animate-fade-in"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Game Over */}
        {isGameOver && !allCollected && (
          <div className="mt-6 bg-dark-800 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-2xl mb-2">💥 Bug Encountered!</p>
            <p className="text-light-300">
              You collected <span className="text-accent-400 font-bold">{collectedSkills.length}</span> skills
            </p>
            <button
              onClick={startGame}
              className="mt-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Win - All collected */}
        {allCollected && (
          <div className="mt-6 bg-dark-800 border border-accent-500 rounded-lg p-8 text-center">
            <p className="text-4xl mb-4">🏆🎉🚀</p>
            <p className="text-2xl font-bold text-light-100 mb-2">
              Full Stack Assembled!
            </p>
            <p className="text-light-300 mb-4">
              You collected all {ALL_SKILLS.length} skills — just like NHN builds great software with the complete tech stack!
            </p>
            <p className="text-accent-400 font-semibold text-lg mb-6">
              &quot;Great software is built by combining the right tools. I bring them all.&quot;
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Hire NHN →
              </a>
              <button
                onClick={startGame}
                className="border border-dark-700 text-light-400 hover:text-light-100 hover:border-light-400 px-6 py-3 rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
