import { useState, useEffect } from 'react';
import { X, Briefcase, Mail, Download, Printer, Check, Copy, ExternalLink, GraduationCap, Code, Cpu } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_LIST, PROJECTS_LIST } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

interface RecruiterDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecruiterDossierModal({ isOpen, onClose }: RecruiterDossierModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      soundFx.playChime();
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      soundFx.playSuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-[#0a0f1d] shadow-2xl shadow-black/80 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 text-neutral-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0c1429] via-[#091022] to-[#0c1429] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-white">
                  Recruiter Fast-Track Dossier
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  READY FOR REVIEW
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Executive 1-Page Summary &bull; Raghavendra P V N
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              title="Print / Save as PDF"
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors hidden sm:inline-flex cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Summary Sheet */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Candidate Overview Card */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h4 className="text-lg font-heading font-bold text-white">
                  {PERSONAL_INFO.fullName}
                </h4>
                <p className="text-xs font-mono text-cyan-400">
                  {PERSONAL_INFO.degree} &bull; {PERSONAL_INFO.institution}
                </p>
              </div>
              <div className="text-left sm:text-right font-mono text-xs text-neutral-400">
                <div>Academic Term: <span className="text-white">{PERSONAL_INFO.batch}</span></div>
                <div>Location: <span className="text-white">{PERSONAL_INFO.location}</span></div>
              </div>
            </div>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Raghavendra is a disciplined, analytical undergraduate actively building high-rigor foundations in
              programming (Python, C), algorithmic problem-solving, and applied machine intelligence. Open for summer
              internships, research assistantships, and ambitious software engineering collaborations.
            </p>
          </div>

          {/* Quick Technical Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/10 bg-[#060912] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold">
                <Code className="w-3.5 h-3.5" />
                <span>PRIMARY LANGUAGES</span>
              </div>
              <p className="text-neutral-300 text-xs font-mono">
                Python, C, Modular Scripting, Algorithmic Structures
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Python', 'C', 'Logic Design', 'Debugging'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-sm bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#060912] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-violet-400 font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>AI &amp; DATA SCIENCE FOCUS</span>
              </div>
              <p className="text-neutral-300 text-xs font-mono">
                Data Pipelines, Statistical Analysis, Supervised Learning Concepts
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Machine Learning', 'Data Science', 'Perceptrons', 'Statistical Thinking'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-sm bg-violet-950/60 border border-violet-500/30 text-violet-300 text-[10px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Projects at a Glance */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Verified Hands-On Projects
            </h5>
            <div className="space-y-2.5">
              {PROJECTS_LIST.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span>{proj.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400">({proj.number})</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                      {proj.description}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400 shrink-0">
                    {proj.technologies.join(' • ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0c1429] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <span>Direct contact:</span>
            <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.email}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-200 inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Email'}</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Discussion%20-%20Raghavendra%20P%20V%20N`}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-neutral-950 font-sans font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Candidate</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
