import React, { useState } from 'react';
import { StepId, CustomWatchConfig } from '../../types/watch';
import {
  DEFAULT_CONFIG,
  CASE_OPTIONS,
  DIAL_OPTIONS,
  HANDS_OPTIONS,
  STRAP_OPTIONS,
} from '../../data/mockWatchData';
import { WatchPreview } from '../watch-renderer/WatchPreview';
import { StepIndicator } from './StepIndicator';
import { CaseSelector } from './CaseSelector';
import { DialSelector } from './DialSelector';
import { HandsSelector } from './HandsSelector';
import { StrapSelector } from './StrapSelector';
import { ReviewStep } from './ReviewStep';
import { PriceSummaryBar } from './PriceSummaryBar';
import { OrderRequestModal } from './OrderRequestModal';
import { RotateCcw, ArrowLeft } from 'lucide-react';

interface WatchBuilderProps {
  initialConfig?: CustomWatchConfig;
  onBackToHome?: () => void;
}

const STEP_SEQUENCE: StepId[] = ['case', 'dial', 'hands', 'strap', 'review'];

const STEP_METADATA: Record<StepId, { title: string; subtitle: string; stepNumber: string }> = {
  case: { title: 'The Architect', subtitle: 'Step 01 — Case Selection', stepNumber: '01' },
  dial: { title: 'The Face', subtitle: 'Step 02 — Dial & Texture', stepNumber: '02' },
  hands: { title: 'The Motion', subtitle: 'Step 03 — Handset Design', stepNumber: '03' },
  strap: { title: 'The Fit', subtitle: 'Step 04 — Strap & Bracelet', stepNumber: '04' },
  review: { title: 'The Masterpiece', subtitle: 'Step 05 — Review & Inscription', stepNumber: '05' },
};

export const WatchBuilder: React.FC<WatchBuilderProps> = ({
  initialConfig = DEFAULT_CONFIG,
  onBackToHome,
}) => {
  const [currentStep, setCurrentStep] = useState<StepId>('case');
  const [config, setConfig] = useState<CustomWatchConfig>(initialConfig);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Handlers for option updates
  const handleSelectCase = (caseId: string) => {
    setConfig((prev) => ({ ...prev, caseId }));
  };

  const handleSelectDial = (dialId: string) => {
    setConfig((prev) => ({ ...prev, dialId }));
  };

  const handleSelectHands = (handsId: string) => {
    setConfig((prev) => ({ ...prev, handsId }));
  };

  const handleSelectStrap = (strapId: string) => {
    setConfig((prev) => ({ ...prev, strapId }));
  };

  const handleUpdateEngraving = (customEngraving: string) => {
    setConfig((prev) => ({ ...prev, customEngraving }));
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    setCurrentStep('case');
  };

  // Step navigation
  const currentIndex = STEP_SEQUENCE.indexOf(currentStep);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentStep(STEP_SEQUENCE[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentIndex < STEP_SEQUENCE.length - 1) {
      setCurrentStep(STEP_SEQUENCE[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentCase = CASE_OPTIONS.find((c) => c.id === config.caseId) || CASE_OPTIONS[0];
  const stepInfo = STEP_METADATA[currentStep];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FCFCFA] text-[#1A1A1A] flex flex-col justify-between">
      {/* Top Configurator Sub-header Bar */}
      <div className="w-full bg-white border-b border-[#EAEAEA] px-6 sm:px-12 py-2.5 flex items-center justify-between z-20">
        <div className="flex items-center space-x-4">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="text-gray-400 hover:text-black transition-colors flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
          <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
            Custom Atelier Studio
          </span>
        </div>

        {/* Quick Reset */}
        <button
          type="button"
          onClick={handleResetConfig}
          className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-black transition-colors cursor-pointer"
          title="Reset to default baseline specifications"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-wider">Reset</span>
        </button>
      </div>

      {/* Step Indicator Header */}
      <StepIndicator
        currentStep={currentStep}
        onSelectStep={(step) => setCurrentStep(step)}
        isComplete={() => true}
      />

      {/* Main Studio Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row w-full">
        {/* LEFT / CENTER: Studio Watch Stage on #F5F5F2 */}
        <div className="w-full lg:w-[58%] bg-[#F5F5F2] flex flex-col items-center justify-between p-6 sm:p-10 lg:p-12 relative min-h-[460px] lg:min-h-[640px]">
          {/* Top Left Horology Spec Tag */}
          <div className="w-full flex items-start justify-between z-10">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-0.5">
                  Reference No.
                </span>
                <span className="text-sm font-serif italic text-[#1A1A1A]">
                  H-402-MKII
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-0.5">
                  Case Diameter
                </span>
                <span className="text-xs font-mono font-semibold text-gray-800">
                  {currentCase.diameter || '40.5MM'}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-0.5">
                Calibre
              </span>
              <span className="text-xs font-mono font-semibold text-gray-800">
                AH-AUTO 28.8K VPH
              </span>
            </div>
          </div>

          {/* Master Layered Watch Canvas */}
          <div className="my-auto py-6 flex items-center justify-center w-full">
            <WatchPreview
              config={config}
              size="lg"
              showControls={true}
              className="my-auto"
            />
          </div>

          {/* Bottom Features Strip */}
          <div className="w-full flex flex-wrap items-center justify-center sm:justify-between gap-6 pt-4 border-t border-gray-200/80 text-[10px] uppercase tracking-[0.2em] text-gray-400">
            <span>Sapphire Crystal</span>
            <span>Automatic Caliber</span>
            <span>100m Water Resist</span>
          </div>
        </div>

        {/* RIGHT: Configurator Step Controls Panel on #FFFFFF */}
        <div className="w-full lg:w-[42%] bg-white border-t lg:border-t-0 lg:border-l border-[#EAEAEA] flex flex-col justify-between">
          <div className="p-6 sm:p-10 lg:p-12 flex flex-col flex-1">
            {/* Step Title Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mb-1">
                  {stepInfo.title}
                </h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  {stepInfo.subtitle}
                </p>
              </div>
              <div className="flex space-x-1">
                {STEP_SEQUENCE.map((s, idx) => (
                  <div
                    key={s}
                    className={`w-1.5 h-1.5 rounded-full ${
                      idx <= currentIndex ? 'bg-black' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step Selection Component */}
            <div className="flex-1 space-y-4">
              {currentStep === 'case' && (
                <CaseSelector
                  selectedCaseId={config.caseId}
                  onSelectCase={handleSelectCase}
                />
              )}

              {currentStep === 'dial' && (
                <DialSelector
                  selectedDialId={config.dialId}
                  onSelectDial={handleSelectDial}
                />
              )}

              {currentStep === 'hands' && (
                <HandsSelector
                  selectedHandsId={config.handsId}
                  onSelectHands={handleSelectHands}
                />
              )}

              {currentStep === 'strap' && (
                <StrapSelector
                  selectedStrapId={config.strapId}
                  onSelectStrap={handleSelectStrap}
                />
              )}

              {currentStep === 'review' && (
                <ReviewStep
                  config={config}
                  onUpdateEngraving={handleUpdateEngraving}
                  onRequestWatch={() => setIsOrderModalOpen(true)}
                  onJumpToStep={(step) => setCurrentStep(step)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Price Summary & Step Navigation Bar */}
      <PriceSummaryBar
        currentStep={currentStep}
        config={config}
        onPrev={handlePrev}
        onNext={handleNext}
        onRequestWatch={() => setIsOrderModalOpen(true)}
      />

      {/* Order Confirmation Inquiry Modal */}
      <OrderRequestModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        config={config}
      />
    </div>
  );
};

