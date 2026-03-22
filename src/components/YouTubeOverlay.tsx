import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { YouTubeVideo } from './YouTubeCard';

interface YouTubeOverlayProps {
  video: YouTubeVideo | null;
  onClose: () => void;
}

export function YouTubeOverlay({ video, onClose }: YouTubeOverlayProps) {
  const handleFullscreen = () => {
    const iframe = document.getElementById('youtube-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.requestFullscreen().catch(console.error);
    }
  };

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-black"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                YOUTUBE
              </div>
              <h2 className="text-lg font-bold text-white truncate">{video.title}</h2>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
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

          {/* Video Container */}
          <div className="relative flex-1 bg-black">
            <iframe
              id="youtube-iframe"
              src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
              className="h-full w-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              title={video.title}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
