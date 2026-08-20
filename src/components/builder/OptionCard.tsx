import React from 'react';
import { BaseOption } from '../../types/watch';
import { Check, Plus } from 'lucide-react';
import { formatPrice } from '../../data/mockWatchData';

interface OptionCardProps {
  option: BaseOption;
  isSelected: boolean;
  onSelect: () => void;
  badge?: string;
  specs?: { label: string; value: string }[];
  colorSwatch?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  isSelected,
  onSelect,
  badge,
  specs,
  colorSwatch,
}) => {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative text-left p-4 sm:p-4.5 transition-all duration-200 cursor-pointer border ${
        isSelected
          ? 'border-black bg-[#FDFDFD] shadow-sm'
          : 'border-gray-100 hover:border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Swatch + Title/Desc */}
        <div className="flex items-center space-x-4 min-w-0">
          {colorSwatch && (
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-300 shrink-0 shadow-sm flex items-center justify-center transition-transform group-hover:scale-105 ${
                isSelected ? 'ring-2 ring-black ring-offset-2' : ''
              }`}
              style={{ backgroundColor: colorSwatch }}
            >
              {isSelected && <div className="w-2 h-2 rounded-full bg-white shadow-xs" />}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold tracking-tight text-[#1A1A1A] truncate">
                {option.name}
              </p>
              {badge && (
                <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 truncate mt-0.5">
              {option.description}
            </p>
          </div>
        </div>

        {/* Right: Price */}
        <div className="text-right shrink-0">
          {option.priceAdjustment === 0 ? (
            <span className="text-xs font-mono text-gray-900 font-semibold">+0 EGP</span>
          ) : (
            <span className={`text-xs font-mono font-semibold ${isSelected ? 'text-black' : 'text-gray-400'}`}>
              +{formatPrice(option.priceAdjustment)}
            </span>
          )}
        </div>
      </div>

      {/* Optional specs bar */}
      {specs && specs.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap gap-2 text-[10px] text-gray-500 font-mono">
          {specs.map((spec, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="text-gray-400 mr-1">{spec.label}:</span>
              <span className="text-gray-700 font-medium">{spec.value}</span>
              {i < specs.length - 1 && <span className="mx-1.5 text-gray-300">•</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

