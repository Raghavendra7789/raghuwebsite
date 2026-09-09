import { useState, useEffect } from 'react';
import { Sun, Moon, Check, Copy, Sparkles, Command } from 'lucide-react';
import { Theme } from '../types';

interface ThemeShowcaseProps {
  theme: Theme;
  onToggleTheme: () => void;
  onSetTheme: (theme: Theme) => void;
}

export function ThemeShowcase({ theme, onToggleTheme, onSetTheme }: ThemeShowcaseProps) {
  const [copied, setCopied] = useState(false);
  const [sampleInput, setSampleInput] = useState('');
  const isDark = theme === 'dark';

  const codeSnippet = `<div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
  <button className="bg-white border-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100">
    Toggle Mode
  </button>
</div>`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  // Keyboard shortcut listener: press 'T' to toggle theme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        onToggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleTheme]);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Hero / Mode Status Section */}
      <section
        id="theme-hero-section"
        className="rounded-2xl p-6 sm:p-8 transition-colors duration-200 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              <Sparkles className="w-3.5 h-3.5" />
              Tailwind Dark Mode
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {isDark ? 'Dark Mode Active' : 'Light Mode Active'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              This layout automatically responds to class-level toggles using Tailwind&apos;s{' '}
              <code className="px-1.5 py-0.5 rounded-md font-mono text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                dark:
              </code>{' '}
              variant modifiers and synced state persistence.
            </p>
          </div>

          {/* Segmented Control */}
          <div
            id="theme-segmented-control"
            className="inline-flex p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/70 self-start sm:self-center"
          >
            <button
              id="theme-select-light"
              type="button"
              onClick={() => onSetTheme('light')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                !isDark
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light</span>
            </button>
            <button
              id="theme-select-dark"
              type="button"
              onClick={() => onSetTheme('dark')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 text-white dark:bg-neutral-700 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              <Moon className="w-4 h-4 text-amber-400" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Interactive Controls Showcase */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
              Interactive Component Tokens
            </h3>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="sample-input"
                  className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Text Field (Test dark-mode input)
                </label>
                <input
                  id="sample-input"
                  type="text"
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                  placeholder="Type something to see focus styles..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg border transition-colors
                    bg-neutral-50 dark:bg-neutral-800/60
                    border-neutral-300 dark:border-neutral-700
                    text-neutral-900 dark:text-neutral-100
                    placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                    focus:outline-hidden focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  id="demo-primary-btn"
                  type="button"
                  onClick={onToggleTheme}
                  className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg cursor-pointer transition-colors duration-150
                    bg-neutral-900 hover:bg-neutral-800 text-white
                    dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900"
                >
                  Toggle Theme Now
                </button>

                <button
                  id="demo-secondary-btn"
                  type="button"
                  className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg cursor-pointer transition-colors duration-150
                    border border-neutral-300 dark:border-neutral-700
                    bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800
                    text-neutral-800 dark:text-neutral-200"
                >
                  Secondary Action
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
                <Command className="w-3.5 h-3.5" />
                <span>Tip: Press the <kbd className="px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 font-mono text-neutral-700 dark:text-neutral-300">T</kbd> key anywhere to toggle theme</span>
              </div>
            </div>
          </div>

          {/* Contrast & Surface Palette */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
              Active Surface & Text Hierarchy
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    Primary Surface
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {isDark ? 'dark:bg-neutral-900' : 'bg-white'}
                  </div>
                </div>
                <span className="w-6 h-6 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900" />
              </div>

              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    Page Canvas
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {isDark ? 'dark:bg-neutral-950' : 'bg-neutral-50'}
                  </div>
                </div>
                <span className="w-6 h-6 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950" />
              </div>

              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    Border Divider
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {isDark ? 'dark:border-neutral-800' : 'border-neutral-200'}
                  </div>
                </div>
                <span className="w-6 h-6 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Snippet Card */}
      <section
        id="tailwind-syntax-card"
        className="rounded-2xl p-6 transition-colors duration-200 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Tailwind Class Pattern
          </h3>
          <button
            id="copy-code-button"
            type="button"
            onClick={copyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors
              border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800
              text-neutral-700 dark:text-neutral-300"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 rounded-xl overflow-x-auto text-xs font-mono border border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {codeSnippet}
        </pre>
      </section>
    </main>
  );
}
