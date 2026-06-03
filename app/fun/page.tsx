import Link from "next/link";

export default function FunPage() {
  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-light-100 mb-4">
          🎮 Fun Zone
        </h1>
        <p className="text-light-400 text-lg mb-10">
          Take a break and play some mini games!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Easter Egg Hunt */}
          <Link
            href="/fun/easter-eggs"
            className="group bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-accent-400 transition-colors"
          >
            <div className="text-4xl mb-4">🥚</div>
            <h2 className="text-xl font-semibold text-light-100 mb-2 group-hover:text-accent-400 transition-colors">
              Easter Egg Hunt
            </h2>
            <p className="text-light-400 text-sm">
              Find 5 hidden eggs scattered across my portfolio. Can you spot them all?
            </p>
          </Link>

          {/* Tech Stack Match */}
          <Link
            href="/fun/memory-match"
            className="group bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-accent-400 transition-colors"
          >
            <div className="text-4xl mb-4">🃏</div>
            <h2 className="text-xl font-semibold text-light-100 mb-2 group-hover:text-accent-400 transition-colors">
              Tech Stack Match
            </h2>
            <p className="text-light-400 text-sm">
              Flip cards and match pairs of my tech skills. How fast can you clear the board?
            </p>
          </Link>

          {/* Tech Snake */}
          <Link
            href="/fun/tech-snake"
            className="group bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-accent-400 transition-colors"
          >
            <div className="text-4xl mb-4">🐍</div>
            <h2 className="text-xl font-semibold text-light-100 mb-2 group-hover:text-accent-400 transition-colors">
              Tech Snake
            </h2>
            <p className="text-light-400 text-sm">
              Eat all the tech skills to build the ultimate stack. Can you collect them all?
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
