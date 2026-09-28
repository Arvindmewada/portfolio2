import React, { useState } from 'react';
import { Mail, Phone, MapPin, GraduationCap, Copy, Send, Check, ArrowUpRight } from 'lucide-react';
import { ProfileData } from '../data/profile';

import { ToastMessage } from './Toast';

interface ContactProps {
  profile: ProfileData;
  onShowToast: (message: string, type?: ToastMessage['type']) => void;
}

export const Contact: React.FC<ContactProps> = ({ profile, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(
      () => {
        setIsCopied(true);
        onShowToast('Email copied to clipboard: ' + profile.email, 'copy');
        setTimeout(() => setIsCopied(false), 2500);
      },
      () => {
        onShowToast('Direct email: ' + profile.email, 'info');
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please fill out your name, email, and message.', 'info');
      return;
    }

    const emailSubject = encodeURIComponent(
      formData.subject || `Portfolio inquiry from ${formData.name}`
    );
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // Open user's default email client
    window.location.href = `mailto:${profile.email}?subject=${emailSubject}&body=${emailBody}`;
    onShowToast('Opening email client to send message...', 'send');

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-[var(--line-soft)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-12">
          <span className="font-mono text-sm text-[var(--accent)] tracking-wider">05</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            Get in <em className="italic text-[var(--accent)]">touch</em>
          </h2>
          <div className="flex-1 h-[1px] bg-[var(--line)] self-center min-w-[24px]" />
          <span className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase hidden sm:inline">
            AVAILABLE NOW
          </span>
        </div>

        {/* Big Editorial Headline */}
        <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[var(--ink)] leading-[1.08] tracking-tight max-w-3xl mb-16">
          Got an idea worth building or a team looking for a builder?{' '}
          <em className="italic text-[var(--accent)]">Let's talk.</em>
        </h3>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div>
            {/* Email Row with Copy Button */}
            <div className="mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] block mb-2">
                Direct Email
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)] hover:text-[var(--accent)] border-b border-[var(--ink)] hover:border-[var(--accent)] transition-colors pb-1"
                >
                  {profile.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="w-10 h-10 border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors cursor-pointer shrink-0"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Structured Details */}
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)] mb-10">
              <div className="py-3.5 flex items-center gap-3 font-mono text-xs text-[var(--muted)] tracking-wide">
                <Phone className="w-4 h-4 text-[var(--accent)]" />
                <span>Phone:</span>
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="text-[var(--ink)] font-medium hover:text-[var(--accent)] transition-colors"
                >
                  {profile.phone}
                </a>
              </div>

              <div className="py-3.5 flex items-center gap-3 font-mono text-xs text-[var(--muted)] tracking-wide">
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
                <span>Location:</span>
                <span className="text-[var(--ink)] font-medium">{profile.location}</span>
              </div>

              <div className="py-3.5 flex items-center gap-3 font-mono text-xs text-[var(--muted)] tracking-wide">
                <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                <span>Focus:</span>
                <span className="text-[var(--ink)] font-medium">{profile.badge}</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] block mb-3">
                Online Profiles & Network
              </span>
              <div className="flex flex-wrap gap-2.5">
                {profile.socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-wider px-3.5 py-2 border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
                  >
                    <span>{s.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[var(--accent)]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Contact Form */}
          <div className="bg-[var(--bg-subtle)] p-8 sm:p-10 border border-[var(--line)] shadow-xs">
            <h4 className="font-serif text-xl sm:text-2xl font-medium text-[var(--ink)] mb-2">
              Send a direct message
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted)] mb-8 font-sans">
              Looking for a project consultation, internship, or full-time role? Drop a message here.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-2"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--line)] py-2 text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-2"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--line)] py-2 text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Project Collaboration / Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--line)] py-2 text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Tell me about your project, timeline, or open engineering role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--line)] py-2 text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-[var(--ink)] text-[var(--bg)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-colors cursor-pointer"
              >
                <span>Send message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
