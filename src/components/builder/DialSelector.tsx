import React from 'react';
import { DIAL_OPTIONS } from '../../data/mockWatchData';
import { OptionCard } from './OptionCard';
import { Sparkles } from 'lucide-react';

interface DialSelectorProps {
  selectedDialId: string;
  onSelectDial: (dialId: string) => void;
}

export const DialSelector: React.FC<DialSelectorProps> = ({
  selectedDialId,
  onSelectDial,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
            Dial Face & Applied Textures
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Radial sunburst, guilloché engine-turning, and applied markers.
          </p>
        </div>
        <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          5 Options
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {DIAL_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            isSelected={selectedDialId === option.id}
            onSelect={() => onSelectDial(option.id)}
            colorSwatch={option.dialColor}
            badge={
              option.id === 'dial-midnight-black'
                ? 'Signature'
                : option.id === 'dial-deep-blue'
                ? 'Bestseller'
                : option.id === 'dial-rhodium-silver'
                ? 'Guilloché'
                : undefined
            }
            specs={[
              { label: 'Finish', value: option.textureType.toUpperCase() },
              { label: 'Date Aperture', value: option.hasDateWindow ? 'At 3 o’clock' : 'No Date' },
            ]}
          />
        ))}
      </div>

      <div className="p-3 bg-[#F9F9F8] border border-gray-100 flex items-start gap-2.5 text-xs text-gray-500">
        <Sparkles className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
        <span>
          All dials feature diamond-polished applied indices and precision printed railway minute tracks.
        </span>
      </div>
    </div>
  );
};

