import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Mail, ChevronDown } from 'lucide-react';
import { ProfileData, ProjectItem } from '../data/profile';

interface ProjectsProps {
  profile: ProfileData;
}

export const Projects: React.FC<ProjectsProps> = ({ profile }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openProjectId, setOpenProjectId] = useState<string | null>(
    profile.projects[0]?.id || null
  );

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

  const filteredProjects =
    activeCategory === 'All'
      ? profile.projects
      : profile.projects.filter((p) => p.category === activeCategory);

  const toggleProject = (id: string) => {
    setOpenProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-[var(--line-soft)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-10">
          <span className="font-mono text-sm text-[var(--accent)] tracking-wider">04</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            Selected <em className="italic text-[var(--accent)]">work</em>
          </h2>
          <div className="flex-1 h-[1px] bg-[var(--line)] self-center min-w-[24px]" />
          <span className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase hidden sm:inline">
            SYSTEMS & INTERFACES
          </span>
        </div>

        {/* Interactive Filter Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-subtle)] border border-[var(--line)] w-fit mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-mono text-xs tracking-wider transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[var(--ink)] text-[var(--bg)] font-medium shadow-xs'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Accordion / List */}
        <div className="border-t border-[var(--line)] divide-y divide-[var(--line)]">
          {filteredProjects.map((project, idx) => {
            const isOpen = openProjectId === project.id;

            return (
              <article key={project.id} className="group">
                {/* Accordion Row Header */}
                <div
                  onClick={() => toggleProject(project.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleProject(project.id);
                    }
                  }}
                  className="py-7 cursor-pointer grid grid-cols-[40px_1fr_auto] sm:grid-cols-[56px_1fr_auto_48px] gap-4 sm:gap-6 items-center select-none"
                  aria-expanded={isOpen}
                >
                  {/* Project Number */}
                  <span className="font-mono text-xs sm:text-sm text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Title & Sub */}
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ink)] font-medium group-hover:italic group-hover:text-[var(--accent)] transition-all">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted)] mt-1 font-sans">
                      {project.sub} · {project.year}
                    </p>
                  </div>

                  {/* Tech stack tags on desktop */}
                  <div className="hidden md:flex items-center gap-2">
                    {project.tech.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[11px] tracking-wider px-2.5 py-1 border border-[var(--line)] text-[var(--muted)] bg-[var(--bg-subtle)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Arrow Indicator */}
                  <div
                    className={`w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center transition-all ${
                      isOpen
                        ? 'bg-[var(--ink)] text-[var(--bg)] rotate-90 border-[var(--ink)]'
                        : 'group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--on-accent)] group-hover:rotate-45'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Expanded Details Pane */}
                {isOpen && (
                  <div className="pb-10 pt-2 pl-0 sm:pl-14">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-12 bg-[var(--bg-subtle)] p-6 sm:p-8 border border-[var(--line)]">
                      {/* Left: Project Image */}
                      <div className="relative aspect-[4/3] bg-[var(--card-bg)] border border-[var(--line)] overflow-hidden shadow-xs">
                        <img
                          src={project.img}
                          alt={`${project.title} showcase`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center bg-[var(--bg-subtle)] font-mono text-xs text-[var(--muted)]">
                                  ${project.title} Preview
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>

                      {/* Right: Writeup, Highlights, CTAs */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider mb-2 font-medium">
                            {project.category} Architecture
                          </div>
                          <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed mb-5 font-sans">
                            {project.desc}
                          </p>

                          {/* Architecture Highlights */}
                          {project.highlights && project.highlights.length > 0 && (
                            <div className="mb-6">
                              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] block mb-2">
                                Architectural Highlights
                              </span>
                              <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-[var(--muted)] list-disc pl-4">
                                {project.highlights.map((h, hIdx) => (
                                  <li key={hIdx}>{h}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tech Pills */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="font-mono text-[11px] tracking-wider px-2.5 py-1 border border-[var(--line)] text-[var(--ink)] bg-[var(--bg)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Links */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--line)]">
                          {project.demoLink && (
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)] hover:text-[var(--accent)] border-b border-[var(--accent)] pb-1 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" />
                              <span>Live Preview</span>
                            </a>
                          )}

                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)] hover:text-[var(--accent)] border-b border-[var(--accent)] pb-1 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <a
                            href={`mailto:${profile.email}?subject=${encodeURIComponent(
                              `Inquiry regarding ${project.title}`
                            )}`}
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] pb-1 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Discuss Project</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex items-center justify-between font-mono text-xs text-[var(--muted)] pt-6 border-t border-[var(--line)]">
          <span>More repositories &amp; experiments live on GitHub</span>
          <a
            href={profile.socials.find((s) => s.label === 'GitHub')?.url || 'https://github.com/Arvindmewada'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ink)] hover:text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 transition-colors font-medium inline-flex items-center gap-1.5"
          >
            <span>Visit @Arvindmewada</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
