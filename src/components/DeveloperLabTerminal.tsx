import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Check, Copy, Terminal as TerminalIcon, Sparkles, Cpu, Activity, RefreshCw, Brain } from 'lucide-react';
import { CODE_LAB_SNIPPETS } from '../data/portfolioData';
import { CodeLabSnippet } from '../types';
import { NeuralPlayground } from './NeuralPlayground';
import { soundFx } from '../utils/soundEffects';

export function DeveloperLabTerminal() {
  const [labMode, setLabMode] = useState<'snippets' | 'perceptron'>('snippets');
  const [activeTabId, setActiveTabId] = useState<'learning' | 'building' | 'solving' | 'debugging'>('learning');
  const [isRunning, setIsRunning] = useState(false);
  const [runLogs, setRunLogs] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeSnippet: CodeLabSnippet =
    CODE_LAB_SNIPPETS.find((s) => s.id === activeTabId) || CODE_LAB_SNIPPETS[0];

  const handleRun = () => {
    soundFx.playClick();
    setIsRunning(true);
    setRunLogs(null);
    setTimeout(() => {
      setIsRunning(false);
      setRunLogs(activeSnippet.output);
      soundFx.playSuccess();
    }, 450);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      soundFx.playClick();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background Soft Glow Orbs */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Labels surrounding the terminal: PYTHON, AI, DATA, C */}
      <motion.div
        animate={{ y: [-4, 6, -4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 right-6 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/40 bg-[#09121f]/90 text-cyan-300 font-mono text-xs font-bold shadow-lg shadow-cyan-500/20 backdrop-blur-md cursor-default hover:border-cyan-400"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>PYTHON</span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -5, 6] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -top-4 left-4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/40 bg-[#120e24]/90 text-violet-300 font-mono text-xs font-bold shadow-lg shadow-violet-500/20 backdrop-blur-md cursor-default hover:border-violet-400"
      >
        <Sparkles className="w-3 h-3 text-violet-400" />
        <span>AI</span>
      </motion.div>

      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-4 right-10 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-[#071612]/90 text-emerald-300 font-mono text-xs font-bold shadow-lg shadow-emerald-500/20 backdrop-blur-md cursor-default hover:border-emerald-400"
      >
        <Activity className="w-3 h-3 text-emerald-400" />
        <span>DATA</span>
      </motion.div>

      <motion.div
        animate={{ y: [5, -6, 5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-4 left-8 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/40 bg-[#161208]/90 text-amber-300 font-mono text-xs font-bold shadow-lg shadow-amber-500/20 backdrop-blur-md cursor-default hover:border-amber-400"
      >
        <Cpu className="w-3 h-3 text-amber-400" />
        <span>C</span>
      </motion.div>

      {/* Main Futuristic Developer Lab Panel */}
      <div
        id="developer-lab-panel"
        className="relative rounded-2xl border border-white/10 bg-[#080c16]/90 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden transition-all duration-300 hover:border-cyan-500/30 group"
      >
        {/* Terminal Titlebar */}
        <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
            </div>
            <span className="ml-2 font-mono text-xs text-neutral-400 hidden sm:inline-flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>ai-developer-workspace</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-300">{activeSnippet.fileName}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-neutral-800/80 text-neutral-400 border border-white/5 hidden xs:inline-block">
              latency: {activeSnippet.executionTime}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              title="Copy snippet"
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Lab Mode Selector: Code Snippets vs Interactive Neural Sandbox */}
        <div className="px-4 py-2 bg-[#04070e] border-b border-white/10 flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>AI DEV LAB WORKSPACE</span>
          </span>

          <div className="flex items-center gap-1 p-0.5 rounded-lg border border-white/10 bg-[#090e1b]">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setLabMode('snippets');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                labMode === 'snippets'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Code Snippets
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setLabMode('perceptron');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                labMode === 'perceptron'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Brain className="w-3 h-3 text-violet-400" />
              <span>Perceptron Sandbox</span>
            </button>
          </div>
        </div>

        {labMode === 'perceptron' ? (
          <div className="p-2 sm:p-3 bg-[#050811]">
            <NeuralPlayground />
          </div>
        ) : (
          <>
            {/* Snippet Tabs: learning(), building(), solving(), debugging() */}
            <div className="flex items-center overflow-x-auto border-b border-white/10 bg-[#050811] px-2 pt-2 scrollbar-none">
              {CODE_LAB_SNIPPETS.map((snippet) => {
                const isActive = snippet.id === activeTabId;
                return (
                  <button
                    key={snippet.id}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTabId(snippet.id);
                      setRunLogs(null);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-lg font-mono text-xs font-medium transition-all whitespace-nowrap border-t border-x cursor-pointer ${
                      isActive
                        ? 'bg-[#090e1b] text-cyan-300 border-white/15 border-b-transparent shadow-xs'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-cyan-400 shadow-xs shadow-cyan-400' : 'bg-neutral-600'
                      }`}
                    />
                    <span>{snippet.label}</span>
                  </button>
                );
              })}
            </div>

        {/* Tab Description Context */}
        <div className="px-4 py-2 bg-[#090e1b]/70 border-b border-white/5 flex items-center justify-between text-xs text-neutral-400">
          <p className="truncate font-sans text-neutral-400 text-[11px] sm:text-xs">
            {activeSnippet.description}
          </p>
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-black font-semibold text-xs transition-all shadow-xs shadow-cyan-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin text-black" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-black text-black" />
                <span>Run Snippet</span>
              </>
            )}
          </button>
        </div>

        {/* Code View Area */}
        <div className="p-4 bg-[#070b14] overflow-x-auto max-h-72 sm:max-h-80">
          <pre className="font-mono text-xs text-neutral-200 leading-relaxed">
            {activeSnippet.code.split('\n').map((line, i) => (
              <div key={i} className="table-row group/line hover:bg-white/5">
                <span className="table-cell pr-4 select-none text-neutral-600 text-right w-6 font-mono text-[11px]">
                  {i + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {/* Subtle code highlighting simulation */}
                  {line.includes('def ') || line.includes('class ') || line.includes('int ') ? (
                    <span className="text-violet-300">{line}</span>
                  ) : line.includes('import ') || line.includes('#include') ? (
                    <span className="text-cyan-300">{line}</span>
                  ) : line.includes('return ') || line.includes('for ') || line.includes('while ') ? (
                    <span className="text-amber-300">{line}</span>
                  ) : line.includes('print') || line.includes('printf') ? (
                    <span className="text-emerald-300">{line}</span>
                  ) : line.startsWith('#') || line.startsWith('//') || line.startsWith('/*') ? (
                    <span className="text-neutral-500 italic">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>

        {/* Interactive Console / Execution Output Area */}
        <AnimatePresence>
          {(runLogs || isRunning) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-cyan-500/20 bg-[#04060c] p-3 text-xs font-mono"
            >
              <div className="flex items-center justify-between pb-1 text-[10px] text-neutral-500 border-b border-white/5">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <TerminalIcon className="w-3 h-3" />
                  <span>SIMULATED TERMINAL OUTPUT</span>
                </span>
                <span className="text-emerald-400">● EXIT CODE 0</span>
              </div>
              <pre className="mt-2 text-[11px] leading-relaxed text-neutral-300 whitespace-pre-wrap">
                {isRunning ? (
                  <span className="text-cyan-400 animate-pulse">&gt; Executing {activeSnippet.fileName}...</span>
                ) : (
                  runLogs
                )}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
        </>
        )}

        {/* Terminal Footer Status Bar */}
        <div className="px-4 py-2 border-t border-white/10 bg-[#060912] flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300">LAB STATUS: ACTIVE</span>
            </span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline text-neutral-400">Memory: 24MB</span>
          </div>
          <span className="text-cyan-400/90 hover:text-cyan-300 transition-colors">
            Raghavendra Dev Workspace
          </span>
        </div>
      </div>
    </div>
  );
}
