'use client';

import React, { useState } from 'react';
import './stepper.css';

export type StepStatus = 'upcoming' | 'active' | 'completed' | 'error';
export type StepperSize = 'sm' | 'md' | 'lg';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: Step[];
  activeStep?: number;
  defaultStep?: number;
  orientation?: 'horizontal' | 'vertical';
  size?: StepperSize;
  onStepClick?: (index: number) => void;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
  className?: string;
}

const CheckIcon = () => (
  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,5 5,9 13,1" />
  </svg>
);

export function Stepper({
  steps,
  activeStep: controlledStep,
  defaultStep = 0,
  orientation = 'horizontal',
  size = 'md',
  onStepClick,
  onStepChange,
  onComplete,
  className = '',
}: StepperProps) {
  const [internalStep, setInternalStep] = useState(defaultStep);
  const current = controlledStep ?? internalStep;

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= steps.length) return;
    setInternalStep(idx);
    onStepChange?.(idx);
    onStepClick?.(idx);
  };

  const getStatus = (idx: number): StepStatus => {
    if (idx < current) return 'completed';
    if (idx === current) return 'active';
    return 'upcoming';
  };

  const rootClasses = [
    'gy-stepper',
    `gy-stepper--${orientation}`,
    `gy-stepper--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      <div className="gy-stepper__track">
        {steps.map((step, idx) => {
          const status = getStatus(idx);
          return (
            <React.Fragment key={step.id}>
              <div className="gy-stepper__item">
                <button
                  type="button"
                  className={[
                    'gy-stepper__indicator',
                    `gy-stepper__indicator--${status}`,
                  ].filter(Boolean).join(' ')}
                  onClick={() => goTo(idx)}
                  aria-label={`Step ${idx + 1}: ${step.label}`}
                  aria-current={status === 'active' ? 'step' : undefined}
                >
                  {status === 'completed' ? (
                    <CheckIcon />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    idx + 1
                  )}
                </button>
                <div className="gy-stepper__text">
                  <div className={`gy-stepper__label gy-stepper__label--${status}`}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="gy-stepper__description">{step.description}</div>
                  )}
                  {step.optional && !step.description && (
                    <div className="gy-stepper__description">Optional</div>
                  )}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className={`gy-stepper__connector ${idx < current ? 'gy-stepper__connector--completed' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {steps[current]?.content && (
        <div key={current} className="gy-stepper__panel">
          {steps[current].content}
        </div>
      )}
    </div>
  );
}
