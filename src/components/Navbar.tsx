import { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight, Volume2, VolumeX, Briefcase } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

interface NavbarProps {
  activeSection: string;
  onOpenCommandPalette?: () => void;
  onOpenRecruiter?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export function Navbar({
  activeSection,
  onOpenCommandPalette,
  onOpenRecruiter,
  soundEnabled = true,
  onToggleSound,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Interests', href: '#interests' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 backdrop-blur-xl bg-[#05070d]/85 border-b border-white/10 shadow-2xl shadow-black/60'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="group flex items-center gap-2.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg py-1 px-1.5 transition-transform"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-transparent border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:border-cyan-400 transition-colors shadow-xs shadow-cyan-500/20">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="font-mono text-[10px] text-neutral-400 tracking-tight flex items-center gap-1">
              AI & Data Science <span className="text-cyan-400/80">•</span> REVA
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 bg-[#0c101a]/70 backdrop-blur-md shadow-inner shadow-white/5"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-xs shadow-cyan-500/30'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Status Badge & Interactive Workstation Tools */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* CLI Palette button */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onOpenCommandPalette();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Open Terminal Shell (⌘K)"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>⌘K</span>
            </button>
          )}

          {/* Sound Toggle button */}
          {onToggleSound && (
            <button
              type="button"
              onClick={() => {
                onToggleSound();
              }}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? 'Synthesizer Audio Active (Click to Mute)' : 'Synthesizer Audio Muted (Click to Enable)'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-500" />}
            </button>
          )}

          {/* Recruiter Dossier button */}
          {onOpenRecruiter && (
            <button
              type="button"
              onClick={() => {
                soundFx.playChime();
                onOpenRecruiter();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/50 text-xs font-mono text-emerald-300 transition-colors cursor-pointer"
              title="Recruiter Executive Summary"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Dossier</span>
            </button>
          )}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 text-xs font-medium text-cyan-200 transition-all shadow-xs"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-[11px] font-mono">
            <span className="inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 animate-pulse" />
            <span>Building</span>
          </div>

          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden mt-2 mx-4 p-4 rounded-2xl border border-white/10 bg-[#090d16]/95 backdrop-blur-2xl shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-neutral-400 font-mono">
            <span>NAVIGATION</span>
            <span className="text-emerald-400">● {PERSONAL_INFO.statusBadge}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-950/70 border border-cyan-500/40 text-cyan-300'
                      : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-500">REVA Univ. (2025–2029)</span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold"
            >
              Let&apos;s Connect →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
