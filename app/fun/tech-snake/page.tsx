"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 250;

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

function spawnFoodPosition(snakeBody: Position[]): Position {
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
  return position;
}

export default function TechSnakePage() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Food | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  const [allCollected, setAllCollected] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Use refs for game state to avoid stale closures in the game loop
  const directionRef = useRef<Direction>("RIGHT");
  const snakeRef = useRef<Position[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<Food | null>(null);
  const collectedRef = useRef<string[]>([]);
  const remainingRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("nhn-snake-highscore");
    if (stored) setHighScore(parseInt(stored));
  }, []);

  const stopGame = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    const shuffled = [...ALL_SKILLS].sort(() => Math.random() - 0.5);
    const firstFood: Food = { position: { x: 15, y: 10 }, name: shuffled[0] };

    snakeRef.current = initialSnake;
    foodRef.current = firstFood;
    collectedRef.current = [];
    remainingRef.current = shuffled.slice(1);
    directionRef.current = "RIGHT";
    isPlayingRef.current = true;

    setSnake(initialSnake);
    setFood(firstFood);
    setCollectedSkills([]);
    setIsPlaying(true);
    setIsGameOver(false);
    setAllCollected(false);
    setSpeed(INITIAL_SPEED);
  }, []);

  // Game loop using refs for clean state access
  useEffect(() => {
    if (!isPlaying) return;

    let currentSpeed = speed;

    const tick = () => {
      if (!isPlayingRef.current) return;

      const prevSnake = snakeRef.current;
      const head = { ...prevSnake[0] };
      const dir = directionRef.current;

      if (dir === "UP") head.y -= 1;
      if (dir === "DOWN") head.y += 1;
      if (dir === "LEFT") head.x -= 1;
      if (dir === "RIGHT") head.x += 1;

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        stopGame();
        setIsGameOver(true);
        const count = collectedRef.current.length;
        setHighScore((prev) => {
          if (count > prev) {
            localStorage.setItem("nhn-snake-highscore", count.toString());
            return count;
          }
          return prev;
        });
        return;
      }

      // Self collision
      if (prevSnake.some((s) => s.x === head.x && s.y === head.y)) {
        stopGame();
        setIsGameOver(true);
        const count = collectedRef.current.length;
        setHighScore((prev) => {
          if (count > prev) {
            localStorage.setItem("nhn-snake-highscore", count.toString());
            return count;
          }
          return prev;
        });
        return;
      }

      const newSnake = [head, ...prevSnake];
      let ate = false;

      // Check food collision
      const currentFood = foodRef.current;
      if (currentFood && head.x === currentFood.position.x && head.y === currentFood.position.y) {
        ate = true;
        // Add to collected
        collectedRef.current = [...collectedRef.current, currentFood.name];
        setCollectedSkills([...collectedRef.current]);

        // Check if all collected
        if (collectedRef.current.length >= ALL_SKILLS.length) {
          snakeRef.current = newSnake;
          setSnake(newSnake);
          foodRef.current = null;
          setFood(null);
          stopGame();
          setAllCollected(true);
          return;
        }

        // Spawn next food
        if (remainingRef.current.length > 0) {
          const nextSkill = remainingRef.current[0];
          remainingRef.current = remainingRef.current.slice(1);
          const nextPos = spawnFoodPosition(newSnake);
          const nextFood: Food = { position: nextPos, name: nextSkill };
          foodRef.current = nextFood;
          setFood(nextFood);
        } else {
          foodRef.current = null;
          setFood(null);
        }

        // Speed up slightly
        currentSpeed = Math.max(120, currentSpeed - 5);
        setSpeed(currentSpeed);
      }

      // Update snake
      if (!ate) {
        newSnake.pop();
      }
      snakeRef.current = newSnake;
      setSnake(newSnake);
    };

    gameLoopRef.current = setInterval(tick, currentSpeed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [isPlaying, speed, stopGame]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlayingRef.current) return;
      const dir = directionRef.current;
      if ((e.key === "ArrowUp" || e.key === "w") && dir !== "DOWN") {
        directionRef.current = "UP";
      }
      if ((e.key === "ArrowDown" || e.key === "s") && dir !== "UP") {
        directionRef.current = "DOWN";
      }
      if ((e.key === "ArrowLeft" || e.key === "a") && dir !== "RIGHT") {
        directionRef.current = "LEFT";
      }
      if ((e.key === "ArrowRight" || e.key === "d") && dir !== "LEFT") {
        directionRef.current = "RIGHT";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch controls — direction based on tap position relative to snake head
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isPlayingRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const tapX = touch.clientX - rect.left;
    const tapY = touch.clientY - rect.top;

    // Snake head position in pixels
    const headX = snakeRef.current[0].x * CELL_SIZE + CELL_SIZE / 2;
    const headY = snakeRef.current[0].y * CELL_SIZE + CELL_SIZE / 2;

    const dx = tapX - headX;
    const dy = tapY - headY;
    const dir = directionRef.current;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && dir !== "LEFT") directionRef.current = "RIGHT";
      else if (dx < 0 && dir !== "RIGHT") directionRef.current = "LEFT";
    } else {
      if (dy > 0 && dir !== "UP") directionRef.current = "DOWN";
      else if (dy < 0 && dir !== "DOWN") directionRef.current = "UP";
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
              <p className="text-sm text-light-400">Controls: Arrow keys or WASD. Tap on mobile.</p>
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
                className="relative border-2 border-dark-700 rounded-lg overflow-hidden bg-dark-900 touch-none"
                style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
                onTouchStart={handleTouchStart}
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
                    className="absolute bg-yellow-400 rounded-full"
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
                {collectedSkills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
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
