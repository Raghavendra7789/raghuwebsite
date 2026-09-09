import { useState, type FormEvent } from 'react';
import { Mail, Linkedin, Github, Copy, Check, Send, Sparkles, ArrowUpRight, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [messageName, setMessageName] = useState('');
  const [messageEmail, setMessageEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  const handleQuickSend = (e: FormEvent) => {
    e.preventDefault();
    if (!messageName || !messageText) return;

    // Generate direct mailto link with prefilled subject and body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${messageName}`);
    const body = encodeURIComponent(
      `Hello Raghavendra,\n\nName: ${messageName}\nEmail: ${messageEmail || 'Not provided'}\n\nMessage:\n${messageText}\n\nSent via Portfolio Workspace`
    );
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setMessageName('');
      setMessageEmail('');
      setMessageText('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative border-t border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s Build Something With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
              Technology.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Have an idea, opportunity, or interesting problem? Let&apos;s connect.
          </p>

          {/* Direct Email Address Display Box with Copy Button */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/15 bg-[#0a0f1d]/90 backdrop-blur-md shadow-lg shadow-black/40">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs sm:text-sm text-neutral-200 select-all">
                {PERSONAL_INFO.email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Large Modern Buttons: Email Me, LinkedIn, GitHub */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Email Me Button */}
          <a
            id="contact-email-btn"
            href={`mailto:${PERSONAL_INFO.email}`}
            className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-cyan-950/60 to-[#080d19] hover:from-cyan-900/60 hover:to-[#0c1426] text-white transition-all duration-300 shadow-xl shadow-cyan-950/30 hover:shadow-cyan-500/20 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
              Email Me
            </span>
            <span className="text-xs font-mono text-cyan-400/80 mt-1 flex items-center gap-1">
              <span>Send direct note</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* LinkedIn Button */}
          <a
            id="contact-linkedin-btn"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1020] to-[#070a14] hover:border-violet-500/40 hover:from-violet-950/40 text-white transition-all duration-300 shadow-xl hover:shadow-violet-500/20 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-300 mb-3 group-hover:scale-110 transition-transform">
              <Linkedin className="w-6 h-6" />
            </div>
            <span className="font-heading font-bold text-base text-white group-hover:text-violet-300 transition-colors">
              LinkedIn
            </span>
            <span className="text-xs font-mono text-neutral-400 group-hover:text-violet-300 mt-1 flex items-center gap-1">
              <span>Professional network</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* GitHub Button */}
          <a
            id="contact-github-btn"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1020] to-[#070a14] hover:border-emerald-500/40 hover:from-emerald-950/40 text-white transition-all duration-300 shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-neutral-200 mb-3 group-hover:scale-110 transition-transform">
              <Github className="w-6 h-6" />
            </div>
            <span className="font-heading font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
              GitHub
            </span>
            <span className="text-xs font-mono text-neutral-400 group-hover:text-emerald-300 mt-1 flex items-center gap-1">
              <span>Code repositories</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

        {/* Optional Quick Message Dispatch Box */}
        <div className="mt-12 max-w-xl mx-auto p-6 rounded-2xl border border-white/10 bg-[#080d19]/80 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/10 text-xs font-mono text-neutral-400">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>QUICK DISPATCH NOTE</span>
          </div>

          <form onSubmit={handleQuickSend} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="dispatch-name" className="block text-xs font-mono text-neutral-300 mb-1">
                  Your Name *
                </label>
                <input
                  id="dispatch-name"
                  type="text"
                  required
                  value={messageName}
                  onChange={(e) => setMessageName(e.target.value)}
                  placeholder="e.g. Alex Sharma"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label htmlFor="dispatch-email" className="block text-xs font-mono text-neutral-300 mb-1">
                  Your Email (Optional)
                </label>
                <input
                  id="dispatch-email"
                  type="email"
                  value={messageEmail}
                  onChange={(e) => setMessageEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dispatch-message" className="block text-xs font-mono text-neutral-300 mb-1">
                Message / Opportunity *
              </label>
              <textarea
                id="dispatch-message"
                required
                rows={3}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Share your thoughts, project question, or collaboration opportunity..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-neutral-500">
                Direct transmission via mail client
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-neutral-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Note</span>
              </button>
            </div>

            {submitted && (
              <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Opening default email client with your message... Thank you!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
