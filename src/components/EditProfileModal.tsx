import React, { useState } from 'react';
import { X, RotateCcw, Check, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Link2 } from 'lucide-react';
import { ProfileData } from '../data/profile';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [activeTab, setActiveTab] = useState<'basics' | 'about' | 'education' | 'socials'>('basics');

  const handleTextChange = (field: keyof ProfileData, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleEducationChange = (index: number, field: string, val: string) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  const handleSocialChange = (index: number, val: string) => {
    const updated = [...formData.socials];
    updated[index] = { ...updated[index], url: val };
    setFormData((prev) => ({ ...prev, socials: updated }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9600] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[var(--bg)] border border-[var(--line)] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[var(--line)] flex items-center justify-between bg-[var(--bg-subtle)]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[var(--accent)]" />
            <h3 className="font-serif text-lg font-medium text-[var(--ink)]">
              Customize Portfolio Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-[var(--line)] bg-[var(--bg)] font-mono text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('basics')}
            className={`px-5 py-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'basics'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            1. Basics &amp; Header
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`px-5 py-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'about'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            2. Bio &amp; Facts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`px-5 py-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'education'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            3. Education
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('socials')}
            className={`px-5 py-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'socials'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            4. Socials &amp; Links
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                    First Name (Hero caps)
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleTextChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                    Last Name (Hero italic)
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleTextChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                    Full Name (Brand &amp; Titles)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleTextChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                    Initials (Wordmark)
                  </label>
                  <input
                    type="text"
                    value={formData.initials}
                    onChange={(e) => handleTextChange('initials', e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleTextChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleTextChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                    Location Label
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleTextChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                  Status Banner (Hero Kicker)
                </label>
                <input
                  type="text"
                  value={formData.status}
                  onChange={(e) => handleTextChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                  Tagline / Hero Description
                </label>
                <textarea
                  rows={2}
                  value={formData.tagline}
                  onChange={(e) => handleTextChange('tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                  About Me — Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={formData.about[0] || ''}
                  onChange={(e) => {
                    const arr = [...formData.about];
                    arr[0] = e.target.value;
                    handleTextChange('about', arr);
                  }}
                  className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                  About Me — Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={formData.about[1] || ''}
                  onChange={(e) => {
                    const arr = [...formData.about];
                    arr[1] = e.target.value;
                    handleTextChange('about', arr);
                  }}
                  className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                />
              </div>

              <div>
                <span className="block font-mono text-xs uppercase text-[var(--muted)] mb-2">
                  Quick Facts Table
                </span>
                <div className="space-y-2">
                  {formData.facts.map(([k, v], idx) => (
                    <div key={idx} className="grid grid-cols-[110px_1fr] gap-2 items-center">
                      <span className="font-mono text-xs text-[var(--muted)]">{k}:</span>
                      <input
                        type="text"
                        value={v}
                        onChange={(e) => {
                          const updated = [...formData.facts];
                          updated[idx] = [k, e.target.value];
                          handleTextChange('facts', updated);
                        }}
                        className="px-2 py-1.5 border border-[var(--line)] bg-[var(--bg)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] font-sans"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              {formData.education.map((item, idx) => (
                <div key={idx} className="p-4 border border-[var(--line)] bg-[var(--bg-subtle)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                      {idx === 0 ? 'Primary Degree' : 'Secondary Schooling'}
                    </span>
                    <input
                      type="text"
                      placeholder="Year"
                      value={item.year}
                      onChange={(e) => handleEducationChange(idx, 'year', e.target.value)}
                      className="px-2 py-1 border border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] w-32"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase text-[var(--muted)] mb-1">
                      Degree / Program Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleEducationChange(idx, 'title', e.target.value)}
                      className="w-full px-2 py-1.5 border border-[var(--line)] bg-[var(--bg)] text-xs text-[var(--ink)] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase text-[var(--muted)] mb-1">
                      Institution / College
                    </label>
                    <input
                      type="text"
                      value={item.org}
                      onChange={(e) => handleEducationChange(idx, 'org', e.target.value)}
                      className="w-full px-2 py-1.5 border border-[var(--line)] bg-[var(--bg)] text-xs text-[var(--ink)] font-sans"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="space-y-4">
              {formData.socials.map((s, idx) => (
                <div key={idx}>
                  <label className="block font-mono text-xs uppercase text-[var(--muted)] mb-1">
                    {s.label} URL
                  </label>
                  <input
                    type="text"
                    value={s.url}
                    onChange={(e) => handleSocialChange(idx, e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] text-xs text-[var(--ink)] font-mono focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 font-mono text-xs text-[var(--muted)] hover:text-red-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--bg)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
