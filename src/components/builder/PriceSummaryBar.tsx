import React from 'react';
import { StepId, CustomWatchConfig } from '../../types/watch';
import { calculateTotalPrice, formatPrice } from '../../data/mockWatchData';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface PriceSummaryBarProps {
  currentStep: StepId;
  config: CustomWatchConfig;
  onPrev: () => void;
  onNext: () => void;
  onRequestWatch: () => void;
}

const STEP_ORDER: StepId[] = ['case', 'dial', 'hands', 'strap', 'review'];
const STEP_LABELS: Record<StepId, string> = {
  case: '01 Case',
  dial: '02 Dial',
  hands: '03 Hands',
  strap: '04 Strap',
  review: '05 Review',
};

export const PriceSummaryBar: React.FC<PriceSummaryBarProps> = ({
  currentStep,
  config,
  onPrev,
  onNext,
  onRequestWatch,
}) => {
  const totalPrice = calculateTotalPrice(config);
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentStep === 'review';

  return (
    <div className="w-full bg-white border-t border-[#EAEAEA] py-4 px-6 sm:px-12 shadow-sm z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Total Estimated Price */}
        <div className="flex items-baseline space-x-3 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            Total Estimated
          </span>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        {/* Center: Step Navigation Indicator */}
        <div className="hidden md:flex items-center space-x-2 text-[10px] text-gray-400 uppercase tracking-widest">
          {STEP_ORDER.map((step, idx) => (
            <React.Fragment key={step}>
              <span
                className={`transition-colors ${
                  step === currentStep
                    ? 'text-black font-bold'
                    : idx < currentIndex
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}
              >
                {STEP_LABELS[step]}
              </span>
              {idx < STEP_ORDER.length - 1 && <span className="opacity-40">/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Right: Step Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          {/* Previous Button */}
          {!isFirstStep && (
            <button
              id="builder-prev-button"
              type="button"
              onClick={onPrev}
              className="px-4 py-3 text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors cursor-pointer"
            >
              Previous
            </button>
          )}

          {/* Next or Review Action Button */}
          {!isLastStep ? (
            <button
              id="builder-next-button"
              type="button"
              onClick={onNext}
              className="px-8 sm:px-10 py-3.5 bg-black text-white text-[11px] uppercase tracking-[0.25em] hover:bg-neutral-800 transition-all font-semibold cursor-pointer w-full sm:w-auto text-center"
            >
              Next Step
            </button>
          ) : (
            <button
              id="builder-submit-button"
              type="button"
              onClick={onRequestWatch}
              className="px-8 sm:px-10 py-3.5 bg-black text-white text-[11px] uppercase tracking-[0.25em] hover:bg-neutral-800 transition-all font-semibold cursor-pointer w-full sm:w-auto text-center"
            >
              Request Custom Watch
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

