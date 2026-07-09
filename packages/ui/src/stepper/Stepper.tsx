'use client';

import React, { useState } from 'react';
import './stepper.css';

export type StepStatus = 'upcoming' | 'active' | 'completed' | 'error';

export interface Step {
  id: string;
  label: string;
  description?: string;
  content?: React.ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: Step[];
  activeStep?: number;
  defaultStep?: number;
  /** 'linear' = must complete in order; 'free' = can jump to any step */
  variant?: 'linear' | 'free';
  orientation?: 'horizontal' | 'vertical';
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
  className?: string;
}

const CheckIcon = () => (
  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,5 5,9 13,1" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="2" y1="2" x2="10" y2="10" /><line x1="10" y1="2" x2="2" y2="10" />
  </svg>
);

export function Stepper({
  steps,
  activeStep: controlledStep,
  defaultStep = 0,
  variant = 'linear',
  orientation = 'horizontal',
  onStepChange,
  onComplete,
  className = '',
}: StepperProps) {
  const [internalStep, setInternalStep] = useState(defaultStep);
  const current = controlledStep ?? internalStep;

  const goTo = (idx: number) => {
    if (variant === 'linear' && idx > current + 1) return;
    if (idx < 0 || idx >= steps.length) return;
    setInternalStep(idx);
    onStepChange?.(idx);
  };

  const next = () => {
    if (current === steps.length - 1) {
      onComplete?.();
    } else {
      goTo(current + 1);
    }
  };

  const prev = () => goTo(current - 1);

  const getStatus = (idx: number): StepStatus => {
    if (idx < current) return 'completed';
    if (idx === current) return 'active';
    return 'upcoming';
  };

  return (
    <div className={`gy-stepper ${orientation === 'vertical' ? 'gy-stepper--vertical' : ''} ${className}`}>
      {/* Step Indicators */}
      <div className={`gy-stepper ${orientation === 'vertical' ? 'gy-stepper--vertical' : ''}`} style={{ width: '100%' }}>
        {steps.map((step, idx) => {
          const status = getStatus(idx);
          const isClickable = variant === 'free' || idx <= current;

          return (
            <React.Fragment key={step.id}>
              <div className="gy-stepper-item">
                <span
                  className={[
                    'gy-stepper-indicator',
                    `gy-stepper-indicator--${status}`,
                    isClickable ? 'gy-stepper-indicator--clickable' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => isClickable && goTo(idx)}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={isClickable ? (e) => { if (e.key === 'Enter') goTo(idx); } : undefined}
                  aria-label={`Step ${idx + 1}: ${step.label}`}
                  aria-current={status === 'active' ? 'step' : undefined}
                >
                  {status === 'completed' ? <CheckIcon /> : status === 'error' ? <ErrorIcon /> : idx + 1}
                </span>
                <div>
                  <div className={`gy-stepper-label gy-stepper-label--${status}`}>{step.label}</div>
                  {step.optional && <div className="gy-stepper-description">Optional</div>}
                  {step.description && <div className="gy-stepper-description">{step.description}</div>}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className={`gy-stepper-connector ${idx < current ? 'gy-stepper-connector--completed' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Active Panel */}
      {steps[current]?.content && (
        <div key={current} className="gy-stepper-panel">
          {steps[current].content}
        </div>
      )}
    </div>
  );
}
