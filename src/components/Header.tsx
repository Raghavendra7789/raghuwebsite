import { Palette } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-900 transition-colors">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
              Theme Toggle
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
              Tailwind CSS light & dark mode
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            id="theme-status-badge"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                theme === 'dark' ? 'bg-indigo-400' : 'bg-amber-500'
              }`}
            />
            {theme === 'dark' ? 'Dark active' : 'Light active'}
          </span>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
