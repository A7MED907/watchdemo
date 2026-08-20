import React from 'react';
import { CASE_OPTIONS } from '../../data/mockWatchData';
import { OptionCard } from './OptionCard';
import { Info } from 'lucide-react';

interface CaseSelectorProps {
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
}

export const CaseSelector: React.FC<CaseSelectorProps> = ({
  selectedCaseId,
  onSelectCase,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
            Case Geometry & Metal Finish
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            CNC-machined 40mm surgical steel architecture.
          </p>
        </div>
        <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          5 Options
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {CASE_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            isSelected={selectedCaseId === option.id}
            onSelect={() => onSelectCase(option.id)}
            colorSwatch={option.color}
            badge={option.id === 'case-silver-classic' ? 'Standard' : option.id === 'case-black-dlc' ? 'DLC Stealth' : undefined}
            specs={[
              { label: 'Diameter', value: option.diameter },
              { label: 'Material', value: option.material },
              { label: 'Water Res.', value: option.waterResistance },
            ]}
          />
        ))}
      </div>

      <div className="p-3 bg-[#F9F9F8] border border-gray-100 flex items-start gap-2.5 text-xs text-gray-500">
        <Info className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
        <span>
          Every case is CNC-milled from solid monolithic 316L billets and tested to 10–20 ATM.
        </span>
      </div>
    </div>
  );
};

