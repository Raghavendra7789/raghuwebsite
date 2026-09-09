import { Sparkles, Calendar, BookOpen, Brain, Terminal, Award } from 'lucide-react';
import { TIMELINE_NODES, PERSONAL_INFO } from '../data/portfolioData';

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            <span>01 / ABOUT</span>
            <span className="w-12 h-px bg-cyan-500/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Curious. Analytical.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              Always Learning.
            </span>
          </h2>
        </div>

        {/* Narrative & Profile Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              I am <span className="text-white font-semibold">{PERSONAL_INFO.fullName}</span>, a B.Tech student
              specializing in <span className="text-cyan-300 font-medium">Artificial Intelligence &amp; Data Science</span> at{' '}
              <span className="text-white font-medium">{PERSONAL_INFO.institution}</span> (2025–2029).
            </p>
            <p className="text-neutral-400 text-base leading-relaxed">
              My engineering journey is driven by a deep curiosity about how intelligent systems turn raw computation
              into actionable insights. I am actively developing foundational strengths across core programming (Python, C),
              algorithmic problem-solving, data manipulation, and modern AI paradigms.
            </p>
            <p className="text-neutral-400 text-base leading-relaxed">
              Rather than merely consuming technology, my focus is on writing clean, structured code, understanding underlying
              mechanisms from the metal up, and building reproducible software artifacts.
            </p>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#090e1a]/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <BookOpen className="w-4 h-4" />
                  <span>SPECIALIZATION</span>
                </div>
                <div className="mt-1.5 text-sm font-semibold text-white">AI &amp; Data Science</div>
                <div className="text-[11px] text-neutral-400 font-mono">REVA University</div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-[#090e1a]/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-400">
                  <Terminal className="w-4 h-4" />
                  <span>CORE STACK</span>
                </div>
                <div className="mt-1.5 text-sm font-semibold text-white">Python &amp; C</div>
                <div className="text-[11px] text-neutral-400 font-mono">Algorithms &amp; Logic</div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-[#090e1a]/80 backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span>ACADEMIC ERA</span>
                </div>
                <div className="mt-1.5 text-sm font-semibold text-white">2025 – 2029</div>
                <div className="text-[11px] text-neutral-400 font-mono">Undergraduate B.Tech</div>
              </div>
            </div>
          </div>

          {/* Right Card: Quick Technical Identity */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1424] to-[#070b14] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-white text-base">Developer Philosophy</h3>
                <p className="text-xs text-neutral-400 font-mono">Disciplined • Curious • Systematic</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs text-neutral-300 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">01</span>
                <span>Learn first principles before abstracting with high-level libraries.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-violet-400 mt-0.5">02</span>
                <span>Treat bugs as precise opportunities to improve system mental models.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">03</span>
                <span>Balance theoretical math and data intuition with practical software engineering.</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Status: Year 1 &rarr; Foundations</span>
              <span className="text-cyan-400">Bangalore, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Visual Timeline Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-lg font-heading font-semibold text-white tracking-wide">
              Academic &amp; Skill Progression Roadmap
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {TIMELINE_NODES.map((node, index) => {
              const isCurrent = node.status === 'current';
              const isFuture = node.status === 'future';

              return (
                <div
                  key={node.year}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? 'border-cyan-500/50 bg-[#091122]/90 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                      : isFuture
                      ? 'border-white/10 bg-[#080c16]/50 opacity-90'
                      : 'border-white/10 bg-[#080c16]/80'
                  }`}
                >
                  {/* Top indicator tag */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-2xl font-mono font-bold ${
                          isCurrent
                            ? 'text-cyan-300'
                            : isFuture
                            ? 'text-violet-400'
                            : 'text-neutral-300'
                        }`}
                      >
                        {node.year}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider ${
                          isCurrent
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 animate-pulse'
                            : isFuture
                            ? 'bg-violet-950/60 text-violet-300 border border-violet-500/30'
                            : 'bg-neutral-800 text-neutral-400 border border-white/5'
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>

                    <h4 className="text-base font-semibold text-white mb-1">{node.title}</h4>
                    {node.organization && (
                      <p className="text-xs text-neutral-400 font-mono mb-3">{node.organization}</p>
                    )}

                    <p className="text-xs text-cyan-400/90 font-medium mb-4">{node.focus}</p>

                    <ul className="space-y-2 text-xs text-neutral-400 font-sans">
                      {node.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 text-sm leading-none">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                    <span>Phase 0{index + 1}</span>
                    <Sparkles className="w-3 h-3 text-cyan-400/70" />
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
