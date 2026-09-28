import React from 'react';
import { Check, Copy, Download, Send, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'copy' | 'download' | 'send';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed left-6 bottom-6 z-[9500] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => {
        const renderIcon = () => {
          switch (t.type) {
            case 'copy':
              return <Copy className="w-4 h-4 text-[var(--accent)]" />;
            case 'download':
              return <Download className="w-4 h-4 text-[var(--accent)]" />;
            case 'send':
              return <Send className="w-4 h-4 text-[var(--accent)]" />;
            case 'info':
              return <AlertCircle className="w-4 h-4 text-[var(--accent)]" />;
            default:
              return <Check className="w-4 h-4 text-[var(--accent)]" />;
          }
        };

        return (
          <div
            key={t.id}
            onClick={() => onDismiss(t.id)}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 bg-[var(--ink)] text-[var(--bg)] font-mono text-xs tracking-wider border-l-4 border-[var(--accent)] shadow-xl cursor-pointer transition-transform hover:scale-[1.02]"
          >
            {renderIcon()}
            <span>{t.text}</span>
          </div>
        );
      })}
    </div>
  );
};
