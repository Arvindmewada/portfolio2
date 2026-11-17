import React, { useState, useEffect } from 'react';
import { DEFAULT_PROFILE, ProfileData } from './data/profile';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ApiKeyGeneratorModal } from './components/ApiKeyGeneratorModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const profile: ProfileData = DEFAULT_PROFILE;

  // Dark/Light theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // API Key Generator Modal State
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Active section for navbar spy
  const [activeSection, setActiveSection] = useState('home');

  // Sync theme class with html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Section Observer for scroll spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const addToast = (text: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleDownloadResume = () => {
    const lines: string[] = [];
    lines.push(profile.name.toUpperCase());
    lines.push(profile.roles.join(' · '));
    lines.push(`${profile.email} | ${profile.phone} | ${profile.location}`);
    lines.push(profile.socials.map((s) => `${s.label}: ${s.url}`).join(' | '));
    lines.push('');
    lines.push('═'.repeat(64));
    lines.push('SUMMARY');
    lines.push('═'.repeat(64));
    lines.push(profile.tagline);
    lines.push('');
    lines.push('═'.repeat(64));
    lines.push('ACADEMIC RECORD & EDUCATION');
    lines.push('═'.repeat(64));
    profile.education.forEach((ed) => {
      lines.push(`${ed.title}`);
      lines.push(`${ed.org} (${ed.year})`);
      if (ed.desc) lines.push(ed.desc);
      if (ed.chips) lines.push(`Highlights: ${ed.chips.join(' · ')}`);
      lines.push('');
    });
    lines.push('═'.repeat(64));
    lines.push('CERTIFICATIONS');
    lines.push('═'.repeat(64));
    profile.certifications.forEach((c) => {
      lines.push(`• ${c.title} — ${c.org} (${c.year})`);
      if (c.desc) lines.push(`  ${c.desc}`);
    });
    lines.push('');
    lines.push('═'.repeat(64));
    lines.push('CORE TECHNICAL SKILLS');
    lines.push('═'.repeat(64));
    profile.skills.forEach((band) => {
      lines.push(`${band.title.toUpperCase()} (${band.note}):`);
      lines.push(band.items.map((i) => `• ${i.name} [Proficiency: ${i.level}/10, Exp: ${i.yrs}]`).join('\n'));
      lines.push('');
    });
    lines.push('═'.repeat(64));
    lines.push('FEATURED PROJECTS');
    lines.push('═'.repeat(64));
    profile.projects.forEach((p) => {
      lines.push(`${p.title} (${p.year}) — ${p.sub}`);
      lines.push(`Category: ${p.category} | Tech: ${p.tech.join(', ')}`);
      lines.push(`Description: ${p.desc}`);
      if (p.highlights) {
        lines.push('Key Highlights:');
        p.highlights.forEach((h) => lines.push(`  - ${h}`));
      }
      lines.push(`Repository: ${p.link}`);
      lines.push('');
    });
    lines.push('═'.repeat(64));
    lines.push(`Generated from ${profile.name}'s Portfolio (${new Date().getFullYear()})`);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Résumé downloaded successfully', 'download');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans antialiased selection:bg-[var(--accent)] selection:text-[var(--on-accent)]">
      {/* Navigation */}
      <Navbar
        profile={profile}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenApiKeyGenerator={() => setIsApiKeyModalOpen(true)}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section */}
        <Hero
          profile={profile}
          onDownloadResume={handleDownloadResume}
        />

        {/* Marquee Ribbon */}
        <Marquee items={profile.marquee} />

        {/* About Section */}
        <About profile={profile} />

        {/* Education & Certifications */}
        <Education profile={profile} />

        {/* Skills & Capabilities */}
        <Skills profile={profile} />

        {/* Selected Projects */}
        <Projects profile={profile} />

        {/* Contact Section */}
        <Contact profile={profile} onShowToast={addToast} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onOpenApiKeyGenerator={() => setIsApiKeyModalOpen(true)}
      />

      {/* API Key & Token Generator Modal */}
      <ApiKeyGeneratorModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onCopyToast={(msg) => addToast(msg, 'copy')}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
