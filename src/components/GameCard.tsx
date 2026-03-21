import { motion } from 'motion/react';
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
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] transition-all hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/20 cursor-pointer"
      onClick={() => onClick(game)}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={coverUrl}
          alt={game.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
          {game.name}
        </h3>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="rounded-full bg-[var(--accent)] p-3 text-white shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
      </div>
    </div>
  );
}
