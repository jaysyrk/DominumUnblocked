import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { Game } from '../types';
import { COVER_BASE_URL, HTML_BASE_URL } from '../constants';
import { useEffect, useState } from 'react';

interface GameOverlayProps {
  game: Game | null;
  onClose: () => void;
}

export function GameOverlay({ game, onClose }: GameOverlayProps) {
  const [iframeUrl, setIframeUrl] = useState<string>('');

  useEffect(() => {
    if (!game) {
      setIframeUrl('');
      return;
    }

    const loadGame = async () => {
      const rawUrl = game.url;
      if (rawUrl.startsWith('http')) {
        setIframeUrl(rawUrl);
      } else {
        const fullUrl = rawUrl
          .replace('{COVER_URL}', COVER_BASE_URL)
          .replace('{HTML_URL}', HTML_BASE_URL);
        
        try {
          const resp = await fetch(fullUrl);
          const html = await resp.text();
          const blob = new Blob([html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          setIframeUrl(url);
        } catch (e) {
          setIframeUrl(fullUrl);
        }
      }
    };

    loadGame();
  }, [game]);

  const handleFullscreen = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.requestFullscreen().catch(console.error);
    }
  };

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-black"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md">
            <h2 className="text-lg font-bold text-white">{game.name}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleFullscreen}
                className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                title="Fullscreen"
              >
                <Maximize2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Game Container */}
          <div className="relative flex-1 bg-[#111]">
            {iframeUrl ? (
              <iframe
                id="game-iframe"
                src={iframeUrl}
                className="h-full w-full border-none"
                allow="autoplay; fullscreen; keyboard"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent"></div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
