'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../button/Button';
import './modal.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export type ModalPosition = 'center' | 'top';
export type ModalVariant = 'default' | 'sidebar' | 'compact' | 'fullscreen';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  size?: ModalSize;
  position?: ModalPosition;
  variant?: ModalVariant;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  isConfirmLoading?: boolean;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  closable?: boolean;
  preventBackdropClose?: boolean;
  customWidth?: string;
  customHeight?: string;
  customBackground?: string;
  customBorderRadius?: string;
  customHeader?: React.ReactNode;
  animationDuration?: number;
  disableAnimation?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  size = 'md',
  position = 'center',
  variant = 'default',
  title,
  subtitle,
  footer,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  isConfirmLoading = false,
  children,
  showCloseButton = true,
  closable = true,
  preventBackdropClose = false,
  customWidth,
  customHeight,
  customBackground,
  customBorderRadius,
  customHeader,
  animationDuration = 200,
  disableAnimation = false,
  className = '',
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen || !mounted) return;
    const previous = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) onClose?.();
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a, button:not(:disabled), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [isOpen, mounted, onClose, closable]);

  if (!isOpen || !mounted) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !preventBackdropClose && closable) onClose?.();
  };

  const dialogStyle: React.CSSProperties = {
    ...(customWidth ? { width: customWidth, maxWidth: customWidth } : {}),
    ...(customHeight ? { height: customHeight } : {}),
    ...(customBackground ? { background: customBackground } : {}),
    ...(customBorderRadius ? { borderRadius: customBorderRadius } : {}),
    ...(disableAnimation ? {} : { animationDuration: `${animationDuration}ms` }),
  };

  const modalClasses = [
    'gy-modal',
    `gy-modal--${size}`,
    `gy-modal--${variant}`,
    disableAnimation ? '' : 'gy-modal--animated',
    className,
  ].filter(Boolean).join(' ');

  const backdropClasses = [
    'gy-modal-backdrop',
    `gy-modal-backdrop--${position}`,
    variant === 'fullscreen' ? 'gy-modal-backdrop--fullscreen' : '',
    disableAnimation ? '' : 'gy-modal-backdrop--animated',
  ].filter(Boolean).join(' ');

  const handleCancelClick = () => {
    onCancel?.();
    onClose?.();
  };

  const renderFooter = () => {
    if (footer) return footer;
    if (cancelText || confirmText) {
      return (
        <div className="gy-modal__footer-actions">
          {cancelText && (
            <Button variant="secondary" onClick={handleCancelClick}>
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <Button variant="primary" isLoading={isConfirmLoading} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      );
    }
    return null;
  };

  const content = (
    <div
      className={backdropClasses}
      onClick={handleBackdropClick}
      aria-modal="true"
      style={disableAnimation ? {} : { animationDuration: `${animationDuration}ms` }}
    >
      <div ref={dialogRef} role="dialog" className={modalClasses} style={dialogStyle} tabIndex={-1}>
        {customHeader ? (
          <div className="gy-modal__header">{customHeader}</div>
        ) : (title || subtitle) ? (
          <div className="gy-modal__header">
            <div>
              {title && <h2 className="gy-modal__title">{title}</h2>}
              {subtitle && <p className="gy-modal__subtitle">{subtitle}</p>}
            </div>
            {showCloseButton && closable && (
              <button className="gy-modal__close" onClick={onClose} aria-label="Close dialog">
                <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="2" x2="14" y2="14" /><line x1="14" y1="2" x2="2" y2="14" />
                </svg>
              </button>
            )}
          </div>
        ) : showCloseButton && closable ? (
          <div className="gy-modal__header gy-modal__header--close-only">
            <button className="gy-modal__close" onClick={onClose} aria-label="Close dialog">
              <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="2" x2="14" y2="14" /><line x1="14" y1="2" x2="2" y2="14" />
              </svg>
            </button>
          </div>
        ) : null}

        <div className="gy-modal__body">{children}</div>
        {renderFooter() && <div className="gy-modal__footer">{renderFooter()}</div>}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
