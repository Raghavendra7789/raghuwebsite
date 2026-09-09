import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InterestsSection } from './components/InterestsSection';
import { CareerObjectiveSection } from './components/CareerObjectiveSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { RecruiterDossierModal } from './components/RecruiterDossierModal';
import { soundFx } from './utils/soundEffects';
import { Terminal, Briefcase, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRecruiterDossierOpen, setIsRecruiterDossierOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Ensure dark class is present on html for futuristic styling
    document.documentElement.classList.add('dark');

    const sections = ['home', 'about', 'skills', 'projects', 'interests', 'direction', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Global keyboard shortcut for Command Palette: Cmd+K / Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleSound = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
    if (newState) {
      soundFx.playChime();
    }
  };

  const scrollToSection = (sectionId: string) => {
    soundFx.playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="app-root"
      className="min-h-screen bg-[#05070d] text-neutral-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden antialiased"
    >
      {/* Subtle futuristic scanline/ambient texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#1e2638_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none z-0" />

      {/* Sticky Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenRecruiter={() => setIsRecruiterDossierOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        <Hero
          onExploreClick={() => scrollToSection('projects')}
          onConnectClick={() => scrollToSection('contact')}
          onOpenRecruiter={() => setIsRecruiterDossierOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <InterestsSection />

        <CareerObjectiveSection />

        <ContactSection />
      </main>

      {/* Minimalistic Recruiter & Developer Friendly Footer */}
      <Footer />

      {/* Floating Developer Quick Dock (bottom right corner) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            soundFx.playChime();
            setIsRecruiterDossierOpen(true);
          }}
          className="px-3 py-2 rounded-xl border border-emerald-500/40 bg-[#091515]/90 hover:bg-[#0d2222] text-emerald-300 text-xs font-mono font-medium shadow-xl shadow-emerald-950/50 backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Recruiter Fast-Track (30-Second Candidate Dossier)"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Recruiter Dossier</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setIsCommandPaletteOpen(true);
          }}
          className="p-2.5 rounded-xl border border-cyan-500/40 bg-[#091224]/90 hover:bg-[#0c1a36] text-cyan-300 text-xs font-mono shadow-xl shadow-cyan-950/50 backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Developer Shell (⌘K)"
        >
          <Terminal className="w-4 h-4" />
          <span className="hidden sm:inline font-mono">CLI (⌘K)</span>
        </button>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={scrollToSection}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Recruiter Fast-Track Dossier Modal */}
      <RecruiterDossierModal
        isOpen={isRecruiterDossierOpen}
        onClose={() => setIsRecruiterDossierOpen(false)}
      />
    </div>
  );
}
