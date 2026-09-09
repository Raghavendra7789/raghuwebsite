import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { ThemeShowcase } from './components/ThemeShowcase';

export default function App() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div
      id="app-root"
      className="min-h-screen flex flex-col transition-colors duration-200 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900"
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className="flex-1">
        <ThemeShowcase
          theme={theme}
          onToggleTheme={toggleTheme}
          onSetTheme={setTheme}
        />
      </div>

      <footer
        id="app-footer"
        className="w-full border-t border-neutral-200 dark:border-neutral-800/80 py-6 text-center text-xs text-neutral-500 dark:text-neutral-400 transition-colors"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>Theme Toggle Layout &bull; Styled with Tailwind CSS classes</p>
          <p className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
            Current mode: <span className="font-semibold text-neutral-700 dark:text-neutral-300 capitalize">{theme}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
