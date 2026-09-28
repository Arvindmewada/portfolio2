import React from 'react';

interface MarqueeProps {
  items: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  const content = items.map((item, index) => (
    <React.Fragment key={index}>
      <span className="font-mono text-xs uppercase tracking-widest px-4">{item}</span>
      <span className="text-[var(--accent)] font-serif italic text-base select-none">/</span>
    </React.Fragment>
  ));

  return (
    <div className="w-full bg-[var(--ink)] text-[var(--bg)] py-3 overflow-hidden select-none border-y border-[var(--ink)]">
      <div className="flex w-max animate-marquee">
        <div className="flex items-center whitespace-nowrap">{content}</div>
        <div className="flex items-center whitespace-nowrap" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
};
