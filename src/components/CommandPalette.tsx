import { useState, useEffect, useRef, type FormEvent } from 'react';
import { Terminal, X, ArrowRight, CornerDownLeft, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_LIST, PROJECTS_LIST } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

interface CommandOutput {
  id: string;
  type: 'command' | 'response' | 'error' | 'system';
  content: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  soundEnabled,
  onToggleSound,
}: CommandPaletteProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      type: 'system',
      content: `Raghavendra P V N Workspace Shell v2.4 (x86_64-ai-developer)
Type 'help' for available commands or tap any suggestion chip below.`,
    },
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 80);
      soundFx.playClick();
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim().toLowerCase();
    if (!raw) return;

    soundFx.playClick();

    const newOutputs: CommandOutput[] = [
      ...history,
      { id: String(Date.now()), type: 'command', content: `$ ${cmdStr}` },
    ];

    if (raw === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (raw === 'help') {
      newOutputs.push({
        id: String(Date.now() + 1),
        type: 'response',
        content: `Available Commands:
  • whoami       : Candidate summary & academic profile
  • skills       : Core programming & AI/ML competencies
  • projects     : Inspect top 3 projects & technologies
  • contact      : Direct email, LinkedIn & GitHub links
  • goto <sec>   : Navigate to [about, skills, projects, interests, direction, contact]
  • sound        : Toggle interactive workstation audio
  • matrix       : Fun developer easter egg
  • clear        : Clear console logs
  • exit         : Close command palette`,
      });
    } else if (raw === 'whoami') {
      newOutputs.push({
        id: String(Date.now() + 1),
        type: 'response',
        content: `Candidate: ${PERSONAL_INFO.fullName}
Degree   : ${PERSONAL_INFO.degree}
College  : ${PERSONAL_INFO.institution} (Batch ${PERSONAL_INFO.batch})
Tagline  : "${PERSONAL_INFO.tagline}"
Status   : ${PERSONAL_INFO.statusBadge}`,
      });
    } else if (raw === 'skills') {
      const skillsStr = SKILLS_LIST.map((s) => `  [${s.category.toUpperCase()}] ${s.name} - ${s.subtitle}`).join('\n');
      newOutputs.push({
        id: String(Date.now() + 1),
        type: 'response',
        content: `Mastered & Active Skills:\n${skillsStr}`,
      });
    } else if (raw === 'projects') {
      const projStr = PROJECTS_LIST.map((p) => `  • ${p.number}: ${p.title} (${p.technologies.join(', ')})`).join('\n');
      newOutputs.push({
        id: String(Date.now() + 1),
        type: 'response',
        content: `Project Portfolios:\n${projStr}`,
      });
    } else if (raw.startsWith('goto ')) {
      const target = raw.replace('goto ', '').trim();
      const valid = ['home', 'about', 'skills', 'projects', 'interests', 'direction', 'contact'];
      if (valid.includes(target)) {
        newOutputs.push({
          id: String(Date.now() + 1),
          type: 'response',
          content: `Navigating to #${target}...`,
        });
        setTimeout(() => {
          onNavigate(target);
          onClose();
        }, 300);
      } else {
        newOutputs.push({
          id: String(Date.now() + 1),
          type: 'error',
          content: `Unknown section '${target}'. Valid targets: ${valid.join(', ')}`,
        });
      }
    } else if (raw === 'contact' || raw === 'email') {
      newOutputs.push({
        id: String(Date.now() + 1),
        type: 'response',
        content: `Direct Email : ${PERSONAL_INFO.email}
GitHub       : ${PERSONAL_INFO.github}
LinkedIn     : ${PERSONAL_INFO.linkedin}`,
      });
    } else if (raw === 'sound') {
      onToggleSound();
      newOutputs.push({
        id: String(Date.now() + 1),
        type: 'response',
        content: `Audio sound effects ${!soundEnabled ? 'ENABLED ✓' : 'MUTED ✕'}`,
      });
    } else if (raw === 'matrix') {
      newOutputs.push({
        id: String(Date.now() + 1),
        type: 'response',
        content: `01000001 01001001 00100000 00100110 00100000 01000100 01100001 01110100 01100001
[MATRIX DECRYPTED]: "The future belongs to those who understand the mathematics of learning."`,
      });
      soundFx.playSuccess();
    } else if (raw === 'exit' || raw === 'quit') {
      onClose();
      return;
    } else {
      newOutputs.push({
        id: String(Date.now() + 1),
        type: 'error',
        content: `Command not found: '${cmdStr}'. Type 'help' for command manual.`,
      });
    }

    setHistory(newOutputs);
    setInputVal('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const quickChips = ['whoami', 'skills', 'projects', 'goto projects', 'contact', 'matrix'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-[#080d19] shadow-2xl shadow-cyan-950/50 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-4 py-3 bg-[#0c1326] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="ml-2 font-mono text-xs text-neutral-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>terminal@raghavendra-workspace:~</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute audio' : 'Enable audio'}
              className="p-1 rounded-md border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Output Terminal */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 font-mono text-xs text-neutral-300 leading-relaxed bg-[#050811]">
          {history.map((item) => (
            <div key={item.id} className="whitespace-pre-wrap">
              {item.type === 'command' && (
                <span className="text-cyan-300 font-semibold">{item.content}</span>
              )}
              {item.type === 'response' && (
                <span className="text-neutral-200">{item.content}</span>
              )}
              {item.type === 'error' && (
                <span className="text-rose-400">{item.content}</span>
              )}
              {item.type === 'system' && (
                <span className="text-neutral-400 italic">{item.content}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-white/10 bg-[#070b16] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
          <span className="text-neutral-500 whitespace-nowrap">Suggested:</span>
          {quickChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleCommand(chip)}
              className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-neutral-300 hover:border-cyan-500/40 hover:text-cyan-300 whitespace-nowrap transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Interactive Prompt Input */}
        <form
          onSubmit={handleSubmit}
          className="p-3 bg-[#0a1020] border-t border-white/10 flex items-center gap-2"
        >
          <span className="text-cyan-400 font-mono text-xs font-bold pl-1">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command (e.g. 'help', 'skills', 'goto projects')..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder:text-neutral-600 focus:outline-hidden"
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded-md bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-mono text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
