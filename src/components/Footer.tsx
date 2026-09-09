import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="py-12 border-t border-white/10 bg-[#04060c] text-neutral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Batch Info */}
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-heading font-bold text-white text-base tracking-wider">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              AI &amp; Data Science | {PERSONAL_INFO.batch} • REVA University
            </p>
          </div>

          {/* Minimalist philosophy tagline */}
          <div className="text-center">
            <span className="font-mono text-xs text-cyan-400/90 tracking-widest uppercase">
              Building. Learning. Experimenting.
            </span>
          </div>

          {/* Back to Top Button */}
          <div>
            <button
              id="footer-back-to-top"
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer hover:border-cyan-500/40"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-[11px] font-mono text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Raghavendra P V N. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Engineered with modern React, TypeScript &amp; Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}
