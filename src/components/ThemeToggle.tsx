import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  showLabel?: boolean;
}

export function ThemeToggle({ theme, onToggle, showLabel = true }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle-button"
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current mode: ${isDark ? 'Dark' : 'Light'}. Click to toggle.`}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer select-none
        border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-100/80 text-neutral-800 shadow-xs
        dark:border-neutral-800 dark:hover:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800/90 dark:text-neutral-100
        focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 active:scale-95"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="dark"
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-amber-400 flex items-center justify-center"
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-amber-500 flex items-center justify-center"
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="whitespace-nowrap font-medium text-neutral-700 dark:text-neutral-200">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}
