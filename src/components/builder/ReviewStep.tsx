import React from 'react';
import { CustomWatchConfig } from '../../types/watch';
import {
  BASE_WATCH_PRICE,
  CASE_OPTIONS,
  DIAL_OPTIONS,
  HANDS_OPTIONS,
  STRAP_OPTIONS,
  calculateTotalPrice,
  formatPrice,
} from '../../data/mockWatchData';
import { Shield, CircleDot, Clock, Layers, Sparkles, Edit3, ArrowRight, Award } from 'lucide-react';

interface ReviewStepProps {
  config: CustomWatchConfig;
  onUpdateEngraving: (text: string) => void;
  onRequestWatch: () => void;
  onJumpToStep: (step: 'case' | 'dial' | 'hands' | 'strap') => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  config,
  onUpdateEngraving,
  onRequestWatch,
  onJumpToStep,
}) => {
  const currentCase = CASE_OPTIONS.find((c) => c.id === config.caseId) || CASE_OPTIONS[0];
  const currentDial = DIAL_OPTIONS.find((d) => d.id === config.dialId) || DIAL_OPTIONS[0];
  const currentHands = HANDS_OPTIONS.find((h) => h.id === config.handsId) || HANDS_OPTIONS[0];
  const currentStrap = STRAP_OPTIONS.find((s) => s.id === config.strapId) || STRAP_OPTIONS[0];

  const totalPrice = calculateTotalPrice(config);

  const componentRows = [
    {
      step: 'case' as const,
      label: 'Case Architecture',
      name: currentCase.name,
      spec: `${currentCase.diameter} • ${currentCase.material}`,
      priceAdj: currentCase.priceAdjustment,
      icon: Shield,
      color: currentCase.color,
    },
    {
      step: 'dial' as const,
      label: 'Dial Texture',
      name: currentDial.name,
      spec: `${currentDial.textureType.toUpperCase()} • ${currentDial.hasDateWindow ? 'With Date' : 'No Date'}`,
      priceAdj: currentDial.priceAdjustment,
      icon: CircleDot,
      color: currentDial.dialColor,
    },
    {
      step: 'hands' as const,
      label: 'Handset Motion',
      name: currentHands.name,
      spec: `${currentHands.style.replace('-', ' ')}`,
      priceAdj: currentHands.priceAdjustment,
      icon: Clock,
      color: currentHands.mainColor,
    },
    {
      step: 'strap' as const,
      label: 'Strap & Bracelet',
      name: currentStrap.name,
      spec: currentStrap.material,
      priceAdj: currentStrap.priceAdjustment,
      icon: Layers,
      color: currentStrap.color,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Step Header */}
      <div className="pb-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
          Specification Summary
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Verify your tailored build specifications before submitting your custom request.
        </p>
      </div>

      {/* Component Specification List */}
      <div className="space-y-2">
        {componentRows.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.step}
              className="p-3.5 border border-gray-100 hover:border-gray-300 transition-all flex items-center justify-between gap-3 bg-white"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: row.color }}
                >
                  <Icon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono block">
                    {row.label}
                  </span>
                  <p className="text-sm font-semibold text-[#1A1A1A] truncate">
                    {row.name}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate font-mono">
                    {row.spec}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-xs font-mono text-gray-700">
                  {row.priceAdj === 0 ? '+0 EGP' : `+${formatPrice(row.priceAdj)}`}
                </span>
                <button
                  type="button"
                  onClick={() => onJumpToStep(row.step)}
                  className="p-1.5 text-gray-400 hover:text-black transition-colors cursor-pointer"
                  title={`Edit ${row.label}`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Engraving Inscription Input */}
      <div className="p-4 bg-[#F9F9F8] border border-gray-100 space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="custom-engraving-input" className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gray-700" />
            Laser Caseback Inscription (Complimentary)
          </label>
          <span className="text-[10px] font-mono text-gray-400">Max 24 chars</span>
        </div>
        <input
          id="custom-engraving-input"
          type="text"
          maxLength={24}
          value={config.customEngraving || ''}
          onChange={(e) => onUpdateEngraving(e.target.value)}
          placeholder="e.g. TEMPORE FIDELIS or INITIALS"
          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 text-[#1A1A1A] text-xs placeholder:text-gray-400 focus:outline-none focus:border-black font-mono tracking-wider"
        />
        <p className="text-[10px] text-gray-400 font-mono">
          Precision laser-inscribed onto the exhibition rotor ring.
        </p>
      </div>

      {/* Craftsmanship Guarantee Box */}
      <div className="p-3.5 bg-white border border-gray-100 space-y-1.5 text-xs text-gray-600">
        <div className="flex items-center space-x-2 text-[#1A1A1A] font-semibold">
          <Award className="w-4 h-4 text-gray-800" />
          <span className="text-xs uppercase tracking-wider">Atelier Assembly Standards</span>
        </div>
        <ul className="space-y-1 text-[11px] text-gray-500 pl-5 list-disc font-sans">
          <li>Calibre regulated in 5 positions to +/- 4 seconds/day accuracy</li>
          <li>Dual high-pressure dry & wet hermetic seal testing</li>
          <li>Presented in bespoke walnut exhibition presentation chest</li>
          <li>24-Month international mechanical warranty card</li>
        </ul>
      </div>

      {/* Primary Request Order CTA */}
      <button
        id="request-watch-button"
        type="button"
        onClick={onRequestWatch}
        className="w-full py-4 bg-black text-white text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2 cursor-pointer"
      >
        <span>Request Custom Assembly</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

