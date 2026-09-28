import React from 'react';
import { ProfileData } from '../data/profile';

interface AboutProps {
  profile: ProfileData;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-[var(--line-soft)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-sm text-[var(--accent)] tracking-wider">01</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            About <em className="italic text-[var(--accent)]">me</em>
          </h2>
          <div className="flex-1 h-[1px] bg-[var(--line)] self-center min-w-[24px]" />
          <span className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase hidden sm:inline">
            WHO I AM
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          {/* Left Column: Lede text */}
          <div>
            <p className="font-serif text-2xl sm:text-3xl text-[var(--ink)] leading-snug tracking-tight mb-8">
              I am an ambitious <em className="italic text-[var(--accent)]">Artificial Intelligence &amp; Machine Learning</em> Engineering student passionate about crafting clean software, intelligent systems, and <em className="italic text-[var(--accent)]">impactful web applications</em>.
            </p>

            <div className="space-y-5 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
              {profile.about.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Key Details & Quick Facts Table */}
          <div className="bg-[var(--bg-subtle)] p-7 sm:p-9 border border-[var(--line)] shadow-xs">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-6">
              Core Profile & Credentials
            </h3>

            <dl className="divide-y divide-[var(--line)]">
              {profile.facts.map(([label, val], idx) => (
                <div key={idx} className="py-3.5 grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr] gap-4 items-baseline">
                  <dt className="font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    {label}
                  </dt>
                  <dd className="text-sm sm:text-base font-medium text-[var(--ink)]">
                    {val}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center justify-between font-mono text-xs text-[var(--muted)]">
              <span>ACTIVE IN</span>
              <span className="text-[var(--ink)] font-medium">Bhopal & Remote Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
