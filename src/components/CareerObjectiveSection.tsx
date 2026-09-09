import { useState } from 'react';
import { Target, Compass, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { CAREER_ROADMAP } from '../data/portfolioData';

export function CareerObjectiveSection() {
  const [activeStep, setActiveStep] = useState<number>(1); // 0-indexed; step 1 = BUILD

  const strategicPillars = [
    {
      title: 'Strong AI & Data Science Fundamentals',
      desc: 'Mastering linear algebra, calculus, probability, algorithms, and core statistical modeling before relying on black-box frameworks.',
    },
    {
      title: 'Practical Industry Experience',
      desc: 'Seeking opportunities, collaborative engineering projects, and research lab challenges to solve real-world industry problems.',
    },
    {
      title: 'Innovative Technology Solutions',
      desc: 'Architecting intelligent software tools that reduce friction, automate tedious workflows, and deliver measurable impact.',
    },
    {
      title: 'Continuous Technical Growth',
      desc: 'Embracing deliberate practice, peer code reviews, competitive programming, and staying ahead of modern AI developments.',
    },
  ];

  return (
    <section id="direction" className="py-20 sm:py-28 relative border-t border-white/10 bg-[#060810]">
      {/* Background Decorative Ambient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Small label */}
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-4">
          <Target className="w-3.5 h-3.5" />
          <span>04 / DIRECTION</span>
          <span className="w-12 h-px bg-cyan-500/40" />
        </div>

        {/* Large Editorial Statement */}
        <div className="max-w-4xl space-y-6">
          <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-[1.2]">
            &ldquo;Building a strong foundation today to create{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
              meaningful technology
            </span>{' '}
            tomorrow.&rdquo;
          </blockquote>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal max-w-3xl">
            My primary objective as an Artificial Intelligence &amp; Data Science undergraduate at REVA University
            is to combine mathematical rigor with practical engineering craftsmanship. By mastering foundational
            programming and modern machine intelligence, I aim to contribute to impactful software systems that solve
            genuine societal and enterprise challenges.
          </p>
        </div>

        {/* 4 Supporting Content Pillars */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {strategicPillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-5 rounded-2xl border border-white/10 bg-[#090e1a]/80 backdrop-blur-sm space-y-3 hover:border-cyan-500/40 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-sm border border-cyan-500/30">
                  PILLAR 0{idx + 1}
                </span>
                <CheckCircle2 className="w-4 h-4 text-neutral-600 group-hover:text-cyan-400 transition-colors" />
              </div>

              <h4 className="text-base font-heading font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {pillar.title}
              </h4>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Visual Journey Pipeline: LEARN → BUILD → EXPERIMENT → SOLVE → GROW */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm sm:text-base font-heading font-semibold text-white uppercase tracking-wider">
                Visual Engineering Journey
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline-block">
              Interactive Development Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {CAREER_ROADMAP.map((step, idx) => {
              const isSelected = idx === activeStep;
              return (
                <div
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/80 to-[#0c1424] shadow-lg shadow-cyan-950/50 -translate-y-0.5'
                      : 'border-white/10 bg-[#080d19]/80 hover:border-white/20 hover:bg-[#0c1120]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-neutral-500">
                        {step.step}
                      </span>
                      {idx < CAREER_ROADMAP.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-600 hidden md:inline-block" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-base font-heading font-bold ${
                        isSelected ? 'text-cyan-300' : 'text-white'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-cyan-400' : 'text-neutral-500'}>
                      {isSelected ? '● ACTIVE STAGE' : 'STAGE'}
                    </span>
                    {isSelected && <Sparkles className="w-3 h-3 text-cyan-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
