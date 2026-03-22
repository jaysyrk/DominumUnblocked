import React, { useState, useEffect } from "react";
import { Search, Gamepad2, Loader2, AlertCircle, Sparkles, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { useGames } from './hooks/useGames';
import { useYouTubeVideos } from './hooks/useYouTubeVideos';
import { GameCard } from './components/GameCard';
import { GameOverlay } from './components/GameOverlay';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { YouTubeCard, YouTubeVideo } from './components/YouTubeCard';
import { YouTubeOverlay } from './components/YouTubeOverlay';
import { Game } from './types';

export default function App() {
  // State for showing the back-to-top button
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { games, loading, error, searchQuery, setSearchQuery } = useGames();
  const [ytQuery, setYTQuery] = useState('');
  const { videos, loading: videosLoading, error: videosError } = useYouTubeVideos(ytQuery);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 left-8 z-50 bg-[var(--accent)] text-white rounded-full shadow-lg p-3 hover:bg-blue-700 transition-all flex items-center justify-center"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      )}


  return (
    <div className="bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-white overflow-x-hidden">


      {/* Tall test div for scrollbar debug - REMOVE after testing */}
      <div style={{height: '2000px', background: 'transparent'}}></div>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-32 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation / Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/95 to-[var(--bg)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">

          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <motion.div 
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-blue-600 text-white shadow-lg shadow-[var(--accent)]/30"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring" }}
            >
              <Gamepad2 size={26} />
            </motion.div>
            <h1 className="text-2xl font-black tracking-tighter sm:text-3xl bg-gradient-to-r from-[var(--text)] to-[var(--accent)] bg-clip-text text-transparent">
              DOMINUM<span className="text-[var(--accent)]">UNBLOCKED</span>
            </h1>
          </motion.div>

          {/* Movies Page Link */}
          <nav className="mt-4 sm:mt-0 flex gap-4">
            <a
              href="/movies"
              className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-[var(--accent)] px-4 py-2 text-white font-semibold shadow hover:from-blue-700 hover:to-[var(--accent)]/80 transition-all text-sm"
            >
              🎬 Movies
            </a>
          </nav>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]/40" size={18} />
            <input
              id="games-search"
              name="games-search"
              type="text"
              placeholder="Search 500+ games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)]/50 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 backdrop-blur-sm hover:border-[var(--accent)]/50"
            />
          </div>
        </div>
      </header>




      {/* Link to YouTube Search Section at Bottom */}
      <div className="w-full flex flex-col items-center justify-center pt-8 pb-4 bg-black/60 border-b border-[var(--border)] shadow-lg z-10">
        <a
          href="#youtube-search-bottom"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-white font-bold shadow hover:bg-red-700 transition-all text-base"
          style={{ boxShadow: '0 2px 16px 0 rgba(239,68,68,0.15)' }}
        >
          <Youtube size={20} />
          Go to YouTube Search
        </a>
      </div>

      {/* Hero Banner */}
      {!searchQuery && !loading && (
        <motion.div 
          className="bg-gradient-to-r from-[var(--accent)]/20 via-blue-600/10 to-purple-600/20 border-b border-[var(--border)] py-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-7xl px-4 text-center">
            <motion.div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={20} className="text-[var(--accent)]" />
              <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-widest">Get Started</span>
              <Sparkles size={20} className="text-[var(--accent)]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-white via-[var(--accent)] to-blue-400 bg-clip-text text-transparent">
              Play 500+ Games Instantly
            </h2>
            <p className="text-[var(--text)]/70 max-w-2xl mx-auto">
              Dive into an unlimited library of unblocked games. No downloads, no restrictions—just pure gaming fun.
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12">
        {loading ? (
          <div className="flex h-[60vh] flex-col items-center justify-center gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="text-[var(--accent)]" size={56} />
            </motion.div>
            <div className="text-center">
              <p className="text-lg font-semibold text-[var(--text)]">Loading your game library...</p>
              <p className="text-sm text-[var(--text)]/50 mt-2">Finding the best games for you</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-[60vh] flex-col items-center justify-center gap-6 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertCircle className="text-red-500 mx-auto" size={56} />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Failed to load games</h2>
              <p className="text-[var(--text)]/60 mb-4">{error}</p>
            </div>
            <motion.button 
              onClick={() => window.location.reload()}
              className="rounded-lg bg-gradient-to-r from-[var(--accent)] to-blue-600 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-[var(--accent)]/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        ) : (
          <>
            <motion.div 
              className="mb-8 flex items-center justify-between border-b border-[var(--border)] pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-2xl font-black mb-1">
                  {searchQuery ? `Results for "${searchQuery}"` : "Featured Games"}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent rounded"></div>
                  <span className="text-sm font-medium text-[var(--text)]/60">
                    {games.length} {games.length === 1 ? 'game' : 'games'} available
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              layout
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
              {/* Game Cards */}
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
              <motion.div 
                className="flex h-[40vh] flex-col items-center justify-center gap-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Gamepad2 className="text-[var(--accent)]/30 mx-auto" size={64} />
                </motion.div>
                <div>
                  <p className="text-xl font-semibold">No games found</p>
                  <p className="text-sm text-[var(--text)]/50 mt-1">Try searching for something else</p>
                </div>
              </motion.div>
            )}

            {/* YouTube Search Section - More Noticeable */}
            <div className="mt-16">
              <div id="youtube-search-bottom" className="mb-8 flex flex-col items-center justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <Youtube size={32} className="text-red-600" />
                  <h2 className="text-3xl font-black text-red-600 tracking-tight">YouTube Search</h2>
                </div>
                <div className="w-full max-w-lg flex flex-col items-center">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500/40" size={20} />
                    <input
                      id="youtube-search"
                      name="youtube-search"
                      type="text"
                      placeholder="Search YouTube videos..."
                      value={ytQuery}
                      onChange={(e) => setYTQuery(e.target.value)}
                      className="w-full rounded-xl border-2 border-red-500 bg-white/90 py-4 pl-12 pr-4 text-base text-black font-semibold shadow-lg outline-none transition-all focus:border-red-600 focus:ring-2 focus:ring-red-500/20 hover:border-red-600"
                      style={{ boxShadow: '0 2px 16px 0 rgba(239,68,68,0.10)' }}
                    />
                  </div>
                  <a
                    href="/youtube"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-white font-bold shadow hover:bg-red-700 transition-all text-base"
                    style={{ boxShadow: '0 2px 16px 0 rgba(239,68,68,0.15)' }}
                  >
                    <Youtube size={20} />
                    Open Full YouTube
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-transparent rounded"></div>
                  <span className="text-sm font-medium text-[var(--text)]/60">
                    {videosLoading ? 'Loading videos...' : `${videos.length} ${videos.length === 1 ? 'video' : 'videos'} ready to watch`}
                  </span>
                </div>
              </div>
              {videosError ? (
                <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {videosError}
                </div>
              ) : videosLoading ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="text-red-500 animate-spin" size={40} />
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                >
                  {videos.map((video) => (
                    <motion.div
                      key={video.videoId}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -5 }}
                    >
                      <YouTubeCard video={video} onClick={setSelectedVideo} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {!videosLoading && !videosError && videos.length === 0 && (
                <motion.div
                  className="flex h-[25vh] flex-col items-center justify-center gap-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl font-semibold">No videos found</p>
                  <p className="text-sm text-[var(--text)]/50 mt-1">Try another search to load different gameplay videos</p>
                </motion.div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-16 text-center bg-gradient-to-b from-transparent to-[var(--bg)]/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[var(--text)]/50 mb-4">
            © 2026 Dominum Unblocked. All games are property of their respective owners.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-[var(--text)]/40">
            <div className="w-1 h-1 rounded-full bg-[var(--accent)]/50"></div>
            <span>Built with passion for gamers</span>
            <div className="w-1 h-1 rounded-full bg-[var(--accent)]/50"></div>
          </div>
        </motion.div>
      </footer>

      {/* Overlays */}
      <GameOverlay 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
      <YouTubeOverlay
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
      <ThemeSwitcher />
    </div>
  );
}
