import { useEffect, useState } from 'react';
import { X, Terminal, Check, Copy, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project.sampleCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-white/15 bg-[#090d18] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#0c1222] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-sm border border-cyan-500/40">
                {project.number}
              </span>
              <span className="text-xs font-mono text-neutral-400">Deep-Dive &amp; Lab Code</span>
            </div>
            <h3 id="modal-project-title" className="text-xl sm:text-2xl font-heading font-bold text-white">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono">{project.tagline}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-neutral-300">
          {/* Description & Tech Tags */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
              PROJECT OVERVIEW
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-200">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Outcomes */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
              PRACTICAL LEARNING OUTCOMES
            </h4>
            <div className="space-y-2">
              {project.keyOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-white/5 bg-white/5 text-xs sm:text-sm text-neutral-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Code Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Sample Implementation ({project.codeLanguage})</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-xs text-neutral-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl border border-white/10 bg-[#050811] text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed max-h-56">
              {project.sampleCode}
            </pre>
          </div>

          {/* Verification Terminal Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="text-neutral-400">Terminal Verification Trace</span>
              <span className="text-emerald-400">● 100% Passed</span>
            </div>
            <pre className="p-3.5 rounded-xl border border-white/10 bg-[#04060c] text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {project.terminalOutput}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0c1222] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic &amp; Self-Directed Programming Project</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors font-sans text-xs font-medium cursor-pointer"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={() => onClose()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-sans text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Discuss Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
