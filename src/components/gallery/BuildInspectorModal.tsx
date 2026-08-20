import React from 'react';
import { PresetBuild } from '../../types/watch';
import { CASE_OPTIONS, DIAL_OPTIONS, HANDS_OPTIONS, STRAP_OPTIONS, formatPrice } from '../../data/mockWatchData';
import { WatchPreview } from '../watch-renderer/WatchPreview';
import { X, Sliders, Shield, CircleDot, Clock, Layers } from 'lucide-react';

interface BuildInspectorModalProps {
  build: PresetBuild | null;
  isOpen: boolean;
  onClose: () => void;
  onCustomizeThisBuild: (build: PresetBuild) => void;
}

export const BuildInspectorModal: React.FC<BuildInspectorModalProps> = ({
  build,
  isOpen,
  onClose,
  onCustomizeThisBuild,
}) => {
  if (!isOpen || !build) return null;

  const currentCase = CASE_OPTIONS.find((c) => c.id === build.config.caseId) || CASE_OPTIONS[0];
  const currentDial = DIAL_OPTIONS.find((d) => d.id === build.config.dialId) || DIAL_OPTIONS[0];
  const currentHands = HANDS_OPTIONS.find((h) => h.id === build.config.handsId) || HANDS_OPTIONS[0];
  const currentStrap = STRAP_OPTIONS.find((s) => s.id === build.config.strapId) || STRAP_OPTIONS[0];

  const components = [
    { label: 'Case Architecture', name: currentCase.name, desc: currentCase.material, icon: Shield },
    { label: 'Dial & Texture', name: currentDial.name, desc: currentDial.description, icon: CircleDot },
    { label: 'Handset Spec', name: currentHands.name, desc: currentHands.description, icon: Clock },
    { label: 'Strap / Bracelet', name: currentStrap.name, desc: currentStrap.material, icon: Layers },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-gray-200 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          {/* Left: Interactive High Res Watch Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-[#F9F9F8] p-6 border border-gray-200 relative">
            {build.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[9px] uppercase font-bold tracking-widest text-gray-800 px-2 py-0.5 bg-white border border-gray-200 font-mono">
                  {build.badge}
                </span>
              </div>
            )}

            <WatchPreview config={build.config} size="lg" showControls={true} />

            <div className="mt-2 text-center">
              <span className="text-xs font-mono text-gray-500">
                40mm • Automatic 28,800 VPH • Domed Sapphire Crystal
              </span>
            </div>
          </div>

          {/* Right: Build Details & Component Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold font-mono">
                Atelier Archive Edition
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-serif mt-1">
                {build.name}
              </h2>
              <p className="text-xs font-mono text-gray-400 mt-0.5">
                {build.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 font-normal mt-3 leading-relaxed">
                {build.story}
              </p>
            </div>

            {/* Component Breakdown List */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                Tailored Component Spec:
              </span>
              {components.map((comp, idx) => {
                const Icon = comp.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 bg-[#F9F9F8] border border-gray-200 flex items-start gap-3 text-xs"
                  >
                    <div className="p-1.5 bg-white border border-gray-200 text-black shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold block font-mono">
                        {comp.label}
                      </span>
                      <strong className="text-[#1A1A1A] font-medium block truncate">
                        {comp.name}
                      </strong>
                      <span className="text-gray-500 font-normal line-clamp-1">
                        {comp.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price and Customize Action */}
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 block font-mono">
                  Configuration Price
                </span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-[#1A1A1A]">
                  {formatPrice(build.calculatedPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCustomizeThisBuild(build);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>Customize This Build</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
