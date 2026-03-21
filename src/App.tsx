import { useState } from 'react';
import { Search, Gamepad2, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useGames } from './hooks/useGames';
import { GameCard } from './components/GameCard';
import { GameOverlay } from './components/GameOverlay';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Game } from './types';

export default function App() {
  const { games, loading, error, searchQuery, setSearchQuery } = useGames();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-white">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20">
              <Gamepad2 size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tighter sm:text-2xl">
              DOMINUM<span className="text-[var(--accent)]">UNBLOCKED</span>
            </h1>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]/40" size={18} />
            <input
              type="text"
              placeholder="Search 500+ games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {loading ? (
          <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-[var(--accent)]" size={48} />
            <p className="text-sm font-medium text-[var(--text)]/60">Loading game library...</p>
          </div>
        ) : error ? (
          <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
            <AlertCircle className="text-red-500" size={48} />
            <div>
              <h2 className="text-xl font-bold">Failed to load games</h2>
              <p className="text-[var(--text)]/60">{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[var(--accent)] px-6 py-2 font-semibold text-white transition-transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {searchQuery ? `Results for "${searchQuery}"` : "Popular Games"}
                <span className="ml-2 text-sm font-normal text-[var(--text)]/40">
                  ({games.length})
                </span>
              </h2>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                >
                  <GameCard 
                    game={game} 
                    onClick={setSelectedGame} 
                  />
                </motion.div>
              ))}
            </motion.div>

            {games.length === 0 && (
              <div className="flex h-[40vh] flex-col items-center justify-center gap-2 text-center">
                <p className="text-lg font-medium">No games found</p>
                <p className="text-sm text-[var(--text)]/40">Try searching for something else</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12 text-center">
        <p className="text-sm text-[var(--text)]/40">
          © 2026 Dominum Unblocked. All games are property of their respective owners.
        </p>
      </footer>

      {/* Overlays */}
      <GameOverlay 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
      <ThemeSwitcher />
    </div>
  );
}
