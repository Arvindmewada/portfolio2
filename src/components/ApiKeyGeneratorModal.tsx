import React, { useState } from 'react';
import { Key, Copy, RefreshCw, Check, ShieldCheck, X } from 'lucide-react';

interface ApiKeyGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyToast: (msg: string) => void;
}

type KeyType = 'standard' | 'jwt_secret' | 'uuid' | 'base64';

export const ApiKeyGeneratorModal: React.FC<ApiKeyGeneratorModalProps> = ({
  isOpen,
  onClose,
  onCopyToast
}) => {
  if (!isOpen) return null;

  const [keyType, setKeyType] = useState<KeyType>('standard');
  const [prefix, setPrefix] = useState('am_dev_');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generateRandomKey = (type: KeyType, customPrefix: string): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);

    if (type === 'uuid') {
      // UUID v4 format
      const u = new Uint8Array(16);
      crypto.getRandomValues(u);
      u[6] = (u[6] & 0x0f) | 0x40;
      u[8] = (u[8] & 0x3f) | 0x80;
      const hex = Array.from(u, (b) => b.toString(16).padStart(2, '0')).join('');
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }

    if (type === 'jwt_secret') {
      // 256-bit Hex secret
      return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
    }

    if (type === 'base64') {
      // URL-safe Base64
      let binary = '';
      array.forEach((b) => (binary += String.fromCharCode(b)));
      return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    // Standard API key (Alphanumeric with custom prefix)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = customPrefix;
    const charArray = new Uint8Array(36);
    crypto.getRandomValues(charArray);
    for (let i = 0; i < 36; i++) {
      result += chars[charArray[i] % chars.length];
    }
    return result;
  };

  const [currentKey, setCurrentKey] = useState<string>(() =>
    generateRandomKey('standard', 'am_dev_')
  );

  const handleRegenerate = (type = keyType, pref = prefix) => {
    const newKey = generateRandomKey(type, pref);
    setCurrentKey(newKey);
    setCopiedKey(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentKey).then(() => {
      setCopiedKey(currentKey);
      onCopyToast('API Key copied to clipboard');
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-[9600] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[var(--bg)] border border-[var(--line)] w-full max-w-xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--line)] flex items-center justify-between bg-[var(--bg-subtle)]">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[var(--accent)]" />
            <h3 className="font-serif text-lg font-medium text-[var(--ink)]">
              Developer API Key &amp; Token Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            aria-label="Close generator"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-xs sm:text-sm text-[var(--muted)] font-sans">
            Generate cryptographically secure API keys, JWT secrets, and bearer tokens using Web Crypto API. Ideal for testing backends like ZenonApp, PostgreSQL auth, and REST services.
          </p>

          {/* Type Selector */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
              Key Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'standard', label: 'API Key' },
                { id: 'jwt_secret', label: '256-bit Hex' },
                { id: 'uuid', label: 'UUID v4' },
                { id: 'base64', label: 'URL Token' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    const t = item.id as KeyType;
                    setKeyType(t);
                    handleRegenerate(t, prefix);
                  }}
                  className={`py-2 px-3 font-mono text-xs text-center border transition-colors cursor-pointer ${
                    keyType === item.id
                      ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)] font-medium'
                      : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prefix (only for standard) */}
          {keyType === 'standard' && (
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
                Custom Prefix
              </label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => {
                  setPrefix(e.target.value);
                  handleRegenerate('standard', e.target.value);
                }}
                placeholder="e.g. sk_live_ or am_dev_"
                className="w-full px-3 py-2 border border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          )}

          {/* Key Output Box */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5 flex items-center justify-between">
              <span>Generated Key</span>
              <span className="text-[var(--accent)] flex items-center gap-1 font-mono text-[10px]">
                <ShieldCheck className="w-3 h-3" />
                Crypto-random 256-bit entropy
              </span>
            </label>
            <div className="p-3.5 bg-[var(--bg-subtle)] border border-[var(--line)] font-mono text-xs sm:text-sm text-[var(--ink)] break-all select-all flex items-center justify-between gap-3">
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{currentKey}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleRegenerate()}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--line)] font-mono text-xs text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--bg)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-colors cursor-pointer"
            >
              {copiedKey === currentKey ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Key</span>
                </>
              )}
            </button>
          </div>

          {/* Cloud / AI Studio info tip */}
          <div className="p-3 bg-[var(--bg-subtle)] border border-[var(--line-soft)] text-xs text-[var(--muted)] font-mono">
            <span className="text-[var(--accent)] font-semibold">Note for Google AI Studio / Gemini APIs:</span>
            <p className="mt-1 font-sans text-[11px] leading-relaxed">
              To get a Google Gemini API key, visit{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ink)] underline hover:text-[var(--accent)]"
              >
                aistudio.google.com/app/apikey
              </a>
              . In this build environment, API keys are securely managed via the project Secrets panel without requiring client-side exposure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
