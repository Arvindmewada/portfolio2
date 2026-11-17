import React from 'react';
import { ArrowUp, Key } from 'lucide-react';
import { ProfileData } from '../data/profile';

interface FooterProps {
  profile: ProfileData;
  onOpenApiKeyGenerator?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenApiKeyGenerator }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] tracking-widest text-[var(--muted)]">
        <div>
          <span>© {currentYear} — {profile.name.toUpperCase()}</span>
          <span className="mx-2 hidden md:inline">·</span>
          <span className="hidden md:inline">SOFTWARE ENGINEER · CSE-AIML</span>
        </div>

        <div className="flex items-center gap-4">
          {onOpenApiKeyGenerator && (
            <button
              onClick={onOpenApiKeyGenerator}
              className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Key className="w-3 h-3 text-[var(--accent)]" />
              <span>KEY GENERATOR</span>
            </button>
          )}
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
