import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Edit3 } from 'lucide-react';
import { ProfileData } from '../data/profile';

interface NavbarProps {
  profile: ProfileData;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenEditModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isDark,
  onToggleTheme,
  onOpenEditModal,
  activeSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress((window.scrollY / maxScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Top scroll progress indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[var(--accent)] z-[1001] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 h-[72px] z-[900] transition-colors duration-300 ${
          scrolled
            ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)] shadow-xs'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="font-mono text-sm tracking-wider font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
          >
            <span className="text-[var(--accent)]">{profile.initials}</span>
            <span className="text-[var(--muted)] mx-1">/</span>
            <span>{profile.name}</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative font-mono text-xs uppercase tracking-widest transition-colors py-1 ${
                    isActive
                      ? 'text-[var(--accent)] font-medium'
                      : 'text-[var(--ink)] hover:text-[var(--accent)]'
                  }`}
                >
                  {link.label}
                  <sup className="text-[10px] text-[var(--accent)] ml-1">0{idx + 1}</sup>
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[var(--accent)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEditModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--line)] text-xs font-mono text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors cursor-pointer whitespace-nowrap"
              title="Edit Portfolio Profile Details"
              aria-label="Edit Profile Details"
            >
              <Edit3 className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline">Customize</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="w-9 h-9 flex items-center justify-center border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors cursor-pointer"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center border border-[var(--line)] text-[var(--ink)] cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--bg)] z-[950] flex flex-col justify-center px-8 sm:px-14">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center border border-[var(--line)] text-[var(--ink)] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl sm:text-4xl text-[var(--ink)] hover:text-[var(--accent)] transition-colors border-b border-[var(--line)] pb-4 flex items-baseline justify-between"
              >
                <span>{link.label}</span>
                <span className="font-mono text-sm text-[var(--accent)]">0{idx + 1}</span>
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditModal();
                }}
                className="w-full py-3 text-center border border-[var(--ink)] font-mono text-xs uppercase tracking-widest text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4 text-[var(--accent)]" />
                Customize Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
