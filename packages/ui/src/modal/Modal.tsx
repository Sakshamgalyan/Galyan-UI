'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  size?: ModalSize;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) onClose();
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a, button:not(:disabled), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [open, onClose, closeOnEscape]);

  if (!open) return null;

  const content = (
    <div
      className="gy-modal-backdrop"
      onClick={closeOnBackdrop ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-labelledby={title ? 'gy-modal-title' : undefined}
        className={`gy-modal gy-modal--${size} ${className}`}
        tabIndex={-1}
      >
        {title && (
          <div className="gy-modal-header">
            <h2 id="gy-modal-title" className="gy-modal-title">{title}</h2>
            <button className="gy-modal-close" onClick={onClose} aria-label="Close dialog">
              <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="15" y2="15" />
                <line x1="15" y1="1" x2="1" y2="15" />
              </svg>
            </button>
          </div>
        )}
        <div className="gy-modal-body">{children}</div>
        {footer && <div className="gy-modal-footer">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
