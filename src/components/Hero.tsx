import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, Sparkles } from 'lucide-react';
import { ProfileData } from '../data/profile';

interface HeroProps {
  profile: ProfileData;
  onDownloadResume: () => void;
  onOpenEditModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onDownloadResume, onOpenEditModal }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = profile.roles && profile.roles.length > 0 ? profile.roles : ['Full-Stack Developer'];
    const currentWord = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 38 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, profile.roles]);

  const currentYear = new Date().getFullYear();

  return (
    <section id="home" className="min-h-screen pt-24 pb-12 flex flex-col justify-between">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
        {/* Left Column: Typography & Intent */}
        <div className="flex flex-col justify-center">
          {/* Status Kicker */}
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[var(--muted)] uppercase mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] pulse-dot inline-block shrink-0" />
            <span>{profile.status}</span>
          </div>

          {/* Oversized Name */}
          <h1 className="font-serif leading-[0.92] tracking-tight mb-5">
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[var(--ink)]">
              {profile.firstName || 'ARVIND'}
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-normal italic text-[var(--accent)] mt-1">
              {profile.lastName || 'Mewada'}
            </span>
          </h1>

          {/* Typewriter Prompt */}
          <div className="font-mono text-sm sm:text-base text-[var(--ink)] mb-6 flex items-center flex-wrap gap-1">
            <span className="text-[var(--muted)]">{(profile.firstName || 'arvind').toLowerCase()}@dev:~$</span>
            <span className="font-medium text-[var(--accent)] ml-1">{displayedText}</span>
            <span className="inline-block w-2 h-4 bg-[var(--accent)] animate-pulse" />
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-xl mb-9 leading-relaxed font-sans">
            {profile.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[var(--ink)] text-[var(--bg)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
            >
              <span>View my work</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[var(--ink)] text-[var(--ink)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Download résumé</span>
              <Download className="w-3.5 h-3.5" />
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-4 py-3.5 text-[var(--muted)] hover:text-[var(--accent)] font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Right Column: Editorial Plate Frame Portrait */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
            {/* Background accent offset card */}
            <div className="absolute inset-0 translate-x-3.5 translate-y-3.5 bg-[var(--accent)] transition-transform duration-500 hover:translate-x-2 hover:translate-y-2 pointer-events-none" />

            {/* Main Plate Card */}
            <div className="relative border border-[var(--ink)] bg-[var(--bg)] overflow-hidden shadow-md">
              {/* Badge Stamp */}
              <div className="absolute top-3 right-3 bg-[var(--ink)] text-[var(--bg)] font-mono text-[10px] tracking-widest px-2.5 py-1 z-10 uppercase">
                {profile.badge}
              </div>

              {/* Portrait Image with Fallback */}
              <div className="relative aspect-[3/4] bg-[var(--bg-subtle)] overflow-hidden">
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-[1.05] hover:grayscale-0 hover:contrast-100 transition-all duration-700"
                  onError={(e) => {
                    // Fallback in case of image failure
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[var(--bg-subtle)] text-[var(--ink)] font-serif">
                          <span class="text-6xl font-bold italic text-[var(--accent)] mb-2">${profile.initials || 'AM'}</span>
                          <span class="font-mono text-xs tracking-wider text-[var(--muted)]">${profile.name.toUpperCase()}</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Caption */}
              <div className="border-t border-[var(--ink)] px-4 py-2.5 flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--muted)] bg-[var(--bg)]">
                <span>FIG. 01 — CSE-AIML ENG</span>
                <span className="text-[var(--ink)] font-medium">{profile.locationShort}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Foot Strip */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full mt-10 pt-4 border-t border-[var(--line)] flex items-center justify-between font-mono text-[11px] tracking-widest text-[var(--muted)]">
        <span>PORTFOLIO — {currentYear}</span>
        <a
          href="#about"
          className="hidden sm:inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </a>
        <span>BASED IN {profile.locationShort}</span>
      </div>
    </section>
  );
};
