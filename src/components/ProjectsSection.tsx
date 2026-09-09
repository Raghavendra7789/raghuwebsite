import { useState } from 'react';
import { ArrowRight, Code2, Terminal, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { soundFx } from '../utils/soundEffects';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'project-1':
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case 'project-2':
        return <Terminal className="w-6 h-6 text-violet-400" />;
      case 'project-3':
        return <Layers className="w-6 h-6 text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            <span>03 / PROJECTS</span>
            <span className="w-12 h-px bg-cyan-500/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Learning Through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
              Projects
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Every project serves as a concrete testbed for transforming computational theory, logic, and programming concepts into resilient software solutions.
          </p>
        </div>

        {/* 3 Large Interactive Project Showcase Cards */}
        <div className="mt-12 space-y-8">
          {PROJECTS_LIST.map((project, index) => {
            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#090e1b] via-[#070a13] to-[#04070d] p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-950/30 hover:scale-[1.01]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
                          {getProjectIcon(project.id)}
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/70 px-2.5 py-0.5 rounded-sm border border-cyan-500/30">
                            {project.number}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block text-xs font-mono text-neutral-500">
                        0{index + 1} / 03
                      </span>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-mono text-neutral-400 mr-1">Technologies:</span>
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#0c1426] border border-cyan-500/30 text-cyan-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Hover Reveal: Additional Outcome Highlights */}
                    <div className="pt-2 border-t border-white/5 space-y-2 opacity-90 transition-opacity">
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                        Core Competencies Applied:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.keyOutcomes.slice(0, 2).map((outcome, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-neutral-300 bg-white/5 p-2 rounded-lg border border-white/5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Button: View Project → */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playChime();
                          setSelectedProject(project);
                        }}
                        className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right Preview Box: Interactive Code & Output Sneak-Peek */}
                  <div
                    onClick={() => {
                      soundFx.playChime();
                      setSelectedProject(project);
                    }}
                    className="lg:col-span-5 rounded-xl border border-white/10 bg-[#050811] p-4 font-mono text-xs text-neutral-300 cursor-pointer group-hover:border-cyan-500/30 transition-colors shadow-lg relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Terminal className="w-3 h-3" />
                        <span>preview.{project.codeLanguage}</span>
                      </span>
                      <span className="text-[10px] text-neutral-400 group-hover:text-cyan-300 transition-colors">
                        Click to expand ↗
                      </span>
                    </div>

                    <pre className="text-[11px] leading-relaxed text-neutral-400 overflow-hidden line-clamp-6">
                      {project.sampleCode}
                    </pre>

                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Verified Trace
                      </span>
                      <span className="text-neutral-500 font-mono">Clean Architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
