import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { ProfileData } from '../data/profile';

interface EducationProps {
  profile: ProfileData;
}

export const Education: React.FC<EducationProps> = ({ profile }) => {
  const allEntries = [
    ...profile.education.map((e) => ({ ...e, isCert: false })),
    ...profile.certifications.map((c) => ({ ...c, isCert: true }))
  ];

  return (
    <section id="education" className="py-24 sm:py-32 border-t border-[var(--line-soft)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-sm text-[var(--accent)] tracking-wider">02</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            Academic <em className="italic text-[var(--accent)]">record</em>
          </h2>
          <div className="flex-1 h-[1px] bg-[var(--line)] self-center min-w-[24px]" />
          <span className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase hidden sm:inline">
            DEGREE & CERTS
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          {/* Left Column (Sticky Sidebar) */}
          <div className="lg:sticky lg:top-28">
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ink)] leading-snug font-medium mb-4">
              Education, coursework & technical credentials.
            </h3>
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
              Structured foundations in Computer Science paired with continuous professional certifications in cloud engineering, full-stack ecosystems, and algorithmic problem solving.
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent)] border-l-2 border-[var(--accent)] pl-3">
              <span>Verified Academic & Professional Milestones</span>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="relative pl-8 sm:pl-12 border-l border-[var(--line)] space-y-12">
            {allEntries.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node marker */}
                <div
                  className={`absolute -left-[41px] sm:-left-[57px] top-1.5 w-4 h-4 border transition-colors ${
                    item.isCert
                      ? 'bg-[var(--accent)] border-[var(--accent)]'
                      : 'bg-[var(--bg)] border-[var(--ink)] group-hover:bg-[var(--ink)]'
                  }`}
                />

                {/* Year Pill/Tag */}
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.year}</span>
                  <span className="text-[var(--muted)]">·</span>
                  <span className="uppercase text-[var(--muted)] font-mono text-[11px]">
                    {item.isCert ? 'Professional Certification' : 'Academic Degree'}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-serif text-xl sm:text-2xl text-[var(--ink)] font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h4>

                {/* Organization / College */}
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--muted)] tracking-wide mb-3">
                  {item.isCert ? (
                    <Award className="w-4 h-4 text-[var(--accent)]" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                  )}
                  <span className="font-medium text-[var(--ink)]">{item.org}</span>
                </div>

                {/* Description */}
                {item.desc && (
                  <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-4 max-w-2xl">
                    {item.desc}
                  </p>
                )}

                {/* Unboxed Metadata chips */}
                {item.chips && item.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="font-mono text-[11px] tracking-wider px-2.5 py-1 border border-[var(--line)] text-[var(--muted)] bg-[var(--bg-subtle)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
