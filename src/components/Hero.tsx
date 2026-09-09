import { ArrowRight, Mail, Sparkles, MapPin, GraduationCap, Briefcase, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DeveloperLabTerminal } from './DeveloperLabTerminal';
import { NeuralCanvas } from './NeuralCanvas';
import { soundFx } from '../utils/soundEffects';

interface HeroProps {
  onExploreClick: () => void;
  onConnectClick: () => void;
  onOpenRecruiter: () => void;
  onOpenCommandPalette: () => void;
}

export function Hero({ onExploreClick, onConnectClick, onOpenRecruiter, onOpenCommandPalette }: HeroProps) {
  const techBadges = ['Python', 'C', 'AI', 'Data Science', 'Machine Learning'];

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Interactive Constellation Synapse Canvas */}
      <NeuralCanvas />

      {/* Ambient futuristic background glow grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Introduction & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
            {/* Subtitle tag & Recruiter Fast-Track pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-mono backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold">{PERSONAL_INFO.name}</span>
                <span className="text-cyan-600">•</span>
                <span className="text-neutral-300">B.Tech 2025–2029</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFx.playChime();
                  onOpenRecruiter();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-mono transition-all cursor-pointer shadow-xs shadow-emerald-500/20 hover:scale-105 active:scale-95"
                title="Open 30-Second Recruiter Summary Dossier"
              >
                <Briefcase className="w-3 h-3 text-emerald-400" />
                <span>⚡ Recruiter Fast-Track (30s)</span>
              </button>
            </div>

            {/* Large headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.08]">
                AI &amp; Data Science{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
                  Student
                </span>
              </h1>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-400 font-mono pt-1">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>{PERSONAL_INFO.institution}</span>
                </span>
                <span className="text-neutral-600">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>
              </div>
            </div>

            {/* Supporting text */}
            <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl">
              &ldquo;{PERSONAL_INFO.tagline}&rdquo;
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-explore-btn"
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onExploreClick();
                }}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-neutral-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 active:scale-98 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-connect-btn"
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onConnectClick();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200 hover:border-violet-400/50 active:scale-98 cursor-pointer backdrop-blur-sm"
              >
                <Mail className="w-4 h-4 text-violet-400" />
                <span>Let&apos;s Connect</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onOpenCommandPalette();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-3.5 rounded-xl border border-white/15 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-cyan-300 text-xs font-mono transition-all cursor-pointer"
                title="Open interactive developer shell (⌘K)"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">CLI (⌘K)</span>
              </button>
            </div>

            {/* Small technology badges */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                CORE TECHNICAL FOCUS:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {techBadges.map((badge, idx) => (
                  <span
                    key={badge}
                    className="inline-flex items-center text-xs font-mono px-3 py-1 rounded-lg border border-white/10 bg-[#0d121f] text-neutral-200 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors shadow-xs"
                  >
                    <span>{badge}</span>
                    {idx < techBadges.length - 1 && (
                      <span className="ml-2 text-cyan-400/50">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive AI Developer Lab Visual */}
          <div className="lg:col-span-6 w-full">
            <DeveloperLabTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
