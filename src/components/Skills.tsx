import React from 'react';
import { ProfileData } from '../data/profile';

interface SkillsProps {
  profile: ProfileData;
}

export const Skills: React.FC<SkillsProps> = ({ profile }) => {
  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-[var(--line-soft)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-sm text-[var(--accent)] tracking-wider">03</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            Toolbox &amp; <em className="italic text-[var(--accent)]">skills</em>
          </h2>
          <div className="flex-1 h-[1px] bg-[var(--line)] self-center min-w-[24px]" />
          <span className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase hidden sm:inline">
            CORE CAPABILITIES
          </span>
        </div>

        {/* Skill Bands */}
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {profile.skills.map((band) => (
            <div
              key={band.key}
              className="py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-14 items-start"
            >
              {/* Band Heading */}
              <div className="flex items-baseline gap-4">
                <span className="font-serif italic text-4xl sm:text-5xl text-[var(--accent)] font-light leading-none">
                  {band.key}
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[var(--ink)]">
                    {band.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mt-1">
                    {band.note}
                  </p>
                </div>
              </div>

              {/* Band Skill Items */}
              <div className="divide-y divide-[var(--line)]">
                {band.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="py-3.5 grid grid-cols-1 sm:grid-cols-[1fr_auto_80px] gap-3 sm:gap-6 items-center group transition-colors hover:bg-[var(--bg-subtle)] px-2"
                  >
                    {/* Skill Name */}
                    <span className="font-medium text-base text-[var(--ink)] group-hover:text-[var(--accent)] group-hover:translate-x-1.5 transition-all">
                      {skill.name}
                    </span>

                    {/* Skill Meter (10 ticks) */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 10 }).map((_, tickIdx) => {
                        const isFilled = tickIdx < skill.level;
                        return (
                          <span
                            key={tickIdx}
                            className={`h-2 rounded-[1px] transition-colors duration-200 ${
                              isFilled
                                ? 'w-3.5 bg-[var(--ink)] group-hover:bg-[var(--accent)]'
                                : 'w-3.5 bg-[var(--line)]'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Experience in years */}
                    <span className="font-mono text-xs text-[var(--muted)] sm:text-right">
                      {skill.yrs}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
