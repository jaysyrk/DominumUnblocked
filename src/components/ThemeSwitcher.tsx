import { Palette } from 'lucide-react';
import { THEMES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    const saved = localStorage.getItem('dominum-theme') || 'default';
    applyTheme(saved);
  }, []);

  const applyTheme = (name: string) => {
    const theme = THEMES[name];
    if (!theme) return;
    
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      if (key === 'name') return;
      // Convert camelCase to kebab-case for CSS variables
      const cssVar = `--${key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`;
      root.style.setProperty(cssVar, value);
    });
    
    setCurrentTheme(name);
    localStorage.setItem('dominum-theme', name);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 flex w-40 flex-col gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-2 shadow-2xl"
          >
            {Object.keys(THEMES).map((name) => (
              <button
                key={name}
                onClick={() => {
                  applyTheme(name);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  currentTheme === name
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text)] hover:bg-[var(--surface)]'
                }`}
              >
                {THEMES[name].name}
                <div 
                  className="h-3 w-3 rounded-full border border-white/20" 
                  style={{ backgroundColor: THEMES[name].accent }}
                />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/40 transition-transform"
      >
        <Palette size={24} />
      </motion.button>
    </div>
  );
}
