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
import { EditProfileModal } from './components/EditProfileModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Profile state with localStorage persistence
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('arvind_mewada_portfolio_profile_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure images and structure are intact
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          photo: DEFAULT_PROFILE.photo, // Keep validated local image
          projects: DEFAULT_PROFILE.projects.map((dp, i) => ({
            ...dp,
            ...(parsed.projects?.[i] || {})
          }))
        };
      }
    } catch (e) {
      console.error('Error loading saved profile:', e);
    }
    return DEFAULT_PROFILE;
  });

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

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('arvind_mewada_portfolio_profile_v1', JSON.stringify(updated));
      addToast('Profile details updated successfully!', 'success');
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem('arvind_mewada_portfolio_profile_v1');
      addToast('Reset to default profile details', 'info');
    } catch (e) {
      console.error(e);
    }
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
        onOpenEditModal={() => setIsEditModalOpen(true)}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section */}
        <Hero
          profile={profile}
          onDownloadResume={handleDownloadResume}
          onOpenEditModal={() => setIsEditModalOpen(true)}
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
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* Profile Details Customizer Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
