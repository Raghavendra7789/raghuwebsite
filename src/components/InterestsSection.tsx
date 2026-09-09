import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, Lightbulb } from 'lucide-react';
import { INTEREST_TAGS } from '../data/portfolioData';
import { InterestTag } from '../types';

export function InterestsSection() {
  const [activeTag, setActiveTag] = useState<InterestTag>(INTEREST_TAGS[0]);

  // Small staggering floating delay configs for playful movement
  const floatDelays = [0, 0.4, 0.8, 1.2, 0.6, 1.0, 1.4];

  return (
    <section id="interests" className="py-20 sm:py-28 relative border-t border-white/10 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative text-center">
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-violet-400 uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>EXPLORATION &amp; HORIZONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Currently Curious{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400">
              About
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Topics and domains fueling late-night experiments, reading list bookmarks, and engineering curiosity.
          </p>
        </div>

        {/* Playful Floating Interactive Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto py-6">
          {INTEREST_TAGS.map((tag, idx) => {
            const isSelected = activeTag?.id === tag.id;
            return (
              <motion.button
                key={tag.id}
                id={`interest-tag-${tag.id}`}
                type="button"
                onClick={() => setActiveTag(tag)}
                animate={{
                  y: [-3, 4, -3],
                }}
                transition={{
                  duration: 4.5 + (idx % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: floatDelays[idx % floatDelays.length],
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className={`group relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer select-none border backdrop-blur-md shadow-lg ${
                  isSelected
                    ? 'border-cyan-400 bg-gradient-to-r from-cyan-950/90 via-[#0d162d] to-violet-950/90 text-cyan-200 shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                    : 'border-white/10 bg-[#080d19]/80 text-neutral-300 hover:border-violet-400/50 hover:text-white hover:bg-[#0e1426] shadow-black/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-cyan-400 shadow-xs shadow-cyan-400' : 'bg-neutral-600 group-hover:bg-violet-400'
                    }`}
                  />
                  <span>{tag.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Active Curiosity Card */}
        <div className="mt-8 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTag && (
              <motion.div
                key={activeTag.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl border border-white/15 bg-gradient-to-br from-[#0c1222]/90 to-[#070b14]/90 backdrop-blur-xl shadow-2xl text-left"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Lightbulb className="w-4 h-4" />
                    <span className="font-semibold">{activeTag.label}</span>
                  </div>
                  <span className="text-neutral-400 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5">
                    {activeTag.category}
                  </span>
                </div>

                <p className="mt-3 text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                  {activeTag.curiosityNote}
                </p>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1 text-violet-400">
                    <Sparkles className="w-3 h-3" />
                    <span>Active Exploration Focus</span>
                  </span>
                  <span>Click any tag to inspect curiosity</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
