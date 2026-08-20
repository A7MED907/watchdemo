import React from 'react';
import { HANDS_OPTIONS } from '../../data/mockWatchData';
import { OptionCard } from './OptionCard';
import { Clock } from 'lucide-react';

interface HandsSelectorProps {
  selectedHandsId: string;
  onSelectHands: (handsId: string) => void;
}

export const HandsSelector: React.FC<HandsSelectorProps> = ({
  selectedHandsId,
  onSelectHands,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
            Handset Geometry & Caliber Motion
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Faceted Dauphine, Super-LumiNova swords, or Haute skeleton hands.
          </p>
        </div>
        <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          4 Options
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {HANDS_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            isSelected={selectedHandsId === option.id}
            onSelect={() => onSelectHands(option.id)}
            colorSwatch={option.mainColor}
            badge={
              option.id === 'hands-classic-dauphine'
                ? 'Classic'
                : option.id === 'hands-sword-lume'
                ? 'Super-LumiNova'
                : option.id === 'hands-skeleton-haute'
                ? 'Haute Horlogerie'
                : undefined
            }
            specs={[
              { label: 'Style', value: option.style.replace('-', ' ').toUpperCase() },
              { label: 'Second Hand', value: option.secondHandColor === '#ef4444' ? 'Crimson Tip' : option.secondHandColor === '#38bdf8' ? 'Electric Blue' : 'Matching' },
            ]}
          />
        ))}
      </div>

      <div className="p-3 bg-[#F9F9F8] border border-gray-100 flex items-start gap-2.5 text-xs text-gray-500">
        <Clock className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
        <span>
          Each handset is poised with counterweights to minimize gear-train drag across 28,800 vibrations/hr.
        </span>
      </div>
    </div>
  );
};

