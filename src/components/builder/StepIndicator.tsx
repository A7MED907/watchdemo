import React from 'react';
import { StepId } from '../../types/watch';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: StepId;
  onSelectStep: (step: StepId) => void;
  isComplete: (step: StepId) => boolean;
}

const STEPS: { id: StepId; number: number; label: string }[] = [
  { id: 'case', number: 1, label: 'Case' },
  { id: 'dial', number: 2, label: 'Dial' },
  { id: 'hands', number: 3, label: 'Hands' },
  { id: 'strap', number: 4, label: 'Strap' },
  { id: 'review', number: 5, label: 'Review' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onSelectStep,
}) => {
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full bg-white border-b border-[#EAEAEA] py-3.5 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Step Breadcrumb */}
        <div className="flex items-center space-x-2 text-[11px] text-gray-400 uppercase tracking-widest overflow-x-auto">
          {STEPS.map((step, idx) => {
            const isActive = step.id === currentStep;
            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => onSelectStep(step.id)}
                  className={`transition-colors cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-black font-bold' : 'hover:text-black'
                  }`}
                >
                  0{step.number} {step.label}
                </button>
                {idx < STEPS.length - 1 && <span className="opacity-40">/</span>}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Crisp Dot Progress Indicator */}
        <div className="flex items-center space-x-1.5 shrink-0 pl-4">
          {STEPS.map((step, idx) => {
            const isFilled = idx <= currentStepIndex;
            return (
              <div
                key={step.id}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isFilled ? 'bg-black' : 'bg-gray-200'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

