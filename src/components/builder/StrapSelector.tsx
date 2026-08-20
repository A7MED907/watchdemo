import React from 'react';
import { STRAP_OPTIONS } from '../../data/mockWatchData';
import { OptionCard } from './OptionCard';
import { Layers } from 'lucide-react';

interface StrapSelectorProps {
  selectedStrapId: string;
  onSelectStrap: (strapId: string) => void;
}

export const StrapSelector: React.FC<StrapSelectorProps> = ({
  selectedStrapId,
  onSelectStrap,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
            Strap & Bracelet Material
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Screw-linked steel bracelets, Italian leather, or vulcanized FKM rubber.
          </p>
        </div>
        <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          4 Options
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {STRAP_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            isSelected={selectedStrapId === option.id}
            onSelect={() => onSelectStrap(option.id)}
            colorSwatch={option.color}
            badge={
              option.id === 'strap-steel-bracelet'
                ? 'Solid 316L'
                : option.id === 'strap-brown-cognac'
                ? 'Italian Leather'
                : option.id === 'strap-fkm-rubber'
                ? 'Sports Grade'
                : undefined
            }
            specs={[
              { label: 'Type', value: option.type.toUpperCase() },
              { label: 'Material', value: option.material },
            ]}
          />
        ))}
      </div>

      <div className="p-3 bg-[#F9F9F8] border border-gray-100 flex items-start gap-2.5 text-xs text-gray-500">
        <Layers className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
        <span>
          Includes quick-release spring bars enabling effortless tool-free strap changes.
        </span>
      </div>
    </div>
  );
};

