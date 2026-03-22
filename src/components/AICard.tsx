import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface AICardProps {
  onClick: () => void;
}

export function AICard({ onClick }: AICardProps) {
  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-purple-600/20 via-[var(--card-bg)] to-blue-600/10 cursor-pointer h-full transition-all hover:border-[var(--accent)]/50"
      onClick={onClick}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient Background */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--accent)]/30 to-blue-600/20 flex items-center justify-center">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
             style={{
               background: 'radial-gradient(circle at 50% 50%, rgba(122, 92, 255, 0.2) 0%, transparent 70%)',
             }}>
        </div>
        
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative z-10"
        >
          <Sparkles className="text-[var(--accent)]" size={64} />
        </motion.div>

        {/* Pulsing Circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/30 opacity-0 group-hover:opacity-100"
        ></motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-end">
        <h3 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
          AI Assistant
        </h3>
        <p className="text-xs text-[var(--text)]/50 mt-1">
          Chat with AI
        </p>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
           style={{
             boxShadow: 'inset 0 0 20px rgba(122, 92, 255, 0.1)',
             background: 'radial-gradient(circle at 30% 30%, rgba(122, 92, 255, 0.1) 0%, transparent 50%)'
           }}>
      </div>
    </motion.div>
  );
}
