import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Game } from '../types';
import { COVER_BASE_URL, HTML_BASE_URL } from '../constants';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  const coverUrl = game.cover
    .replace('{COVER_URL}', COVER_BASE_URL)
    .replace('{HTML_URL}', HTML_BASE_URL);

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/50 cursor-pointer h-full transition-all hover:border-[var(--accent)]/50"
      onClick={() => onClick(game)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">
        <motion.img
          src={coverUrl}
          alt={game.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <motion.div
            className="rounded-full bg-gradient-to-r from-[var(--accent)] to-blue-600 p-4 text-white shadow-2xl shadow-[var(--accent)]/50"
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Play size={28} fill="currentColor" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 p-3 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="truncate text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 line-clamp-2">
          {game.name}
        </h3>
      </motion.div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
           style={{
             boxShadow: 'inset 0 0 20px rgba(122, 92, 255, 0.1)',
             background: 'radial-gradient(circle at 30% 30%, rgba(122, 92, 255, 0.1) 0%, transparent 50%)'
           }}>
      </div>
    </motion.div>
  );
}

