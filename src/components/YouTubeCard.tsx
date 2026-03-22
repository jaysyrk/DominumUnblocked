import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export interface YouTubeVideo {
  videoId: string;
  title: string;
  channelTitle?: string;
  viewCount?: string;
}

interface YouTubeCardProps {
  video: YouTubeVideo;
  onClick: (video: YouTubeVideo) => void;
}

export function YouTubeCard({ video, onClick }: YouTubeCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/50 cursor-pointer h-full transition-all hover:border-[var(--accent)]/50"
      onClick={() => onClick(video)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">
        <motion.img
          src={thumbnailUrl}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* YouTube Badge */}
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          YOUTUBE
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <motion.div
            className="rounded-full bg-red-600 p-4 text-white shadow-2xl shadow-red-600/50 hover:bg-red-700"
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
        <h3 className="truncate text-sm font-bold text-[var(--text)] group-hover:text-red-500 transition-colors duration-200 line-clamp-2">
          {video.title}
        </h3>
        {video.channelTitle && (
          <p className="text-xs text-[var(--text)]/60 mt-1 truncate">
            {video.channelTitle}
          </p>
        )}
        {video.viewCount && (
          <p className="text-xs text-[var(--text)]/50 mt-0.5">
            {video.viewCount} views
          </p>
        )}
      </motion.div>

      {/* Hover Glow Effect (Red instead of purple) */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
           style={{
             boxShadow: 'inset 0 0 20px rgba(239, 68, 68, 0.1)',
             background: 'radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)'
           }}>
      </div>
    </motion.div>
  );
}
