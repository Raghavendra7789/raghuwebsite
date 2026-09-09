import { useState } from 'react';
import {
  Code,
  Binary,
  Brain,
  Database,
  Cpu,
  Workflow,
  Bug,
  Terminal,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { SKILLS_LIST } from '../data/portfolioData';
import { SkillItem } from '../types';
import { soundFx } from '../utils/soundEffects';

export function SkillsSection() {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('python');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getSkillIcon = (id: string) => {
    switch (id) {
      case 'python':
        return <Code className="w-5 h-5 text-cyan-400" />;
      case 'c-lang':
        return <Binary className="w-5 h-5 text-violet-400" />;
      case 'ai':
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'data-science':
        return <Database className="w-5 h-5 text-violet-400" />;
      case 'machine-learning':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'problem-solving':
        return <Workflow className="w-5 h-5 text-violet-400" />;
      case 'debugging':
        return <Bug className="w-5 h-5 text-cyan-400" />;
      case 'programming-fundamentals':
        return <Terminal className="w-5 h-5 text-violet-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_LIST
    : SKILLS_LIST.filter((s) => s.category === activeCategory);

  const selectedSkill = SKILLS_LIST.find((s) => s.id === selectedSkillId) || SKILLS_LIST[0];

  return (
    <section id="skills" className="py-20 sm:py-28 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              <span>02 / SKILLS</span>
              <span className="w-12 h-px bg-cyan-500/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
              Things I&apos;m Learning &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
                Building With
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              A breakdown of foundational programming languages, intelligent systems concepts, and engineering principles
              practiced through rigorous coursework and personal lab experimentation.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/10 bg-[#090e1b] self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All (8)' },
              { id: 'core', label: 'Core Languages' },
              { id: 'ai-data', label: 'AI & Data' },
              { id: 'mindset', label: 'Engineering Mindset' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Interactive Skill Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill) => {
            const isSelected = skill.id === selectedSkillId;
            return (
              <div
                key={skill.id}
                id={`skill-card-${skill.id}`}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedSkillId(skill.id);
                }}
                className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? 'border-cyan-400/80 bg-[#0c1426] shadow-xl shadow-cyan-950/60 ring-1 ring-cyan-400/50 -translate-y-1'
                    : 'border-white/10 bg-[#080d19]/80 hover:border-cyan-500/40 hover:bg-[#0b1222] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50'
                }`}
              >
                {/* Card Top: Icon & Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 flex items-center justify-center transition-colors">
                      {getSkillIcon(skill.id)}
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? 'border-cyan-400/40 bg-cyan-950 text-cyan-300'
                          : 'border-white/5 bg-white/5 text-neutral-400 group-hover:text-cyan-300'
                      }`}
                    >
                      {skill.category.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/90 mt-0.5 mb-2">
                    {skill.subtitle}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-3">
                    {skill.description}
                  </p>
                </div>

                {/* Card Footer: click hint */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? 'text-cyan-300 font-medium' : 'text-neutral-500 group-hover:text-neutral-300'}>
                    {isSelected ? '● Inspected' : 'Click to inspect'}
                  </span>
                  <span className="text-neutral-600 group-hover:text-cyan-400 transition-colors">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Active Deep-Dive Panel */}
        {selectedSkill && (
          <div
            id="skill-inspector-panel"
            className="mt-8 p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#0b1325] to-[#080d19] shadow-2xl relative overflow-hidden animate-in fade-in duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
                  {getSkillIcon(selectedSkill.id)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-heading font-bold text-white">
                      {selectedSkill.name}
                    </h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                      ACTIVE DRILL-DOWN
                    </span>
                  </div>
                  <p className="text-xs font-mono text-cyan-400">{selectedSkill.subtitle}</p>
                </div>
              </div>

              <div className="text-xs font-mono text-neutral-400">
                Category: <span className="text-white capitalize">{selectedSkill.category}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {selectedSkill.description}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    KEY CONCEPTS &amp; TOPICS PRACTICED:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-xs text-neutral-200 font-sans"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        <span>{concept}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedSkill.codeHighlight && (
                <div className="lg:col-span-5 p-3.5 rounded-xl border border-white/10 bg-[#04070e] font-mono text-xs text-neutral-300">
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 pb-1.5 mb-1.5 border-b border-white/5">
                    <span>SYNTAX HIGHLIGHT</span>
                    <span className="text-cyan-400">snippet</span>
                  </div>
                  <pre className="text-cyan-300 whitespace-pre-wrap leading-relaxed">
                    {selectedSkill.codeHighlight}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
