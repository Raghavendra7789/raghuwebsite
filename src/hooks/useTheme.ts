import { useState, useEffect, useCallback } from 'react';
import { Theme } from '../types';

export const THEME_STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('app_theme_mode');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, []);

  // Sync DOM root and save theme to localStorage
  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors in private browsing/sandboxed environments
    }
  }, [theme, applyTheme]);

  // Synchronize across browser tabs and storage events
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (
        (event.key === THEME_STORAGE_KEY || event.key === 'app_theme_mode') &&
        (event.newValue === 'light' || event.newValue === 'dark')
      ) {
        setThemeState(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Listen for external OS preference changes if no saved user preference exists
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('app_theme_mode');
        if (!saved) {
          setThemeState(e.matches ? 'dark' : 'light');
        }
      } catch {
        // ignore
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // ignore
      }
      return nextTheme;
    });
  }, []);

  return { theme, toggleTheme, setTheme };
}
